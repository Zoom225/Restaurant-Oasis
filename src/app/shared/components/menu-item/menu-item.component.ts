import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideSparkles } from '@lucide/angular';
import { MenuItem } from '../../../core/models/menu-item.model';
import { formatCfa, formatMenuItemPrice } from '../../utils/menu.utils';

@Component({
  selector: 'app-menu-item',
  imports: [NgOptimizedImage, LucideSparkles],
  templateUrl: './menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  readonly item = input.required<MenuItem>();
  readonly formatCfa = formatCfa;
  readonly formatMenuItemPrice = formatMenuItemPrice;
}
