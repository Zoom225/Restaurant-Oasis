# Espace Oasis

Site officiel frontend d’Espace Oasis, restaurant-grill à Bassam. L’application est entièrement statique : aucun backend, aucune API applicative et aucune base de données.

## Technologies

- Angular 22 en composants standalone et TypeScript strict
- Angular Router avec routes chargées à la demande
- Angular Signals pour le menu mobile, la recherche et les filtres
- Tailwind CSS 4 pour toute la présentation
- Lucide Angular pour les icônes
- Vitest via le builder de tests Angular
- Prérendu statique des routes `/`, `/menu` et `/404`
- Déploiement Vercel depuis GitHub

## Prérequis

- Node.js 24.15.0 ou version 24 plus récente compatible
- npm 11+
- Git
- GitHub CLI pour le workflow issues/branches/pull requests

La version Node attendue est enregistrée dans `.node-version` et `.nvmrc`.

## Installation et vérification

```bash
npm install
npm run lint
npm run test -- --run
npm run build
```

Le builder Angular 22 utilise Vitest nativement. Le petit lanceur `scripts/run-tests.mjs` conserve la commande `--run` du cahier des charges, option qui n’est plus exposée directement par la CLI Angular.

Pour travailler localement :

```bash
npm start
```

## Architecture

```text
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   ├── models/
│   │   └── services/
│   ├── layout/
│   │   ├── footer/
│   │   ├── header/
│   │   └── mobile-navigation/
│   ├── pages/
│   │   ├── home/
│   │   ├── menu/
│   │   └── not-found/
│   └── shared/
│       ├── components/
│       ├── data/
│       └── utils/
└── assets/images/
    ├── dishes/
    ├── drinks/
    ├── hero/
    ├── logo/
    ├── menu/
    └── team/
```

Les informations publiques sont centralisées dans `restaurant.data.ts` et la carte dans `menu.data.ts`. Une coordonnée non confirmée reste vide dans les données et n’est pas rendue dans le site.

## Images

Les sources fournies sont classées par usage. `npm run optimize:images` produit les déclinaisons WebP et AVIF, corrige l’orientation et recadre les marques de téléphone présentes en bas de certaines photos. Les fichiers sources ne sont pas copiés dans le build public.

## SEO statique

Le build ajoute les titres, descriptions, Open Graph, Twitter Cards et les données structurées Schema.org `Restaurant`. Il génère aussi un vrai `404.html` pour Vercel.

Le domaine public n’étant pas encore confirmé, les URL canoniques sont calculées depuis le domaine réel dans le navigateur. Lors d’un déploiement Vercel, `scripts/finalize-static-build.mjs` utilise `VERCEL_PROJECT_PRODUCTION_URL` pour produire `sitemap.xml` et compléter `robots.txt`. En dehors de Vercel, définir `SITE_URL` avant le build :

```bash
SITE_URL=https://domaine-confirme.example npm run build
```

## Vercel

La configuration vérifiée est enregistrée dans `vercel.json` :

- Framework Preset : Angular
- Install Command : `npm install`
- Build Command : `npm run build`
- Output Directory : `dist/espace-oasis/browser`
- Node.js : 24.x

Aucune réécriture SPA globale n’est nécessaire : `/` et `/menu` sont des fichiers prérendus et `404.html` est servi par Vercel pour les URL inconnues.

Avec l’intégration Git Vercel, chaque pull request reçoit un déploiement Preview et toute fusion dans `main` déclenche la Production.

## Workflow GitHub

1. Créer ou choisir une issue.
2. Créer la branche associée.
3. Utiliser des commits conventionnels.
4. Ouvrir une pull request vers `main`.
5. Attendre le workflow `Qualité frontend` et la Preview Vercel.
6. Vérifier puis fusionner.

Branches prévues :

- `feature/1-angular-setup`
- `feature/2-brand-assets`
- `feature/3-homepage`
- `feature/4-menu-page`
- `feature/5-seo-accessibility`
- `test/6-tests-documentation`
- `chore/7-vercel-deployment`

Après authentification avec `gh auth login`, les sept issues peuvent être créées de façon idempotente avec :

```powershell
./scripts/create-github-issues.ps1
```

## Informations encore à confirmer

Ces éléments ne sont volontairement pas publiés : numéro de téléphone, WhatsApp, horaires, lien Google Maps exact, réseaux sociaux et identité/photo de la responsable. Ils peuvent être ajoutés uniquement après confirmation officielle.
