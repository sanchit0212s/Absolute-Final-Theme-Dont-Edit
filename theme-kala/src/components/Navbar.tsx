import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/collection", label: "Collection" },
  { to: "/guide", label: "Find Your Deity" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { totalQuantity, openCart } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-surface/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="logo-shimmer font-display text-2xl tracking-wide">
            Divine Arts
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`link-animated font-body text-xs tracking-[0.15em] uppercase transition-colors ${
                  location.pathname === l.to
                    ? "text-accent"
                    : "text-on-surface-muted hover:text-accent"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle — Diya */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-muted hover:text-accent hover:bg-accent/5 transition-all"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.svg
                  key={isDark ? "unlit" : "lit"}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Diya bowl */}
                  <path d="M4 15.5C4 15.5 5.5 19.5 12 19.5C18.5 19.5 20 15.5 20 15.5" />
                  <path d="M4 15.5L5 14H19L20 15.5" />
                  {/* Oil inside bowl */}
                  <path d="M7 15H17" strokeWidth="1" opacity={0.4} />
                  {/* Flame — always visible, filled when lit, hollow when unlit */}
                  <path
                    d="M12 12C12 12 10 9.5 10 8C10 6.5 11 5.5 12 4C13 5.5 14 6.5 14 8C14 9.5 12 12 12 12Z"
                    fill={isDark ? "none" : "currentColor"}
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray={isDark ? "2 2" : "0"}
                    opacity={isDark ? 0.4 : 1}
                  />
                </motion.svg>
              </AnimatePresence>
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-on-surface-muted hover:text-accent hover:bg-accent/5 transition-all"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {totalQuantity > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] bg-saffron text-white text-[9px] font-body font-bold rounded-full flex items-center justify-center"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-on-surface-muted hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-surface border-l border-border z-40 lg:hidden flex flex-col pt-24 px-6"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    className={`block py-3 font-body text-sm tracking-wider uppercase border-b border-border/50 transition-colors ${
                      location.pathname === l.to
                        ? "text-accent"
                        : "text-on-surface-muted hover:text-accent"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
