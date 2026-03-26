import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";
import LotusRule from "./LotusRule";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalQuantity, subtotalINR } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-espresso/30 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[80] bg-ivory border-l border-sand/60 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-saffron flex items-center justify-center">
                  <ShoppingBag size={15} strokeWidth={1.5} className="text-white" />
                </div>
                <span className="font-display text-xl text-espresso tracking-wide">Your Selection</span>
                {totalQuantity > 0 && (
                  <span className="font-body text-xs text-bark">({totalQuantity})</span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-bark hover:text-saffron transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-5">
                  <div className="w-20 h-20 bg-cream flex items-center justify-center">
                    <ShoppingBag size={28} strokeWidth={1} className="text-sand" />
                  </div>
                  <div>
                    <p className="font-display text-xl text-espresso/50 mb-1">Nothing selected yet</p>
                    <p className="font-body text-sm text-bark/60">Add a sacred form to begin</p>
                  </div>
                  <button onClick={closeCart} className="btn-outline-saffron">
                    Browse Collection
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
                      className="flex gap-4 pb-5 border-b border-sand/40 last:border-0"
                    >
                      <div className="w-20 h-20 bg-cream overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base text-espresso truncate leading-snug">{item.title}</p>
                        <p className="font-body text-xs text-bark mt-0.5">{item.variantTitle}</p>
                        <p className="font-body text-sm text-gold font-semibold mt-1.5">{formatINR(item.priceINR)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-sand/60">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="px-2.5 py-1.5 text-bark hover:text-saffron transition-colors"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="px-3 py-1.5 font-body text-xs text-espresso border-x border-sand/60 min-w-[32px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="px-2.5 py-1.5 text-bark hover:text-saffron transition-colors"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-bark/50 hover:text-kumkum transition-colors"
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
              <div className="border-t border-sand/40 px-6 py-5 space-y-4 bg-cream">
                <LotusRule className="mb-2" />
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-bark">Subtotal</span>
                  <span className="font-display text-2xl text-espresso">{formatINR(subtotalINR)}</span>
                </div>
                <p className="font-body text-[10px] text-bark/50 tracking-wider">
                  Taxes & shipping calculated at checkout
                </p>
                <button
                  onClick={() => alert("Theme preview — Shopify checkout not connected.")}
                  className="w-full btn-saffron text-center"
                >
                  Proceed to Checkout
                </button>
                <button onClick={closeCart} className="w-full btn-outline-espresso text-center">
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
