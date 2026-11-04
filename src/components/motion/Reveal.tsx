"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap } from "@/lib/motion/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
};

export default function Reveal({ children, className, stagger = 0.12, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = el.querySelectorAll("[data-reveal]");
        const targets = items.length > 0 ? Array.from(items) : [el];
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger,
            clearProps: "all",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });
      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [stagger, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}