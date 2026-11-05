import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cake, Check, Heart, PartyPopper, Users } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Service } from "@/data/services";
import { getGallery, type GalleryItem } from "@/data/gallery";
import Reveal from "@/components/motion/Reveal";

type Props = { locale: Locale; dict: Dictionary; service: Service; index: number };

const icons = { heart: Heart, cake: Cake, party: PartyPopper };

export default function ServiceSection({ locale, dict, service, index }: Props) {
  const t = dict.servicesPage;
  const Icon = icons[service.icon];
  const quoteHref = (type: string) => `/${locale}/devis?type=${type}`;

  const gallery = getGallery(locale);
  const photos = service.photos
    .map((id) => gallery.find((g) => g.id === id))
    .filter((g): g is GalleryItem => Boolean(g));

  return (
    <section id={service.slug} className="scroll-mt-24 border-t border-line py-14 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div data-reveal className="flex items-center gap-3 text-muted">
            <span className="font-display text-sm">0{index + 1}</span>
            <Icon size={28} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
          </div>
          <h2 data-reveal className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            {service.title}
          </h2>
          <p data-reveal className="mt-4 max-w-md text-lg text-muted">
            {service.intro}
          </p>
          <div data-reveal className="mt-6">
            <Link href={quoteHref(service.slug)} className="btn btn-primary">
              {t.quoteCta}
            </Link>
          </div>

          {photos.length > 0 && (
            <ul data-reveal className="mt-8 grid max-w-md grid-cols-2 gap-3">
              {photos.map((p, i) => (
                <li
                  key={p.id}
                  className={`relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface ${
                    i === 1 ? "mt-6" : ""
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 220px, 45vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal className="space-y-10" stagger={0.15}>
          <div data-reveal>
            <h3 className="font-display text-xl font-semibold">{t.variantsTitle}</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {service.variants.map((v) => (
                <li key={v.id} className="flex items-start justify-between gap-4 py-5">
                  <div>
                    <h4 className="font-display text-xl font-semibold">{v.title}</h4>
                    <p className="mt-1 text-muted">{v.text}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
                      <Users size={16} aria-hidden="true" />
                      {t.guestsLabel} : {v.guests}
                    </p>
                  </div>
                  <Link
                    href={quoteHref(v.id)}
                    aria-label={`${t.quoteVariant} ${v.title}`}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-primary transition-colors hover:border-primary hover:bg-primary hover:text-on-primary"
                  >
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="font-display text-xl font-semibold">{t.includesTitle}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="font-display text-xl font-semibold">{t.optionsTitle}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.options.map((o) => (
                <li key={o} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                  {o}
                </li>
              ))}
            </ul>
          </div>

          {service.flow && (
            <div data-reveal>
              <h3 className="font-display text-xl font-semibold">{t.flowTitle}</h3>
              <ol className="mt-3 space-y-3">
                {service.flow.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-display text-primary">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}