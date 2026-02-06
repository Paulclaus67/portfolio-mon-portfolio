export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://paul-claus.fr/sitemap.xml",
    host: "https://paul-claus.fr",
  };
}

