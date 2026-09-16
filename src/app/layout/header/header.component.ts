import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideMenu, LucideUtensilsCrossed } from '@lucide/angular';
import { filter } from 'rxjs';
import { RESTAURANT } from '../../shared/data/restaurant.data';
import { MobileNavigationComponent } from '../mobile-navigation/mobile-navigation.component';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    LucideMenu,
    LucideUtensilsCrossed,
    MobileNavigationComponent,
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly restaurant = RESTAURANT;
  readonly mobileOpen = signal(false);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.closeMobileMenu());
  }

  toggleMobileMenu(): void {
    this.mobileOpen.update((isOpen) => !isOpen);
  }

  closeMobileMenu(): void {
    this.mobileOpen.set(false);
  }
}
