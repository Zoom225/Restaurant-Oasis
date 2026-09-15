import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT, NgOptimizedImage } from '@angular/common';
import { LucideChevronLeft, LucideChevronRight, LucideX } from '@lucide/angular';
import { GalleryImage } from '../../../core/models/restaurant.model';
import { DishCardComponent } from '../dish-card/dish-card.component';

@Component({
  selector: 'app-image-lightbox',
  imports: [
    NgOptimizedImage,
    LucideChevronLeft,
    LucideChevronRight,
    LucideX,
    DishCardComponent,
  ],
  templateUrl: './image-lightbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageLightboxComponent {
  private readonly document = inject(DOCUMENT);

  readonly images = input.required<readonly GalleryImage[]>();
  readonly selectedIndex = signal<number | null>(null);
  readonly selectedImage = computed(() => {
    const index = this.selectedIndex();
    return index === null ? null : (this.images()[index] ?? null);
  });

  constructor() {
    effect((onCleanup) => {
      const originalOverflow = this.document.body.style.overflow;
      if (this.selectedIndex() !== null) {
        this.document.body.style.overflow = 'hidden';
      }
      onCleanup(() => {
        this.document.body.style.overflow = originalOverflow;
      });
    });
  }

  open(index: number): void {
    this.selectedIndex.set(index);
  }

  close(): void {
    this.selectedIndex.set(null);
  }

  previous(): void {
    const current = this.selectedIndex();
    if (current === null || this.images().length === 0) {
      return;
    }
    this.selectedIndex.set((current - 1 + this.images().length) % this.images().length);
  }

  next(): void {
    const current = this.selectedIndex();
    if (current === null || this.images().length === 0) {
      return;
    }
    this.selectedIndex.set((current + 1) % this.images().length);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  @HostListener('document:keydown.arrowleft')
  onArrowLeft(): void {
    this.previous();
  }

  @HostListener('document:keydown.arrowright')
  onArrowRight(): void {
    this.next();
  }
}
