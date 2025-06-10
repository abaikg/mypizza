import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductVariant } from "@/types/product";

type Options = Record<string, string>;

export interface CartItem {
  id: string; // составной ключ productId-variantId
  product: Product;
  variant: ProductVariant;
  quantity: number;
  options: Options;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, options: Options, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  incrementItem: (cartItemId: string) => void;
  decrementItem: (cartItemId: string) => void;
}

// ——— 🔧 Вспомогательные функции ——— //

function createCartItemId(productId: string, variantId: string) {
  return `${productId}-${variantId}`;
}

function findMatchingVariant(
  variants: ProductVariant[],
  selectedOptionValueIds: string[]
): ProductVariant | undefined {
  const sortedSelected = [...selectedOptionValueIds].sort();
  return variants.find((variant) => {
    const variantIds = variant.optionValues?.map((v) => v.id).sort();
    return (
      variantIds?.length === sortedSelected.length &&
      variantIds.every((id, i) => id === sortedSelected[i])
    );
  });
}

// ——— 🧠 Основной Zustand store ——— //

export const useCart = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],

      addItem: (product, options, quantity) => {
        if (!product.variants?.length) {
          console.error("addItem: Product has no variants", product);
          alert("Ошибка: у товара нет доступных вариантов.");
          return;
        }

        const selectedValueIds = Object.values(options);
        const foundVariant = findMatchingVariant(product.variants, selectedValueIds);

        if (!foundVariant) {
          console.error("addItem: Variant not found", {
            product: product.name,
            options,
            variants: product.variants.map((v) => ({
              id: v.id,
              values: v.optionValues.map((ov) => ov.id),
            })),
          });
          alert("Выбранная комбинация опций недоступна.");
          return;
        }

        const cartItemId = createCartItemId(product.id, foundVariant.id);
        const existingItem = get().items.find((item) => item.id === cartItemId);

        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === cartItemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                id: cartItemId,
                product,
                variant: foundVariant,
                quantity,
                options,
              },
            ],
          });
        }
      },

      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== cartItemId),
        })),

      clearCart: () => set({ items: [] }),

      incrementItem: (cartItemId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decrementItem: (cartItemId) =>
        set((state) => {
          const updated = state.items
            .map((item) =>
              item.id === cartItemId
                ? { ...item, quantity: Math.max(0, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0);
          return { items: updated };
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);

// ——— 🎯 Селекторы (optional) ——— //

export const useCartItems = () => useCart((state) => state.items);

export const useCartTotal = () =>
  useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity * item.variant.price, 0)
  );
