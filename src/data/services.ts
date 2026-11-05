import type { Locale } from "@/i18n/config";

// VALEURS A VERIFIER : invites conseilles, elements inclus et options sont des propositions.

export type ServiceVariant = { id: string; title: string; text: string; guests: string };

export type Service = {
  slug: "mariage" | "anniversaire" | "fetes";
  photos: string[];
  icon: "heart" | "cake" | "party";
  title: string;
  intro: string;
  variants: ServiceVariant[];
  includes: string[];
  options: string[];
  flow?: string[];
};

const fr: Service[] = [
  {
    slug: "mariage",
    photos: ["mariage-1", "mariage-2"],
    icon: "heart",
    title: "Mariages",
    intro:
      "Le grand jour mérite une table à sa hauteur. Nous composons le menu avec vous et nous nous occupons du service, pour que vous profitiez de vos invités.",
    variants: [
      {
        id: "mariage-civil",
        title: "Mariage civil",
        text: "Une réception élégante après la cérémonie à la mairie : cocktail ou buffet, service soigné.",
        guests: "30 à 150",
      },
      {
        id: "mariage-coutumier",
        title: "Mariage coutumier (dot)",
        text: "Un repas généreux pour les deux familles, avec un service adapté au déroulé de la cérémonie.",
        guests: "80 à 300",
      },
      {
        id: "mariage-religieux",
        title: "Mariage religieux (réception)",
        text: "La grande réception après la cérémonie : buffet ou service à table, gâteau et boissons.",
        guests: "100 à 400",
      },
    ],
    includes: [
      "Menu composé avec vous : entrées, plats, desserts",
      "Dressage du buffet ou service à table",
      "Équipe de service présente sur place",
      "Vaisselle et couverts selon la formule",
      "Installation avant, rangement après",
    ],
    options: [
      "Boissons",
      "Gâteau de mariage",
      "Décoration de table",
      "Location de matériel",
      "Serveurs supplémentaires",
      "Yaourts pour vos invités",
    ],
    flow: [
      "Accueil des invités et boissons de bienvenue",
      "Entrées ou cocktail",
      "Repas principal, en buffet ou à table",
      "Gâteau et desserts",
      "Boissons jusqu'à la fin de la fête",
    ],
  },
  {
    slug: "anniversaire",
    photos: ["anniversaire-1", "anniversaire-2"],
    icon: "cake",
    title: "Anniversaires",
    intro:
      "Pour les enfants comme pour les adultes, un buffet généreux et une table soignée, sans que vous ayez à vous en occuper.",
    variants: [
      {
        id: "anniversaire-enfant",
        title: "Anniversaire d'enfant",
        text: "Un buffet adapté aux petits, avec gâteau et boissons, pour une fête sans stress.",
        guests: "15 à 60",
      },
      {
        id: "anniversaire-adulte",
        title: "Anniversaire d'adulte",
        text: "Cocktail ou buffet, avec des plats au choix pour un moment convivial entre proches.",
        guests: "20 à 150",
      },
    ],
    includes: [
      "Buffet ou cocktail au choix",
      "Plats adaptés à l'âge des invités",
      "Service sur place selon la formule",
      "Installation et rangement",
    ],
    options: [
      "Gâteau d'anniversaire",
      "Boissons",
      "Décoration de table",
      "Pots de yaourt individuels",
      "Location de vaisselle",
    ],
  },
  {
    slug: "fetes",
    photos: ["buffets-1", "buffets-2"],
    icon: "party",
    title: "Fêtes et cérémonies",
    intro:
      "Baptêmes, retrouvailles, séminaires, inaugurations : quelle que soit l'occasion, nous adaptons le menu et le service à votre événement.",
    variants: [
      {
        id: "bapteme",
        title: "Baptêmes et communions",
        text: "Une réception chaleureuse pour célébrer en famille.",
        guests: "30 à 150",
      },
      {
        id: "famille",
        title: "Retrouvailles et fêtes de famille",
        text: "De bons plats à partager, pour des retrouvailles réussies.",
        guests: "20 à 200",
      },
      {
        id: "entreprise",
        title: "Séminaires et événements d'entreprise",
        text: "Pauses café, déjeuners et cocktails pour vos équipes et vos clients.",
        guests: "20 à 200",
      },
      {
        id: "inauguration",
        title: "Inaugurations",
        text: "Un cocktail soigné pour accueillir vos invités le jour de l'ouverture.",
        guests: "30 à 200",
      },
      {
        id: "diplome",
        title: "Remises de diplômes",
        text: "Un buffet pour fêter la réussite avec les familles.",
        guests: "30 à 300",
      },
    ],
    includes: [
      "Menu adapté à votre événement",
      "Buffet, cocktail ou service à table",
      "Équipe de service présente sur place",
      "Installation et rangement",
    ],
    options: ["Boissons", "Pauses café", "Décoration", "Location de matériel", "Serveurs supplémentaires", "Yaourts"],
  },
];

const en: Service[] = [
  {
    slug: "mariage",
    photos: ["mariage-1", "mariage-2"],
    icon: "heart",
    title: "Weddings",
    intro:
      "The big day deserves a table to match. We build the menu with you and take care of the service, so you can enjoy your guests.",
    variants: [
      {
        id: "mariage-civil",
        title: "Civil wedding",
        text: "An elegant reception after the town hall ceremony: cocktail or buffet, attentive service.",
        guests: "30 to 150",
      },
      {
        id: "mariage-coutumier",
        title: "Traditional wedding (dowry)",
        text: "A generous meal for both families, with service adapted to the flow of the ceremony.",
        guests: "80 to 300",
      },
      {
        id: "mariage-religieux",
        title: "Religious wedding (reception)",
        text: "The main reception after the ceremony: buffet or seated service, cake and drinks.",
        guests: "100 to 400",
      },
    ],
    includes: [
      "Menu designed with you: starters, mains, desserts",
      "Buffet setup or seated service",
      "Service team on site",
      "Dishes and cutlery depending on the package",
      "Setup before, cleanup after",
    ],
    options: [
      "Drinks",
      "Wedding cake",
      "Table decoration",
      "Equipment rental",
      "Extra waiters",
      "Yogurts for your guests",
    ],
    flow: [
      "Guest welcome and welcome drinks",
      "Starters or cocktail",
      "Main meal, buffet or seated",
      "Cake and desserts",
      "Drinks until the end of the party",
    ],
  },
  {
    slug: "anniversaire",
    photos: ["anniversaire-1", "anniversaire-2"],
    icon: "cake",
    title: "Birthdays",
    intro:
      "For kids and adults alike, a generous buffet and a neat table, with nothing for you to organize.",
    variants: [
      {
        id: "anniversaire-enfant",
        title: "Children's birthday",
        text: "A kid-friendly buffet with cake and drinks, for a stress-free party.",
        guests: "15 to 60",
      },
      {
        id: "anniversaire-adulte",
        title: "Adult birthday",
        text: "Cocktail or buffet with a choice of dishes for a friendly moment with loved ones.",
        guests: "20 to 150",
      },
    ],
    includes: [
      "Buffet or cocktail of your choice",
      "Dishes suited to the guests' ages",
      "On-site service depending on the package",
      "Setup and cleanup",
    ],
    options: ["Birthday cake", "Drinks", "Table decoration", "Individual yogurt cups", "Dish rental"],
  },
  {
    slug: "fetes",
    photos: ["buffets-1", "buffets-2"],
    icon: "party",
    title: "Parties and ceremonies",
    intro:
      "Baptisms, reunions, seminars, openings: whatever the occasion, we adapt the menu and the service to your event.",
    variants: [
      {
        id: "bapteme",
        title: "Baptisms and communions",
        text: "A warm reception to celebrate with family.",
        guests: "30 to 150",
      },
      {
        id: "famille",
        title: "Reunions and family parties",
        text: "Good food to share, for a successful reunion.",
        guests: "20 to 200",
      },
      {
        id: "entreprise",
        title: "Seminars and corporate events",
        text: "Coffee breaks, lunches and cocktails for your teams and clients.",
        guests: "20 to 200",
      },
      {
        id: "inauguration",
        title: "Openings",
        text: "A refined cocktail to welcome your guests on opening day.",
        guests: "30 to 200",
      },
      {
        id: "diplome",
        title: "Graduation ceremonies",
        text: "A buffet to celebrate success with the families.",
        guests: "30 to 300",
      },
    ],
    includes: [
      "Menu adapted to your event",
      "Buffet, cocktail or seated service",
      "Service team on site",
      "Setup and cleanup",
    ],
    options: ["Drinks", "Coffee breaks", "Decoration", "Equipment rental", "Extra waiters", "Yogurts"],
  },
];

const services: Record<Locale, Service[]> = { fr, en };

export function getServices(locale: Locale): Service[] {
  return services[locale];
}