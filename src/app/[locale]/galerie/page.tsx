import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getGallery } from "@/data/gallery";
import Gallery from "@/components/sections/Gallery";
import Reveal from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.galleryPage.title, description: dict.galleryPage.intro };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.galleryPage;
  const items = getGallery(locale);

  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-8 pt-12 lg:pt-16">
        <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.intro}</p>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <Gallery items={items} t={t} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:pb-24">
        <Reveal className="rounded-3xl bg-surface p-8 sm:p-12">
          <h2 data-reveal className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            {t.closingTitle}
          </h2>
          <p data-reveal className="mt-3 max-w-xl text-lg text-muted">
            {t.closingText}
          </p>
          <div data-reveal className="mt-6">
            <Link href={`/${locale}/devis`} className="btn btn-primary">
              {t.closingCta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export const instant = false;