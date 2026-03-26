import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/utils/format";
import { useCartStore } from "@/stores/cartStore";

interface Props {
  product: Product;
  index?: number;
  variant?: "editorial" | "minimal" | "lookbook";
}

export default function FormCard({ product, index = 0, variant = "editorial" }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const v = product.variants[0];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(v.id);
    openCart();
  }

  // ── LOOKBOOK — large horizontal scroll cards ──────────
  if (variant === "lookbook") {
    return (
      <div className="w-[85vw] md:w-[70vw] lg:w-[55vw] flex-shrink-0 snap-start pr-8">
        <Link to={`/form/${product.handle}`} className="group block">
          <div className="relative aspect-[4/5] overflow-hidden mb-5">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="font-body text-[11px] tracking-[0.3em] uppercase text-white/80">
                View piece →
              </span>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="overline-clay mb-1.5">{product.tagline}</p>
              <h3 className="font-display text-2xl text-ink group-hover:text-clay transition-colors duration-300">
                {product.title}
              </h3>
            </div>
            <span className="font-body text-sm text-graphite mt-1">{formatINR(v.priceINR)}</span>
          </div>
        </Link>
      </div>
    );
  }

  // ── MINIMAL — compact grid cards ──────────────────────
  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <Link to={`/form/${product.handle}`} className="group block">
          <div className="aspect-[3/4] overflow-hidden mb-3 bg-linen">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <h3 className="font-display text-base text-ink group-hover:text-clay transition-colors mb-1">
            {product.title}
          </h3>
          <span className="font-body text-xs text-smoke">{formatINR(v.priceINR)}</span>
        </Link>
      </motion.div>
    );
  }

  // ── EDITORIAL — default, with hover add-to-bag ────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <Link to={`/form/${product.handle}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-linen">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1s]"
            loading="lazy"
          />
          <button
            onClick={handleAdd}
            className="absolute bottom-4 left-4 right-4 py-3 bg-paper/90 backdrop-blur-sm text-center font-body text-[10px] tracking-[0.3em] uppercase text-ink opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 hover:bg-clay hover:text-white"
          >
            Add to Bag
          </button>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="overline-clay text-[9px] mb-1">{product.tagline}</p>
            <h3 className="font-display text-lg text-ink group-hover:text-clay transition-colors duration-300 leading-tight">
              {product.title}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-smoke group-hover:text-clay transition-colors flex-shrink-0 mt-1">
            <span className="font-body text-sm">{formatINR(v.priceINR)}</span>
            <ArrowUpRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
