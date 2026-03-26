import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";
import { addonProducts, CONSECRATION_VARIANT_ID, DIYA_VARIANT_ID } from "@/data/products";

export default function CartDrawer() {
  const {
    items, isOpen, subtotalINR, closeCart,
    removeItem, updateQuantity,
    hasConsecration, toggleConsecration,
    hasDiya, toggleDiya,
  } = useCart();

  const consecrationAddon = addonProducts.find((p) => p.variants[0].id === CONSECRATION_VARIANT_ID);
  const diyaAddon = addonProducts.find((p) => p.variants[0].id === DIYA_VARIANT_ID);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/40 dark:bg-black/50 backdrop-blur-sm z-[70]"
            onClick={closeCart}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-surface border-l border-border z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-display text-xl text-on-surface">Your Altar</h2>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-faint hover:text-on-surface hover:bg-surface-2 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-display text-lg text-on-surface-faint mb-2">Your altar is empty</p>
                  <p className="font-body text-sm text-on-surface-faint">
                    Add a sacred form to begin.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 pb-4 border-b border-border/50">
                      <div className="w-20 h-24 rounded-md overflow-hidden bg-surface-2 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm text-on-surface truncate">{item.title}</p>
                        <p className="font-body text-[11px] text-on-surface-faint mt-0.5">{item.variantTitle}</p>
                        <p className="font-body text-sm text-accent mt-1">{formatINR(item.priceINR)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-border rounded-md">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-on-surface-faint hover:text-on-surface transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-body text-xs text-on-surface">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-on-surface-faint hover:text-on-surface transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-on-surface-faint hover:text-vermilion transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Addons */}
                  {consecrationAddon && (
                    <div
                      className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        hasConsecration
                          ? "border-accent/40 bg-accent/5"
                          : "border-border bg-surface-2"
                      }`}
                      onClick={toggleConsecration}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-sm text-on-surface">{consecrationAddon.title}</p>
                          <p className="font-body text-[11px] text-on-surface-faint mt-1 leading-relaxed">
                            {consecrationAddon.description}
                          </p>
                          <p className="font-body text-xs text-accent mt-1">
                            +{formatINR(consecrationAddon.variants[0].priceINR)}
                          </p>
                        </div>
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            hasConsecration
                              ? "bg-accent border-accent text-obsidian"
                              : "border-border-strong"
                          }`}
                        >
                          {hasConsecration && <Check size={12} />}
                        </div>
                      </div>
                    </div>
                  )}

                  {diyaAddon && (
                    <div
                      className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        hasDiya
                          ? "border-accent/40 bg-accent/5"
                          : "border-border bg-surface-2"
                      }`}
                      onClick={toggleDiya}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-sm text-on-surface">{diyaAddon.title}</p>
                          <p className="font-body text-[11px] text-on-surface-faint mt-1 leading-relaxed">
                            Hand-cast five-wick diya for daily puja. Complete your altar.
                          </p>
                          <p className="font-body text-xs text-accent mt-1">
                            +{formatINR(diyaAddon.variants[0].priceINR)}
                          </p>
                        </div>
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            hasDiya
                              ? "bg-accent border-accent text-obsidian"
                              : "border-border-strong"
                          }`}
                        >
                          {hasDiya && <Check size={12} />}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-on-surface-muted">Subtotal</span>
                  <span className="font-display text-xl text-accent">{formatINR(subtotalINR)}</span>
                </div>
                <button className="btn-primary w-full justify-center">
                  Proceed to Checkout
                </button>
                <p className="font-body text-[10px] text-on-surface-faint text-center mt-3">
                  Shipping calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
