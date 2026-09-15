import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowLeft, LucideLeaf, LucideUtensilsCrossed } from '@lucide/angular';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, LucideArrowLeft, LucideLeaf, LucideUtensilsCrossed],
  templateUrl: './not-found.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  readonly statusCode = 404;
}
