import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";

export default function CartDrawer() {
  const {
    isOpen, closeCart, items, subtotalINR,
    updateQuantity, removeItem,
    hasDiya, hasConsecration, toggleDiya, toggleConsecration,
  } = useCart();

  const regularItems = items.filter(
    (i) => i.variantId !== "v-diya-1" && i.variantId !== "v-consecration-1"
  );

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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[70]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-parchment z-[80] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-warm-tan/60">
              <div>
                <h2 className="font-display text-xl text-espresso">Your Altar</h2>
                <p className="font-body text-xs text-walnut tracking-wider mt-0.5">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-walnut hover:text-espresso transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-warm-tan/30 flex items-center justify-center">
                    <ShoppingBag size={24} className="text-walnut" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-lg text-espresso mb-1">Your cart is empty</p>
                    <p className="font-serif text-sm italic text-walnut">
                      Begin with the deity your space calls for.
                    </p>
                  </div>
                  <button onClick={closeCart} className="btn-outline-gold text-xs mt-2">
                    Explore the Collection
                  </button>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-4">
                  {/* Regular items */}
                  {regularItems.map((item) => (
                    <div key={item.variantId} className="flex gap-4 py-3 border-b border-warm-tan/40">
                      <div className="w-16 h-20 flex-shrink-0 bg-warm-tan/20 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm text-espresso leading-snug truncate">
                          {item.title}
                        </h4>
                        <p className="font-body text-xs text-walnut mt-0.5 truncate">{item.variantTitle}</p>
                        <p className="font-display text-base text-temple-gold mt-1">
                          {formatINR(item.priceINR)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-6 h-6 border border-warm-tan/70 flex items-center justify-center text-walnut hover:border-temple-gold hover:text-temple-gold transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-body text-sm text-espresso w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-6 h-6 border border-warm-tan/70 flex items-center justify-center text-walnut hover:border-temple-gold hover:text-temple-gold transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="ml-auto text-walnut/60 hover:text-saffron transition-colors"
                          >
                            <Trash2 size={13} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Addons */}
                  <div className="bg-saffron/5 border border-saffron/25 p-4 space-y-3">
                    <p className="font-body text-xs text-saffron tracking-widest uppercase font-medium">
                      Sacred Additions
                    </p>

                    {/* Consecration */}
                    <div
                      className={`flex items-start gap-3 p-3 border cursor-pointer transition-all duration-200 ${
                        hasConsecration
                          ? "border-temple-gold/60 bg-temple-gold/5"
                          : "border-warm-tan/50 hover:border-temple-gold/30"
                      }`}
                      onClick={toggleConsecration}
                    >
                      <div className={`mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center ${
                        hasConsecration ? "border-temple-gold bg-temple-gold" : "border-warm-tan"
                      }`}>
                        {hasConsecration && <span className="text-parchment text-[9px]">✓</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs text-espresso font-medium">Shuddhi Poojan</p>
                        <p className="font-body text-[11px] text-walnut mt-0.5 leading-relaxed">
                          Prana Pratishtha performed by our pandit before shipping
                        </p>
                        <p className="font-display text-sm text-temple-gold mt-1">+ {formatINR(2499)}</p>
                      </div>
                    </div>

                    {/* Diya */}
                    <div
                      className={`flex items-start gap-3 p-3 border cursor-pointer transition-all duration-200 ${
                        hasDiya
                          ? "border-temple-gold/60 bg-temple-gold/5"
                          : "border-warm-tan/50 hover:border-temple-gold/30"
                      }`}
                      onClick={toggleDiya}
                    >
                      <div className={`mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center ${
                        hasDiya ? "border-temple-gold bg-temple-gold" : "border-warm-tan"
                      }`}>
                        {hasDiya && <span className="text-parchment text-[9px]">✓</span>}
                      </div>
                      <div className="flex-1 min-w-0 flex items-start gap-2">
                        <Flame size={12} className="text-saffron mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-body text-xs text-espresso font-medium">Brass Diya Lamp</p>
                          <p className="font-body text-[11px] text-walnut mt-0.5">Five-wick, hand-cast</p>
                          <p className="font-display text-sm text-temple-gold mt-1">+ {formatINR(999)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-warm-tan/60 px-6 py-5 bg-antique-ivory/60 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-body text-sm text-walnut tracking-wide">Subtotal</span>
                  <span className="font-display text-xl text-espresso">{formatINR(subtotalINR)}</span>
                </div>
                <p className="font-body text-[11px] text-walnut/70 italic">
                  Taxes &amp; shipping calculated at checkout
                </p>
                <button
                  className="w-full btn-gold py-4 text-sm"
                  onClick={() => alert("Live checkout is available on the full site. This is a theme preview.")}
                >
                  Proceed to Checkout
                </button>
                <button onClick={closeCart} className="w-full text-center font-body text-xs text-walnut hover:text-temple-gold tracking-wider uppercase transition-colors py-1">
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
