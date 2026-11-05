"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { GalleryCategory, GalleryItem } from "@/data/gallery";

type Props = { items: GalleryItem[]; t: Dictionary["galleryPage"] };
type Filter = GalleryCategory | "all";

export default function Gallery({ items, t }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);

  const labels: Record<Filter, string> = {
    all: t.filterAll,
    mariage: t.catMariage,
    anniversaire: t.catAnniversaire,
    buffets: t.catBuffets,
    yaourts: t.catYaourts,
  };

  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
  const countOf = (f: Filter) => (f === "all" ? items.length : items.filter((i) => i.category === f).length);
  const current = active !== null ? shown[active] : undefined;

  const openAt = (index: number) => {
    setActive(index);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  };

  const closeDialog = () => dialogRef.current?.close();

  const handleClosed = () => {
    setActive(null);
    document.documentElement.style.overflow = "";
  };

  const step = (delta: number) =>
    setActive((i) => (i === null ? i : (i + delta + shown.length) % shown.length));

  const chip = (active: boolean) =>
    `inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${
      active
        ? "border-primary bg-primary text-on-primary"
        : "border-line text-ink hover:border-primary hover:text-primary"
    }`;

  const roundButton =
    "grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25";

  return (
    <div>
      <div role="group" aria-label={t.filterLabel} className="flex flex-wrap gap-2">
        {(Object.keys(labels) as Filter[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={chip(filter === key)}
          >
            {labels[key]} ({countOf(key)})
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {t.resultCount.replace("{n}", String(shown.length))}
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((item, index) => (
          <li key={item.id} className="fade-up">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => openAt(index)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                loading={index < 3 ? "eager" : undefined}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={t.dialogLabel}
        onClose={handleClosed}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        <div
          className="flex h-full w-full flex-col"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div
            className="flex items-center justify-between px-4 pb-2"
            style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
          >
            <p className="text-sm">
              {active !== null &&
                t.counter.replace("{n}", String(active + 1)).replace("{total}", String(shown.length))}
            </p>
            <button type="button" onClick={closeDialog} aria-label={t.close} className={roundButton}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative min-h-0 flex-1"
            onTouchStart={(e) => {
              touchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStart.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStart.current;
              touchStart.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            {current && (
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.prev}
              className={`${roundButton} absolute left-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.next}
              className={`${roundButton} absolute right-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>

          <p
            className="px-4 pt-3 text-center text-sm text-white/85"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
          >
            {current?.alt}
          </p>
        </div>
      </dialog>
    </div>
  );
}