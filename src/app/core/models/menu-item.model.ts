import { OptimizedImage } from './restaurant.model';

export const MENU_CATEGORY_IDS = [
  'specialites',
  'cocktails',
  'jus',
  'bieres',
  'sans-alcool',
  'boissons-chaudes',
  'liqueurs',
  'vins',
] as const;

export type MenuCategoryId = (typeof MENU_CATEGORY_IDS)[number];

export interface MenuPriceOption {
  readonly label: string;
  readonly price: number;
}

export interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly category: MenuCategoryId;
  readonly description?: string;
  readonly price?: number;
  readonly priceFrom?: boolean;
  readonly options?: readonly MenuPriceOption[];
  readonly note?: string;
  readonly image?: OptimizedImage;
  readonly featured?: boolean;
}

export interface MenuCategory {
  readonly id: MenuCategoryId;
  readonly label: string;
  readonly shortLabel: string;
  readonly description: string;
}
