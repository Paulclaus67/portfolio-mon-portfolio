import "./globals.css";
import StructuredData from "./components/StructuredData";

export const metadata = {
  metadataBase: new URL("https://paul-claus.fr"),
  title: {
    default: "Portfolio - Paul Claus | Consultant .NET et developpeur C#",
    template: "%s | Paul Claus",
  },
  description:
    "Portfolio de Paul Claus, consultant en informatique chez Actimage pour Euro Information. Developpement C#, ASP.NET Core, applications web metier, full-stack et UX.",
  keywords: [
    "consultant informatique",
    "developpeur c#",
    "asp.net core",
    "applications web",
    "developpement full-stack",
    "ux",
    "git",
    "portfolio",
  ],
  applicationName: "Portfolio Paul Claus",
  authors: [{ name: "Paul Claus", url: "https://paul-claus.fr" }],
  creator: "Paul Claus",
  publisher: "Paul Claus",
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      "fr-FR": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Portfolio - Paul Claus",
    description:
      "Consultant en informatique chez Actimage pour Euro Information - C#, ASP.NET Core, applications web metier et full-stack.",
    url: "/",
    type: "website",
    locale: "fr_FR",
    siteName: "Portfolio Paul Claus",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Portfolio de Paul Claus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Paul Claus",
    description: "Consultant .NET - C#, ASP.NET Core et applications web metier",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#030712" media="(prefers-color-scheme: dark)" />
        <StructuredData />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  const root = document.documentElement;

  const apply = (theme) => {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = normalized;
    root.classList.toggle('dark', normalized === 'dark');
    root.dataset.themeReady = 'true';
  };

  const getStored = () => {
    try {
      const v = localStorage.getItem('theme');
      return v === 'dark' || v === 'light' ? v : null;
    } catch {
      return null;
    }
  };

  const getSystem = () => {
    try {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  };

  apply(getStored() ?? getSystem());

  try {
    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (!mql) return;

    const onChange = () => {
      if (getStored()) return;
      apply(mql.matches ? 'dark' : 'light');
    };

    if (typeof mql.addEventListener === 'function') mql.addEventListener('change', onChange);
    else if (typeof mql.addListener === 'function') mql.addListener(onChange);
  } catch {}
})();`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
