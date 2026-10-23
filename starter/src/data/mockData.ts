import { Currency } from '../types';

const flag = (iso: string): string => `https://flagcdn.com/w160/${iso}.png`;

export const CURRENCIES: Currency[] = [
  { id: '1', code: 'USD', name: 'Dólar estadounidense', country: 'Estados Unidos', imageUri: flag('us'), buyRate: 3910, sellRate: 3990, trend: 'sube' },
  { id: '2', code: 'EUR', name: 'Euro', country: 'Unión Europea', imageUri: flag('eu'), buyRate: 4520, sellRate: 4640, trend: 'estable' },
  { id: '3', code: 'GBP', name: 'Libra esterlina', country: 'Reino Unido', imageUri: flag('gb'), buyRate: 5240, sellRate: 5380, trend: 'baja' },
  { id: '4', code: 'MXN', name: 'Peso mexicano', country: 'México', imageUri: flag('mx'), buyRate: 205, sellRate: 222, trend: 'sube' },
  { id: '5', code: 'BRL', name: 'Real brasileño', country: 'Brasil', imageUri: flag('br'), buyRate: 705, sellRate: 745, trend: 'baja' },
  { id: '6', code: 'JPY', name: 'Yen japonés', country: 'Japón', imageUri: flag('jp'), buyRate: 25.6, sellRate: 27.4, trend: 'estable' },
  { id: '7', code: 'CAD', name: 'Dólar canadiense', country: 'Canadá', imageUri: flag('ca'), buyRate: 2840, sellRate: 2960, trend: 'sube' },
  { id: '8', code: 'CHF', name: 'Franco suizo', country: 'Suiza', imageUri: flag('ch'), buyRate: 4780, sellRate: 4930, trend: 'estable' },
  { id: '9', code: 'PEN', name: 'Sol peruano', country: 'Perú', imageUri: flag('pe'), buyRate: 1030, sellRate: 1090, trend: 'baja' },
  { id: '10', code: 'CLP', name: 'Peso chileno', country: 'Chile', imageUri: flag('cl'), buyRate: 4.1, sellRate: 4.6, trend: 'estable' },
  { id: '11', code: 'ARS', name: 'Peso argentino', country: 'Argentina', imageUri: flag('ar'), buyRate: 2.8, sellRate: 3.6, trend: 'baja' },
  { id: '12', code: 'CNY', name: 'Yuan chino', country: 'China', imageUri: flag('cn'), buyRate: 540, sellRate: 575, trend: 'sube' },
];