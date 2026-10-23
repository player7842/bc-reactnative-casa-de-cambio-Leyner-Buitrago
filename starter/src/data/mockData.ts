import { Currency } from '../types';

export const MOCK_ITEMS: Currency[] = [
  { id: '1', code: 'USD', name: 'Dólar estadounidense', country: 'Estados Unidos', imageUri: 'https://flagcdn.com/w320/us.png', buyRate: 3910, sellRate: 3990, trend: 'sube' },
  { id: '2', code: 'EUR', name: 'Euro', country: 'Unión Europea', imageUri: 'https://flagcdn.com/w320/eu.png', buyRate: 4520, sellRate: 4640, trend: 'estable' },
  { id: '3', code: 'GBP', name: 'Libra esterlina', country: 'Reino Unido', imageUri: 'https://flagcdn.com/w320/gb.png', buyRate: 5240, sellRate: 5380, trend: 'baja' },
  { id: '4', code: 'MXN', name: 'Peso mexicano', country: 'México', imageUri: 'https://flagcdn.com/w320/mx.png', buyRate: 205, sellRate: 222, trend: 'sube' },
];