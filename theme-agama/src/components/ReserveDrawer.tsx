import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";

export default function ReserveDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalQuantity, subtotalINR } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="ov"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/10"
            onClick={closeCart}
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[80] bg-white border-l border-gallery flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gallery">
              <span className="font-display text-lg tracking-wide text-ink">Your Reservation</span>
              <button onClick={closeCart} className="text-graphite hover:text-ink transition-colors">
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-display text-xl text-ink/20 mb-2">No forms reserved</p>
                  <p className="font-body text-xs text-graphite mb-8">Your reservation is empty.</p>
                  <button onClick={closeCart} className="btn-ghost">Browse Forms</button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 pb-5 border-b border-gallery last:border-0"
                    >
                      <div className="w-14 h-14 bg-gallery overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm text-ink truncate">{item.title}</p>
                        <p className="font-body text-xs text-graphite mt-0.5">{item.variantTitle}</p>
                        <p className="font-display text-sm text-ink mt-1.5">{formatINR(item.priceINR)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-gallery">
                            <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-2 py-1 text-graphite hover:text-ink"><Minus size={10} /></button>
                            <span className="px-2 py-1 font-display text-xs text-ink border-x border-gallery min-w-[24px] text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-2 py-1 text-graphite hover:text-ink"><Plus size={10} /></button>
                          </div>
                          <button onClick={() => removeItem(item.variantId)} className="text-graphite/40 hover:text-red-500 transition-colors"><Trash2 size={11} /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gallery px-8 py-6 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="label">Total</span>
                  <span className="font-display text-2xl text-ink">{formatINR(subtotalINR)}</span>
                </div>
                <button
                  onClick={() => alert("Theme preview — Shopify checkout not connected.")}
                  className="w-full btn-black"
                >
                  Complete Reservation
                </button>
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20complete%20my%20reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-whatsapp"
                >
                  Or reserve via WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
