import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Check, Star } from "lucide-react";
import { getProductByHandle, mainProducts, addonProducts, CONSECRATION_VARIANT_ID, DIYA_VARIANT_ID } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";
import ProductCard from "@/components/ProductCard";
import CopperRule from "@/components/CopperRule";

type Tab = "vastu" | "chakra" | "element" | "care";

const careGuide = `Pure brass requires gentle care to maintain its living quality.

• Wipe with a soft dry cloth weekly
• For deeper cleaning, use a paste of tamarind pulp or lemon juice with salt — rinse thoroughly and dry immediately
• Never use abrasive cleaners or steel wool
• Apply a thin coat of coconut oil monthly to preserve patina
• Keep away from prolonged direct water exposure
• The natural darkening of brass over time is called Tamra-patina — it is considered auspicious, not a flaw`;

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const product = getProductByHandle(handle ?? "");
  const { addItem, openCart, hasConsecration, toggleConsecration, hasDiya, toggleDiya } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>("vastu");
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-ivory/40 mb-4">Form not found</p>
          <Link to="/collection" className="btn-outline-copper">Return to Collection</Link>
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
    <div className="bg-night min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-ember/30 bg-night-mid">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-body text-xs text-stone/50 hover:text-copper transition-colors"
          >
            <ArrowLeft size={12} /> Collection
          </button>
          <span className="text-ember/60">·</span>
          <span className="font-body text-xs text-stone/40">{product.title}</span>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* Left — Gallery */}
          <div>
            <div className="aspect-[3/4] bg-dusk border border-ember/40 overflow-hidden mb-3">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 aspect-[3/4] border overflow-hidden transition-colors ${
                      i === activeImage ? "border-copper/60" : "border-ember/40 opacity-50 hover:opacity-80"
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
            <h1 className="font-display text-4xl text-ivory font-light mb-2">
              {product.title}
            </h1>
            {product.mantra && (
              <p className="font-body text-xs text-stone/40 tracking-widest italic mb-4">
                {product.mantra}
              </p>
            )}

            <CopperRule className="mb-6 max-w-[200px]" />

            <p className="font-body text-stone/70 leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="font-body text-sm text-stone/60 leading-relaxed mb-8">
              {product.longDescription}
            </p>

            {/* Price + weight */}
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-display text-3xl text-copper">{formatINR(variant.priceINR)}</span>
              {variant.weight && (
                <span className="font-body text-xs text-stone/40">{variant.weight} · {variant.title}</span>
              )}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 py-4 font-body text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                added
                  ? "bg-dusk border border-copper/60 text-copper"
                  : "btn-copper"
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
              <div className={`mt-4 p-5 border transition-colors ${
                hasConsecration
                  ? "border-copper/50 bg-copper/5"
                  : "border-ember/40 bg-dusk/50"
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-base text-ivory mb-1">
                      {consecrationAddon.title}
                    </p>
                    <p className="font-body text-xs text-stone/60 leading-relaxed">
                      {consecrationAddon.description}
                    </p>
                    <p className="font-body text-xs text-copper mt-2">
                      +{formatINR(consecrationAddon.variants[0].priceINR)}
                    </p>
                  </div>
                  <button
                    onClick={toggleConsecration}
                    className={`flex-shrink-0 w-6 h-6 border flex items-center justify-center transition-colors ${
                      hasConsecration
                        ? "bg-copper border-copper text-night"
                        : "border-ember/60 text-transparent hover:border-copper/40"
                    }`}
                  >
                    <Check size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Diya upsell */}
            {diyaAddon && (
              <div className={`mt-3 p-5 border transition-colors ${
                hasDiya
                  ? "border-copper/50 bg-copper/5"
                  : "border-ember/40 bg-dusk/50"
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-base text-ivory mb-1">
                      {diyaAddon.title}
                    </p>
                    <p className="font-body text-xs text-stone/60 leading-relaxed">
                      Hand-cast five-wick diya for daily puja. Complete your altar.
                    </p>
                    <p className="font-body text-xs text-copper mt-2">
                      +{formatINR(diyaAddon.variants[0].priceINR)}
                    </p>
                  </div>
                  <button
                    onClick={toggleDiya}
                    className={`flex-shrink-0 w-6 h-6 border flex items-center justify-center transition-colors ${
                      hasDiya
                        ? "bg-copper border-copper text-night"
                        : "border-ember/60 text-transparent hover:border-copper/40"
                    }`}
                  >
                    <Check size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Stars */}
            <div className="flex items-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-copper fill-copper" />
                ))}
              </div>
              <span className="font-body text-xs text-stone/40">4.9 · 23 verified buyers</span>
            </div>

            {/* Tabs */}
            <div className="mt-10">
              <div className="flex gap-6 border-b border-ember/40 mb-6">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={activeTab === t.key ? "tab-rasa-active" : "tab-rasa-inactive"}
                  >
                    <span className="font-body text-xs tracking-[0.2em] uppercase">{t.label}</span>
                  </button>
                ))}
              </div>
              <div className="font-body text-sm text-stone/60 leading-relaxed">
                {activeTab === "vastu" && (
                  <p>{product.vastuPlacement || "Consult our Vastu guide for placement recommendations."}</p>
                )}
                {activeTab === "chakra" && (
                  <p>This form aligns with the <span className="text-copper">{product.chakra}</span> chakra. Regular darshan (viewing) with intention cultivates the qualities associated with this energy centre: {product.chakra?.includes("Root") ? "stability, groundedness, and security" : product.chakra?.includes("Heart") ? "compassion, love, and emotional equilibrium" : product.chakra?.includes("Crown") ? "clarity, transcendence, and spiritual connection" : product.chakra?.includes("Third Eye") ? "intuition, discernment, and inner vision" : "harmonic balance and energetic alignment"}.</p>
                )}
                {activeTab === "element" && (
                  <p>This murti resonates with the <span className="text-copper">{product.element}</span> element. In Vedic cosmology, {product.element === "Earth" ? "Earth forms provide grounding, structure, and a sense of permanence — place in areas where you need stability and rootedness." : product.element === "Water" ? "Water forms bring fluidity, emotional clarity, and receptivity — suited to spaces of rest, creativity, and healing." : product.element === "Fire" ? "Fire forms bring transformation, will, and the dissolution of stagnation — suited to spaces of action, creativity, and change." : product.element === "Air" ? "Air forms bring lightness, clarity, and the quality of open awareness — suited to meditation spaces and areas of study." : "Ether forms bring spaciousness, the silence beneath all sound — the deepest presence, suited to dedicated meditation spaces."}
                  </p>
                )}
                {activeTab === "care" && (
                  <pre className="whitespace-pre-wrap font-body text-sm text-stone/60 leading-relaxed">{careGuide}</pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-night-mid border-t border-ember/40 py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <CopperRule label="Related Forms" className="mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} variant="strip" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
