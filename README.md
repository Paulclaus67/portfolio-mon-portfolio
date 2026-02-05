# 🌟 Portfolio Paul Claus — Premium Edition v2.0

Portfolio professionnel moderne de Paul Claus, ingénieur informatique junior spécialisé en **développement web**, **réseau** et **IA générative**.

Réalisé avec **Next.js 16**, **React 19**, **Tailwind CSS 4** et des animations (CSS + Framer Motion).

🔗 **[Portfolio en ligne](https://portfolio-mon-portfolio.vercel.app/)** • 🔗 **[LinkedIn](https://www.linkedin.com/in/paul-claus/)** • 🔗 **[GitHub](https://github.com/Paulclaus67)**

---

## 📋 Sommaire <a id="sommaire"></a>

- [Fonctionnalités](#fonctionnalites)
- [Stack technique](#stack-technique)
- [Démarrage rapide](#demarrage-rapide)
- [Architecture](#architecture)
- [Personnalisation](#personnalisation)
- [Déploiement](#deploiement)
- [Performance](#performance)
- [Licence](#licence)
- [Contribution](#contribution)
- [Contact](#contact)

---

## ✨ Fonctionnalités <a id="fonctionnalites"></a>

- **Orientation recruteur** : message clair, éléments concrets, lecture rapide.
- **Mode “recruteur pressé”** : version condensée activable depuis le header.
- **Expériences détaillées** : cartes enrichies (stack, tags cliquables, contexte).
- **Case studies** : format “Problème → Actions → Impact” + filtres.
- **Compétences structurées** : catégories, niveaux, contexte et exemples de code.
- **UX / micro-interactions** : scrollspy, animations au scroll, “retour en haut”, easter eggs.
- **Contact** : formulaire `mailto:` + CV téléchargeable (sans backend).

---

## 🧰 Stack technique <a id="stack-technique"></a>

| Élément | Tech |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| UI | [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) + CSS custom (`app/*.css`) |
| Animations | [Framer Motion](https://www.framer.com/motion/) + CSS |
| Icônes | [lucide-react](https://lucide.dev/) |
| Déploiement | [Vercel](https://vercel.com/) |
| Monitoring | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) |

Versions (référence) : `next@16.0.7`, `react@19.2.0`, `tailwindcss@4`.

---

## 🚀 Démarrage rapide <a id="demarrage-rapide"></a>

### Prérequis
- Node.js 18+
- npm (ou yarn / pnpm)

### Installation & dev

```bash
git clone https://github.com/Paulclaus67/portfolio-mon-portfolio.git
cd portfolio-mon-portfolio
npm install
npm run dev
```

Accès : `http://localhost:3000`

### Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## 📁 Architecture <a id="architecture"></a>

```
portfolio-mon-portfolio/
├── app/
│   ├── layout.js              # Layout + metadata SEO
│   ├── page.js                # Page principale (UI + interactions)
│   ├── data.js                # Données (skills / expériences / case studies…)
│   ├── components/
│   │   └── BurgerMenu.js       # Composant menu mobile
│   ├── utils/
│   │   └── components.js       # Helpers UI
│   ├── globals.css             # Styles globaux (imports CSS)
│   ├── theme.css               # Variables CSS (couleurs, espaces…)
│   ├── typography.css          # Typographie
│   └── animations.css          # Animations CSS
├── public/
│   ├── logos/                  # Logos entreprises & réseaux
│   └── *                       # Images + CV PDF (selon tes assets)
├── .env.example
├── next.config.mjs
└── package.json
```

---

## 🔧 Personnalisation <a id="personnalisation"></a>

- Contenu : édite `app/data.js` (expériences, projets/case studies, compétences, textes).
- Mise en page / comportements : édite `app/page.js`.
- Styles : `app/theme.css`, `app/typography.css`, `app/animations.css`, `app/globals.css`.
- Assets : ajoute/remplace les fichiers dans `public/` (logos, photo, CV…).

---

## 🌐 Déploiement <a id="deploiement"></a>

### Vercel (recommandé)

1. Connecte GitHub à Vercel
2. Importe le projet
3. Build : `npm run build`
4. Deploy

### Variables d’environnement
- Voir `.env.example`
- En local : copie en `.env.local`

---

## 📊 Performance <a id="performance"></a>

Objectif : Lighthouse 90+ (Perf) et 95+ (Accessibilité / Best Practices), SEO propre (Open Graph, Twitter Cards).

---

## 📄 Licence <a id="licence"></a>

Projet personnel de portfolio.

- **Tu peux** : t’inspirer de la structure et du code technique.
- **Tu ne peux pas** : réutiliser le contenu textuel, les images ou l’identité (nom, photo).

---

## 🤝 Contribution <a id="contribution"></a>

Pour les bugs ou améliorations :
1. Ouvre une issue ou propose une PR
2. Respecte le style de code existant
3. Teste en local avant de pousser

---

## 📞 Contact <a id="contact"></a>

- Email : `paul.claus@viacesi.fr`
- Téléphone : `+33 6 67 06 14 73`
- LinkedIn : https://www.linkedin.com/in/paul-claus/
- GitHub : https://github.com/Paulclaus67

---

Made with 🎨 by Paul Claus | Deployed on Vercel
