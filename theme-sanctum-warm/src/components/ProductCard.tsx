import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const variant = product.variants[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(variant.id);
    openCart();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link to={`/product/${product.handle}`} className="group block">
        <div className="card-hover bg-antique-ivory overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-warm-tan/20">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Warm overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Quick add button */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={handleAddToCart}
                disabled={!variant.availableForSale}
                className="w-full btn-gold flex items-center justify-center gap-2 py-2.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={13} />
                {variant.availableForSale ? "Add to Altar" : "Coming Soon"}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            {/* Deity chip */}
            {product.tagline && (
              <span className="inline-block text-xs font-body tracking-wide text-saffron mb-2">
                {product.tagline}
              </span>
            )}
            <h3 className="font-display text-lg text-espresso leading-snug mb-1 group-hover:text-temple-gold transition-colors duration-200">
              {product.title}
            </h3>
            {product.chakra && (
              <p className="text-xs font-body text-walnut mb-3">{product.chakra} · {product.element}</p>
            )}
            <div className="flex items-center justify-between">
              <span className="font-display text-lg text-temple-gold">
                {formatINR(variant.priceINR)}
              </span>
              {variant.weight && (
                <span className="text-xs font-body text-walnut/70">{variant.weight}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
