import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gallery">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <p className="font-display text-sm tracking-[0.2em] uppercase text-ink mb-3">Divine Arts</p>
            <p className="font-body text-xs text-graphite leading-relaxed">
              Hand-cast brass deity forms.<br/>Haridwar, India. Since 1987.
            </p>
          </div>
          <div className="flex gap-8">
            {[
              { label: "All Forms", to: "/forms" },
              { label: "Our Story", to: "/story" },
              { label: "Contact", to: "/contact" },
            ].map(l => (
              <Link key={l.to} to={l.to} className="font-display text-xs tracking-wider text-graphite hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="md:text-right">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-xs tracking-wider text-[#25D366] hover:text-[#20BD5A] transition-colors"
            >
              <MessageCircle size={12} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gallery flex items-center justify-between">
          <p className="font-body text-[10px] text-graphite/40">© {new Date().getFullYear()} Divine Arts</p>
          <p className="font-body text-[10px] text-graphite/30">Haridwar · Uttarakhand · India</p>
        </div>
      </div>
    </footer>
  );
}
