import { Link } from "react-router-dom";

const footerLinks = {
  Collection: [
    { to: "/collection", label: "All Sacred Forms" },
    { to: "/collection?deity=Ganesh", label: "Ganesh" },
    { to: "/collection?deity=Shiva", label: "Shiva" },
    { to: "/collection?deity=Krishna", label: "Krishna" },
    { to: "/collection?deity=Buddha", label: "Buddha" },
  ],
  Guidance: [
    { to: "/guide", label: "Find Your Deity" },
    { to: "/about", label: "Our Story" },
    { to: "/about#vastu", label: "Vastu & Placement" },
    { to: "/about#chakra", label: "Chakra System" },
  ],
  Support: [
    { to: "/contact", label: "Contact Us" },
    { to: "/contact", label: "Shipping Info" },
    { to: "/contact", label: "Returns & Care" },
    { to: "/contact", label: "FAQ" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-obsidian text-white/80">
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:pr-8">
            <Link to="/" className="font-display text-2xl text-shimmer-gold tracking-wide">
              Divine Arts
            </Link>
            <p className="font-body text-sm text-white/50 leading-relaxed mt-4 max-w-sm">
              Sacred brass forms, hand-cast in Haridwar. Not decoration — intention.
              Each piece selected to become a quiet center in your home.
            </p>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="font-body text-xs text-white/40 uppercase tracking-wider mb-2">
                Join our journey
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-2.5 font-body text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:border-shimmer-gold/50 transition-colors"
                />
                <button className="px-5 py-2.5 bg-temple-gold text-obsidian font-body text-xs tracking-wider uppercase rounded-md hover:bg-bright-gold transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display text-base text-white/70 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="footer-link font-body text-sm text-white/40 hover:text-shimmer-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 py-5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} Divine Arts. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-body text-[11px] text-white/20">Haridwar, India</span>
            <span className="text-white/10">·</span>
            <span className="font-body text-[11px] text-white/20">Ships Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
