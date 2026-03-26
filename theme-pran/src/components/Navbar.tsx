import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/cartStore";

const links = [
  { label: "Collection", to: "/forms" },
  { label: "Find Your Piece", to: "/discover" },
  { label: "Our Story", to: "/workshop" },
  { label: "Contact", to: "/connect" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQuantity = useCartStore((s) => s.totalQuantity);
  const openCart = useCartStore((s) => s.openCart);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-paper/95 backdrop-blur-md shadow-[0_1px_0_hsl(var(--ash))]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          <Link to="/" className="font-display text-lg tracking-[0.15em] text-ink hover:text-clay transition-colors duration-300">
            Divine Arts
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative font-body text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                  location.pathname === l.to ? "text-clay" : "text-graphite hover:text-ink"
                }`}
              >
                {l.label}
                {location.pathname === l.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-clay"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 font-body text-[11px] tracking-[0.25em] uppercase text-graphite hover:text-ink transition-colors"
            >
              Bag
              {totalQuantity > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-clay text-white text-[9px] font-body font-semibold rounded-full flex items-center justify-center"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-5">
            <button onClick={openCart} className="relative font-body text-[11px] tracking-[0.25em] uppercase text-graphite">
              Bag
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-3 w-4 h-4 bg-clay text-white text-[8px] rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="font-body text-[11px] tracking-[0.25em] uppercase text-graphite hover:text-ink transition-colors"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper flex flex-col items-center justify-center gap-8"
          >
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={l.to} className={`font-display text-3xl transition-colors ${location.pathname === l.to ? "text-clay" : "text-ink hover:text-clay"}`}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
