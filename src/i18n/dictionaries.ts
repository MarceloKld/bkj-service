import fr from "./fr.json";
import en from "./en.json";
import type { Locale } from "./config";

const dictionaries = { fr, en };

export type Dictionary = typeof fr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}