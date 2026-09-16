import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `
    <div [class]="align() === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'">
      <p class="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-mango-600">
        {{ eyebrow() }}
      </p>
      <h2 class="text-balance font-display text-4xl font-bold leading-tight text-oasis-950 sm:text-5xl lg:text-6xl">
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="mt-5 text-pretty text-base leading-8 text-oasis-800/80 sm:text-lg">
          {{ description() }}
        </p>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input('');
  readonly align = input<'left' | 'center'>('left');
}
