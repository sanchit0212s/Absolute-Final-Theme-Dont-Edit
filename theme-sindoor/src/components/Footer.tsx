import { Link } from "react-router-dom";
import LotusRule from "./LotusRule";

export default function Footer() {
  return (
    <footer className="bg-kumkum text-white">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <span className="font-display text-3xl font-light text-white tracking-wide">
                Divine Arts
              </span>
              <div className="font-body text-[8px] tracking-[0.4em] text-white/50 uppercase mt-1">
                Sacred Brass · Haridwar
              </div>
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Hand-cast brass deity murtis. Born in Haridwar. Each form is solid brass,
              individually consecrated, and made to outlast generations.
            </p>
            <div className="space-y-1.5">
              <p className="font-body text-xs text-white/40 tracking-wider">contact@divinearts.store</p>
              <p className="font-body text-xs text-white/40 tracking-wider">Haridwar, Uttarakhand, India</p>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="overline-label text-white/40 text-[10px] mb-5">Shop</p>
            <ul className="space-y-3">
              {["Collection", "The Guide", "New Arrivals", "Gift Sets"].map((t) => (
                <li key={t}>
                  <Link
                    to="/collection"
                    className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="overline-label text-white/40 text-[10px] mb-5">Sacred Updates</p>
            <p className="font-body text-xs text-white/50 leading-relaxed mb-4">
              Consecration dates, new forms, and Vedic insight — delivered quietly to your inbox.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-white/10 border border-white/20 text-white text-sm font-body px-3 py-2.5 placeholder-white/30 focus:outline-none focus:border-white/50 transition-colors mb-2"
            />
            <button className="w-full bg-white text-kumkum font-body text-xs tracking-[0.25em] uppercase py-3 hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <LotusRule color="white" className="mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[10px] text-white/30 tracking-wider">
            © {new Date().getFullYear()} Divine Arts. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Shipping", "Returns"].map((t) => (
              <Link
                key={t}
                to="/contact"
                className="font-body text-[10px] text-white/30 hover:text-white/60 tracking-wider transition-colors"
              >
                {t}
              </Link>
            ))}
          </div>
          <p className="font-body text-[10px] text-white/20">✦ Made with devotion in Haridwar</p>
        </div>
      </div>
    </footer>
  );
}
