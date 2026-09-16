$ErrorActionPreference = 'Stop'

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw 'GitHub CLI est introuvable. Installez gh puis relancez ce script.'
}

gh auth status

$issues = @(
  @{
    Title = 'Initialiser l’architecture Angular standalone'
    Body = @'
Configurer Angular, TypeScript strict, les composants standalone, Angular Router, Signals, Tailwind CSS, Lucide Angular et Vitest.

Branche : `feature/1-angular-setup`
'@
  },
  @{
    Title = 'Intégrer l’identité visuelle et optimiser les médias'
    Body = @'
Classer les ressources du restaurant, intégrer le logo et générer les déclinaisons WebP/AVIF sans publier les photos non confirmées.

Branche : `feature/2-brand-assets`
'@
  },
  @{
    Title = 'Construire la page d’accueil responsive'
    Body = @'
Créer la page d’accueil, les sections de présentation, les signatures, la galerie et la localisation avec une interface tropicale accessible.

Branche : `feature/3-homepage`
'@
  },
  @{
    Title = 'Créer la carte consultable et filtrable'
    Body = @'
Créer `/menu`, centraliser les données confirmées et ajouter la recherche ainsi que les filtres de catégories avec Angular Signals.

Branche : `feature/4-menu-page`
'@
  },
  @{
    Title = 'Finaliser le SEO et l’accessibilité'
    Body = @'
Ajouter les métadonnées, Schema.org Restaurant, le prérendu statique, robots, sitemap, favicon et la page 404 personnalisée.

Branche : `feature/5-seo-accessibility`
'@
  },
  @{
    Title = 'Ajouter les tests et la documentation'
    Body = @'
Couvrir les comportements critiques avec Vitest, documenter l’installation et automatiser les contrôles GitHub Actions.

Branche : `test/6-tests-documentation`
'@
  },
  @{
    Title = 'Configurer et vérifier le déploiement Vercel'
    Body = @'
Configurer le preset Angular, le build statique, le véritable dossier de sortie, les Preview Deployments et la Production après fusion.

Branche : `chore/7-vercel-deployment`
'@
  }
)

foreach ($issue in $issues) {
  $query = '"{0}" in:title' -f $issue.Title
  $existing = gh issue list --state all --search $query --json title |
    ConvertFrom-Json |
    Where-Object { $_.title -eq $issue.Title }

  if ($existing) {
    Write-Host "Issue déjà présente : $($issue.Title)"
    continue
  }

  gh issue create --title $issue.Title --body $issue.Body
}
