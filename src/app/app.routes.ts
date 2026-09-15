import { Routes } from '@angular/router';
import { SeoData } from './core/config/seo.config';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.page').then((module) => module.HomePageComponent),
    data: {
      seo: {
        title: 'Espace Oasis | Restaurant africain à Bassam',
        description:
          'Bienvenue à Espace Oasis, restaurant-grill à Bassam : spécialités africaines, poissons, fruits de mer et cocktails tropicaux.',
      } satisfies SeoData,
    },
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.page').then((module) => module.MenuPageComponent),
    data: {
      seo: {
        title: 'La carte | Espace Oasis à Bassam',
        description:
          'Consultez la carte complète d’Espace Oasis : spécialités, cocktails, jus naturels, boissons, liqueurs et vins.',
      } satisfies SeoData,
    },
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.page').then(
        (module) => module.NotFoundPageComponent,
      ),
    data: {
      seo: {
        title: 'Page introuvable | Espace Oasis',
        description: 'Cette page n’existe pas ou a été déplacée.',
        noIndex: true,
      } satisfies SeoData,
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.page').then(
        (module) => module.NotFoundPageComponent,
      ),
    data: {
      seo: {
        title: 'Page introuvable | Espace Oasis',
        description: 'Cette page n’existe pas ou a été déplacée.',
        noIndex: true,
      } satisfies SeoData,
    },
  },
];
