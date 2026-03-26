import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Product } from "@/types";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
  index?: number;
  variant?: "grid" | "strip";
}

export default function ProductCard({ product, index = 0, variant = "grid" }: Props) {
  const { addItem, openCart } = useCart();
  const v = product.variants[0];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(v.id);
    openCart();
  }

  if (variant === "strip") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.07 }}
      >
        <Link to={`/product/${product.handle}`} className="group block">
          <div className="img-overlay-wrap aspect-[3/4] bg-dusk border border-ember/50 group-hover:border-copper/30 transition-colors duration-300">
            <img src={product.images[0]} alt={product.title}
              className="w-full h-full object-cover" loading="lazy" />
            <div className="img-overlay-text p-5">
              <p className="font-body text-[10px] tracking-[0.32em] text-amber-300 uppercase mb-1">{product.tagline}</p>
              <p className="font-display text-xl text-white leading-snug">{product.title}</p>
              <p className="font-body text-sm text-amber-200 mt-2">{formatINR(v.priceINR)}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link to={`/product/${product.handle}`} className="group block">
        <div className="card-rasa overflow-hidden">
          {/* Image */}
          <div className="img-overlay-wrap aspect-[3/4] bg-dusk/50">
            <img src={product.images[0]} alt={product.title}
              className="w-full h-full object-cover" loading="lazy" />
            {/* quick-add on hover */}
            <button
              onClick={handleAdd}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 border border-copper/40 text-copper flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-copper hover:text-white"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>
          {/* Info */}
          <div className="p-4 bg-dusk border-t border-ember/40">
            {product.tagline && (
              <p className="section-label mb-1.5">{product.tagline}</p>
            )}
            <h3 className="font-display text-lg text-ivory leading-snug mb-1 group-hover:text-copper transition-colors duration-200">
              {product.title}
            </h3>
            {product.chakra && (
              <p className="font-body text-xs text-stone/60 mb-3">{product.chakra}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="font-display text-base text-copper">{formatINR(v.priceINR)}</span>
              {v.weight && <span className="font-body text-xs text-stone/40">{v.weight}</span>}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
