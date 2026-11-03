"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Logo from "./Logo";

type Props = { locale: Locale; dict: Dictionary };

export default function Header({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/services", label: dict.nav.services },
    { href: "/menus", label: dict.nav.menus },
    { href: "/yaourts", label: dict.nav.yogurts },
    { href: "/galerie", label: dict.nav.gallery },
    { href: "/a-propos", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  const switchTo = (target: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    return `/${target}${rest ? `/${rest}` : ""}`;
  };

  const isActive = (href: string) => pathname.startsWith(`/${locale}${href}`);

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-page"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href={`/${locale}`} aria-label={dict.meta.siteName} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={`/${locale}${l.href}`}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`text-[15px] font-medium transition-colors ${
                isActive(l.href) ? "text-primary" : "text-ink hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div role="group" aria-label={dict.common.language} className="flex items-center text-sm font-semibold">
            {locales.map((l) => (
              <Link
                key={l}
                href={switchTo(l)}
                hrefLang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`grid h-11 min-w-9 place-items-center px-1 ${
                  l === locale ? "text-primary" : "text-muted hover:text-ink"
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>

          <Link href={`/${locale}/devis`} className="btn btn-primary hidden sm:inline-flex">
            {dict.nav.quote}
          </Link>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-lg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-page px-5 pb-5 pt-2 lg:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={`/${locale}${l.href}`}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-line py-3.5 text-lg ${
                    isActive(l.href) ? "font-semibold text-primary" : "text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/devis`}
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-4 w-full"
          >
            {dict.nav.quote}
          </Link>
        </nav>
      )}
    </header>
  );
}