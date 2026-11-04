import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getServices } from "@/data/services";
import ServiceSection from "@/components/sections/ServiceSection";
import Reveal from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.servicesPage.title, description: dict.servicesPage.intro };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.servicesPage;
  const services = getServices(locale);

  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-12 lg:pt-16">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.intro}</p>
        <nav aria-label={t.jumpLabel} className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </header>

      {services.map((service, i) => (
        <ServiceSection key={service.slug} locale={locale} dict={dict} service={service} index={i} />
      ))}

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
              {t.quoteCta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export const instant = false;