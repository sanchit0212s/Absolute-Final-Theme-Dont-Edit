import { Link } from "react-router-dom";
import CopperRule from "./CopperRule";

const shop = [
  { label: "Collection", to: "/collection" },
  { label: "Deity Guide", to: "/guide" },
  { label: "New Arrivals", to: "/collection" },
  { label: "Gift Sets", to: "/collection" },
];

const learn = [
  { label: "The Guide", to: "/guide" },
  { label: "About Divine Arts", to: "/about" },
  { label: "Chakra Alignment", to: "/guide" },
  { label: "Vastu Shastra", to: "/guide" },
];

const support = [
  { label: "Contact Us", to: "/contact" },
  { label: "Shipping Info", to: "/contact" },
  { label: "Returns", to: "/contact" },
  { label: "Care Guide", to: "/guide" },
];

export default function Footer() {
  return (
    <footer className="bg-night border-t border-ember/40">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-light text-copper-gradient">
                Divine Arts
              </span>
              <div className="font-body text-[8px] tracking-[0.35em] text-stone/40 uppercase mt-0.5">
                Sacred Brass · Haridwar
              </div>
            </Link>
            <p className="font-body text-sm text-stone/60 leading-relaxed max-w-xs mt-4">
              Hand-crafted brass deity sculptures, consecrated by Vedic tradition.
              Each form is a living presence — cast with intention, born in Haridwar.
            </p>

            <CopperRule className="mt-6 mb-5 max-w-[180px]" />

            <div className="space-y-1.5">
              <p className="font-body text-[10px] tracking-[0.25em] text-stone/40 uppercase">
                Haridwar, Uttarakhand · India
              </p>
              <p className="font-body text-xs text-stone/50">
                contact@divinearts.store
              </p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="section-label mb-4">Shop</p>
            <ul className="space-y-2.5">
              {shop.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-stone/60 hover:text-copper transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <p className="section-label mb-4">Learn</p>
            <ul className="space-y-2.5">
              {learn.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-stone/60 hover:text-copper transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="section-label mb-4">Sacred Updates</p>
            <p className="font-body text-xs text-stone/50 leading-relaxed mb-4">
              Consecration dates, new forms, and Vedic wisdom — delivered quietly.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-dusk border border-ember/60 text-ivory text-sm font-body px-3 py-2.5 placeholder-stone/30 focus:outline-none focus:border-copper/60 transition-colors"
              />
              <button className="w-full btn-copper text-center">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <CopperRule className="mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[10px] text-stone/30 tracking-wider">
            © {new Date().getFullYear()} Divine Arts. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Refund Policy"].map((t) => (
              <Link
                key={t}
                to="/contact"
                className="font-body text-[10px] text-stone/30 hover:text-stone/60 tracking-wider transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
          <p className="font-body text-[10px] text-stone/20 tracking-wider">
            ✦ Crafted with devotion
          </p>
        </div>
      </div>
    </footer>
  );
}
