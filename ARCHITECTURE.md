# 📐 Architecture & Code Structure

Guide technique de la structure et de l'organisation du code du portfolio.

## 📁 Structure du Projet

```
portfolio-mon-portfolio/
│
├── app/                              # Next.js App Router
│   ├── layout.js                    # Root layout (HTML base)
│   ├── page.js                      # Page unique (toute la logique)
│   │
│   ├── styles/
│   │   ├── globals.css              # Reset + base styles
│   │   ├── animations.css           # Keyframes premium
│   │   ├── theme.css                # Variables CSS
│   │   └── typography.css           # Font stacks
│   │
│   ├── components/                  # (À remplir avec des composants)
│   │
│   ├── config/                      # (À remplir avec config métier)
│   │
│   └── utils/
│       └── components.js            # (Utilitaires - vide)
│
├── public/                          # Assets statiques
│   ├── logos/                       # Logos des entreprises/réseaux
│   │   ├── thales.png
│   │   ├── edf-strasbourg.png
│   │   ├── milla.png
│   │   ├── github.png
│   │   ├── linkedin.png
│   │   └── ...
│   │
│   └── images/
│       └── paul-pdp.jpg             # Photo de profil
│
├── .git/                            # Repository Git
├── .next/                           # Build output (ignoré)
├── node_modules/                    # Dépendances (ignoré)
│
├── .env.example                     # Exemple variables d'env
├── .gitignore                       # Fichiers ignorés par Git
├── .eslintrc.json                   # Config ESLint
├── eslint.config.mjs                # Config ESLint (v9+)
├── jsconfig.json                    # Config JavaScript
├── next.config.mjs                  # Config Next.js
├── package.json                     # Dépendances & scripts
├── postcss.config.mjs               # PostCSS (Tailwind)
├── tailwind.config.js               # Tailwind CSS config
│
└── Documentation/
    ├── README.md                    # Guide principal
    ├── GETTING_STARTED.md           # Ce fichier
    ├── ARCHITECTURE.md              # Structure du code
    ├── CHANGELOG.md                 # Historique des versions
    └── IMPROVEMENTS.md              # Idées d'amélioration
```

---

## 🧬 Architecture du Code

### Pattern Mono-Fichier

Le portfolio utilise un **pattern mono-fichier** : toute la logique métier est dans `app/page.js`.

**Avantages** :
- ✅ Facile à comprendre pour un premier projet
- ✅ Pas de gestion d'état complexe
- ✅ Performance : zéro requêtes API

**Inconvénients** :
- ⚠️ Fichier volumineux (~3800 lignes)
- ⚠️ Difficile à refactoriser à grande échelle

**Migration future** : voir section "Refactoring" ci-dessous.

---

## 📋 Data Flow dans `app/page.js`

### 1. Constantes Métier (début du fichier)

```javascript
// Catégories de compétences
const skillCategories = [
  { key: "languages", label: "Langages & paradigmes" },
  { key: "web", label: "Web & Front" },
  // ...
]

// Compétences principales
const skills = [
  { key: "python", label: "Python", category: "languages" },
  { key: "react", label: "React", category: "web" },
  // ...
]

// Détails par compétence
const skillDetails = {
  python: {
    title: "Python",
    level: "prod",        // "prod" | "project" | "learning"
    context: "...",
    value: "...",
    // ...
  },
  // ...
}

// Expériences
const experiences = [
  {
    id: "thales",
    company: "Thales",
    position: "Ingénieur Réseaux",
    period: "Mars 2023 - Février 2024",
    // ...
  },
  // ...
]

// Cas d'études (case studies)
const caseStudies = [
  {
    id: "outil-reseau-thales",
    headline: "Outil de gestion réseau",
    company: "Thales",
    // ...
  },
  // ...
]
```

### 2. Composants React (hooks)

```javascript
// Hooks personnalisés
function useCountUp(target, duration = 2000) { /* ... */ }
function useScrollSpy(sectionIds) { /* ... */ }
function useScrollToTop() { /* ... */ }

// Composants
function Portfolio() {
  // État
  const [isHurryMode, setIsHurryMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Logique
  useEffect(() => { /* ... */ }, []);
  
  // Rendu
  return (
    <div>
      {/* Layout principal */}
    </div>
  );
}

export default Portfolio;
```

### 3. Ordre des Sections

1. **Navigation/Header** — Toggle mode recruteur
2. **Hero/Intro** — Message principal
3. **Stats Clés** — Chiffres animés (CountUp)
4. **Expériences** — Cartes historiques
5. **Compétences** — Grille par catégories
6. **Case Studies** — Projets majeurs
7. **Contact** — Formulaire + infos
8. **Footer** — Liens et infos

---

## 🎨 Système de Styles

### Hiérarchie CSS

```
tailwind.config.js
    ↓
tailwind.css (generated)
    ↓
globals.css    (reset + base)
    ├→ theme.css      (variables --color-*, --space-*)
    ├→ animations.css (keyframes @)
    ├→ typography.css (fonts, line-heights)
    └→ Classes Tailwind (dans les JSX)
```

### Variables CSS Disponibles

Ouvre `app/theme.css` :

```css
:root {
  /* Couleurs */
  --color-primary: #0ea5e9;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-bg-light: #f9fafb;
  --color-bg-dark: #111827;
  
  /* Espaces */
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 1.5rem;   /* 24px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 3rem;     /* 48px */
  
  /* Autres */
  --border-radius: 8px;
  --transition-smooth: 200ms ease-in-out;
}
```

### Animations

Ouvre `app/animations.css` :

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  /* ... */
}
```

Utilisées via classes Tailwind ou attributs `style`.

---

## 🔄 État et Hooks

### Hooks Utilisés

```javascript
// React built-in
useState()            // Gérer l'état local
useEffect()           # Cycle de vie, side effects
useRef()              // Références DOM
useCallback()         // Memoization

// Custom hooks (définis dans page.js)
useCountUp()          // Animation de chiffres
useScrollSpy()        // Suivi position scroll
useScrollToTop()      // Bouton "retour haut"
```

### Exemple : `useCountUp`

```javascript
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(target * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);
  
  return count;
}
```

---

## 🚀 Performance Optimizations

### Lazy Loading Images

```javascript
<Image
  src="/logos/thales.png"
  alt="Thales"
  loading="lazy"           // Lazy load
  width={100}
  height={100}
/>
```

### Code Splitting

Next.js gère automatiquement le code splitting via `dynamic()` :

```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### Intersection Observer pour Scroll Animations

```javascript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
      }
    });
  });
  
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
  
  return () => observer.disconnect();
}, []);
```

---

## 🔌 Intégrations Externes

### Vercel Speed Insights

```javascript
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <>
      {/* ... */}
      <SpeedInsights />
    </>
  );
}
```

Monitor les performances en temps réel sur [Vercel Dashboard](https://vercel.com/dashboard).

---

## 🔄 Refactoring Futur

### Recommandations

1. **Extraire les composants** :
   - `<SkillCard />` pour chaque compétence
   - `<ExperienceCard />` pour chaque expérience
   - `<CaseStudyCard />` pour chaque projet

2. **Créer des hooks custom** :
   - `usePortfolioData()` — charge les données
   - `useFiltering()` — filtrage case studies
   - `useNavigation()` — gestion menu

3. **Utiliser Context API** (optionnel) :
   ```javascript
   const PortfolioContext = createContext();
   
   <PortfolioContext.Provider value={{ skills, experiences, ... }}>
     <App />
   </PortfolioContext.Provider>
   ```

4. **Database (optionnel)** :
   - Migrer les données vers une DB (Firebase, Supabase)
   - Créer une API `/api/portfolio`
   - Récupérer les données côté serveur

### Exemple de Refactoring

Avant (tout dans `page.js`) :
```javascript
const Portfolio = () => {
  return (
    <div>
      {experiences.map(exp => (
        <div key={exp.id}>
          <h3>{exp.company}</h3>
          {/* ... beaucoup de HTML */}
        </div>
      ))}
    </div>
  );
};
```

Après (composants séparés) :
```javascript
// components/ExperienceCard.jsx
function ExperienceCard({ experience }) {
  return (
    <div>
      <h3>{experience.company}</h3>
      {/* ... HTML réutilisable */}
    </div>
  );
}

// app/page.js
const Portfolio = () => {
  return (
    <div>
      {experiences.map(exp => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}
    </div>
  );
};
```

---

## 🧪 Testing (À Implémenter)

### Exemple avec Jest + React Testing Library

```javascript
// __tests__/Portfolio.test.js
import { render, screen } from '@testing-library/react';
import Portfolio from '@/app/page';

describe('Portfolio', () => {
  it('renders the header', () => {
    render(<Portfolio />);
    expect(screen.getByText(/Paul Claus/i)).toBeInTheDocument();
  });
  
  it('displays all experiences', () => {
    render(<Portfolio />);
    const experiences = screen.getAllByRole('article');
    expect(experiences).toHaveLength(4); // 4 expériences
  });
});
```

Installation :
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

---

## 🔒 Sécurité

### Bonnes pratiques appliquées

- ✅ **No dangerouslySetInnerHTML** — pas d'injection de contenu
- ✅ **Input validation** — validation formulaire côté client
- ✅ **HTTPS** — Vercel force HTTPS en production
- ✅ **CSP Headers** — Content Security Policy
- ✅ **CORS** — cross-origin requests limitées

### Améliorations futures

- [ ] Rate limiting sur formulaires de contact
- [ ] Captcha (hCaptcha, reCAPTCHA)
- [ ] Chiffrement emails stockés

---

## 📚 Ressources Techniques

- **[Next.js App Router](https://nextjs.org/docs/app)** — Routing moderne
- **[React Hooks](https://react.dev/reference/react)** — API React
- **[Tailwind CSS](https://tailwindcss.com/docs)** — Framework CSS
- **[Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)** — IntersectionObserver, etc.

---

## 💬 Questions ?

Ouvre une issue : https://github.com/Paulclaus67/portfolio-mon-portfolio/issues
