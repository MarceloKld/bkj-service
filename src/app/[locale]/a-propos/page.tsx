import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, HeartHandshake, Leaf, ShieldCheck } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getAbout } from "@/data/about";
import { getGallery, type GalleryItem } from "@/data/gallery";
import Reveal from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

const icons = { leaf: Leaf, shield: ShieldCheck, clock: Clock, handshake: HeartHandshake };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const about = getAbout(locale);
  return { title: about.title, description: about.intro };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const about = getAbout(locale);

  const gallery = getGallery(locale);
  const photos = about.photoIds
    .map((id) => gallery.find((g) => g.id === id))
    .filter((g): g is GalleryItem => Boolean(g));

  return (
    <>
      <header className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{about.title}</h1>
          <p className="mt-4 max-w-lg text-lg text-muted">{about.intro}</p>
        </div>
        {photos.length > 0 && (
          <ul className="grid max-w-md grid-cols-2 gap-3">
            {photos.map((p, i) => (
              <li
                key={p.id}
                className={`fade-up relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface ${
                  i === 1 ? "mt-8" : ""
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 220px, 45vw"
                  loading={i === 0 ? "eager" : undefined}
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        )}
      </header>

      {about.story.paragraphs.length > 0 && (
        <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
          <Reveal className="max-w-2xl">
            <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
              {about.story.title}
            </h2>
            {about.story.paragraphs.map((p) => (
              <p key={p} data-reveal className="mt-4 text-lg text-muted">
                {p}
              </p>
            ))}
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <Reveal>
          <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
            {about.valuesTitle}
          </h2>
          <ul className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {about.values.map((v) => {
              const Icon = icons[v.icon];
              return (
                <li key={v.title} data-reveal className="flex gap-4 border-b border-line py-6">
                  <Icon size={28} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                    <p className="mt-1 text-muted">{v.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <Reveal>
          <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
            {about.activitiesTitle}
          </h2>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {about.activities.map((a) => (
              <li key={a.title} data-reveal className="grid gap-4 py-8 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center">
                <h3 className="font-display text-2xl font-bold">{a.title}</h3>
                <p className="text-muted">{a.text}</p>
                <Link
                  href={`/${locale}${a.href}`}
                  className="link-underline inline-flex items-center gap-2 pb-0.5 font-semibold text-primary"
                >
                  {a.cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:pb-24">
        <Reveal className="rounded-3xl bg-surface p-8 sm:p-12">
          <h2 data-reveal className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            {about.ctaTitle}
          </h2>
          <p data-reveal className="mt-3 max-w-xl text-lg text-muted">
            {about.ctaText}
          </p>
          <div data-reveal className="mt-6">
            <Link href={`/${locale}/devis`} className="btn btn-primary">
              {about.ctaButton}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export const instant = false;