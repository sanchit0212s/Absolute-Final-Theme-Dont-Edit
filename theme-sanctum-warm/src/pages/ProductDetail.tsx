import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Shield, Truck, Package, CheckCircle, Flame } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ProductCard from "@/components/ProductCard";
import { getProductByHandle, mainProducts } from "@/data/products";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";
import { matchProductToDeity } from "@/data/deities";

const tabs = ["Vastu Placement", "Chakra", "Element", "Care"] as const;
type Tab = (typeof tabs)[number];

export default function ProductDetail() {
  const { handle } = useParams<{ handle: string }>();
  const product = getProductByHandle(handle ?? "");

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("Vastu Placement");
  const [consecrationAdded, setConsecrationAdded] = useState(false);
  const { addItem, openCart, toggleConsecration, hasConsecration } = useCart();

  if (!product) return <Navigate to="/collection" replace />;

  const deity = matchProductToDeity(product.title);
  const variant = product.variants[0];
  const related = mainProducts.filter((p) => p.id !== product.id && p.chakra === product.chakra).slice(0, 3);

  function handleAddToCart() {
    addItem(variant.id);
    openCart();
  }

  const tabContent: Record<Tab, string> = {
    "Vastu Placement": product.vastuPlacement ?? "Vastu placement information coming soon.",
    Chakra: deity
      ? `${product.title} is associated with the ${deity.chakra} chakra. ${
          deity.chakraKey === "muladhara"
            ? "The Root Chakra (Muladhara) governs our sense of safety, grounding, and belonging. Activating this centre brings stability, security, and a felt sense of being rooted in life."
            : deity.chakraKey === "anahata"
            ? "The Heart Chakra (Anahata) is the centre of love, compassion, and devotion. When open and balanced, it enables giving and receiving love without fear or condition."
            : deity.chakraKey === "ajna"
            ? "The Third Eye Chakra (Ajna) governs intuition, clarity, and spiritual discernment. Activating it sharpens perception and dissolves confusion."
            : deity.chakraKey === "sahasrara"
            ? "The Crown Chakra (Sahasrara) connects us to the infinite. When activated, it brings a sense of unity, transcendence, and access to higher wisdom."
            : deity.chakraKey === "manipura"
            ? "The Solar Plexus Chakra (Manipura) governs personal power, will, and self-determination. It is the seat of action, discipline, and worldly success."
            : deity.chakraKey === "vishuddha"
            ? "The Throat Chakra (Vishuddha) governs authentic expression, truth, and creative voice. It enables communication that comes from the deepest part of oneself."
            : "The Sacral Chakra (Svadhisthana) governs creativity, pleasure, emotion, and adaptability. It is the seat of inspiration and the capacity to flow with life."
        }`
      : "Chakra information coming soon.",
    Element: deity
      ? `${product.title} is associated with the ${deity.element} element of the Pancha Tatva (five elements). ${
          deity.element === "Earth"
            ? "Earth (Prithvi) embodies solidity, support, nourishment, and endurance. Its quality is stability — the ground that holds everything else. Murtis associated with Earth are ideal for grounding spaces and invoking a felt sense of safety and permanence."
            : deity.element === "Water"
            ? "Water (Jala) embodies flow, adaptability, purification, and emotional nourishment. It dissolves what is rigid and enables feeling. Murtis associated with Water bring emotional clarity, healing, and the capacity for receptive, open-hearted presence."
            : deity.element === "Fire"
            ? "Fire (Agni) embodies transformation, will, illumination, and purification. It is the element of courage and the capacity to act. Murtis associated with Fire bring strength, clarity of purpose, and the power to overcome what obstructs."
            : deity.element === "Air"
            ? "Air (Vayu) embodies movement, communication, breath, and expansion. It governs thought, connection, and the ability to perceive beyond the immediate. Murtis associated with Air bring mental clarity, inspiration, and the capacity to release what is held."
            : "Ether (Akasha) is the subtlest element — the space in which all other elements arise. It embodies consciousness itself: unlimited, pervasive, and the ground of all potential. Murtis associated with Ether are particularly suited to meditation spaces and any room dedicated to spiritual practice."
        }`
      : "Element information coming soon.",
    Care: `Caring for your ${product.title} is itself a devotional act. Brass patinates naturally over time — this deepening of colour and character is not deterioration but the accumulation of intention and care.\n\nRegular care: Wipe with a soft dry cloth after handling. For regular cleaning, use a mixture of warm water and mild soap, then dry thoroughly. Polish with a soft cloth.\n\nFor worship: If using for daily puja with incense, flowers, or water offerings, clean gently after each use. Avoid acidic substances (lemon, vinegar) on the surface.\n\nPatina: Many devotees prefer to allow their murti to develop its natural patina through years of worship. This is entirely appropriate and traditional. If you prefer a bright brass finish, commercial brass polish applied monthly will maintain it.\n\nStorage: If not on display, wrap in clean cotton cloth. Never store in plastic, which can trap moisture and cause tarnishing.`,
  };

  return (
    <div className="bg-section-a min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Back link */}
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 font-body text-xs text-walnut hover:text-temple-gold transition-colors tracking-wider uppercase mb-8"
        >
          <ArrowLeft size={13} strokeWidth={1.5} />
          Back to Collection
        </Link>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-[3/4] bg-antique-ivory overflow-hidden border border-warm-tan/50 mb-4"
            >
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i
                        ? "border-temple-gold"
                        : "border-warm-tan/50 hover:border-temple-gold/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product info */}
          <div>
            {/* Deity chip + mantra */}
            {deity && (
              <div className="mb-3">
                <span className="inline-block font-body text-xs tracking-wide text-saffron uppercase bg-saffron/10 px-3 py-1.5 border border-saffron/20">
                  {deity.tagline}
                </span>
              </div>
            )}

            <h1 className="font-display text-4xl md:text-5xl font-light text-espresso leading-snug mb-2">
              {product.title}
            </h1>

            {deity && (
              <p className="font-serif italic text-walnut text-sm mb-4">
                {deity.mantra}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl text-temple-gold">
                {formatINR(variant.priceINR)}
              </span>
              <span className="font-body text-xs text-walnut tracking-wide">
                Includes packaging & shipping · India GST inclusive
              </span>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                { label: "Material", value: "100% Solid Brass" },
                { label: "Finish", value: "Antique Hand-Patina" },
                { label: "Origin", value: "Haridwar, Uttarakhand" },
                { label: "Size", value: variant.title },
              ].map(({ label, value }) => (
                <div key={label} className="bg-antique-ivory border border-warm-tan/50 p-3">
                  <p className="font-body text-[10px] tracking-widest text-walnut uppercase mb-1">{label}</p>
                  <p className="font-body text-sm text-espresso">{value}</p>
                </div>
              ))}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!variant.availableForSale}
              className="w-full btn-gold py-4 text-sm mb-6 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {variant.availableForSale ? "Add to Altar" : "Coming Soon"}
            </button>

            {/* Info tabs */}
            <div className="mb-6">
              <div className="flex border-b border-warm-tan/60 gap-0 mb-4 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-body text-xs tracking-wider uppercase px-4 py-3 whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab ? "tab-active" : "tab-inactive"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="font-body text-sm text-walnut leading-relaxed whitespace-pre-line">
                {tabContent[activeTab]}
              </div>
            </div>

            <OrnamentalDivider tight />

            {/* Consecration upsell */}
            <div
              className={`border p-5 transition-all duration-300 cursor-pointer ${
                hasConsecration
                  ? "border-temple-gold/50 bg-temple-gold/5"
                  : "border-saffron/25 bg-saffron/5 hover:border-saffron/50"
              }`}
              onClick={toggleConsecration}
            >
              <div className="flex items-start gap-4">
                <div className={`w-5 h-5 border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                  hasConsecration ? "border-temple-gold bg-temple-gold" : "border-saffron/50"
                }`}>
                  {hasConsecration && <span className="text-parchment text-[10px]">✓</span>}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-display text-base text-espresso">
                      Shuddhi Poojan — Consecration Service
                    </h3>
                    <span className="font-display text-base text-temple-gold flex-shrink-0">
                      + {formatINR(2499)}
                    </span>
                  </div>
                  <p className="font-body text-xs text-walnut leading-relaxed mb-3">
                    Prana Pratishtha performed by our resident temple pandit before your murti ships. Transforms sacred metal into sacred presence.
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      "Purification with Pancha Amrit",
                      "Mantra invocation specific to deity",
                      "Prana Pratishtha ceremony",
                      "Hand-written certificate included",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-1.5">
                        <Flame size={10} className="text-saffron mt-0.5 flex-shrink-0" />
                        <span className="font-body text-[11px] text-walnut">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OrnamentalDivider />

        {/* Product description */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-display text-3xl text-espresso mb-6">About This Murti</h2>
          <p className="font-serif italic text-base text-walnut leading-relaxed">
            {product.longDescription}
          </p>
        </div>

        <OrnamentalDivider symbol="lotus" />

        {/* Authenticity + Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Authenticity */}
          <div className="bg-section-b border border-warm-tan/60 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={18} className="text-temple-gold" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-espresso">Certificate of Authenticity</h3>
            </div>
            <p className="font-body text-sm text-walnut leading-relaxed mb-4">
              Every murti ships with a hand-written certificate documenting the artisan's name and lineage, alloy composition, and casting method.
            </p>
            <div className="space-y-2">
              {["Artisan name & lineage", "Alloy composition", "Casting method", "Unconditional guarantee"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-temple-gold flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-body text-xs text-mahogany">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-section-b border border-warm-tan/60 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck size={18} className="text-temple-gold" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-espresso">Shipping Timeline</h3>
            </div>
            <div className="space-y-4">
              {[
                { icon: Package, label: "Artisan Casting & QC", time: "Day 1–5" },
                { icon: Flame, label: "Prana Pratishtha (if selected)", time: "Day 5–7" },
                { icon: Package, label: "Sacred Packaging & Dispatch", time: "Day 7–9" },
                { icon: Truck, label: "Delivery (India)", time: "Day 10–14" },
                { icon: Truck, label: "Delivery (International)", time: "Day 14–21" },
              ].map(({ icon: Icon, label, time }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-temple-gold/10 flex items-center justify-center">
                      <Icon size={11} className="text-temple-gold" strokeWidth={1.5} />
                    </div>
                    <span className="font-body text-xs text-mahogany">{label}</span>
                  </div>
                  <span className="font-body text-xs text-temple-gold">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <>
            <OrnamentalDivider />
            <div>
              <h2 className="font-display text-3xl text-espresso text-center mb-8">
                You May Also Resonate With
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
