import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore(state => state.cart?.totalQuantity ?? 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-wider text-gold-light">
          Divine Arts
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors">
            Home
          </Link>
          <Link to="/collection" className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors">
            Collection
          </Link>
          <Link to="/guide" className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors">
            Guide
          </Link>
          <Link to="/about" className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors">
            Our Story
          </Link>
          <Link to="/contact" className="text-sm tracking-widest uppercase text-ivory/70 hover:text-gold transition-colors">
            Contact
          </Link>
          <CartDrawer />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <CartDrawer />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-ivory/70">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          {/* Backdrop — tapping outside closes the menu */}
          <div
            className="fixed inset-0 z-[-1] md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="md:hidden bg-charcoal/95 backdrop-blur-md px-6 pb-4">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center py-3 text-sm tracking-widest uppercase text-ivory/70 hover:text-gold">Home</Link>
            <Link to="/collection" onClick={() => setMobileOpen(false)} className="flex items-center py-3 text-sm tracking-widest uppercase text-ivory/70 hover:text-gold">Collection</Link>
            <Link to="/guide" onClick={() => setMobileOpen(false)} className="flex items-center py-3 text-sm tracking-widest uppercase text-ivory/70 hover:text-gold">Guide</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="flex items-center py-3 text-sm tracking-widest uppercase text-ivory/70 hover:text-gold">Our Story</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center py-3 text-sm tracking-widest uppercase text-ivory/70 hover:text-gold">Contact</Link>
          </div>
        </>
      )}
    </nav>
  );
}
