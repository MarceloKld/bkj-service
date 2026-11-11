import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "./Logo";
import InstallApp from "./InstallApp";
import { siteConfig } from "@/data/config";
import CurrentYear from "./CurrentYear";
import FloatingQuote from "./FloatingQuote";

type Props = { locale: Locale; dict: Dictionary };

export default function Footer({ locale, dict }: Props) {
  const explore = [
    { href: "/services", label: dict.nav.services },
    { href: "/menus", label: dict.nav.menus },
    { href: "/yaourts", label: dict.nav.yogurts },
    { href: "/galerie", label: dict.nav.gallery },
  ];
  const info = [
    { href: "/faq", label: dict.nav.faq },
    { href: "/avis", label: dict.nav.reviews },
    { href: "/contact", label: dict.nav.contact },
    { href: "/legal/conditions", label: dict.legal.terms },
    { href: "/legal/confidentialite", label: dict.legal.privacy },
    { href: "/legal/mentions", label: dict.legal.notices },
  ];

  const column = (title: string, items: { href: string; label: string }[]) => (
    <div>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-1">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={`/${locale}${i.href}`}
              className="inline-block py-1.5 text-muted transition-colors hover:text-primary"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer
      className="border-t border-line bg-surface"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-muted">{dict.footer.tagline}</p>
          <p className="mt-4 text-sm text-muted">{siteConfig.business.address}</p>
          <p className="text-sm text-muted">WhatsApp : {siteConfig.business.whatsappDisplay} · {dict.contactPage.availabilityShort}</p>
          <div className="mt-3">
            <InstallApp t={dict.pwa} />
          </div>
        </div>
        {column(dict.footer.explore, explore)}
        {column(dict.footer.info, info)}
      </div>
      <p className="border-t border-line px-5 py-5 text-center text-sm text-muted">
        © <CurrentYear /> {dict.meta.siteName}. {dict.footer.rights}
      </p>
      <FloatingQuote href={`/${locale}/devis`} label={dict.floating.label} closeLabel={dict.floating.close} phrases={dict.floating.phrases} />
    </footer>
  );
}