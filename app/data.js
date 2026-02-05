export const skillCategories = [
  { key: "languages", label: "Langages & paradigmes" },
  { key: "web", label: "Web & Front" },
  { key: "data", label: "Data & IA" },
  { key: "infra", label: "Infra & réseaux" },
  { key: "methods", label: "Méthodes & outils" },
];

export const skills = [
  // Langages
  { key: "python", label: "Python", category: "languages" },
  { key: "cpp", label: "C++", category: "languages" },
  { key: "csharp", label: "C# .NET", category: "languages" },
  { key: "javascript", label: "JavaScript", category: "languages" },
  { key: "php", label: "PHP", category: "languages" },

  // Web
  { key: "frontend", label: "HTML / CSS / Tailwind", category: "web" },
  { key: "react", label: "React", category: "web" },
  { key: "next", label: "Next.js", category: "web" },
  { key: "wordpress", label: "WordPress", category: "web" },

  // Data & IA
  { key: "sql", label: "SQL & bases de données", category: "data" },
  { key: "nosql", label: "NoSQL", category: "data" },
  { key: "bigdata", label: "Hadoop / Talend", category: "data" },
  { key: "ia", label: "IA & IA générative", category: "data" },

  // Infra & réseaux
  { key: "sysadmin", label: "Administration systèmes", category: "infra" },
  { key: "network", label: "Gestion des réseaux", category: "infra" },
  { key: "deploy", label: "Déploiement logiciel", category: "infra" },

  // Méthodes & outils
  { key: "agile", label: "Méthodes Agiles", category: "methods" },
  { key: "git", label: "Git & gestion de versions", category: "methods" },
];

export const skillDetails = {
  python: {
    title: "Python",
    level: "prod",
    desc: "Scripts, outils internes et interfaces (PySide6) : manipulation de données, logique métier, prototypage rapide.",
    context:
      "Utilisé pour la refonte d'interface réseau chez Thales et pour des scripts d'automatisation, ainsi que pour des outils autour de l'IA chez Milla & Partner.",
    tags: [
      { type: "company", companyKey: "thales", label: "Thales" },
      { type: "company", companyKey: "milla", label: "Milla & Partner" },
      { type: "context", label: "Scripts internes" },
      { type: "context", label: "Outils autour de l'IA" },
    ],
    metrics: {
      confidence: 88,
      experience: 80,
      recentUse: 85,
    },
    employerValue:
      "Concrètement, je peux automatiser des tâches répétitives, créer de petits outils internes ou prototyper rapidement une interface ou une logique métier pour vos équipes, sans partir de zéro à chaque fois.",
  },

  cpp: {
    title: "C++",
    level: "projet",
    desc: "Bases solides en programmation bas niveau, manipulation mémoire et structures de données.",
    context:
      "Utilisé dans le cadre de projets académiques pour comprendre les fondamentaux et les performances.",
    tags: [{ type: "context", label: "Projets d'école" }],
    metrics: {
      confidence: 70,
      experience: 60,
      recentUse: 40,
    },
    employerValue:
      "Je ne suis pas un expert C++ senior, mais je comprends suffisamment les mécanismes bas niveau et les performances pour échanger avec des équipes systèmes ou embarquées et monter en compétence rapidement si votre stack le nécessite.",
  },

  csharp: {
    title: "C# .NET",
    level: "prod",
    desc: "Développement d'une application de gestion d'incidents (IncidentFlow) : API REST, modèle de données, interface web, tests unitaires.",
    context:
      "Projet personnel depuis 2023 : application de gestion d'incidents inspirée du fonctionnement d'une DSI, avec ASP.NET Core, architecture en couches, REST, tests unitaires et CI GitHub Actions.",
    tags: [
      { type: "context", label: "Projet personnel IncidentFlow" },
      { type: "context", label: "API REST ASP.NET Core" },
      { type: "context", label: "Tests unitaires" },
      { type: "context", label: "GitHub Actions" },
    ],
    metrics: {
      confidence: 75,
      experience: 70,
      recentUse: 80,
    },
    employerValue:
      "Si votre environnement est orienté .NET, je pars avec une expérience concrète en C# sur un projet complet (backend, API REST, tests), ce qui me permet de m'intégrer plus vite dans une équipe existante et de reprendre du code avec un temps d'adaptation réduit.",
  },

  javascript: {
    title: "JavaScript",
    level: "prod",
    desc: "Interaction front-end, appels API, DOM, micro-interactions et logique côté client.",
    context:
      "Utilisé pour la refonte du back-office chez Électricité de Strasbourg, ce portfolio et des projets personnels.",
    tags: [
      { label: "JavaScript", skillKey: "javascript" },
      { type: "company", companyKey: "es", label: "Électricité de Strasbourg" },
      { type: "context", label: "Back-office web" },
      { type: "context", label: "jQuery / Vanilla" },
      { type: "context", label: "Portfolio" },
    ],
    metrics: {
      confidence: 85,
      experience: 80,
      recentUse: 90,
    },
    employerValue:
      "Je peux faire évoluer une interface existante (back-office, front applicatif), corriger des bugs, ajouter des filtres ou interactions sans casser la logique existante, et dialoguer avec vos API de manière propre.",
  },

  php: {
    title: "PHP",
    level: "prod",
    desc: "Back-end léger, formulaires, gestion de données et logique serveur simple.",
    context:
      "Employé pour le back-office ÉS et des projets web structurés avec formulaires et gestion de catalogues.",
    tags: [
      { type: "company", companyKey: "es", label: "Électricité de Strasbourg" },
      { type: "context", label: "Catalogue matériel" },
    ],
    metrics: {
      confidence: 78,
      experience: 75,
      recentUse: 70,
    },
    employerValue:
      "Je suis à l’aise pour maintenir ou faire évoluer un back-office PHP existant (gestion de formulaires, catalogues, petites règles métiers) plutôt que de tout réécrire, ce qui est souvent le besoin réel en entreprise.",
  },

  frontend: {
    title: "HTML / CSS / Tailwind",
    level: "prod",
    desc: "Mise en page propre, responsive, utilisation de Tailwind et de composants modernes.",
    context:
      "Utilisé pour ce portfolio, la mise en forme des interfaces web chez Électricité de Strasbourg et Milla & Partner, ainsi que sur des sites vitrine.",
    tags: [
      { type: "company", companyKey: "es", label: "Électricité de Strasbourg" },
      { type: "company", companyKey: "milla", label: "Milla & Partner" },
      { type: "context", label: "Portfolio" },
      { type: "context", label: "Back-office web" },
      { type: "context", label: "Interfaces pour assistant IA" },
    ],
    metrics: {
      confidence: 90,
      experience: 85,
      recentUse: 95,
    },
    employerValue:
      "Je peux transformer une maquette ou un besoin flou en interface claire, lisible et responsive, que ce soit pour un back-office interne ou une page plus marketing, en gardant une dette CSS raisonnable.",
  },

  react: {
    title: "React",
    level: "en_cours",
    desc: "Composants, props, état local, premières bonnes pratiques pour des interfaces dynamiques.",
    context:
      "Utilisé dans ce portfolio et des expérimentations d’UI modernes pour monter en compétence.",
    tags: [
      { type: "context", label: "Portfolio" },
      { type: "context", label: "Side projects" },
    ],
    metrics: {
      confidence: 70,
      experience: 55,
      recentUse: 80,
    },
    employerValue:
      "Je peux intervenir sur un projet React existant pour ajouter de nouveaux composants, gérer de l’état local ou des formulaires simples, tout en continuant à monter en compétence sur les patterns plus avancés.",
  },

  next: {
    title: "Next.js",
    level: "en_cours",
    desc: "Structure de projet, App Router, composants client, intégration Tailwind et bonnes pratiques.",
    context:
      "Ce portfolio sert de terrain de jeu pour apprendre Next.js et les patterns fullstack modernes.",
    tags: [
      { type: "context", label: "Portfolio" },
      { type: "context", label: "Fullstack" },
    ],
    metrics: {
      confidence: 65,
      experience: 50,
      recentUse: 80,
    },
    employerValue:
      "Je suis capable de comprendre la structure d’une appli Next.js, de créer ou ajuster des pages, des routes API simples et des composants, ce qui me permet de contribuer rapidement à un produit existant.",
  },

  wordpress: {
    title: "WordPress",
    level: "prod",
    desc: "Création de sites vitrines avec thèmes, plugins, configuration et optimisation basique.",
    context:
      "Utilisé pour le site réel du gîte de Servance : contenu, hébergement et expérience utilisateur.",
    tags: [
      {
        type: "project",
        href: "http://gite-servance.fr",
        label: "Gîte de Servance (site)",
      },
      { type: "context", label: "Client réel" },
      { type: "context", label: "Site vitrine" },
    ],
    metrics: {
      confidence: 82,
      experience: 80,
      recentUse: 75,
    },
    employerValue:
      "Je peux mettre en place ou faire évoluer rapidement un site vitrine ou une page marketing WordPress (contenu, thème, plugins), utile pour des besoins de communication sans engager un gros projet sur mesure.",
  },

  sql: {
    title: "SQL & bases de données",
    level: "prod",
    desc: "Modélisation simple, requêtes CRUD, jointures et index de base.",
    context:
      "Employé dans des projets d’école et pour la refonte du back-office catalogue matériel chez Électricité de Strasbourg.",
    tags: [
      { type: "company", companyKey: "es", label: "Électricité de Strasbourg" },
      { type: "context", label: "Back-office catalogue" },
      { type: "context", label: "Projets d'école" },
    ],
    metrics: {
      confidence: 75,
      experience: 70,
      recentUse: 60,
    },
    employerValue:
      "Je peux écrire ou ajuster des requêtes SQL propres (sélection, filtres, jointures) et comprendre rapidement le modèle de données pour ajouter des fonctionnalités côté back-office ou reporting.",
  },

  nosql: {
    title: "NoSQL",
    level: "projet",
    desc: "Compréhension des modèles orientés documents / clés-valeurs et de leurs cas d’usage.",
    context:
      "Approché dans des contextes Big Data et des architectures modernes lors de la formation.",
    tags: [
      { type: "context", label: "Projets d'école" },
      { type: "context", label: "Big Data" },
    ],
    metrics: {
      confidence: 60,
      experience: 50,
      recentUse: 40,
    },
    employerValue:
      "Je comprends les grandes idées derrière les bases NoSQL (documents, clés-valeurs, schéma flexible), ce qui me permet de collaborer avec une équipe data ou de back-end qui utilise déjà ce type de stockage.",
  },

  bigdata: {
    title: "Hadoop / Talend & Big Data",
    level: "projet",
    desc: "Notions sur les pipelines de données, ETL et traitements distribués.",
    context:
      "Exploré dans des projets académiques orientés data engineering / Big Data.",
    tags: [
      { type: "context", label: "Talend" },
      { type: "context", label: "Projets d'école" },
    ],
    metrics: {
      confidence: 55,
      experience: 45,
      recentUse: 35,
    },
    employerValue:
      "Je comprends le principe des chaînes de traitement de données (ETL, jobs planifiés, volumétrie), ce qui facilite les échanges avec une équipe data et mon intégration sur des sujets d’industrialisation.",
  },

  ia: {
    title: "IA & IA générative",
    level: "prod",
    desc: "Mise en place d’un assistant conversationnel pour l’onboarding, travail sur le prompt, les données et l’intégration web.",
    context:
      "Conception d’un assistant d’onboarding basé sur l’IA générative chez Milla & Partner (Stuttgart).",
    tags: [
      { type: "company", companyKey: "milla", label: "Milla & Partner" },
      { type: "context", label: "Assistant d'onboarding" },
      { type: "context", label: "Fine-tuning & prompts" },
    ],
    metrics: {
      confidence: 82,
      experience: 78,
      recentUse: 90,
    },
    employerValue:
      "Je peux vous aider à transformer un besoin métier en assistant basé sur l’IA (onboarding, FAQ interne, support de premier niveau) en travaillant autant sur le prompt que sur l’intégration dans votre interface.",
  },

  sysadmin: {
    title: "Administration systèmes",
    level: "prod",
    desc: "Gestion de postes, scripts Bash, supervision basique et déploiements sur parc.",
    context:
      "Expérimenté chez Groupe Schertz pour le déploiement massif d'antivirus sur plus de 600 postes.",
    tags: [
      { type: "company", companyKey: "schertz", label: "Groupe Schertz" },
      { type: "context", label: "Déploiement antivirus" },
    ],
    metrics: {
      confidence: 80,
      experience: 82,
      recentUse: 70,
    },
    employerValue:
      "Je comprends les contraintes du terrain côté systèmes (postes utilisateurs, scripts, outils de prise en main à distance), ce qui m’aide à développer des outils qui respectent vos réalités d’exploitation.",
  },

  network: {
    title: "Gestion des réseaux",
    level: "prod",
    desc: "Configuration d’outils internes, compréhension des flux réseau et contraintes de performance.",
    context:
      "Mis en pratique lors du stage de fin d'études chez Thales sur un outil de configuration réseau.",
    tags: [
      { type: "company", companyKey: "thales", label: "Thales" },
      { type: "context", label: "Outil de configuration réseau" },
    ],
    metrics: {
      confidence: 78,
      experience: 80,
      recentUse: 75,
    },
    employerValue:
      "Je suis capable de parler le même langage que vos équipes réseau, de comprendre leurs contraintes et de concevoir des interfaces ou scripts qui s’intègrent bien dans leur quotidien.",
  },

  deploy: {
    title: "Déploiement logiciel",
    level: "prod",
    desc: "Mise en production, packaging, gestion de versions et accompagnement des utilisateurs.",
    context:
      "Appliqué sur les projets ÉS et lors du déploiement d’outils internes utilisés par des équipes métier.",
    tags: [
      { type: "company", companyKey: "es", label: "Électricité de Strasbourg" },
      { type: "context", label: "Mises en production" },
    ],
    metrics: {
      confidence: 80,
      experience: 78,
      recentUse: 72,
    },
    employerValue:
      "Je sais qu’un projet ne s’arrête pas au code : je suis à l’aise avec les étapes de mise en production, la gestion de versions et l’accompagnement des utilisateurs pour limiter les frictions au déploiement.",
  },

  agile: {
    title: "Méthodes Agiles",
    level: "prod",
    desc: "Travail en itérations courtes, échanges fréquents avec les parties prenantes, feedback continu.",
    context:
      "Mises en œuvre dans les projets d'école et au sein de toutes mes expériences en entreprise.",
    tags: [
      { type: "company", companyKey: "thales", label: "Thales" },
      { type: "company", companyKey: "milla", label: "Milla & Partner" },
      { type: "company", companyKey: "es", label: "Électricité de Strasbourg" },
      { type: "company", companyKey: "schertz", label: "Groupe Schertz" },
      { type: "context", label: "Projets d'école" },
    ],
    metrics: {
      confidence: 85,
      experience: 80,
      recentUse: 80,
    },
    employerValue:
      "Je suis habitué à travailler avec un backlog, des priorités qui bougent et des démos régulières : je m’intègre facilement dans une équipe agile existante et je remonte les blocages plutôt que de rester bloqué dans mon coin.",
  },

  git: {
    title: "Git & gestion de versions",
    level: "prod",
    desc: "Branches, merges, pull requests, gestion de petites équipes et bonne hygiène de commits.",
    context:
      "Utilisé au quotidien sur les projets d’école, ce portfolio et l’ensemble de mes stages / CDD.",
    tags: [
      { type: "context", label: "GitHub" },
      { type: "context", label: "Projets d'équipe" },
      { type: "company", companyKey: "thales", label: "Thales" },
      { type: "company", companyKey: "milla", label: "Milla & Partner" },
      { type: "company", companyKey: "es", label: "Électricité de Strasbourg" },
      { type: "company", companyKey: "schertz", label: "Groupe Schertz" },
    ],
    metrics: {
      confidence: 88,
      experience: 85,
      recentUse: 95,
    },
    employerValue:
      "Je sais travailler proprement avec Git (branches, PR, merges) ce qui limite les conflits, rassure l’équipe sur la qualité de l’historique et facilite les revues de code.",
  },
};

export const experiences = [
  {
    key: "thales",
    title: "Ingénieur réseau – Stage de fin d'études",
    place: "Thales · 2025",
    desc: "Conception et développement d'une nouvelle interface utilisateur pour un outil stratégique de configuration réseau : migration vers PySide6, refonte UX/UI, amélioration de la performance et de la maintenabilité du code.",
    shortDesc:
      "Refonte d’une interface de configuration réseau critique (PySide6, UX/UI, performance).",
    logo: "/logos/thales.png",
    alt: "Logo Thales",
    url: "https://www.thalesgroup.com/",
    tags: [
      { label: "Python", skillKey: "python" },
      { label: "PySide6" },
      { label: "Réseau", skillKey: "network" },
      { label: "UX/UI" },
      { label: "Agile", skillKey: "agile" },
      { label: "Git", skillKey: "git" },
    ],
  },
  {
    key: "milla",
    title: "Ingénieur IA – Stage à l'étranger",
    place: "Milla & Partner (Stuttgart) · 2023–2024",
    desc: "Conception d'un assistant conversationnel basé sur l'IA générative pour l'onboarding des nouveaux arrivants : recueil du besoin, paramétrage, fine-tuning, intégration web.",
    shortDesc:
      "Assistant d’onboarding basé sur l’IA générative pour les nouveaux arrivants (design, prompts, intégration).",
    logo: "/logos/milla-partner.png",
    alt: "Logo Milla & Partner",
    url: "https://www.milla.de/",
    tags: [
      { label: "IA générative", skillKey: "ia" },
      { label: "Python", skillKey: "python" },
      { label: "HTML/CSS", skillKey: "frontend" },
      { label: "Agile", skillKey: "agile" },
      { label: "Git", skillKey: "git" },
      { label: "Anglais" },
    ],
  },
  {
    key: "es",
    title: "Chef de projet & Développeur web – CDD",
    place: "Électricité de Strasbourg · 2023",
    desc: "Refonte du back-office d'un site de gestion de catalogue matériel : analyse des besoins, développement (JS/jQuery, PHP, HTML, CSS, SQL), mise en production, ateliers utilisateurs et supervision d'une ressource.",
    shortDesc:
      "Refonte d’un back-office de catalogue matériel (JS, PHP, SQL, HTML/CSS) jusqu’à la mise en production.",
    logo: "/logos/es.png",
    alt: "Logo Électricité de Strasbourg",
    url: "https://www.es.fr/",
    tags: [
      { label: "JavaScript", skillKey: "javascript" },
      { label: "PHP", skillKey: "php" },
      { label: "SQL", skillKey: "sql" },
      { label: "HTML/CSS", skillKey: "frontend" },
      { label: "Back-office" },
      { label: "Agile", skillKey: "agile" },
      { label: "Git", skillKey: "git" },
    ],
  },
  {
    key: "schertz",
    title: "Administrateur systèmes – Stage",
    place: "Groupe Schertz · 2022",
    desc: "Déploiement d'un nouvel antivirus sur plus de 600 postes : scripts Bash, utilisation de Teamviewer, coordination avec les utilisateurs et gestion du changement.",
    shortDesc:
      "Déploiement d’un antivirus sur plus de 600 postes (scripts Bash, support utilisateurs).",
    logo: "/logos/schertz.png",
    alt: "Logo Groupe Schertz",
    url: "https://www.groupe-schertz.com/",
    tags: [
      { label: "Systèmes", skillKey: "sysadmin" },
      { label: "Déploiement", skillKey: "deploy" },
      { label: "Scripts Bash", skillKey: "sysadmin" },
      { label: "Support utilisateurs" },
      { label: "Git", skillKey: "git" },
    ],
  },
];

export const companyLogos = {
  thales: { src: "/logos/thales.png", alt: "Thales" },
  es: { src: "/logos/es.png", alt: "Électricité de Strasbourg" },
  milla: { src: "/logos/milla-partner.png", alt: "Milla & Partner" },
  schertz: { src: "/logos/schertz.png", alt: "Groupe Schertz" },
};

export const trustedLogos = [
  {
    name: "Thales",
    src: "/logos/thales.png",
    url: "https://www.thalesgroup.com/",
  },
  {
    name: "Milla & Partner",
    src: "/logos/milla-partner.png",
    url: "https://www.milla.de/",
  },
  {
    name: "Électricité de Strasbourg",
    src: "/logos/es.png",
    url: "https://www.es.fr/",
  },
  {
    name: "Groupe Schertz",
    src: "/logos/schertz.png",
    url: "https://www.groupe-schertz.com/",
  },
];

export const caseStudies = [
  {
    key: "thales",
    company: "Thales",
    logo: "/logos/thales.png",
    role: "Ingénieur réseau – Stage de fin d'études",
    year: "2025",
    location: "France",
    category: "reseau",
    contractLabel: "Stage de fin d'études",
    headline: "Refonte d’un outil de configuration réseau critique",
    summary:
      "Nouvelle interface PySide6 pour un outil de configuration réseau interne, plus claire pour les équipes terrain et plus simple à maintenir.",
    contextBullets: [
      "Outil interne utilisé quotidiennement par les ingénieurs réseau.",
      "Interface vieillissante, difficile à lire et à faire évoluer.",
    ],
    actionsBullets: [
      "Conception d’une nouvelle interface utilisateur avec PySide6 (UX/UI).",
      "Refonte du code existant pour le rendre plus performant et maintenable.",
      "Collaboration avec les équipes réseau pour adapter l’outil à leurs usages réels.",
    ],
    impactBullets: [
      "Interface de configuration réseau plus compréhensible pour les équipes terrain.",
      "Code modernisé, plus simple à maintenir et à faire évoluer.",
      "Meilleure visibilité sur les paramètres critiques de configuration.",
    ],
    techs: ["Python", "PySide6", "Réseau", "UX/UI", "Agile", "Git"],
    skillTags: ["python", "network", "agile", "git"],
    prioRecruiter: true,
  },
  {
    key: "es",
    company: "Électricité de Strasbourg",
    logo: "/logos/es.png",
    role: "Chef de projet & Développeur web – Stage + CDD",
    year: "2023",
    location: "France",
    category: "web",
    contractLabel: "Stage + CDD",
    headline: "Back-office de catalogue matériel remis au niveau",
    summary:
      "Refonte complète du back-office de gestion de catalogue matériel utilisé par les équipes internes (JS, PHP, SQL, HTML/CSS).",
    contextBullets: [
      "Back-office existant peu ergonomique pour les équipes métier.",
      "Difficultés à faire évoluer le catalogue et à maintenir les données.",
    ],
    actionsBullets: [
      "Analyse de l’existant et recueil des besoins auprès des utilisateurs internes.",
      "Refonte front/back : JS (jQuery), PHP, SQL, HTML/CSS.",
      "Mise en production, ateliers utilisateurs et supervision d’une ressource.",
    ],
    impactBullets: [
      "Back-office aligné avec les usages réels des équipes internes.",
      "Mise à jour du catalogue matériel facilitée et moins d’erreurs de saisie.",
      "Meilleure visibilité sur le stock et les références matérielles.",
    ],
    techs: ["JavaScript", "PHP", "SQL", "HTML/CSS", "Back-office", "Git"],
    skillTags: ["javascript", "php", "sql", "frontend", "agile", "git"],
    prioRecruiter: true,
  },
  {
    key: "milla",
    company: "Milla & Partner",
    logo: "/logos/milla-partner.png",
    role: "Ingénieur IA – Stage à l'étranger",
    year: "2023–2024",
    location: "Allemagne",
    category: "ia",
    contractLabel: "Stage à l'étranger",
    headline: "Assistant d’onboarding basé sur l’IA générative",
    summary:
      "Assistant conversationnel pour répondre aux questions des nouveaux arrivants, basé sur un modèle d’IA générative adapté au contexte interne.",
    contextBullets: [
      "Nouveaux arrivants qui posent souvent les mêmes questions aux équipes RH.",
      "Volonté de proposer une expérience d’onboarding plus fluide et autonome.",
    ],
    actionsBullets: [
      "Recueil du besoin avec les équipes et définition du périmètre de l’assistant.",
      "Travail sur le prompt, les données internes et la sécurité des réponses.",
      "Intégration de l’assistant dans une interface web adaptée aux utilisateurs.",
    ],
    impactBullets: [
      "Réponses immédiates aux questions fréquentes des nouveaux arrivants.",
      "Moins de sollicitations répétitives pour les équipes RH.",
      "Expérience d’onboarding plus fluide, dans un contexte international.",
    ],
    techs: ["IA générative", "Python", "HTML/CSS", "Intégration web", "Agile"],
    skillTags: ["ia", "python", "frontend", "agile", "git"],
    prioRecruiter: true,
  },
  {
    key: "incidentflow",
    company: "Projet personnel",
    logo: "/logos/IncidentFlow.png",
    role: "Développeur C#/.NET – Projet personnel",
    year: "2023",
    location: "France",
    category: "logiciel",
    contractLabel: "Projet personnel",
    headline: "Application de gestion d'incidents IncidentFlow",
    summary:
      "Application C#/.NET pour gérer les incidents et demandes : suivi des tickets, SLA, affectations, avec tableau de bord pour l'équipe IT.",
    contextBullets: [
      "Projet personnel inspiré du fonctionnement d'une DSI type.",
      "Objectif : concevoir une application de gestion d'incidents permettant de suivre les tickets, les priorités, les SLA et les affectations, avec un tableau de bord pour l'équipe IT.",
    ],
    actionsBullets: [
      "Recueil et formalisation des besoins en s'inspirant du fonctionnement d'une DSI (types de tickets, statuts, SLA, rôles).",
      "Conception du modèle de données (tickets, utilisateurs, services, journaux d'activité).",
      "Développement d'une API REST en ASP.NET Core pour gérer les tickets (CRUD, filtres, pagination).",
      "Implémentation d'une interface web simple (Razor Pages ou petit front React) pour la saisie et le suivi des tickets.",
      "Mise en place d'un tableau de bord (tickets par statut, par priorité, par service).",
      "Ajout de tests unitaires sur les services métier et configuration d'une CI GitHub Actions pour lancer les tests à chaque commit.",
    ],
    impactBullets: [
      "Application fonctionnelle permettant de gérer les incidents et les demandes.",
      "Meilleure compréhension de l'architecture en couches, REST, tests unitaires.",
      "Kanban personnel pour suivre l'avancement (TODO / DOING / DONE).",
    ],
    techs: ["C#/.NET", "ASP.NET Core", "REST API", "SQL", "Tests unitaires", "CI GitHub Actions", "HTML/CSS", "Git"],
    skillTags: ["csharp", "sql", "frontend", "git", "agile"],
    prioRecruiter: true,
  },
  {
    key: "muscu-pwa",
    company: "Projet personnel",
    logo: "/logos/fitforge.png",
    role: "Développeur Full-Stack – Projet personnel",
    year: "2024–2025",
    location: "France",
    category: "web",
    contractLabel: "Projet personnel",
    headline: "Muscu PWA – Application Web Progressive de Suivi d'Entraînement",
    summary:
      "Plateforme complète de suivi d'entraînement : application web progressive avec React 19, Express, Prisma, authentification JWT, visualisations en temps réel et fonctionnalités offline.",
    link: "https://fitforge-muscu.fr/",
    contextBullets: [
      "Besoin : créer une application performante et accessible pour suivre et planifier les entraînements de musculation.",
      "Objectif : démontrer une compétence full-stack moderne avec architecture scalable, UX premium et fonctionnalités PWA avancées.",
    ],
    actionsBullets: [
      "Architecture full-stack TypeScript : React 19 + Vite côté frontend, Express + TypeScript côté backend.",
      "Frontend PWA : React Router pour navigation fluide, Tailwind CSS pour design responsive, Service Worker pour mode offline complet.",
      "Backend robuste : Express API RESTful, Prisma ORM pour requêtes type-safe, authentification JWT sécurisée, CORS configuré.",
      "Base de données : Prisma migrations, SQLite en développement, support PostgreSQL en production.",
      "Visualisations : Chart.js pour graphiques de progression, tableaux de statistiques, gestion de données en temps réel.",
      "DevOps & déploiement : Docker & Docker-compose, CI/CD GitHub Actions, déploiement automatisé en production.",
      "Expérience utilisateur : Thème clair/sombre, interface responsive, installation sur écran d'accueil, mode offline complet.",
    ],
    impactBullets: [
      "Application production-ready avec 100% des fonctionnalités PWA et expérience utilisateur premium.",
      "Architecture full-stack moderne et maintenable, prête pour montée en charge et scaling.",
      "Démonstration complète des compétences DevOps : containerisation, CI/CD, déploiement automatisé.",
      "Documentation professionnelle : API docs, guides de déploiement, guidelines de contribution.",
    ],
    techs: ["React 19", "TypeScript", "Express.js", "Prisma", "Node.js", "Tailwind CSS", "Chart.js", "PWA", "Docker", "GitHub Actions", "SQLite", "PostgreSQL", "JWT"],
    skillTags: ["react", "javascript", "frontend", "sql", "agile", "git"],
    prioRecruiter: true,
  },
  {
    key: "gite-servance",
    company: "Projet client réel",
    logo: "/logos/gite-servance.png",
    role: "Développeur Web – Projet client",
    year: "2023",
    location: "France",
    category: "web",
    contractLabel: "Client réel",
    headline: "Site vitrine pour le Gîte de Servance",
    summary:
      "Création complète d'un site WordPress pour un gîte touristique : présentation, réservations, galerie photos et optimisation SEO.",
    link: "http://gite-servance.fr",
    contextBullets: [
      "Client réel : gîte touristique dans les Vosges cherchant à améliorer sa visibilité en ligne.",
      "Besoin d'un site vitrine simple, élégant et facile à mettre à jour par le propriétaire.",
    ],
    actionsBullets: [
      "Analyse des besoins : présentation du gîte, galerie photos, calendrier de disponibilités, formulaire de contact.",
      "Sélection et personnalisation d'un thème WordPress adapté au secteur touristique.",
      "Configuration de plugins essentiels : SEO, formulaires de contact, galerie responsive.",
      "Optimisation des performances : compression d'images, cache, temps de chargement.",
      "Formation du client à la mise à jour autonome du contenu.",
    ],
    impactBullets: [
      "Site professionnel et responsive, accessible sur tous les appareils.",
      "Meilleure visibilité en ligne pour le gîte grâce au SEO de base.",
      "Client autonome pour mettre à jour les disponibilités et les informations.",
      "Expérience utilisateur fluide pour les visiteurs potentiels.",
    ],
    techs: ["WordPress", "HTML/CSS", "SEO", "Plugins WordPress"],
    skillTags: ["wordpress", "frontend"],
    prioRecruiter: false,
  },
];

export const skillExamples = {
  python: {
    title: "Script de rapport réseau quotidien",
    lines: [
      "# Génère un rapport quotidien à partir de fichiers logs",
      "from pathlib import Path",
      "import datetime",
      "",
      "def collect_logs(folder):",
      "    paths = Path(folder).glob('*.log')",
      "    return [p.read_text() for p in paths]",
      "",
      "def build_report(logs):",
      "    incidents = [l for l in logs if 'ERROR' in l]",
      "    return f'Incidents: {len(incidents)}'",
      "",
      "if __name__ == '__main__':",
      "    logs = collect_logs('/var/logs/reseau')",
      "    report = build_report(logs)",
      "    Path('rapport_reseau.txt').write_text(report)",
    ],
  },
  cpp: {
    title: "Calcul d’une moyenne mobile performante",
    lines: [
      "#include <vector>",
      "#include <numeric>",
      "",
      "double movingAverage(const std::vector<double>& values, int window) {",
      "    if (values.size() < window) return 0.0;",
      "",
      "    double sum = std::accumulate(",
      "        values.end() - window,",
      "        values.end(),",
      "        0.0",
      "    );",
      "    return sum / window;",
      "}",
      "",
      "// Utilisation",
      "// std::vector<double> latencies = {12.4, 10.1, 15.7, 9.9};",
      "// double avg = movingAverage(latencies, 3);",
    ],
  },
  csharp: {
    title: "Service de gestion des tickets (IncidentFlow)",
    lines: [
      "public class TicketService",
      "{",
      "    private readonly ApplicationDbContext _context;",
      "",
      "    public TicketService(ApplicationDbContext context)",
      "    {",
      "        _context = context;",
      "    }",
      "",
      "    public async Task<Ticket> CreateTicketAsync(TicketDto dto)",
      "    {",
      "        var ticket = new Ticket",
      "        {",
      "            Title = dto.Title,",
      "            Description = dto.Description,",
      "            Status = TicketStatus.Open,",
      "            Priority = dto.Priority,",
      "            CreatedAt = DateTime.UtcNow",
      "        };",
      "",
      "        _context.Tickets.Add(ticket);",
      "        await _context.SaveChangesAsync();",
      "        return ticket;",
      "    }",
      "}",
    ],
  },
  javascript: {
    title: "Rafraîchissement d’un tableau de back-office",
    lines: [
      "async function refreshMaterialTable(filter) {",
      "  const res = await fetch('/api/materiels?status=' + filter);",
      "  const data = await res.json();",
      "",
      "  const tbody = document.querySelector('#materiels-table tbody');",
      "  tbody.innerHTML = '';",
      "",
      "  data.forEach((row) => {",
      "    const tr = document.createElement('tr');",
      "    tr.innerHTML = `<td>${row.ref}</td><td>${row.libelle}</td><td>${row.stock}</td>`;",
      "    tbody.appendChild(tr);",
      "  });",
      "}",
      "",
      "document.querySelector('#filter').addEventListener('change', (e) => {",
      "  refreshMaterialTable(e.target.value);",
      "});",
    ],
  },
  php: {
    title: "Mise à jour d’un matériel dans un back-office",
    lines: [
      "// update_materiel.php",
      "require 'db.php';",
      "",
      "$id      = $_POST['id']      ?? null;",
      "$libelle = $_POST['libelle'] ?? null;",
      "$stock   = $_POST['stock']   ?? null;",
      "",
      "if ($id && $libelle !== null) {",
      "    $stmt = $pdo->prepare(",
      "        'UPDATE materiels SET libelle = ?, stock = ? WHERE id = ?'",
      "    );",
      "    $stmt->execute([$libelle, $stock, $id]);",
      "    header('Location: /admin/materiels?status=updated');",
      "    exit;",
      "}",
      "",
      "header('Location: /admin/materiels?status=error');",
    ],
  },
  frontend: {
    title: "Carte responsive pour afficher une info métier",
    lines: [
      "<div class='rounded-2xl border border-slate-700 bg-slate-900 p-4",
      "            flex flex-col gap-2 md:flex-row md:items-center'>",
      "  <div class='font-semibold text-slate-50'>Serveur de production</div>",
      "  <div class='text-sm text-slate-400 flex-1'>",
      "    Héberge l'API principale utilisée par le back-office.",
      "  </div>",
      "  <span class='inline-flex items-center justify-center rounded-full",
      "               bg-emerald-500/10 text-emerald-300 text-xs px-3 py-1'>",
      "    En ligne",
      "  </span>",
      "</div>",
    ],
  },
  react: {
    title: "Badge de statut réutilisable",
    lines: [
      "function StatusBadge({ status }) {",
      "  const map = {",
      "    online:  { label: 'En ligne',  className: 'bg-emerald-500/10 text-emerald-300' },",
      "    offline: { label: 'Hors ligne', className: 'bg-red-500/10 text-red-300' },",
      "    pending: { label: 'En cours',   className: 'bg-amber-500/10 text-amber-300' },",
      "  };",
      "",
      "  const conf = map[status] ?? map.pending;",
      "",
      "  return (",
      "    <span className={",
      "      'px-3 py-1 rounded-full text-xs ' + conf.className",
      "    }>",
      "      {conf.label}",
      "    </span>",
      "  );",
      "}",
    ],
  },
  next: {
    title: "Route API simple pour retourner des matériels",
    lines: [
      "// app/api/materiels/route.js",
      "import { NextResponse } from 'next/server';",
      "",
      "const MATERIELS = [",
      "  { id: 1, ref: 'SW-001', libelle: 'Switch 24 ports' },",
      "  { id: 2, ref: 'RT-010', libelle: 'Routeur principal' },",
      "];",
      "",
      "export async function GET() {",
      "  return NextResponse.json(MATERIELS);",
      "}",
    ],
  },
  wordpress: {
    title: "Type de contenu personnalisé pour les avis clients",
    lines: [
      "// functions.php",
      "add_action('init', function () {",
      "    register_post_type('avis_client', [",
      "        'label'  => 'Avis clients',",
      "        'public' => true,",
      "        'supports' => ['title', 'editor', 'thumbnail'],",
      "    ]);",
      "});",
    ],
  },
  sql: {
    title: "Suivi des matériels en stock faible",
    lines: [
      "SELECT ref, libelle, stock",
      "FROM materiels",
      "WHERE stock <= 5",
      "ORDER BY stock ASC;",
    ],
  },
  nosql: {
    title: "Stockage de logs d’accès à une API",
    lines: [
      "// Exemple de document dans une collection 'access_logs'",
      "{",
      "  userId: 'u_123',",
      "  endpoint: '/api/materiels',",
      "  method: 'GET',",
      "  statusCode: 200,",
      "  timestamp: ISODate('2025-03-12T10:21:00Z')",
      "}",
      "",
      "// Requête d'exemple : tous les appels en erreur",
      "db.access_logs.find({ statusCode: { $gte: 400 } });",
    ],
  },
  bigdata: {
    title: "Mapper / Reducer simplifié pour compter les pages",
    lines: [
      "# Mapper (pseudo-code)",
      "def map(line):",
      "    # line: '2025-03-12;GET;/catalogue'",
      "    _, _, path = line.split(';')",
      "    emit(path, 1)",
      "",
      "# Reducer",
      "def reduce(path, counts):",
      "    total = sum(counts)",
      "    emit(path, total)",
    ],
  },
  ia: {
    title: "Construction d’un prompt d’onboarding",
    lines: [
      "def build_prompt(question, contexte_entreprise):",
      "    header = \"Tu es un assistant qui répond aux questions des nouveaux arrivants.\"",
      "    return (",
      "        header",
      "        + '\\n\\nContexte de l\\'entreprise : '",
      "        + contexte_entreprise",
      "        + '\\n\\nQuestion : '",
      "        + question",
      "        + '\\n\\nRéponds en français simple et propose un lien interne si nécessaire.'",
      "    )",
      "",
      "# prompt = build_prompt('Comment poser un congé ?', infos_intranet)",
      "# → ensuite envoyé au modèle d'IA",
    ],
  },
  sysadmin: {
    title: "Vérification de l’espace disque sur plusieurs machines",
    lines: [
      "#!/usr/bin/env bash",
      "",
      "for HOST in $(cat hosts.txt); do",
      "  echo \"=== $HOST ===\"",
      "  ssh \"$HOST\" \"df -h / | tail -1 | awk '{print $5}'\"",
      "done",
    ],
  },
  network: {
    title: "Contrôle de connectivité vers un serveur central",
    lines: [
      "import subprocess",
      "import datetime",
      "",
      "def check_reachability(host):",
      "    return subprocess.call(",
      "        ['ping', '-c', '1', host],",
      "        stdout=subprocess.DEVNULL",
      "    ) == 0",
      "",
      "def log_result(host, ok):",
      "    status = 'UP' if ok else 'DOWN'",
      "    with open('check_reseau.log', 'a') as f:",
      "        f.write(f\"{datetime.datetime.now()} {host} {status}\\n\")",
      "",
      "ok = check_reachability('10.0.0.1')",
      "log_result('10.0.0.1', ok)",
    ],
  },
  deploy: {
    title: "Script de pré-déploiement simple",
    lines: [
      "#!/usr/bin/env bash",
      "",
      "echo '1/ Tests unitaires...'",
      "npm test || { echo 'Tests en échec'; exit 1; }",
      "",
      "echo '2/ Build de l'application...'",
      "npm run build || { echo 'Build en échec'; exit 1; }",
      "",
      "echo '3/ Sauvegarde de la base...'",
      "pg_dump prod_db > backup.sql || { echo 'Backup en échec'; exit 1; }",
      "",
      "echo '4/ Déploiement...'",
      "rsync -avz ./build/ user@serveur:/var/www/app || exit 1",
      "",
      "echo '✅ Déploiement terminé avec succès'",
    ],
  },
  agile: {
    title: "Organisation d’un mini-sprint",
    lines: [
      "Sprint actuel : 2 semaines",
      "",
      "Colonne 'À faire' :",
      "- Implémenter le filtre de recherche du catalogue",
      "- Ajouter une page FAQ pour l'assistant d'onboarding",
      "",
      "Colonne 'En cours' :",
      "- Revoir l'UX du formulaire de connexion",
      "",
      "Colonne 'Terminé' :",
      "- Mise à jour de la page d'accueil",
      "- Correction des erreurs 500 sur /api/materiels",
    ],
  },
  git: {
    title: "Workflow Git pour une nouvelle feature",
    lines: [
      "# Récupérer les dernières modifications",
      "git pull origin main",
      "",
      "# Créer une branche dédiée",
      "git checkout -b feature/amelioration-filtre-catalogue",
      "",
      "# Travailler, committer régulièrement",
      "git commit -am \"Améliore le filtrage par statut dans le back-office\"",
      "",
      "# Pusher et ouvrir une PR",
      "git push origin feature/amelioration-filtre-catalogue",
      "# → création d'une pull request pour revue",
    ],
  },
  default: {
    title: "Exemple d’utilisation concrète",
    lines: [
      "// Petit extrait représentatif de ma façon d'utiliser cette compétence.",
    ],
  },
};
