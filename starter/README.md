# Casa de Cambio — Semana 01 (Core Components y Flexbox)

**Bootcamp:** bc-reactnative · **Dominio asignado:** Casa de cambio
**Entidades del dominio:** currencies, transactions, rates, clients
**Estudiante:** Leyner Buitrago

## ¿De qué trata?

App móvil de una sola pantalla para una casa de cambio. Muestra en tarjetas las divisas que maneja
(entidad `currencies`) con su país, su código, el precio al que la casa **compra** y al que **vende**
(en pesos colombianos, COP) y la tendencia del día. Las tasas son ficticias y solo sirven para la demo
de la actividad. Las demás entidades del dominio (transactions, rates y clients) se irán agregando en
las siguientes semanas.

## Qué cubre la actividad

- Pantalla principal con un header con el nombre del dominio y un `ScrollView` con las tarjetas.
- Tarjetas de divisas con datos coherentes al dominio (mínimo pedido: 3).
- Cada tarjeta incluye una imagen (la bandera), textos con estilos distintos (nombre, país, código,
  precios) y un `Pressable` con feedback visual al tocarlo.
- Layout hecho solo con Flexbox, sin `position: 'absolute'`.
- Estilos únicamente con `StyleSheet.create`, sin estilos inline ni librerías de UI externas.
- TypeScript con tipos explícitos: interfaz `Currency` y sin uso de `any`.

## Captura de pantalla

![Captura de la app funcionando — Semana 1]<img width="738" height="1600" alt="WhatsApp Image 2026-10-22 at 10 30 26 PM" src="https://github.com/user-attachments/assets/d98a7cae-f841-471e-ab2b-c568967473aa" />


## Estructura del proyecto

```
starter/
├── App.tsx               # Punto de entrada
├── package.json          # Dependencias exactas
├── tsconfig.json         # Configuración de TypeScript
├── app.json              # Configuración de Expo (nombre del dominio)
└── src/
    ├── types/
    │   └── index.ts      # Interfaz Currency
    ├── data/
    │   └── mockData.ts   # Divisas de ejemplo
    ├── components/
    │   └── ItemCard.tsx  # Tarjeta reutilizable de una divisa
    └── screens/
        └── HomeScreen.tsx # Pantalla principal con la lista
```

## Conceptos aplicados

- **Core Components:** `View` (contenedor), `Text` (todo texto va dentro de él), `Image` (la bandera,
  con `resizeMode="cover"`), `ScrollView` (lista con scroll) y `Pressable` (elemento tocable).
- **Flexbox:** en React Native el eje principal es la columna por defecto; se usa `flexDirection: 'row'`
  para poner elementos lado a lado, `justifyContent` y `alignItems` para alinear y `flex: 1` para repartir
  el espacio entre las cajas de precios.
- **StyleSheet.create:** los estilos se definen una sola vez y se reutilizan; la tendencia (sube, baja,
  estable) elige su color desde el mismo `StyleSheet`.
- **Props y tipos:** `ItemCard` recibe la divisa y la función `onPress` por props, tipadas con TypeScript.

## Cómo ejecutar

```bash
cd starter
pnpm install
pnpm start
```

Abre la app con Expo Go (escanea el QR) o en un simulador.
