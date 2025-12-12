"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";

import dynamic from "next/dynamic";

const BurgerMenu = dynamic(() => import("./components/BurgerMenu"), { ssr: false });

// ---------- Catégories & Compétences ----------

const skillCategories = [
  { key: "languages", label: "Langages & paradigmes" },
  { key: "web", label: "Web & Front" },
  { key: "data", label: "Data & IA" },
  { key: "infra", label: "Infra & réseaux" },
  { key: "methods", label: "Méthodes & outils" },
];

const skills = [
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

const skillDetails = {
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

// ---------- Expériences & logos ----------

const experiences = [
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

const companyLogos = {
  thales: { src: "/logos/thales.png", alt: "Thales" },
  es: { src: "/logos/es.png", alt: "Électricité de Strasbourg" },
  milla: { src: "/logos/milla-partner.png", alt: "Milla & Partner" },
  schertz: { src: "/logos/schertz.png", alt: "Groupe Schertz" },
};

// ---------- Ils m'ont fait confiance ----------

const trustedLogos = [
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

// ---------- Projets sélectionnés (case studies) ----------

const caseStudies = [
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
    category: "web",
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
    techs: ["C#", ".NET", "ASP.NET Core", "HTML/CSS", "SQL", "REST", "Git", "GitHub Actions", "Agile"],
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

const skillExamples = {
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

function EasterEggTerminal({ onClose }) {
  const eggLines = [
    "$ ping 127.0.0.1",
    "Réponse de 127.0.0.1 : temps=0ms  statut=✅ Profil détecté",
    "Réponse de 127.0.0.1 : temps=1ms  statut=✅ Curiosité confirmée",
    "Réponse de 127.0.0.1 : temps=2ms  statut=✅ Esprit technique validé",
    "",
    "Résumé : on devrait probablement discuter. 😉",
  ];

  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setVisibleLines((prev) => {
        if (i >= eggLines.length) return prev;
        return [...prev, eggLines[i++]];
      });
      if (i >= eggLines.length) {
        clearInterval(id);
      }
    }, 420);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[90vw] max-w-[320px] rounded-xl border border-emerald-400/60 bg-slate-950/95 shadow-2xl shadow-emerald-500/30 text-[11px] font-mono text-emerald-100">
      <div className="flex items-center justify-between border-b border-emerald-500/40 px-3 py-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-emerald-300">
          ping 127.0.0.1
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-2 py-[2px] text-[10px] text-emerald-200 hover:bg-emerald-500/10"
        >
          fermer
        </button>
      </div>
      <div className="px-3 py-2 space-y-[2px]">
        {visibleLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function EasterEggToast({ onHide }) {
  useEffect(() => {
    const id = setTimeout(onHide, 3800);
    return () => clearTimeout(id);
  }, [onHide]);

  return (
    <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-full border border-emerald-500/60 bg-slate-950/95 px-4 py-2 text-[11px] text-emerald-100 shadow-lg shadow-emerald-500/40 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <span className="font-semibold">Mode explorateur débloqué.</span>{" "}
          Un petit terminal vous attend en bas à gauche. 👀
        </span>
      </div>
    </div>
  );
}

// ---------- Konami Game Overlay ----------

function KonamiGameOverlay() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState("idle"); // idle | running | won | lost
  const [playerLane, setPlayerLane] = useState(1); // 0 / 1 / 2
  const [items, setItems] = useState([]); // { id, lane, y, type }
  const [reliability, setReliability] = useState(100);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25); // secondes

  const bufferRef = useRef([]);
  const animRef = useRef(null);

  const lanes = [20, 50, 80]; // positions (en %) pour gauche / centre / droite

  const resetGame = () => {
    setPlayerLane(1);
    setItems([]);
    setReliability(100);
    setScore(0);
    setTimeLeft(25);
    setMode("running");
  };

  const closeGame = () => {
    setActive(false);
    setMode("idle");
    setItems([]);
  };

  // Détection du Konami code + contrôles clavier
  useEffect(() => {
    if (typeof window === "undefined") return;

    const konami = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    const handleKeyDown = (e) => {
      const key = e.key;

      // Déplacement dans le jeu
      if (active && mode === "running") {
        if (key === "ArrowLeft" || key === "a" || key === "A") {
          setPlayerLane((prev) => Math.max(0, prev - 1));
        } else if (key === "ArrowRight" || key === "d" || key === "D") {
          setPlayerLane((prev) => Math.min(2, prev + 1));
        } else if (key === "Escape") {
          closeGame();
          return;
        }
      }

      // Buffer pour le Konami
      bufferRef.current = [...bufferRef.current, key].slice(-konami.length);
      const ok =
        bufferRef.current.length === konami.length &&
        konami.every(
          (k, i) =>
            k.toLowerCase() === (bufferRef.current[i] || "").toLowerCase()
        );

      // Activation du jeu
      if (!active && ok) {
        setActive(true);
        resetGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, mode]);

  // Boucle d'animation du runner
  useEffect(() => {
    if (!active || mode !== "running") return;

    let lastTime;
    let spawnTimer = 0;
    const spawnEvery = 0.8; // fréquence de spawn des éléments

    const loop = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      // Spawn de nouveaux items (compétences / obstacles)
      spawnTimer += delta;
      if (spawnTimer >= spawnEvery) {
        spawnTimer = 0;
        setItems((prev) => {
          const lane = Math.floor(Math.random() * 3);
          const isSkill = Math.random() < 0.55;
          const newItem = {
            id: Math.random().toString(36).slice(2),
            lane,
            y: -10,
            type: isSkill ? "skill" : "obstacle",
          };
          return [...prev, newItem];
        });
      }

      // Mouvement + collisions
      setItems((prev) => {
        const updated = [];
        let localReliability = reliability;
        let localScore = score;

        for (const item of prev) {
          const newY = item.y + delta * 45; // vitesse de descente
          if (newY > 120) continue; // en dehors de l'écran

          const collided =
            newY > 70 && newY < 88 && item.lane === playerLane;

          if (collided) {
            if (item.type === "skill") {
              localScore += 10;
              localReliability = Math.min(100, localReliability + 5);
            } else {
              localReliability = Math.max(0, localReliability - 20);
            }
            continue; // on ne garde pas l'item
          }

          updated.push({ ...item, y: newY });
        }

        if (localReliability !== reliability) {
          setReliability(localReliability);
        }
        if (localScore !== score) {
          setScore(localScore);
        }
        if (localReliability <= 0 && mode === "running") {
          setMode("lost");
        }

        return updated;
      });

      // Timer
      setTimeLeft((prev) => {
        const next = Math.max(prev - delta, 0);
        if (next === 0 && mode === "running") {
          setMode("won");
        }
        return next;
      });

      if (active && mode === "running") {
        animRef.current = requestAnimationFrame(loop);
      }
    };

    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active, mode, playerLane, reliability, score]);

  if (!active) return null;

  const roundedReliability = Math.round(reliability);
  const roundedTime = Math.ceil(timeLeft);

  const modeLabel =
    mode === "running"
      ? "Mission en cours : atteignez le serveur sans perdre votre paquet."
      : mode === "won"
      ? "Mission réussie : serveur de production atteint ✅"
      : "Packet dropped : trop d'incidents sur le chemin ❌";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.28),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.25),_transparent_55%)] pointer-events-none" />

      <div className="relative w-full max-w-xl aspect-[9/16] rounded-3xl border border-cyan-500/50 bg-slate-950/95 shadow-[0_0_50px_rgba(8,47,73,0.9)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
              Packet Runner
            </p>
            <p className="text-xs text-slate-300">
              Network Mission · Konami mode
            </p>
          </div>
          <button
            type="button"
            onClick={closeGame}
            className="rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
          >
            Fermer
          </button>
        </div>

        {/* HUD */}
        <div className="px-4 pt-3 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Fiabilité
            </span>
            <div className="w-40 h-2 rounded-full bg-slate-900 ring-1 ring-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-400 transition-all"
                style={{ width: `${roundedReliability}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400">
              {roundedReliability}% – stabilité du trajet
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Score
            </span>
            <span className="text-lg font-semibold text-slate-50">
              {score}
              <span className="ml-1 text-[10px] text-slate-400">pts</span>
            </span>
            <span className="text-[10px] text-slate-400">
              Temps restant :{" "}
              <span className="text-cyan-300">{roundedTime}s</span>
            </span>
          </div>
        </div>

        {/* Zone de jeu */}
        <div className="relative mt-3 mx-3 h-[72%] rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 overflow-hidden">
          {/* Grille réseau animée */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_55%)]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,_rgba(15,23,42,0.2)_0px,_rgba(15,23,42,0.2)_1px,_rgba(15,23,42,0)_20px)] animate-[scroll-grid_12s_linear_infinite]" />
          </div>

          {/* Lignes de "voies" */}
          <div className="absolute inset-0 flex justify-between px-6">
            {lanes.map((_, index) => (
              <div
                key={index}
                className="h-full w-px bg-slate-700/40 border-l border-slate-900/80"
              />
            ))}
          </div>

          {/* Joueur (paquet) */}
          <div
            className="absolute bottom-6 h-10 w-10 rounded-2xl border border-cyan-400/80 bg-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.8)] flex items-center justify-center text-[10px] font-semibold text-cyan-300 transition-transform duration-150"
            style={{
              left: `${lanes[playerLane]}%`,
              transform: "translateX(-50%)",
            }}
          >
            <span className="block text-[9px] uppercase tracking-[0.18em]">
              pkt
            </span>
          </div>

          {/* Items (compétences / obstacles) */}
          {items.map((item) => {
            const isSkill = item.type === "skill";
            const label = isSkill ? "Skill +" : "Err";

            const bgClass = isSkill
              ? "bg-emerald-500/20 border-emerald-400/70 text-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.8)]"
              : "bg-red-500/10 border-red-400/70 text-red-200 shadow-[0_0_14px_rgba(248,113,113,0.8)]";

            return (
              <div
                key={item.id}
                className={`absolute h-8 px-3 rounded-2xl border text-[10px] flex items-center justify-center font-semibold ${bgClass}`}
                style={{
                  left: `${lanes[item.lane]}%`,
                  transform: "translateX(-50%)",
                  top: `${item.y}%`,
                }}
              >
                {isSkill ? (
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span>Py / JS / Net / IA</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
                    <span>Bug / 500 / Timeout</span>
                  </span>
                )}
              </div>
            );
          })}

          {/* Légende en bas */}
          <div className="absolute inset-x-0 bottom-1 px-3 flex items-center justify-between text-[10px] text-slate-400 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent pt-4 pb-1">
            <span>
              ← → / A D : déplacer le paquet · Évitez le rouge, prenez le vert.
            </span>
            <span className="text-cyan-300/80">Esc : fermer</span>
          </div>
        </div>

        {/* Texte d'ambiance */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/90">
          <p className="text-[11px] text-slate-300">{modeLabel}</p>
          {mode !== "running" && (
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
              <p>
                Si vous êtes arrivé jusque là, on devrait probablement discuter
                d&apos;un projet ensemble.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetGame}
                  className="rounded-full border border-cyan-500/70 bg-cyan-500/10 px-3 py-1 text-[10px] text-cyan-100 hover:bg-cyan-500/20 transition"
                >
                  Rejouer
                </button>
                <button
                  type="button"
                  onClick={closeGame}
                  className="rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1 text-[10px] text-slate-200 hover:border-cyan-400 hover:text-cyan-200 transition"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-grid {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(40px);
          }
        }
      `}</style>
    </div>
  );
}



// ---------- Hook pour animer les chiffres ----------

function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.round(start + (target - start) * progress);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return value;
}

// ---------- Page principale ----------

export default function Home() {
  // Animations au scroll
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => {
      el.classList.add(
        "opacity-0",
        "translate-y-4",
        "transition-all",
        "duration-700"
      );
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 90;
    const rect = el.getBoundingClientRect();
    const offset = rect.top + window.scrollY - headerOffset;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  // États
  const [recruiterMode, setRecruiterMode] = useState(false);
const [selectedCategory, setSelectedCategory] = useState("languages");
const [selectedSkillKey, setSelectedSkillKey] = useState("python");

const [photoClicks, setPhotoClicks] = useState(0);
const [showEasterEgg, setShowEasterEgg] = useState(false); // egg débloqué ?
const easterEggTimeoutRef = useRef();
const [easterEggTerminalOpen, setEasterEggTerminalOpen] = useState(false); // terminal visible ?
const [devMode, setDevMode] = useState(false); // mode développeur
const [showEggToast, setShowEggToast] = useState(false); // petit toast

const [highlightedExp, setHighlightedExp] = useState(null);
const [activeSection, setActiveSection] = useState("about");
const [showScrollTop, setShowScrollTop] = useState(false);
const [activeHeroTab, setActiveHeroTab] = useState("thales");
const [selectedProjectKey, setSelectedProjectKey] = useState("thales");
const [projectFilter, setProjectFilter] = useState("all");

  

  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Scrollspy
  useEffect(() => {
    const sectionIds = [
      "about",
      "experience",
      "trusted",
      "stats",
      "projects",
      "skills",
      "contact",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible && visible.target && visible.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: 0.4 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [recruiterMode]);

  // Nav underline fluide
  useEffect(() => {
    const updateIndicator = () => {
      const navEl = navRef.current;
      if (!navEl) return;

      const activeButton = navEl.querySelector(
        `[data-section="${activeSection}"]`
      );

      if (!activeButton) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const navRect = navEl.getBoundingClientRect();
      const btnRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: btnRect.left - navRect.left,
        width: btnRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection, recruiterMode]);

  // Bouton retour en haut
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    // Restaure l'easter egg si déjà débloqué
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const unlocked = window.localStorage.getItem("egg_unlocked");
      if (unlocked === "1") {
        // Utiliser setTimeout pour éviter setState synchrone dans effect
        setTimeout(() => setShowEasterEgg(true), 0);
      }
    } catch {
      // pas grave si le localStorage n'est pas dispo
    }
  }, []);


  


  // Scroll vers une expérience
  const scrollToExperience = (expKey) => {
    const el = document.getElementById(expKey);
    if (!el) return;
    const headerOffset = 90;
    const rect = el.getBoundingClientRect();
    const offset = rect.top + window.scrollY - headerOffset - 16;
    window.scrollTo({ top: offset, behavior: "smooth" });

    setHighlightedExp(expKey);
    setTimeout(() => setHighlightedExp(null), 1400);
  };

  // Depuis un tag de compétence dans une expérience -> scroll vers Compétences
  const focusSkillFromExperienceTag = (skillKey) => {
    const skillMeta = skills.find((s) => s.key === skillKey);
    if (!skillMeta) return;
    setSelectedCategory(skillMeta.category);
    setSelectedSkillKey(skillMeta.key);
    scrollToSection("skills");
  };

  // Cas concrets mis en avant dans le hero
  const heroTabs = [
    { key: "thales", label: "Thales" },
    { key: "es", label: "ÉS" },
    { key: "milla", label: "Milla & Partner" },
  ];

  const activeHeroExperience =
    experiences.find((e) => e.key === activeHeroTab) || experiences[0];

  const heroImpactByKey = {
    thales:
      "Une interface de configuration réseau plus claire pour les équipes, avec un code modernisé et plus simple à maintenir.",
    es: "Un back-office de catalogue matériel plus fluide pour les équipes internes, avec des formulaires adaptés à leur quotidien.",
    milla:
      "Un assistant d'onboarding basé sur l'IA qui répond aux questions des nouveaux arrivants sans monopoliser les équipes RH.",
  };

  const heroImpactText =
    heroImpactByKey[activeHeroTab] || heroImpactByKey.thales;

  // Chiffres animés (impact + stats)
  const toolsInProd = useCountUp(4, 900);
  const infraDevices = useCountUp(600, 900);
  const usersImpacted = useCountUp(120, 900);
  const experienceMonths = useCountUp(22, 900);

  const schoolRate = useCountUp(80, 900);
  const personalRate = useCountUp(90, 900);
  const stageRate = useCountUp(95, 900);
  const goalRate = useCountUp(98, 900);
  const reliability = useCountUp(92, 900);

  // Stats pour la section "Ils m'ont fait confiance"
  const contractTypesSet = new Set();
  const countriesSet = new Set();
  experiences.forEach((exp) => {
    const badges = [];
    if (exp.title.includes("Stage de fin d'études")) {
      badges.push("Stage de fin d'études");
    } else if (exp.title.includes("Stage à l'étranger")) {
      badges.push("Stage à l'étranger");
    } else if (exp.title.includes("Stage")) {
      badges.push("Stage");
    }
    if (exp.title.includes("CDD")) {
      badges.push("CDD");
    }
    if (exp.key === "es" && !badges.includes("Stage")) {
      badges.push("Stage");
    }
    badges.forEach((b) => contractTypesSet.add(b));

    if (exp.place.includes("Stuttgart")) {
      countriesSet.add("Allemagne");
    } else {
      countriesSet.add("France");
    }
  });

  const trustStats = {
    companies: experiences.length,
    contractTypes: contractTypesSet.size,
    countries: countriesSet.size,
  };

  // Formulaire contact
  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") || "").toString();
    const email = (formData.get("email") || "").toString();
    const message = (formData.get("message") || "").toString();

    const subject = encodeURIComponent(
      `Contact portfolio - ${name || "sans nom"}`
    );
    const bodyLines = [
      `Nom : ${name}`,
      `Email : ${email}`,
      "",
      message || "(Pas de message saisi)",
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:paul.claus@viacesi.fr?subject=${subject}&body=${body}`;
    form.reset();
  };

  const handlePhotoClick = () => {
  setPhotoClicks((prev) => {
    const next = prev + 1;

    if (!showEasterEgg && next >= 3) {
      setShowEasterEgg(true);
      setEasterEggTerminalOpen(true);
      // Ferme l'easter egg après 8s
      clearTimeout(easterEggTimeoutRef.current);
      easterEggTimeoutRef.current = setTimeout(() => setShowEasterEgg(false), 8000);
      setShowEggToast(true);

      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("egg_unlocked", "1");
        }
      } catch {
        // ignore
      }
    }

    return next;
  });
};


  // Mode recruteur : seulement 2 expériences
  const visibleExperiences = recruiterMode ? experiences.slice(0, 2) : experiences;

  // Gestion compétences
  const filteredSkills = skills.filter((s) => s.category === selectedCategory);
  const currentSkillDetail =
    skillDetails[selectedSkillKey] ||
    skillDetails[filteredSkills[0] && filteredSkills[0].key] ||
    Object.values(skillDetails)[0];

  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey);
    const firstInCat = skills.find((s) => s.category === catKey);
    if (firstInCat) {
      setSelectedSkillKey(firstInCat.key);
    }
  };

  const handleSkillSelect = (key) => {
    setSelectedSkillKey(key);
  };

  const currentSkillMeta = skills.find((s) => s.key === selectedSkillKey);
  const currentSkillLabel = currentSkillMeta
    ? currentSkillMeta.label
    : currentSkillDetail.title;

  const levelColor =
    {
      prod: "bg-emerald-500/10 text-emerald-200 border-emerald-400/70",
      projet: "bg-sky-500/10 text-sky-200 border-sky-400/70",
      en_cours: "bg-slate-700/40 text-slate-200 border-slate-500/80",
    }[currentSkillDetail.level || "projet"] || "";

  const example = skillExamples[selectedSkillKey] || skillExamples.default;

  const navButtonClass = (sectionId) => {
    const isActive = activeSection === sectionId;
    return (
      "relative px-1.5 py-1 transition-colors cursor-pointer " +
      (isActive ? "text-cyan-300" : "text-slate-200 hover:text-cyan-400")
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Styles custom */}
      <style>{`
        * {
          scroll-behavior: smooth;
        }

        .stat-bar {
          transform-origin: bottom;
          transform: scaleY(0);
          animation: bar-grow 1s ease-out forwards;
        }

        @keyframes bar-grow {
          to {
            transform: scaleY(1);
          }
        }

        .donut-anim {
          animation: donut-spin 16s linear infinite;
        }

        @keyframes donut-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .scroll-top-pulse {
          animation: scroll-top-pulse 2.4s ease-in-out infinite;
        }

        @keyframes scroll-top-pulse {
          0%, 100% {
            box-shadow: 0 12px 30px rgba(56, 189, 248, 0.35);
          }
          50% {
            box-shadow: 0 18px 40px rgba(56, 189, 248, 0.65);
          }
        }

        .nav-indicator {
          background: linear-gradient(
            90deg,
            #22d3ee,
            #38bdf8,
            #a855f7,
            #22d3ee
          );
          background-size: 220% 100%;
          box-shadow:
            0 0 0 1px rgba(15, 23, 42, 0.9),
            0 0 16px rgba(56, 189, 248, 0.75);
          animation: nav-indicator-move 3s linear infinite;
        }

        @keyframes nav-indicator-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#38bdf8_0,_transparent_45%),radial-gradient(circle_at_bottom,_#4f46e5_0,_#020617_55%)] opacity-60" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 border-b border-slate-900/70 bg-gradient-to-b from-slate-950/95 to-slate-950/80 backdrop-blur-xl transition-all duration-300 md:sticky md:left-auto md:w-auto">
        <div className="px-4 sm:px-8 lg:px-16 xl:px-24 py-3 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-105"
          >
            {/* Logo en haut à gauche */}
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500/40 via-sky-500/10 to-transparent blur-[7px] opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-10 w-10 rounded-xl bg-slate-950 ring-1 ring-slate-700 shadow-sm shadow-black/40 overflow-hidden group-hover:ring-cyan-500 transition-all">
                <Image
                  src="/logos/logo_site.png"
                  alt="Logo Paul Claus"
                  fill
                  className="object-contain p-1.5"
                  sizes="40px"
                />
              </div>
            </div>

            <div className="leading-tight group-hover:text-cyan-300 transition-colors">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 group-hover:text-cyan-300 transition-colors">
                Paul Claus
              </p>
              <p className="text-[11px] text-slate-400 group-hover:text-cyan-400 transition-colors">
                Ingénieur informatique junior
              </p>
            </div>
          </button>

          {/* Burger menu mobile */}
          <div className="flex md:hidden">
            <BurgerMenu
              navLinks={[
                { id: "about", label: "À propos", onClick: () => scrollToSection("about") },
                { id: "experience", label: "Expériences", onClick: () => scrollToSection("experience") },
                ...(!recruiterMode ? [{ id: "trusted", label: "Références", onClick: () => scrollToSection("trusted") }] : []),
                ...(!recruiterMode ? [{ id: "projects", label: "Projets", onClick: () => scrollToSection("projects") }] : []),
                { id: "skills", label: "Compétences", onClick: () => scrollToSection("skills") },
                { id: "contact", label: "Contact", onClick: () => scrollToSection("contact") },
                { id: "linkedin", label: "LinkedIn", onClick: () => window.open("https://www.linkedin.com/in/paul-claus/", "_blank") },
                { id: "github", label: "GitHub", onClick: () => window.open("https://github.com/Paulclaus67", "_blank") },
                { id: "mode", label: recruiterMode ? "Standard" : "Recruteur pressé", onClick: () => setRecruiterMode((m) => !m) },
              ]}
            />
          </div>
          {/* Navbar desktop */}
          <nav className="hidden items-center gap-6 text-[13px] md:flex">
            <div ref={navRef} className="relative flex items-center gap-6">
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                data-section="about"
                className={navButtonClass("about")}
              >
                À propos
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("experience")}
                data-section="experience"
                className={navButtonClass("experience")}
              >
                Expériences
              </button>
              {!recruiterMode && (
                <button
                  type="button"
                  onClick={() => scrollToSection("trusted")}
                  data-section="trusted"
                  className={navButtonClass("trusted")}
                >
                  Références
                </button>
              )}
              {!recruiterMode && (
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  data-section="projects"
                  className={navButtonClass("projects")}
                >
                  Projets
                </button>
              )}
              <button
                type="button"
                onClick={() => scrollToSection("skills")}
                data-section="skills"
                className={navButtonClass("skills")}
              >
                Compétences
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                data-section="contact"
                className={navButtonClass("contact")}
              >
                Contact
              </button>

              <div
                className="nav-indicator pointer-events-none absolute -bottom-2 h-[2px] rounded-full"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                  transform: "translateZ(0)",
                  transition:
                    "left 260ms cubic-bezier(0.4,0,0.2,1), width 260ms cubic-bezier(0.4,0,0.2,1), opacity 180ms ease-out",
                }}
              />
            </div>

            <div className="h-5 w-px bg-slate-700/70" />
            


            <button
              type="button"
              onClick={() => setRecruiterMode((m) => !m)}
              className={`relative flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] border transition-all cursor-pointer ${
                recruiterMode
                  ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-200 shadow-sm shadow-emerald-500/30"
                  : "border-slate-700 bg-slate-900/80 text-slate-300"
              }`}
            >
              <span className="hidden lg:inline text-[10px] tracking-[0.16em] uppercase text-slate-400">
                Mode
              </span>
              <span className={recruiterMode ? "opacity-60 line-through" : ""}>
                Standard
              </span>
              <span>·</span>
              <span className={recruiterMode ? "font-semibold" : "opacity-80"}>
                Recruteur pressé
              </span>
            </button>

            <div className="h-5 w-px bg-slate-700/70" />

            <a
              href="https://www.linkedin.com/in/paul-claus/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-sky-400 ring-1 ring-sky-500/40 hover:bg-sky-500 hover:text-slate-950 hover:ring-sky-400 transition-all cursor-pointer"
            >
              <span className="relative h-4 w-4">
                <Image
                  src="/logos/linkedin.png"
                  alt="LinkedIn"
                  fill
                  className="object-contain"
                  sizes="16px"
                />
              </span>
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/Paulclaus67"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-slate-600 hover:bg-slate-100 hover:text-slate-950 transition-all cursor-pointer"
            >
              <span className="relative h-4 w-4">
                <Image
                  src="/logos/github.png"
                  alt="GitHub"
                  fill
                  className="object-contain"
                  sizes="16px"
                />
              </span>
              <span>GitHub</span>
            </a>
          </nav>
        </div>

        {recruiterMode && (
          <div className="border-t border-emerald-500/40 bg-emerald-500/10 text-[12px] text-emerald-100 text-center py-2">
            <span className="font-medium">Mode recruteur pressé activé :</span>{" "}
            résumé des points clés en 2 minutes (sections allégées, expériences
            principales, compétences synthétiques).
          </div>
        )}
      </header>

      {/* CONTENU */}
      <div className="min-h-[calc(100vh-3rem)] w-full max-w-[100vw] px-4 sm:px-8 lg:px-16 xl:px-24 pt-20 md:pt-10 pb-16 flex flex-col space-y-24">
        {/* HERO */}
        <section id="about" className="flex-1 w-full">
          <div className="flex flex-col lg:grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
            {/* Colonne gauche : message principal */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/70 px-3.5 py-1.5 text-[12px] font-medium text-slate-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ingénieur informatique junior · Réseau · Web · Applications métier · IA générative
              </div>


              <h1 className="mt-6 text-[2.6rem] leading-tight font-semibold tracking-tight sm:text-[3rem] xl:text-[3.5rem]">
              Je conçois des{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-purple-500 bg-clip-text text-transparent">
                interfaces propres,
              </span>{" "}
              des{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                outils web utiles
              </span>{" "}
              et je développe des{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                applications métier solides
              </span>{" "}
              
            </h1>


              <p className="mt-4 max-w-2xl text-[15px] text-slate-200 leading-relaxed">
                En pratique : je prends un besoin métier parfois flou
                (configuration réseau, back-office, onboarding, tâches répétitives)
                et je le transforme en un outil concret : interface web,
                script Python ou petite application métier en C#/Python que vos équipes peuvent
                réellement utiliser au quotidien.
              </p>


              {/* 3 points clés orientés entreprise */}
              <ul className="mt-5 space-y-2 text-[13px] text-slate-200">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Interfaces réseau plus compréhensibles pour les équipes terrain (Thales, Python / PySide6).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Back-offices web en production pour les équipes internes (Électricité de Strasbourg : JS, PHP, SQL).
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>
                    Scripts et petites applications métier en Python (et bases solides en C#)
                    pour automatiser des tâches et fiabiliser les process internes.
                  </span>
                </li>
              </ul>


              {/* CTA / actions */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="rounded-full bg-slate-50 px-7 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-slate-50/20 transition hover:-translate-y-0.5 hover:bg-slate-200 cursor-pointer"
                >
                  Voir 5 cas concrets en 90 secondes
                </button>
                <a
                  href="/Paul_Claus_CV.pdf"
                  target="_blank"
                  className="rounded-full border border-slate-500/80 px-7 py-3 text-sm font-medium text-slate-100 backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  Télécharger mon CV
                </a>
                <button
                  type="button"
                  onClick={() => setRecruiterMode((m) => !m)}
                  className="text-[12px] text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline cursor-pointer"
                >
                  {recruiterMode
                    ? "Revenir en mode standard"
                    : "Activer le mode recruteur pressé"}
                </button>
              </div>

              {/* Mini stats compactes */}
              <div className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-full border border-slate-800 bg-slate-950/80 px-4 py-2 text-[11px] text-slate-300">
                <span className="font-medium text-slate-100">
                  {infraDevices}+ postes sécurisés
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-700" />
                <span>3 domaines : réseau, web, IA générative</span>
                <span className="h-1 w-1 rounded-full bg-slate-700" />
                <span className="font-medium text-slate-100">
                  {toolsInProd}+ outils livrés en production
                </span>
              </div>

              {/* Logos de confiance */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                <span className="uppercase tracking-[0.18em] text-slate-500">
                  Ils m&apos;ont déjà fait confiance
                </span>

                <div className="flex flex-wrap gap-2">
                  {trustedLogos.map((logo) => (
                    <a
                      key={logo.name}
                      href={logo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-2.5 py-1 ring-1 ring-slate-700/80 hover:ring-cyan-500/80 hover:bg-slate-800 transition cursor-pointer"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm shadow-black/30 overflow-hidden">
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={18}
                          height={18}
                          className="object-contain"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </span>
                      <span className="hidden sm:inline text-[11px] text-slate-300 group-hover:text-cyan-200">
                        {logo.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : carte cas concrets + photo */}
            <div className="relative" data-animate>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-cyan-500/40 via-sky-500/20 to-purple-500/30 blur-2xl" />

              {/* Carte cas concret */}
              <div className="relative rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-black/50 backdrop-blur overflow-hidden">
                <div className="flex items-start justify-between gap-3 pr-20">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Cas concret
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-50">
                      {activeHeroExperience.title}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {activeHeroExperience.place}
                    </p>
                  </div>

                  {/* Onglets entreprises */}
                  <div className="flex flex-col items-end gap-1 text-[11px]">
                    <span className="text-slate-500 text-[10px] uppercase tracking-[0.16em]">
                      Contextes
                    </span>
                    <div className="flex gap-1.5">
                      {heroTabs.map((tab) => {
                        const active = tab.key === activeHeroTab;
                        return (
                          <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveHeroTab(tab.key)}
                            className={
                              "rounded-full px-2.5 py-1 border text-[11px] transition-all cursor-pointer " +
                              (active
                                ? "border-cyan-400 bg-cyan-500/15 text-cyan-100 shadow-sm shadow-cyan-500/40"
                                : "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-cyan-400 hover:text-cyan-200")
                            }
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[13px] text-slate-200 leading-relaxed">
                  {activeHeroExperience.shortDesc ||
                    activeHeroExperience.desc}
                </p>

                {/* Bloc impact clé */}
                <div className="mt-4 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-3 text-[12px] text-emerald-100">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
                    Impact clé
                  </p>
                  <p className="mt-1">{heroImpactText}</p>
                </div>

                {/* Tags compétences principaux */}
                {activeHeroExperience.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
                    {activeHeroExperience.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag.label}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-[4px] text-slate-200"
                      >
                        <span className="h-1 w-1 rounded-full bg-slate-500" />
                        <span>{tag.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {showEasterEgg && (
  <div className="mt-3 rounded-xl border border-emerald-500/50 bg-emerald-500/5 px-3 py-2 text-[10px] text-emerald-200 flex flex-col gap-1 relative animate-fade-in">
    <button
      className="absolute top-1 right-2 text-emerald-300/80 hover:text-emerald-400 text-xs font-bold px-1 rounded transition"
      aria-label="Fermer"
      onClick={() => setShowEasterEgg(false)}
      tabIndex={0}
    >✕</button>
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="font-semibold">
        Vous avez trouvé l&apos;easter egg 🎉
      </span>
    </div>
    <p>
      Pendant un entretien, glissez simplement :{" "}
      <span className="font-mono text-[10px] bg-slate-900/80 px-1.5 py-[1px] rounded">
        ping 127.0.0.1
      </span>{" "}
      et on saura qu&apos;on parle le même langage.
    </p>
    <p className="text-[9px] text-emerald-300/80">
      Tip : un mini terminal en bas à gauche vous en dira un peu plus.
    </p>
  </div>
)}

              </div>

              {/* Photo flottante */}
              <div
                className="absolute -top-10 right-6 h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-[3px] border-cyan-400/80 bg-slate-950 shadow-lg shadow-cyan-500/40 cursor-pointer"
                onClick={handlePhotoClick}
                title="Cliquez plusieurs fois pour voir…"
              >
                <Image
                  src="/Paul_PDP.jpg"
                  alt="Photo de Paul Claus"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
          </div>

          {/* Bloc "En 30 secondes" */}
          <div
            className="mt-16 md:mt-20 lg:mt-24 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-[13px] text-slate-200"
            data-animate
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  En 30 secondes
                </p>
                <p className="mt-1 text-sm font-medium text-slate-100">
                  Ce que vous devez retenir de mon profil
                </p>
              </div>
              {recruiterMode && (
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300 border border-emerald-500/50">
                  Résumé express pour recruteur ⚡
                </span>
              )}
            </div>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-3 items-start">
                <span className="mt-[2px] h-5 w-5 shrink-0 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300">
                  1
                </span>
                <p>
                  J&apos;ai déjà livré des outils{" "}
                  <span className="text-slate-50 font-medium">
                    réellement utilisés
                  </span>{" "}
                  (Thales, Électricité de Strasbourg, projets internes).
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-[2px] h-5 w-5 shrink-0 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300">
                  2
                </span>
                <p>
                  Je sais naviguer entre{" "}
                  <span className="text-slate-50 font-medium">
                    réseau, web, IA générative et développement d&apos;applications
                  </span>{" "}
                  (Python, C#, JavaScript) pour transformer un besoin métier en outil concret.
                </p>
              </li>

              <li className="flex gap-3 items-start">
                <span className="mt-[2px] h-5 w-5 shrink-0 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-slate-300">
                  3
                </span>
                <p>
                  Je cherche un{" "}
                  <span className="text-slate-50 font-medium">
                    premier poste où apprendre vite
                  </span>{" "}
                  et prendre des responsabilités sur des sujets concrets.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* EXPÉRIENCES RÉCENTES */}
        <section
          id="experience"
          className="border-t border-slate-800/80 pt-16"
          data-animate
        >
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-10 bg-cyan-500/70 hidden sm:block" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Parcours
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold">
                Expériences récentes
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Les contextes où j&apos;ai déjà contribué.
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col lg:grid gap-6 lg:grid-cols-2">
            {visibleExperiences.map((exp) => {
              const isHighlighted = highlightedExp === exp.key;
              const description = recruiterMode ? exp.shortDesc : exp.desc;

              return (
                <article
                  key={exp.key}
                  id={exp.key}
                  className={`group rounded-2xl bg-slate-950/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/90 ${
                    isHighlighted
                      ? "border border-cyan-400 shadow-[0_0_0_1px_rgba(34,211,238,0.7)]"
                      : "border border-slate-800 hover:border-cyan-500/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 shadow-sm shadow-black/30">
                        <Image
                          src={exp.logo}
                          alt={exp.alt}
                          width={48}
                          height={48}
                          className="h-10 w-10 object-contain"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-slate-50">
                          {exp.title}
                        </h3>
                        <p className="text-[12px] text-slate-500">
                          {exp.place}
                        </p>
                      </div>
                    </a>
                  </div>
                  <p className="mt-3 text-[13px] text-slate-300 leading-relaxed">
                    {description}
                  </p>

                  {exp.tags && (
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                      {exp.tags.map((tag) => {
                        const active =
                          tag.skillKey && tag.skillKey === selectedSkillKey;
                        const clickable = Boolean(tag.skillKey);

                        const baseClasses =
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-[4px] border transition cursor-pointer";
                        const inactiveClasses =
                          "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-cyan-400/80 hover:text-cyan-200";
                        const activeClasses =
                          "border-cyan-400 bg-cyan-500/10 text-cyan-200";

                        if (clickable) {
                          return (
                            <button
                              key={tag.label}
                              type="button"
                              onClick={() =>
                                focusSkillFromExperienceTag(tag.skillKey)
                              }
                              className={
                                baseClasses +
                                " " +
                                (active ? activeClasses : inactiveClasses)
                              }
                              title="Voir la compétence associée"
                            >
                              <span className="h-1 w-1 rounded-full bg-current" />
                              <span>{tag.label}</span>
                              <span className="text-[9px] opacity-70">★</span>
                            </button>
                          );
                        }

                        return (
                          <span
                            key={tag.label}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-[4px] text-slate-300"
                          >
                            <span className="h-1 w-1 rounded-full bg-slate-500" />
                            <span>{tag.label}</span>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {recruiterMode && (
            <p className="mt-4 text-[12px] text-slate-400">
              Mode recruteur : les expériences les plus récentes sont mises en
              avant. Passez en mode standard pour voir l&apos;ensemble du
              parcours détaillé.
            </p>
          )}
        </section>

        {/* ILS M'ONT FAIT CONFIANCE */}
        {!recruiterMode && (
          <section
            id="trusted"
            className="border-t border-slate-800/80 pt-16"
            data-animate
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-cyan-500/70 hidden sm:block" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Confiance
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Ils m&apos;ont fait confiance
                </h2>
                <p className="mt-1 text-sm text-slate-300 max-w-2xl">
                  Une vue très rapide des environnements qui m&apos;ont confié
                  des missions concrètes : types de contrats et pays.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 lg:p-6 shadow-sm shadow-black/40">
              {/* Résumé chiffré */}
              <div className="flex flex-col sm:grid gap-4 sm:grid-cols-3 text-[12px]">
                <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Entreprises
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-50">
                    {trustStats.companies}
                  </p>
                  <p className="mt-1 text-slate-300">
                    Thales, Milla &amp; Partner, Électricité de Strasbourg,
                    Groupe Schertz.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Types de contrats
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-50">
                    {trustStats.contractTypes}
                  </p>
                  <p className="mt-1 text-slate-300">
                    Stages (France & étranger), stage de fin d&apos;études,
                    CDD.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Pays
                  </p>
                  <p className="mt-1 text-xl font-semibold text-slate-50">
                    {trustStats.countries}
                  </p>
                  <p className="mt-1 text-slate-300">
                    France & Allemagne (stage à Stuttgart).
                  </p>
                </div>
              </div>

              {/* Cartes cliquables */}
              <div className="mt-6 flex flex-wrap gap-4 items-stretch">
                {experiences.map((exp) => {
                  const companyName = exp.place.split("·")[0].trim();

                  const badges = [];
                  if (exp.title.includes("Stage de fin d'études")) {
                    badges.push("Stage de fin d'études");
                  } else if (exp.title.includes("Stage à l'étranger")) {
                    badges.push("Stage à l'étranger");
                  } else if (exp.title.includes("Stage")) {
                    badges.push("Stage");
                  }
                  if (exp.title.includes("CDD")) {
                    badges.push("CDD");
                  }
                  if (exp.key === "es" && !badges.includes("Stage")) {
                    badges.push("Stage");
                  }

                  return (
                    <button
                      key={`trusted-${exp.key}`}
                      type="button"
                      onClick={() => scrollToExperience(exp.key)}
                      className="group flex-1 min-w-[180px] sm:min-w-[220px] max-w-xs rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-left hover:border-cyan-500/70 hover:bg-slate-900/90 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200 shadow-sm shadow-black/20">
                          <Image
                            src={exp.logo}
                            alt={exp.alt}
                            width={40}
                            height={40}
                            className="h-8 w-8 object-contain"
                            style={{ width: 'auto', height: 'auto' }}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-semibold text-slate-50">
                            {companyName}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {exp.place.split("·")[1]?.trim() || ""}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                        {badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2 py-[3px] text-slate-200"
                          >
                            <span className="h-1 w-1 rounded-full bg-slate-400" />
                            <span>{badge}</span>
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <span className="h-1 w-1 rounded-full bg-cyan-400" />
                          <span>Voir le détail plus haut</span>
                        </span>
                        <span className="text-[12px] text-cyan-300 group-hover:translate-y-[-1px] transition-transform">
                          ↑
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-[11px] text-slate-400">
                Cliquez sur une entreprise pour remonter à l&apos;expérience
                correspondante. Cette section sert de résumé visuel, tandis que
                le détail se trouve dans{" "}
                <span className="text-slate-200 font-medium">
                  Expériences récentes
                </span>
                .
              </p>
            </div>
          </section>
        )}

        {/* IMPACT EN CHIFFRES */}
        {!recruiterMode && (
          <section
            id="stats"
            className="border-t border-slate-800/80 pt-16"
            data-animate
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-cyan-500/70 hidden sm:block" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Impact
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Mon impact en chiffres
                </h2>
                <p className="mt-1 text-sm text-slate-300 max-w-2xl">
                  Une vue rapide de ce que j&apos;ai déjà géré en production :
                  outils livrés, postes impactés, contexte et fiabilité.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Outils en production
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-50">
                  {toolsInProd}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    livrés
                  </span>
                </p>
                <p className="mt-2 text-[12px] text-slate-300">
                  Interface réseau Thales, back-office ES, assistant IA
                  d&apos;onboarding, site vitrine WordPress.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Parc sécurisé
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-50">
                  {infraDevices}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    postes
                  </span>
                </p>
                <p className="mt-2 text-[12px] text-slate-300">
                  Déploiement d&apos;un nouvel antivirus sur l&apos;ensemble du
                  parc informatique du Groupe Schertz.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Utilisateurs touchés
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-50">
                  {usersImpacted}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    +
                  </span>
                </p>
                <p className="mt-2 text-[12px] text-slate-300">
                  Collaborateurs, équipes métier et clients qui utilisent
                  quotidiennement les outils sur lesquels j&apos;ai contribué.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Expérience cumulée
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-50">
                  {experienceMonths}
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    mois
                  </span>
                </p>
                <p className="mt-2 text-[12px] text-slate-300">
                  Stages, CDD et missions en France et en Allemagne, en
                  environnement réseau, web et IA générative.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col lg:grid gap-6 lg:grid-cols-[1.7fr_1.3fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Livraisons dans les temps
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-100">
                        Respect des délais selon le type de projet
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Estimation personnelle
                    </span>
                  </div>

                  <div className="mt-4 h-52 border-b border-l border-slate-800 px-4 pb-3">
                    <div className="flex h-full items-end justify-between gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-32 w-7 items-end rounded-full bg-slate-900 ring-1 ring-slate-700/80 overflow-hidden">
                          <div
                            className="stat-bar w-full rounded-full bg-gradient-to-t from-cyan-500 to-emerald-400 h-[80%]"
                            style={{ animationDelay: "0.1s" }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Projets école
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {schoolRate}%
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-32 w-7 items-end rounded-full bg-slate-900 ring-1 ring-slate-700/80 overflow-hidden">
                          <div
                            className="stat-bar w-full rounded-full bg-gradient-to-t from-cyan-500 to-emerald-400 h-[90%]"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Projets perso
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {personalRate}%
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-32 w-7 items-end rounded-full bg-slate-900 ring-1 ring-slate-700/80 overflow-hidden">
                          <div
                            className="stat-bar w-full rounded-full bg-gradient-to-t from-cyan-500 to-emerald-400 h-[95%]"
                            style={{ animationDelay: "0.3s" }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Stages / CDD
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {stageRate}%
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex h-32 w-7 items-end rounded-full bg-slate-900 ring-1 ring-slate-700/80 overflow-hidden">
                          <div
                            className="stat-bar w-full rounded-full bg-gradient-to-t from-cyan-500 to-emerald-400 h-[98%]"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Objectif perso
                        </span>
                        <span className="text-[11px] text-slate-300 font-medium">
                          {goalRate}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-slate-400">
                    Ces chiffres sont des estimations basées sur mon recul
                    personnel, mais traduisent mon exigence sur le respect des
                    délais et la qualité des livrables.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Fiabilité & autonomie
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-100">
                        Perception globale de mes tuteurs / managers
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0">
                      <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                        {/* Background circle */}
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="#0f172a"
                          strokeWidth="8"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="8"
                          strokeDasharray={`${(reliability * 226) / 100} 226`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-semibold text-emerald-400">
                          {reliability}%
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 text-[12px] text-slate-300">
                      <p>
                        Appréciation globale de ma fiabilité (respect des
                        engagements, autonomie, communication) d&apos;après les
                        retours informels des tuteurs et responsables.
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        Indicateur non contractuel, mais fidèle aux feedbacks
                        reçus en fin de mission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite : stack & timeline & feedback */}
              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Stack mise en production
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    Technologies déjà utilisées en conditions réelles
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-4 rounded-full bg-cyan-500" />
                      <span>Production</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-4 rounded-full bg-slate-700" />
                      <span>En cours d&apos;apprentissage</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-slate-400">Python</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[85%] rounded-full bg-cyan-500" />
                      </div>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden max-w-[40%]">
                        <div className="h-full w-[30%] rounded-full bg-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-slate-400">JavaScript</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[80%] rounded-full bg-cyan-500" />
                      </div>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden max-w-[40%]">
                        <div className="h-full w-[35%] rounded-full bg-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-slate-400">PHP</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[75%] rounded-full bg-cyan-500" />
                      </div>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden max-w-[40%]">
                        <div className="h-full w-[25%] rounded-full bg-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-slate-400">HTML/CSS</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[90%] rounded-full bg-cyan-500" />
                      </div>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden max-w-[40%]">
                        <div className="h-full w-[20%] rounded-full bg-slate-600" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-slate-400">React / Next</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[35%] rounded-full bg-cyan-500" />
                      </div>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden max-w-[40%]">
                        <div className="h-full w-[65%] rounded-full bg-slate-600" />
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-slate-400">
                    En bleu : technologies déjà utilisées en production. En gris
                    : sujets sur lesquels je continue de monter en compétence.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Parcours en un coup d&apos;œil
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    Quelques jalons qui résument mon expérience
                  </p>

                  <div className="mt-3 relative pl-4 text-[11px] text-slate-300">
                    <div className="absolute left-1 top-1 bottom-1 w-px bg-slate-700" />
                    <div className="space-y-3">
                      <div className="relative">
                        <div className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
                        <p className="text-slate-400">2022 · Groupe Schertz</p>
                        <p className="text-slate-200">
                          Déploiement d&apos;un nouvel antivirus sur plus de 600
                          postes.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
                        <p className="text-slate-400">
                          2023 · Électricité de Strasbourg
                        </p>
                        <p className="text-slate-200">
                          Refonte d&apos;un back-office de gestion de catalogue
                          matériel utilisé par les équipes internes.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
                        <p className="text-slate-400">
                          2023–2024 · Milla &amp; Partner (DE)
                        </p>
                        <p className="text-slate-200">
                          Assistant d&apos;onboarding basé sur l&apos;IA
                          générative pour les nouveaux arrivants.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                        <p className="text-slate-400">2025 · Thales</p>
                        <p className="text-slate-200">
                          Nouvelle interface pour un outil de configuration
                          réseau critique (PySide6, UX/UI, performance).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-sm shadow-black/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Feedback tuteurs & managers
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    Ce qui ressort le plus souvent dans leurs retours
                  </p>

                  <div className="mt-3 flex flex-col gap-2 text-[11px] text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-28 text-slate-400">Autonomie</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[90%] rounded-full bg-emerald-400" />
                      </div>
                      <span className="w-10 text-right text-slate-400">
                        4.5/5
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-28 text-slate-400">
                        Qualité du code
                      </span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[85%] rounded-full bg-emerald-400" />
                      </div>
                      <span className="w-10 text-right text-slate-400">
                        4.3/5
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-28 text-slate-400">Communication</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-[90%] rounded-full bg-emerald-400" />
                      </div>
                      <span className="w-10 text-right text-slate-400">
                        4.5/5
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] text-slate-400">
                    Notes indicatives, basées sur les entretiens de fin de
                    stage et les retours informels des responsables de mission.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PROJETS – case studies */}
        <section
          id="projects"
          className="border-t border-slate-800/80 pt-16"
          data-animate
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-cyan-500/70 hidden sm:block" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Réalisations
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold">
                Projets sélectionnés
              </h2>
              <p className="mt-1 text-sm text-slate-300 max-w-2xl">
                Quelques cas concrets qui résument ce que je sais livrer en
                conditions réelles : réseau, web, IA générative et systèmes.
              </p>
              {recruiterMode && (
                <p className="mt-1 text-[11px] text-emerald-300">
                  Mode recruteur pressé : les projets les plus pertinents sont
                  mis en avant en priorité.
                </p>
              )}
            </div>
          </div>

          {(() => {
            const projectFilters = [
              { key: "all", label: "Tous" },
              { key: "reseau", label: "Réseau" },
              { key: "web", label: "Web" },
              { key: "ia", label: "IA" },
              { key: "systems", label: "Systèmes" },
            ];

            const filtered =
              projectFilter === "all"
                ? caseStudies
                : caseStudies.filter((p) => p.category === projectFilter);

            const limited = recruiterMode
              ? filtered.filter((p) => p.prioRecruiter)
              : filtered;

            const effectiveList =
              limited.length > 0
                ? limited
                : filtered.length > 0
                ? filtered
                : caseStudies;

            const activeStudy =
              effectiveList.find((p) => p.key === selectedProjectKey) ||
              effectiveList[0] ||
              caseStudies[0];

            return (
              <>
                <div className="flex flex-wrap gap-2 text-[11px] mb-4">
                  {projectFilters.map((filter) => {
                    const active = filter.key === projectFilter;
                    return (
                      <button
                        key={filter.key}
                        type="button"
                        onClick={() => setProjectFilter(filter.key)}
                        className={`rounded-full px-3.5 py-1.5 border transition-all flex items-center gap-2 cursor-pointer ${
                          active
                            ? "border-cyan-400 bg-cyan-500/10 text-cyan-200 shadow-sm shadow-cyan-500/30"
                            : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-cyan-400 hover:text-cyan-200"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{filter.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col lg:grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.6fr)]">
                  {/* Colonne gauche : liste des projets */}
                  <div className="space-y-3">
                    {effectiveList.map((proj) => {
                      const isActive = proj.key === activeStudy.key;
                      return (
                        <button
                          key={proj.key}
                          type="button"
                          onClick={() => setSelectedProjectKey(proj.key)}
                          className={`group w-full text-left rounded-2xl border px-4 py-3.5 transition-all cursor-pointer ${
                            isActive
                              ? "border-cyan-400 bg-slate-900/90 shadow-[0_0_0_1px_rgba(34,211,238,0.6)]"
                              : "border-slate-800 bg-slate-950/80 hover:border-cyan-500/70 hover:bg-slate-900/90"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {proj.logo ? (
                              <div
                                className={`flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-slate-200 shadow-sm shadow-black/20 ${proj.key === "muscu-pwa" ? "bg-cyan-500" : "bg-white"}`}
                              >
                                <Image
                                  src={proj.logo}
                                  alt={proj.company}
                                  width={36}
                                  height={36}
                                  className="h-8 w-8 object-contain rounded-full"
                                  style={{ width: 'auto', height: 'auto' }}
                                />
                              </div>
                            ) : (
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-sm shadow-black/20">
                                {proj.company.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-[13px] font-semibold text-slate-50 truncate">
                                  {proj.headline}
                                </p>
                                {proj.prioRecruiter && (
                                  <span className="rounded-full bg-emerald-500/10 border border-emerald-400/70 px-2 py-[2px] text-[9px] text-emerald-200">
                                    ⭐ Prioritaire recruteur
                                  </span>
                                )}
                              </div>
                              <p className="mt-0.5 text-[11px] text-slate-400">
                                {proj.company} · {proj.role}
                              </p>
                              <p className="mt-0.5 text-[10px] text-slate-500">
                                {proj.year} · {proj.location} ·{" "}
                                {proj.contractLabel}
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-300">
                            {proj.techs.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2 py-[3px]"
                              >
                                <span className="h-1 w-1 rounded-full bg-slate-500" />
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Colonne droite : détail du projet sélectionné */}
                  <article className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-sm shadow-black/40">
                    <header className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Cas concret
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-slate-50">
                          {activeStudy.headline}
                        </h3>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {activeStudy.company} · {activeStudy.role}
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-500">
                          {activeStudy.year} · {activeStudy.location} ·{" "}
                          {activeStudy.contractLabel}
                        </p>
                      </div>
                      <div className="hidden sm:flex flex-col items-end gap-1 text-[10px] text-slate-400">
                        <span className="uppercase tracking-[0.16em]">
                          Domaine
                        </span>
                        <span className="rounded-full border border-slate-700 bg-slate-900/80 px-2 py-[3px]">
                          {activeStudy.category === "reseau" &&
                            "Réseau / outils internes"}
                          {activeStudy.category === "web" &&
                            "Web / back-office"}
                          {activeStudy.category === "ia" &&
                            "IA générative / onboarding"}
                          {activeStudy.category === "systems" &&
                            "Systèmes / déploiement"}
                        </span>
                      </div>
                    </header>

                    <p className="mt-3 text-[13px] text-slate-200 leading-relaxed">
                      {activeStudy.summary}
                    </p>

                    <div className="mt-4 flex flex-col md:grid gap-4 md:grid-cols-3 text-[11px] text-slate-300">
                      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Contexte & problème
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {activeStudy.contextBullets.map((line) => (
                            <li key={line} className="flex gap-2">
                              <span className="mt-[3px] h-1 w-1 rounded-full bg-slate-500" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-400">
                          Ce que j&apos;ai fait
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {activeStudy.actionsBullets.map((line) => (
                            <li key={line} className="flex gap-2">
                              <span className="mt-[3px] h-1 w-1 rounded-full bg-sky-500" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                          Impact concret
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {activeStudy.impactBullets.map((line) => (
                            <li key={line} className="flex gap-2">
                              <span className="mt-[3px] h-1 w-1 rounded-full bg-emerald-400" />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tags / compétences liées */}
                    <div className="mt-4 flex flex-col gap-3">
                      {activeStudy.link && (
                        <a
                          href={activeStudy.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm px-4 py-2.5 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-sm hover:shadow-md cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visiter l&apos;application
                        </a>
                      )}
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {activeStudy.techs.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-[4px] text-slate-200"
                          >
                            <span className="h-1 w-1 rounded-full bg-slate-500" />
                            <span>{tech}</span>
                          </span>
                        ))}

                        {activeStudy.skillTags &&
                          activeStudy.skillTags.map((skillKey) => {
                            const meta = skills.find((s) => s.key === skillKey);
                            if (!meta) return null;
                            return (
                              <button
                                key={`skill-${skillKey}`}
                                type="button"
                                onClick={() =>
                                  focusSkillFromExperienceTag(skillKey)
                                }
                                className="inline-flex items-center gap-1 rounded-full border border-cyan-500/70 bg-cyan-500/10 px-2.5 py-[4px] text-cyan-100 cursor-pointer hover:bg-cyan-400/20 hover:border-cyan-300 transition-all"
                                title="Voir la compétence associée"
                              >
                                <span className="h-1 w-1 rounded-full bg-cyan-300" />
                                <span>{meta.label}</span>
                                <span className="text-[9px] opacity-70">★</span>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    <p className="mt-3 text-[10px] text-slate-500">
                      Cette section est pensée pour que vous puissiez comprendre
                      rapidement le contexte, ce que j&apos;ai réalisé et
                      l&apos;impact concret de chaque projet. Cliquez sur les
                      pillules de compétences pour voir le détail dans la
                      section{" "}
                      <span className="text-slate-200 font-medium">
                        Compétences
                      </span>
                      .
                    </p>
                  </article>
                </div>
              </>
            );
          })()}
        </section>

        {/* COMPÉTENCES */}
        <section
          id="skills"
          className="border-t border-slate-800/80 pt-16"
          data-animate
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-cyan-500/70 hidden sm:block" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Stack
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold">
                Compétences
              </h2>
              <p className="mt-1 text-sm text-slate-300 max-w-2xl">
                Une vue structurée de ma stack : langages, web, data & IA,
                infra, méthodes. Cliquez pour voir comment je les utilise
                concrètement.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 lg:p-6">
            <div className="flex flex-wrap gap-2 text-[11px] mb-3">
              {skillCategories.map((cat) => {
                const active = cat.key === selectedCategory;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`rounded-full px-3.5 py-1.5 border transition-all flex items-center gap-2 cursor-pointer ${
                      active
                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-200 shadow-sm shadow-cyan-500/30"
                        : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-cyan-400 hover:text-cyan-200"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="my-3 h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Compétences détaillées
              </p>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Sélectionnez une compétence pour voir le détail et un exemple de
                code concret.
              </p>
            </div>

            <div className="mt-1 flex flex-wrap gap-2 text-[12px]">
              {filteredSkills.map((skill) => {
                const active = skill.key === selectedSkillKey;
                const detail = skillDetails[skill.key];
                const level = (detail && detail.level) || "projet";

                const levelLabel =
                  level === "prod"
                    ? "Production"
                    : level === "projet"
                    ? "Projet"
                    : "En cours";

                return (
                  <button
                    key={skill.key}
                    type="button"
                    onClick={() => handleSkillSelect(skill.key)}
                    aria-pressed={active}
                    className={`group rounded-full px-3.5 py-1.5 border transition-all flex items-center gap-2 cursor-pointer ${
                      active
                        ? "border-cyan-400 bg-cyan-500/10 text-cyan-200 shadow-sm shadow-cyan-500/30"
                        : "border-slate-700 bg-slate-950/70 text-slate-200 hover:border-cyan-400 hover:text-cyan-200"
                    }`}
                  >
                    <span className="text-[9px]">●</span>
                    <span>{skill.label}</span>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-[1px] text-[9px] font-medium ${
                        level === "prod"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/60"
                          : level === "projet"
                          ? "bg-sky-500/10 text-sky-200 border border-sky-500/60"
                          : "bg-slate-700/60 text-slate-100 border border-slate-400/80"
                      }`}
                    >
                      {levelLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-7 flex flex-col lg:grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-[13px] text-slate-200">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Focus compétence
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-50">
                      {currentSkillDetail.title}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] border ${levelColor}`}
                  >
                    {currentSkillDetail.level === "prod"
                      ? "Utilisée en production"
                      : currentSkillDetail.level === "projet"
                      ? "Validée en projet"
                      : "Montée en compétence"}
                  </span>
                </div>
                <p className="mt-3 text-[13px] text-slate-200 leading-relaxed">
                  {currentSkillDetail.desc}
                </p>
                <p className="mt-2 text-[11px] text-slate-400">
                  Contexte d&apos;utilisation : {currentSkillDetail.context}
                </p>

                {currentSkillDetail.tags && (
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    {currentSkillDetail.tags.map((rawTag) => {
                      const tag =
                        typeof rawTag === "string"
                          ? { type: "context", label: rawTag }
                          : rawTag;

                      if (tag.type === "company") {
                        const logo = companyLogos[tag.companyKey];

                        return (
                          <button
                            key={tag.label}
                            type="button"
                            onClick={() => scrollToExperience(tag.companyKey)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/60 bg-cyan-500/10 px-2.5 py-[4px] text-cyan-100 cursor-pointer transition-all hover:bg-cyan-400/20 hover:border-cyan-300 hover:-translate-y-0.5"
                            title="Voir l'expérience associée"
                          >
                            {logo && (
                              <span className="relative h-4 w-4 overflow-hidden rounded-full bg-white">
                                <Image
                                  src={logo.src}
                                  alt={logo.alt}
                                  fill
                                  className="object-contain p-[2px]"
                                  sizes="16px"
                                />
                              </span>
                            )}
                            <span>{tag.label}</span>
                            <span className="text-[9px] opacity-70">↑</span>
                          </button>
                        );
                      }

                      if (tag.type === "project") {
                        return (
                          <a
                            key={tag.label}
                            href={tag.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/70 bg-amber-500/10 px-2.5 py-[4px] text-amber-100 cursor-pointer transition-all hover:bg-amber-400/20 hover:border-amber-300 hover:-translate-y-0.5"
                            title="Ouvrir le projet dans un nouvel onglet"
                          >
                            <span className="text-[11px]">↗</span>
                            <span>{tag.label}</span>
                          </a>
                        );
                      }

                      return (
                        <span
                          key={tag.label}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-[4px] text-slate-300"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-500" />
                          <span>{tag.label}</span>
                        </span>
                      );
                    })}
                  </div>
                )}

                <div className="mt-4 border-t border-slate-800 pt-3 text-[11px] text-slate-300 space-y-1.5">
                  <p className="font-semibold text-slate-200">
                    Ce que ça veut dire pour vous :
                  </p>
                  <p>
                    {currentSkillDetail.employerValue ||
                      "Cette compétence me permet de contribuer rapidement sur des sujets concrets, tout en continuant à monter en compétence en fonction de vos besoins."}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-[12px] text-slate-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Mini-dashboard : {currentSkillLabel}
                </p>

                <div className="mt-3 space-y-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-28 text-slate-400">Confiance</span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                        style={{
                          width: `${
                            (currentSkillDetail.metrics &&
                              currentSkillDetail.metrics.confidence) ||
                            60
                          }%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-300">
                      {(currentSkillDetail.metrics &&
                        currentSkillDetail.metrics.confidence) ||
                        60}
                      %
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-28 text-slate-400">
                      Expérience réelle
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-400 transition-all duration-500"
                        style={{
                          width: `${
                            (currentSkillDetail.metrics &&
                              currentSkillDetail.metrics.experience) ||
                            50
                          }%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-300">
                      {(currentSkillDetail.metrics &&
                        currentSkillDetail.metrics.experience) ||
                        50}
                      %
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-28 text-slate-400">
                      Usage récent (12 mois)
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-purple-400 transition-all duration-500"
                        style={{
                          width: `${
                            (currentSkillDetail.metrics &&
                              currentSkillDetail.metrics.recentUse) ||
                            50
                          }%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-300">
                      {(currentSkillDetail.metrics &&
                        currentSkillDetail.metrics.recentUse) ||
                        50}
                      %
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-950 border border-slate-800 p-3 text-[11px] font-mono text-slate-200 shadow-inner shadow-black/60 overflow-x-auto">
                  <p className="text-sky-400 mb-1 whitespace-nowrap">{example.title}</p>
                  {example.lines.map((line, idx) => (
                    <p
                      key={idx}
                      className={`whitespace-nowrap ${
                        line.trim().startsWith("#") ||
                        line.trim().startsWith("//") ||
                        line.trim().startsWith("/*") ||
                        line.trim().startsWith("--") ||
                        line.trim().startsWith("- ")
                          ? "text-slate-400"
                          : "text-slate-200"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <p className="mt-2 text-[10px] text-slate-500">
                  Ces exemples sont volontairement simples : ils montrent
                  concrètement le type de tâches que j&apos;ai réalisées avec
                  chaque compétence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="border-t border-slate-800/80 pt-16"
          data-animate
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-cyan-500/70 hidden sm:block" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Contact
              </p>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold">
                Discutons
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Intéressé(e) par mon profil ? Discutons d&apos;un projet ou
                d&apos;une opportunité.
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-col lg:grid gap-6 lg:grid-cols-[2fr_1.1fr]">
            <form className="space-y-4 text-sm" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
                  Nom
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 outline-none ring-cyan-500/30 focus:border-cyan-400 focus:ring-2"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  autoComplete="email"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 outline-none ring-cyan-500/30 focus:border-cyan-400 focus:ring-2"
                  placeholder="vous@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 outline-none ring-cyan-500/30 focus:border-cyan-400 focus:ring-2"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-cyan-500 px-7 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400 hover:-translate-y-0.5 cursor-pointer"
              >
                Envoyer par email
              </button>
            </form>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm text-slate-300">
              <p>
                Pour un contact direct, vous pouvez me joindre ici ou via mes
                réseaux :
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <span className="font-medium text-slate-100">Email :</span>{" "}
                  paul.claus@viacesi.fr
                </li>
                <li>
                  <span className="font-medium text-slate-100">
                    Téléphone :
                  </span>{" "}
                  +33 6 67 06 14 73
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium text-slate-100">LinkedIn :</span>
                  <a
                    href="https://www.linkedin.com/in/paul-claus/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-sky-400 ring-1 ring-sky-500/40 hover:bg-sky-500 hover:text-slate-950 hover:ring-sky-400 transition-all cursor-pointer"
                  >
                    <span className="relative h-4 w-4">
                      <Image
                        src="/logos/linkedin.png"
                        alt="LinkedIn"
                        fill
                        className="object-contain"
                        sizes="16px"
                      />
                    </span>
                    <span>/paul-claus</span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium text-slate-100">GitHub :</span>
                  <a
                    href="https://github.com/Paulclaus67"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-slate-600 hover:bg-slate-100 hover:text-slate-950 transition-all cursor-pointer"
                  >
                    <span className="relative h-4 w-4">
                      <Image
                        src="/logos/github.png"
                        alt="GitHub"
                        fill
                        className="object-contain"
                        sizes="16px"
                      />
                    </span>
                    <span>/Paulclaus67</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/80 pt-6 pb-2 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Paul Claus — Portfolio.</p>
          <p className="text-[11px] text-slate-500">
            Construit avec Next.js & Tailwind CSS.
          </p>
        </footer>
      </div>

      {/* Bouton retour en haut */}
      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-sky-500 to-purple-500 p-[2px] cursor-pointer scroll-top-pulse transition-all duration-300 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        aria-label="Remonter en haut de la page"
      >
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-950 text-slate-50">
          <span className="text-lg sm:text-xl leading-none">↑</span>
        </div>
      </button>

      {showEasterEgg && easterEggTerminalOpen && (
        <EasterEggTerminal onClose={() => setEasterEggTerminalOpen(false)} />
      )}

      {showEasterEgg && showEggToast && (
        <EasterEggToast onHide={() => setShowEggToast(false)} />
      )}

      {/* Konami game */}
      <KonamiGameOverlay />


    </main>
  );
}
