import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const photoEssay = [
  {
    img: "https://picsum.photos/seed/kiln-fire/1200/700",
    caption: "The kiln at 900°C. This temperature hasn't changed in four thousand years.",
    wide: true,
  },
  {
    img: "https://picsum.photos/seed/wax-hands/600/800",
    caption: "Beeswax sculpted by hand. No moulds, no shortcuts.",
  },
  {
    img: "https://picsum.photos/seed/clay-layer/600/800",
    caption: "Clay layers seal the wax form. When fired, the wax vanishes forever.",
  },
  {
    img: "https://picsum.photos/seed/brass-liquid/1200/700",
    caption: "Molten brass fills the void — the 'lost-wax' method in action.",
    wide: true,
  },
  {
    img: "https://picsum.photos/seed/break-mold/600/800",
    caption: "The mould breaks once. What emerges is one of a kind.",
  },
  {
    img: "https://picsum.photos/seed/polish-detail/600/800",
    caption: "Weeks of hand-finishing bring out every detail in the brass.",
  },
];

export default function Workshop() {
  return (
    <div className="min-h-screen pt-[72px]">

      {/* Opening */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-14 items-end"
        >
          <div>
            <p className="overline-clay mb-3">Our story</p>
            <h1 className="text-hero text-ink leading-none">
              Haridwar,<br />since 1987.
            </h1>
          </div>
          <div className="lg:pb-4">
            <div className="editorial-line mb-5" />
            <p className="font-body text-graphite leading-relaxed max-w-md">
              Three artisans, one kiln, and a commitment to preserving the Dhokra
              lost-wax tradition — not as museum craft, but as living artistry.
              Thirty-seven years later, every piece still carries that same conviction.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Photo essay */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-16">
        <div className="space-y-8">
          {photoEssay.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className={photo.wide ? "" : "max-w-[600px] " + (i % 2 === 0 ? "" : "ml-auto")}
            >
              <div className={`overflow-hidden bg-linen ${photo.wide ? "aspect-video" : "aspect-[3/4]"}`}>
                <img
                  src={photo.img}
                  alt={photo.caption}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.5s]"
                  loading="lazy"
                />
              </div>
              <p className="font-body text-xs text-smoke mt-3 max-w-md">{photo.caption}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-y border-ash py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 text-center">
          <p className="font-display italic text-pull text-ink mb-6 max-w-2xl mx-auto">
            "We don't make decorative objects. We make pieces that carry
            the intention of whoever commissions them — and the craft
            of whoever casts them."
          </p>
          <div className="editorial-line mx-auto mb-5" />
          <p className="overline">Shri Ramesh Sharma · Founder</p>
        </div>
      </section>

      {/* The people */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <p className="overline-clay mb-10">The artisans</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Shri Ramesh Sharma",
                role: "Founder & Master Craftsman",
                years: "37 years",
                note: "Learned casting from his father at age 11. Has personally overseen every piece Divine Arts has produced.",
              },
              {
                name: "Shri Gopal Vishwakarma",
                role: "Lead Caster",
                years: "24 years",
                note: "Specializes in intricate multi-element forms. His precision with beeswax is unmatched in the workshop.",
              },
              {
                name: "Pandit Suresh Tiwari",
                role: "Resident Pandit",
                years: "21 years",
                note: "Performs traditional consecration ceremonies for customers who request this optional service.",
              },
            ].map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <div className="aspect-square bg-linen overflow-hidden mb-4">
                  <img
                    src={`https://picsum.photos/seed/artisan-${i + 7}/500/500`}
                    alt={person.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display text-xl text-ink mb-0.5">{person.name}</h3>
                <p className="overline-clay text-[9px] mb-2">{person.role} · {person.years}</p>
                <p className="font-body text-sm text-graphite leading-relaxed">{person.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="bg-warm py-14">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["37", "Years"],
              ["13", "Unique pieces"],
              ["1,000+", "Homes worldwide"],
              ["40+", "Countries"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl text-ink mb-1">{n}</p>
                <p className="overline">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
          <p className="overline mb-3">Ready to explore?</p>
          <h2 className="font-display text-3xl text-ink mb-6">
            Find the piece that belongs with you.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/forms" className="btn-clay">
              Browse Collection <ArrowRight size={12} />
            </Link>
            <Link to="/discover" className="btn-outline">
              Find Your Piece
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
