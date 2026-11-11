import { ImageResponse } from "next/og";

const icons: Record<string, { px: number; maskable: boolean }> = {
  "192": { px: 192, maskable: false },
  "512": { px: 512, maskable: false },
  "maskable-512": { px: 512, maskable: true },
};

export function generateStaticParams() {
  return Object.keys(icons).map((size) => ({ size }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const icon = icons[size];
  if (!icon) return new Response("Not found", { status: 404 });

  const { px, maskable } = icon;
  const fontSize = Math.round(px * (maskable ? 0.3 : 0.38));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#9e2447",
          color: "#fff7f3",
          fontSize,
          fontWeight: 700,
          borderRadius: maskable ? 0 : Math.round(px * 0.22),
        }}
      >
        BKJ
      </div>
    ),
    { width: px, height: px },
  );
}