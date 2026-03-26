/**
 * ── Cart store ─────────────────────────────────────────────────
 *
 * Zustand store with a unified interface for both demo and Shopify modes.
 *
 * USE_SHOPIFY = false (demo):
 *   - Cart items stored locally in memory + localStorage
 *   - Prices computed from mock product data
 *   - Checkout shows a "demo" alert
 *
 * USE_SHOPIFY = true (live):
 *   - Every add/remove/update is a Shopify cart mutation
 *   - Shopify cart object is the single source of truth
 *   - Checkout redirects to real Shopify checkout URL
 *
 * Components use the same interface regardless of mode.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { USE_SHOPIFY, SHOPIFY_ADDON_IDS } from "@/config";
import type { CartItem } from "@/types";

// ── Lazy imports for Shopify (tree-shaken in demo mode) ─────────

async function shopify() {
  return import("@/lib/shopify");
}

// ── Local cart helpers (demo mode) ──────────────────────────────

async function lookupVariant(variantId: string) {
  const { products } = await import("@/data/products");
  for (const p of products) {
    const v = p.variants.find((v) => v.id === variantId);
    if (v)
      return {
        product: p,
        variant: v,
        item: {
          productId: p.id,
          variantId: v.id,
          title: p.title,
          variantTitle: v.title,
          priceINR: v.priceINR,
          image: p.images[0],
          quantity: 1,
        } as CartItem,
      };
  }
  return null;
}

// ── Store interface ─────────────────────────────────────────────

interface CartStore {
  // Unified state — works in both modes
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;

  // Shopify-only: the raw cart object (null in demo mode)
  _shopifyCart: any | null;

  // Actions
  addItem: (variantId: string, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  checkout: () => void;

  // Addon toggles
  hasConsecration: boolean;
  toggleConsecration: () => void;

  // Computed
  totalQuantity: number;
  subtotalINR: number;
}

// ── Shopify cart → CartItem[] mapper ────────────────────────────

function shopifyCartToItems(cart: any): CartItem[] {
  if (!cart?.lines?.edges) return [];
  return cart.lines.edges.map((edge: any) => {
    const line = edge.node;
    const m = line.merchandise;
    return {
      productId: line.id, // lineId used as productId in Shopify mode
      variantId: m.id,
      title: m.product.title,
      variantTitle: m.title,
      priceINR: Math.round(parseFloat(m.price.amount)),
      image: m.product.images?.edges?.[0]?.node?.url || "",
      quantity: line.quantity,
      _lineId: line.id, // Shopify line ID for mutations
    } as CartItem & { _lineId: string };
  });
}

// ── Consecration variant ID (mode-aware) ────────────────────────

function getConsecrationId() {
  if (USE_SHOPIFY) return SHOPIFY_ADDON_IDS.consecration;
  return "v-consecration-1"; // demo mode local ID
}

// ── Store ───────────────────────────────────────────────────────

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,
      _shopifyCart: null,
      totalQuantity: 0,
      subtotalINR: 0,
      hasConsecration: false,

      addItem: async (variantId, quantity = 1) => {
        if (USE_SHOPIFY) {
          set({ isLoading: true });
          try {
            const s = await shopify();
            const { _shopifyCart } = get();
            let cart;
            if (!_shopifyCart) {
              cart = await s.createShopifyCart(variantId, quantity);
            } else {
              // Check if variant already in cart
              const existingLine = _shopifyCart.lines.edges.find(
                (e: any) => e.node.merchandise.id === variantId
              )?.node;
              if (existingLine) {
                const result = await s.updateShopifyCartLine(
                  _shopifyCart.id,
                  existingLine.id,
                  existingLine.quantity + quantity
                );
                cart = result.cart;
              } else {
                const result = await s.addLineToShopifyCart(
                  _shopifyCart.id,
                  variantId,
                  quantity
                );
                cart = result.cart;
              }
            }
            if (cart) {
              const items = shopifyCartToItems(cart);
              set({
                _shopifyCart: cart,
                items,
                totalQuantity: cart.totalQuantity,
                subtotalINR: Math.round(
                  parseFloat(cart.cost.subtotalAmount.amount)
                ),
                hasConsecration: items.some(
                  (i) => i.variantId === getConsecrationId()
                ),
              });
            }
          } finally {
            set({ isLoading: false });
          }
        } else {
          // Demo mode — local state
          const lookup = await lookupVariant(variantId);
          if (!lookup) return;
          const { items } = get();
          const existing = items.find((i) => i.variantId === variantId);
          let newItems;
          if (existing) {
            newItems = items.map((i) =>
              i.variantId === variantId
                ? { ...i, quantity: i.quantity + quantity }
                : i
            );
          } else {
            newItems = [...items, { ...lookup.item, quantity }];
          }
          const totalQuantity = newItems.reduce(
            (sum, i) => sum + i.quantity,
            0
          );
          const subtotalINR = newItems.reduce(
            (sum, i) => sum + i.priceINR * i.quantity,
            0
          );
          set({
            items: newItems,
            totalQuantity,
            subtotalINR,
            hasConsecration: newItems.some(
              (i) => i.variantId === getConsecrationId()
            ),
          });
        }
      },

      removeItem: async (variantId) => {
        if (USE_SHOPIFY) {
          set({ isLoading: true });
          try {
            const s = await shopify();
            const { _shopifyCart } = get();
            if (!_shopifyCart) return;
            const line = _shopifyCart.lines.edges.find(
              (e: any) => e.node.merchandise.id === variantId
            )?.node;
            if (!line) return;
            const result = await s.removeLineFromShopifyCart(
              _shopifyCart.id,
              line.id
            );
            if (result.cart) {
              const items = shopifyCartToItems(result.cart);
              set({
                _shopifyCart:
                  result.cart.totalQuantity === 0 ? null : result.cart,
                items: result.cart.totalQuantity === 0 ? [] : items,
                totalQuantity: result.cart.totalQuantity,
                subtotalINR: Math.round(
                  parseFloat(result.cart.cost.subtotalAmount.amount)
                ),
                hasConsecration: items.some(
                  (i) => i.variantId === getConsecrationId()
                ),
              });
            }
          } finally {
            set({ isLoading: false });
          }
        } else {
          const { items } = get();
          const newItems = items.filter((i) => i.variantId !== variantId);
          set({
            items: newItems,
            totalQuantity: newItems.reduce((sum, i) => sum + i.quantity, 0),
            subtotalINR: newItems.reduce(
              (sum, i) => sum + i.priceINR * i.quantity,
              0
            ),
            hasConsecration: newItems.some(
              (i) => i.variantId === getConsecrationId()
            ),
          });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        if (USE_SHOPIFY) {
          set({ isLoading: true });
          try {
            const s = await shopify();
            const { _shopifyCart } = get();
            if (!_shopifyCart) return;
            const line = _shopifyCart.lines.edges.find(
              (e: any) => e.node.merchandise.id === variantId
            )?.node;
            if (!line) return;
            const result = await s.updateShopifyCartLine(
              _shopifyCart.id,
              line.id,
              quantity
            );
            if (result.cart) {
              const items = shopifyCartToItems(result.cart);
              set({
                _shopifyCart: result.cart,
                items,
                totalQuantity: result.cart.totalQuantity,
                subtotalINR: Math.round(
                  parseFloat(result.cart.cost.subtotalAmount.amount)
                ),
                hasConsecration: items.some(
                  (i) => i.variantId === getConsecrationId()
                ),
              });
            }
          } finally {
            set({ isLoading: false });
          }
        } else {
          const { items } = get();
          const newItems = items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          );
          set({
            items: newItems,
            totalQuantity: newItems.reduce((sum, i) => sum + i.quantity, 0),
            subtotalINR: newItems.reduce(
              (sum, i) => sum + i.priceINR * i.quantity,
              0
            ),
          });
        }
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      checkout: () => {
        if (USE_SHOPIFY) {
          const { _shopifyCart } = get();
          if (_shopifyCart?.checkoutUrl) {
            import("@/lib/shopify").then(({ formatCheckoutUrl }) => {
              window.location.href = formatCheckoutUrl(
                _shopifyCart.checkoutUrl
              );
            });
          }
        } else {
          alert("Theme preview — Shopify checkout not connected.");
        }
      },

      toggleConsecration: async () => {
        const { hasConsecration } = get();
        const id = getConsecrationId();
        if (hasConsecration) {
          get().removeItem(id);
        } else {
          get().addItem(id, 1);
        }
      },
    }),
    {
      name: "divine-arts-pran-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        _shopifyCart: state._shopifyCart,
        totalQuantity: state.totalQuantity,
        subtotalINR: state.subtotalINR,
        hasConsecration: state.hasConsecration,
      }),
    }
  )
);
