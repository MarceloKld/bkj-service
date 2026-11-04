"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Share2, Users } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { EventFilter, Pack, ServiceStyle } from "@/data/menus";

type PackWithPrice = Pack & { priceLabel?: string };

type Props = {
  locale: string;
  packs: PackWithPrice[];
  labels: {
    events: Record<EventFilter, string>;
    styles: Record<ServiceStyle, string>;
  };
  t: Dictionary["menusPage"];
};

export default function MenuExplorer({ locale, packs, labels, t }: Props) {
  const [eventFilter, setEventFilter] = useState<EventFilter | "all">("all");
  const [styleFilter, setStyleFilter] = useState<ServiceStyle | "all">("all");

  const shown = packs.filter(
    (p) =>
      (eventFilter === "all" || p.events.includes(eventFilter)) &&
      (styleFilter === "all" || p.styles.includes(styleFilter)),
  );

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
      active
        ? "border-primary bg-primary text-on-primary"
        : "border-line text-ink hover:border-primary hover:text-primary"
    }`;

  const share = (pack: Pack) => {
    const url = `${window.location.origin}/${locale}/menus#${pack.id}`;
    const text = `${t.shareMessage.replace("{name}", pack.name)} ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const group = <T extends string>(
    title: string,
    values: Record<T, string>,
    current: T | "all",
    set: (v: T | "all") => void,
  ) => (
    <div role="group" aria-label={title} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">{title}</span>
      <button type="button" aria-pressed={current === "all"} onClick={() => set("all")} className={chip(current === "all")}>
        {t.all}
      </button>
      {(Object.keys(values) as T[]).map((key) => (
        <button key={key} type="button" aria-pressed={current === key} onClick={() => set(key)} className={chip(current === key)}>
          {values[key]}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div className="space-y-3">
        {group(t.filterEvent, labels.events, eventFilter, setEventFilter)}
        {group(t.filterStyle, labels.styles, styleFilter, setStyleFilter)}
      </div>

      <p className="sr-only" aria-live="polite">
        {t.resultCount.replace("{n}", String(shown.length))}
      </p>

      {shown.length === 0 ? (
        <p className="mt-10 max-w-xl text-lg text-muted">{t.noResult}</p>
      ) : (
        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-3">
          {shown.map((pack) => {
            const prestige = pack.id === "prestige";
            const tone = {
              box:
                pack.id === "essentiel"
                  ? "border border-line bg-page"
                  : pack.id === "confort"
                    ? "border border-line bg-surface"
                    : "bg-primary text-on-primary",
              muted: prestige ? "text-on-primary/85" : "text-muted",
              check: prestige ? "text-on-primary" : "text-primary",
              line: prestige ? "border-on-primary/30" : "border-line",
            };
            return (
              <article
                key={pack.id}
                id={pack.id}
                className={`fade-up flex scroll-mt-24 flex-col rounded-3xl p-6 sm:p-8 ${tone.box}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-3xl font-bold">{pack.name}</h3>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${tone.line}`}
                  >
                    {pack.priceLabel ?? t.onQuote}
                  </span>
                </div>
                <p className={`mt-2 ${tone.muted}`}>{pack.tagline}</p>

                <h4 className="mt-6 font-display text-lg font-semibold">{t.includesTitle}</h4>
                <ul className="mt-2 space-y-2">
                  {pack.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check size={18} className={`mt-0.5 shrink-0 ${tone.check}`} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="mt-6 font-display text-lg font-semibold">{t.exampleTitle}</h4>
                <ul className={`mt-2 space-y-1 text-sm ${tone.muted}`}>
                  {pack.example.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                <div className={`mt-6 space-y-1 border-t pt-4 text-sm ${tone.line} ${tone.muted}`}>
                  <p className="flex items-center gap-1.5">
                    <Users size={16} aria-hidden="true" />
                    {t.guestsLabel} : {pack.guests}
                  </p>
                  <p>
                    {t.idealFor} : {pack.events.map((e) => labels.events[e]).join(", ")}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  <Link
                    href={`/${locale}/devis?pack=${pack.id}`}
                    className={`btn ${prestige ? "bg-on-primary text-primary" : "btn-primary"}`}
                  >
                    {t.quoteCta}
                  </Link>
                  <button
                    type="button"
                    onClick={() => share(pack)}
                    className="btn border border-current"
                  >
                    <Share2 size={18} aria-hidden="true" />
                    {t.share}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}