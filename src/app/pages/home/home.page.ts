import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideChefHat,
  LucideFish,
  LucideFlame,
  LucideGlassWater,
  LucideMapPin,
  LucideSparkles,
  LucideUtensilsCrossed,
} from '@lucide/angular';
import { MENU_ITEMS } from '../../shared/data/menu.data';
import { RESTAURANT } from '../../shared/data/restaurant.data';
import { ImageLightboxComponent } from '../../shared/components/image-lightbox/image-lightbox.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-home-page',
  imports: [
    NgOptimizedImage,
    RouterLink,
    LucideArrowRight,
    LucideChefHat,
    LucideFish,
    LucideFlame,
    LucideGlassWater,
    LucideMapPin,
    LucideSparkles,
    LucideUtensilsCrossed,
    ImageLightboxComponent,
    SectionTitleComponent,
  ],
  templateUrl: './home.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly restaurant = RESTAURANT;
  readonly featuredItems = MENU_ITEMS.filter((item) => item.featured);
}
