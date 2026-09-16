import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DEFAULT_SEO, SeoData } from '../config/seo.config';
import { RESTAURANT } from '../../shared/data/restaurant.data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  initialize(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.updateFromRoute());

    this.updateStructuredData();
  }

  private updateFromRoute(): void {
    let route = this.router.routerState.snapshot.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const routeSeo = route.data['seo'] as SeoData | undefined;
    const seo = routeSeo ?? DEFAULT_SEO;
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'fr_FR' });
    this.meta.updateTag({ property: 'og:site_name', content: RESTAURANT.shortName });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({
      name: 'robots',
      content: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    });

    const origin = this.getPublicOrigin();
    if (origin) {
      const canonicalUrl = `${origin}${this.router.url.split('?')[0] ?? '/'}`;
      const imageUrl = new URL(seo.image ?? DEFAULT_SEO.image ?? '/', origin).href;
      this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
      this.meta.updateTag({ property: 'og:image', content: imageUrl });
      this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
      this.updateCanonical(canonicalUrl);
    }
  }

  private getPublicOrigin(): string {
    const origin = this.document.location?.origin ?? '';
    return /localhost|127\.0\.0\.1/.test(origin) ? '' : origin;
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = url;
  }

  private updateStructuredData(): void {
    const existing = this.document.head.querySelector<HTMLScriptElement>(
      'script[data-oasis-schema]',
    );
    existing?.remove();

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: RESTAURANT.name,
      description: RESTAURANT.description,
      image: RESTAURANT.heroImages.map((image) => image.src),
      servesCuisine: RESTAURANT.cuisineTypes,
      address: {
        '@type': 'PostalAddress',
        addressLocality: RESTAURANT.location.locality,
      },
    };

    if (RESTAURANT.contact.phone) {
      schema['telephone'] = RESTAURANT.contact.phone;
    }

    if (RESTAURANT.socialLinks.length > 0) {
      schema['sameAs'] = RESTAURANT.socialLinks.map((social) => social.url);
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-oasis-schema', '');
    script.textContent = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
