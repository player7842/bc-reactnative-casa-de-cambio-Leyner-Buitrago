import { Trend } from '../types';

// Pestañas de nivel raíz (Tab Navigator)
export type RootTabParamList = {
  // Pestaña principal: contiene el Stack interno (lista → detalle)
  Home: undefined;
  // Pestaña de divisas guardadas (viene del store Zustand)
  Saved: undefined;
};

// Pantallas del Stack anidado dentro de la pestaña Home
export type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: {
    id: string;
    name: string;
    code: string;
    country: string;
    imageUri: string;
    buyRate: number;
    sellRate: number;
    trend: Trend;
  };
};