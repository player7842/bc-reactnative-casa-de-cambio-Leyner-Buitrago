import type { CurrencyFormData, CurrencyFormInput } from '../schemas/currencySchema';
import type { CreateCurrencyPayload, Currency } from '../types';

/** Arma la URL de la bandera a partir de las 2 letras del país ('un' si está vacío) */
function flagUri(iso: string): string {
  const code = iso.trim().toLowerCase();
  return `https://flagcdn.com/w160/${code === '' ? 'un' : code}.png`;
}

/** Saca las 2 letras del país desde la URL de la bandera ('' si no coincide) */
function isoFromFlagUri(uri: string): string {
  const match = /\/([a-z]{2})\.png$/.exec(uri);
  return match ? match[1] : '';
}

/** Convierte los datos validados del formulario en el payload que espera la API */
export function formToPayload(data: CurrencyFormData): CreateCurrencyPayload {
  return {
    name: data.name,
    code: data.code.toUpperCase(),
    country: data.country,
    imageUri: flagUri(data.flagIso),
    buyRate: data.buyRate,
    sellRate: data.sellRate,
    trend: 'estable',
  };
}

/** Convierte una divisa de la API en los valores iniciales del formulario de edición */
export function currencyToFormValues(currency: Currency): CurrencyFormInput {
  return {
    name: currency.name,
    code: currency.code,
    country: currency.country,
    flagIso: isoFromFlagUri(currency.imageUri),
    buyRate: String(currency.buyRate),
    sellRate: String(currency.sellRate),
  };
}