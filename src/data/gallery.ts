import type { Locale } from "@/i18n/config";

export type GalleryCategory = "mariage" | "anniversaire" | "buffets" | "yaourts";
export type GalleryItem = { id: string; category: GalleryCategory; src: string; alt: string };

// Extension des photos (public/images/<categorie>/<categorie>-<n>.<ext>)
const EXT = "webp";

// Nombre de photos par categorie : modifier si vous en ajoutez ou retirez
const sets: { category: GalleryCategory; count: number }[] = [
  { category: "mariage", count: 7 },
  { category: "anniversaire", count: 5 },
  { category: "buffets", count: 6 },
  { category: "yaourts", count: 4 },
];

// Description precise d'une photo (facultatif). Exemple :
// "mariage-3": { fr: "Table d'honneur décorée de fleurs blanches", en: "Head table decorated with white flowers" },
const custom: Record<string, { fr: string; en: string }> = {};

const defaults: Record<Locale, Record<GalleryCategory, string>> = {
  fr: {
    mariage: "Réception de mariage préparée par BKJ service",
    anniversaire: "Anniversaire avec buffet BKJ service",
    buffets: "Buffet dressé par BKJ service",
    yaourts: "Yaourts BKJ Yaourt ya biso",
  },
  en: {
    mariage: "Wedding reception prepared by BKJ service",
    anniversaire: "Birthday with a BKJ service buffet",
    buffets: "Buffet set up by BKJ service",
    yaourts: "BKJ Yaourt ya biso yogurts",
  },
};

export function getGallery(locale: Locale): GalleryItem[] {
  const items: GalleryItem[] = [];
  const max = Math.max(...sets.map((s) => s.count));

  // On alterne les categories pour que "Tout" soit varie
  for (let n = 1; n <= max; n++) {
    for (const { category, count } of sets) {
      if (n > count) continue;
      const id = `${category}-${n}`;
      items.push({
        id,
        category,
        src: `/images/${category}/${id}.${EXT}`,
        alt: custom[id]?.[locale] ?? `${defaults[locale][category]} (${n})`,
      });
    }
  }
  return items;
}
// Photos de l'apercu sur la page d'accueil : la premiere est la grande.
// Remplacer les identifiants pour changer les photos affichees.
export const homePreviewIds = ["mariage-1", "buffets-1", "anniversaire-1", "mariage-2", "buffets-2"];