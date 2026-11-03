import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
        {dict.home.heroTitle}
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
    </section>
  );
}