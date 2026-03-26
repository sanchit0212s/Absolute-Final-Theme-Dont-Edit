import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Check, Star } from "lucide-react";
import { getProductByHandle, mainProducts, addonProducts, CONSECRATION_VARIANT_ID } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";
import ProductCard from "@/components/ProductCard";
import LotusRule from "@/components/LotusRule";

const careText = `Pure brass requires minimal but consistent care.

• Wipe weekly with a soft dry cloth
• Deep clean with tamarind or lemon-salt paste — rinse and dry immediately
• Monthly light coat of coconut oil preserves the patina
• Never use abrasives or prolonged water exposure
• The natural darkening (Tamra-patina) is auspicious — do not attempt to reverse it`;

type Tab = "vastu" | "chakra" | "element" | "care";

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const product = getProductByHandle(handle ?? "");
  const { addItem, openCart, hasConsecration, toggleConsecration } = useCart();
  const [tab, setTab] = useState<Tab>("vastu");
  const [img, setImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="font-display text-3xl text-espresso/30 mb-4">Form not found</p>
          <Link to="/collection" className="btn-saffron">Back to Collection</Link>
        </div>
      </div>
    );
  }

  const v = product.variants[0];
  const related = mainProducts.filter(p => p.id !== product.id && p.tags.some(t => product.tags.includes(t))).slice(0, 4);
  const consecration = addonProducts.find(p => p.variants[0].id === CONSECRATION_VARIANT_ID);

  function handleAdd() {
    addItem(v.id);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "vastu", label: "Vastu" },
    { key: "chakra", label: "Chakra" },
    { key: "element", label: "Element" },
    { key: "care", label: "Care" },
  ];

  return (
    <div className="bg-ivory min-h-screen">
      {/* Saffron top bar breadcrumb */}
      <div className="bg-saffron pt-16">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-body text-xs text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> Collection
          </button>
          <span className="text-white/30">·</span>
          <span className="font-body text-xs text-white/40 truncate">{product.title}</span>
        </div>
      </div>

      {/* Main 2-col */}
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* Image gallery */}
          <div>
            <div className="aspect-square bg-cream overflow-hidden mb-3">
              <motion.img
                key={img}
                src={product.images[img]}
                alt={product.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImg(i)}
                    className={`w-16 h-16 overflow-hidden border-2 transition-colors ${
                      i === img ? "border-saffron" : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div>
            {product.tagline && (
              <p className="overline-label text-saffron mb-3">{product.tagline}</p>
            )}
            <h1 className="font-display text-4xl md:text-5xl text-espresso font-light leading-tight mb-3">
              {product.title}
            </h1>
            {product.mantra && (
              <p className="font-display italic text-bark text-lg mb-5">{product.mantra}</p>
            )}

            <LotusRule className="mb-6 max-w-[220px]" />

            <p className="font-body text-mahogany leading-relaxed mb-4">{product.description}</p>
            <p className="font-body text-sm text-bark leading-relaxed mb-8">{product.longDescription}</p>

            {/* Price */}
            <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-sand/40">
              <span className="font-display text-4xl text-espresso">{formatINR(v.priceINR)}</span>
              {v.weight && (
                <span className="font-body text-sm text-bark">{v.weight} · {v.title.split("—")[0].trim()}</span>
              )}
            </div>

            {/* Add button */}
            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-4 font-body text-xs tracking-[0.25em] uppercase transition-all duration-300 mb-4 ${
                added ? "bg-espresso text-ivory" : "btn-saffron"
              }`}
            >
              {added ? <><Check size={14} /> Added</> : <><Plus size={14} /> Add to Cart</>}
            </button>

            {/* Consecration upsell */}
            {consecration && (
              <div
                className={`p-5 border-2 transition-colors mb-6 ${
                  hasConsecration ? "border-saffron bg-saffron/5" : "border-sand/60"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-base text-espresso mb-1">{consecration.title}</p>
                    <p className="font-body text-xs text-bark leading-relaxed mb-2">{consecration.description}</p>
                    <p className="font-body text-sm text-gold font-semibold">
                      +{formatINR(consecration.variants[0].priceINR)}
                    </p>
                  </div>
                  <button
                    onClick={toggleConsecration}
                    className={`flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center transition-colors ${
                      hasConsecration ? "bg-saffron border-saffron text-white" : "border-sand/60"
                    }`}
                  >
                    {hasConsecration && <Check size={12} />}
                  </button>
                </div>
              </div>
            )}

            {/* Stars */}
            <div className="flex items-center gap-2 mb-10">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-saffron fill-saffron" />)}
              </div>
              <span className="font-body text-xs text-bark">4.9 · 23 verified buyers</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-sand/40 mb-6">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={t.key === tab ? "tab-active" : "tab-inactive"}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="font-body text-sm text-mahogany leading-relaxed">
              {tab === "vastu" && <p>{product.vastuPlacement}</p>}
              {tab === "chakra" && (
                <p>
                  This form aligns with the <span className="text-saffron font-medium">{product.chakra}</span> chakra.
                  Intentional darshan cultivates the corresponding qualities of awareness in your daily life.
                </p>
              )}
              {tab === "element" && (
                <p>
                  Resonates with <span className="text-saffron font-medium">{product.element}</span>.
                  Place in a space where you wish to invite that elemental quality.
                </p>
              )}
              {tab === "care" && (
                <pre className="whitespace-pre-wrap font-body text-sm text-mahogany leading-relaxed">{careText}</pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream border-t border-sand/40 py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <LotusRule className="mb-10" />
            <p className="overline-label text-saffron mb-8">You may also consider</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} variant="portrait" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
