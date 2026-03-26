import { useState, useCallback, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Check, Star, X, ChevronLeft, ChevronRight, ZoomIn, Ruler, Weight, Box, Palette } from "lucide-react";
import { getProductByHandle, mainProducts, addonProducts, CONSECRATION_VARIANT_ID, DIYA_VARIANT_ID } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";
import ProductCard from "@/components/ProductCard";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import MantraText from "@/components/MantraText";

type Tab = "vastu" | "chakra" | "element" | "care";

const careGuide = `Pure brass requires gentle care to maintain its living quality.

\u2022 Wipe with a soft dry cloth weekly
\u2022 For deeper cleaning, use a paste of tamarind pulp or lemon juice with salt \u2014 rinse thoroughly and dry immediately
\u2022 Never use abrasive cleaners or steel wool
\u2022 Apply a thin coat of coconut oil monthly to preserve patina
\u2022 Keep away from prolonged direct water exposure
\u2022 The natural darkening of brass over time is called Tamra-patina \u2014 it is considered auspicious, not a flaw`;

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const product = getProductByHandle(handle ?? "");
  const { addItem, openCart, hasConsecration, toggleConsecration, hasDiya, toggleDiya } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>("vastu");
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [added, setAdded] = useState(false);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightboxOpen || !product) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActiveImage((i) => (i + 1) % product.images.length);
      if (e.key === "ArrowLeft") setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
    },
    [lightboxOpen, product]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-on-surface-faint mb-4">Form not found</p>
          <Link to="/collection" className="btn-outline">Return to Collection</Link>
        </div>
      </div>
    );
  }

  const variant = product.variants[0];

  function handleAdd() {
    addItem(variant.id);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  }

  const related = mainProducts
    .filter((p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t)))
    .slice(0, 4);

  const consecrationAddon = addonProducts.find((p) => p.variants[0].id === CONSECRATION_VARIANT_ID);
  const diyaAddon = addonProducts.find((p) => p.variants[0].id === DIYA_VARIANT_ID);

  const tabs: { key: Tab; label: string }[] = [
    { key: "vastu", label: "Vastu" },
    { key: "chakra", label: "Chakra" },
    { key: "element", label: "Element" },
    { key: "care", label: "Care" },
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface-2">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-body text-xs text-on-surface-faint hover:text-accent transition-colors"
          >
            <ArrowLeft size={12} /> Collection
          </button>
          <span className="text-border-strong">/</span>
          <span className="font-body text-xs text-on-surface-faint">{product.title}</span>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* Left — Gallery */}
          <div>
            {/* Main image */}
            <div
              className="aspect-[3/4] bg-surface-2 border border-border rounded-lg overflow-hidden mb-3 cursor-zoom-in relative group"
              onClick={() => setLightboxOpen(true)}
            >
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
                <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-70 transition-opacity" />
              </div>

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage((i) => (i + 1) % product.images.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Filmstrip thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 aspect-[3/4] border rounded-md overflow-hidden transition-all ${
                      i === activeImage
                        ? "border-accent ring-1 ring-accent/30"
                        : "border-border opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div>
            {product.tagline && (
              <p className="section-label mb-3">{product.tagline}</p>
            )}
            <h1 className="font-display text-4xl text-on-surface font-light mb-2">
              {product.title}
            </h1>
            {product.mantra && (
              <div className="mb-4">
                <MantraText text={product.mantra} />
              </div>
            )}

            <div className="ornament-line max-w-[200px] mb-6" />

            <p className="font-body text-on-surface-muted leading-relaxed mb-4">
              {product.description}
            </p>
            <p className="font-body text-sm text-on-surface-faint leading-relaxed mb-8">
              {product.longDescription}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span className="font-display text-3xl text-accent">{formatINR(variant.priceINR)}</span>
            </div>

            {/* Specs panel */}
            <div className="card-warm p-5 mb-6">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-on-surface-faint mb-4">Specifications</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {product.dimensions && (
                  <>
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Ruler size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint">Height</p>
                        <p className="font-display text-sm text-on-surface">{product.dimensions.height}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Box size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint">Size (L×B)</p>
                        <p className="font-display text-sm text-on-surface">{product.dimensions.width} × {product.dimensions.depth}</p>
                      </div>
                    </div>
                  </>
                )}
                {variant.weight && (
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Weight size={14} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint">Weight</p>
                      <p className="font-display text-sm text-on-surface">{variant.weight}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Palette size={14} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint">Finish</p>
                    <p className="font-display text-sm text-on-surface">Antique Brass</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50">
                <p className="font-body text-[10px] text-on-surface-faint">
                  100% solid brass · Hand-cast · Dhokra lost-wax technique · Haridwar origin
                </p>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-md font-body text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                added
                  ? "bg-surface-2 border border-accent/50 text-accent"
                  : "btn-primary"
              }`}
            >
              {added ? (
                <><Check size={14} /> Added to Altar</>
              ) : (
                <><Plus size={14} /> Add to Altar</>
              )}
            </button>

            {/* Consecration upsell */}
            {consecrationAddon && (
              <div
                className={`mt-4 p-5 border rounded-lg transition-colors cursor-pointer ${
                  hasConsecration
                    ? "border-accent/40 bg-accent/5"
                    : "border-border bg-surface-2"
                }`}
                onClick={toggleConsecration}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-base text-on-surface mb-1">{consecrationAddon.title}</p>
                    <p className="font-body text-xs text-on-surface-faint leading-relaxed">{consecrationAddon.description}</p>
                    <p className="font-body text-xs text-accent mt-2">+{formatINR(consecrationAddon.variants[0].priceINR)}</p>
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 border rounded flex items-center justify-center transition-colors ${
                    hasConsecration
                      ? "bg-accent border-accent text-obsidian"
                      : "border-border-strong"
                  }`}>
                    {hasConsecration && <Check size={12} />}
                  </div>
                </div>
              </div>
            )}

            {/* Diya upsell */}
            {diyaAddon && (
              <div
                className={`mt-3 p-5 border rounded-lg transition-colors cursor-pointer ${
                  hasDiya
                    ? "border-accent/40 bg-accent/5"
                    : "border-border bg-surface-2"
                }`}
                onClick={toggleDiya}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-base text-on-surface mb-1">{diyaAddon.title}</p>
                    <p className="font-body text-xs text-on-surface-faint leading-relaxed">
                      Hand-cast five-wick diya for daily puja. Complete your altar.
                    </p>
                    <p className="font-body text-xs text-accent mt-2">+{formatINR(diyaAddon.variants[0].priceINR)}</p>
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 border rounded flex items-center justify-center transition-colors ${
                    hasDiya
                      ? "bg-accent border-accent text-obsidian"
                      : "border-border-strong"
                  }`}>
                    {hasDiya && <Check size={12} />}
                  </div>
                </div>
              </div>
            )}

            {/* Stars */}
            <div className="flex items-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-accent fill-accent" />
                ))}
              </div>
              <span className="font-body text-xs text-on-surface-faint">4.9 · 23 verified buyers</span>
            </div>

            {/* Tabs */}
            <div className="mt-10">
              <div className="flex gap-6 border-b border-border mb-6 relative">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`${activeTab === t.key ? "tab-active" : "tab-inactive"}`}
                  >
                    <span className="font-body text-xs tracking-[0.2em] uppercase">{t.label}</span>
                    {activeTab === t.key && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="font-body text-sm text-on-surface-faint leading-relaxed"
                >
                  {activeTab === "vastu" && (
                    <p>{product.vastuPlacement || "Consult our Vastu guide for placement recommendations."}</p>
                  )}
                  {activeTab === "chakra" && (
                    <p>This form aligns with the <span className="text-accent">{product.chakra}</span> chakra. Regular darshan (viewing) with intention cultivates the qualities associated with this energy centre: {product.chakra?.includes("Root") ? "stability, groundedness, and security" : product.chakra?.includes("Heart") ? "compassion, love, and emotional equilibrium" : product.chakra?.includes("Crown") ? "clarity, transcendence, and spiritual connection" : product.chakra?.includes("Third Eye") ? "intuition, discernment, and inner vision" : "harmonic balance and energetic alignment"}.</p>
                  )}
                  {activeTab === "element" && (
                    <p>This murti resonates with the <span className="text-accent">{product.element}</span> element. In Vedic cosmology, {product.element === "Earth" ? "Earth forms provide grounding, structure, and a sense of permanence — place in areas where you need stability and rootedness." : product.element === "Water" ? "Water forms bring fluidity, emotional clarity, and receptivity — suited to spaces of rest, creativity, and healing." : product.element === "Fire" ? "Fire forms bring transformation, will, and the dissolution of stagnation — suited to spaces of action, creativity, and change." : product.element === "Air" ? "Air forms bring lightness, clarity, and the quality of open awareness — suited to meditation spaces and areas of study." : "Ether forms bring spaciousness, the silence beneath all sound — the deepest presence, suited to dedicated meditation spaces."}</p>
                  )}
                  {activeTab === "care" && (
                    <pre className="whitespace-pre-wrap font-body text-sm text-on-surface-faint leading-relaxed">{careGuide}</pre>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-b border-t border-border py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <OrnamentalDivider label="Related Forms" className="mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} variant="strip" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Navigation */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((i) => (i + 1) % product.images.length);
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image */}
            <motion.img
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.title}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Filmstrip */}
            {product.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(i);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === activeImage ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
