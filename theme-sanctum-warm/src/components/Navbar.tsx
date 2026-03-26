import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-parchment/98 shadow-sm shadow-warm-tan/40"
            : "bg-parchment/92 backdrop-blur-sm"
        } border-b border-warm-tan/60`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl font-light tracking-wide text-temple-gold">
              Divine Arts
            </span>
            <span className="font-body text-[9px] tracking-[0.25em] text-walnut uppercase mt-0.5">
              Sacred Brass · Haridwar
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body text-xs tracking-widest uppercase transition-colors duration-200 ${
                    active ? "text-temple-gold" : "text-mahogany hover:text-temple-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-mahogany hover:text-temple-gold transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalQuantity > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-saffron text-parchment text-[9px] font-body font-semibold rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-mahogany hover:text-temple-gold transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[100px] left-0 right-0 z-40 bg-parchment/98 border-b border-warm-tan/60 shadow-md"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-sm text-mahogany hover:text-temple-gold py-3 border-b border-warm-tan/40 last:border-0 tracking-wider uppercase transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
