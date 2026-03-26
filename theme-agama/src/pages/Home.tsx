import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { mainProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/utils/format";

/* ── Three paths: why are you here? ──────────────────── */
const paths = [
  {
    id: "sacred",
    question: "I'm setting up a sacred space",
    sub: "New home, puja room, or daily practice",
    deityIndex: 0, // Ganesh — first purchase, new beginnings
  },
  {
    id: "gift",
    question: "I'm looking for a meaningful gift",
    sub: "Housewarming, wedding, or blessing",
    deityIndex: 3, // Buddha — universal, non-denominational
  },
  {
    id: "curious",
    question: "I want to understand the craft",
    sub: "Just browsing — show me everything",
    deityIndex: 1, // Shiva — the fascinating one
  },
];

/* ── Consecration calendar (mock) ────────────────────── */
const nextCeremony = { date: "April 3, 2026", spotsLeft: 4, totalSpots: 8 };

/* ── Customer homes (mock) ───────────────────────────── */
const homes = [
  { img: "https://picsum.photos/seed/home-altar-1/400/500", city: "Chennai", murti: "Ganesh" },
  { img: "https://picsum.photos/seed/home-altar-2/400/500", city: "Mumbai", murti: "Lakshmi" },
  { img: "https://picsum.photos/seed/home-altar-3/400/500", city: "London", murti: "Shiva" },
  { img: "https://picsum.photos/seed/home-altar-4/400/500", city: "San Francisco", murti: "Buddha" },
  { img: "https://picsum.photos/seed/home-altar-5/400/500", city: "Bangalore", murti: "Krishna" },
];

export default function Home() {
  const [chosenPath, setChosenPath] = useState<string | null>(null);
  const { addItem, openCart } = useCart();

  const chosenDeityIdx = paths.find(p => p.id === chosenPath)?.deityIndex ?? 0;
  const hero = mainProducts[chosenDeityIdx];
  const v = hero.variants[0];

  function handleReserve() {
    addItem(v.id);
    openCart();
  }

  return (
    <div>

      {/* ═══ THE QUESTION ════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {!chosenPath ? (
          <motion.section
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 relative"
          >
            {/* The question */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-big text-ink text-center mb-16 max-w-2xl"
            >
              Why are you here?
            </motion.h1>

            {/* Three paths */}
            <div className="w-full max-w-2xl space-y-3">
              {paths.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  onClick={() => setChosenPath(p.id)}
                  className="path-card w-full text-left px-8 py-7 group flex items-center justify-between"
                >
                  <div>
                    <p className="font-display text-xl md:text-2xl text-ink group-hover:text-brass transition-colors tracking-tight">
                      {p.question}
                    </p>
                    <p className="font-body text-xs text-graphite mt-1">{p.sub}</p>
                  </div>
                  <ArrowRight size={18} className="text-graphite/30 group-hover:text-brass transition-colors flex-shrink-0 ml-4" />
                </motion.button>
              ))}
            </div>

            {/* Bottom note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-12 font-body text-xs text-graphite/50"
            >
              Hand-cast brass deity forms · Haridwar, India · Since 1987
            </motion.p>
          </motion.section>
        ) : (

          /* ═══ THE PRODUCT LAUNCH ═════════════════════════════ */
          <motion.div
            key="product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >

            {/* ── SECTION 1: The Weight (the metric hero) ───── */}
            <section className="min-h-screen flex items-center pt-20 pb-16">
              <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                  {/* Left — THE WEIGHT */}
                  <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                      <p className="label-brass mb-4">
                        {chosenPath === "sacred" && "For your sacred space"}
                        {chosenPath === "gift" && "A gift that lasts generations"}
                        {chosenPath === "curious" && "Begin here"}
                      </p>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-metric text-ink mb-2"
                    >
                      {v.weight || "1.8 kg"}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="font-body text-graphite text-sm mb-10"
                    >
                      of solid brass. Not hollow. Not plated. Solid.
                    </motion.p>

                    <motion.h2
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="font-display text-4xl md:text-5xl text-ink tracking-tight leading-tight mb-3"
                    >
                      {hero.title}
                    </motion.h2>
                    {hero.mantra && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                        className="font-body italic text-graphite text-base mb-8"
                      >
                        {hero.mantra}
                      </motion.p>
                    )}

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                      className="font-body text-charcoal leading-relaxed mb-8 max-w-md"
                    >
                      {hero.description}
                    </motion.p>

                    {/* Artisan attribution */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.85 }}
                      className="flex items-center gap-3 mb-10 pb-8 border-b border-gallery"
                    >
                      <div className="w-10 h-10 rounded-full bg-gallery overflow-hidden">
                        <img src="https://picsum.photos/seed/artisan-gopal/40/40" alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-display text-xs text-ink tracking-wide">Cast by Shri Gopal Vishwakarma</p>
                        <p className="font-body text-[10px] text-graphite">24th year at the workshop · Haridwar</p>
                      </div>
                    </motion.div>

                    {/* Price + CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.95 }}
                    >
                      <p className="font-display text-3xl text-ink mb-6">{formatINR(v.priceINR)}</p>
                      <div className="flex flex-wrap gap-3">
                        <button onClick={handleReserve} className="btn-black">
                          Reserve This Form
                        </button>
                        <a
                          href={`https://wa.me/919876543210?text=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(hero.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp"
                        >
                          <MessageCircle size={14} /> WhatsApp Us
                        </a>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right — Full product image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="aspect-[3/4] bg-gallery overflow-hidden"
                  >
                    <img
                      src={hero.images[0]}
                      alt={hero.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* ── SECTION 2: Consecration Calendar ──────────── */}
            <section className="bg-ink text-white py-20">
              <div className="max-w-[1000px] mx-auto px-6 md:px-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="font-display text-[10px] tracking-[0.35em] uppercase text-brass mb-4">
                      Consecration Ceremony
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-4">
                      Next ceremony:<br/>{nextCeremony.date}
                    </h3>
                    <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
                      Every Divine Arts murti receives Vedic Shuddhi Poojan before shipping.
                      Performed by Pandit Suresh Tiwari, our resident pandit of 21 years.
                      This is not optional — we do not ship an unconsecrated form as sacred.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(nextCeremony.totalSpots)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${
                              i < nextCeremony.totalSpots - nextCeremony.spotsLeft
                                ? "bg-white/20"
                                : "bg-brass"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-display text-xs text-brass tracking-wider ml-2">
                        {nextCeremony.spotsLeft} of {nextCeremony.totalSpots} spots open
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-metric text-white/10">
                      {nextCeremony.spotsLeft}
                    </p>
                    <p className="font-display text-sm text-white/40 tracking-[0.3em] uppercase -mt-4">
                      Spots remaining
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── SECTION 3: Weight comparison ──────────────── */}
            <section className="py-24">
              <div className="max-w-[1000px] mx-auto px-6 md:px-10 text-center">
                <p className="label-brass mb-4">Why weight matters</p>
                <h3 className="font-display text-3xl md:text-4xl text-ink tracking-tight mb-12">
                  What {v.weight || "1.8 kg"} of brass feels like
                </h3>
                <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
                  {[
                    { item: "3 hardcover books", icon: "📚" },
                    { item: "A full water bottle", icon: "🫗" },
                    { item: "A small dumbbell", icon: "🏋️" },
                  ].map(c => (
                    <div key={c.item} className="text-center">
                      <p className="text-4xl mb-3">{c.icon}</p>
                      <p className="font-body text-xs text-graphite leading-snug">{c.item}</p>
                    </div>
                  ))}
                </div>
                <p className="font-body text-sm text-graphite mt-12 max-w-md mx-auto leading-relaxed">
                  The first thing you notice is the weight. A hollow plated statue from
                  Amazon weighs 200g. This weighs {v.weight || "1.8 kg"}. Pick it up and you know
                  immediately — this is real.
                </p>
              </div>
            </section>

            {/* ── SECTION 4: Customer Homes Gallery ─────────── */}
            <section className="bg-gallery py-20">
              <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                <p className="label-brass mb-3">Where our forms live</p>
                <h3 className="font-display text-3xl text-ink tracking-tight mb-10">
                  Real homes. Real altars.
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {homes.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="aspect-[4/5] overflow-hidden relative group"
                    >
                      <img src={h.img} alt={h.city} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                        <p className="font-display text-xs text-white tracking-wider">{h.city}</p>
                        <p className="font-body text-[9px] text-white/60">{h.murti} Brass Murti</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── SECTION 5: Not your deity? ────────────────── */}
            <section className="py-24">
              <div className="max-w-[1000px] mx-auto px-6 md:px-10 text-center">
                <p className="label mb-4">Not the right form?</p>
                <h3 className="font-display text-3xl md:text-4xl text-ink tracking-tight mb-6">
                  We have 13 sacred forms.
                </h3>
                <p className="font-body text-graphite max-w-md mx-auto mb-10">
                  Each hand-cast in Haridwar. Browse them all, or tell us what you need
                  and we'll help you choose.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/forms" className="btn-outline">
                    See All Forms <ArrowRight size={13} />
                  </Link>
                  <a
                    href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20choosing%20a%20deity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <MessageCircle size={13} /> Help Me Choose
                  </a>
                </div>

                {/* Quick preview strip */}
                <div className="mt-14 grid grid-cols-4 md:grid-cols-6 gap-2 max-w-2xl mx-auto">
                  {mainProducts.slice(0, 6).map((p) => (
                    <Link
                      key={p.id}
                      to={`/form/${p.handle}`}
                      className="aspect-square bg-gallery overflow-hidden group"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* ── SECTION 6: The Close ──────────────────────── */}
            <section className="bg-ink py-20">
              <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
                <p className="font-display text-[10px] tracking-[0.35em] uppercase text-brass mb-6">
                  Still here?
                </p>
                <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-4">
                  The form you need is already decided.<br/>
                  You're just catching up.
                </h3>
                <p className="font-body text-sm text-white/40 mb-10 max-w-md mx-auto">
                  Solid brass. Hand-cast. Consecrated before it reaches you.
                  That's the only promise we make.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={handleReserve} className="btn-brass">
                    Reserve {hero.title.split(" ")[0]}
                  </button>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-white/50 hover:text-white"
                  >
                    <Phone size={12} /> Call the workshop
                  </a>
                </div>
              </div>
            </section>

            {/* Reset */}
            <div className="text-center py-6 bg-gallery">
              <button
                onClick={() => setChosenPath(null)}
                className="btn-ghost text-[10px] text-graphite"
              >
                ← Start over
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
