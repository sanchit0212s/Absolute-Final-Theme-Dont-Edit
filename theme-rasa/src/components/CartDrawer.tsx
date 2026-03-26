import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalQuantity, subtotalINR } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[80] bg-night-mid border-l border-ember/60 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ember/40">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-copper" />
                <span className="font-display text-xl text-ivory tracking-wide">
                  Your Altar
                </span>
                {totalQuantity > 0 && (
                  <span className="font-body text-xs text-stone/60">
                    ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-stone/60 hover:text-ivory transition-colors"
                aria-label="Close cart"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-16 h-16 border border-ember/40 flex items-center justify-center text-stone/30">
                    <ShoppingBag size={24} strokeWidth={1} />
                  </div>
                  <div>
                    <p className="font-display text-lg text-ivory/60">Your altar is empty</p>
                    <p className="font-body text-xs text-stone/40 mt-1">Add sacred forms to begin</p>
                  </div>
                  <button onClick={closeCart} className="btn-outline-copper mt-2">
                    Explore Collection
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 pb-4 border-b border-ember/30 last:border-0"
                    >
                      {/* Image */}
                      <div className="w-20 aspect-[3/4] bg-dusk overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base text-ivory leading-snug truncate">
                          {item.title}
                        </p>
                        <p className="font-body text-xs text-stone/50 mt-0.5">{item.variantTitle}</p>
                        <p className="font-display text-copper mt-1">{formatINR(item.priceINR)}</p>

                        {/* Qty + Remove */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-ember/60">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="px-2 py-1 text-stone/60 hover:text-copper transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 py-1 font-body text-xs text-ivory border-x border-ember/60 min-w-[32px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="px-2 py-1 text-stone/60 hover:text-copper transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-stone/40 hover:text-cinnabar transition-colors"
                            aria-label="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ember/40 px-6 py-5 space-y-4 bg-night">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-stone/70">Subtotal</span>
                  <span className="font-display text-lg text-copper">{formatINR(subtotalINR)}</span>
                </div>
                <p className="font-body text-[10px] text-stone/40 tracking-wider">
                  Shipping & taxes calculated at checkout
                </p>

                {/* Checkout */}
                <button
                  onClick={() => alert("This is a theme preview — Shopify checkout not connected.")}
                  className="w-full btn-copper text-center"
                >
                  Proceed to Checkout
                </button>
                <button onClick={closeCart} className="w-full btn-outline-copper text-center">
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
