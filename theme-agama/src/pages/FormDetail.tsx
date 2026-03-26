import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { getProductByHandle, mainProducts, addonProducts, CONSECRATION_VARIANT_ID } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";

export default function FormDetail() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const product = getProductByHandle(handle ?? "");
  const { addItem, openCart, hasConsecration, toggleConsecration } = useCart();
  const [reserved, setReserved] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-display text-2xl text-ink/20 mb-4">Form not found</p>
          <Link to="/forms" className="btn-ghost">← All Forms</Link>
        </div>
      </div>
    );
  }

  const v = product.variants[0];
  const consecration = addonProducts.find(p => p.variants[0].id === CONSECRATION_VARIANT_ID);
  const related = mainProducts.filter(p => p.id !== product.id).slice(0, 3);

  function handleReserve() {
    addItem(v.id);
    setReserved(true);
    openCart();
    setTimeout(() => setReserved(false), 3000);
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10">
        <button onClick={() => navigate(-1)} className="btn-ghost text-[10px] text-graphite">
          <ArrowLeft size={11} /> Back
        </button>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Image — 7 cols */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-gallery overflow-hidden sticky top-24"
            >
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Info — 5 cols */}
          <div className="lg:col-span-5">

            {/* THE WEIGHT — hero metric */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-metric text-ink mb-1">
                {v.weight || "1.8 kg"}
              </p>
              <p className="font-body text-xs text-graphite mb-8">Solid brass. Not hollow.</p>
            </motion.div>

            <p className="label-brass mb-2">{product.tagline}</p>
            <h1 className="font-display text-3xl md:text-4xl text-ink tracking-tight leading-tight mb-2">
              {product.title}
            </h1>
            {product.mantra && (
              <p className="font-body italic text-graphite mb-6">{product.mantra}</p>
            )}

            <p className="font-body text-charcoal leading-relaxed mb-4">{product.description}</p>
            <p className="font-body text-sm text-graphite leading-relaxed mb-8">{product.longDescription}</p>

            {/* Artisan attribution */}
            <div className="flex items-center gap-3 py-5 border-y border-gallery mb-8">
              <div className="w-8 h-8 rounded-full bg-gallery overflow-hidden">
                <img src="https://picsum.photos/seed/artisan-gopal/32/32" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-display text-xs text-ink">Cast by Shri Gopal Vishwakarma</p>
                <p className="font-body text-[10px] text-graphite">24th year · Haridwar workshop</p>
              </div>
            </div>

            {/* Price */}
            <p className="font-display text-3xl text-ink mb-6">{formatINR(v.priceINR)}</p>

            {/* Reserve */}
            <button
              onClick={handleReserve}
              className={`w-full py-4 font-display text-[11px] tracking-[0.25em] uppercase transition-all duration-300 mb-3 flex items-center justify-center gap-2 ${
                reserved ? "bg-ink text-white" : "btn-black w-full"
              }`}
            >
              {reserved ? <><Check size={13} /> Reserved</> : "Reserve This Form"}
            </button>

            <a
              href={`https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(product.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-whatsapp mb-8"
            >
              <MessageCircle size={13} /> Ask About This on WhatsApp
            </a>

            {/* Consecration as event */}
            {consecration && (
              <div
                onClick={toggleConsecration}
                className={`p-5 border cursor-pointer transition-all mb-8 ${
                  hasConsecration ? "border-brass bg-brass/[0.03]" : "border-gallery hover:border-brass/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-sm text-ink mb-1">Add consecration ceremony</p>
                    <p className="font-body text-xs text-graphite leading-relaxed mb-1">
                      Vedic Shuddhi Poojan by Pandit Suresh Tiwari. Next ceremony: April 3.
                    </p>
                    <p className="font-display text-sm text-ink">+{formatINR(consecration.variants[0].priceINR)}</p>
                  </div>
                  <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors ${
                    hasConsecration ? "bg-brass border-brass text-white" : "border-gallery"
                  }`}>
                    {hasConsecration && <Check size={10} />}
                  </div>
                </div>
              </div>
            )}

            {/* Specs */}
            <div className="space-y-4 py-6 border-t border-gallery">
              {[
                ["Placement", product.vastuPlacement],
                ["Chakra", product.chakra],
                ["Element", product.element],
              ].map(([label, val]) => val && (
                <div key={label as string} className="flex items-start gap-4">
                  <span className="label w-20 flex-shrink-0 pt-0.5">{label}</span>
                  <span className="font-body text-sm text-charcoal leading-relaxed">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-24 pt-12 border-t border-gallery">
        <p className="label mb-8">Other forms</p>
        <div className="grid grid-cols-3 gap-6">
          {related.map(p => (
            <Link key={p.id} to={`/form/${p.handle}`} className="group block">
              <div className="aspect-[3/4] bg-gallery overflow-hidden mb-3">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <p className="font-display text-sm text-ink group-hover:text-brass transition-colors">{p.title}</p>
              <p className="font-display text-xs text-graphite">{p.variants[0].weight} · {formatINR(p.variants[0].priceINR)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
