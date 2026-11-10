import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import {
  formatLegalDate,
  getLegal,
  getLegalLabels,
  isLegalDoc,
  legalDocs,
} from "@/data/legal";

type Props = { params: Promise<{ locale: string; doc: string }> };

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) return {};
  const page = getLegal(locale)[doc];
  return { title: page.title, description: page.intro };
}

export default async function LegalPage({ params }: Props) {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) notFound();

  const docs = getLegal(locale);
  const page = docs[doc];
  const labels = getLegalLabels(locale);

  return (
    <>
      <header className="mx-auto max-w-3xl px-5 pb-8 pt-12 lg:pt-16">
        <h1 className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl">{page.title}</h1>
        <p className="mt-4 text-lg text-muted">{page.intro}</p>
        <p className="mt-3 text-sm text-muted">
          {labels.updated} : {formatLegalDate(locale)}
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-10 px-5 pb-12">
        {page.sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-2xl font-bold">{s.title}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            {s.items && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-primary">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <nav aria-label={labels.others} className="mx-auto max-w-3xl border-t border-line px-5 pb-20 pt-8">
        <p className="text-sm font-semibold text-muted">{labels.others}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {legalDocs
            .filter((d) => d !== doc)
            .map((d) => (
              <li key={d}>
                <Link
                  href={`/${locale}/legal/${d}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {docs[d].title}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}

export const instant = false;