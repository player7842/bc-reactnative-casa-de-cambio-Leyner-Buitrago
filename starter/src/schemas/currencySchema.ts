import { z } from 'zod';

// ============================================================
// Schema Zod del formulario de divisa (dominio: casa de cambio)
// ============================================================
export const currencySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(40, 'Máximo 40 caracteres'),

    // Código ISO 4217: exactamente 3 letras (USD, EUR, COP…)
    code: z
      .string()
      .trim()
      .regex(/^[A-Za-z]{3}$/, 'El código debe tener exactamente 3 letras'),

    country: z
      .string()
      .trim()
      .min(2, 'El país o región es obligatorio')
      .max(40, 'Máximo 40 caracteres'),

    // Código del país para la bandera: 2 letras, o vacío para usar la bandera por defecto
    flagIso: z.string().trim().regex(/^([A-Za-z]{2})?$/, 'Usa 2 letras (ej. us) o déjalo vacío'),

    // Campos numéricos: el TextInput entrega texto y z.coerce.number() lo convierte
    buyRate: z.coerce
      .number({ error: 'Ingresa un número válido (usa punto para los decimales)' })
      .positive('El precio de compra debe ser mayor que 0'),

    sellRate: z.coerce
      .number({ error: 'Ingresa un número válido (usa punto para los decimales)' })
      .positive('El precio de venta debe ser mayor que 0'),
  })
  // Regla de negocio: una casa de cambio no puede vender más barato de lo que compra
  .refine((data) => data.sellRate >= data.buyRate, {
    message: 'El precio de venta no puede ser menor al de compra',
    path: ['sellRate'],
  });

// Lo que escribe el usuario (los números llegan como texto) y lo que sale ya validado.
// Ambos tipos se generan desde el schema: no hay interfaz manual duplicada.
export type CurrencyFormInput = z.input<typeof currencySchema>;
export type CurrencyFormData = z.infer<typeof currencySchema>;