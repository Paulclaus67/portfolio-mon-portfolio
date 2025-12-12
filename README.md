# 🌟 Portfolio Paul Claus - Premium Edition v2.0

**Portfolio professionnel moderne** de Paul Claus, ingénieur informatique junior spécialisé en **développement web**, **réseau** et **IA générative**.

Réalisé avec **Next.js 16+**, **React 19**, **Tailwind CSS 4** et **animations CSS premium**.

🔗 **[Portfolio en ligne](https://portfolio-mon-portfolio.vercel.app/)** • 🔗 **[LinkedIn](https://www.linkedin.com/in/paul-claus/)** • 🔗 **[GitHub](https://github.com/Paulclaus67)**

---

## 📋 Table of Contents

- [✨ Fonctionnalités](#-fonctionnalités)
- [🧰 Stack](#-stack-technique)
- [🚀 Démarrage](#-démarrage-rapide)
- [📁 Architecture](#-architecture)
- [🌐 Déploiement](#-déploiement)
- [🔧 Personnalisation](#-personnalisation)
- [📞 Contact](#-contact)

---

## ✨ Fonctionnalités

### 🎯 Orientation Recruteur
- **Message percutant** : ce que je sais livrer (interfaces web, outils métier, systèmes)
- **Stats clés** : outils en production, postes impactés, années d'expérience
- **Clients de référence** : Thales, Électricité de Strasbourg, Milla & Partner, Groupe Schertz

### 🎭 Mode "Recruteur Pressé"
- Toggle en header pour une version condensée
- Expériences et projets prioritaires en avant
- Texte allégé et points clés visibles

### 💼 Expériences Détaillées
- **Cartes enrichies** avec contexte, stack, tags cliquables
- Distinction stage / CDD / stage international
- Liens directs vers les compétences associées

### 🎬 Case Studies Structurés
- Format **Problème → Actions → Impact**
- Exemples concrets :
  - Outil de gestion réseau (Thales)
  - Back-office catalogue matériel (EDF Strasbourg)
  - Assistant IA pour onboarding (Milla & Partner)
  - Déploiement antivirus 600+ postes (Groupe Schertz)
- Filtrage par domaine (Réseau, Web, IA, Systèmes)

### 🔧 Compétences Structurées
- **5 catégories** : Langages, Web, Data & IA, Infra, Méthodes
- **Pour chaque skill** :
  - Niveau (production / projet / en cours)
  - Contexte d'utilisation
  - Mini-dashboard (confiance, expérience, usage récent)
  - Exemple de code représentatif

### ✨ UX & Animations
- Animation au scroll (Intersection Observer)
- Scrollspy dynamique
- Soulignement fluide dans la navigation
- Bouton "retour en haut" flottant
- Easter egg sur la photo de profil 👀

### 📧 Contact
- Formulaire avec `mailto:` (sans backend)
- Infos de contact consolidées
- CV téléchargeable

---

## 🧰 Stack Technique

| Élément | Tech |
|---------|------|
| **Framework** | [Next.js 16](https://nextjs.org/) |
| **Runtime** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Déploiement** | [Vercel](https://vercel.com/) |
| **Monitoring** | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) |

**Détails techniques** :
- Components React avec hooks custom (`useCountUp`, animations)
- IntersectionObserver pour le scroll spy
- CSS3 animations personnalisées
- Responsive design mobile-first
- SEO optimisé (Open Graph, Twitter Cards)
- Accessibilité WCAG AA

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone le repo
git clone https://github.com/Paulclaus67/portfolio-mon-portfolio.git
cd portfolio-mon-portfolio

# Installe les dépendances
npm install

# Lance le serveur de dev
npm run dev
```

Accès : **http://localhost:3000**

### Scripts Disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run start    # Serveur production (après build)
npm run lint     # Linter ESLint
```

---

## 📁 Architecture

```
.
├── app/
│   ├── layout.js              # Layout principal
│   ├── page.js                # Page unique (tout le portfolio)
│   ├── globals.css            # Styles globaux
│   ├── animations.css         # Animations premium
│   ├── theme.css              # Variables CSS
│   ├── typography.css         # Typographie
│   ├── config/                # Configuration (vide - à remplir)
│   └── utils/                 # Utilitaires
│
├── public/
│   ├── logos/                 # Logos entreprises & réseaux
│   └── *.jpg|png              # Images (photo profil, etc.)
│
├── package.json               # Dépendances & scripts
├── next.config.mjs            # Config Next.js
├── jsconfig.json              # Config JavaScript
├── eslint.config.mjs          # Config linter
├── postcss.config.mjs         # PostCSS (Tailwind)
└── README.md                  # Ce fichier

```

**Architecture du portfolio** :
- **Mono-fichier** : toute la logique dans `app/page.js`
- **Constantes centralisées** : `skills`, `skillDetails`, `experiences`, `caseStudies`
- **Zero backend** : formulaire contact via `mailto:`
- **Fully client** : rendu côté client pour l'interactivité

---

## 🌐 Déploiement

### Sur Vercel (Recommandé)

1. **Connecte ton GitHub** à [Vercel](https://vercel.com)
2. **Importe le projet** : "Add New → Project"
3. **Laisse les defaults** :
   - Framework : Next.js
   - Build : `npm run build`
   - Output : `.next`
4. **Deploy !** 🚀

Chaque `git push` redéploie automatiquement.

### Variables d'environnement
- Voir `.env.example` pour les variables disponibles
- Copie-le en `.env.local` localement

---

## 🔧 Personnalisation

### Contenu facile à adapter

**Données** (dans `app/page.js`) :
- `experiences` : entreprises, dates, descriptions, tags
- `caseStudies` : projets, contexte, actions, impact
- `skills` et `skillDetails` : compétences, exemples de code
- `skillCategories` : regroupement des skills

**Identité** :
- Titres, sous-titres, paragraphes d'intro
- Section "En 30 secondes"

**Visuels** :
- Logos dans `public/logos/`
- Photo profil dans `public/`
- Couleurs/gradients (Tailwind classes)

### Styles

Fichiers CSS prédéfinis :
- `app/globals.css` : reset et base
- `app/theme.css` : variables CSS (couleurs, espaces, etc.)
- `app/animations.css` : keyframes premium
- `app/typography.css` : font stacks

Modification facile via **variables CSS** ou **classes Tailwind**.

---

## 📊 Performance

Lighthouse scores visés :
- ✅ Performance : 90+
- ✅ Accessibility : 95+
- ✅ Best Practices : 95+
- ✅ SEO : 100

Core Web Vitals optimisés (LCP, FID, CLS).

---

## 📄 Licence

Projet personnel de portfolio.

**Tu peux** : t'inspirer de la structure et du code technique.

**Tu ne peux pas** : réutiliser le contenu textuel, les images ou l'identité (nom, photo).

---

## 🤝 Contribution

Pour les bugs ou améliorations :
1. Crée une issue ou propose une PR
2. Follow le code style existant
3. Teste sur localhost avant de pusher

---

## 📞 Contact

- **Email** : paul.claus@viacesi.fr
- **Téléphone** : +33 6 67 06 14 73
- **LinkedIn** : [linkedin.com/in/paul-claus](https://www.linkedin.com/in/paul-claus/)
- **GitHub** : [github.com/Paulclaus67](https://github.com/Paulclaus67)

---

Made with 🎨 by Paul Claus | Deployed on [Vercel](https://vercel.com)
