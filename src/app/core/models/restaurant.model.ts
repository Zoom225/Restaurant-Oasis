export interface OptimizedImage {
  readonly src: string;
  readonly avifSrc: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface GalleryImage extends OptimizedImage {
  readonly id: string;
  readonly caption: string;
  readonly category: 'dish' | 'drink' | 'ambience' | 'menu';
}

export interface RestaurantContact {
  readonly phone: string;
  readonly whatsapp: string;
  readonly email: string;
}

export interface RestaurantLocation {
  readonly locality: string;
  readonly directions: string;
  readonly mapUrl: string;
}

export interface OpeningHours {
  readonly days: string;
  readonly hours: string;
}

export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

export interface Restaurant {
  readonly name: string;
  readonly shortName: string;
  readonly tagline: string;
  readonly description: string;
  readonly cuisineTypes: readonly string[];
  readonly contact: RestaurantContact;
  readonly location: RestaurantLocation;
  readonly openingHours: readonly OpeningHours[];
  readonly socialLinks: readonly SocialLink[];
  readonly logo: OptimizedImage;
  readonly heroImages: readonly OptimizedImage[];
  readonly gallery: readonly GalleryImage[];
  readonly menuPosters: readonly GalleryImage[];
}
