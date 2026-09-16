export interface SeoData {
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly noIndex?: boolean;
}

export const DEFAULT_SEO: SeoData = {
  title: 'Espace Oasis | Restaurant africain à Bassam',
  description:
    'Découvrez Espace Oasis, restaurant-grill à Bassam : cuisine africaine, poissons, fruits de mer, grillades et cocktails tropicaux.',
  image: '/assets/images/hero/social-preview.webp',
};
