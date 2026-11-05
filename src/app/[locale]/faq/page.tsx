import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getFaq } from "@/data/faq";
import { whatsappLink } from "@/lib/whatsapp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.faqPage.title, description: dict.faqPage.intro };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.faqPage;
  const groups = getFaq(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: groups.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="mx-auto max-w-6xl px-5 pb-10 pt-12 lg:pt-16">
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{t.intro}</p>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 lg:grid-cols-[1fr_1.7fr]">
        <aside className="h-fit rounded-3xl bg-surface p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl font-bold">{t.stillTitle}</h2>
          <p className="mt-2 text-muted">{t.stillText}</p>
          <a
            href={whatsappLink(dict.contactPage.msgGeneric)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-5"
          >
            {dict.contactPage.whatsappCta}
          </a>
        </aside>

        <div className="space-y-12">
          {groups.map((g) => (
            <section key={g.id}>
              <h2 className="font-display text-2xl font-bold">{g.title}</h2>
              <div className="mt-4 divide-y divide-line border-y border-line">
                {g.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                      <span>{item.q}</span>
                      <Plus
                        size={20}
                        className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="pb-5 pr-8 text-muted">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

export const instant = false;