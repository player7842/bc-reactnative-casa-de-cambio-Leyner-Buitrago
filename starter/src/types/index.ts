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