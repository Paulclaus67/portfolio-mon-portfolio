export default function manifest() {
  return {
    name: "Portfolio Paul Claus",
    short_name: "Portfolio",
    description:
      "Portfolio professionnel de Paul Claus, ingénieur informatique junior (web, réseau, IA générative).",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#06b6d4",
    lang: "fr",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
  };
}

