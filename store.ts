import { create } from 'zustand';
import { CartItem, CustomizerState } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id && i.size === item.size && i.color === item.color);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.size === item.size && i.color === item.color
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, item], isOpen: true };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),
}));

interface CustomizerStore {
  config: CustomizerState;
  setConfig: (update: Partial<CustomizerState>) => void;
  resetConfig: () => void;
}

const initialConfig: CustomizerState = {
  selectedColor: '#FFFFFF',
  printLocation: 'front',
  uploadedImage: null,
  quantity: 1,
  selectedSize: 'L',
};

export const useCustomizerStore = create<CustomizerStore>((set) => ({
  config: initialConfig,
  setConfig: (update) =>
    set((state) => ({ config: { ...state.config, ...update } })),
  resetConfig: () => set({ config: initialConfig }),
}));