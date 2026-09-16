import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideMaximize2 } from '@lucide/angular';
import { GalleryImage } from '../../../core/models/restaurant.model';

@Component({
  selector: 'app-dish-card',
  imports: [NgOptimizedImage, LucideMaximize2],
  template: `
    <button
      type="button"
      class="group relative block h-full min-h-72 w-full overflow-hidden rounded-[2rem] bg-oasis-950 text-left shadow-soft"
      [attr.aria-label]="'Agrandir : ' + image().caption"
      (click)="selected.emit()"
    >
      <img
        [ngSrc]="image().src"
        [alt]="image().alt"
        class="object-cover transition duration-700 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        fill
        loading="lazy"
      />
      <span class="absolute inset-0 bg-gradient-to-t from-oasis-950/90 via-oasis-950/5 to-transparent"></span>
      <span class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
        <span class="font-display text-2xl font-bold">{{ image().caption }}</span>
        <span class="grid size-11 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-mango-500">
          <svg lucideMaximize2 aria-hidden="true" class="size-5"></svg>
        </span>
      </span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishCardComponent {
  readonly image = input.required<GalleryImage>();
  readonly selected = output();
}
