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
  id: "150ml" | "250ml" | "500ml" | "1l" | "5l";
  size: string;
  priceFc: number;
  flavor: string;
  text: string;
  // 1 (plus petit) a 5 (plus grand) : taille de la bouteille dessinee
  level: 1 | 2 | 3 | 4 | 5;
};

export type YogurtsContent = {
  products: Product[];
  featured: { src: string; alt: string }[];
  gallery: { src: string; alt: string }[];
};

export function formatFc(value: number): string {
  const grouped = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return `${grouped}\u00A0FC`;
}

const fr: YogurtsContent = {
  products: [
    { id: "150ml", size: "150 mL", priceFc: 1500, flavor: "Fraise", text: "Pratique à emporter, pour une pause gourmande.", level: 1 },
    { id: "250ml", size: "250 mL", priceFc: 2500, flavor: "Fraise", text: "Un peu plus grand, pour les vrais gourmands.", level: 2 },
    { id: "500ml", size: "0,5 L", priceFc: 5000, flavor: "Fraise", text: "Pour partager à deux ou en famille.", level: 3 },
    { id: "1l", size: "1 L", priceFc: 10000, flavor: "Fraise", text: "Le format famille.", level: 4 },
    { id: "5l", size: "5 L", priceFc: 50000, flavor: "Fraise", text: "Pour les fêtes et les grands rassemblements.", level: 5 },
  ],
  featured: [
    { src: img(4), alt: "Enfant qui boit un yaourt BKJ à la fraise, devant des flacons de 150 mL" },
    { src: img(3), alt: "Fillette tenant une bouteille de yaourt BKJ de 0,5 L, entourée de fraises" },
  ],
  gallery: [
    { src: img(1), alt: "Yaourt BKJ Yaourt ya biso" },
    { src: img(2), alt: "Yaourt BKJ Yaourt ya biso" },
  ],
};

const en: YogurtsContent = {
  products: [
    { id: "150ml", size: "150 mL", priceFc: 1500, flavor: "Strawberry", text: "Handy to carry, for a tasty break.", level: 1 },
    { id: "250ml", size: "250 mL", priceFc: 2500, flavor: "Strawberry", text: "A bit bigger, for the real yogurt lovers.", level: 2 },
    { id: "500ml", size: "0.5 L", priceFc: 5000, flavor: "Strawberry", text: "To share between two or with the family.", level: 3 },
    { id: "1l", size: "1 L", priceFc: 10000, flavor: "Strawberry", text: "The family size.", level: 4 },
    { id: "5l", size: "5 L", priceFc: 50000, flavor: "Strawberry", text: "For parties and big gatherings.", level: 5 },
  ],
  featured: [
    { src: img(4), alt: "Child drinking a BKJ strawberry yogurt in front of 150 mL bottles" },
    { src: img(3), alt: "Little girl holding a 0.5 L BKJ yogurt bottle, surrounded by strawberries" },
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