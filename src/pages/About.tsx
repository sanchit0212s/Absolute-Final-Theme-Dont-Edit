import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export default function About() {
  return (
    <div className="bg-charcoal min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="font-display text-5xl md:text-7xl text-ivory mb-8">Our Story</h1>
          <p className="font-display text-2xl md:text-3xl text-ivory/60 italic leading-relaxed mb-6">
            Between ancient form and modern space.<br />
            Between inner need and outer environment.<br />
            Between chaos and center.
          </p>
        </motion.div>
      </section>

      {/* Origin — Haridwar */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            {/* Video placeholder */}
            <div className="aspect-video bg-charcoal-light border border-ivory/10 flex items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
              <div className="text-center z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold/30 flex items-center justify-center">
                  <span className="font-display text-2xl text-gold">▶</span>
                </div>
                <p className="text-ivory/40 font-body text-sm">Ganga Aarti — Haridwar</p>
              </div>
            </div>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }}>
            <h2 className="font-display text-3xl md:text-4xl text-ivory mb-6">Rooted in Haridwar</h2>
            <p className="text-ivory/40 font-body text-sm leading-relaxed mb-4">
              Our roots are in a place where form and intention have lived together for centuries—Haridwar. 
              The rhythm of the Ganga, the daily aarti, the quiet discipline of ritual—this environment 
              shapes how these forms come into being and why they continue to matter.
            </p>
            <p className="text-ivory/40 font-body text-sm leading-relaxed">
              We curate solid brass deities that are meant to do something—not simply exist on a shelf. 
              Each form is chosen for the role it plays in a home: grounding, protecting, calming, or 
              aligning a space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-charcoal-light/30 py-24 px-6 mb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center space-y-8">
            <h2 className="font-display text-3xl md:text-4xl text-ivory">Our Responsibility</h2>
            <div className="space-y-4 text-ivory/50 font-body text-sm leading-relaxed">
              <p>We do not ask you to know Vastu.</p>
              <p>We do not expect you to understand energy.</p>
              <p className="text-gold font-display text-lg italic">That is our responsibility.</p>
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-ivory/40 font-body text-sm">Your role is simple:</p>
              <p className="font-display text-2xl text-ivory">Tell us what you are seeking.</p>
              <p className="font-display text-xl text-gold/70">We will tell you what belongs.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product purpose */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} transition={{ duration: 0.8, delay: 0.15 }} className="order-2 md:order-1">
            <h2 className="font-display text-3xl md:text-4xl text-ivory mb-6">Not Decoration — Intention</h2>
            <p className="text-ivory/40 font-body text-sm leading-relaxed mb-4">
              Every piece you find here is selected with purpose in mind—to become a quiet center 
              in your home, not just an object within it.
            </p>
            <p className="text-ivory/40 font-body text-sm leading-relaxed mb-6">
              Heavy, hand-cast solid brass from artisan families who have practised this craft for 
              generations. These are not mass-produced souvenirs—they are generational anchors for 
              your personal sanctuary.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "100% Solid Brass", desc: "No hollow castings" },
                { label: "Haridwar Origin", desc: "Artisan workshops" },
                { label: "Authenticity Certified", desc: "Physical certificate" },
                { label: "Vastu-Guided", desc: "Placement advice included" },
              ].map((item) => (
                <div key={item.label} className="border border-ivory/10 p-3">
                  <p className="text-ivory/70 font-display text-sm">{item.label}</p>
                  <p className="text-ivory/30 font-body text-[11px]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="order-1 md:order-2">
            {/* Video placeholder */}
            <div className="aspect-video bg-charcoal-light border border-ivory/10 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-saffron/5 to-transparent" />
              <div className="text-center z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold/30 flex items-center justify-center">
                  <span className="font-display text-2xl text-gold">▶</span>
                </div>
                <p className="text-ivory/40 font-body text-sm">Product Placement — Incense & Diya</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center">
        <motion.div {...fadeUp} className="space-y-6">
          <h2 className="font-display text-3xl text-ivory">Begin Your Journey</h2>
          <p className="text-ivory/40 font-body text-sm max-w-lg mx-auto">
            Discover which deity belongs in your space. Our guide matches your inner state 
            with the perfect form for your sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/guide"
              className="px-10 py-4 bg-gold text-charcoal font-display text-lg tracking-widest hover:bg-gold-light transition-all duration-500"
            >
              Take the Guide
            </Link>
            <Link
              to="/collection"
              className="px-10 py-4 border border-gold/30 text-gold font-display text-lg tracking-widest hover:bg-gold/10 transition-all duration-500"
            >
              View Collection
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
