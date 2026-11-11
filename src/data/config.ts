export const siteConfig = {
  // false : aucun prix de formule traiteur n'est affiche, les tarifs sont discutes sur WhatsApp
  showPrices: false,
  currency: "USD",
  business: {
    name: "BKJ service",
    city: "Kinshasa",
    district: "Cité Verte",
    street: "1ère rue 10/345",
    address: "Cité Verte, 1ère rue 10/345, Kinshasa",
    // Recherche utilisee par le lien "Voir sur la carte"
    mapQuery: "Cité Verte, Kinshasa",
    // WhatsApp est le seul moyen de contact
    whatsappDisplay: "+243 810 341 104",
  },
  // Les champs vides ne s'affichent pas dans les mentions legales
  legal: {
    lastUpdated: "2026-11-10",
    director: "",
    registration: "",
    host: "",
    developer: "marcelo.dev",
  },
};