import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Story() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="label-brass mb-4">The workshop</p>
          <h1 className="font-display text-big text-ink tracking-tight mb-6">
            Three artisans.<br/>One kiln.<br/>Since 1987.
          </h1>
          <div className="w-12 h-px bg-brass mb-6" />
          <p className="font-body text-charcoal leading-relaxed max-w-lg">
            The Dhokra lost-wax casting technique is the oldest known metal-casting method
            in continuous practice. A bronze dancing girl found at Mohenjo-Daro — circa
            2500 BCE — was made this exact way. We are the living continuation of that lineage.
          </p>
        </motion.div>

        {/* Photo 1 */}
        <div className="bleed mb-6">
          <div className="aspect-[21/9] bg-gallery overflow-hidden">
            <img src="https://picsum.photos/seed/workshop-wide/1600/700" alt="Workshop" className="w-full h-full object-cover" />
          </div>
        </div>
        <p className="font-body text-xs text-graphite mb-20">The workshop floor, Jwalapur, Haridwar. Morning.</p>

        {/* The method */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="label-brass mb-3">01 — The wax</p>
            <p className="font-body text-charcoal leading-relaxed mb-4">
              It begins with beeswax, sculpted by hand into the deity's form. Every detail —
              each finger, each ornament, each expression — is shaped without machinery.
              The wax model IS the murti. When it's encased in clay and fired, the wax
              burns away. It can never be reused. Every piece is therefore an original.
            </p>
          </div>
          <div className="aspect-square bg-gallery overflow-hidden">
            <img src="https://picsum.photos/seed/wax-sculpting/500/500" alt="Wax sculpting" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="aspect-square bg-gallery overflow-hidden md:order-first">
            <img src="https://picsum.photos/seed/brass-pouring/500/500" alt="Brass pour" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="label-brass mb-3">02 — The pour</p>
            <p className="font-body text-charcoal leading-relaxed mb-4">
              Molten brass at over 900°C fills the void left by the wax. The metal is
              a precise alloy — Pancha-Dhatu (five-metal) brass, the traditional
              composition used for sacred forms. The ratio matters: it determines the
              color, the weight, and the resonance when struck.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="label-brass mb-3">03 — The reveal</p>
            <p className="font-body text-charcoal leading-relaxed mb-4">
              The clay mould is broken open once. What emerges is raw — rough-edged,
              still warm. Weeks of filing, polishing, and detailing follow. Each murti
              passes through three pairs of hands before it is considered complete.
              Then, and only then, it goes to Pandit Suresh for consecration.
            </p>
          </div>
          <div className="aspect-square bg-gallery overflow-hidden">
            <img src="https://picsum.photos/seed/reveal-break/500/500" alt="Mold breaking" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* The people */}
        <div className="py-16 border-t border-gallery">
          <p className="label-brass mb-10">The people behind every form</p>
          <div className="space-y-10">
            {[
              {
                name: "Shri Ramesh Sharma",
                role: "Founder & Master Craftsman · 37 years",
                note: "Learned casting from his father at age 11. Has personally overseen every form Divine Arts has produced. His hands are in every decision we make.",
                img: "https://picsum.photos/seed/ramesh/100/100",
              },
              {
                name: "Shri Gopal Vishwakarma",
                role: "Lead Caster · 24 years",
                note: "Specializes in multi-armed forms — Durga, Nataraja. His wax work is the finest in Haridwar. He cast the piece you're looking at right now.",
                img: "https://picsum.photos/seed/gopal/100/100",
              },
              {
                name: "Pandit Suresh Tiwari",
                role: "Resident Pandit · 21 years",
                note: "Performs Shuddhi Poojan for every murti before it leaves the workshop. No form ships without his consecration and certificate.",
                img: "https://picsum.photos/seed/suresh/100/100",
              },
            ].map(person => (
              <div key={person.name} className="flex gap-5 items-start">
                <div className="w-16 h-16 rounded-full bg-gallery overflow-hidden flex-shrink-0">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-display text-lg text-ink tracking-tight">{person.name}</p>
                  <p className="label text-[9px] text-graphite mb-2">{person.role}</p>
                  <p className="font-body text-sm text-charcoal leading-relaxed max-w-md">{person.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 border-t border-gallery text-center">
          <p className="font-display text-2xl text-ink tracking-tight mb-6">
            Ready to see the work?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/forms" className="btn-black">See All Forms</Link>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I'd%20like%20to%20learn%20more%20about%20your%20work"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={13} /> WhatsApp the Workshop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
