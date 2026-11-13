export type Trend = 'sube' | 'baja' | 'estable';

export interface Currency {
  id: string;
  code: string;
  name: string;
  country: string;
  imageUri: string;
  buyRate: number;
  sellRate: number;
  trend: Trend;
}

// Lo que se envía en el POST: la divisa sin `id` (lo asigna el servidor)
export type CreateCurrencyPayload = Omit<Currency, 'id'>;