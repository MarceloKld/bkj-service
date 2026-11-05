import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getYogurts, yogurtConfig } from "@/data/yogurts";
import YogurtOrder from "@/components/sections/YogurtOrder";
import Reveal from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.yogurtsPage.title, description: dict.yogurtsPage.intro };
}

export default async function YogurtsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.yogurtsPage;
  const { products, featured, gallery } = getYogurts(locale);

  const details = [
    { label: t.pickupPlaceLabel, value: yogurtConfig.pickupPlace },
    { label: t.zonesLabel, value: yogurtConfig.deliveryZones },
    { label: t.hoursLabel, value: yogurtConfig.hours },
  ].filter((d) => d.value);

  return (
    <>
      <header className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-lg text-lg text-muted">{t.intro}</p>
        </div>
        <ul className="grid max-w-md grid-cols-2 gap-3">
          {featured.map((f, i) => (
            <li
              key={f.src}
              className={`fade-up relative aspect-[5/6] overflow-hidden rounded-2xl border border-line bg-surface ${
                i === 1 ? "mt-8" : ""
              }`}
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 1024px) 220px, 45vw"
                loading={i === 0 ? "eager" : undefined}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t.orderTitle}</h2>
        <p className="mb-8 mt-2 max-w-xl text-muted">{t.orderIntro}</p>
        <YogurtOrder locale={locale} products={products} t={t} minUnits={yogurtConfig.minUnits} />
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <Reveal className="max-w-2xl">
          <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
            {t.deliveryTitle}
          </h2>
          <p data-reveal className="mt-3 text-lg text-muted">
            {t.deliveryText}
          </p>
          {details.length > 0 && (
            <dl data-reveal className="mt-6 divide-y divide-line border-y border-line">
              {details.map((d) => (
                <div key={d.label} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                  <dt className="w-44 shrink-0 font-semibold">{d.label}</dt>
                  <dd className="text-muted">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <Reveal>
          <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
            {t.galleryTitle}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {gallery.map((g) => (
              <li key={g.src} data-reveal className="relative aspect-[5/6] overflow-hidden rounded-2xl border border-line bg-surface">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </Reveal>
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
            <Link href={`/${locale}/devis?type=yaourts`} className="btn btn-primary">
              {t.closingCta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export const instant = false;