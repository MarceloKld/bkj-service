"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatFc, type Product } from "@/data/yogurts";
import { whatsappLink } from "@/lib/whatsapp";

type Props = {
  locale: string;
  products: Product[];
  t: Dictionary["yogurtsPage"];
  minUnits: number;
};

type Mode = "pickup" | "delivery";

export default function YogurtOrder({ locale, products, t, minUnits }: Props) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<Mode>("pickup");
  const [zone, setZone] = useState("");
  const [isEvent, setIsEvent] = useState(false);

  const setQuantity = (id: string, value: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(99, value)) }));

  const chosen = products.filter((p) => (qty[p.id] ?? 0) > 0);
  const units = chosen.reduce((sum, p) => sum + (qty[p.id] ?? 0), 0);
  const total = chosen.reduce((sum, p) => sum + p.priceFc * (qty[p.id] ?? 0), 0);
  const minimum = Math.max(1, minUnits);
  const canOrder = units >= minimum;

  const lines = chosen.map((p) => {
    const n = qty[p.id] ?? 0;
    return `- ${n} x ${p.name} ${p.size} (${formatFc(p.priceFc)}) = ${formatFc(p.priceFc * n)}`;
  });
  const message = [
    t.msgHello,
    ...lines,
    `${t.msgTotal} : ${formatFc(total)}`,
    `${t.msgMode} : ${mode === "pickup" ? t.pickup : t.delivery}`,
    mode === "delivery" && zone.trim() ? `${t.msgZone} : ${zone.trim()}` : null,
    isEvent ? t.msgEvent : null,
    t.msgThanks,
  ]
    .filter(Boolean)
    .join("\n");

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
      active
        ? "border-primary bg-primary text-on-primary"
        : "border-line text-ink hover:border-primary hover:text-primary"
    }`;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      <ul className="space-y-10">
        {products.map((p) => {
          const n = qty[p.id] ?? 0;
          return (
            <li key={p.id} className="grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr]">
              <div className="relative aspect-[5/6] overflow-hidden rounded-2xl border border-line bg-surface">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 640px) 240px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-muted">
                  {t.flavorLabel} : {p.flavor}
                </p>
                <h3 className="mt-1 font-display text-3xl font-bold">
                  {p.name} <span className="text-muted">{p.size}</span>
                </h3>
                <p className="mt-3 max-w-sm text-muted">{p.text}</p>
                <p className="mt-4 font-display text-3xl font-bold text-primary">{formatFc(p.priceFc)}</p>

                <div
                  role="group"
                  aria-label={`${t.quantityOf} ${p.name} ${p.size}`}
                  className="mt-auto flex items-center gap-2 pt-6"
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(p.id, n - 1)}
                    disabled={n === 0}
                    aria-label={t.decrease}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:border-primary disabled:opacity-40"
                  >
                    <Minus size={18} aria-hidden="true" />
                  </button>
                  <span aria-live="polite" className="w-12 text-center font-display text-2xl font-bold">
                    {n}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(p.id, n + 1)}
                    aria-label={t.increase}
                    className="grid h-11 w-11 place-items-center rounded-full bg-primary text-on-primary transition-transform active:scale-95"
                  >
                    <Plus size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-28">
        <h3 className="font-display text-2xl font-bold">{t.summaryTitle}</h3>

        {chosen.length === 0 ? (
          <p className="mt-3 text-muted">{t.emptySummary}</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {chosen.map((p) => (
              <li key={p.id} className="flex justify-between gap-3">
                <span>
                  {qty[p.id]} x {p.name} {p.size}
                </span>
                <span className="shrink-0 font-semibold">{formatFc(p.priceFc * (qty[p.id] ?? 0))}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 flex justify-between border-t border-line pt-4 font-display text-xl font-bold">
          <span>{t.total}</span>
          <span className="text-primary">{formatFc(total)}</span>
        </p>

        <div role="group" aria-label={t.modeLabel} className="mt-6">
          <p className="text-sm font-semibold text-muted">{t.modeLabel}</p>
          <div className="mt-2 flex gap-2">
            <button type="button" aria-pressed={mode === "pickup"} onClick={() => setMode("pickup")} className={chip(mode === "pickup")}>
              {t.pickup}
            </button>
            <button type="button" aria-pressed={mode === "delivery"} onClick={() => setMode("delivery")} className={chip(mode === "delivery")}>
              {t.delivery}
            </button>
          </div>
        </div>

        {mode === "delivery" && (
          <div className="mt-4">
            <label htmlFor="yogurt-zone" className="text-sm font-semibold text-muted">
              {t.zoneLabel}
            </label>
            <input
              id="yogurt-zone"
              type="text"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              placeholder={t.zonePlaceholder}
              className="mt-2 w-full rounded-xl border border-line bg-page px-4 py-3"
            />
          </div>
        )}

        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={isEvent}
            onChange={(e) => setIsEvent(e.target.checked)}
            className="h-5 w-5 accent-primary"
          />
          <span>{t.eventLabel}</span>
        </label>
        {isEvent && (
          <p className="mt-1 text-sm text-muted">
            {t.eventHint}{" "}
            <Link href={`/${locale}/devis?type=yaourts`} className="font-semibold text-primary underline">
              {t.eventQuote}
            </Link>
          </p>
        )}

        {units > 0 && !canOrder && (
          <p className="mt-4 text-sm font-semibold text-primary">{t.minNote.replace("{n}", String(minimum))}</p>
        )}

        {canOrder ? (
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-6 w-full"
          >
            {t.orderCta}
          </a>
        ) : (
          <button type="button" disabled className="btn btn-primary mt-6 w-full cursor-not-allowed opacity-50">
            {t.orderCta}
          </button>
        )}
        <p className="mt-2 text-center text-sm text-muted">{t.orderNote}</p>
      </aside>
    </div>
  );
}