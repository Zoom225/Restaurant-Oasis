import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideArrowRight, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-mobile-navigation',
  imports: [RouterLink, RouterLinkActive, LucideArrowRight, LucideX],
  templateUrl: './mobile-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigationComponent {
  readonly closed = output();
}
