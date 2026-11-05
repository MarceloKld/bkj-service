"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { locales } from "@/i18n/config";
import Splash from "./Splash";

export default function HomeSplash({ tagline }: { tagline: string }) {
  const pathname = usePathname();
  // Calcule une seule fois : le layout reste en place quand on change de page
  const [show] = useState(() => locales.some((l) => pathname === `/${l}` || pathname === `/${l}/`));

  return show ? <Splash tagline={tagline} /> : null;
}