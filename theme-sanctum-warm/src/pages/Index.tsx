import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Leaf, Zap, Star, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import { mainProducts } from "@/data/products";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const chakras = [
  { name: "Root", key: "muladhara", color: "#DC2626", deity: "Ganesh, Nandi" },
  { name: "Sacral", key: "svadhisthana", color: "#EA580C", deity: "Vishnu" },
  { name: "Solar Plexus", key: "manipura", color: "#CA8A04", deity: "Ram Darbar" },
  { name: "Heart", key: "anahata", color: "#16A34A", deity: "Hanuman, Krishna" },
  { name: "Throat", key: "vishuddha", color: "#2563EB", deity: "Shankh, Saraswati" },
  { name: "Third Eye", key: "ajna", color: "#4338CA", deity: "Shiva, Shivling" },
  { name: "Crown", key: "sahasrara", color: "#7C3AED", deity: "Buddha, Durga" },
];

const testimonials = [
  {
    quote: "The Ganesh murti arrived perfectly packaged and is more beautiful than I imagined. The weight and finish are extraordinary — this is clearly heirloom quality.",
    name: "Priya Mehta",
    location: "Mumbai, India",
    stars: 5,
    product: "Ganesh Brass Murti",
  },
  {
    quote: "I've bought brass murtis before, but never with this level of care. The certificate of authenticity, the consecration service, the packaging — Divine Arts is a different category entirely.",
    name: "Arjun Sharma",
    location: "Singapore",
    stars: 5,
    product: "Krishna Brass Murti",
  },
  {
    quote: "I used the guide to find the right deity for my new home. I ended up with the Saraswati murti for my study. Three months later, I notice the difference every day.",
    name: "Lakshmi Nair",
    location: "Dubai, UAE",
    stars: 5,
    product: "Saraswati Brass Murti",
  },
];

const deityNames = ["Ganesh", "Shiva", "Vishnu", "Krishna", "Hanuman", "Durga", "Saraswati", "Buddha", "Ram Darbar", "Nandi", "Shivling", "Shiv-Parvati"];

export default function Index() {
  const { addItem, openCart } = useCart();
  const featuredProducts = mainProducts.slice(0, 8);
  const heroProducts = mainProducts.slice(0, 2);

  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-100px)] bg-section-b overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/temple-interior/1600/900"
            alt=""
            className="w-full h-full object-cover opacity-20"
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="absolute inset-0 bg-hero-warm" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 min-h-[calc(100vh-100px)]">
          {/* Left content */}
          <div className="flex-1 lg:max-w-[55%]">
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate="show"
              className="font-body text-xs tracking-[0.28em] text-saffron uppercase mb-6 small-caps"
            >
              Sacred Brass · Haridwar, India
            </motion.p>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="show"
              className="font-display font-light leading-[0.95] mb-6"
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-espresso">
                Sacred Brass.
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gold-shimmer mt-1">
                Consecrated
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-espresso">
                Intent.
              </span>
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="show"
              className="font-serif text-base sm:text-lg italic text-mahogany leading-relaxed max-w-lg mb-8"
            >
              Each murti from Divine Arts is hand-cast by master artisans in the sacred city of Haridwar — then ritually consecrated before it reaches your home.
            </motion.p>

            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/collection" className="btn-gold flex items-center gap-2">
                Explore the Collection
                <ArrowRight size={14} />
              </Link>
              <Link to="/guide" className="btn-outline-gold">
                Take the Guide
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, text: "Authenticity Certified" },
                { icon: Leaf, text: "100% Solid Brass" },
                { icon: Zap, text: "Consecrated & Blessed" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon size={13} className="text-temple-gold" strokeWidth={1.5} />
                  <span className="font-body text-xs text-walnut tracking-wide">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — floating product cards */}
          <div className="hidden lg:flex flex-col gap-5 flex-shrink-0 w-60">
            {heroProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.2 }}
                className={i === 0 ? "animate-float" : "animate-float-delayed"}
              >
                <Link to={`/product/${product.handle}`}>
                  <div className="bg-parchment/90 border border-warm-tan/70 p-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-[3/4] overflow-hidden mb-3">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-body text-[10px] text-saffron tracking-wide mb-1">{product.tagline}</p>
                    <p className="font-display text-sm text-espresso leading-snug">{product.title}</p>
                    <p className="font-display text-base text-temple-gold mt-1">
                      {formatINR(product.variants[0].priceINR)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST MARQUEE ─────────────────────────────────── */}
      <section className="bg-espresso/95 py-3 overflow-hidden border-y border-parchment/10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].fill([
            "Hand-cast in Haridwar",
            "Artisan-crafted solid brass",
            "Prana Pratishtha consecration",
            "Ships in sacred packaging",
            "Authenticity certificate included",
            "13 deities available",
            "Worldwide shipping",
          ]).flat().map((item, i) => (
            <span key={i} className="inline-flex items-center font-body text-xs text-parchment/70 tracking-widest uppercase">
              {item}
              <span className="mx-6 text-temple-gold/50">◆</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── DEITY FILTER STRIP ────────────────────────────── */}
      <section className="bg-section-a border-b border-warm-tan/40 py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Link
              to="/collection"
              className="flex-shrink-0 px-4 py-2 font-body text-xs tracking-widest uppercase border border-warm-tan/50 text-walnut hover:border-temple-gold hover:text-temple-gold transition-all duration-200"
            >
              All
            </Link>
            {deityNames.map((name) => (
              <Link
                key={name}
                to={`/collection?deity=${encodeURIComponent(name)}`}
                className="flex-shrink-0 px-4 py-2 font-body text-xs tracking-widest uppercase border border-warm-tan/50 text-walnut hover:border-temple-gold hover:text-temple-gold transition-all duration-200 whitespace-nowrap"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────── */}
      <section className="bg-section-b py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-3 small-caps"
            >
              Our Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl font-light text-espresso"
            >
              Sacred Forms
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-base italic text-walnut mt-3 max-w-lg mx-auto"
            >
              Each deity serves a distinct purpose in your space. Choose with intention.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/collection" className="btn-outline-gold inline-flex items-center gap-2">
              View Full Collection
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ── BRAND STORY ───────────────────────────────────── */}
      <section className="bg-section-c py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Text */}
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-4 small-caps"
              >
                Born in Haridwar
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="font-display text-3xl md:text-4xl font-light text-espresso leading-snug mb-4"
              >
                We don't sell decorations.
                <br />
                <span className="text-temple-gold">We bring living presences into your space.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-serif text-sm italic text-walnut leading-relaxed mb-6 max-w-xl"
              >
                For thousands of years, the artisans of Haridwar have cast sacred forms in brass using the Dhokra lost-wax technique — a method unchanged since the Indus Valley civilization. Each murti passes through many hands before it reaches yours: the designer, the wax carver, the mould-maker, the brass-caster, the finisher, and finally our resident pandit, who performs the Prana Pratishtha before shipment.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-body text-sm text-mahogany leading-relaxed mb-8 max-w-xl"
              >
                Divine Arts was founded on a single conviction: that sacred objects deserve the full weight of their tradition. We work only with artisans whose families have maintained continuous practice in Haridwar for at least three generations.
              </motion.p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "1,000+", label: "Families Served" },
                  { value: "13", label: "Sacred Forms" },
                  { value: "100%", label: "Solid Brass" },
                  { value: "3rd Gen", label: "Artisans" },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-parchment border border-warm-tan/60 p-4 text-center">
                    <p className="font-display text-2xl text-temple-gold">{value}</p>
                    <p className="font-body text-xs text-walnut tracking-wide mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <img
                  src="https://picsum.photos/seed/haridwar-artisan/600/750"
                  alt="Haridwar artisan casting brass"
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
                <div className="absolute -bottom-4 -left-4 bg-parchment border border-warm-tan/70 p-4 shadow-md">
                  <p className="font-display text-sm text-espresso">Haridwar, Uttarakhand</p>
                  <p className="font-body text-xs text-walnut tracking-wide mt-0.5">Sacred city on the Ganges</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <OrnamentalDivider symbol="lotus" />

      {/* ── WHY BRASS ─────────────────────────────────────── */}
      <section className="bg-section-b py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl font-light text-espresso"
            >
              Why Brass?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif italic text-walnut mt-3 max-w-md mx-auto text-sm"
            >
              Not every material is sacred. Brass has been chosen by tradition for reasons that science now confirms.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Natural Antimicrobial",
                body: "Brass is oligodynamic — it actively kills bacteria, fungi, and viruses on contact. Traditional puja vessels were always brass; this was not coincidence but deep empirical wisdom.",
              },
              {
                icon: Zap,
                title: "Resonant & Alive",
                body: "Brass vibrates at frequencies consonant with mantras and sacred sound. Every bell in a temple is brass. The material amplifies spiritual intention in a way that synthetic metals cannot.",
              },
              {
                icon: Leaf,
                title: "A Living Material",
                body: "Brass patinates and deepens with age, care, and devotional use. A brass murti that has been worshipped for generations carries that history in its surface — it becomes more itself over time.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-parchment border border-warm-tan/60 p-8 hover:border-temple-gold/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-temple-gold/10 border border-temple-gold/30 flex items-center justify-center mb-5">
                  <Icon size={18} className="text-temple-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-espresso mb-3">{title}</h3>
                <p className="font-body text-sm text-walnut leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OrnamentalDivider symbol="om" />

      {/* ── CHAKRA PREVIEW ────────────────────────────────── */}
      <section className="py-16 bg-espresso/95">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="font-body text-xs tracking-[0.28em] text-shimmer-gold/70 uppercase mb-4 small-caps"
          >
            Ancient Wisdom
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-light text-parchment mb-4"
          >
            The Chakra System
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-parchment/60 text-sm max-w-lg mx-auto mb-12"
          >
            Every deity resonates with a specific energy centre in the body. The right murti activates the right chakra.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {chakras.map((c, i) => (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex flex-col items-center gap-3"
              >
                <Link to={`/collection?chakra=${c.key}`}>
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg border-2 border-transparent group-hover:border-parchment/30"
                    style={{ background: c.color }}
                  />
                  <p className="font-body text-[11px] text-parchment/70 tracking-wide mt-2 group-hover:text-parchment/90 transition-colors">
                    {c.name}
                  </p>
                  <p className="font-body text-[10px] text-parchment/40 group-hover:text-parchment/60 transition-colors">
                    {c.deity}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link to="/guide" className="btn-outline-gold inline-flex items-center gap-2 border-parchment/40 text-parchment/80 hover:bg-parchment/10 hover:border-parchment/60">
            Take the Deity Guide
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <OrnamentalDivider />

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="bg-section-b py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-4xl md:text-5xl font-light text-espresso"
            >
              From Sacred Homes
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-parchment border border-warm-tan/60 p-6"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} size={12} className="text-shimmer-gold fill-shimmer-gold" />
                  ))}
                </div>
                <blockquote className="font-serif italic text-sm text-walnut leading-relaxed mb-5">
                  "{t.quote}"
                </blockquote>
                <div className="border-t border-warm-tan/40 pt-4 flex justify-between items-end">
                  <div>
                    <p className="font-display text-base text-espresso">{t.name}</p>
                    <p className="font-body text-xs text-walnut/70 mt-0.5">{t.location}</p>
                  </div>
                  <p className="font-body text-[10px] text-temple-gold/70 tracking-wide text-right">{t.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <OrnamentalDivider symbol="diamond" />

      {/* ── AUTHENTICITY ──────────────────────────────────── */}
      <section className="bg-section-c py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-4 small-caps">Our Promise</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-espresso mb-6">
                Certificate of
                <br />
                <span className="text-temple-gold">Authenticity</span>
              </h2>
              <p className="font-body text-sm text-mahogany leading-relaxed mb-6 max-w-lg">
                Every murti from Divine Arts ships with a hand-written certificate documenting the artisan's name and lineage, the alloy composition, the casting date, and where applicable, the date and details of the Prana Pratishtha ceremony. We stand behind every piece, unconditionally.
              </p>
              <div className="space-y-3">
                {[
                  "Artisan's name and three-generation lineage",
                  "Alloy composition and casting method",
                  "Consecration date and pandit's details (if selected)",
                  "Unconditional authenticity guarantee",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-0.5 bg-temple-gold/15 border border-temple-gold/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-temple-gold text-[9px]">✓</span>
                    </div>
                    <p className="font-body text-sm text-mahogany">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="https://picsum.photos/seed/certificate-doc/600/500"
                alt="Certificate of Authenticity"
                className="w-full object-cover border border-warm-tan/60 shadow-lg"
                style={{ aspectRatio: "6/5" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <OrnamentalDivider symbol="lotus" />

      {/* ── GUIDE CTA ─────────────────────────────────────── */}
      <section className="bg-saffron/8 border-y border-saffron/20 py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="font-body text-xs tracking-[0.28em] text-saffron uppercase mb-4 small-caps"
          >
            Find Your Deity
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-light text-espresso mb-4 max-w-2xl mx-auto"
          >
            Not sure which deity belongs in your home?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-walnut text-base max-w-lg mx-auto mb-8"
          >
            Let the ancient wisdom of Vastu Shastra and the Chakra system reveal the sacred form that resonates with your intention.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/guide" className="btn-gold inline-flex items-center gap-2 text-base px-10 py-4">
              Take the 2-Minute Guide
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
