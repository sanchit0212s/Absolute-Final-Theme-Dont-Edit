import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
  index?: number;
  variant?: "square" | "portrait" | "horizontal";
}

export default function ProductCard({ product, index = 0, variant = "square" }: Props) {
  const { addItem, openCart } = useCart();
  const v = product.variants[0];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(v.id);
    openCart();
  }

  // ── HORIZONTAL — for featured strip / related ──────────────────
  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
      >
        <Link to={`/product/${product.handle}`} className="group flex gap-4 items-center">
          <div className="w-20 h-20 bg-cream overflow-hidden flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="overline-label text-saffron text-[9px] mb-0.5">{product.tagline}</p>
            <p className="font-display text-base text-espresso truncate group-hover:text-saffron transition-colors">
              {product.title}
            </p>
            <p className="font-body text-sm text-gold font-medium mt-0.5">{formatINR(v.priceINR)}</p>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ── PORTRAIT — editorial magazine card ─────────────────────────
  if (variant === "portrait") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.07 }}
        className="group"
      >
        <Link to={`/product/${product.handle}`} className="block">
          <div className="relative aspect-[3/4] bg-cream overflow-hidden mb-4">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Saffron overlay on hover */}
            <div className="absolute inset-0 bg-saffron/0 group-hover:bg-saffron/10 transition-colors duration-500" />
            {/* Quick add */}
            <button
              onClick={handleAdd}
              className="absolute bottom-4 right-4 w-10 h-10 bg-saffron text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-marigold"
            >
              <Plus size={16} strokeWidth={2} />
            </button>
          </div>
          <p className="overline-label text-saffron text-[9px] mb-1">{product.tagline}</p>
          <h3 className="font-display text-xl text-espresso group-hover:text-saffron transition-colors duration-200 leading-tight mb-1">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-gold font-medium">{formatINR(v.priceINR)}</span>
            {v.weight && <span className="font-body text-xs text-bark">{v.weight}</span>}
          </div>
        </Link>
      </motion.div>
    );
  }

  // ── SQUARE — the bold default format ───────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link to={`/product/${product.handle}`} className="group block card-sindoor">
        {/* Square image */}
        <div className="relative aspect-square overflow-hidden bg-cream">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
            loading="lazy"
          />
          {/* Bottom saffron label strip on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-saffron py-2 px-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
            <p className="font-body text-xs text-white/80 tracking-widest uppercase truncate">
              {product.tagline}
            </p>
          </div>
          {/* Quick add */}
          <button
            onClick={handleAdd}
            className="absolute top-3 right-3 w-8 h-8 bg-white text-saffron flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md hover:bg-saffron hover:text-white"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
        {/* Info */}
        <div className="p-4 bg-cream">
          <h3 className="font-display text-lg text-espresso group-hover:text-saffron transition-colors duration-200 leading-snug mb-2">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-gold font-semibold">{formatINR(v.priceINR)}</span>
            {v.weight && <span className="font-body text-[11px] text-bark">{v.weight}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
