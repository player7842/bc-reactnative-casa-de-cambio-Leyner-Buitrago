# Casa de Cambio — Semana 03 (React Navigation 7)

**Bootcamp:** bc-reactnative · **Dominio:** Casa de cambio
**Entidades del dominio:** currencies, transactions, rates, clients
**Estudiante:** Leyner Buitrago

## Descripción del dominio

Una casa de cambio compra y vende divisas. La app lista las divisas (currencies) con su precio de
compra y de venta en pesos colombianos (COP), permite buscarlas y ver el detalle de cada una. Las tasas
son ficticias. Las demás entidades (transactions, rates, clients) se agregarán en semanas futuras.

## Implementación

- **Tab Navigator** con dos pestañas: *Divisas* y *Favoritas*, con íconos de Ionicons que cambian
  entre relleno y contorno según la pestaña activa, y color activo `#61DAFB`.
- **Stack anidado** dentro de *Divisas*: lista (`HomeList`) → detalle (`HomeDetail`). La barra de
  pestañas sigue visible en el detalle y el título del header es el nombre de la divisa.
- **Params tipados:** `HomeDetail` recibe `id`, `name`, `code`, `country`, `imageUri`, `buyRate`,
  `sellRate` y `trend`, definidos en `HomeStackParamList`. El detalle los lee con `useRoute`.
- **Favoritas:** lista estática de 4 divisas.
- TypeScript estricto, sin `any`.

## Capturas

| Divisas | Detalle | Favoritas |
|---|---|---|
| ![Divisas](screenshots/semana-03-home.png) | ![Detalle](screenshots/semana-03-detail.png) | ![Favoritas](screenshots/semana-03-favorites.png) |

## Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```