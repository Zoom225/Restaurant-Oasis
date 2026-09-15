import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/services/seo.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { RESTAURANT } from './shared/data/restaurant.data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BackToTopComponent],
  template: `
    <a
      class="sr-only fixed left-4 top-4 z-[100] rounded-full bg-gold-500 px-5 py-3 font-bold text-wine-950 focus:not-sr-only"
      href="#main-content"
    >
      Aller au contenu
    </a>
    <app-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <a
      [href]="restaurant.contact.whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Réserver sur WhatsApp au 07 57 23 82 17"
      class="whatsapp-reservation fixed bottom-5 left-5 z-30 flex items-center gap-3 rounded-full bg-[#25d366] p-3 text-white shadow-2xl transition hover:-translate-y-1 hover:bg-[#1fbd5b] sm:px-5 sm:py-3"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" class="size-7 shrink-0 fill-current">
        <path d="M16.04 3C8.87 3 3.05 8.76 3.05 15.86c0 2.26.6 4.47 1.72 6.4L3 28.67l6.6-1.72a13.1 13.1 0 0 0 6.43 1.63h.01c7.16 0 13-5.77 13-12.86C29.04 8.63 23.21 3 16.04 3Zm0 23.4a10.9 10.9 0 0 1-5.55-1.5l-.4-.23-3.92 1.02 1.05-3.78-.26-.39a10.57 10.57 0 0 1-1.7-5.66c0-5.88 4.84-10.67 10.79-10.67 5.94 0 10.78 4.72 10.78 10.6 0 5.89-4.84 10.61-10.79 10.61Zm5.92-7.95c-.32-.16-1.92-.94-2.22-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.22-.38.24-.7.08-.33-.16-1.37-.5-2.6-1.58a9.64 9.64 0 0 1-1.8-2.21c-.19-.32-.02-.5.14-.66.15-.14.33-.37.49-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.74-1-2.38-.26-.63-.53-.54-.73-.55h-.62c-.22 0-.57.08-.87.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.11 1.32 3.32c.16.21 2.28 3.44 5.52 4.82.77.33 1.37.53 1.84.68.77.24 1.47.21 2.03.13.62-.1 1.92-.78 2.19-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38Z" />
      </svg>
      <span class="hidden text-left leading-tight sm:block">
        <span class="block text-[0.65rem] font-extrabold uppercase tracking-wider text-white/80">Réserver sur WhatsApp</span>
        <span class="block font-extrabold">07 57 23 82 17</span>
      </span>
    </a>
    <app-back-to-top />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly seoService = inject(SeoService);
  readonly restaurant = RESTAURANT;

  constructor() {
    this.seoService.initialize();
  }
}
