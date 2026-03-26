import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/60 py-16 border-t border-ivory/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl text-gold-light mb-4">Divine Arts</h3>
            <p className="font-body text-sm leading-relaxed max-w-md text-ivory/40">
              Authentic brass deities from Haridwar for the modern home. Each piece is hand-cast, 
              solid brass, and selected for the role it plays in creating your personal sanctuary.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg text-ivory/80 mb-4">Navigate</h4>
            <div className="space-y-2 font-body text-sm">
              <Link to="/" className="block hover:text-gold transition-colors">Home</Link>
              <Link to="/collection" className="block hover:text-gold transition-colors">Collection</Link>
              <Link to="/guide" className="block hover:text-gold transition-colors">The Guide</Link>
              <Link to="/about" className="block hover:text-gold transition-colors">Our Story</Link>
              <Link to="/contact" className="block hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg text-ivory/80 mb-4">Trust</h4>
            <div className="space-y-2 font-body text-sm text-ivory/40">
              <p>Haridwar, Uttarakhand</p>
              <p>100% Solid Brass</p>
              <p>Authenticity Certified</p>
              <p>Global Shipping</p>
            </div>
          </div>
        </div>
        <div className="border-t border-ivory/10 pt-6 text-center font-body text-xs text-ivory/30">
          © {new Date().getFullYear()} Divine Arts. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
