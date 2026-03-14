const SITE_URL = "https://paul-claus.fr";
const PERSON_NAME = "Paul Claus";
const PAGE_NAME = "Portfolio - Paul Claus | Consultant .NET et developpeur C#";
const PAGE_DESCRIPTION =
  "Portfolio de Paul Claus, consultant en informatique chez Actimage pour Euro Information. Developpement C#, ASP.NET Core, applications web metier, full-stack et UX.";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#paul-claus`,
        name: PERSON_NAME,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/Paul_PDP_New.jpg`,
        jobTitle: "Consultant en informatique",
        worksFor: {
          "@type": "Organization",
          name: "Actimage",
        },
        email: "mailto:paul.claus@viacesi.fr",
        sameAs: ["https://github.com/Paulclaus67", "https://www.linkedin.com/in/paul-claus/"],
        knowsAbout: ["C#", "ASP.NET Core", "Applications web", "Developpement full-stack", "UX", "Git"],
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

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
