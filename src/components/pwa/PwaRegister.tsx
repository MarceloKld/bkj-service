"use client";

import { useEffect } from "react";
import { startInstallListener } from "@/lib/pwa/install";

// Pages principales memorisees pour la lecture hors connexion
const routes = ["", "/services", "/menus", "/yaourts", "/galerie", "/a-propos", "/faq", "/contact", "/devis"];

export default function PwaRegister({ locale }: { locale: string }) {
  useEffect(() => {
    startInstallListener();

    // Le service worker ne tourne qu'en production, pour ne pas gener le developpement
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    let cancelled = false;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        await navigator.serviceWorker.ready;
        if (cancelled) return;
        const urls = routes.map((route) => `/${locale}${route}`);
        (registration.active ?? navigator.serviceWorker.controller)?.postMessage({ type: "CACHE_URLS", urls });
      } catch {}
    };

    const onLoad = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(() => void register());
      else setTimeout(() => void register(), 2000);
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, [locale]);

  return null;
}