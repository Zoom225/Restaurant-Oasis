import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideArrowUp } from '@lucide/angular';

@Component({
  selector: 'app-back-to-top',
  imports: [LucideArrowUp],
  template: `
    @if (visible()) {
      <button
        type="button"
        class="fixed bottom-5 right-5 z-30 grid size-12 place-items-center rounded-full bg-oasis-900 text-white shadow-oasis transition hover:-translate-y-1 hover:bg-mango-600"
        aria-label="Revenir en haut de la page"
        (click)="scrollToTop()"
      >
        <svg lucideArrowUp aria-hidden="true" class="size-5"></svg>
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTopComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.visible.set(window.scrollY > 600);
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
