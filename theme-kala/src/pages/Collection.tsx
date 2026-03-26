import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { mainProducts } from "@/data/products";
import { deities, allChakras, allElements, matchProductToDeity } from "@/data/deities";
import ProductCard from "@/components/ProductCard";
import OrnamentalDivider from "@/components/OrnamentalDivider";

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDeity = searchParams.get("deity") || "";
  const initialDeities = initialDeity ? initialDeity.split(",") : [];
  const [selectedDeities, setSelectedDeities] = useState<string[]>(initialDeities);
  const [selectedChakra, setSelectedChakra] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  // Get unique deities from products
  const productDeities = useMemo(() => {
    const names = new Set<string>();
    mainProducts.forEach((p) => {
      const d = matchProductToDeity(p.title);
      if (d) names.add(d.name);
    });
    return Array.from(names);
  }, []);

  const filtered = useMemo(() => {
    let results = mainProducts;

    if (selectedDeities.length > 0) {
      results = results.filter((p) => {
        const d = matchProductToDeity(p.title);
        return d && selectedDeities.includes(d.name);
      });
    }
    if (selectedChakra) {
      results = results.filter((p) =>
        p.tags.some((t) => t.startsWith("chakra:") && t.includes(selectedChakra))
      );
    }
    if (selectedElement) {
      results = results.filter((p) =>
        p.tags.some((t) => t === `element:${selectedElement}`)
      );
    }

    if (sortBy === "price-asc") {
      results = [...results].sort((a, b) => a.variants[0].priceINR - b.variants[0].priceINR);
    } else if (sortBy === "price-desc") {
      results = [...results].sort((a, b) => b.variants[0].priceINR - a.variants[0].priceINR);
    }

    return results;
  }, [selectedDeities, selectedChakra, selectedElement, sortBy]);

  function clearFilters() {
    setSelectedDeities([]);
    setSelectedChakra("");
    setSelectedElement("");
    setSearchParams({});
  }

  function selectDeity(name: string) {
    if (!name) {
      setSelectedDeities([]);
      setSearchParams({});
      return;
    }
    const next = selectedDeities.includes(name)
      ? selectedDeities.filter((d) => d !== name)
      : [...selectedDeities, name];
    setSelectedDeities(next);
    if (next.length > 0) {
      setSearchParams({ deity: next.join(",") });
    } else {
      setSearchParams({});
    }
  }

  const hasActiveFilters = selectedDeities.length > 0 || selectedChakra || selectedElement;

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="section-b border-b border-border py-10">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="section-label mb-2">The Collection</p>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface font-light">
            Sacred Forms
          </h1>
          <p className="font-body text-sm text-on-surface-faint mt-3 max-w-md mx-auto">
            Hand-cast brass deity murtis from Haridwar. Each form chosen with intention.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 bg-surface/95 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Row 1: Controls — Sort + More Filters */}
          <div className="flex items-center justify-between py-3 border-b border-border/40">
            <p className="font-body text-xs text-on-surface-faint">
              {filtered.length} {filtered.length === 1 ? "form" : "forms"}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-3 text-accent hover:text-accent/80 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className={`flex items-center gap-1.5 font-body text-xs tracking-wider transition-colors ${
                  showMoreFilters || selectedChakra || selectedElement
                    ? "text-accent"
                    : "text-on-surface-faint hover:text-on-surface-muted"
                }`}
              >
                <SlidersHorizontal size={14} />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown size={12} className={`transition-transform ${showMoreFilters ? "rotate-180" : ""}`} />
              </button>

              <div className="w-px h-4 bg-border/60" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="font-body text-xs bg-transparent text-on-surface-faint border border-border rounded-md px-3 py-1.5 focus:outline-none focus:border-accent"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* Row 2: Deity chips — horizontal scroll */}
          <div className="py-3 -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max">
              <button
                onClick={() => selectDeity("")}
                className={selectedDeities.length === 0 ? "filter-chip-active" : "filter-chip"}
              >
                All Deities
              </button>
              <div className="w-px h-5 bg-border/50 mx-1" />
              {productDeities.map((name) => (
                <button
                  key={name}
                  onClick={() => selectDeity(name)}
                  className={selectedDeities.includes(name) ? "filter-chip-active" : "filter-chip"}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Expandable: Chakra + Element filters */}
          <AnimatePresence>
            {showMoreFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pb-4 pt-1 border-t border-border/40 grid sm:grid-cols-2 gap-5">
                  {/* Chakra filter */}
                  <div>
                    <span className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint block mb-2 mt-3">
                      Chakra
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {allChakras.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => setSelectedChakra(selectedChakra === c.key ? "" : c.key)}
                          className={selectedChakra === c.key ? "filter-chip-active" : "filter-chip"}
                        >
                          {c.name.split(" (")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Element filter */}
                  <div>
                    <span className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint block mb-2 mt-3">
                      Element
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {allElements.map((el) => (
                        <button
                          key={el}
                          onClick={() => setSelectedElement(selectedElement === el ? "" : el)}
                          className={selectedElement === el ? "filter-chip-active" : "filter-chip"}
                        >
                          {el}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter tags */}
          {(selectedChakra || selectedElement) && (
            <div className="flex items-center gap-2 pb-3">
              <span className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint">Active:</span>
              {selectedChakra && (
                <span className="filter-chip-active flex items-center gap-1.5">
                  {allChakras.find(c => c.key === selectedChakra)?.name.split(" (")[0]}
                  <button onClick={() => setSelectedChakra("")}><X size={10} /></button>
                </span>
              )}
              {selectedElement && (
                <span className="filter-chip-active flex items-center gap-1.5">
                  {selectedElement}
                  <button onClick={() => setSelectedElement("")}><X size={10} /></button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <section className="py-12 bg-grain">
        <div className="max-w-[1400px] mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-on-surface-faint mb-3">No forms match your filters</p>
              <button onClick={clearFilters} className="btn-outline">
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${selectedDeities.join(",")}-${selectedChakra}-${selectedElement}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
