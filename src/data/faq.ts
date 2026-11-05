import type { Locale } from "@/i18n/config";

// REPONSES A VERIFIER : elles suivent les pratiques courantes et laissent tout negociable.

export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

const fr: FaqGroup[] = [
  {
    id: "devis",
    title: "Devis et réservation",
    items: [
      {
        q: "Comment obtenir un devis ?",
        a: "Remplissez le formulaire de devis en trois étapes : il prépare un message que vous envoyez sur WhatsApp. Vous pouvez aussi nous écrire directement, sans formulaire.",
      },
      {
        q: "Pourquoi les prix ne sont-ils pas affichés ?",
        a: "Chaque événement est différent : nombre d'invités, lieu, date, menu et type de service. Nous établissons un devis personnalisé et nous en discutons avec vous sur WhatsApp.",
      },
      {
        q: "Faut-il verser un acompte ?",
        a: "Oui, un acompte permet de confirmer la réservation de votre date. Son montant est convenu avec vous sur WhatsApp, selon votre événement.",
      },
      {
        q: "Combien de temps à l'avance faut-il réserver ?",
        a: "Le plus tôt possible : plus vous nous prévenez à l'avance, plus nous avons de liberté pour composer votre menu. Pour un événement proche, écrivez-nous : nous regardons ensemble ce qui est possible.",
      },
      {
        q: "Puis-je annuler ou reporter ma réservation ?",
        a: "Prévenez-nous dès que possible. Nous cherchons ensemble une solution, par exemple un report de date. Les conditions sont précisées au moment de la réservation.",
      },
      {
        q: "Quels sont les modes de paiement ?",
        a: "Les modalités de paiement (acompte, solde et moyens acceptés) sont convenues avec vous sur WhatsApp. Aucun paiement n'est demandé sur ce site.",
      },
    ],
  },
  {
    id: "menus",
    title: "Menus et organisation",
    items: [
      {
        q: "Proposez-vous une dégustation ?",
        a: "Oui, une dégustation est possible en option. Demandez-la lors de votre échange avec nous.",
      },
      {
        q: "Pouvez-vous adapter le menu à nos allergies ou à nos régimes ?",
        a: "Oui. Indiquez les allergies, le végétarien, le sans porc ou toute autre restriction dans votre demande : nous composons le menu en en tenant compte.",
      },
      {
        q: "Y a-t-il un nombre minimum d'invités ?",
        a: "Chaque formule indique un nombre d'invités conseillé sur la page Menus et formules. Pour un plus petit groupe, écrivez-nous : nous trouverons une solution.",
      },
      {
        q: "Vous déplacez-vous pour l'événement ?",
        a: "Nous sommes basés à Cité Verte, à Kinshasa. Indiquez le lieu de votre événement dans votre demande : nous confirmons si nous pouvons nous déplacer, et le déplacement peut être pris en compte dans le devis.",
      },
    ],
  },
  {
    id: "yaourts",
    title: "Yaourts",
    items: [
      {
        q: "Comment commander des yaourts ?",
        a: "Choisissez vos quantités sur la page Yaourts : un message WhatsApp pré-rempli est prêt à être envoyé. Rien ne se paie en ligne.",
      },
      {
        q: "Livrez-vous les yaourts ?",
        a: "Vous pouvez choisir le retrait ou la livraison. Les modalités sont confirmées avec vous sur WhatsApp, selon votre quartier.",
      },
      {
        q: "Peut-on commander de grandes quantités pour un événement ?",
        a: "Oui, sur devis, y compris en pots individuels.",
      },
    ],
  },
  {
    id: "contact",
    title: "Nous joindre",
    items: [
      {
        q: "Comment vous joindre ?",
        a: "Uniquement sur WhatsApp, 24 h/24 et 7 j/7.",
      },
    ],
  },
];

const en: FaqGroup[] = [
  {
    id: "devis",
    title: "Quotes and booking",
    items: [
      {
        q: "How do I get a quote?",
        a: "Fill in the three-step quote form: it prepares a message that you send on WhatsApp. You can also write to us directly, without the form.",
      },
      {
        q: "Why are prices not displayed?",
        a: "Every event is different: number of guests, venue, date, menu and type of service. We prepare a personalized quote and discuss it with you on WhatsApp.",
      },
      {
        q: "Do I have to pay a deposit?",
        a: "Yes, a deposit confirms the booking of your date. Its amount is agreed with you on WhatsApp, depending on your event.",
      },
      {
        q: "How far in advance should I book?",
        a: "As early as possible: the earlier you tell us, the more freedom we have to build your menu. For a nearby event, write to us and we will see together what is possible.",
      },
      {
        q: "Can I cancel or postpone my booking?",
        a: "Let us know as soon as possible. We look for a solution together, for example a new date. The conditions are specified when you book.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Payment terms (deposit, balance and accepted methods) are agreed with you on WhatsApp. No payment is requested on this website.",
      },
    ],
  },
  {
    id: "menus",
    title: "Menus and organization",
    items: [
      {
        q: "Do you offer a tasting?",
        a: "Yes, a tasting is possible as an option. Ask for it when you talk with us.",
      },
      {
        q: "Can you adapt the menu to our allergies or diets?",
        a: "Yes. Mention allergies, vegetarian, pork-free or any other restriction in your request: we build the menu accordingly.",
      },
      {
        q: "Is there a minimum number of guests?",
        a: "Each package shows a suggested number of guests on the Menus and packages page. For a smaller group, write to us and we will find a solution.",
      },
      {
        q: "Do you travel to the event?",
        a: "We are based in Cité Verte, in Kinshasa. Give the venue of your event in your request: we confirm whether we can travel, and travel may be taken into account in the quote.",
      },
    ],
  },
  {
    id: "yaourts",
    title: "Yogurts",
    items: [
      {
        q: "How do I order yogurts?",
        a: "Choose your quantities on the Yogurts page: a pre-filled WhatsApp message is ready to send. Nothing is paid online.",
      },
      {
        q: "Do you deliver yogurts?",
        a: "You can choose pickup or delivery. Details are confirmed with you on WhatsApp, depending on your area.",
      },
      {
        q: "Can I order large quantities for an event?",
        a: "Yes, on quote, including individual cups.",
      },
    ],
  },
  {
    id: "contact",
    title: "Getting in touch",
    items: [
      {
        q: "How can I reach you?",
        a: "Only on WhatsApp, 24 hours a day, 7 days a week.",
      },
    ],
  },
];

const content: Record<Locale, FaqGroup[]> = { fr, en };

export function getFaq(locale: Locale): FaqGroup[] {
  return content[locale];
}