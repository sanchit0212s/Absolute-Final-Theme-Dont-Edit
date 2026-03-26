import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CopperRule from "@/components/CopperRule";

const commitments = [
  {
    num: "01",
    title: "100% Solid Brass",
    body: "No hollow castings, no alloy substitutes. Weight is the first thing you notice when you hold one.",
  },
  {
    num: "02",
    title: "Haridwar Origin",
    body: "Our artisans are based in Haridwar — where form and intention have lived together for centuries.",
  },
  {
    num: "03",
    title: "Authenticity Certified",
    body: "Every piece ships with a physical certificate of authenticity guaranteeing the material and origin.",
  },
  {
    num: "04",
    title: "Consecrated Upon Request",
    body: "All murtis can be ritually prepared before shipping. We never ship an unconsecrated form as sacred.",
  },
];

export default function About() {
  return (
    <div className="bg-night min-h-screen">

      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section className="relative border-b border-ember/40 bg-warm-gradient py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cross-pattern" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] mandala-bg opacity-40 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-label mb-4">Our Story</p>
              <h1 className="font-display text-5xl md:text-6xl text-ivory font-light leading-tight mb-6">
                Between ancient form<br />
                <span className="text-copper-gradient">and modern space.</span>
              </h1>

              {/* Decorative ornament */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-copper/60 to-transparent" />
                <span className="text-copper/40 text-[8px]">◆</span>
                <div className="w-12 h-px bg-gradient-to-l from-copper/60 to-transparent" />
              </div>

              <p className="font-display text-xl md:text-2xl text-ivory/50 italic leading-relaxed mb-6">
                Between inner need and outer environment.<br />
                Between chaos and center.
              </p>
              <p className="font-body text-stone/70 leading-relaxed max-w-lg">
                Our roots are in a place where form and intention have lived together
                for centuries — Haridwar. The rhythm of the Ganga, the daily aarti,
                the quiet discipline of ritual — this environment shapes how these
                forms come into being and why they continue to matter.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="aspect-video bg-dusk border border-ember/40 overflow-hidden shadow-lg">
                <img
                  src="https://picsum.photos/seed/haridwar-ganga/800/450"
                  alt="Haridwar"
                  className="w-full h-full object-cover"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-14 h-14 border border-white/60 bg-white/90 flex items-center justify-center hover:bg-copper/20 transition-colors cursor-pointer shadow-lg">
                    <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-copper/80 ml-1" />
                  </div>
                </div>
              </div>
              <p className="font-body text-[10px] text-stone/40 tracking-wider uppercase mt-3 text-center">
                Ganga Aarti — Haridwar
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          PHILOSOPHY — "Our Responsibility"
          ═══════════════════════════════════════════════════ */}
      <section className="relative bg-honey-tint py-24 overflow-hidden">
        <div className="absolute inset-0 mandala-bg pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="section-label mb-8">Our Responsibility</p>

            <div className="space-y-4 mb-8">
              <p className="font-display text-2xl md:text-3xl text-ivory/80 font-light">
                We do not ask you to know Vastu.
              </p>
              <p className="font-display text-2xl md:text-3xl text-ivory/80 font-light">
                We do not expect you to understand energy.
              </p>
              <p className="font-display text-2xl md:text-3xl text-copper italic">
                That is our responsibility.
              </p>
            </div>

            {/* Ornamental divider */}
            <div className="flex items-center justify-center gap-4 my-10">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-copper/30" />
              <div className="w-2 h-2 border border-copper/40 rotate-45" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-copper/30" />
            </div>

            <p className="font-body text-stone/60 text-sm mb-2">Your role is simple:</p>
            <p className="font-display text-xl md:text-2xl text-ivory mb-2">
              Tell us what you are seeking.
            </p>
            <p className="font-display text-lg md:text-xl text-copper/80">
              We will tell you what belongs.
            </p>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          "NOT DECORATION — INTENTION"
          ═══════════════════════════════════════════════════ */}
      <section className="py-24 bg-night bg-grain">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <p className="section-label mb-4">What We Do</p>
              <h2 className="font-display text-4xl text-ivory font-light mb-6">
                Not Decoration —<br />
                <span className="text-copper-gradient">Intention</span>
              </h2>
              <p className="font-body text-stone/70 leading-relaxed mb-4">
                Every piece you find here is selected with purpose in mind — to become
                a quiet center in your home, not just an object within it.
              </p>
              <p className="font-body text-stone/60 leading-relaxed mb-8">
                Heavy, hand-cast solid brass from artisan families who have practised
                this craft for generations. These are not mass-produced souvenirs —
                they are generational anchors for your personal sanctuary.
              </p>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "100% Solid Brass", desc: "No hollow castings" },
                  { label: "Haridwar Origin", desc: "Artisan workshops" },
                  { label: "Authenticity Certified", desc: "Physical certificate" },
                  { label: "Vastu-Guided", desc: "Placement advice included" },
                ].map((item) => (
                  <div key={item.label} className="card-accent p-3">
                    <p className="font-display text-sm text-ivory/80">{item.label}</p>
                    <p className="font-body text-[10px] text-stone/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-video bg-dusk border border-ember/40 overflow-hidden shadow-lg">
                <img
                  src="https://picsum.photos/seed/brass-murti-display/800/450"
                  alt="Sacred brass forms"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          VASTU & CHAKRA SYSTEM
          ═══════════════════════════════════════════════════ */}
      <section className="bg-parchment py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="section-label mb-3">The Framework</p>
            <h2 className="font-display text-4xl text-ivory font-light mb-6">
              Chakras & The Five Elements
            </h2>
            <p className="font-body text-stone/60 leading-relaxed max-w-2xl mx-auto">
              Indian spiritual thought offers two timeless frameworks to understand
              balance within and around us: Chakras and Panch Tatva (The Five Elements).
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-warm p-8"
            >
              <h3 className="font-display text-2xl text-copper mb-4">Seven Chakras</h3>
              <p className="font-body text-sm text-stone/60 leading-relaxed">
                Chakras are described in yogic traditions as seven energy centres
                within the body — Root, Sacral, Solar Plexus, Heart, Throat,
                Third Eye, and Crown. Each represents a dimension of human experience:
                security, emotion, will, love, expression, insight, and awareness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-warm p-8"
            >
              <h3 className="font-display text-2xl text-copper mb-4">Panch Tatva</h3>
              <p className="font-body text-sm text-stone/60 leading-relaxed">
                Panch Tatva — the Five Elements — form the foundation of classical
                Hindu philosophy: Prithvi (Earth), Jal (Water), Agni (Fire),
                Vayu (Air), and Akash (Ether). These are seen as the building blocks
                of all existence, present in nature and reflected within.
              </p>
            </motion.div>
          </div>

          {/* Vastu directions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center"
          >
            <h3 className="font-display text-2xl text-ivory mb-8">Vastu Shastra</h3>
            <p className="font-body text-stone/60 leading-relaxed max-w-xl mx-auto mb-10">
              The traditional Indian science of space and structure. Every home
              is a living field of energy shaped by direction, form, light, and flow.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { direction: "East", meaning: "Light & Beginnings" },
                { direction: "North", meaning: "Growth & Flow" },
                { direction: "South", meaning: "Strength & Grounding" },
                { direction: "West", meaning: "Balance & Rest" },
              ].map((item, i) => (
                <motion.div
                  key={item.direction}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="card-warm text-center p-5 group"
                >
                  <p className="font-display text-xl text-copper mb-2 group-hover:text-gold transition-colors">
                    {item.direction}
                  </p>
                  <p className="font-body text-stone/50 text-xs">{item.meaning}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          OUR COMMITMENTS
          ═══════════════════════════════════════════════════ */}
      <section className="bg-night bg-grain border-t border-ember/40 py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 className="font-display text-3xl text-ivory font-light">Our Commitments</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {commitments.map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-warm p-8 group"
              >
                <span className="num-label block mb-4 group-hover:text-copper transition-colors">{v.num}</span>
                <h3 className="font-display text-xl text-ivory mb-3">{v.title}</h3>
                <p className="font-body text-sm text-stone/60 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          CTA — Begin Your Journey
          ═══════════════════════════════════════════════════ */}
      <section className="relative bg-honey-tint py-24 overflow-hidden">
        <div className="absolute inset-0 mandala-bg pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="section-label mb-2">Begin Your Journey</p>
            <h2 className="font-display text-3xl md:text-4xl text-ivory font-light">
              Discover which deity belongs in your space.
            </h2>
            <p className="font-body text-stone/60 text-sm max-w-lg mx-auto">
              Our guide matches your inner state with the perfect form for your sanctuary.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="w-10 h-px bg-copper/30" />
              <div className="w-1.5 h-1.5 bg-copper/40 rotate-45" />
              <div className="w-10 h-px bg-copper/30" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guide" className="btn-copper">
                Take the Guide
              </Link>
              <Link to="/collection" className="btn-outline-copper">
                View Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
