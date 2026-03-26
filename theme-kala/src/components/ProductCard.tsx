import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatINR } from "@/utils/format";
import { matchProductToDeity } from "@/data/deities";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
  index?: number;
  variant?: "grid" | "strip";
}

export default function ProductCard({ product, index = 0, variant = "grid" }: Props) {
  const { addItem, openCart } = useCart();
  const deity = matchProductToDeity(product.title);
  const v = product.variants[0];
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(v.id);
    openCart();
  }

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 6, rotateY: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  const hasSecondImage = product.images.length > 1;

  if (variant === "strip") {
    return (
      <Link to={`/product/${product.handle}`} className="group block">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06, duration: 0.5 }}
          className="card-kala"
        >
          <div className="aspect-[3/4] overflow-hidden relative">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-3">
            <p className="font-display text-sm text-on-surface truncate">{product.title}</p>
            <p className="font-body text-xs text-accent mt-0.5">{formatINR(v.priceINR)}</p>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.handle}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.5 }}
        style={{ perspective: 800 }}
      >
        <motion.div
          className="card-kala relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.rotateX,
            rotateY: tilt.rotateY,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden relative">
            <img
              src={product.images[0]}
              alt={product.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                hasSecondImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {/* Second image crossfade */}
            {hasSecondImage && (
              <img
                src={product.images[1]}
                alt={`${product.title} alt`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              />
            )}
            {/* Warm overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick add button */}
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-surface/90 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-obsidian hover:border-accent"
            >
              <Plus size={16} />
            </button>

            {/* Deity chip */}
            {deity && (
              <div className="absolute top-3 left-3">
                <span className="deity-chip">{deity.name}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint mb-1">
              {product.tagline}
            </p>
            <h3 className="font-display text-lg text-on-surface leading-tight mb-2">
              {product.title}
            </h3>

            {/* Chakra + Element tags */}
            {(product.chakra || product.element) && (
              <div className="flex gap-2 mb-3">
                {product.chakra && (
                  <span className="font-body text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-surface-3 text-on-surface-faint">
                    {product.chakra.split(" (")[0]}
                  </span>
                )}
                {product.element && (
                  <span className="font-body text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-surface-3 text-on-surface-faint">
                    {product.element}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-accent">{formatINR(v.priceINR)}</span>
              {v.weight && (
                <span className="font-body text-[10px] text-on-surface-faint">{v.weight}</span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
