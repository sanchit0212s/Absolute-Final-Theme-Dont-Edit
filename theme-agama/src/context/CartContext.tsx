import React, { createContext, useContext, useReducer } from "react";
import type { CartItem } from "@/types";
import { products, DIYA_VARIANT_ID, CONSECRATION_VARIANT_ID } from "@/data/products";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; variantId: string; quantity?: number }
  | { type: "REMOVE"; variantId: string }
  | { type: "UPDATE_QTY"; variantId: string; quantity: number }
  | { type: "TOGGLE_DRAWER" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const variantId = action.variantId;
      const product = products.find((p) =>
        p.variants.some((v) => v.id === variantId)
      );
      if (!product) return state;
      const variant = product.variants.find((v) => v.id === variantId)!;

      const existing = state.items.find((i) => i.variantId === variantId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: i.quantity + (action.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: product.id,
            variantId,
            title: product.title,
            variantTitle: variant.title,
            priceINR: variant.priceINR,
            image: product.images[0],
            quantity: action.quantity ?? 1,
          },
        ],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.variantId !== action.variantId) };
    case "UPDATE_QTY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.variantId !== action.variantId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.variantId === action.variantId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "TOGGLE_DRAWER":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_DRAWER":
      return { ...state, isOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  subtotalINR: number;
  hasDiya: boolean;
  hasConsecration: boolean;
  addItem: (variantId: string, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleDiya: () => void;
  toggleConsecration: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalINR = state.items.reduce((sum, i) => sum + i.priceINR * i.quantity, 0);
  const hasDiya = state.items.some((i) => i.variantId === DIYA_VARIANT_ID);
  const hasConsecration = state.items.some((i) => i.variantId === CONSECRATION_VARIANT_ID);

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    totalQuantity,
    subtotalINR,
    hasDiya,
    hasConsecration,
    addItem: (variantId, quantity) => dispatch({ type: "ADD", variantId, quantity }),
    removeItem: (variantId) => dispatch({ type: "REMOVE", variantId }),
    updateQuantity: (variantId, quantity) => dispatch({ type: "UPDATE_QTY", variantId, quantity }),
    openCart: () => dispatch({ type: "OPEN_DRAWER" }),
    closeCart: () => dispatch({ type: "CLOSE_DRAWER" }),
    toggleDiya: () =>
      hasDiya
        ? dispatch({ type: "REMOVE", variantId: DIYA_VARIANT_ID })
        : dispatch({ type: "ADD", variantId: DIYA_VARIANT_ID }),
    toggleConsecration: () =>
      hasConsecration
        ? dispatch({ type: "REMOVE", variantId: CONSECRATION_VARIANT_ID })
        : dispatch({ type: "ADD", variantId: CONSECRATION_VARIANT_ID }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
