import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Portfolio de Paul Claus";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, rgba(6,182,212,0.18) 0%, rgba(147,51,234,0.14) 55%, rgba(15,23,42,0.02) 100%)",
          color: "#0f172a",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>Paul Claus</div>
        <div style={{ marginTop: 18, fontSize: 32, fontWeight: 650, color: "#0e7490" }}>
          Portfolio — Web, Réseau, IA
        </div>
        <div style={{ marginTop: 46, fontSize: 22, color: "#0f172a", opacity: 0.7 }}>paul-claus.fr</div>
      </div>
    ),
    size
  );
}

