import { create } from 'zustand';

// ============================================
// Store de divisas guardadas
// ============================================
// Solo guarda los IDS: es estado del CLIENTE (una preferencia del usuario).
// Los datos de las divisas son estado del SERVIDOR y viven en TanStack Query.

interface SavedStore {
  // Ids de las divisas guardadas
  savedIds: string[];
  // Guarda una divisa por id (sin duplicados)
  addItem: (id: string) => void;
  // Quita una divisa por id
  removeItem: (id: string) => void;
  // [Extra] Vacía la lista
  clearAll: () => void;
  // true si la divisa con ese id está guardada
  isItemSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>((set, get) => ({
  savedIds: [],

  addItem: (id) => {
    if (get().savedIds.includes(id)) return;
    set((state) => ({ savedIds: [...state.savedIds, id] }));
  },

  removeItem: (id) => {
    set((state) => ({ savedIds: state.savedIds.filter((savedId) => savedId !== id) }));
  },

  clearAll: () => {
    set({ savedIds: [] });
  },

  isItemSaved: (id) => get().savedIds.includes(id),
}));