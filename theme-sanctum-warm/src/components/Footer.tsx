import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-footer-bg text-parchment/70">
      {/* Main grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <Link to="/" className="block mb-4">
              <span className="font-display text-3xl font-light text-temple-gold tracking-wide">
                Divine Arts
              </span>
              <p className="font-body text-[10px] tracking-[0.25em] text-parchment/40 uppercase mt-1">
                Sacred Brass · Haridwar, India
              </p>
            </Link>
            <p className="font-serif text-sm italic text-parchment/60 leading-relaxed max-w-xs mb-6">
              "We don't sell decorations. We bring living presences into your space."
            </p>
            <div className="flex gap-4 mb-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 border border-parchment/20 flex items-center justify-center text-parchment/50 hover:border-temple-gold/60 hover:text-temple-gold transition-all duration-200"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-xs font-body">
              <div className="flex items-center gap-2 text-parchment/50">
                <MapPin size={12} className="text-temple-gold/60" strokeWidth={1.5} />
                <span>Haridwar, Uttarakhand, India</span>
              </div>
              <div className="flex items-center gap-2 text-parchment/50">
                <Mail size={12} className="text-temple-gold/60" strokeWidth={1.5} />
                <span>hello@divinearts.store</span>
              </div>
              <div className="flex items-center gap-2 text-parchment/50">
                <Phone size={12} className="text-temple-gold/60" strokeWidth={1.5} />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.22em] text-temple-gold uppercase font-medium mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                { label: "All Murtis", to: "/collection" },
                { label: "Ganesha", to: "/collection?deity=Ganesh" },
                { label: "Shiva", to: "/collection?deity=Shiva" },
                { label: "Krishna", to: "/collection?deity=Krishna" },
                { label: "Accessories", to: "/collection" },
                { label: "Consecration Service", to: "/product/shuddhi-poojan" },
              ].map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-parchment/60 hover:text-shimmer-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.22em] text-temple-gold uppercase font-medium mb-5">
              Learn
            </h4>
            <ul className="space-y-3">
              {[
                { label: "The Deity Guide", to: "/guide" },
                { label: "Chakra System", to: "/guide" },
                { label: "Vastu Shastra", to: "/guide" },
                { label: "Pancha Tatva", to: "/guide" },
                { label: "Prana Pratishtha", to: "/product/shuddhi-poojan" },
                { label: "About Haridwar", to: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-parchment/60 hover:text-shimmer-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + Newsletter */}
          <div>
            <h4 className="font-body text-[10px] tracking-[0.22em] text-temple-gold uppercase font-medium mb-5">
              Support
            </h4>
            <ul className="space-y-3 mb-8">
              {[
                { label: "Contact Us", to: "/contact" },
                { label: "Shipping & Returns", to: "/contact" },
                { label: "Certificate of Authenticity", to: "/about" },
                { label: "Care Instructions", to: "/collection" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-parchment/60 hover:text-shimmer-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <p className="font-body text-[10px] tracking-[0.22em] text-temple-gold uppercase font-medium mb-3">
                Sacred Newsletter
              </p>
              <p className="font-body text-xs text-parchment/50 mb-3 leading-relaxed">
                Vastu guidance, ritual insights, and early access.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-parchment/8 border border-parchment/20 px-3 py-2.5 font-body text-xs text-parchment/80 placeholder:text-parchment/30 focus:outline-none focus:border-temple-gold/50 transition-colors"
                />
                <button className="btn-gold py-2.5 text-xs w-full">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-parchment/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-parchment/30">
            © {year} Divine Arts. All rights reserved.
          </p>
          <p className="font-body text-xs text-parchment/25 italic">
            Crafted with devotion in Haridwar, India.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body text-xs text-parchment/30 hover:text-parchment/60 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
