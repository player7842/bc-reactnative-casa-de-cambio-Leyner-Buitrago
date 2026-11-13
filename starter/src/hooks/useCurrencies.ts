import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateCurrencyPayload, Currency, Trend } from '../types';

// ============================================================
// QUERY KEY semántica (centralizada para no equivocarse al invalidar)
// ============================================================
export const CURRENCIES_QUERY_KEY = ['currencies'] as const;

const VALID_TRENDS: Trend[] = ['sube', 'baja', 'estable'];

/** Asegura tipos correctos aunque el servidor devuelva números como texto o una tendencia rara */
function normalizeCurrency(raw: Currency): Currency {
  return {
    ...raw,
    buyRate: Number(raw.buyRate),
    sellRate: Number(raw.sellRate),
    trend: VALID_TRENDS.includes(raw.trend) ? raw.trend : 'estable',
  };
}

// ============================================================
// useCurrencies — obtener la lista de divisas (useQuery)
// ============================================================
export function useCurrencies() {
  return useQuery<Currency[]>({
    queryKey: CURRENCIES_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<Currency[]>('/currencies');
      return data.map(normalizeCurrency);
    },
  });
}

// ============================================================
// useCreateCurrency — crear una divisa (useMutation)
// ============================================================
export function useCreateCurrency() {
  const queryClient = useQueryClient();

  return useMutation<Currency, Error, CreateCurrencyPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Currency>('/currencies', payload);
      return data;
    },
    onSuccess: () => {
      // Marca la lista como "stale" y dispara el refetch automático
      queryClient.invalidateQueries({ queryKey: CURRENCIES_QUERY_KEY });
    },
  });
}