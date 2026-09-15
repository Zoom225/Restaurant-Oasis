import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideImages,
  LucideRotateCcw,
  LucideSearch,
  LucideUtensilsCrossed,
} from '@lucide/angular';
import { MenuCategoryId } from '../../core/models/menu-item.model';
import { ImageLightboxComponent } from '../../shared/components/image-lightbox/image-lightbox.component';
import { MenuItemComponent } from '../../shared/components/menu-item/menu-item.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { MENU_CATEGORIES, MENU_ITEMS } from '../../shared/data/menu.data';
import { RESTAURANT } from '../../shared/data/restaurant.data';
import { normalizeSearchText } from '../../shared/utils/text-normalization.util';

type MenuFilter = MenuCategoryId | 'all';

@Component({
  selector: 'app-menu-page',
  imports: [
    RouterLink,
    LucideArrowLeft,
    LucideImages,
    LucideRotateCcw,
    LucideSearch,
    LucideUtensilsCrossed,
    ImageLightboxComponent,
    MenuItemComponent,
    SectionTitleComponent,
  ],
  templateUrl: './menu.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly categories = MENU_CATEGORIES;
  readonly restaurant = RESTAURANT;
  readonly searchTerm = signal('');
  readonly activeCategory = signal<MenuFilter>('all');

  readonly filteredItems = computed(() => {
    const query = normalizeSearchText(this.searchTerm().trim());
    const category = this.activeCategory();

    return MENU_ITEMS.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const searchableText = normalizeSearchText(
        [
          item.name,
          item.description ?? '',
          item.note ?? '',
          ...(item.options?.map((option) => option.label) ?? []),
        ].join(' '),
      );
      return matchesCategory && (!query || searchableText.includes(query));
    });
  });

  readonly groupedItems = computed(() =>
    this.categories
      .map((category) => ({
        category,
        items: this.filteredItems().filter((item) => item.category === category.id),
      }))
      .filter((group) => group.items.length > 0),
  );

  constructor() {
    const initialSearch = this.route.snapshot.queryParamMap.get('recherche');
    if (initialSearch) {
      this.searchTerm.set(initialSearch);
    }
  }

  onSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.searchTerm.set(target.value);
    }
  }

  selectCategory(category: MenuFilter): void {
    this.activeCategory.set(category);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.activeCategory.set('all');
  }
}
