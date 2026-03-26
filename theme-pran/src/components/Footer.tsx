import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-ash">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Main row */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="font-display text-xl tracking-[0.15em] text-ink block mb-4">
              Divine Arts
            </Link>
            <p className="font-body text-sm text-graphite leading-relaxed max-w-sm mb-5">
              Hand-cast brass sculptures from Haridwar. Each piece is solid,
              meticulously crafted, and made to last generations. Statement pieces
              for homes that value craft.
            </p>
            <div className="editorial-line mb-5" />
            <p className="font-body text-xs text-smoke">contact@divinearts.store</p>
            <p className="font-body text-xs text-smoke">Haridwar, Uttarakhand, India</p>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="overline mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {[
                { label: "The Collection", to: "/forms" },
                { label: "Find Your Piece", to: "/discover" },
                { label: "Our Story", to: "/workshop" },
                { label: "Get in Touch", to: "/connect" },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="font-body text-sm text-graphite hover:text-clay transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <p className="overline mb-4">Stay updated</p>
            <p className="font-body text-xs text-smoke leading-relaxed mb-4">
              New pieces, artisan stories, and home styling ideas. No spam, ever.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email"
                className="flex-1 bg-transparent border border-ash border-r-0 text-ink text-sm font-body px-3 py-2.5 placeholder-smoke/50 focus:outline-none focus:border-clay transition-colors min-w-0"
              />
              <button className="bg-ink text-paper font-body text-[10px] tracking-[0.2em] uppercase px-4 hover:bg-clay transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-ash py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-[10px] text-smoke/60 tracking-wider">
            © {new Date().getFullYear()} Divine Arts. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Shipping"].map(t => (
              <span key={t} className="font-body text-[10px] text-smoke/40 tracking-wider cursor-pointer hover:text-smoke transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
