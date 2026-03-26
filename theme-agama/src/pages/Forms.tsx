import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, X, MessageCircle } from "lucide-react";
import { mainProducts } from "@/data/products";
import { deities, matchProductToDeity } from "@/data/deities";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";

export default function Forms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deityFilter, setDeityFilter] = useState(searchParams.get("deity") || "");
  const { addItem, openCart } = useCart();

  const filtered = useMemo(() => {
    if (!deityFilter) return mainProducts;
    return mainProducts.filter(p => {
      const d = matchProductToDeity(p.title);
      return d?.name === deityFilter;
    });
  }, [deityFilter]);

  function setFilter(name: string) {
    setDeityFilter(name);
    name ? setSearchParams({ deity: name }) : setSearchParams({});
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <p className="label-brass mb-3">The collection</p>
          <h1 className="font-display text-massive text-ink">
            All Forms
          </h1>
        </motion.div>

        <p className="font-body text-graphite max-w-lg mb-12">
          {mainProducts.length} deity forms. Each lost-wax cast in solid brass, individually
          consecrated, shipped from Haridwar.
        </p>

        {/* Deity filter — just names, horizontal */}
        <div className="flex items-center gap-4 flex-wrap mb-8 pb-6 border-b border-gallery">
          <button
            onClick={() => setFilter("")}
            className={`font-display text-xs tracking-[0.2em] uppercase transition-colors ${
              !deityFilter ? "text-brass" : "text-graphite hover:text-ink"
            }`}
          >
            All
          </button>
          {deities.slice(0, 10).map(d => (
            <button
              key={d.name}
              onClick={() => setFilter(d.name)}
              className={`font-display text-xs tracking-[0.2em] uppercase transition-colors ${
                deityFilter === d.name ? "text-brass" : "text-graphite hover:text-ink"
              }`}
            >
              {d.name}
            </button>
          ))}
          {deityFilter && (
            <button onClick={() => setFilter("")} className="text-graphite/40 hover:text-ink ml-2">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Grid — large, generous */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {filtered.map((p, i) => {
            const v = p.variants[0];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link to={`/form/${p.handle}`} className="group block">
                  <div className="aspect-[3/4] bg-gallery overflow-hidden mb-5 relative">
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1s]"
                    />
                    {/* Reserve on hover */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem(v.id); openCart(); }}
                      className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur-sm text-center font-display text-[10px] tracking-[0.3em] uppercase text-ink opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-brass hover:text-white"
                    >
                      Reserve
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label-brass text-[9px] mb-1">{p.tagline}</p>
                      <h3 className="font-display text-xl text-ink group-hover:text-brass transition-colors tracking-tight">
                        {p.title}
                      </h3>
                      {v.weight && (
                        <p className="font-display text-xs text-graphite mt-1">{v.weight} · solid brass</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-graphite group-hover:text-brass transition-colors flex-shrink-0 mt-1">
                      <span className="font-display text-sm">{formatINR(v.priceINR)}</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* WhatsApp strip */}
        <div className="mt-20 py-10 border-t border-gallery text-center">
          <p className="font-display text-lg text-ink mb-2 tracking-tight">Can't decide?</p>
          <p className="font-body text-sm text-graphite mb-6">Tell us what you need. We'll recommend the right form.</p>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20choosing%20a%20brass%20murti"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={14} /> Talk to Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
