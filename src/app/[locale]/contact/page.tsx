import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/data/config";
import { whatsappLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import CopyNumber from "@/components/ui/CopyNumber";
import Reveal from "@/components/motion/Reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.contactPage.title, description: dict.contactPage.intro };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.contactPage;
  const { business } = siteConfig;

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

  const topics = [
    { label: t.topicWedding, message: t.msgWedding },
    { label: t.topicBirthday, message: t.msgBirthday },
    { label: t.topicEvent, message: t.msgEvent },
    { label: t.topicYogurts, message: t.msgYogurts },
    { label: t.topicOther, message: t.msgGeneric },
  ];

  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-12 lg:pt-16">
        <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.intro}</p>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl bg-primary p-8 text-on-primary sm:p-12">
          <WhatsAppIcon size={36} />
          <p className="mt-6 text-sm font-semibold opacity-90">{t.whatsappTitle}</p>
          <p className="mt-1 font-display text-4xl font-bold sm:text-5xl">{business.whatsappDisplay}</p>
          <p className="mt-3 max-w-sm opacity-90">{t.onlyWhatsapp}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(t.msgGeneric)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-on-primary text-primary"
            >
              {t.whatsappCta}
            </a>
            <CopyNumber value={business.whatsappDisplay} label={t.copy} copiedLabel={t.copied} />
          </div>
        </div>

        <dl className="divide-y divide-line border-y border-line lg:self-center">
          <div className="flex gap-4 py-6">
            <Clock size={26} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <dt className="font-display text-lg font-semibold">{t.availabilityTitle}</dt>
              <dd className="mt-1 text-muted">{t.availability}</dd>
            </div>
          </div>
          <div className="flex gap-4 py-6">
            <MapPin size={26} strokeWidth={1.5} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <dt className="font-display text-lg font-semibold">{t.addressTitle}</dt>
              <dd className="mt-1 text-muted">{business.address}</dd>
              <dd className="mt-2">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1 pb-0.5 font-semibold text-primary"
                >
                  {t.mapLink}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </dd>
            </div>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-6xl border-t border-line px-5 py-16">
        <Reveal>
          <h2 data-reveal className="font-display text-3xl font-bold sm:text-4xl">
            {t.topicsTitle}
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <li key={topic.label} data-reveal>
                <a
                  href={whatsappLink(topic.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-5 font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {topic.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:pb-24">
        <Reveal className="rounded-3xl bg-surface p-8 sm:p-12">
          <h2 data-reveal className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            {t.quoteTitle}
          </h2>
          <p data-reveal className="mt-3 max-w-xl text-lg text-muted">
            {t.quoteText}
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