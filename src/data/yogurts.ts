import type { Locale } from "@/i18n/config";

// Extension des photos dans public/images/yaourts/ (changer ici si ce n'est pas webp)
const EXT = "webp";
const img = (n: number) => `/images/yaourts/yaourts-${n}.${EXT}`;

export const yogurtConfig = {
  // Nombre minimum de yaourts pour pouvoir commander
  minUnits: 1,
  // A COMPLETER : s'affichent sur la page seulement s'ils ne sont pas vides
  pickupPlace: "",
  deliveryZones: "",
  hours: "",
};

export type Product = {
  id: "petit" | "grand";
  name: string;
  size: string;
  priceFc: number;
  flavor: string;
  text: string;
  image: string;
  imageAlt: string;
};

export type YogurtsContent = {
  products: Product[];
  gallery: { src: string; alt: string }[];
};

export function formatFc(value: number): string {
  const grouped = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return `${grouped}\u00A0FC`;
}

const fr: YogurtsContent = {
  products: [
    {
      id: "petit",
      name: "Petit format",
      size: "150 mL",
      priceFc: 500,
      flavor: "Fraise",
      text: "Pratique à emporter, pour une pause gourmande ou pour les enfants.",
      image: img(4),
      imageAlt: "Enfant qui boit un yaourt BKJ à la fraise, devant des flacons de 150 mL",
    },
    {
      id: "grand",
      name: "Grand format",
      size: "0,5 L",
      priceFc: 1000,
      flavor: "Fraise",
      text: "Pour partager en famille ou entre amis.",
      image: img(3),
      imageAlt: "Fillette tenant une bouteille de yaourt BKJ de 0,5 L, entourée de fraises",
    },
  ],
  gallery: [
    { src: img(1), alt: "Yaourt BKJ Yaourt ya biso" },
    { src: img(2), alt: "Yaourt BKJ Yaourt ya biso" },
  ],
};

const en: YogurtsContent = {
  products: [
    {
      id: "petit",
      name: "Small size",
      size: "150 mL",
      priceFc: 500,
      flavor: "Strawberry",
      text: "Handy to carry, for a tasty break or for the kids.",
      image: img(4),
      imageAlt: "Child drinking a BKJ strawberry yogurt in front of 150 mL bottles",
    },
    {
      id: "grand",
      name: "Large size",
      size: "0.5 L",
      priceFc: 1000,
      flavor: "Strawberry",
      text: "To share with family or friends.",
      image: img(3),
      imageAlt: "Little girl holding a 0.5 L BKJ yogurt bottle, surrounded by strawberries",
    },
  ],
  gallery: [
    { src: img(1), alt: "BKJ Yaourt ya biso yogurt" },
    { src: img(2), alt: "BKJ Yaourt ya biso yogurt" },
  ],
};

const content: Record<Locale, YogurtsContent> = { fr, en };

export function getYogurts(locale: Locale): YogurtsContent {
  return content[locale];
}