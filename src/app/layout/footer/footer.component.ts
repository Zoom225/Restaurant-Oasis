import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideMapPin, LucideUtensilsCrossed } from '@lucide/angular';
import { RESTAURANT } from '../../shared/data/restaurant.data';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, RouterLink, LucideMapPin, LucideUtensilsCrossed],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly restaurant = RESTAURANT;
  readonly currentYear = new Date().getFullYear();
}
