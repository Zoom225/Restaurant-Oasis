# Espace Oasis 1er

Site vitrine du restaurant-grill **Espace Oasis 1er**, situé à Grand-Bassam en Côte d’Ivoire. Le projet présente le restaurant, ses spécialités, son menu, ses boissons, sa galerie, sa localisation Google Maps et ses moyens de réservation.

Le site est une application Angular statique : il ne nécessite ni backend ni base de données.

## Fonctionnalités

- page d’accueil animée et adaptée aux mobiles ;
- présentation des plats et boissons ;
- menu filtrable par catégorie avec recherche ;
- images uniques optimisées en WebP et AVIF ;
- carte Google Maps intégrée ;
- réservation directe par WhatsApp au `07 57 23 82 17` ;
- liens Facebook et TikTok ;
- métadonnées SEO et données structurées de type `Restaurant` ;
- pages statiques précompilées pour `/`, `/menu` et `/404`.

## Technologies utilisées

- Angular 22 avec composants standalone ;
- TypeScript en mode strict ;
- Angular Router ;
- Angular Signals ;
- Tailwind CSS 4 ;
- Lucide Angular ;
- Sharp pour l’optimisation des images ;
- Vitest pour les tests ;
- Cloudflare Quick Tunnel pour les aperçus temporaires ;
- Vercel pour un éventuel hébergement permanent.

## Processus de création du site

### 1. Préparation de la structure

Le projet a été organisé en plusieurs parties :

```text
src/app/
├── core/                 Modèles, configuration et services SEO
├── layout/               En-tête, navigation mobile et pied de page
├── pages/
│   ├── home/             Page d’accueil
│   ├── menu/             Menu et filtres
│   └── not-found/        Page 404
└── shared/
    ├── components/       Composants réutilisables
    ├── data/             Informations du restaurant et produits
    └── utils/            Fonctions utilitaires
```

Les informations générales du restaurant sont centralisées dans :

```text
src/app/shared/data/restaurant.data.ts
```

Les plats, boissons, prix, descriptions et images du menu sont centralisés dans :

```text
src/app/shared/data/menu.data.ts
```

Le type d’un produit du menu est défini dans :

```text
src/app/core/models/menu-item.model.ts
```

### 2. Création de l’identité visuelle

La palette associe le vert profond, l’or, l’orange mangue, le bordeaux et des tons crème. La page d’accueil utilise des animations progressives, des mouvements 3D légers et des rotations lentes sur les plats.

Les animations respectent automatiquement le réglage système `prefers-reduced-motion` afin de rester accessibles.

### 3. Création et optimisation des images

Les visuels des plats et boissons sont enregistrés dans :

```text
src/assets/images/
```

Chaque produit dispose d’une image distincte. Les fichiers WebP et AVIF réduisent le poids du site tout en conservant une bonne qualité visuelle.

Pour relancer l’optimisation des images :

```powershell
npm run optimize:images
```

Les planches utilisées pour produire les images individuelles du menu peuvent être redécoupées avec :

```powershell
node scripts/split-menu-contact-sheets.mjs
```

### 4. Ajout du contenu commercial

Les éléments suivants ont été intégrés :

- adresse et carte Google Maps de Grand-Bassam ;
- numéro de réservation WhatsApp ;
- message WhatsApp de réservation prérempli ;
- compte TikTok officiel ;
- page Facebook officielle ;
- plats, boissons, prix et descriptions.

### 5. Vérification et compilation

Le projet exige **Node.js 24.15.0** ou une version 24 compatible plus récente. Cette version est indiquée dans `.nvmrc` et `.node-version`.

Installation et vérification :

```powershell
npm install
npm run lint
npm run test -- --run
npm run build
```

Le résultat compilé est créé dans :

```text
dist/espace-oasis/browser
```

Pour travailler localement avec rechargement automatique :

```powershell
npm start
```

Le site local est généralement disponible à l’adresse `http://localhost:4200`.

## Créer un lien temporaire pour un client distant

Cette procédure permet d’envoyer au client une URL publique en `https://….trycloudflare.com`. Le client peut consulter le site depuis un téléphone ou un ordinateur sans être connecté au même réseau.

### Limites importantes

- Un Quick Tunnel Cloudflare ne possède pas de durée automatique de 24 heures.
- Le lien fonctionne tant que le serveur local et `cloudflared` restent actifs.
- L’ordinateur doit rester allumé, connecté à Internet et ne pas se mettre en veille.
- L’adresse peut cesser de fonctionner si un processus est fermé ou si la connexion Internet est interrompue.
- Cloudflare ne garantit pas la disponibilité des Quick Tunnels gratuits.
- Pour arrêter l’aperçu après 24 heures, il faut fermer manuellement les deux processus.

### Étape 1 — Compiler la dernière version

Toujours reconstruire le site avant de l’envoyer au client :

```powershell
npm run build
```

Cela garantit que les dernières modifications sont présentes dans `dist/espace-oasis/browser`.

### Étape 2 — Installer Cloudflared

Avec `winget` :

```powershell
winget install --id Cloudflare.cloudflared -e
```

Si `winget` n’est pas disponible, télécharger le programme officiel :

```powershell
New-Item -ItemType Directory -Force -Path ".tmp/cloudflare"
Invoke-WebRequest `
  -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe" `
  -OutFile ".tmp/cloudflare/cloudflared.exe"
```

Le dossier `.tmp` est ignoré par Git et ne sera pas publié avec le projet.

### Étape 3 — Démarrer le serveur local

Le projet fournit un serveur statique compatible avec les routes Angular :

```powershell
node scripts/temporary-static-server.mjs
```

Le terminal doit afficher :

```text
Temporary preview on http://127.0.0.1:4173
```

Conserver cette fenêtre PowerShell ouverte.

### Étape 4 — Créer le tunnel public

Ouvrir une deuxième fenêtre PowerShell dans le dossier du projet.

Si Cloudflared a été installé avec `winget` :

```powershell
cloudflared tunnel --url http://127.0.0.1:4173 --no-autoupdate
```

Si le fichier a été téléchargé dans `.tmp` :

```powershell
./.tmp/cloudflare/cloudflared.exe tunnel --url http://127.0.0.1:4173 --no-autoupdate
```

Cloudflare affiche ensuite une adresse semblable à :

```text
https://exemple-aleatoire.trycloudflare.com
```

C’est ce lien qu’il faut envoyer au client.

### Étape 5 — Vérifier le lien avant l’envoi

Dans une troisième fenêtre PowerShell :

```powershell
$url = "https://exemple-aleatoire.trycloudflare.com"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing
$response.StatusCode
```

Le résultat attendu est :

```text
200
```

Vérifier également le lien sur un téléphone en utilisant les données mobiles, ce qui confirme qu’il est bien accessible depuis un réseau extérieur.

### Étape 6 — Maintenir le lien pendant 24 heures

Pendant la présentation au client :

1. laisser ouvertes les fenêtres du serveur Node et de Cloudflared ;
2. garder l’ordinateur branché au secteur ;
3. désactiver temporairement la mise en veille automatique ;
4. ne pas changer de réseau Wi-Fi ;
5. conserver l’adresse envoyée au client.

Une nouvelle exécution de Cloudflared produit généralement une nouvelle adresse. Si le tunnel est redémarré, il faut donc envoyer le nouveau lien au client.

### Étape 7 — Fermer le lien après 24 heures

Dans les deux fenêtres PowerShell actives, utiliser :

```text
Ctrl + C
```

Le premier arrêt ferme le tunnel public. Le second arrête le serveur local. Le lien transmis au client devient alors inaccessible.

Si les processus ont été lancés en arrière-plan, les retrouver ainsi :

```powershell
Get-Process cloudflared,node
```

Puis les arrêter en utilisant leurs identifiants exacts :

```powershell
Stop-Process -Id <ID_CLOUDFLARED>
Stop-Process -Id <ID_NODE>
```

Toujours vérifier les identifiants avant l’arrêt afin de ne pas fermer un autre projet Node en cours d’utilisation.

## Aperçu temporaire ou hébergement permanent ?

Le Quick Tunnel convient pour une démonstration ponctuelle. Pour un site disponible en permanence, il est préférable de déployer le projet sur Vercel ou un hébergeur équivalent.

Le fichier `vercel.json` contient déjà la configuration principale :

- framework : Angular ;
- commande de build : `npm run build` ;
- dossier publié : `dist/espace-oasis/browser` ;
- version de Node.js : 24.x.

## Sécurité

- Ne jamais placer de clé privée ou de mot de passe dans le dépôt.
- Le Quick Tunnel expose uniquement le serveur lancé sur le port `4173`.
- Ne pas utiliser ce tunnel comme hébergement de production.
- Fermer le tunnel dès que la démonstration est terminée.
- Vérifier le contenu du site avant de transmettre l’adresse publique.

## Résumé rapide du partage client

```powershell
npm run build
node scripts/temporary-static-server.mjs
```

Dans un deuxième terminal :

```powershell
./.tmp/cloudflare/cloudflared.exe tunnel --url http://127.0.0.1:4173 --no-autoupdate
```

Envoyer l’adresse `https://….trycloudflare.com`, laisser le PC allumé pendant la présentation, puis arrêter les deux commandes avec `Ctrl + C` après 24 heures.
