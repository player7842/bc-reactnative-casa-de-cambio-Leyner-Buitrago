import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv';
import { storage } from '../storage/mmkv';

// ─── Claves de preferencias (evitar strings sueltos por toda la app) ───────────
const PREF_KEYS = {
  SORT_BY: 'pref_sortBy',
  SORT_ORDER: 'pref_sortOrder',
  COMPACT_MODE: 'pref_compactMode',
} as const;

// ─── Tipos de las preferencias (dominio: casa de cambio) ───────────────────────
export type SortBy = 'name' | 'sellRate';
export type SortOrder = 'asc' | 'desc';

// MMKV guarda texto: se valida lo leído para no devolver un valor inválido
function toSortBy(value: string | undefined): SortBy {
  return value === 'sellRate' ? 'sellRate' : 'name';
}

function toSortOrder(value: string | undefined): SortOrder {
  return value === 'desc' ? 'desc' : 'asc';
}

// ─── Hook principal ─────────────────────────────────────────────────────────────
// Encapsula toda la lógica de MMKV: las pantallas solo usan estos valores y setters.
// Los hooks de react-native-mmkv son reactivos y sincrónicos (sin async/await): al cambiar
// un valor, todos los componentes que lo usan se actualizan al instante.
export function usePreferences() {
  const [sortBy, setSortBy] = useMMKVString(PREF_KEYS.SORT_BY, storage);
  const [sortOrder, setSortOrder] = useMMKVString(PREF_KEYS.SORT_ORDER, storage);
  const [compactMode, setCompactMode] = useMMKVBoolean(PREF_KEYS.COMPACT_MODE, storage);

  return {
    // Criterio de orden de la lista de divisas
    sortBy: toSortBy(sortBy),
    setSortBy: (value: SortBy): void => setSortBy(value),

    // Ascendente o descendente
    sortOrder: toSortOrder(sortOrder),
    setSortOrder: (value: SortOrder): void => setSortOrder(value),

    // Modo compacto: menos información por tarjeta
    compactMode: compactMode ?? false,
    setCompactMode: (value: boolean): void => setCompactMode(value),
  };
}
