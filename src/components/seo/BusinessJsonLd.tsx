import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/data/config";
import { siteUrl } from "@/lib/site";

type Props = { locale: Locale; description: string };

export default function BusinessJsonLd({ locale, description }: Props) {
  const { business } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "CateringService",
    name: business.name,
    url: `${siteUrl}/${locale}`,
    description,
    // WhatsApp est le seul moyen de contact
    telephone: business.whatsappDisplay.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.street}, ${business.district}`,
      addressLocality: business.city,
      addressCountry: "CD",
    },
    areaServed: business.city,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}