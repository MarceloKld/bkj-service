import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getReviewsTexts, reviews } from "@/data/reviews";
import { whatsappLink } from "@/lib/whatsapp";
import Reveal from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getReviewsTexts(locale);
  return { title: t.title, description: t.intro };
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getReviewsTexts(locale);

  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-12 lg:pt-16">
        <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.intro}</p>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        {reviews.length === 0 ? (
          <div className="max-w-2xl border-y border-line py-10">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t.emptyTitle}</h2>
            <p className="mt-3 text-lg text-muted">{t.emptyText}</p>
          </div>
        ) : (
          <Reveal>
            <ul className="grid gap-x-12 gap-y-2 md:grid-cols-2">
              {reviews.map((r) => (
                <li key={`${r.name}-${r.text.slice(0, 20)}`} data-reveal className="border-b border-line py-8">
                  <p
                    className="flex gap-1 text-primary"
                    role="img"
                    aria-label={t.ratingLabel.replace("{n}", String(r.rating))}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={20}
                        aria-hidden="true"
                        className={n <= r.rating ? "fill-current" : "text-line"}
                      />
                    ))}
                  </p>
                  <blockquote className="mt-3 text-lg">{r.text}</blockquote>
                  <p className="mt-4 font-semibold">{r.name}</p>
                  {r.event && <p className="text-sm text-muted">{r.event}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:pb-24">
        <Reveal className="rounded-3xl bg-surface p-8 sm:p-12">
          <h2 data-reveal className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            {t.leaveTitle}
          </h2>
          <p data-reveal className="mt-3 max-w-xl text-lg text-muted">
            {t.leaveText}
          </p>
          <div data-reveal className="mt-6">
            <a
              href={whatsappLink(t.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t.leaveCta}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

export const instant = false;