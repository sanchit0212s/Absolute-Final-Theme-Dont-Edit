import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { mainProducts } from "@/data/products";
import { deities, allChakras, allElements, matchProductToDeity } from "@/data/deities";
import ProductCard from "@/components/ProductCard";
import LotusRule from "@/components/LotusRule";

interface Filter { deity: string; chakra: string; element: string }

function Dropdown({
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
        className={`flex items-center gap-2 px-5 py-2.5 border-2 font-body text-xs tracking-widest uppercase transition-all ${
          value
            ? "border-saffron bg-saffron text-white"
            : "border-sand text-bark hover:border-saffron hover:text-saffron"
        }`}
      >
        {selected ? selected.label : label}
        <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-ivory border border-sand/60 z-20 min-w-[200px] py-1 shadow-lg">
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full text-left px-4 py-2.5 font-body text-xs text-bark hover:text-saffron tracking-wider"
            >
              All {label}s
            </button>
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 font-body text-xs tracking-wider transition-colors ${
                  o.value === value ? "text-saffron bg-saffron/5" : "text-mahogany hover:text-saffron hover:bg-saffron/5"
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

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filter>({
    deity: searchParams.get("deity") || "",
    chakra: searchParams.get("chakra") || "",
    element: searchParams.get("element") || "",
  });

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
  }), [filters]);

  const activeCount = [filters.deity, filters.chakra, filters.element].filter(Boolean).length;

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header — saffron accent bar */}
      <section className="pt-16">
        <div className="bg-saffron py-14 px-6">
          <div className="max-w-[1400px] mx-auto">
            <p className="overline-label text-white/60 mb-3">Divine Arts</p>
            <h1
              className="font-display text-white font-light"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "0.95" }}
            >
              The Collection
            </h1>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-40 bg-ivory border-b border-sand/50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center gap-4 flex-wrap">
          <Dropdown
            label="Deity"
            options={deities.map(d => ({ value: d.name, label: d.name }))}
            value={filters.deity}
            onChange={setFilter("deity")}
          />
          <Dropdown
            label="Chakra"
            options={allChakras.map(c => ({ value: c.key, label: c.name }))}
            value={filters.chakra}
            onChange={setFilter("chakra")}
          />
          <Dropdown
            label="Element"
            options={allElements.map(e => ({ value: e, label: e }))}
            value={filters.element}
            onChange={setFilter("element")}
          />
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 font-body text-xs text-kumkum hover:text-kumkum/70 tracking-wider uppercase transition-colors"
            >
              <X size={12} /> Clear
            </button>
          )}
          <span className="ml-auto font-body text-xs text-bark">
            {filtered.length} {filtered.length === 1 ? "form" : "forms"}
          </span>
        </div>

        {/* Active chips */}
        {activeCount > 0 && (
          <div className="max-w-[1400px] mx-auto px-6 pb-3 flex gap-2 flex-wrap">
            {filters.deity && (
              <span className="chip-active flex items-center gap-1.5 text-[9px] py-1">
                {filters.deity} <button onClick={() => setFilter("deity")("")}><X size={9} /></button>
              </span>
            )}
            {filters.chakra && (
              <span className="chip-active flex items-center gap-1.5 text-[9px] py-1">
                {allChakras.find(c => c.key === filters.chakra)?.name} <button onClick={() => setFilter("chakra")("")}><X size={9} /></button>
              </span>
            )}
            {filters.element && (
              <span className="chip-active flex items-center gap-1.5 text-[9px] py-1">
                {filters.element} <button onClick={() => setFilter("element")("")}><X size={9} /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-espresso/30 mb-3">No forms found</p>
            <button onClick={clearAll} className="btn-saffron mt-6">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} variant="square" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
