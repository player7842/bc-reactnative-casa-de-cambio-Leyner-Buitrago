import type { SortBy, SortOrder } from '../hooks/usePreferences';
import type { Currency } from '../types';

/** Devuelve una copia de la lista ordenada según las preferencias del usuario */
export function sortCurrencies(list: Currency[], sortBy: SortBy, sortOrder: SortOrder): Currency[] {
  const direction = sortOrder === 'asc' ? 1 : -1;

  return [...list].sort((a, b) => {
    if (sortBy === 'sellRate') {
      return (a.sellRate - b.sellRate) * direction;
    }
    return a.name.localeCompare(b.name, 'es') * direction;
  });
}
