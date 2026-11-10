import type { Locale } from "@/i18n/config";

export type Review = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  // Facultatif : "Mariage coutumier", "Anniversaire"...
  event?: string;
};

// AVIS REELS UNIQUEMENT, avec l'accord de la personne.
// Quand un client t'envoie son avis sur WhatsApp, ajoute-le ici. Exemple :
// { name: "Marie K.", rating: 5, text: "Un buffet magnifique et un service parfait.", event: "Mariage civil" },
export const reviews: Review[] = [];

export type ReviewsTexts = {
  title: string;
  intro: string;
  emptyTitle: string;
  emptyText: string;
  leaveTitle: string;
  leaveText: string;
  leaveCta: string;
  ratingLabel: string;
  message: string;
};

const fr: ReviewsTexts = {
  title: "Avis de nos clients",
  intro: "Ce que nos clients disent de leur événement.",
  emptyTitle: "Les premiers avis arrivent bientôt",
  emptyText:
    "Vous avez fait appel à nous ? Dites-nous ce que vous en avez pensé : votre avis nous aide à progresser et à rassurer les futurs clients.",
  leaveTitle: "Vous avez fait appel à BKJ service ?",
  leaveText: "Envoyez-nous votre avis sur WhatsApp. Nous le publions ici avec votre accord.",
  leaveCta: "Laisser un avis sur WhatsApp",
  ratingLabel: "Note : {n} sur 5",
  message:
    "Bonjour BKJ service, je souhaite laisser un avis sur mon événement.\n\nMon nom : \nMa note (de 1 à 5) : \nMon avis : \n\nJ'accepte que mon avis soit publié sur le site.",
};

const en: ReviewsTexts = {
  title: "Customer reviews",
  intro: "What our customers say about their event.",
  emptyTitle: "The first reviews are coming soon",
  emptyText:
    "Did you use our services? Tell us what you thought: your review helps us improve and reassures future customers.",
  leaveTitle: "Did you use BKJ service?",
  leaveText: "Send us your review on WhatsApp. We publish it here with your permission.",
  leaveCta: "Leave a review on WhatsApp",
  ratingLabel: "Rating: {n} out of 5",
  message:
    "Hello BKJ service, I would like to leave a review about my event.\n\nMy name: \nMy rating (1 to 5): \nMy review: \n\nI agree that my review may be published on the website.",
};

const texts: Record<Locale, ReviewsTexts> = { fr, en };

export function getReviewsTexts(locale: Locale): ReviewsTexts {
  return texts[locale];
}