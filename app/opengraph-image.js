import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Portfolio de Paul Claus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "linear-gradient(135deg, rgba(34,211,238,0.20) 0%, rgba(168,85,247,0.18) 45%, rgba(15,23,42,0.02) 100%)",
          color: "#0f172a",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: -1 }}>Paul Claus</div>
        <div style={{ marginTop: 18, fontSize: 34, fontWeight: 650, color: "#0369a1" }}>
          Ingénieur informatique junior
        </div>
        <div style={{ marginTop: 22, fontSize: 28, color: "#334155" }}>
          Web • Réseau • IA générative
        </div>
        <div style={{ marginTop: 50, fontSize: 22, color: "#0f172a", opacity: 0.7 }}>paul-claus.fr</div>
      </div>
    ),
    size
  );
}

