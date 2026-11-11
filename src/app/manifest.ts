import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "BKJ service",
    short_name: "BKJ service",
    description: "Traiteur d'événements et yaourts à Kinshasa",
    lang: "fr",
    start_url: "/fr",
    scope: "/",
    display: "standalone",
    background_color: "#fff7f3",
    theme_color: "#9e2447",
    categories: ["food", "business"],
    icons: [
      { src: "/pwa-icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-icon/maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Demander un devis", url: "/fr/devis" },
      { name: "Commander des yaourts", url: "/fr/yaourts" },
    ],
  };
}