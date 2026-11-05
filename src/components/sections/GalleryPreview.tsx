import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getGallery, homePreviewIds, type GalleryItem } from "@/data/gallery";
import Reveal from "@/components/motion/Reveal";

type Props = { locale: Locale; dict: Dictionary };

export default function GalleryPreview({ locale, dict }: Props) {
  const t = dict.homeGallery;
  const all = getGallery(locale);
  const photos = homePreviewIds
    .map((id) => all.find((g) => g.id === id))
    .filter((g): g is GalleryItem => Boolean(g));

  if (photos.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 lg:pb-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 data-reveal className="font-display text-3xl font-bold sm:text-5xl">
            {t.title}
          </h2>
          <p data-reveal className="mt-3 text-lg text-muted">
            {t.intro}
          </p>
        </div>
        <Link
          data-reveal
          href={`/${locale}/galerie`}
          className="link-underline inline-flex items-center gap-2 pb-0.5 font-semibold text-primary"
        >
          {t.link}
          <ArrowRight size={18} className="arrow-slide" aria-hidden="true" />
        </Link>
      </Reveal>

      <Reveal className="mt-8 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4" stagger={0.1}>
        {photos.map((p, i) => (
          <div
            key={p.id}
            data-reveal
            className={`relative overflow-hidden rounded-2xl border border-line bg-surface ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              className="object-cover"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}