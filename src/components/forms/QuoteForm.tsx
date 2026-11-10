"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { QuoteContent } from "@/data/quote";
import { buildQuoteMessage, normalizePhone, type QuoteValues } from "@/lib/whatsapp/quote";
import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  locale: Locale;
  content: QuoteContent;
  unavailableDates: string[];
  children?: ReactNode;
};

type Step = 1 | 2 | 3;
type Errors = Partial<Record<keyof QuoteValues, string>>;

const emptyValues: QuoteValues = {
  category: "",
  variant: "",
  date: "",
  time: "",
  venue: "",
  area: "",
  guests: "",
  pack: "",
  service: "",
  extras: [],
  diet: "",
  budget: "",
  name: "",
  phone: "",
  email: "",
  source: "",
  promo: "",
  comment: "",
  consent: false,
};

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-page px-4 py-3 aria-invalid:border-primary";

const subscribe = () => () => {};

// Date du jour cote navigateur (vide pendant le rendu serveur)
function useToday(): string {
  return useSyncExternalStore(
    subscribe,
    () => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    },
    () => "",
  );
}

function initialValues(params: { get(name: string): string | null }, content: QuoteContent): QuoteValues {
  const type = params.get("type") ?? "";
  const pack = params.get("pack") ?? "";
  let category = "";
  let variant = "";

  for (const c of content.categories) {
    if (c.id === type) category = c.id;
    const v = c.variants.find((x) => x.id === type);
    if (v) {
      category = c.id;
      variant = v.id;
    }
  }

  return { ...emptyValues, category, variant, pack: content.packs.some((p) => p.id === pack) ? pack : "" };
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

function Group({
  id,
  legend,
  error,
  children,
}: {
  id: string;
  legend: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset
      className="min-w-0"
      data-invalid={error ? "true" : undefined}
      tabIndex={error ? -1 : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-semibold text-primary">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Chip({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-on-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}

export default function QuoteForm({ locale, content, unavailableDates, children }: Props) {
  const t = content.t;
  const params = useSearchParams();
  const today = useToday();

  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<QuoteValues>(() => initialValues(params, content));
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lastKey = useRef(`${step}-${sent}`);

  // Place le focus sur le titre quand on change d'etape
  useEffect(() => {
    const key = `${step}-${sent}`;
    if (lastKey.current === key) return;
    lastKey.current = key;
    headingRef.current?.focus();
  }, [step, sent]);

  const set = <K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const toggleExtra = (id: string) =>
    setValues((v) => ({
      ...v,
      extras: v.extras.includes(id) ? v.extras.filter((x) => x !== id) : [...v.extras, id],
    }));

  const currentCategory = content.categories.find((c) => c.id === values.category);
  const dateTaken = values.date !== "" && unavailableDates.includes(values.date);

  const validate = (s: Step): Errors => {
    const e: Errors = {};
    if (s === 1) {
      if (!values.category) e.category = t.required;
      if (currentCategory && currentCategory.variants.length > 0 && !values.variant) e.variant = t.required;
      if (!values.date) e.date = t.required;
      else if (today && values.date < today) e.date = t.datePast;
      if (!values.area.trim()) e.area = t.required;
      if (!values.guests) e.guests = t.required;
    }
    if (s === 3) {
      if (values.name.trim().length < 2) e.name = t.required;
      if (!normalizePhone(values.phone)) e.phone = values.phone.trim() ? t.phoneInvalid : t.required;
      if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        e.email = t.emailInvalid;
      }
      if (!values.consent) e.consent = t.consentRequired;
    }
    return e;
  };

  const focusFirstInvalid = () => {
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"]')?.focus();
    });
  };

  const goNext = () => {
    const e = validate(step);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      focusFirstInvalid();
      return;
    }
    setErrors({});
    setStep((step + 1) as Step);
  };

  const trySend = () => {
    setErrors(validate(3));
    focusFirstInvalid();
  };

  const message = buildQuoteMessage(values, content, locale);
  const href = whatsappLink(message);
  const ready = Object.keys(validate(3)).length === 0;

  if (sent) {
    return (
      <div>
        <h2 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-bold focus:outline-none">
          {t.doneTitle}
        </h2>
        <p className="mt-3 text-lg text-muted">{t.doneText}</p>

        <h3 className="mt-8 font-display text-xl font-semibold">{t.doneMessage}</h3>
        <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-line bg-surface p-5 font-sans text-sm">
          {message}
        </pre>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {t.doneAgain}
          </a>
          <button type="button" onClick={() => setSent(false)} className="btn border border-line">
            {t.doneEdit}
          </button>
          <Link href={`/${locale}`} className="btn border border-line">
            {t.doneHome}
          </Link>
        </div>

        <div className="mt-14">{children}</div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 3) goNext();
      }}
    >
      <p className="rounded-2xl bg-surface p-4 text-sm text-muted">{t.privacyNote}</p>

      <ol aria-label={t.stepsAria} className="mt-6 flex gap-2">
        {t.stepLabels.map((label, i) => (
          <li key={label} className="flex-1" aria-current={i + 1 === step ? "step" : undefined}>
            <div className={`h-1.5 rounded-full transition-colors duration-300 ${i < step ? "bg-primary" : "bg-line"}`} />
            <span className={`mt-2 block text-sm ${i + 1 === step ? "font-semibold" : "text-muted"}`}>
              {i + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      <h2 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-2xl font-bold focus:outline-none">
        {t.stepLabels[step - 1]}
      </h2>

      <div className="mt-6 space-y-6">
        {step === 1 && (
          <>
            <Group id="category" legend={t.typeLabel} error={errors.category}>
              {content.categories.map((c) => (
                <Chip
                  key={c.id}
                  type="radio"
                  name="category"
                  value={c.id}
                  checked={values.category === c.id}
                  onChange={() => {
                    set("category", c.id);
                    set("variant", "");
                  }}
                >
                  {c.label}
                </Chip>
              ))}
            </Group>

            {currentCategory && currentCategory.variants.length > 0 && (
              <Group id="variant" legend={t.variantLabel} error={errors.variant}>
                {currentCategory.variants.map((v) => (
                  <Chip
                    key={v.id}
                    type="radio"
                    name="variant"
                    value={v.id}
                    checked={values.variant === v.id}
                    onChange={() => set("variant", v.id)}
                  >
                    {v.label}
                  </Chip>
                ))}
              </Group>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="date" label={t.dateLabel} error={errors.date}>
                <input
                  id="date"
                  type="date"
                  min={today || undefined}
                  value={values.date}
                  onChange={(e) => set("date", e.target.value)}
                  aria-invalid={errors.date ? true : undefined}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className={inputClass}
                />
              </Field>
              <Field id="time" label={t.timeLabel}>
                <input
                  id="time"
                  type="time"
                  value={values.time}
                  onChange={(e) => set("time", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
            {dateTaken && (
              <p role="status" className="rounded-xl bg-surface p-3 text-sm font-semibold">
                {t.dateTaken}
              </p>
            )}

            <Field id="venue" label={t.venueLabel}>
              <input
                id="venue"
                type="text"
                value={values.venue}
                onChange={(e) => set("venue", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field id="area" label={t.areaLabel} error={errors.area}>
              <input
                id="area"
                type="text"
                value={values.area}
                onChange={(e) => set("area", e.target.value)}
                aria-invalid={errors.area ? true : undefined}
                aria-describedby={errors.area ? "area-error" : undefined}
                className={inputClass}
              />
            </Field>

            <Field id="guests" label={t.guestsLabel} error={errors.guests}>
              <select
                id="guests"
                value={values.guests}
                onChange={(e) => set("guests", e.target.value)}
                aria-invalid={errors.guests ? true : undefined}
                aria-describedby={errors.guests ? "guests-error" : undefined}
                className={inputClass}
              >
                <option value="">{t.choose}</option>
                {content.guests.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Group id="pack" legend={t.packLabel}>
              {content.packs.map((p) => (
                <Chip
                  key={p.id}
                  type="radio"
                  name="pack"
                  value={p.id}
                  checked={values.pack === p.id}
                  onChange={() => set("pack", p.id)}
                >
                  {p.label}
                </Chip>
              ))}
            </Group>
            <p className="-mt-3 text-sm">
              <Link
                href={`/${locale}/menus`}
                target="_blank"
                className="font-semibold text-primary underline"
              >
                {t.seePacks}
              </Link>
            </p>

            <Group id="service" legend={t.serviceLabel}>
              {content.services.map((s) => (
                <Chip
                  key={s.id}
                  type="radio"
                  name="service"
                  value={s.id}
                  checked={values.service === s.id}
                  onChange={() => set("service", s.id)}
                >
                  {s.label}
                </Chip>
              ))}
            </Group>

            <Group id="extras" legend={t.optionsLabel}>
              {content.extras.map((x) => (
                <Chip
                  key={x.id}
                  type="checkbox"
                  name="extras"
                  value={x.id}
                  checked={values.extras.includes(x.id)}
                  onChange={() => toggleExtra(x.id)}
                >
                  {x.label}
                </Chip>
              ))}
            </Group>

            <Field id="diet" label={t.dietLabel}>
              <textarea
                id="diet"
                rows={3}
                value={values.diet}
                onChange={(e) => set("diet", e.target.value)}
                placeholder={t.dietPlaceholder}
                className={inputClass}
              />
            </Field>

            <Field id="budget" label={t.budgetLabel} hint={t.budgetHint}>
              <select
                id="budget"
                value={values.budget}
                onChange={(e) => set("budget", e.target.value)}
                aria-describedby="budget-hint"
                className={inputClass}
              >
                <option value="">{t.choose}</option>
                {content.budgets.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <Field id="name" label={t.nameLabel} error={errors.name}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass}
              />
            </Field>

            <Field id="phone" label={t.phoneLabel} hint={t.phoneHint} error={errors.phone}>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? "phone-hint phone-error" : "phone-hint"}
                className={inputClass}
              />
            </Field>

            <Field id="email" label={t.emailLabel} error={errors.email}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="source" label={t.sourceLabel}>
                <select
                  id="source"
                  value={values.source}
                  onChange={(e) => set("source", e.target.value)}
                  className={inputClass}
                >
                  <option value="">{t.choose}</option>
                  {content.sources.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="promo" label={t.promoLabel}>
                <input
                  id="promo"
                  type="text"
                  value={values.promo}
                  onChange={(e) => set("promo", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field id="comment" label={t.commentLabel}>
              <textarea
                id="comment"
                rows={3}
                value={values.comment}
                onChange={(e) => set("comment", e.target.value)}
                className={inputClass}
              />
            </Field>

            <div>
              <label className="flex min-h-11 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                />
                <span>{t.consentLabel}</span>
              </label>
              {errors.consent && (
                <p id="consent-error" role="alert" className="mt-1.5 text-sm font-semibold text-primary">
                  {errors.consent}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep((step - 1) as Step);
            }}
            className="btn border border-line"
          >
            {t.back}
          </button>
        )}

        {step < 3 ? (
          <button type="button" onClick={goNext} className="btn btn-primary">
            {t.next}
          </button>
        ) : ready ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSent(true)}
            className="btn btn-primary"
          >
            {t.send}
          </a>
        ) : (
          <button type="button" onClick={trySend} className="btn btn-primary">
            {t.send}
          </button>
        )}
      </div>

      {step === 3 && <p className="mt-3 text-sm text-muted">{t.sendHint}</p>}
    </form>
  );
}