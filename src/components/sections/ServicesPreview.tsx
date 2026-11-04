import Link from "next/link";
import { ArrowRight, Cake, Heart, PartyPopper } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "@/components/motion/Reveal";

type Props = { locale: Locale; dict: Dictionary };

const icons = [Heart, Cake, PartyPopper];
const anchors = ["mariage", "anniversaire", "fetes"];

export default function ServicesPreview({ locale, dict }: Props) {
  const s = dict.sections;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
      <Reveal className="max-w-2xl">
        <h2 data-reveal className="font-display text-3xl font-bold sm:text-5xl">
          {s.servicesTitle}
        </h2>
        <p data-reveal className="mt-4 text-lg text-muted">
          {s.servicesIntro}
        </p>
      </Reveal>

      <Reveal className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-2" stagger={0.15}>
        {s.servicesTitles.map((title, i) => {
          const Icon = icons[i];
          const big = i === 0;
          return (
            <Link
              key={title}
              data-reveal
              href={`/${locale}/services#${anchors[i]}`}
              className={`card-lift flex flex-col justify-between rounded-3xl border border-line bg-surface p-6 sm:p-8 ${
                big ? "min-h-72 lg:row-span-2" : "min-h-44"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-sm text-muted">0{i + 1}</span>
                <Icon size={big ? 44 : 32} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              </div>
              <div className="mt-8">
                <h3 className={`font-display font-bold ${big ? "text-4xl" : "text-2xl"}`}>{title}</h3>
                <p className="mt-2 max-w-sm text-muted">{s.servicesTexts[i]}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary">
                  {s.learnMore}
                  <ArrowRight size={18} className="arrow-slide" aria-hidden="true" />
                </span>
              </div>
            </Link>
          );
        })}
      </Reveal>

      <Reveal className="mt-8">
        <Link href={`/${locale}/services`} className="btn btn-primary">
          {s.allServices}
        </Link>
      </Reveal>
    </section>
  );
}