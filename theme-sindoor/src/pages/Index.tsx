import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { mainProducts } from "@/data/products";
import { deities } from "@/data/deities";
import ProductCard from "@/components/ProductCard";
import LotusRule from "@/components/LotusRule";
import { formatINR } from "@/utils/format";

const trust = [
  "Hand-cast in Haridwar",
  "100% Solid Brass",
  "Individually Consecrated",
  "Ships to 40+ Countries",
  "Artisan Certified",
  "1,000+ Families Served",
];

const beliefs = [
  {
    num: "01",
    title: "Brass is alive.",
    body: "The Vedic tradition has always known what science confirmed: brass is antimicrobial, resonant, and deepens in quality over years of use. A brass murti is not a static object — it becomes more itself with devotional care.",
  },
  {
    num: "02",
    title: "Form follows intention.",
    body: "Each deity in the Sanatana tradition embodies a precise quality of consciousness. Choosing your murti is an act of intention — declaring what you wish to cultivate in your home and your life.",
  },
  {
    num: "03",
    title: "Haridwar is not incidental.",
    body: "The sacred city at the descent of the Ganga from the Himalayas has been the center of brass craft for millennia. Our artisans are its heirs — families who have cast sacred forms for generations.",
  },
];

const testimonials = [
  {
    quote: "The weight of it in your hands is the first proof — this is not decorative. It has genuine presence.",
    name: "Meera Iyer",
    city: "Chennai",
  },
  {
    quote: "I've bought from five vendors over the years. Divine Arts is in a different category. The consecration service alone justifies the difference.",
    name: "Arjun Bose",
    city: "Kolkata",
  },
  {
    quote: "My grandmother held it for a moment and said it felt 'alive.' That's the only review that matters.",
    name: "Priya Sharma",
    city: "Mumbai",
  },
];

export default function Index() {
  const hero = mainProducts[0];
  const featured = mainProducts.slice(0, 8);
  const marqueeRow = mainProducts.slice(0, 5);

  return (
    <div className="overflow-hidden">

      {/* ── HERO — Hard saffron split ─────────────────────────────── */}
      <section className="relative min-h-screen grid lg:grid-cols-2">

        {/* Left — saffron block */}
        <div className="hero-split-left flex flex-col justify-center px-10 md:px-16 pt-28 pb-20 relative">
          {/* Texture dots */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="overline-label text-white/60 mb-8"
            >
              Sacred Brass · Haridwar · Est. 1987
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-display-hero mb-8"
            >
              Brass.<br />
              Cast in<br />
              Devotion.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <LotusRule color="white" className="mb-8 max-w-[240px]" />
              <p className="font-body text-white/70 text-base leading-relaxed max-w-sm mb-10">
                Hand-cast by Haridwar artisans. Each murti is solid brass,
                individually consecrated, and built to outlast generations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/collection" className="btn-outline-white">
                  Explore Collection
                </Link>
                <Link to="/guide" className="flex items-center gap-2 font-body text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors py-4">
                  Find Your Deity <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Bottom stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute bottom-10 left-10 md:left-16 flex gap-10"
            >
              {[["13", "Sacred Forms"], ["1K+", "Families"], ["40+", "Countries"]].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl text-white font-light">{n}</p>
                  <p className="font-body text-[9px] text-white/40 tracking-widest uppercase">{l}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right — full-bleed product image */}
        <div className="relative min-h-[50vh] lg:min-h-0 order-first lg:order-last">
          <img
            src={hero.images[0]}
            alt={hero.title}
            className="w-full h-full object-cover"
          />
          {/* Product tag — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-4 max-w-[200px]"
          >
            <p className="overline-label text-saffron text-[9px] mb-1">{hero.tagline}</p>
            <p className="font-display text-base text-espresso leading-tight mb-2">{hero.title}</p>
            <Link
              to={`/product/${hero.handle}`}
              className="flex items-center gap-1.5 font-body text-xs text-saffron font-medium hover:gap-3 transition-all"
            >
              View <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST TICKER ─────────────────────────────────────────── */}
      <div className="bg-espresso py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...trust, ...trust].map((t, i) => (
            <span key={i} className="flex items-center gap-8 mx-8">
              <span className="font-body text-xs tracking-[0.25em] text-white/50 uppercase">{t}</span>
              <span className="text-saffron text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── DEITY FILTER STRIP ────────────────────────────────────── */}
      <section className="bg-ivory border-b border-sand/40 py-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="overline-label text-bark flex-shrink-0">Browse by deity</p>
            <div className="flex gap-2 flex-wrap">
              {deities.slice(0, 10).map((d) => (
                <Link
                  key={d.name}
                  to={`/collection?deity=${d.name}`}
                  className="chip-inactive text-[10px] py-1.5 px-3"
                >
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────── */}
      <section className="bg-ivory py-24">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Section header — with giant number */}
          <div className="flex items-end justify-between mb-14">
            <div className="relative">
              <span className="section-num absolute -top-8 -left-4 opacity-100">01</span>
              <div className="relative z-10 pt-4">
                <p className="overline-label text-saffron mb-3">The Collection</p>
                <h2 className="text-section-giant text-espresso">Sacred Forms</h2>
              </div>
            </div>
            <Link
              to="/collection"
              className="hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-bark hover:text-saffron transition-colors"
            >
              View all {mainProducts.length} <ArrowRight size={14} />
            </Link>
          </div>

          {/* 4-col square grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} variant="square" />
            ))}
          </div>
        </div>
      </section>

      {/* ── SCROLLING IMAGE MARQUEE ───────────────────────────────── */}
      <div className="bg-cream py-4 overflow-hidden border-y border-sand/40">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...marqueeRow, ...marqueeRow].map((p, i) => (
            <Link
              key={i}
              to={`/product/${p.handle}`}
              className="flex-shrink-0 w-48 h-32 bg-ivory overflow-hidden"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ── BELIEFS — big editorial section ─────────────────────── */}
      <section className="bg-section-b py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="relative mb-16">
            <span className="section-num absolute -top-8 -left-4">02</span>
            <div className="relative z-10 pt-4">
              <p className="overline-label text-saffron mb-3">What We Believe</p>
              <h2 className="text-section-giant text-espresso max-w-xl">
                Three things worth knowing
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border-t border-sand/60">
            {beliefs.map((b, i) => (
              <motion.div
                key={b.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="py-10 pr-10 border-b md:border-b-0 md:border-r border-sand/60 last:border-r-0 last:border-b-0"
              >
                <span className="font-body text-[11px] text-saffron tracking-widest font-medium block mb-4">
                  {b.num}
                </span>
                <h3 className="font-display text-2xl text-espresso mb-4 italic">{b.title}</h3>
                <p className="font-body text-sm text-mahogany leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED SAFFRON CTA ────────────────────────────────── */}
      <section className="bg-saffron py-28 relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "30px 30px" }}
        />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="overline-label text-white/60 mb-6">Not sure where to begin?</p>
              <h2
                className="font-display text-white font-light mb-8"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: "1.05" }}
              >
                Let the Guide<br />find your deity.
              </h2>
              <p className="font-body text-white/70 text-base leading-relaxed max-w-md mb-10">
                A 4-step process aligning your chakra focus, elemental affinity, and
                current intention — to the sacred form that belongs in your space.
              </p>
              <Link to="/guide" className="btn-outline-white">
                Begin the Guide
              </Link>
            </div>

            {/* Portrait stack — 3 cards offset */}
            <div className="hidden lg:flex items-center justify-center gap-[-20px] relative h-80">
              {mainProducts.slice(1, 4).map((p, i) => (
                <motion.div
                  key={p.id}
                  className="absolute w-44"
                  style={{ left: `${i * 90}px`, top: `${i * 20}px`, zIndex: 3 - i }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                >
                  <div className="aspect-[3/4] overflow-hidden border-4 border-white/20">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ────────────────────────────────────────────── */}
      <section className="bg-espresso py-24">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <LotusRule color="white" className="mb-10" />
          <p className="pull-quote text-white mb-6">
            "Every sacred form begins as intention — the wish to make something
            permanent of what is most important. Brass is how that wish is held."
          </p>
          <p className="font-body text-xs text-white/30 tracking-[0.3em] uppercase">
            Pandit Ramesh Sharma, Founder
          </p>
          <LotusRule color="white" className="mt-10" />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="relative mb-16">
            <span className="section-num absolute -top-8 -left-4">03</span>
            <div className="relative z-10 pt-4">
              <p className="overline-label text-saffron mb-3">Testimonials</p>
              <h2 className="text-section-giant text-espresso">What they carry home</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-ivory p-8 border-l-4 border-saffron"
              >
                <p className="font-display text-xl italic text-espresso leading-snug mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-saffron text-sm">★</span>
                  ))}
                </div>
                <p className="font-body text-sm text-mahogany font-medium">{t.name}</p>
                <p className="font-body text-xs text-bark">{t.city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BAND ───────────────────────────────────────── */}
      <section className="bg-ivory border-t border-sand/40 py-16">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="overline-label text-bark mb-2">Ready to begin?</p>
            <h3 className="font-display text-3xl text-espresso font-light">
              Explore the full collection
            </h3>
          </div>
          <Link to="/collection" className="flex-shrink-0 btn-saffron flex items-center gap-2">
            View All Forms <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
