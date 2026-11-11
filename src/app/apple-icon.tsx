import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 62,
          fontWeight: 700,
        }}
      >
        BKJ
      </div>
    ),
    { ...size },
  );
}