import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/config";

export const alt = "BKJ service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const taglines = {
  fr: "Traiteur d'événements et yaourts à Kinshasa",
  en: "Event catering and yogurts in Kinshasa",
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tagline = isLocale(locale) ? taglines[locale] : taglines.fr;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          background: "#9e2447",
          color: "#fff7f3",
        }}
      >
        <div style={{ display: "flex", fontSize: 160, fontWeight: 700, letterSpacing: -4 }}>BKJ service</div>
        <div style={{ display: "flex", fontSize: 46, marginTop: 24, color: "#fbe8e0" }}>{tagline}</div>
        <div style={{ display: "flex", marginTop: 56, height: 10, width: 180, background: "#e9843f", borderRadius: 5 }} />
      </div>
    ),
    { ...size },
  );
}