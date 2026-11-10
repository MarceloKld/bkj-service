import type { Locale } from "@/i18n/config";
import { siteConfig } from "@/data/config";

// TEXTES MODELES : a faire relire par une personne competente avant la mise en ligne.

export const legalDocs = ["conditions", "confidentialite", "mentions"] as const;
export type LegalDocId = (typeof legalDocs)[number];

export function isLegalDoc(value: string): value is LegalDocId {
  return (legalDocs as readonly string[]).includes(value);
}

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };
export type LegalLabels = { updated: string; others: string };

const { business, legal } = siteConfig;
const present = (s: string | false | undefined): s is string => Boolean(s);

function buildFr(): Record<LegalDocId, LegalDoc> {
  return {
    conditions: {
      title: "Conditions de réservation",
      intro: `Ces conditions s'appliquent aux prestations de traiteur et aux ventes de yaourts de ${business.name}.`,
      sections: [
        {
          title: "Objet",
          paragraphs: [
            `Les présentes conditions encadrent les prestations de traiteur et les commandes de yaourts proposées par ${business.name}, à ${business.city}. Les conditions précises de chaque événement sont confirmées avec vous sur WhatsApp au moment de la réservation.`,
          ],
        },
        {
          title: "Devis et tarifs",
          paragraphs: [
            "Les tarifs des prestations de traiteur ne sont pas affichés sur le site, car chaque événement est différent : nombre d'invités, lieu, date, menu et type de service. Un devis personnalisé est établi après un échange sur WhatsApp et précise le menu, les options et le tarif convenus.",
            "Les prix des yaourts affichés sur le site sont indiqués en francs congolais (FC).",
          ],
        },
        {
          title: "Réservation et acompte",
          paragraphs: [
            "Votre date est réservée lorsque le devis est accepté et que l'acompte convenu est reçu. Le montant et les modalités de l'acompte sont convenus avec vous sur WhatsApp.",
          ],
        },
        {
          title: "Nombre d'invités, menu et allergies",
          paragraphs: [
            "Le nombre d'invités et le menu sont confirmés avant l'événement. Les allergies et les régimes alimentaires doivent nous être communiqués dès la demande de devis.",
          ],
        },
        {
          title: "Modification, annulation et report",
          paragraphs: [
            "Prévenez-nous dès que possible. Nous cherchons ensemble une solution, par exemple un changement de date ou une adaptation du menu. Les conditions applicables, notamment pour l'acompte, sont précisées au moment de la réservation.",
          ],
        },
        {
          title: "Paiement",
          paragraphs: [
            "Les modalités de paiement (acompte, solde et moyens acceptés) sont convenues avec vous sur WhatsApp. Aucun paiement n'est demandé sur ce site.",
          ],
        },
        {
          title: "Commandes de yaourts",
          paragraphs: [
            "Les commandes se font sur WhatsApp, à partir du message pré-rempli par le site. Le retrait ou la livraison, le lieu et l'horaire sont confirmés avec vous. Votre commande est prise en compte lorsque nous la confirmons sur WhatsApp.",
          ],
        },
        {
          title: "Responsabilité et litiges",
          paragraphs: [
            `${business.name} s'engage à réaliser ses prestations avec soin. En cas de difficulté, contactez-nous le plus vite possible : nous recherchons d'abord une solution à l'amiable.`,
          ],
        },
        {
          title: "Nous contacter",
          items: [`WhatsApp : ${business.whatsappDisplay}`, `Adresse : ${business.address}`],
        },
      ],
    },
    confidentialite: {
      title: "Politique de confidentialité",
      intro: "Cette page explique quelles informations vous nous donnez et ce que nous en faisons.",
      sections: [
        {
          title: "Qui est responsable de vos informations",
          paragraphs: [`${business.name}, ${business.address}. Contact : WhatsApp ${business.whatsappDisplay}.`],
        },
        {
          title: "Les informations que vous nous donnez",
          paragraphs: ["Quand vous utilisez le formulaire de devis ou la commande de yaourts, vous pouvez renseigner :"],
          items: [
            "votre nom et votre numéro WhatsApp (et votre e-mail si vous le souhaitez) ;",
            "le type, la date, le lieu et le nombre d'invités de votre événement ;",
            "vos besoins (formule, service, options, restrictions alimentaires, budget indiqué) ;",
            "pour les yaourts : les produits, les quantités, le mode de réception et votre quartier.",
          ],
        },
        {
          title: "Ce que fait ce site de ces informations",
          paragraphs: [
            "Ce site n'enregistre pas vos réponses. Elles servent uniquement à écrire le message WhatsApp que vous choisissez d'envoyer. Rien n'est transmis à " +
              business.name +
              " tant que vous n'avez pas envoyé ce message.",
          ],
        },
        {
          title: "Pourquoi nous utilisons ces informations",
          paragraphs: [
            "Pour répondre à votre demande, établir votre devis, organiser votre événement ou préparer votre commande, et assurer le suivi de notre relation.",
          ],
        },
        {
          title: "WhatsApp",
          paragraphs: [
            "Lorsque vous envoyez le message, il transite par WhatsApp (Meta), qui applique sa propre politique de confidentialité. Nous recevons votre numéro et le contenu de la conversation.",
          ],
        },
        {
          title: "Cookies et mesure d'audience",
          paragraphs: [
            "Ce site n'utilise pas de cookies de suivi ni d'outil de mesure d'audience. Il peut mémoriser localement, dans votre navigateur, le fait que vous avez fermé la petite bulle d'aide, sans transmettre cette information.",
          ],
        },
        {
          title: "Hébergement et journaux techniques",
          paragraphs: [
            "Le site est hébergé par un prestataire qui peut conserver des journaux techniques (par exemple l'adresse IP) pour assurer la sécurité et le bon fonctionnement du service.",
          ],
        },
        {
          title: "Durée de conservation",
          paragraphs: [
            "Nous conservons la conversation WhatsApp le temps nécessaire pour traiter votre demande et assurer le suivi de notre relation. Vous pouvez nous demander de la supprimer.",
          ],
        },
        {
          title: "Vos droits",
          paragraphs: [
            "Vous pouvez demander l'accès à vos informations, leur correction ou leur suppression en nous écrivant sur WhatsApp.",
          ],
        },
        {
          title: "Liens externes",
          paragraphs: [
            "Le site contient des liens vers WhatsApp et Google Maps. Ces services appliquent leurs propres règles de confidentialité.",
          ],
        },
      ],
    },
    mentions: {
      title: "Mentions légales",
      intro: "Informations sur l'éditeur de ce site.",
      sections: [
        {
          title: "Éditeur du site",
          items: [
            business.name,
            `Adresse : ${business.address}`,
            `Contact : WhatsApp ${business.whatsappDisplay}`,
            legal.director ? `Responsable de la publication : ${legal.director}` : "",
            legal.registration ? `Immatriculation : ${legal.registration}` : "",
          ].filter(present),
        },
        ...(legal.host ? [{ title: "Hébergement", paragraphs: [legal.host] }] : []),
        ...(legal.developer ? [{ title: "Conception et développement", paragraphs: [legal.developer] }] : []),
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            `Les textes, photos, logos et éléments graphiques de ce site appartiennent à ${business.name} ou sont utilisés avec autorisation. Toute reproduction sans accord préalable est interdite.`,
          ],
        },
        {
          title: "Liens externes",
          paragraphs: [
            `Le site contient des liens vers WhatsApp et Google Maps. ${business.name} n'est pas responsable du contenu de ces services.`,
          ],
        },
      ],
    },
  };
}

function buildEn(): Record<LegalDocId, LegalDoc> {
  return {
    conditions: {
      title: "Booking conditions",
      intro: `These conditions apply to the catering services and yogurt sales of ${business.name}.`,
      sections: [
        {
          title: "Purpose",
          paragraphs: [
            `These conditions cover the catering services and yogurt orders offered by ${business.name} in ${business.city}. The exact conditions of each event are confirmed with you on WhatsApp when you book.`,
          ],
        },
        {
          title: "Quotes and prices",
          paragraphs: [
            "Catering prices are not displayed on the website because every event is different: number of guests, venue, date, menu and type of service. A personalized quote is prepared after a chat on WhatsApp and states the agreed menu, options and price.",
            "Yogurt prices shown on the website are in Congolese francs (FC).",
          ],
        },
        {
          title: "Booking and deposit",
          paragraphs: [
            "Your date is booked once the quote is accepted and the agreed deposit is received. The amount and terms of the deposit are agreed with you on WhatsApp.",
          ],
        },
        {
          title: "Number of guests, menu and allergies",
          paragraphs: [
            "The number of guests and the menu are confirmed before the event. Allergies and dietary requirements must be shared with us when you request a quote.",
          ],
        },
        {
          title: "Changes, cancellation and postponement",
          paragraphs: [
            "Let us know as soon as possible. We look for a solution together, for example a new date or a menu adjustment. The applicable conditions, in particular regarding the deposit, are specified when you book.",
          ],
        },
        {
          title: "Payment",
          paragraphs: [
            "Payment terms (deposit, balance and accepted methods) are agreed with you on WhatsApp. No payment is requested on this website.",
          ],
        },
        {
          title: "Yogurt orders",
          paragraphs: [
            "Orders are placed on WhatsApp, using the message pre-filled by the website. Pickup or delivery, place and time are confirmed with you. Your order is taken into account once we confirm it on WhatsApp.",
          ],
        },
        {
          title: "Liability and disputes",
          paragraphs: [
            `${business.name} commits to carrying out its services with care. If there is a problem, contact us as soon as possible: we first look for an amicable solution.`,
          ],
        },
        {
          title: "Contact us",
          items: [`WhatsApp: ${business.whatsappDisplay}`, `Address: ${business.address}`],
        },
      ],
    },
    confidentialite: {
      title: "Privacy policy",
      intro: "This page explains what information you give us and what we do with it.",
      sections: [
        {
          title: "Who is responsible for your information",
          paragraphs: [`${business.name}, ${business.address}. Contact: WhatsApp ${business.whatsappDisplay}.`],
        },
        {
          title: "The information you give us",
          paragraphs: ["When you use the quote form or the yogurt order, you may provide:"],
          items: [
            "your name and WhatsApp number (and your e-mail if you wish);",
            "the type, date, venue and number of guests of your event;",
            "your needs (package, service, options, dietary restrictions, stated budget);",
            "for yogurts: the products, quantities, how you receive them and your neighborhood.",
          ],
        },
        {
          title: "What this website does with this information",
          paragraphs: [
            "This website does not store your answers. They are only used to write the WhatsApp message that you choose to send. Nothing is sent to " +
              business.name +
              " until you send that message.",
          ],
        },
        {
          title: "Why we use this information",
          paragraphs: [
            "To answer your request, prepare your quote, organize your event or prepare your order, and follow up on our relationship.",
          ],
        },
        {
          title: "WhatsApp",
          paragraphs: [
            "When you send the message, it goes through WhatsApp (Meta), which applies its own privacy policy. We receive your number and the content of the conversation.",
          ],
        },
        {
          title: "Cookies and analytics",
          paragraphs: [
            "This website does not use tracking cookies or audience measurement tools. It may remember locally, in your browser, that you closed the small help bubble, without sending this information anywhere.",
          ],
        },
        {
          title: "Hosting and technical logs",
          paragraphs: [
            "The website is hosted by a provider that may keep technical logs (for example the IP address) to ensure the security and proper operation of the service.",
          ],
        },
        {
          title: "How long we keep information",
          paragraphs: [
            "We keep the WhatsApp conversation for as long as needed to handle your request and follow up on our relationship. You can ask us to delete it.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "You can ask to access, correct or delete your information by writing to us on WhatsApp.",
          ],
        },
        {
          title: "External links",
          paragraphs: [
            "The website contains links to WhatsApp and Google Maps. These services apply their own privacy rules.",
          ],
        },
      ],
    },
    mentions: {
      title: "Legal notice",
      intro: "Information about the publisher of this website.",
      sections: [
        {
          title: "Website publisher",
          items: [
            business.name,
            `Address: ${business.address}`,
            `Contact: WhatsApp ${business.whatsappDisplay}`,
            legal.director ? `Publication manager: ${legal.director}` : "",
            legal.registration ? `Registration: ${legal.registration}` : "",
          ].filter(present),
        },
        ...(legal.host ? [{ title: "Hosting", paragraphs: [legal.host] }] : []),
        ...(legal.developer ? [{ title: "Design and development", paragraphs: [legal.developer] }] : []),
        {
          title: "Intellectual property",
          paragraphs: [
            `The texts, photos, logos and graphic elements of this website belong to ${business.name} or are used with permission. Any reproduction without prior agreement is prohibited.`,
          ],
        },
        {
          title: "External links",
          paragraphs: [
            `The website contains links to WhatsApp and Google Maps. ${business.name} is not responsible for the content of these services.`,
          ],
        },
      ],
    },
  };
}

export function getLegal(locale: Locale): Record<LegalDocId, LegalDoc> {
  return locale === "fr" ? buildFr() : buildEn();
}

export function getLegalLabels(locale: Locale): LegalLabels {
  return locale === "fr"
    ? { updated: "Dernière mise à jour", others: "Autres documents" }
    : { updated: "Last updated", others: "Other documents" };
}

export function formatLegalDate(locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${legal.lastUpdated}T00:00:00Z`));
}