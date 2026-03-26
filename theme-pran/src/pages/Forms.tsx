import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useMainProducts } from "@/hooks/useProducts";
import { deities, allChakras, allElements, matchProductToDeity } from "@/data/deities";
import FormCard from "@/components/FormCard";

interface Filter { deity: string; chakra: string; element: string }

function FilterSelect({
  label, options, value, onChange,
}: {
  label: string; options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase transition-all px-4 py-2 border ${
          value ? "border-clay text-clay" : "border-ash text-graphite hover:border-ink"
        }`}
      >
        {selected ? selected.label : label}
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-paper border border-ash z-20 min-w-[180px] py-1 shadow-md">
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full text-left px-4 py-2 font-body text-xs text-smoke hover:text-clay tracking-wider"
            >
              All
            </button>
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2 font-body text-xs tracking-wider transition-colors ${
                  o.value === value ? "text-clay" : "text-graphite hover:text-clay"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Forms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products: mainProducts, isLoading } = useMainProducts();
  const [filters, setFilters] = useState<Filter>({
    deity: searchParams.get("deity") || "",
    chakra: searchParams.get("chakra") || "",
    element: searchParams.get("element") || "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const setFilter = (key: keyof Filter) => (value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    const p: Record<string, string> = {};
    if (next.deity) p.deity = next.deity;
    if (next.chakra) p.chakra = next.chakra;
    if (next.element) p.element = next.element;
    setSearchParams(p);
  };

  const clearAll = () => { setFilters({ deity: "", chakra: "", element: "" }); setSearchParams({}); };

  const filtered = useMemo(() => mainProducts.filter((p) => {
    const d = matchProductToDeity(p.title);
    if (filters.deity && d?.name !== filters.deity) return false;
    if (filters.chakra && d?.chakraKey !== filters.chakra) return false;
    if (filters.element && d?.element !== filters.element) return false;
    return true;
  }), [filters, mainProducts]);

  const activeCount = [filters.deity, filters.chakra, filters.element].filter(Boolean).length;
  const hasAdvancedFilters = !!(filters.chakra || filters.element);

  return (
    <div className="min-h-screen pt-[72px]">

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="overline-clay mb-3">The collection</p>
          <h1 className="font-display text-hero text-ink leading-none mb-3">
            All Pieces
          </h1>
          <p className="font-body text-graphite max-w-lg">
            Thirteen handcrafted brass sculptures, each lost-wax cast by Haridwar artisans.
            Find the perfect piece for your home.
          </p>
        </motion.div>
      </div>

      <div className="editorial-line max-w-[1400px] mx-auto ml-6 md:ml-10 mb-6" />

      {/* Filter bar */}
      <div className="sticky top-[72px] z-40 bg-paper/95 backdrop-blur-sm border-b border-ash">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Primary filter — Deity (always visible) */}
            <FilterSelect
              label="Deity"
              options={deities.map(d => ({ value: d.name, label: d.name }))}
              value={filters.deity}
              onChange={setFilter("deity")}
            />

            {/* Toggle for advanced filters */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase transition-all px-4 py-2 border ${
                hasAdvancedFilters || showAdvanced
                  ? "border-clay/50 text-clay"
                  : "border-ash text-smoke hover:border-ink hover:text-graphite"
              }`}
            >
              <SlidersHorizontal size={11} />
              More Filters
              {hasAdvancedFilters && (
                <span className="w-4 h-4 bg-clay text-white text-[8px] rounded-full flex items-center justify-center">
                  {[filters.chakra, filters.element].filter(Boolean).length}
                </span>
              )}
            </button>

            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 font-body text-[10px] text-clay tracking-wider uppercase hover:opacity-70 transition-opacity"
              >
                <X size={10} /> Clear all
              </button>
            )}
            <span className="ml-auto font-body text-xs text-smoke">
              {filtered.length} piece{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Advanced filters — slide down */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-3 pt-3 pb-1 border-t border-ash/50 mt-3">
                  <span className="font-body text-[10px] text-smoke tracking-wider">Filter by:</span>
                  <FilterSelect
                    label="Chakra"
                    options={allChakras.map(c => ({ value: c.key, label: c.name }))}
                    value={filters.chakra}
                    onChange={setFilter("chakra")}
                  />
                  <FilterSelect
                    label="Element"
                    options={allElements.map(e => ({ value: e, label: e }))}
                    value={filters.element}
                    onChange={setFilter("element")}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-28">
            <p className="font-display text-2xl text-ink/20 mb-4">No pieces match</p>
            <button onClick={clearAll} className="btn-ghost">Clear filters</button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
          >
            {filtered.map((p, i) => (
              <FormCard key={p.id} product={p} index={i} variant="editorial" />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
