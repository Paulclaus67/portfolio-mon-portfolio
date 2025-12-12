# 🤝 Contributing Guide

Guide pour contribuer au portfolio ou l'adapter pour ton usage personnel.

---

## 📋 Avant de Commencer

### C'est quoi le but ?

Ce projet est un **portfolio professionnel personnel de Paul Claus**.

- ✅ **Tu peux** : forker, adapter le code, t'en inspirer
- ❌ **Tu ne peux pas** : utiliser le contenu tel quel (nom, expériences, images)

### Permissions

- **Code/Structure** : Libre d'usage, tu as ma permission 🎉
- **Contenu** (texte, images, identité) : Personnel, pas de réutilisation
- **Crédit** : Si tu t'en inspires, c'est gentil de mentionner la source

---

## 🛠️ Configuration Locale

### 1. Fork le Repo

Clique sur le bouton **Fork** sur GitHub pour créer ta propre copie.

```bash
# Clone ta copie
git clone https://github.com/TON_USERNAME/portfolio-mon-portfolio.git
cd portfolio-mon-portfolio

# Ajoute l'upstream (pour rester à jour)
git remote add upstream https://github.com/Paulclaus67/portfolio-mon-portfolio.git
```

### 2. Crée une Branche

Pour toute modification, crée une branche :

```bash
git checkout -b feature/description-courte
```

Noms recommandés :
- `feature/add-testimonials` — Nouvelle fonctionnalité
- `fix/animation-bug` — Bug fix
- `docs/update-readme` — Documentation
- `chore/upgrade-next` — Maintenance

### 3. Installe et Lance

```bash
npm install
npm run dev
```

---

## 💻 Workflow de Développement

### Avant de Coder

1. **Crée une issue** (optionnel, mais recommandé) :
   - Décris ce que tu veux faire
   - Partage ton approche
   - Attends feedback (si tu veux)

2. **Sync avec l'upstream** :
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### En Codant

1. **Respect du style** :
   - Suit les conventions du projet
   - Indentation : 2 espaces
   - Utilise ESLint : `npm run lint`

2. **Test tes changements** :
   ```bash
   npm run lint      # Pas d'erreurs
   npm run build     # Build sans erreur
   npm run dev       # Fonctionne en local
   ```

3. **Commits clairs** :
   ```bash
   git add .
   git commit -m "feat: add dark mode toggle"
   ```

   Préfixes recommandés :
   - `feat:` — Nouvelle fonctionnalité
   - `fix:` — Bug fix
   - `docs:` — Documentation
   - `style:` — Formatage, pas de logique
   - `refactor:` — Réstructurer sans changer le comportement
   - `test:` — Tests
   - `chore:` — Maintenance, dépendances

### Pousse tes Changements

```bash
git push origin feature/description-courte
```

### Crée une Pull Request

1. Clique sur "Create Pull Request" sur GitHub
2. Remplis bien le template
3. Décris tes changements clairement
4. Attends le feedback

---

## 📝 Standards de Code

### JavaScript / React

```javascript
// ✅ Bon
const calculateScore = (skills) => {
  return skills.reduce((sum, skill) => sum + skill.level, 0);
};

// ❌ Mauvais
function calculateScore(s) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum += s[i].level;
  }
  return sum;
}
```

### Nommage

- **Variables** : `camelCase` → `currentUser`, `isLoading`
- **Constantes** : `UPPER_CASE` → `MAX_RETRIES`, `API_KEY`
- **Composants** : `PascalCase` → `ExperienceCard`, `SkillBadge`
- **Fichiers** : `kebab-case` → `skill-card.jsx`, `use-count-up.js`

### React Components

```javascript
// ✅ Bon
function SkillCard({ skill, onSelect }) {
  return (
    <div className="skill-card">
      <h3>{skill.label}</h3>
      <p>{skill.description}</p>
      <button onClick={() => onSelect(skill.id)}>Voir</button>
    </div>
  );
}

export default SkillCard;
```

### CSS / Tailwind

```jsx
// ✅ Bon - Utilise Tailwind
<div className="flex gap-4 p-6 bg-white rounded-lg shadow-md">
  {/* Contenu */}
</div>

// ❌ Mauvais - Évite les styles inline sans raison
<div style={{ display: 'flex', gap: '16px', padding: '24px' }}>
  {/* Contenu */}
</div>
```

---

## 🧪 Types de Contributions

### 1. Bugfixes

Trouves un bug ? Crée une issue + une PR !

**Template issue** :
```markdown
## Description
Brève description du bug

## Étapes pour reproduire
1. ...
2. ...

## Comportement attendu
Que se passe-t-il normalement ?

## Comportement actuel
Que se passe-t-il vraiment ?

## Screenshots
Si applicable
```

### 2. Nouvelles Fonctionnalités

Avoir une idée ? Discute d'abord ! Ouvre une issue "feature request".

**Template issue** :
```markdown
## Description
Quelle fonctionnalité veux-tu ajouter ?

## Cas d'usage
Pourquoi ? Comment ça serait utile ?

## Solution proposée
Comment tu implémenterais ça ?

## Alternatives
Y a-t-il d'autres approches ?
```

### 3. Documentation

Typos ? Manques des infos ? Mets à jour la doc !

```bash
git commit -m "docs: clarify deployment steps"
```

### 4. Performance / Refactoring

Pense à faire du profiling avant :

```javascript
// Avant optimisation
console.time('render');
// ... code
console.timeEnd('render');
```

Utilise Lighthouse pour mesurer les gains.

### 5. Tests

Ajoute des tests pour les nouvelles features :

```javascript
// __tests__/ExperienceCard.test.js
import { render, screen } from '@testing-library/react';
import ExperienceCard from '@/app/components/ExperienceCard';

describe('ExperienceCard', () => {
  it('renders company name', () => {
    const exp = { company: 'Thales', position: 'Dev' };
    render(<ExperienceCard experience={exp} />);
    expect(screen.getByText('Thales')).toBeInTheDocument();
  });
});
```

---

## 📋 Checklist avant PR

- [ ] J'ai créé une branche descriptive
- [ ] Mon code suit le style du projet
- [ ] J'ai testé en local (`npm run dev`)
- [ ] J'ai lancé le linter (`npm run lint`)
- [ ] J'ai fait un build (`npm run build`)
- [ ] Pas de console errors/warnings
- [ ] Ma PR a une bonne description
- [ ] Les commits sont clairs
- [ ] Pas de dépendances inutiles ajoutées

---

## 🔄 Processus de Review

1. **Je vais regarder ta PR** dans les 7 jours
2. **Je vais demander des changements** si besoin
3. **Tu mets à jour** et on itère
4. **Merge !** Une fois c'est bon

Sois patient et ouvert au feedback 😊

---

## 🤓 Questions Fréquentes

### Q: Je dois installer quoi pour développer ?

**A**: Node.js 18+ et npm. C'est tout !

```bash
node --version  # v18.17.0+
npm --version   # 9.0.0+
```

### Q: Comment on gère les dépendances ?

**A**: Via `package.json`. Avant d'ajouter une nouvelle dépendance, demande d'abord !

```bash
npm install package-name
# Puis commit package-lock.json
```

### Q: Quels sont les navigateurs supportés ?

**A**: 
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile (iOS Safari, Chrome Android)

### Q: Est-ce qu'il y a des secrets/tokens à gérer ?

**A**: Non, ce projet est purement statique. Pas de backend, pas de API keys.

### Q: Je peux modifier le contenu (expériences, skills) ?

**A**: Oui, pour toi-même ! Pour une PR, non (c'est personnel à Paul).

---

## 🚀 Publier ta Version Customisée

Après avoir adapté le portfolio pour toi :

### 1. Change l'identité

```javascript
// app/page.js
const name = "Ton Nom";
const title = "Ton Titre";
const email = "ton-email@example.com";
```

### 2. Mets à jour les logos et images

```bash
# Remplace les fichiers dans public/
public/logos/      # Tes clients/expériences
public/images/     # Ta photo
```

### 3. Mets à jour les métadonnées

```javascript
// app/layout.js
export const metadata = {
  title: "Portfolio - Ton Nom",
  description: "Ton description",
  openGraph: {
    images: ['public/og-image.png'],
  },
};
```

### 4. Déploie sur Vercel

```bash
git push origin main
# Vercel détecte les changements et redéploie
```

---

## 📞 Besoin d'Aide ?

- **Issues** : https://github.com/Paulclaus67/portfolio-mon-portfolio/issues
- **Email** : paul.claus@viacesi.fr
- **LinkedIn** : [linkedin.com/in/paul-claus](https://www.linkedin.com/in/paul-claus/)

---

## 📚 Ressources pour Contributors

- **[Git Basics](https://git-scm.com/book/en/v2)** — Guide Git complet
- **[GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)** — Workflow GitHub
- **[Conventional Commits](https://www.conventionalcommits.org/)** — Standard de commits
- **[Next.js Contributing](https://github.com/vercel/next.js/blob/canary/CONTRIBUTING.md)** — Comment contribuer à Next.js

---

Merci d'avoir lu ! Happy contributing 🎉
