import type { Locale } from "@/i18n/config";

export type Option = { id: string; label: string };
export type Category = { id: string; label: string; variants: Option[] };

const frTexts = {
  title: "Demande de devis",
  intro:
    "Répondez à quelques questions : nous préparons votre message WhatsApp, il ne reste qu'à l'envoyer.",
  privacyNote:
    "Rien n'est enregistré sur ce site : vos réponses ne partent que dans votre message WhatsApp.",
  stepsAria: "Étapes du formulaire",
  stepLabels: ["Votre événement", "Vos besoins", "Vos coordonnées"],
  back: "Retour",
  next: "Continuer",
  send: "Envoyer sur WhatsApp",
  sendHint: "WhatsApp s'ouvre avec votre message déjà écrit.",
  choose: "Choisir",

  typeLabel: "Type d'événement",
  variantLabel: "Précisez",
  dateLabel: "Date de l'événement",
  dateTaken: "Cette date est peut-être déjà réservée. Envoyez quand même votre demande : nous verrons ce qui est possible.",
  datePast: "Choisissez une date à venir.",
  timeLabel: "Heure (facultatif)",
  venueLabel: "Nom du lieu (facultatif)",
  areaLabel: "Commune ou quartier",
  guestsLabel: "Nombre d'invités",

  packLabel: "Formule",
  seePacks: "Voir le détail des formules",
  serviceLabel: "Type de service",
  optionsLabel: "Options",
  dietLabel: "Restrictions alimentaires et allergies (facultatif)",
  dietPlaceholder: "Ex. végétarien, sans porc, allergie aux arachides",
  budgetLabel: "Budget approximatif (facultatif)",
  budgetHint: "Il nous aide à vous proposer une formule adaptée. Le tarif reste à discuter ensemble.",

  nameLabel: "Votre nom",
  phoneLabel: "Votre numéro WhatsApp",
  phoneHint: "Ex. 081 234 5678 ou +243 81 234 5678",
  emailLabel: "E-mail (facultatif)",
  sourceLabel: "Comment nous avez-vous connus ? (facultatif)",
  promoLabel: "Code promo ou nom du parrain (facultatif)",
  commentLabel: "Un détail à ajouter ? (facultatif)",
  consentLabel: "J'accepte que ces informations soient utilisées pour répondre à ma demande.",

  required: "Ce champ est obligatoire.",
  phoneInvalid: "Numéro invalide. Exemple : 081 234 5678.",
  emailInvalid: "Adresse e-mail invalide.",
  consentRequired: "Merci de cocher cette case pour continuer.",

  msgIntro: "Bonjour BKJ service, je souhaite un devis.",
  msgEventTitle: "Événement",
  msgNeedsTitle: "Besoins",
  msgContactTitle: "Mes coordonnées",
  msgType: "Type",
  msgDate: "Date",
  msgAt: "à",
  msgPlace: "Lieu",
  msgArea: "Commune / quartier",
  msgGuests: "Invités",
  msgPack: "Formule",
  msgService: "Service",
  msgOptions: "Options",
  msgDiet: "Restrictions",
  msgBudget: "Budget indiqué",
  msgName: "Nom",
  msgPhone: "WhatsApp",
  msgEmail: "E-mail",
  msgSource: "Connu par",
  msgPromo: "Code promo",
  msgComment: "Commentaire",
  msgThanks: "Merci !",

  doneTitle: "Votre demande est prête",
  doneText: "WhatsApp s'est ouvert avec votre message. Il ne reste qu'à l'envoyer.",
  doneMessage: "Votre message",
  doneAgain: "Ouvrir WhatsApp à nouveau",
  doneEdit: "Modifier ma demande",
  doneHome: "Retour à l'accueil",
};

export type QuoteTexts = typeof frTexts;

export type QuoteContent = {
  t: QuoteTexts;
  categories: Category[];
  guests: Option[];
  packs: Option[];
  services: Option[];
  extras: Option[];
  budgets: Option[];
  sources: Option[];
};

const fr: QuoteContent = {
  t: frTexts,
  categories: [
    {
      id: "mariage",
      label: "Mariage",
      variants: [
        { id: "mariage-civil", label: "Mariage civil" },
        { id: "mariage-coutumier", label: "Mariage coutumier (dot)" },
        { id: "mariage-religieux", label: "Mariage religieux (réception)" },
      ],
    },
    {
      id: "anniversaire",
      label: "Anniversaire",
      variants: [
        { id: "anniversaire-enfant", label: "Anniversaire d'enfant" },
        { id: "anniversaire-adulte", label: "Anniversaire d'adulte" },
      ],
    },
    {
      id: "fetes",
      label: "Fête ou cérémonie",
      variants: [
        { id: "bapteme", label: "Baptême ou communion" },
        { id: "famille", label: "Retrouvailles ou fête de famille" },
        { id: "entreprise", label: "Séminaire ou événement d'entreprise" },
        { id: "inauguration", label: "Inauguration" },
        { id: "diplome", label: "Remise de diplômes" },
      ],
    },
    { id: "yaourts", label: "Yaourts pour un événement", variants: [] },
    { id: "autre", label: "Autre événement", variants: [] },
  ],
  guests: [
    { id: "lt30", label: "Moins de 30" },
    { id: "30-60", label: "30 à 60" },
    { id: "60-100", label: "60 à 100" },
    { id: "100-200", label: "100 à 200" },
    { id: "200-400", label: "200 à 400" },
    { id: "gt400", label: "Plus de 400" },
    { id: "unknown", label: "Je ne sais pas encore" },
  ],
  packs: [
    { id: "essentiel", label: "Essentiel" },
    { id: "confort", label: "Confort" },
    { id: "prestige", label: "Prestige" },
    { id: "custom", label: "Sur mesure" },
  ],
  services: [
    { id: "buffet", label: "Buffet" },
    { id: "table", label: "Service à table" },
    { id: "cocktail", label: "Cocktail" },
    { id: "emporter", label: "Plats à emporter" },
  ],
  extras: [
    { id: "drinks", label: "Boissons" },
    { id: "cake", label: "Gâteau" },
    { id: "decor", label: "Décoration de table" },
    { id: "rental", label: "Location de matériel" },
    { id: "waiters", label: "Serveurs supplémentaires" },
    { id: "yogurts", label: "Yaourts pour l'événement" },
  ],
  budgets: [
    { id: "discuss", label: "À discuter ensemble" },
    { id: "lt500", label: "Moins de 500 USD" },
    { id: "500-1500", label: "500 à 1 500 USD" },
    { id: "1500-3000", label: "1 500 à 3 000 USD" },
    { id: "3000-6000", label: "3 000 à 6 000 USD" },
    { id: "gt6000", label: "Plus de 6 000 USD" },
  ],
  sources: [
    { id: "facebook", label: "Facebook" },
    { id: "tiktok", label: "TikTok" },
    { id: "instagram", label: "Instagram" },
    { id: "whatsapp", label: "WhatsApp" },
    { id: "referral", label: "Recommandation d'un proche" },
    { id: "other", label: "Autre" },
  ],
};

const enTexts: QuoteTexts = {
  title: "Quote request",
  intro: "Answer a few questions: we prepare your WhatsApp message, you only have to send it.",
  privacyNote: "Nothing is stored on this website: your answers only go into your WhatsApp message.",
  stepsAria: "Form steps",
  stepLabels: ["Your event", "Your needs", "Your details"],
  back: "Back",
  next: "Continue",
  send: "Send on WhatsApp",
  sendHint: "WhatsApp opens with your message already written.",
  choose: "Choose",

  typeLabel: "Event type",
  variantLabel: "Please specify",
  dateLabel: "Event date",
  dateTaken: "This date may already be booked. Send your request anyway: we will see what is possible.",
  datePast: "Please choose a future date.",
  timeLabel: "Time (optional)",
  venueLabel: "Venue name (optional)",
  areaLabel: "District or neighborhood",
  guestsLabel: "Number of guests",

  packLabel: "Package",
  seePacks: "See package details",
  serviceLabel: "Type of service",
  optionsLabel: "Options",
  dietLabel: "Dietary restrictions and allergies (optional)",
  dietPlaceholder: "E.g. vegetarian, pork-free, peanut allergy",
  budgetLabel: "Approximate budget (optional)",
  budgetHint: "It helps us suggest a suitable package. The price is still to be discussed together.",

  nameLabel: "Your name",
  phoneLabel: "Your WhatsApp number",
  phoneHint: "E.g. 081 234 5678 or +243 81 234 5678",
  emailLabel: "E-mail (optional)",
  sourceLabel: "How did you hear about us? (optional)",
  promoLabel: "Promo code or referrer's name (optional)",
  commentLabel: "Anything to add? (optional)",
  consentLabel: "I agree that this information is used to answer my request.",

  required: "This field is required.",
  phoneInvalid: "Invalid number. Example: 081 234 5678.",
  emailInvalid: "Invalid e-mail address.",
  consentRequired: "Please tick this box to continue.",

  msgIntro: "Hello BKJ service, I would like a quote.",
  msgEventTitle: "Event",
  msgNeedsTitle: "Needs",
  msgContactTitle: "My details",
  msgType: "Type",
  msgDate: "Date",
  msgAt: "at",
  msgPlace: "Venue",
  msgArea: "District / neighborhood",
  msgGuests: "Guests",
  msgPack: "Package",
  msgService: "Service",
  msgOptions: "Options",
  msgDiet: "Restrictions",
  msgBudget: "Stated budget",
  msgName: "Name",
  msgPhone: "WhatsApp",
  msgEmail: "E-mail",
  msgSource: "Heard about us via",
  msgPromo: "Promo code",
  msgComment: "Comment",
  msgThanks: "Thank you!",

  doneTitle: "Your request is ready",
  doneText: "WhatsApp has opened with your message. You only have to send it.",
  doneMessage: "Your message",
  doneAgain: "Open WhatsApp again",
  doneEdit: "Edit my request",
  doneHome: "Back to home",
};

const en: QuoteContent = {
  t: enTexts,
  categories: [
    {
      id: "mariage",
      label: "Wedding",
      variants: [
        { id: "mariage-civil", label: "Civil wedding" },
        { id: "mariage-coutumier", label: "Traditional wedding (dowry)" },
        { id: "mariage-religieux", label: "Religious wedding (reception)" },
      ],
    },
    {
      id: "anniversaire",
      label: "Birthday",
      variants: [
        { id: "anniversaire-enfant", label: "Children's birthday" },
        { id: "anniversaire-adulte", label: "Adult birthday" },
      ],
    },
    {
      id: "fetes",
      label: "Party or ceremony",
      variants: [
        { id: "bapteme", label: "Baptism or communion" },
        { id: "famille", label: "Reunion or family party" },
        { id: "entreprise", label: "Seminar or corporate event" },
        { id: "inauguration", label: "Opening" },
        { id: "diplome", label: "Graduation ceremony" },
      ],
    },
    { id: "yaourts", label: "Yogurts for an event", variants: [] },
    { id: "autre", label: "Other event", variants: [] },
  ],
  guests: [
    { id: "lt30", label: "Fewer than 30" },
    { id: "30-60", label: "30 to 60" },
    { id: "60-100", label: "60 to 100" },
    { id: "100-200", label: "100 to 200" },
    { id: "200-400", label: "200 to 400" },
    { id: "gt400", label: "More than 400" },
    { id: "unknown", label: "I don't know yet" },
  ],
  packs: [
    { id: "essentiel", label: "Essential" },
    { id: "confort", label: "Comfort" },
    { id: "prestige", label: "Prestige" },
    { id: "custom", label: "Tailor-made" },
  ],
  services: [
    { id: "buffet", label: "Buffet" },
    { id: "table", label: "Seated service" },
    { id: "cocktail", label: "Cocktail" },
    { id: "emporter", label: "Takeaway" },
  ],
  extras: [
    { id: "drinks", label: "Drinks" },
    { id: "cake", label: "Cake" },
    { id: "decor", label: "Table decoration" },
    { id: "rental", label: "Equipment rental" },
    { id: "waiters", label: "Extra waiters" },
    { id: "yogurts", label: "Yogurts for the event" },
  ],
  budgets: [
    { id: "discuss", label: "To be discussed together" },
    { id: "lt500", label: "Under 500 USD" },
    { id: "500-1500", label: "500 to 1,500 USD" },
    { id: "1500-3000", label: "1,500 to 3,000 USD" },
    { id: "3000-6000", label: "3,000 to 6,000 USD" },
    { id: "gt6000", label: "Over 6,000 USD" },
  ],
  sources: [
    { id: "facebook", label: "Facebook" },
    { id: "tiktok", label: "TikTok" },
    { id: "instagram", label: "Instagram" },
    { id: "whatsapp", label: "WhatsApp" },
    { id: "referral", label: "Recommended by someone" },
    { id: "other", label: "Other" },
  ],
};

const content: Record<Locale, QuoteContent> = { fr, en };

export function getQuote(locale: Locale): QuoteContent {
  return content[locale];
}