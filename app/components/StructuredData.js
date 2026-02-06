const SITE_URL = "https://paul-claus.fr";
const PERSON_NAME = "Paul Claus";
const PAGE_NAME = "Portfolio – Paul Claus | Ingénieur Informatique Junior";
const PAGE_DESCRIPTION =
  "Portfolio professionnel de Paul Claus, ingénieur informatique junior spécialisé en développement web, réseau, IA générative et applications métier. Découvrez mes projets, compétences et expériences.";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#paul-claus`,
        name: PERSON_NAME,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/Paul_PDP.jpg`,
        jobTitle: "Ingénieur informatique junior",
        email: "mailto:paul.claus@viacesi.fr",
        sameAs: ["https://github.com/Paulclaus67", "https://www.linkedin.com/in/paul-claus/"],
        knowsAbout: ["Développement web", "Réseau", "IA générative", "Next.js", "React", "Python"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Portfolio Paul Claus",
        description: PAGE_DESCRIPTION,
        inLanguage: "fr-FR",
        publisher: { "@id": `${SITE_URL}/#paul-claus` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: PAGE_NAME,
        description: PAGE_DESCRIPTION,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#paul-claus` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
