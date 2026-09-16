import { MenuItem } from '../../core/models/menu-item.model';

const cfaFormatter = new Intl.NumberFormat('fr-FR');

export function formatCfa(price: number): string {
  return `${cfaFormatter.format(price)} F CFA`;
}

export function formatMenuItemPrice(item: MenuItem): string {
  if (item.price !== undefined) {
    return `${item.priceFrom ? 'À partir de ' : ''}${formatCfa(item.price)}`;
  }

  if (item.options?.length) {
    const prices = item.options.map((option) => option.price);
    const minimum = Math.min(...prices);
    const maximum = Math.max(...prices);

    return minimum === maximum
      ? formatCfa(minimum)
      : `${formatCfa(minimum)} — ${formatCfa(maximum)}`;
  }

  return 'Prix à confirmer';
}
