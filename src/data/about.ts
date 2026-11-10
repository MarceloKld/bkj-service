import type { Locale } from "@/i18n/config";

export type AboutContent = {
  title: string;
  intro: string;
  // Photos de la page : identifiants de src/data/gallery.ts
  photoIds: string[];
  // A COMPLETER : la section n'apparait que si paragraphs n'est pas vide
  story: { title: string; paragraphs: string[] };
  valuesTitle: string;
  values: { icon: "leaf" | "shield" | "clock" | "handshake"; title: string; text: string }[];
  activitiesTitle: string;
  activities: { title: string; text: string; cta: string; href: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
};

const fr: AboutContent = {
  title: "À propos de BKJ service",
  intro:
    "Traiteur d'événements et vente de yaourts à Kinshasa : nous mettons du soin dans tout ce que nous servons.",
  photoIds: ["buffets-3", "mariage-3"],
  // Exemple : paragraphs: ["BKJ service est né en ... à Cité Verte.", "Aujourd'hui, ..."]
  story: { title: "Notre histoire", paragraphs: [] },
  valuesTitle: "Nos engagements",
  values: [
    { icon: "leaf", title: "Fraîcheur", text: "Des produits choisis avec soin pour des plats et des yaourts savoureux." },
    { icon: "shield", title: "Hygiène", text: "Une préparation et un service propres, du plan de travail à la table." },
    { icon: "clock", title: "Ponctualité", text: "Nous arrivons à l'heure pour que votre événement démarre sans stress." },
    { icon: "handshake", title: "Écoute", text: "Menu, budget, goûts : nous nous adaptons à ce que vous imaginez." },
  ],
  activitiesTitle: "Deux activités, la même exigence",
  activities: [
    {
      title: "Traiteur d'événements",
      text: "Mariages, anniversaires, fêtes de famille et événements d'entreprise : un menu composé avec vous et un service sur place.",
      cta: "Découvrir nos services",
      href: "/services",
    },
    {
      title: "Yaourt ya biso",
      text: "Nos yaourts à la fraise, en plusieurs formats, à commander en quelques clics sur WhatsApp.",
      cta: "Commander des yaourts",
      href: "/yaourts",
    },
  ],
  ctaTitle: "Parlons de votre événement",
  ctaText: "Écrivez-nous sur WhatsApp : nous sommes disponibles 24 h/24, 7 j/7.",
  ctaButton: "Demander un devis",
};

const en: AboutContent = {
  title: "About BKJ service",
  intro: "Event catering and yogurt sales in Kinshasa: we put care into everything we serve.",
  photoIds: ["buffets-3", "mariage-3"],
  story: { title: "Our story", paragraphs: [] },
  valuesTitle: "Our commitments",
  values: [
    { icon: "leaf", title: "Freshness", text: "Products chosen with care for tasty dishes and yogurts." },
    { icon: "shield", title: "Hygiene", text: "Clean preparation and service, from the worktop to the table." },
    { icon: "clock", title: "Punctuality", text: "We arrive on time so your event starts without stress." },
    { icon: "handshake", title: "Listening", text: "Menu, budget, tastes: we adapt to what you have in mind." },
  ],
  activitiesTitle: "Two activities, the same standards",
  activities: [
    {
      title: "Event catering",
      text: "Weddings, birthdays, family parties and corporate events: a menu designed with you and on-site service.",
      cta: "Discover our services",
      href: "/services",
    },
    {
      title: "Yaourt ya biso",
      text: "Our strawberry yogurts, in several sizes, to order in a few clicks on WhatsApp.",
      cta: "Order yogurts",
      href: "/yaourts",
    },
  ],
  ctaTitle: "Let's talk about your event",
  ctaText: "Message us on WhatsApp: we are available 24 hours a day, 7 days a week.",
  ctaButton: "Request a quote",
};

const content: Record<Locale, AboutContent> = { fr, en };

export function getAbout(locale: Locale): AboutContent {
  return content[locale];
}