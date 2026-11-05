import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { heroImages } from "@/data/hero";
import TypedText from "@/components/motion/TypedText";
import Parallax from "@/components/motion/Parallax";
import HeroAlbum from "@/components/sections/HeroAlbum";
import ServicesPreview from "@/components/sections/ServicesPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const slides = heroImages.map((src, i) => ({
    src,
    alt: dict.home.heroAlts[i] ?? dict.home.albumLabel,
  }));

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-8 lg:grid-cols-2 lg:gap-14 lg:py-12">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl">
            {dict.home.heroPrefix}
            <span className="sr-only"> {dict.home.heroWords.join(", ")}</span>
            <span aria-hidden="true" className="block min-h-[1.15em] text-primary">
              <TypedText words={dict.home.heroWords} />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{dict.home.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/devis`} className="btn btn-primary">
              {dict.home.ctaQuote}
            </Link>
            <Link href={`/${locale}/yaourts`} className="btn btn-accent">
              {dict.home.ctaYogurts}
            </Link>
          </div>

          <ul className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
            {dict.home.statsValues.map((value, i) => (
              <li key={value}>
                <span className="block font-display text-3xl font-bold text-primary">{value}</span>
                <span className="block text-sm text-muted">{dict.home.statsLabels[i]}</span>
              </li>
            ))}
          </ul>
        </div>

        <Parallax distance={36} className="lg:[&_.aspect-\[4\/5\]]:aspect-[5/6]">
          <HeroAlbum slides={slides} label={dict.home.albumLabel} photoOf={dict.home.photoOf} />
        </Parallax>
      </section>

      <ServicesPreview locale={locale} dict={dict} />
      <GalleryPreview locale={locale} dict={dict} />
    </>
  );
}

export const instant = false;