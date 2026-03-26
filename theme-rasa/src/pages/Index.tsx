import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";
import { mainProducts, addonProducts, DIYA_VARIANT_ID } from "@/data/products";
import { deities } from "@/data/deities";
import ProductCard from "@/components/ProductCard";
import CopperRule from "@/components/CopperRule";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";

/* ── Trust marquee items (from original brand copy) ──── */
const trust = [
  "Sourced from Haridwar",
  "Heavy Solid Brass",
  "Global Shipping",
  "Consecrated Upon Request",
  "Authenticity Certified",
];

/* ── Testimonials ──────────────────────────────────────── */
const testimonials = [
  {
    text: "The weight of the Vishnu statue surprised me. It feels substantial and permanent. It has completely changed the feel of my study.",
    name: "Arjun N.",
    city: "San Francisco",
  },
  {
    text: "I was worried about shipping to London, but the packing was incredible. The Nandi looks ancient and beautiful.",
    name: "John J.",
    city: "United Kingdom",
  },
  {
    text: "The Shuddhi Poojan service made all the difference — receiving a consecrated murti rather than just a sculpture changes the relationship with the piece from the first moment.",
    name: "Kavitha N.",
    city: "Chennai",
  },
];

/* ── Chakra data ───────────────────────────────────────── */
const chakras = [
  { name: "Muladhara", color: "#DC2626", label: "Root", deity: "Ganesh" },
  { name: "Svadhisthana", color: "#EA580C", label: "Sacral", deity: "Vishnu" },
  { name: "Manipura", color: "#CA8A04", label: "Solar Plexus", deity: "Ram" },
  { name: "Anahata", color: "#16A34A", label: "Heart", deity: "Krishna" },
  { name: "Vishuddha", color: "#2563EB", label: "Throat", deity: "Saraswati" },
  { name: "Ajna", color: "#4338CA", label: "Third Eye", deity: "Shiva" },
  { name: "Sahasrara", color: "#7C3AED", label: "Crown", deity: "Buddha" },
];

export default function Index() {
  const featured = mainProducts.slice(0, 8);
  const heroProducts = mainProducts.slice(0, 3);
  const { addItem, openCart, hasDiya, toggleDiya } = useCart();
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -60]);
  const diyaProduct = addonProducts.find(p => p.variants[0].id === DIYA_VARIANT_ID);

  return (
    <div>
      {/* ═══════════════════════════════════════════════════
          HERO — "Sanctuary. Delivered."
          ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Layered warm background */}
        <div className="absolute inset-0 bg-warm-gradient" />
        <div className="absolute inset-0 bg-cross-pattern" />

        {/* Decorative mandala watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] mandala-bg opacity-60 pointer-events-none" />

        {/* Floating ember particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="ember-particle"
              style={{
                left: `${15 + i * 14}%`,
                bottom: `${10 + i * 8}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3.5 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 w-full py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Brand copy */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <p className="section-label mb-6">Sacred Brass · Haridwar</p>

              <h1 className="font-display text-5xl md:text-7xl font-light text-ivory leading-[1.05] mb-2">
                Sanctuary.
              </h1>
              <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.05] mb-6">
                <span className="animate-shimmer">Delivered.</span>
              </h1>

              {/* Decorative ornament line */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-copper/60 to-transparent" />
                <span className="text-copper/40 text-[8px]">◆</span>
                <div className="w-12 h-px bg-gradient-to-l from-copper/60 to-transparent" />
              </div>

              <p className="font-body text-base text-stone leading-relaxed max-w-md mb-4">
                Authentic brass deities for the modern home.
              </p>
              <p className="font-body text-sm text-stone/60 leading-relaxed max-w-md mb-10">
                We curate heavy, hand-cast brass deities from Haridwar — not as decorations,
                but as generational anchors for your personal sanctuary.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/collection" className="btn-copper">
                  Explore the Collection
                </Link>
                <Link to="/guide" className="btn-outline-copper">
                  Find Your Deity
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex gap-10 mt-14 pt-8 border-t border-ember/40">
                {[
                  ["13", "Sacred Forms"],
                  ["40+", "Countries"],
                  ["100%", "Solid Brass"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-3xl text-copper font-light">{n}</p>
                    <p className="font-body text-[10px] text-stone/50 tracking-wider uppercase mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Stacked hero product cards */}
            <motion.div
              className="hidden lg:block relative h-[600px]"
              style={{ y: heroParallax }}
            >
              {heroProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="absolute"
                  style={{
                    top: `${i * 60}px`,
                    right: `${i * 40}px`,
                    width: "240px",
                    zIndex: 3 - i,
                  }}
                  initial={{ opacity: 0, y: 50, rotate: -2 + i * 2 }}
                  animate={{ opacity: 1, y: 0, rotate: -2 + i * 2 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                >
                  <Link to={`/product/${p.handle}`} className="block group">
                    <div className="img-overlay-wrap aspect-[3/4] bg-dusk border border-ember/40 group-hover:border-copper/40 transition-all duration-300 shadow-lg">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="img-overlay-text p-4">
                        <p className="font-body text-[10px] tracking-[0.32em] text-amber-300 uppercase mb-1">{p.tagline}</p>
                        <p className="font-display text-lg text-white">{p.title}</p>
                        <p className="font-body text-sm text-amber-200 mt-1">{formatINR(p.variants[0].priceINR)}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Decorative floating badge */}
              <motion.div
                className="absolute bottom-8 left-0 card-accent px-5 py-3 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <p className="font-display text-sm text-copper">Hand-cast in Haridwar</p>
                <p className="font-body text-[9px] text-stone/50 tracking-wider uppercase mt-0.5">
                  Each piece unique
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          MARQUEE TRUST BAR
          ═══════════════════════════════════════════════════ */}
      <div className="bg-parchment border-y border-ember/40 py-3.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...trust, ...trust].map((t, i) => (
            <span key={i} className="flex items-center gap-6 mx-6">
              <span className="font-body text-xs tracking-[0.2em] text-stone/60 uppercase">{t}</span>
              <span className="text-copper/40 text-[10px]">◆</span>
            </span>
          ))}
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════
          BRAND PHILOSOPHY — "Our Responsibility"
          (from original Shopify — brand-defining section)
          ═══════════════════════════════════════════════════ */}
      <section className="relative bg-honey-tint py-24 overflow-hidden">
        {/* Decorative mandala behind text */}
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

            <Link to="/guide" className="btn-copper inline-flex items-center gap-2 mt-10">
              Take the Guide <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          DEITY STRIP — Browse by Deity
          ═══════════════════════════════════════════════════ */}
      <section className="bg-night py-14 bg-grain">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <CopperRule label="Browse by Deity" className="flex-1" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {deities.map((d) => (
              <Link
                key={d.name}
                to={`/collection?deity=${d.name}`}
                className="flex-shrink-0 px-5 py-2.5 border border-ember/50 text-stone/60 hover:border-copper/50 hover:text-copper hover:bg-copper/5 font-body text-xs tracking-[0.2em] uppercase transition-all duration-200"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          FEATURED PRODUCTS — Asymmetric layout
          ═══════════════════════════════════════════════════ */}
      <section className="bg-warm-gradient py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-2">The Collection</p>
              <h2 className="font-display text-4xl text-ivory font-light">Sacred Forms</h2>
              <p className="font-body text-sm text-stone/50 mt-2 max-w-md">
                Each deity serves a purpose in your space. Not decoration — intention.
              </p>
            </div>
            <Link to="/collection" className="hidden md:flex items-center gap-2 font-body text-xs text-stone/50 hover:text-copper tracking-wider uppercase transition-colors link-underline">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} variant="grid" />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/collection" className="btn-outline-copper">View Full Collection</Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          DIYA UPSELL — "Light the Sacred Space"
          ═══════════════════════════════════════════════════ */}
      {diyaProduct && (
        <section className="relative overflow-hidden">
          {/* Warm gradient bg with filigree */}
          <div className="absolute inset-0 bg-honey-tint" />
          <div className="absolute inset-0 bg-filigree" />

          <div className="relative max-w-[1400px] mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left — Diya image with flame effect */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center"
              >
                <div className="relative w-64 aspect-square">
                  <div className="absolute inset-0 bg-dusk border border-ember/40 overflow-hidden shadow-lg">
                    <img
                      src={diyaProduct.images[0]}
                      alt={diyaProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Animated flame above the diya */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-4 h-6 animate-flame" style={{
                      background: 'radial-gradient(ellipse at bottom, #E3A310 0%, #F5C842 40%, transparent 70%)',
                      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                      filter: 'blur(1px)',
                    }} />
                  </div>
                  {/* Price badge */}
                  <div className="absolute -bottom-3 -right-3 card-accent px-4 py-2 shadow-md">
                    <p className="font-display text-lg text-copper">{formatINR(diyaProduct.variants[0].priceINR)}</p>
                  </div>
                </div>
              </motion.div>

              {/* Right — Copy */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <p className="section-label mb-3">Complete Your Altar</p>
                <h2 className="font-display text-3xl md:text-4xl text-ivory font-light mb-4">
                  Light the<br />
                  <span className="text-copper-gradient">Sacred Space</span>
                </h2>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-copper/30" />
                  <span className="text-copper/30 text-[8px]">◆</span>
                </div>

                <p className="font-body text-stone/70 leading-relaxed mb-3">
                  {diyaProduct.description}
                </p>
                <p className="font-body text-sm text-stone/50 leading-relaxed mb-8">
                  The five wicks correspond to the five elements. A complete ritual object for daily puja.
                </p>

                <button
                  onClick={() => { addItem(diyaProduct.variants[0].id); openCart(); }}
                  className="btn-copper inline-flex items-center gap-2"
                >
                  Add Diya to Altar
                </button>
              </motion.div>
            </div>
          </div>
        </section>
      )}


      {/* ═══════════════════════════════════════════════════
          BRAND STORY — "Not Decoration — Intention"
          ═══════════════════════════════════════════════════ */}
      <section className="bg-night bg-grain py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-label mb-4">Not Decoration — Intention</p>
              <h2 className="font-display text-4xl md:text-5xl text-ivory font-light leading-tight mb-6">
                Rooted in<br />
                <span className="text-copper-gradient">Haridwar</span>
              </h2>
              <p className="font-body text-stone/70 leading-relaxed mb-4">
                Our roots are in a place where form and intention have lived together
                for centuries — Haridwar. The rhythm of the Ganga, the daily aarti,
                the quiet discipline of ritual — this environment shapes how these
                forms come into being and why they continue to matter.
              </p>
              <p className="font-body text-stone/60 leading-relaxed mb-8">
                We curate solid brass deities that are meant to do something — not
                simply exist on a shelf. Each form is chosen for the role it plays
                in a home: grounding, protecting, calming, or aligning a space.
              </p>

              {/* Trust points with ornament */}
              <div className="grid grid-cols-2 gap-4 mb-8">
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

              <Link to="/about" className="btn-outline-copper inline-flex items-center gap-2">
                Our Story <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-dusk border border-ember/40 overflow-hidden shadow-lg">
                <img
                  src="https://picsum.photos/seed/haridwar-craft/600/750"
                  alt="Sacred brass craft"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-4 -left-4 card-accent p-5 w-44 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-display text-3xl text-copper font-light">100%</p>
                <p className="font-body text-[10px] text-stone/50 tracking-wider uppercase mt-1">
                  Solid brass<br/>Hand-cast
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          CHAKRA ALIGNMENT — Interactive visual
          ═══════════════════════════════════════════════════ */}
      <section className="relative bg-parchment py-20 overflow-hidden">
        <div className="absolute inset-0 bg-filigree opacity-50" />

        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4">The Living System</p>
              <h2 className="font-display text-4xl text-ivory font-light mb-6">
                Every deity aligns<br />to a chakra
              </h2>
              <p className="font-body text-stone/60 leading-relaxed mb-4">
                Indian spiritual thought offers two timeless frameworks to understand
                balance within and around us: Chakras and Panch Tatva (The Five Elements).
              </p>
              <p className="font-body text-stone/60 leading-relaxed mb-8">
                Choosing the right murti for your space is about more than aesthetics —
                it is about the quality of awareness you wish to cultivate.
              </p>
              <Link to="/guide" className="btn-copper inline-flex items-center gap-2">
                Take the Deity Guide <ArrowRight size={14} />
              </Link>
            </div>

            {/* Chakra visualization — vertical alignment */}
            <div className="flex flex-col gap-2">
              {chakras.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group flex items-center gap-4 p-3.5 border border-ember/30 hover:border-copper/30 bg-dusk/50 hover:bg-dusk transition-all duration-300 cursor-default"
                >
                  {/* Chakra color dot with glow */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{ backgroundColor: c.color }}
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"
                      style={{ backgroundColor: c.color }}
                    />
                  </div>

                  <span className="font-body text-[10px] text-stone/40 tracking-wider w-20 uppercase">
                    {c.label}
                  </span>
                  <span className="font-display text-base text-ivory/70 group-hover:text-ivory transition-colors flex-1">
                    {c.name}
                  </span>
                  <span className="font-body text-[10px] text-copper/50 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {c.deity}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════ Decorative wave divider ══════════ */}
      <div className="divider-wave bg-night" />


      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS — "What Other Devotees Say"
          ═══════════════════════════════════════════════════ */}
      <section className="bg-night bg-grain py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What Others Say</p>
            <h2 className="font-display text-3xl text-ivory font-light">From Those Who Carry Them</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card-warm p-8 relative group"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-4 right-5 font-display text-7xl text-copper/8 leading-none select-none group-hover:text-copper/15 transition-colors duration-500">
                  "
                </span>

                <p className="font-body text-sm text-stone/70 leading-relaxed italic mb-6 relative z-10">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-copper text-xs">★</span>
                  ))}
                </div>
                <p className="font-display text-base text-ivory">{t.name}</p>
                <p className="font-body text-xs text-stone/40">{t.city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          AUTHENTICITY CERTIFICATE
          ═══════════════════════════════════════════════════ */}
      <section className="bg-warm-gradient py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-accent p-10 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="w-16 h-16 border border-copper/30 flex items-center justify-center flex-shrink-0 animate-breathe">
              <Shield size={28} strokeWidth={1} className="text-copper" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="section-label mb-2">Certificate of Authenticity</p>
              <h3 className="font-display text-2xl text-ivory mb-3">
                Every piece ships with a guarantee
              </h3>
              <p className="font-body text-sm text-stone/60 leading-relaxed max-w-xl">
                Every piece ships with an Authenticity Certificate, guaranteeing that
                the piece is made of 100% original Brass. Hand-cast by artisans in Haridwar.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link to="/collection" className="btn-outline-copper whitespace-nowrap">
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          GUIDE CTA — "Which Energy is Your Home Missing?"
          ═══════════════════════════════════════════════════ */}
      <section className="relative bg-honey-tint border-t border-ember/40 py-24 overflow-hidden">
        <div className="absolute inset-0 mandala-bg pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-4">Not Sure Where to Begin?</p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory font-light mb-6">
              Which Energy is Your<br />Home Missing?
            </h2>
            <p className="font-body text-stone/60 max-w-lg mx-auto mb-4 leading-relaxed">
              You don't need to guess. Whether you seek stability or flow,
              our guide will match your current life stage with the correct deity.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 my-8">
              <div className="w-12 h-px bg-copper/30" />
              <div className="w-1.5 h-1.5 bg-copper/40 rotate-45" />
              <div className="w-12 h-px bg-copper/30" />
            </div>

            <Link to="/guide" className="btn-copper inline-flex items-center gap-2">
              Begin the Guide <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
