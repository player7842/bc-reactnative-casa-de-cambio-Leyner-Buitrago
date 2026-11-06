import { create } from 'zustand';
import type { Currency } from '../types';

interface SavedStore {
  // Lista de divisas guardadas
  items: Currency[];
  // Agrega una divisa (sin duplicados)
  addItem: (item: Currency) => void;
  // Quita una divisa por id
  removeItem: (id: string) => void;
  // [Extra] Vacía la lista
  clearAll: () => void;
  // true si la divisa con ese id está guardada
  isItemSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const alreadySaved = get().items.some((i) => i.id === item.id);
    if (alreadySaved) return;
    set((state) => ({ items: [...state.items, item] }));
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  clearAll: () => {
    set({ items: [] });
  },

  isItemSaved: (id) => get().items.some((i) => i.id === id),
}));