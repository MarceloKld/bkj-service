"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };
type Props = { slides: Slide[]; label: string; photoOf: string; interval?: number };

export default function HeroAlbum({ slides, label, photoOf, interval = 3000 }: Props) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(mq.matches);
    const onVisibility = () => setHidden(document.hidden);
    onMotion();
    mq.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (reduced || hovered || hidden || slides.length < 2) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => clearTimeout(timer);
  }, [active, reduced, hovered, hidden, slides.length, interval]);

  const dotLabel = (n: number) =>
    photoOf.replace("{n}", String(n)).replace("{total}", String(slides.length));

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
        {slides.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            loading={i === 0 ? "eager" : undefined}
            fetchPriority={i === 0 ? "high" : undefined}
            aria-hidden={i !== active}
            className={`object-cover transition-opacity duration-700 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-center">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={dotLabel(i + 1)}
            aria-current={i === active ? "true" : undefined}
            className="grid h-11 w-9 place-items-center"
          >
            <span
              className={`h-2 w-6 rounded-full transition-colors duration-300 ${
                i === active ? "bg-primary" : "bg-muted/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}