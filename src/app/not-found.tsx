import Link from "next/link";
import { defaultLocale } from "@/i18n/config";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang={defaultLocale}>
      <body>
        <section className="mx-auto max-w-xl px-5 py-24 text-center">
          <p className="text-6xl font-bold text-primary">404</p>
          <Link href={`/${defaultLocale}`} className="btn btn-primary mt-8">
            BKJ service
          </Link>
        </section>
      </body>
    </html>
  );
}