import type { Locale } from "@/i18n/config";

// VALEURS A VERIFIER : contenu des formules, exemples de menus et invites sont des propositions.

export type EventFilter = "mariage" | "anniversaire" | "fetes" | "entreprise";
export type ServiceStyle = "buffet" | "table" | "cocktail" | "emporter";

export type Pack = {
  id: "essentiel" | "confort" | "prestige";
  name: string;
  tagline: string;
  items: string[];
  example: string[];
  events: EventFilter[];
  styles: ServiceStyle[];
  guests: string;
  // Utilise seulement si siteConfig.showPrices est a true
  priceFromUsd?: number;
};

export type ExtraIcon = "drinks" | "cake" | "decor" | "service" | "dishes" | "rental" | "waiters" | "yogurts";

export type MenusContent = {
  packs: Pack[];
  filterLabels: { events: Record<EventFilter, string>; styles: Record<ServiceStyle, string> };
  extras: { icon: ExtraIcon; title: string; text: string }[];
  steps: { title: string; text: string }[];
};

const fr: MenusContent = {
  packs: [
    {
      id: "essentiel",
      name: "Essentiel",
      tagline: "L'essentiel pour un repas réussi.",
      items: [
        "Une entrée ou une salade",
        "Un plat principal et ses accompagnements",
        "Un dessert",
        "Buffet dressé sur place",
      ],
      example: ["Salade fraîche", "Poulet braisé, riz et légumes", "Fruits de saison"],
      events: ["mariage", "anniversaire", "fetes", "entreprise"],
      styles: ["buffet", "emporter"],
      guests: "à partir de 20",
    },
    {
      id: "confort",
      name: "Confort",
      tagline: "Plus de choix et plus de confort pour vos invités.",
      items: [
        "Une entrée au choix",
        "Deux plats principaux et leurs accompagnements",
        "Un dessert au choix",
        "Équipe de service sur place",
        "Buffet ou service à table",
      ],
      example: [
        "Salade composée ou beignets",
        "Brochettes, poulet braisé, riz, pondu et chikwangue",
        "Salade de fruits",
      ],
      events: ["mariage", "anniversaire", "fetes", "entreprise"],
      styles: ["buffet", "table", "cocktail"],
      guests: "à partir de 40",
    },
    {
      id: "prestige",
      name: "Prestige",
      tagline: "La réception complète, pensée dans les moindres détails.",
      items: [
        "Cocktail de bienvenue",
        "Entrées variées",
        "Trois plats principaux au choix",
        "Desserts et gâteau en option",
        "Équipe de service complète en salle",
        "Mise en place et décoration de table",
        "Conseil personnalisé pour composer le menu",
      ],
      example: [
        "Mises en bouche",
        "Poisson ou viande en sauce, riz, légumes sautés",
        "Desserts et fruits",
      ],
      events: ["mariage", "fetes", "entreprise"],
      styles: ["buffet", "table", "cocktail"],
      guests: "à partir de 80",
    },
  ],
  filterLabels: {
    events: {
      mariage: "Mariage",
      anniversaire: "Anniversaire",
      fetes: "Fête ou cérémonie",
      entreprise: "Événement d'entreprise",
    },
    styles: {
      buffet: "Buffet",
      table: "Service à table",
      cocktail: "Cocktail",
      emporter: "Plats à emporter",
    },
  },
  extras: [
    { icon: "drinks", title: "Boissons", text: "Eau, softs et boissons pour toute la durée de l'événement." },
    { icon: "cake", title: "Gâteau", text: "Gâteau d'anniversaire ou de mariage, selon votre thème." },
    { icon: "decor", title: "Décoration de table", text: "Une mise en place soignée aux couleurs de votre événement." },
    { icon: "service", title: "Service en salle", text: "Une équipe qui sert vos invités à table ou au buffet." },
    { icon: "dishes", title: "Vaisselle et couverts", text: "Assiettes, verres et couverts pour tous vos invités." },
    { icon: "rental", title: "Location de matériel", text: "Tables, chaises et nappes selon vos besoins." },
    { icon: "waiters", title: "Serveurs supplémentaires", text: "Pour les grands événements ou les lieux étendus." },
    { icon: "yogurts", title: "Yaourts", text: "Pots individuels ou grandes quantités pour vos invités." },
  ],
  steps: [
    { title: "Demande de devis", text: "Remplissez le formulaire en trois étapes. Il s'ouvre ensuite sur WhatsApp." },
    { title: "Échange et dégustation", text: "Nous discutons de votre menu et du tarif. Une dégustation est possible, en option." },
    { title: "Acompte", text: "Il confirme la réservation de votre date." },
    { title: "Confirmation", text: "Vous recevez le récapitulatif de votre événement." },
  ],
};

const en: MenusContent = {
  packs: [
    {
      id: "essentiel",
      name: "Essential",
      tagline: "The essentials for a successful meal.",
      items: ["A starter or a salad", "A main dish with sides", "A dessert", "Buffet set up on site"],
      example: ["Fresh salad", "Grilled chicken, rice and vegetables", "Seasonal fruit"],
      events: ["mariage", "anniversaire", "fetes", "entreprise"],
      styles: ["buffet", "emporter"],
      guests: "from 20",
    },
    {
      id: "confort",
      name: "Comfort",
      tagline: "More choice and more comfort for your guests.",
      items: [
        "A starter of your choice",
        "Two main dishes with sides",
        "A dessert of your choice",
        "Service team on site",
        "Buffet or seated service",
      ],
      example: [
        "Mixed salad or fritters",
        "Skewers, grilled chicken, rice, pondu and chikwangue",
        "Fruit salad",
      ],
      events: ["mariage", "anniversaire", "fetes", "entreprise"],
      styles: ["buffet", "table", "cocktail"],
      guests: "from 40",
    },
    {
      id: "prestige",
      name: "Prestige",
      tagline: "The complete reception, designed down to the smallest detail.",
      items: [
        "Welcome cocktail",
        "A variety of starters",
        "Three main dishes of your choice",
        "Desserts and optional cake",
        "Full dining-room service team",
        "Table setup and decoration",
        "Personal advice to build the menu",
      ],
      example: ["Bite-sized appetizers", "Fish or meat in sauce, rice, sautéed vegetables", "Desserts and fruit"],
      events: ["mariage", "fetes", "entreprise"],
      styles: ["buffet", "table", "cocktail"],
      guests: "from 80",
    },
  ],
  filterLabels: {
    events: {
      mariage: "Wedding",
      anniversaire: "Birthday",
      fetes: "Party or ceremony",
      entreprise: "Corporate event",
    },
    styles: {
      buffet: "Buffet",
      table: "Seated service",
      cocktail: "Cocktail",
      emporter: "Takeaway",
    },
  },
  extras: [
    { icon: "drinks", title: "Drinks", text: "Water, soft drinks and beverages for the whole event." },
    { icon: "cake", title: "Cake", text: "Birthday or wedding cake, to match your theme." },
    { icon: "decor", title: "Table decoration", text: "A neat setup in the colors of your event." },
    { icon: "service", title: "Dining-room service", text: "A team serving your guests at the table or the buffet." },
    { icon: "dishes", title: "Dishes and cutlery", text: "Plates, glasses and cutlery for all your guests." },
    { icon: "rental", title: "Equipment rental", text: "Tables, chairs and tablecloths as needed." },
    { icon: "waiters", title: "Extra waiters", text: "For large events or spread-out venues." },
    { icon: "yogurts", title: "Yogurts", text: "Individual cups or large quantities for your guests." },
  ],
  steps: [
    { title: "Quote request", text: "Fill in the three-step form. It then opens on WhatsApp." },
    { title: "Chat and tasting", text: "We discuss your menu and the price. A tasting is possible, as an option." },
    { title: "Deposit", text: "It confirms the booking of your date." },
    { title: "Confirmation", text: "You receive the summary of your event." },
  ],
};

const content: Record<Locale, MenusContent> = { fr, en };

export function getMenus(locale: Locale): MenusContent {
  return content[locale];
}