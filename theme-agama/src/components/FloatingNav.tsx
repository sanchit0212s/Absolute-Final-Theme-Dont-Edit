import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "All Forms", to: "/forms" },
  { label: "Our Story", to: "/story" },
  { label: "Contact", to: "/contact" },
];

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const { totalQuantity, openCart } = useCart();
  const loc = useLocation();

  return (
    <>
      {/* Floating top bar — just logo left, controls right */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <Link
            to="/"
            className="pointer-events-auto font-display text-sm tracking-[0.2em] uppercase text-ink hover:text-brass transition-colors"
          >
            Divine Arts
          </Link>

          <div className="pointer-events-auto flex items-center gap-6">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative font-display text-[10px] tracking-[0.3em] uppercase text-graphite hover:text-ink transition-colors"
            >
              Reserve
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-4 w-4 h-4 bg-brass text-white text-[8px] font-display font-bold rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="font-display text-[10px] tracking-[0.3em] uppercase text-graphite hover:text-ink transition-colors"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-3">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`font-display text-4xl md:text-5xl tracking-tight transition-colors ${
                      loc.pathname === l.to ? "text-brass" : "text-ink hover:text-brass"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20a%20brass%20murti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  onClick={() => setOpen(false)}
                >
                  Talk to us on WhatsApp
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
