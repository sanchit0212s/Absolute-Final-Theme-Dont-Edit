import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useMainProducts } from "@/hooks/useProducts";
import FormCard from "@/components/FormCard";
import { formatINR } from "@/utils/format";

/* ── process images — the story of making ────────────── */
const process = [
  { img: "https://picsum.photos/seed/wax-sculpt/800/1000",    caption: "Beeswax sculpted by hand — no two are identical" },
  { img: "https://picsum.photos/seed/clay-mold-wrap/800/1000", caption: "Clay layers seal the form to create the mould" },
  { img: "https://picsum.photos/seed/brass-pour/800/1000",     caption: "Brass at 900°C fills the void left by melted wax" },
  { img: "https://picsum.photos/seed/break-reveal/800/1000",   caption: "The mould breaks once — what remains is permanent" },
  { img: "https://picsum.photos/seed/final-polish/800/1000",   caption: "Weeks of hand-finishing bring out every detail" },
];

/* ── voices ────────────────────────────────────────────── */
const voices = [
  {
    text: "The weight is the first thing you feel. This is not decoration — it has presence.",
    name: "Meera Iyer",
    city: "Chennai",
    product: "Ganesh Brass Murti",
  },
  {
    text: "It became the centerpiece of our living room. Guests always ask about it first.",
    name: "Priya Sharma",
    city: "Mumbai",
    product: "Lakshmi Brass Murti",
  },
  {
    text: "We gifted one for a housewarming. They called it the most thoughtful gift they've received.",
    name: "Arjun Bose",
    city: "Kolkata",
    product: "Shiva Brass Murti",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const { products } = useMainProducts();
  const featured = products[2]; // Vishnu
  const lookbook = products.slice(0, 6);

  return (
    <div>

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="text-center px-6 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="overline mb-6">Haridwar · Since 1987</p>
            <h1 className="text-hero text-ink mb-5">Divine<br />Arts</h1>
            <div className="editorial-line mx-auto mb-5" />
            <p className="font-body text-graphite text-base max-w-lg mx-auto leading-relaxed mb-10">
              Hand-cast brass sculptures from the foothills of the Himalaya.
              Statement pieces for modern homes, made the ancient way.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <Link to="/forms" className="btn-clay">Browse Collection</Link>
            <Link to="/discover" className="btn-outline">Find Your Piece</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="flex items-center gap-2 text-smoke mt-14 justify-center"
          >
            <ArrowDown size={13} className="animate-bounce" />
            <span className="font-body text-[10px] tracking-[0.4em] uppercase">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ PRODUCT GRID — Show the collection immediately ════ */}
      <section className="py-16 md:py-20 bg-linen">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="overline mb-2">The collection</p>
              <h2 className="font-display text-3xl text-ink">Handcrafted Pieces</h2>
            </div>
            <Link to="/forms" className="btn-ghost text-[10px]">View all {products.length} <ArrowRight size={11} /></Link>
          </div>
        </div>
        <div className="h-scroll pl-6 md:pl-10 gap-8 pb-6">
          {lookbook.map((p, i) => (
            <FormCard key={p.id} product={p} index={i} variant="lookbook" />
          ))}
        </div>
      </section>

      {/* ═══ FEATURED — Editorial product spotlight ════════════ */}
      {featured && (
        <section className="py-16 md:py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="aspect-[3/4] overflow-hidden bg-linen"
              >
                <img src={featured.images[0]} alt={featured.title} className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.5s]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <p className="overline-clay mb-3">Featured piece</p>
                <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-2">{featured.title}</h2>
                {featured.mantra && <p className="font-display italic text-graphite text-lg mb-5">{featured.mantra}</p>}
                <div className="editorial-line mb-5" />
                <p className="font-body text-graphite leading-relaxed mb-3">{featured.description}</p>
                <p className="font-body text-sm text-smoke leading-relaxed mb-6">{featured.longDescription}</p>

                <div className="flex items-end justify-between mb-6 pb-5 border-b border-ash">
                  <span className="font-display text-3xl text-ink">{formatINR(featured.variants[0].priceINR)}</span>
                  <span className="font-body text-xs text-smoke">{featured.variants[0].weight}</span>
                </div>

                <div className="flex gap-4">
                  <Link to={`/form/${featured.handle}`} className="btn-clay">View Details</Link>
                  <Link to="/forms" className="btn-ghost">See all pieces <ArrowRight size={12} /></Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ THE CRAFT — Horizontal process strip ══════════════ */}
      <section className="py-16 md:py-20 border-t border-ash">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div>
              <p className="overline mb-2">The craft</p>
              <h2 className="font-display text-3xl text-ink">Lost-Wax, Found Form</h2>
            </div>
            <p className="font-body text-sm text-graphite leading-relaxed max-w-md md:text-right md:ml-auto">
              Every piece is cast using the ancient lost-wax method — a 4,000-year-old technique
              where no two outcomes are identical.
            </p>
          </div>
        </div>
        <div className="h-scroll pl-6 md:pl-10 gap-5 pb-4">
          {process.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="w-[260px] md:w-[300px] flex-shrink-0"
            >
              <div className="aspect-[4/5] overflow-hidden mb-3 bg-linen">
                <img src={step.img} alt={step.caption} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="flex items-start gap-3">
                <span className="font-display text-3xl text-ash/60 leading-none">0{i + 1}</span>
                <p className="font-body text-xs text-graphite leading-relaxed pt-1">{step.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ VOICES ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <p className="overline-clay text-center mb-12">What people say</p>
          <div className="grid md:grid-cols-3 gap-8">
            {voices.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="border border-ash p-8 flex flex-col"
              >
                <p className="font-display italic text-xl text-ink leading-relaxed mb-6 flex-1">"{v.text}"</p>
                <div>
                  <div className="editorial-line mb-4" />
                  <p className="font-body text-sm text-ink font-medium">{v.name}</p>
                  <p className="font-body text-xs text-smoke">{v.city} · {v.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA — Discovery guide ═══════════════════════════ */}
      <section className="bg-ink py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-clay-light mb-5">Not sure where to start?</p>
            <h2 className="font-display text-4xl md:text-5xl text-paper leading-tight mb-5">
              Find the piece<br />that belongs with you.
            </h2>
            <p className="font-body text-smoke max-w-md mx-auto mb-8 leading-relaxed">
              Answer two quick questions and we'll recommend the perfect brass sculpture
              for your space, occasion, or intention.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/discover" className="inline-flex items-center justify-center gap-2 bg-clay text-white font-body text-[11px] tracking-[0.3em] uppercase px-7 py-3.5 transition-all duration-300 hover:bg-clay-light">
                Take the Guide <ArrowRight size={12} />
              </Link>
              <Link to="/forms" className="inline-flex items-center justify-center gap-2 border border-paper/30 text-paper/80 font-body text-[11px] tracking-[0.3em] uppercase px-7 py-3.5 transition-all duration-300 hover:bg-paper/10 hover:text-paper">
                Browse All Pieces
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
