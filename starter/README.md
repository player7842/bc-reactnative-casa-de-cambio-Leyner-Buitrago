# Casa de Cambio — Semana 02 (Listas, Inputs y Estilos)

**Bootcamp:** bc-reactnative · **Dominio:** Casa de cambio
**Estudiante:** Leyner Buitrago

## Descripción del dominio

Una casa de cambio compra y vende divisas. La app lista las divisas (currencies) con su precio
de compra y de venta en pesos colombianos (COP) y su tendencia, y permite buscarlas en tiempo
real. Las tasas son ficticias. Las demás entidades del dominio (transactions, rates, clients)
se irán agregando en las siguientes semanas.

## Pantallas

**HomeScreen:** título con el contador de resultados, un buscador y una lista de 12 tarjetas.
Cada tarjeta muestra la bandera, el nombre, el país, el código, los precios de compra y venta y
la tendencia. Si la búsqueda no encuentra nada, aparece un mensaje de "sin resultados".

## Decisiones de diseño

- FlatList en lugar de ScrollView para que la lista virtualice y rinda bien con muchas divisas;
  el keyExtractor usa el id.
- La búsqueda filtra por nombre, código o país e ignora mayúsculas y tildes ("dolar" encuentra
  "Dólar"). El filtrado está en useMemo y depende solo del texto buscado.
- useCallback en renderItem y en el estado vacío para no recrear funciones en cada render.
- KeyboardAvoidingView con padding en iOS y height en Android para que el teclado no tape la lista.
- Tema en src/theme (COLORS, TYPOGRAPHY, SPACING, RADIUS) con acento dorado, propio de una casa
  de cambio.
- La tendencia se muestra en verde si sube, rojo si baja y gris si está estable.
- TypeScript estricto y sin any.

## Cómo ejecutar

    cd starter
    pnpm install
    pnpm start