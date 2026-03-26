import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Check, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useProduct, useMainProducts, useAddonProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { formatINR } from "@/utils/format";
import FormCard from "@/components/FormCard";

type Tab = "details" | "care" | "placement" | "tradition";

const careText = `Pure brass requires minimal but consistent care.

• Wipe weekly with a soft dry cloth
• Deep clean with tamarind or lemon-salt paste — rinse and dry immediately
• Monthly light coat of coconut oil preserves the patina
• Never use abrasives or prolonged water exposure
• The natural darkening over time adds character — it's meant to happen`;

export default function FormDetail() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { product, isLoading } = useProduct(handle);
  const { products: mainProducts } = useMainProducts();
  const { products: addonProducts } = useAddonProducts();

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const hasConsecration = useCartStore((s) => s.hasConsecration);
  const toggleConsecration = useCartStore((s) => s.toggleConsecration);

  const [tab, setTab] = useState<Tab>("details");
  const [img, setImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="font-body text-sm text-smoke">Loading…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-display text-2xl text-ink/20 mb-4">Piece not found</p>
          <Link to="/forms" className="btn-ghost">Back to collection</Link>
        </div>
      </div>
    );
  }

  const v = product.variants[0];
  const related = mainProducts.filter(p => p.id !== product.id).slice(0, 4);
  const consecration = addonProducts.find(p => p.handle === "shuddhi-poojan");

  function handleAdd() {
    addItem(v.id);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "care", label: "Care" },
    { key: "placement", label: "Placement Guide" },
    { key: "tradition", label: "Tradition" },
  ];

  return (
    <div className="min-h-screen pt-[72px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 font-body text-xs text-smoke hover:text-clay transition-colors">
          <ArrowLeft size={11} /> Back
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="aspect-[3/4] bg-linen overflow-hidden mb-3 sticky top-24">
              <img src={product.images[img]} alt={product.title} className="w-full h-full object-cover" />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((src, i) => (
                  <button key={i} onClick={() => setImg(i)} className={`w-14 h-14 overflow-hidden border transition-all duration-200 ${i === img ? "border-clay" : "border-transparent opacity-40 hover:opacity-70"}`}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <p className="overline-clay mb-3">{product.tagline}</p>
              <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-2">{product.title}</h1>
              {product.mantra && <p className="font-display italic text-smoke text-lg mb-5">{product.mantra}</p>}
              <div className="editorial-line mb-5" />
              <p className="font-body text-graphite leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-baseline justify-between pb-5 border-b border-ash mb-5">
                <span className="font-display text-3xl text-ink">{formatINR(v.priceINR)}</span>
                {v.weight && <span className="font-body text-xs text-smoke">{v.weight}</span>}
              </div>

              <button onClick={handleAdd} className={`w-full flex items-center justify-center gap-2 py-4 transition-all duration-300 mb-4 ${added ? "bg-ink text-paper font-body text-[11px] tracking-[0.3em] uppercase" : "btn-clay w-full justify-center"}`}>
                {added ? <><Check size={13} /> Added to Bag</> : <><Plus size={13} /> Add to Bag</>}
              </button>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Truck, text: "Free shipping" },
                  { icon: Shield, text: "Authenticity cert." },
                  { icon: RotateCcw, text: "14-day returns" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 py-2">
                    <Icon size={12} className="text-smoke" />
                    <span className="font-body text-[10px] text-smoke">{text}</span>
                  </div>
                ))}
              </div>

              {consecration && (
                <div className={`p-5 border transition-all duration-300 mb-6 cursor-pointer ${hasConsecration ? "border-clay bg-clay/[0.03]" : "border-ash hover:border-clay/50"}`} onClick={toggleConsecration}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-base text-ink mb-1">Add consecration ceremony</p>
                      <p className="font-body text-xs text-smoke leading-relaxed mb-1">Traditional Vedic Shuddhi Poojan performed before shipping. Optional.</p>
                      <p className="font-body text-sm text-ink">+{formatINR(consecration.variants[0].priceINR)}</p>
                    </div>
                    <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors ${hasConsecration ? "bg-clay border-clay text-white" : "border-ash"}`}>
                      {hasConsecration && <Check size={10} />}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mb-8">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-clay fill-clay" />)}</div>
                <span className="font-body text-xs text-smoke">4.9 · 23 reviews</span>
              </div>

              <div className="flex gap-4 border-b border-ash mb-5 overflow-x-auto">
                {tabs.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)} className={`whitespace-nowrap ${t.key === tab ? "tab-active" : "tab-inactive"}`}>{t.label}</button>
                ))}
              </div>
              <div className="font-body text-sm text-graphite leading-relaxed min-h-[80px]">
                {tab === "details" && (
                  <div className="space-y-3">
                    <p>{product.longDescription || product.description}</p>
                    <ul className="space-y-1.5 text-smoke text-xs">
                      <li>• Material: 100% solid brass (no hollow parts)</li>
                      {v.weight && <li>• Weight: {v.weight}</li>}
                      <li>• Finish: Hand-polished with natural patina development</li>
                      <li>• Method: Lost-wax (Dhokra) casting</li>
                      <li>• Origin: Haridwar, Uttarakhand</li>
                    </ul>
                  </div>
                )}
                {tab === "care" && <pre className="whitespace-pre-wrap font-body text-sm text-graphite leading-relaxed">{careText}</pre>}
                {tab === "placement" && (
                  <div className="space-y-3">
                    <p>{product.vastuPlacement}</p>
                    <p className="text-xs text-smoke">This piece works beautifully as a living room centerpiece, entryway accent, or study desk companion. Choose a spot where it will be seen and appreciated daily.</p>
                  </div>
                )}
                {tab === "tradition" && (
                  <div className="space-y-3">
                    <p>This piece is associated with the <span className="text-clay">{product.chakra}</span> chakra and resonates with the <span className="text-clay">{product.element}</span> element in traditional Indian philosophy.</p>
                    <p className="text-xs text-smoke">While rooted in ancient tradition, many of our customers choose pieces purely for their craftsmanship and aesthetic. The spiritual dimension is there for those who seek it — never imposed.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-ash py-14">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <p className="overline mb-8">You might also like</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((p, i) => <FormCard key={p.id} product={p} index={i} variant="minimal" />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
