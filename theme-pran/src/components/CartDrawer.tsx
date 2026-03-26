import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatINR } from "@/utils/format";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const totalQuantity = useCartStore((s) => s.totalQuantity);
  const subtotalINR = useCartStore((s) => s.subtotalINR);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const checkout = useCartStore((s) => s.checkout);
  const isLoading = useCartStore((s) => s.isLoading);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="ov"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/15 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[80] bg-paper border-l border-ash flex flex-col"
          >
            <div className="flex items-center justify-between px-8 py-7 border-b border-ash">
              <div>
                <span className="font-display text-xl text-ink">Your Bag</span>
                {totalQuantity > 0 && (
                  <span className="font-body text-xs text-smoke ml-2">({totalQuantity})</span>
                )}
              </div>
              <button onClick={closeCart} className="text-smoke hover:text-ink transition-colors p-1">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-display text-lg text-ink/30 mb-2">Nothing yet</p>
                  <p className="font-body text-sm text-smoke/60 mb-8">Find a piece that belongs with you.</p>
                  <button onClick={closeCart} className="btn-ghost">Browse Collection</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-5 pb-6 border-b border-ash/60 last:border-0"
                    >
                      <div className="w-16 h-20 bg-linen overflow-hidden flex-shrink-0">
                        {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm text-ink truncate">{item.title}</p>
                        <p className="font-body text-xs text-smoke mt-0.5">{item.variantTitle}</p>
                        <p className="font-body text-sm text-ink mt-2">{formatINR(item.priceINR)}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-ash">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="px-2 py-1 text-smoke hover:text-ink transition-colors"
                              disabled={isLoading}
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-3 py-1 font-body text-xs text-ink border-x border-ash min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="px-2 py-1 text-smoke hover:text-ink transition-colors"
                              disabled={isLoading}
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-smoke/40 hover:text-clay transition-colors"
                            disabled={isLoading}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ash px-8 py-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-body text-xs text-smoke tracking-widest uppercase">Subtotal</span>
                  <span className="font-display text-2xl text-ink">{formatINR(subtotalINR)}</span>
                </div>
                <p className="font-body text-[10px] text-smoke/50">Taxes & shipping at checkout</p>
                <button
                  onClick={checkout}
                  disabled={isLoading}
                  className="w-full btn-clay justify-center disabled:opacity-50"
                >
                  {isLoading ? "Updating…" : "Checkout"}
                </button>
                <button onClick={closeCart} className="w-full btn-ghost justify-center">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
