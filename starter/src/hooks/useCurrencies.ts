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


// ============================================================
// useCurrencyById — obtener UNA divisa del servidor (para precargar el formulario de edición)
// ============================================================
export function useCurrencyById(id: string) {
  return useQuery<Currency>({
    // ['currencies', id]: al invalidar ['currencies'] también se refresca esta
    queryKey: [...CURRENCIES_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Currency>(`/currencies/${id}`);
      return normalizeCurrency(data);
    },
    enabled: id !== '',
  });
}

// ============================================================
// useUpdateCurrency — actualizar una divisa (useMutation con PUT)
// ============================================================
interface UpdateCurrencyVariables {
  id: string;
  payload: CreateCurrencyPayload;
}

export function useUpdateCurrency() {
  const queryClient = useQueryClient();

  return useMutation<Currency, Error, UpdateCurrencyVariables>({
    mutationFn: async ({ id, payload }) => {
      const { data } = await apiClient.put<Currency>(`/currencies/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      // Invalida la lista y también cada divisa individual (comparten el prefijo 'currencies')
      queryClient.invalidateQueries({ queryKey: CURRENCIES_QUERY_KEY });
    },
  });
}