import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { mainProducts } from "@/data/products";
import { deities, allChakras, allElements, matchProductToDeity } from "@/data/deities";
import ProductCard from "@/components/ProductCard";
import CopperRule from "@/components/CopperRule";

interface Filter {
  deity: string;
  chakra: string;
  element: string;
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 border font-body text-xs tracking-wider uppercase transition-colors ${
          value
            ? "border-copper/60 text-copper"
            : "border-ember/50 text-stone/60 hover:border-copper/40 hover:text-stone/80"
        }`}
      >
        {selected ? selected.label : label}
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-dusk border border-ember/60 z-20 min-w-[180px] py-1 shadow-xl">
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className="w-full text-left px-4 py-2 font-body text-xs text-stone/40 hover:text-stone/70 tracking-wider"
            >
              All
            </button>
            {options.map((o) => (
              <button
                key={o.value}
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 font-body text-xs tracking-wider transition-colors ${
                  o.value === value
                    ? "text-copper bg-copper/5"
                    : "text-stone/70 hover:text-ivory hover:bg-ember/20"
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
    const params: Record<string, string> = {};
    if (next.deity) params.deity = next.deity;
    if (next.chakra) params.chakra = next.chakra;
    if (next.element) params.element = next.element;
    setSearchParams(params);
  };

  const clearAll = () => {
    setFilters({ deity: "", chakra: "", element: "" });
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    return mainProducts.filter((p) => {
      const deity = matchProductToDeity(p.title);
      if (filters.deity && deity?.name !== filters.deity) return false;
      if (filters.chakra && deity?.chakraKey !== filters.chakra) return false;
      if (filters.element && deity?.element !== filters.element) return false;
      return true;
    });
  }, [filters]);

  const activeCount = [filters.deity, filters.chakra, filters.element].filter(Boolean).length;

  const deityOptions = deities.map((d) => ({ value: d.name, label: d.name }));
  const chakraOptions = allChakras.map((c) => ({ value: c.key, label: c.name }));
  const elementOptions = allElements.map((e) => ({ value: e, label: e }));

  return (
    <div className="bg-night min-h-screen">
      {/* Header */}
      <section className="border-b border-ember/40 py-12 bg-night-mid">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="section-label mb-2">Divine Arts</p>
          <h1 className="font-display text-4xl text-ivory font-light">The Collection</h1>
          <CopperRule className="mt-4 max-w-xs" />
        </div>
      </section>

      {/* Sticky filters */}
      <div className="sticky top-16 z-40 bg-night/97 border-b border-ember/40 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
          <FilterDropdown
            label="Deity"
            options={deityOptions}
            value={filters.deity}
            onChange={setFilter("deity")}
          />
          <FilterDropdown
            label="Chakra"
            options={chakraOptions}
            value={filters.chakra}
            onChange={setFilter("chakra")}
          />
          <FilterDropdown
            label="Element"
            options={elementOptions}
            value={filters.element}
            onChange={setFilter("element")}
          />

          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3 py-2 font-body text-xs text-cinnabar/70 hover:text-cinnabar tracking-wider transition-colors"
            >
              <X size={12} /> Clear all
            </button>
          )}

          <span className="ml-auto font-body text-xs text-stone/40">
            {filtered.length} {filtered.length === 1 ? "form" : "forms"}
          </span>
        </div>

        {/* Active filter chips */}
        {activeCount > 0 && (
          <div className="max-w-[1400px] mx-auto px-6 pb-3 flex gap-2 flex-wrap">
            {filters.deity && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-copper/10 border border-copper/30 font-body text-xs text-copper">
                Deity: {filters.deity}
                <button onClick={() => setFilter("deity")("")}><X size={10} /></button>
              </span>
            )}
            {filters.chakra && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-copper/10 border border-copper/30 font-body text-xs text-copper">
                Chakra: {allChakras.find(c => c.key === filters.chakra)?.name}
                <button onClick={() => setFilter("chakra")("")}><X size={10} /></button>
              </span>
            )}
            {filters.element && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-copper/10 border border-copper/30 font-body text-xs text-copper">
                Element: {filters.element}
                <button onClick={() => setFilter("element")("")}><X size={10} /></button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-ivory/40 mb-3">No forms found</p>
            <p className="font-body text-sm text-stone/40 mb-6">Try adjusting your filters</p>
            <button onClick={clearAll} className="btn-outline-copper">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} variant="grid" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
