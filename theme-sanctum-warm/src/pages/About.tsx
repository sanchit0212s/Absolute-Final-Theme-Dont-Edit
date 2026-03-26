import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hammer, MapPin, Shield, Heart, ArrowRight, Play } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

const values = [
  {
    icon: Hammer,
    title: "Handcrafted",
    body: "Every murti is individually hand-cast using the Dhokra lost-wax technique — a 4,000-year-old method unchanged since the Indus Valley.",
  },
  {
    icon: MapPin,
    title: "Haridwar",
    body: "We work exclusively with artisan families in Haridwar whose craft lineages extend unbroken for three or more generations.",
  },
  {
    icon: Shield,
    title: "Authentic",
    body: "Every piece ships with a hand-written certificate of authenticity documenting artisan lineage and alloy composition.",
  },
  {
    icon: Heart,
    title: "Intentional",
    body: "We believe sacred objects deserve the full weight of their tradition. Nothing from Divine Arts is mass-produced or hollow.",
  },
];

export default function About() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="bg-section-b py-20 border-b border-warm-tan/40">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-body text-xs tracking-[0.28em] text-saffron uppercase mb-4 small-caps"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-light text-espresso leading-tight mb-6"
          >
            Born in the Holy City
          </motion.h1>
          <motion.blockquote
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-lg md:text-xl italic text-mahogany max-w-2xl mx-auto leading-relaxed"
          >
            "Where the Ganges descends from the mountains and the air carries the sound of bells, the artisans of Haridwar have been casting divine forms in brass since before recorded history."
          </motion.blockquote>
        </div>
      </section>

      {/* ── ORIGIN ── */}
      <section className="bg-section-a py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Video placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-video bg-antique-ivory border border-warm-tan/60 flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://picsum.photos/seed/haridwar-ghat/800/500"
                alt="Haridwar"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative w-14 h-14 bg-temple-gold/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-temple-gold transition-colors duration-200 shadow-lg">
                <Play size={20} className="text-parchment ml-1" fill="currentColor" strokeWidth={0} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso/60 to-transparent p-4">
                <p className="font-body text-xs text-parchment/80 tracking-wider">Haridwar — Sacred City on the Ganges</p>
              </div>
            </motion.div>

            {/* Text */}
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-4 small-caps"
              >
                Rooted in Haridwar
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-3xl md:text-4xl font-light text-espresso mb-5"
              >
                The world's oldest
                <br />
                <span className="text-temple-gold">unbroken craft tradition</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-body text-sm text-mahogany leading-relaxed mb-4"
              >
                The Dhokra lost-wax casting technique practiced in Haridwar is among the oldest continuously practised metalworking traditions in the world — dating to at least 2500 BCE in the Indus Valley. The process is unchanged: beeswax is carved into the form, coated in clay, dried, heated to drain the wax, then filled with molten brass. When the clay breaks, the form emerges.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="font-body text-sm text-mahogany leading-relaxed mb-6"
              >
                Divine Arts was built to connect this tradition with homes around the world — not as an export of curiosities, but as a transmission of living sacred practice. Every piece we ship is intended to serve an actual spiritual function in an actual home.
              </motion.p>

              {/* Pull quote */}
              <motion.blockquote
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="border-l-2 border-temple-gold/50 pl-5 font-serif italic text-base text-walnut leading-relaxed"
              >
                "We source only from families who have maintained daily practice alongside their craft. The artisan who casts your murti is also the one who offers puja to it."
              </motion.blockquote>
            </div>
          </div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ── PHILOSOPHY ── */}
      <section className="bg-section-c py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-4 small-caps"
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-light text-espresso mb-6"
          >
            Sacred objects carry intention.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-base text-walnut leading-relaxed mb-6"
          >
            In the Sanatana tradition, a murti is not a representation of a deity — it is a residence of the deity. When properly consecrated and cared for, it is a living presence in the home.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-body text-sm text-mahogany leading-relaxed mb-8"
          >
            This is not metaphor. Across every culture that has practised sacred image-making — Hindu, Buddhist, Jain, Egyptian, Greek — the same understanding has independently emerged: that certain objects, through specific processes and intentions, become more than their material. Divine Arts exists to bring these objects to homes that are ready to receive them.
          </motion.p>
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-display text-2xl md:text-3xl text-temple-gold font-light"
          >
            "Tell us what you are seeking. We will tell you which deity to bring home."
          </motion.blockquote>
        </div>
      </section>

      <OrnamentalDivider symbol="lotus" />

      {/* ── NOT DECORATION ── */}
      <section className="bg-section-a py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-4 small-caps"
              >
                Our Commitment
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-3xl md:text-4xl font-light text-espresso mb-5"
              >
                Not decoration.
                <br />
                <span className="text-temple-gold">Devotion.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-body text-sm text-mahogany leading-relaxed mb-6"
              >
                Every piece from Divine Arts is intended for active devotional use — daily puja, meditation, or Vastu-aligned placement that shifts the energy of your home over time. We don't make shelf ornaments. We make objects that serve a purpose and develop in that purpose over years of care.
              </motion.p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Alloy", value: "Brass (Pancha-Dhatu)" },
                  { label: "Method", value: "Dhokra Lost-Wax" },
                  { label: "Finish", value: "Antique Hand-Patina" },
                  { label: "Origin", value: "Haridwar, Uttarakhand" },
                  { label: "Weight", value: "1.2 – 3.4 kg" },
                  { label: "Heights", value: "5\" – 12\" available" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-antique-ivory border border-warm-tan/50 p-3">
                    <p className="font-body text-[10px] tracking-widest text-walnut uppercase mb-1">{label}</p>
                    <p className="font-body text-sm text-espresso">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Video / image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-video bg-antique-ivory border border-warm-tan/60 flex items-center justify-center overflow-hidden"
            >
              <img
                src="https://picsum.photos/seed/brass-casting/800/500"
                alt="Brass casting process"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="relative w-14 h-14 bg-temple-gold/90 rounded-full flex items-center justify-center cursor-pointer hover:bg-temple-gold transition-colors duration-200 shadow-lg">
                <Play size={20} className="text-parchment ml-1" fill="currentColor" strokeWidth={0} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <OrnamentalDivider symbol="diamond" />

      {/* ── VALUES ── */}
      <section className="bg-section-b py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl font-light text-espresso"
            >
              What We Stand For
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-parchment border border-warm-tan/60 p-6 hover:border-temple-gold/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-temple-gold/10 border border-temple-gold/30 flex items-center justify-center mb-4">
                  <Icon size={17} className="text-temple-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-espresso mb-2">{title}</h3>
                <p className="font-body text-sm text-walnut leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-section-c border-t border-warm-tan/40 py-14">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-light text-espresso mb-4"
          >
            Ready to bring sacred presence home?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-walnut text-base mb-8 max-w-lg mx-auto"
          >
            Start with our guide to find the deity that resonates with your intention, or browse the full collection.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/guide" className="btn-gold flex items-center gap-2">
              Take the Guide
              <ArrowRight size={14} />
            </Link>
            <Link to="/collection" className="btn-outline-gold">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
