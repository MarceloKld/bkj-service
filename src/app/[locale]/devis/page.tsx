import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getQuote } from "@/data/quote";
import { getMenus } from "@/data/menus";
import { unavailableDates } from "@/data/availability";
import QuoteForm from "@/components/forms/QuoteForm";
import OrderSteps from "@/components/sections/OrderSteps";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getQuote(locale);
  return { title: content.t.title, description: content.t.intro };
}

export default async function QuotePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const content = getQuote(locale);
  const steps = getMenus(locale).steps;

  return (
    <>
      <header className="mx-auto max-w-3xl px-5 pb-8 pt-12 lg:pt-16">
        <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{content.t.title}</h1>
        <p className="mt-4 text-lg text-muted">{content.t.intro}</p>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-20">
        <Suspense fallback={<div className="h-96 rounded-3xl bg-surface" aria-hidden="true" />}>
          <QuoteForm locale={locale} content={content} unavailableDates={unavailableDates}>
            <OrderSteps title={dict.menusPage.stepsTitle} steps={steps} />
          </QuoteForm>
        </Suspense>
      </section>
    </>
  );
}

export const instant = false;