# 📚 Documentation Guide

Structure et guide de la documentation du portfolio.

---

## 📁 Fichiers de Documentation

### `README.md` ⭐ (PRINCIPAL)
- **Public cible** : Tout le monde (recruteurs, développeurs, visiteurs)
- **Contenu** : Vue d'ensemble du projet, features principales, stack tech
- **Sections** : 
  - Intro + liens rapides
  - Fonctionnalités
  - Stack technique
  - Installation rapide
  - Architecture simple
  - Déploiement
  - Personnalisation basique
  - Contact & Licence

### `GETTING_STARTED.md` 🚀
- **Public cible** : Développeurs locaux
- **Contenu** : Guide pas-à-pas pour démarrer en local
- **Sections** :
  - Prérequis
  - Installation complète
  - Scripts disponibles
  - Structure des dossiers
  - Premiers pas
  - Personnalisation du contenu & design
  - Déploiement Vercel
  - Troubleshooting
  - Resources utiles

### `ARCHITECTURE.md` 🏗️
- **Public cible** : Développeurs qui vont modifier le code
- **Contenu** : Structure technique, patterns utilisés, bonnes pratiques
- **Sections** :
  - Structure du projet
  - Architecture du code (mono-fichier)
  - Data flow dans page.js
  - Système de styles
  - État et hooks
  - Performance optimizations
  - Intégrations externes (Vercel)
  - Refactoring futur
  - Testing (example)
  - Sécurité

### `CONTRIBUTING.md` 🤝
- **Public cible** : Contributors (ou toi-même si tu forkes)
- **Contenu** : Comment contribuer, standards de code, workflow
- **Sections** :
  - Permissions (ce qu'on peut/ne peut pas faire)
  - Configuration locale
  - Workflow de développement
  - Standards de code
  - Types de contributions
  - Checklist avant PR
  - Processus de review
  - FAQ
  - Comment publier ta version

---

## 📋 Autres Fichiers (Existants)

### `CHANGELOG.md`
- Historique des versions
- À mettre à jour après chaque release
- Format : [Keep a Changelog](https://keepachangelog.com/)

### `DEPLOYMENT_CHECKLIST.md`
- Checklist avant déploiement production
- À relire avant chaque push sur main

### `IMPROVEMENTS.md`
- Idées d'améliorations futures
- Refactoring suggéré
- Features en backlog

### `QUICK_TIPS.md`
- Tips & tricks pour développer plus vite
- Raccourcis, astuces VSCode, etc.

### `USAGE_GUIDE.md`
- Guide d'utilisation du portfolio (pour recruteurs)
- Features expliquées

---

## 🎯 Qui Lit Quoi ?

| Personne | Fichiers |
|----------|----------|
| **Recruteur** | README.md, USAGE_GUIDE.md (puis visite le site) |
| **Visiteur curieux** | README.md (premiers 30 secondes) |
| **Dev qui veut forker** | README.md → GETTING_STARTED.md → ARCHITECTURE.md |
| **Dev qui contribue** | GETTING_STARTED.md → CONTRIBUTING.md → ARCHITECTURE.md |
| **Paul (mainteneur)** | DEPLOYMENT_CHECKLIST.md, CHANGELOG.md, IMPROVEMENTS.md |

---

## 📝 Bonnes Pratiques de Documentation

### 1. Sois Clair et Concis

```markdown
❌ "Vous devez installer Node.js si vous ne l'avez pas déjà, ce qui est une plateforme de runtime JavaScript."

✅ "Installe [Node.js 18+](https://nodejs.org)"
```

### 2. Utilise des Headers Hiérarchiquement

```markdown
# Main Title (H1)           ← Un seul par fichier
## Major Section (H2)
### Subsection (H3)
#### Detail (H4)            ← Max H4, pas plus
```

### 3. Code Blocks avec Langage

```markdown
❌ 
```
npm install
```

✅
```bash
npm install
```
```

### 4. Listes et Tables

```markdown
- Point 1
- Point 2
  - Sous-point 2.1
  - Sous-point 2.2

| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Valeur 1  | Valeur 2  |
```

### 5. Emojis pour l'Accessibilité Visuelle

```markdown
🚀 — Démarrage, lancement
✅ — Bon, correct
❌ — Mauvais, à éviter
⚠️ — Attention, important
📁 — Fichiers, dossiers
💡 — Conseil, tip
🔧 — Technique, configuration
🐛 — Bug
📊 — Statistiques, métriques
```

### 6. Liens Internes

```markdown
❌ "Vois la section de personnalisation"

✅ "Vois [Personnalisation](#personnalisation)"
   Ou pour un autre fichier : "[ARCHITECTURE.md](ARCHITECTURE.md#refactoring-futur)"
```

### 7. Sections "À Venir"

```markdown
## 🚧 Work in Progress

Cette section sera mise à jour bientôt.

- [ ] Feature 1
- [ ] Feature 2
```

---

## 🔄 Workflow de Mise à Jour

Quand tu modifies le code et que la doc change :

1. **Identifie les fichiers affectés** :
   - Ajout feature → `ARCHITECTURE.md` + `IMPROVEMENTS.md`
   - Bug fix → `CHANGELOG.md`
   - Nouveau script → `GETTING_STARTED.md`

2. **Mets à jour les fichiers** :
   ```bash
   # Exemple : nouveau script
   # app/page.js → ajout de `npm run analyze`
   # Mets à jour : GETTING_STARTED.md → section "Scripts Disponibles"
   ```

3. **Mets à jour CHANGELOG.md** :
   ```markdown
   ## [2.1.0] - 2024-12-12

   ### Added
   - New analysis script (npm run analyze)
   
   ### Changed
   - Updated documentation
   ```

4. **Commit** :
   ```bash
   git commit -m "docs: update scripts documentation"
   ```

---

## 🧹 Maintenance Regular

### Quarterly (Tous les 3 mois)

- [ ] Vérifier les liens (pas de 404)
- [ ] Actualiser les versions (Node, Next, etc.)
- [ ] Archiver les anciennes sections

### Annuellement

- [ ] Réécrire l'intro si besoin
- [ ] Actualiser le CHANGELOG depuis le début de l'année
- [ ] Revoir le IMPROVEMENTS.md

---

## 🔗 Répartition des Contenus

### Par Thème

**Installation & Setup** → `GETTING_STARTED.md`
- Prérequis
- Pas-à-pas installation
- Scripts disponibles

**Architecture & Code** → `ARCHITECTURE.md`
- Structure des fichiers
- Patterns utilisés
- Hooks et état
- Performance

**Contribution** → `CONTRIBUTING.md`
- Standards de code
- Workflow Git
- Types de contributions
- Checklist PR

**Features du Portfolio** → `README.md`, `USAGE_GUIDE.md`
- Qu'est-ce que c'est
- Comment ça marche
- Comment l'utiliser

**Historique** → `CHANGELOG.md`
- Versions passées
- Breaking changes
- Améliorations

---

## 📌 Convention de Commits pour Docs

```bash
# Documentation
git commit -m "docs: update installation guide"

# Typos, formatage
git commit -m "docs: fix typos in README"

# Ajouter une section
git commit -m "docs: add troubleshooting section"

# Restructurer
git commit -m "docs: reorganize architecture documentation"
```

---

## ✨ Templates Utiles

### Nouveau fichier de doc

```markdown
# [Titre Clair]

[Intro courte (1-2 phrases)]

---

## Table of Contents

- [Section 1](#section-1)
- [Section 2](#section-2)

---

## Section 1

Contenu...

## Section 2

Contenu...

---

## Ressources

- [Lien 1](url)
- [Lien 2](url)

---

Questions ? Ouvre une issue 👋
```

### Section "Setup"

```markdown
### Installation

#### Prérequis
- Node.js 18+
- npm 9+

#### Étapes
1. Clone : `git clone ...`
2. Install : `npm install`
3. Run : `npm run dev`

Accès : http://localhost:3000
```

---

## 🎓 Ressources de Documentation

- **[GitHub README Best Practices](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes)**
- **[Write the Docs](https://www.writethedocs.org/)** — Communauté docs
- **[Markdown Guide](https://www.markdownguide.org/)**
- **[Semantic Versioning](https://semver.org/lang/fr/)** — Versioning

---

Merci de rendre la doc à jour ! 📚
