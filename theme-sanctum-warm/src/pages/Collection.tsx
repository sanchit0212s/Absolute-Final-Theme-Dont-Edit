import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ChevronDown, X } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import { mainProducts } from "@/data/products";
import { deities, matchProductToDeity, allChakras, allElements } from "@/data/deities";

const deityNames = [...new Set(deities.map((d) => d.name))];

function FilterDropdown({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 px-4 py-2.5 font-body text-xs tracking-wider uppercase border transition-all duration-200 ${
          selected
            ? "border-temple-gold bg-temple-gold/8 text-temple-gold"
            : "border-warm-tan/70 bg-antique-ivory/60 text-mahogany hover:border-temple-gold/50"
        }`}
      >
        {selected || label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-52 bg-parchment border border-warm-tan/60 shadow-lg z-20 py-1">
            <button
              onClick={() => { onSelect(""); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 font-body text-xs text-walnut hover:bg-antique-ivory hover:text-mahogany transition-colors"
            >
              All {label}s
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onSelect(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 font-body text-xs transition-colors ${
                  selected === opt
                    ? "bg-temple-gold/10 text-temple-gold"
                    : "text-mahogany hover:bg-antique-ivory hover:text-espresso"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const selectedDeity = searchParams.get("deity") || "";
  const selectedChakra = searchParams.get("chakra") || "";
  const selectedElement = searchParams.get("element") || "";

  function setParam(key: string, value: string) {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    setSearchParams(p);
  }

  function clearAll() {
    setSearchParams({});
    setSearchQuery("");
  }

  const hasFilters = selectedDeity || selectedChakra || selectedElement || searchQuery;

  const filteredProducts = useMemo(() => {
    let result = mainProducts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedDeity || selectedChakra || selectedElement) {
      result = result.filter((p) => {
        const deity = matchProductToDeity(p.title);
        if (!deity) return false;
        if (selectedDeity && !p.title.toLowerCase().includes(selectedDeity.toLowerCase())) return false;
        if (selectedChakra && deity.chakraKey !== selectedChakra) return false;
        if (selectedElement && deity.element !== selectedElement) return false;
        return true;
      });
    }

    return result;
  }, [searchQuery, selectedDeity, selectedChakra, selectedElement]);

  return (
    <div className="bg-section-a min-h-screen">
      {/* Page header */}
      <div className="bg-section-b border-b border-warm-tan/50 py-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-2 small-caps"
          >
            The Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-light text-espresso"
          >
            Sacred Brass Murtis
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-walnut text-sm mt-2"
          >
            {mainProducts.length} sacred forms, hand-cast in Haridwar
          </motion.p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-[100px] z-40 bg-parchment/97 border-b border-warm-tan/50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-walnut pointer-events-none" />
            <input
              type="text"
              placeholder="Search murtis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-antique-ivory/60 border border-warm-tan/70 font-body text-xs text-espresso placeholder:text-walnut/50 focus:outline-none focus:border-temple-gold/50 transition-colors"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-2 items-center">
            <FilterDropdown
              label="Deity"
              options={deityNames}
              selected={selectedDeity}
              onSelect={(v) => setParam("deity", v)}
            />
            <FilterDropdown
              label="Chakra"
              options={allChakras.map((c) => c.key)}
              selected={selectedChakra}
              onSelect={(v) => setParam("chakra", v)}
            />
            <FilterDropdown
              label="Element"
              options={allElements}
              selected={selectedElement}
              onSelect={(v) => setParam("element", v)}
            />
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 font-body text-xs text-walnut hover:text-saffron transition-colors px-2 py-2.5"
              >
                <X size={12} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="max-w-[1400px] mx-auto px-6 pb-3 flex flex-wrap gap-2">
            {searchQuery && (
              <span className="filter-chip">
                "{searchQuery}" <X size={10} onClick={() => setSearchQuery("")} />
              </span>
            )}
            {selectedDeity && (
              <span className="filter-chip">
                {selectedDeity} <X size={10} onClick={() => setParam("deity", "")} />
              </span>
            )}
            {selectedChakra && (
              <span className="filter-chip">
                {selectedChakra} <X size={10} onClick={() => setParam("chakra", "")} />
              </span>
            )}
            {selectedElement && (
              <span className="filter-chip">
                {selectedElement} <X size={10} onClick={() => setParam("element", "")} />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <OrnamentalDivider symbol="lotus" tight />
            <p className="font-display text-2xl text-espresso mb-2 mt-6">No murtis match your search</p>
            <p className="font-serif italic text-walnut text-sm mb-6">
              Try broadening your filters or explore the full collection.
            </p>
            <button onClick={clearAll} className="btn-outline-gold">Clear Filters</button>
          </div>
        ) : (
          <>
            <p className="font-body text-xs text-walnut tracking-wide mb-6">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? "murti" : "murtis"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Guide CTA strip */}
      <div className="bg-section-c border-t border-warm-tan/40 py-10">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-espresso mb-1">
              Not sure which deity to choose?
            </p>
            <p className="font-serif italic text-walnut text-sm">
              Our 2-minute guide matches you to the right sacred form.
            </p>
          </div>
          <Link to="/guide" className="btn-gold flex-shrink-0">
            Take the Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
