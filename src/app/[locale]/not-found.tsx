"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function LocaleNotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-display text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">{dict.notFound.title}</h1>
      <p className="mt-3 text-muted">{dict.notFound.text}</p>
      <Link href={`/${locale}`} className="btn btn-primary mt-8">
        {dict.notFound.back}
      </Link>
    </section>
  );
}