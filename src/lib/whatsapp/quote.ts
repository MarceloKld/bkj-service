import type { Locale } from "@/i18n/config";
import type { QuoteContent } from "@/data/quote";

export type QuoteValues = {
  category: string;
  variant: string;
  date: string;
  time: string;
  venue: string;
  area: string;
  guests: string;
  pack: string;
  service: string;
  extras: string[];
  diet: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  promo: string;
  comment: string;
  consent: boolean;
};

// Renvoie le numero au format international, ou null s'il est invalide
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("0")) return `+243${digits.slice(1)}`;
  if (digits.length === 9 && /^[89]/.test(digits)) return `+243${digits}`;
  if (digits.length === 12 && digits.startsWith("243")) return `+${digits}`;
  if (raw.trim().startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  return null;
}

function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(date);
}

export function buildQuoteMessage(values: QuoteValues, content: QuoteContent, locale: Locale): string {
  const t = content.t;
  const labelOf = (list: { id: string; label: string }[], id: string) =>
    list.find((o) => o.id === id)?.label ?? "";
  const line = (key: string, value: string) => (value.trim() ? `${key} : ${value.trim()}` : "");
  const section = (title: string, lines: string[]) => {
    const kept = lines.filter(Boolean);
    return kept.length > 0 ? ["", `*${title}*`, ...kept] : [];
  };

  const category = content.categories.find((c) => c.id === values.category);
  const variant = category?.variants.find((v) => v.id === values.variant);
  const dateText = values.date
    ? `${formatDate(values.date, locale)}${values.time ? ` ${t.msgAt} ${values.time}` : ""}`
    : "";
  const phone = normalizePhone(values.phone) ?? values.phone.trim();
  const extras = values.extras
    .map((id) => labelOf(content.extras, id))
    .filter(Boolean)
    .join(", ");

  return [
    t.msgIntro,
    ...section(t.msgEventTitle, [
      line(t.msgType, variant?.label ?? category?.label ?? ""),
      line(t.msgDate, dateText),
      line(t.msgPlace, values.venue),
      line(t.msgArea, values.area),
      line(t.msgGuests, labelOf(content.guests, values.guests)),
    ]),
    ...section(t.msgNeedsTitle, [
      line(t.msgPack, labelOf(content.packs, values.pack)),
      line(t.msgService, labelOf(content.services, values.service)),
      line(t.msgOptions, extras),
      line(t.msgDiet, values.diet),
      line(t.msgBudget, labelOf(content.budgets, values.budget)),
    ]),
    ...section(t.msgContactTitle, [
      line(t.msgName, values.name),
      line(t.msgPhone, phone),
      line(t.msgEmail, values.email),
      line(t.msgSource, labelOf(content.sources, values.source)),
      line(t.msgPromo, values.promo),
      line(t.msgComment, values.comment),
    ]),
    "",
    t.msgThanks,
  ].join("\n");
}