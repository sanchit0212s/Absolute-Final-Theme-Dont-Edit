import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Collection", to: "/collection" },
  { label: "The Guide", to: "/guide" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const location = useLocation();

  // On the homepage, navbar starts transparent over the saffron hero
  const isHome = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navBg = scrolled
    ? "bg-ivory/97 shadow-sm border-b border-sand/60"
    : isHome
    ? "bg-transparent"
    : "bg-ivory/97 border-b border-sand/40";

  const logoColor = !scrolled && isHome ? "text-white" : "text-saffron";
  const subtitleColor = !scrolled && isHome ? "text-white/60" : "text-bark/70";
  const linkColor = !scrolled && isHome ? "text-white/80 hover:text-white" : "text-mahogany hover:text-saffron";
  const cartColor = !scrolled && isHome ? "text-white/80 hover:text-white" : "text-mahogany hover:text-saffron";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-500 ${navBg}`}>
        <div className="max-w-[1400px] mx-auto px-6 w-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className={`font-display text-2xl font-light tracking-wide transition-colors duration-500 ${logoColor}`}>
              Divine Arts
            </span>
            <span className={`font-body text-[8px] tracking-[0.4em] uppercase mt-0.5 transition-colors duration-500 ${subtitleColor}`}>
              Sacred Brass · Haridwar
            </span>
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`font-body text-[11px] tracking-[0.28em] uppercase transition-colors duration-200 ${
                    active ? "text-saffron" : linkColor
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className={`relative p-2 transition-colors duration-300 ${cartColor}`}
              aria-label="Open cart"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-kumkum text-white text-[9px] font-body font-semibold rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              className={`md:hidden p-2 transition-colors duration-300 ${cartColor}`}
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-ivory border-b border-sand/60"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="font-body text-sm text-mahogany hover:text-saffron py-3 border-b border-sand/40 last:border-0 tracking-wider uppercase transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
