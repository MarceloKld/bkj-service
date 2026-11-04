import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getMenus } from "@/data/menus";
import { siteConfig } from "@/data/config";
import MenuExplorer from "@/components/sections/MenuExplorer";
import ExtrasList from "@/components/sections/ExtrasList";
import OrderSteps from "@/components/sections/OrderSteps";
import Reveal from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.menusPage.title, description: dict.menusPage.intro };
}

export default async function MenusPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.menusPage;
  const menus = getMenus(locale);

  const formatter = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: siteConfig.currency,
    maximumFractionDigits: 0,
  });

  const packs = menus.packs.map((p) => ({
    ...p,
    priceLabel:
      siteConfig.showPrices && p.priceFromUsd
        ? `${t.fromPrice} ${formatter.format(p.priceFromUsd)} ${t.perGuest}`
        : undefined,
  }));

  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-8 pt-12 lg:pt-16">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.intro}</p>
        {!siteConfig.showPrices && (
          <aside className="mt-8 flex max-w-2xl gap-3 rounded-2xl bg-surface p-4 sm:p-5">
            <Info size={22} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h2 className="font-display text-lg font-semibold">{t.pricingTitle}</h2>
              <p className="mt-1 text-muted">{t.pricingNote}</p>
            </div>
          </aside>
        )}
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <MenuExplorer locale={locale} packs={packs} labels={menus.filterLabels} t={t} />
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <ExtrasList title={t.extrasTitle} intro={t.extrasIntro} extras={menus.extras} />
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <Reveal className="max-w-2xl">
          <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
            {t.dietsTitle}
          </h2>
          <p data-reveal className="mt-3 text-lg text-muted">
            {t.dietsText}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <OrderSteps title={t.stepsTitle} steps={menus.steps} />
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
              {t.quoteCta}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export const instant = false;