import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio – Paul Claus | Ingénieur Informatique Junior",
  description:
    "Portfolio professionnel de Paul Claus, ingénieur informatique junior spécialisé en développement web, réseau, IA générative et applications métier. Découvrez mes projets, compétences et expériences.",
  keywords: [
    "développeur",
    "ingénieur informatique",
    "web",
    "réseau",
    "IA",
    "Python",
    "JavaScript",
    "React",
    "Next.js",
    "portfolio",
  ],
  author: "Paul Claus",
  openGraph: {
    title: "Portfolio – Paul Claus",
    description:
      "Découvrez le portfolio de Paul Claus, ingénieur informatique junior spécialisé en web, réseau et IA.",
    url: "https://paul-claus.fr",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio – Paul Claus",
    description:
      "Ingénieur informatique junior - Web, Réseau, IA générative",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="canonical" href="https://paul-claus.fr" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
