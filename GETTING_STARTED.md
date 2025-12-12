# 🚀 Getting Started

Guide complet pour démarrer avec le portfolio Paul Claus.

## 📦 Prérequis

- **Node.js** 18.17+ ([télécharger](https://nodejs.org/))
- **npm** 9+ (inclus avec Node.js) ou **pnpm** / **yarn**
- Un éditeur de code ([VS Code](https://code.visualstudio.com/) recommandé)
- Git pour cloner le repo

Vérifiez votre installation :
```bash
node --version  # v18.17.0 ou +
npm --version   # 9.0.0 ou +
```

---

## 🔧 Installation Locale

### 1. Clone le repository

```bash
git clone https://github.com/Paulclaus67/portfolio-mon-portfolio.git
cd portfolio-mon-portfolio
```

### 2. Installe les dépendances

```bash
npm install
```

Ou avec yarn/pnpm :
```bash
yarn install
# ou
pnpm install
```

### 3. Lance le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## 🏃 Scripts Disponibles

```bash
npm run dev      # 🔄 Serveur dev (port 3000, hot reload)
npm run build    # 🔨 Build production (.next/)
npm run start    # ▶️  Serveur production (après build)
npm run lint     # 🔍 Lancer ESLint sur tout le projet
```

---

## 📝 Structure des Dossiers

```
portfolio-mon-portfolio/
├── app/
│   ├── layout.js              # Root layout (HTML, head, body)
│   ├── page.js                # Page unique du portfolio (~3800 lignes)
│   ├── globals.css            # Reset CSS + base styles
│   ├── animations.css         # Keyframes personnalisées
│   ├── theme.css              # Variables CSS (couleurs, espacements)
│   ├── typography.css         # Font stacks et typographie
│   ├── components/            # (vide pour l'instant)
│   ├── config/                # (vide pour l'instant)
│   └── utils/
│       └── components.js      # Utilitaires (vide pour l'instant)
│
├── public/
│   ├── logos/                 # Logos des entreprises/réseaux
│   │   ├── thales.png
│   │   ├── edf-strasbourg.png
│   │   ├── milla.png
│   │   ├── schertz.png
│   │   ├── github.png
│   │   ├── linkedin.png
│   │   └── ...
│   └── images/
│       └── photo-paul.jpg     # Photo de profil
│
├── package.json               # Dépendances & scripts
├── next.config.mjs            # Configuration Next.js
├── jsconfig.json              # Config JavaScript (paths, etc.)
├── eslint.config.mjs          # Règles ESLint
├── postcss.config.mjs         # PostCSS (Tailwind CSS)
├── tailwind.config.js         # Config Tailwind CSS
├── .env.example               # Exemple de variables d'env
├── .gitignore                 # Fichiers ignorés par Git
└── README.md                  # Documentation principale
```

---

## 🎯 Premiers Pas

### Lancer le projet

```bash
npm run dev
```

Tu vois la page sur http://localhost:3000 ?

### Explorer le code

Ouvre `app/page.js` — c'est le cœur du projet.

Tu verras :
1. **`skillCategories`** et **`skills`** : données des compétences
2. **`skillDetails`** : détails étendus par skill
3. **`experiences`** : historique professionnel
4. **`caseStudies`** : projets majeurs
5. **`testimonials`** (optionnel) : avis/retours clients

### Personnaliser ton contenu

Pour adapter le portfolio **à ta situation** :

1. **Mettre à jour les données** (dans `app/page.js`) :
   - Remplace les noms d'entreprises, dates, descriptions
   - Ajoute/retire des skills selon ton expérience
   - Mets à jour les case studies avec tes propres projets

2. **Remplacer les images** :
   - `public/images/photo-paul.jpg` → ta photo
   - `public/logos/` → les logos de tes clients/expériences

3. **Personnaliser le design** (optionnel) :
   - `app/theme.css` : couleurs, espacements
   - `app/animations.css` : vitesses, délais des animations
   - Classes Tailwind dans les JSX

---

## 🎨 Personnalisation des Styles

### Variables CSS Disponibles

Ouvre `app/theme.css` pour voir les variables :

```css
:root {
  /* Couleurs */
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
  
  /* Espaces */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  /* ... */
}
```

### Tailwind CSS

Le projet utilise **Tailwind CSS 4**. Tu peux :

- Modifier `tailwind.config.js` pour ajouter des couleurs, fonts, etc.
- Utiliser les classes Tailwind directement dans le JSX
- Créer des composants réutilisables

Exemple :
```jsx
<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
  Mon contenu stylé
</div>
```

---

## 🚀 Déploiement

### Sur Vercel (Recommandé - 5 minutes)

1. **Push sur GitHub** :
```bash
git add .
git commit -m "chore: initial commit"
git push origin main
```

2. **Connecte-toi à [Vercel](https://vercel.com)** avec ton compte GitHub

3. **Importe le projet** :
   - "Add New" → "Project"
   - Sélectionne ton repo `portfolio-mon-portfolio`
   - Laisse les settings par défaut
   - Click "Deploy"

✅ **Fait !** Ton site est live à `https://[project-name].vercel.app`

### Redéploiement automatique

À chaque `git push`, Vercel reconstruit et déploie automatiquement. Pas d'action nécessaire.

### Variables d'environnement

1. Copie `.env.example` en `.env.local` :
```bash
cp .env.example .env.local
```

2. Remplis les variables si besoin

3. Sur Vercel, ajoute les variables dans **Settings → Environment Variables**

---

## 🐛 Troubleshooting

### Port 3000 déjà utilisé ?

```bash
# Libère le port ou utilise un autre
npm run dev -- -p 3001
```

### Module not found error ?

```bash
# Réinstalle les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS ne s'applique pas ?

```bash
# Efface le cache et rebuild
rm -rf .next
npm run build
npm run dev
```

### Git issues ?

```bash
# Vérifiez votre config Git
git config --global user.name "Ton Nom"
git config --global user.email "email@example.com"
```

---

## 📚 Ressources Utiles

- **[Next.js Docs](https://nextjs.org/docs)** — Documentation officielle
- **[React Docs](https://react.dev)** — Guide React 19
- **[Tailwind CSS](https://tailwindcss.com/docs)** — Classes et composants
- **[Vercel Docs](https://vercel.com/docs)** — Déploiement et hosting
- **[MDN Web Docs](https://developer.mozilla.org/)** — Référence web

---

## 💡 Tips

1. **Hot Reload** : Modifie un fichier `.js` ou `.css` et l'aperçu se met à jour automatiquement
2. **React DevTools** : Installe l'extension [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/) pour déboguer
3. **Lighthouse** : Utilise Lighthouse dans les DevTools (F12) pour vérifier la performance
4. **Mobile Preview** : Ouvre http://localhost:3000 sur un téléphone sur le même réseau

---

## 🆘 Besoin d'aide ?

- **GitHub Issues** : https://github.com/Paulclaus67/portfolio-mon-portfolio/issues
- **Email** : paul.claus@viacesi.fr

---

Happy coding! 🚀
