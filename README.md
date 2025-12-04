# Portfolio – Paul Claus

Portfolio développeur / ingénieur informatique junior, réalisé avec **Next.js** et **Tailwind CSS**.  
Il présente mon parcours, mes compétences (réseau, web, IA générative, applications métier) et quelques cas concrets livrés en conditions réelles.

🔗 **Portfolio en ligne** : (https://portfolio-mon-portfolio.vercel.app/)  
🔗 **Profil LinkedIn** : [linkedin.com/in/paul-claus](https://www.linkedin.com/in/paul-claus/)  
🔗 **GitHub** : [github.com/Paulclaus67](https://github.com/Paulclaus67)

---

## ✨ Fonctionnalités

- **Page d’accueil orientée recruteur**
  - Message clair : ce que je sais livrer concrètement (interfaces propres, outils web, applis métier).
  - Stats rapides (outils en production, postes impactés, expérience, fiabilité…).
  - Logos des entreprises qui m’ont fait confiance (Thales, ES, Milla & Partner, Groupe Schertz).

- **Mode “Recruteur pressé”**
  - Toggle en header.
  - Affiche une version **plus concise** du portfolio : expériences principales, projets prioritaires, texte allégé.

- **Expériences détaillées**
  - Cartes par expérience avec :
    - contexte,
    - stack utilisée,
    - tags cliquables (qui renvoient vers la compétence associée),
    - distinction stage / CDD / stage à l’étranger.

- **Case studies / Projets**
  - Cas concrets structurés “problème → actions → impact” :
    - outil réseau chez Thales,
    - back-office catalogue matériel pour Électricité de Strasbourg,
    - assistant d’onboarding IA pour Milla & Partner,
    - déploiement antivirus sur 600+ postes (Groupe Schertz).
  - Filtrage par domaine : Réseau, Web, IA, Systèmes.

- **Compétences structurées**
  - Regroupement par catégories :
    - Langages & paradigmes
    - Web & Front
    - Data & IA
    - Infra & réseaux
    - Méthodes & outils
  - Pour chaque compétence :
    - niveau (production / projet / en cours),
    - contexte d’utilisation,
    - valeur pour l’employeur,
    - mini-dashboard (confiance, expérience, usage récent),
    - petit exemple de code représentatif.

- **Animations & UX**
  - Animation au scroll (sections qui apparaissent progressivement).
  - Scrollspy : le menu met en surbrillance la section en cours.
  - Soulignement fluide dans la navigation.
  - Bouton “remonter en haut” flottant.
  - Petit easter egg sur la photo de profil 👀

- **Contact**
  - Formulaire minimal qui ouvre un mail prérempli (`mailto:`).
  - Rappel des informations de contact : email, téléphone, LinkedIn, GitHub.
  - CV téléchargeable en PDF.

---

## 🧰 Stack technique

- **Framework** : [Next.js](https://nextjs.org/)
- **Langage** : JavaScript (React côté client)
- **UI** :
  - [React](https://react.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - Composants full custom
- **Déploiement** : pensé pour [Vercel](https://vercel.com/)
- **Autres** :
  - `IntersectionObserver` pour les animations au scroll
  - Hooks React personnalisés (ex : `useCountUp` pour les chiffres animés)
  - Formulaire contact via `mailto:` (pas de backend nécessaire)

---

## 🚀 Démarrage en local

### 1. Cloner le projet

```bash
git clone https://github.com/Paulclaus67/portfolio-mon-portfolio.git
cd portfolio-mon-portfolio
````

### 2. Installer les dépendances

```bash
npm install
# ou
yarn
# ou
pnpm install
```

### 3. Lancer le serveur de dev

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Le site sera accessible sur :

```text
http://localhost:3000
```

---

## 🏗️ Scripts disponibles

Dans `package.json`, les scripts classiques Next.js :

* `npm run dev` – lance le serveur de développement
* `npm run build` – construit la version de production
* `npm run start` – démarre le serveur en mode production (après `build`)
* `npm run lint` – lance les linters (si configurés)

---

## 📁 Organisation globale

*(structure indicative – peut être ajustée selon le projet réel)*

```text
.
├─ app/                # Entrée principale (App Router)
│  └─ page.jsx         # Page unique du portfolio
├─ public/
│  ├─ logos/           # Logos des entreprises, réseaux, favicon, etc.
│  └─ Paul_PDP.jpg     # Photo de profil
├─ styles/             # Configuration Tailwind / global.css (si utilisé)
├─ package.json
├─ next.config.mjs / js
├─ tailwind.config.js / cjs
└─ README.md
```

Toute la logique métier du portfolio (expériences, compétences, projets, etc.) est centralisée dans `app/page.jsx` via de grosses constantes (`skills`, `skillDetails`, `experiences`, `caseStudies`, etc.) et des hooks React.

---

## 🌐 Déploiement

Le projet est pensé pour être déployé sur **Vercel** :

1. Connecter le repo GitHub à Vercel.
2. Importer le projet via **“Add New → Project”**.
3. Laisser la configuration par défaut :

   * Framework : Next.js
   * Install command : `npm install`
   * Build command : `npm run build`
   * Output directory : `.next`
4. Cliquer sur **Deploy**.

À chaque `git push` sur la branche principale, Vercel reconstruit et redéploie automatiquement le portfolio.

---

## 🔧 Personnalisation

Quelques points faciles à adapter :

* **Identité / texte**

  * H1, sous-titres, paragraphes d’intro.
  * Les 3 “points clés” orientés entreprise dans la section “En 30 secondes”.

* **Données**

  * `experiences` : entreprises, dates, descriptions, tags.
  * `caseStudies` : projets mis en avant (headline, contexte, actions, impact).
  * `skills`, `skillDetails`, `skillExamples` : compétences et exemples de code.

* **Visuels**

  * Logos dans `public/logos/`.
  * Photo de profil `public/Paul_PDP.jpg`.
  * Couleurs/gradients dans les classes Tailwind.

---

## 📄 Licence

Projet personnel de portfolio.
Tu peux t’inspirer de la structure, mais merci de ne pas réutiliser tel quel le contenu textuel (expériences, descriptions, visuels) ni l’identité (nom, photo, logos).

---

## 📬 Contact

* **Email** : `paul.claus@viacesi.fr`
* **Téléphone** : `+33 6 67 06 14 73`
* **LinkedIn** : [linkedin.com/in/paul-claus](https://www.linkedin.com/in/paul-claus/)
* **GitHub** : [github.com/Paulclaus67](https://github.com/Paulclaus67)
Si tu veux, je peux te faire une version plus courte “mode recruteur” pour le README (tout en haut du fichier) ou une version en anglais aussi.
```
