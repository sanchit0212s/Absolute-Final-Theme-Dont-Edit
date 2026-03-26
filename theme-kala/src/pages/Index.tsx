import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { mainProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import OrnamentalDivider from "@/components/OrnamentalDivider";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const trustItems = [
  "100% Solid Brass",
  "Hand-Cast in Haridwar",
  "Ships Worldwide",
  "Consecration Available",
];

const testimonials = [
  {
    text: "The weight of it, the texture — you can feel the intention in every detail. This is not a souvenir.",
    author: "Priya M.",
    location: "Mumbai",
    rating: 5,
  },
  {
    text: "I placed the Ganesh murti at my entrance and something shifted. The space feels different now — held.",
    author: "Arjun S.",
    location: "Bangalore",
    rating: 5,
  },
  {
    text: "Beautifully packed, arrived with a handwritten note. You can tell these people care.",
    author: "Meera K.",
    location: "Delhi",
    rating: 5,
  },
];

export default function Index() {
  const featured = mainProducts.slice(0, 4);


  return (
    <div className="bg-surface">

      {/* ═══════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-warm-wash min-h-[90vh] flex items-center">
        {/* Background textures */}
        <div className="absolute inset-0 bg-rangoli pointer-events-none" />
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-mandala opacity-30 pointer-events-none" />

        {/* Floating embers */}
        {[...Array(20)].map((_, i) => {
          const size = i % 4 === 0 ? "w-2 h-2" : "w-1.5 h-1.5";
          const color = i % 3 === 0 ? "bg-shimmer-gold" : "bg-saffron";
          const left = 5 + (i * 17 + i * i * 3) % 85;
          const top = 5 + (i * 23 + i * 7) % 80;
          const dur = 3 + (i % 7) * 0.8;
          return (
            <motion.div
              key={i}
              className={`absolute ${size} rounded-full ${color}`}
              style={{ left: `${left}%`, top: `${top}%`, opacity: 0 }}
              animate={{
                y: [0, -(25 + (i % 5) * 12), 0],
                opacity: [0, 0.3 + (i % 4) * 0.1, 0],
              }}
              transition={{
                duration: dur,
                repeat: Infinity,
                delay: (i * 0.4) % dur,
                ease: "easeInOut",
              }}
            />
          );
        })}

        <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-label mb-4">Sacred Brass from Haridwar</p>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-on-surface font-light leading-[1.1] mb-6">
                Sanctuary.
                <br />
                <span className="text-gradient-gold animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
                  Delivered.
                </span>
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-px bg-gradient-to-r from-accent/60 to-transparent" />
                <div className="ornament-diamond" />
                <div className="w-14 h-px bg-gradient-to-l from-accent/60 to-transparent" />
              </div>

              <p className="font-prose text-lg text-on-surface-muted italic leading-relaxed mb-4 max-w-lg">
                Between inner need and outer environment.
                <br />
                Between chaos and center.
              </p>
              <p className="font-body text-on-surface-faint leading-relaxed mb-8 max-w-md">
                Hand-cast brass deity murtis from Haridwar artisan families.
                Each form selected with purpose — to become a quiet center in your home,
                not just an object within it.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/collection" className="btn-primary">
                  Explore the Collection <ArrowRight size={14} />
                </Link>
                <Link to="/guide" className="btn-outline">
                  Find Your Deity
                </Link>
              </div>

              {/* Micro-stats */}
              <div className="flex items-center gap-8 mt-10">
                <div className="text-center">
                  <p className="font-display text-2xl text-accent"><CountUp target={13} /></p>
                  <p className="font-body text-[10px] text-on-surface-faint tracking-wider uppercase">Sacred Forms</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="font-display text-2xl text-accent"><CountUp target={40} suffix="+" /></p>
                  <p className="font-body text-[10px] text-on-surface-faint tracking-wider uppercase">Countries</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="font-display text-2xl text-accent"><CountUp target={100} suffix="%" /></p>
                  <p className="font-body text-[10px] text-on-surface-faint tracking-wider uppercase">Solid Brass</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Gold-framed hero image */}
            <div className="relative hidden lg:block">
              {/* Soft golden glow behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] rounded-full bg-accent/4 blur-3xl pointer-events-none" />

              {/* Gold frame border */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute -inset-3 border border-accent/25 rounded-sm pointer-events-none"
              >
                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-accent/50" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-accent/30" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-accent/30" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-accent/50" />
              </motion.div>

              {/* Main image */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative overflow-hidden shadow-2xl"
              >
                <div className="aspect-[3/4]">
                  <img
                    src="/hero-buddha.png"
                    alt="Brass Ganesh murti in a home altar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Warm bottom gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />

                {/* Text overlay at bottom */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="absolute bottom-8 left-8 right-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-px bg-accent/60" />
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase text-white/60">From Haridwar</p>
                  </div>
                  <p className="font-display text-2xl text-white/90 font-light leading-snug">
                    Where craft becomes
                    <br />
                    <span className="text-accent italic">devotion.</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Vertical gold dot accent — right edge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-1/3 -right-7 flex flex-col gap-3 pointer-events-none"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-accent/40"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          TRUST MARQUEE
          ═══════════════════════════════════════════════════ */}
      <section className="section-b border-y border-border py-4 overflow-hidden">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="flex items-center gap-10 px-10 whitespace-nowrap">
              {trustItems.map((item) => (
                <span key={item + i} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  <span className="font-body text-[11px] tracking-[0.2em] uppercase text-on-surface-muted">{item}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          FEATURED PRODUCTS
          ═══════════════════════════════════════════════════ */}
      <section className="section-b bg-grain py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <OrnamentalDivider label="Sacred Forms" className="mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/collection" className="btn-outline">
              View Full Collection <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          LIFESTYLE — NOT DECORATION, INTENTION
          ═══════════════════════════════════════════════════ */}
      <section className="py-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Image half */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square md:aspect-auto"
          >
            <img
              src="https://picsum.photos/seed/brass-altar-room/800/900"
              alt="Sacred brass in a home setting"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20 dark:to-surface/40" />
          </motion.div>

          {/* Text half */}
          <div className="flex items-center bg-surface-2 bg-jali relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="px-10 md:px-16 py-20"
            >
              <p className="section-label mb-6">The Approach</p>
              <h2 className="font-display text-3xl md:text-4xl text-on-surface font-light leading-snug mb-8">
                Not decoration.
                <br />
                <span className="text-gradient-gold">Intention.</span>
              </h2>

              <div className="space-y-5 mb-10">
                <p className="font-body text-on-surface-muted leading-relaxed">
                  Every piece in our collection was selected to become
                  the anchor of a room — not an afterthought. Heavy,
                  hand-cast solid brass from artisan families in Haridwar.
                </p>
                <p className="font-body text-on-surface-faint leading-relaxed">
                  A Ganesh at the entrance. A Nataraja in the living room.
                  A Buddha where you read. Each form transforms the
                  energy of a space — the weight alone tells you
                  something permanent has arrived.
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <p className="font-display text-3xl text-accent">1.2–3.2</p>
                  <p className="font-body text-[10px] text-on-surface-faint tracking-wider uppercase">kg per piece</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="font-display text-3xl text-accent">5–12"</p>
                  <p className="font-body text-[10px] text-on-surface-faint tracking-wider uppercase">hand-cast height</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          ROOM GALLERY — SPACES TRANSFORMED
          ═══════════════════════════════════════════════════ */}
      <section className="section-a py-20 relative">
        <div className="absolute inset-0 bg-rangoli pointer-events-none opacity-40" />

        <div className="max-w-[1400px] mx-auto px-6 relative">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Designed for Your Space</p>
            <h2 className="font-display text-3xl md:text-4xl text-on-surface font-light">
              Where they live in your home
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {/* Tall left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-6 md:col-span-4 row-span-2 rounded-lg overflow-hidden relative group"
            >
              <img
                src="https://picsum.photos/seed/entryway-ganesh/500/700"
                alt="Entryway with Ganesh murti"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-base text-white mb-0.5">The Entryway</p>
                <p className="font-body text-[10px] text-white/60 tracking-wider uppercase">Ganesh · Remover of Obstacles</p>
              </div>
            </motion.div>

            {/* Top right wide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-6 md:col-span-8 row-span-1 rounded-lg overflow-hidden relative group"
            >
              <img
                src="https://picsum.photos/seed/living-room-shiva/900/400"
                alt="Living room with Shiva Nataraja"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-base text-white mb-0.5">The Living Room</p>
                <p className="font-body text-[10px] text-white/60 tracking-wider uppercase">Shiva Nataraja · Force of Transformation</p>
              </div>
            </motion.div>

            {/* Bottom right — two squares */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-6 md:col-span-4 row-span-1 rounded-lg overflow-hidden relative group"
            >
              <img
                src="https://picsum.photos/seed/meditation-buddha/500/400"
                alt="Meditation corner with Buddha"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-base text-white mb-0.5">The Quiet Corner</p>
                <p className="font-body text-[10px] text-white/60 tracking-wider uppercase">Buddha · Embodiment of Stillness</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-6 md:col-span-4 row-span-1 rounded-lg overflow-hidden relative group"
            >
              <img
                src="https://picsum.photos/seed/study-saraswati/500/400"
                alt="Study with Saraswati"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-base text-white mb-0.5">The Study</p>
                <p className="font-body text-[10px] text-white/60 tracking-wider uppercase">Saraswati · Flow of Knowledge</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          TESTIMONIALS — FEATURED REVIEW
          ═══════════════════════════════════════════════════ */}
      <section className="bg-obsidian dark:bg-surface-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-sacred-circles opacity-10 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid md:grid-cols-2">
            {/* Left — Hero review */}
            <div className="px-8 md:px-16 py-20 flex flex-col justify-center">
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="text-shimmer-gold fill-shimmer-gold" />
                ))}
              </div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <p className="font-display text-2xl md:text-3xl text-white dark:text-on-surface font-light leading-relaxed italic">
                  &ldquo;The weight of it, the texture — you can feel the intention in every detail.
                  This is not a souvenir.&rdquo;
                </p>
              </motion.blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-temple-gold/20 flex items-center justify-center">
                  <span className="font-display text-lg text-shimmer-gold">P</span>
                </div>
                <div>
                  <p className="font-body text-sm text-white/80 dark:text-on-surface font-medium">Priya M.</p>
                  <p className="font-body text-xs text-white/40 dark:text-on-surface-faint">Mumbai · Ganesh & Krishna Murtis</p>
                </div>
              </div>

              {/* Additional mini-reviews */}
              <div className="mt-12 pt-8 border-t border-white/8 dark:border-border grid grid-cols-2 gap-6">
                {[
                  {
                    text: "The space feels different now — held.",
                    author: "Arjun S.",
                    city: "Bangalore",
                  },
                  {
                    text: "Beautifully packed, arrived with a handwritten note. You can tell these people care.",
                    author: "Meera K.",
                    city: "Delhi",
                  },
                ].map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={10} className="text-shimmer-gold/60 fill-shimmer-gold/60" />
                      ))}
                    </div>
                    <p className="font-prose text-xs text-white/50 dark:text-on-surface-faint italic leading-relaxed mb-2">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <p className="font-body text-[10px] text-white/30 dark:text-on-surface-faint">
                      {r.author} · {r.city}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — Lifestyle image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative hidden md:block"
            >
              <img
                src="https://picsum.photos/seed/brass-home-detail/700/900"
                alt="Brass murti in a living space"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-obsidian/30 dark:to-surface-3/30" />
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          THE WEIGHT OF INTENTION — Full-width text band
          ═══════════════════════════════════════════════════ */}
      <section className="section-a py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-mandala pointer-events-none opacity-20" />

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-accent/40" />
              <div className="ornament-diamond" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-accent/40" />
            </div>

            <p className="font-display text-3xl md:text-4xl lg:text-5xl text-on-surface font-light leading-snug mb-8">
              A room with a brass murti in it
              <br className="hidden md:block" />
              {" "}<span className="text-accent italic">is not the same room without one.</span>
            </p>

            <p className="font-body text-on-surface-faint text-sm max-w-xl mx-auto leading-relaxed mb-10">
              You notice it when you walk in. Something grounding, something still —
              a centre of gravity that the rest of the room organizes around.
              That is what solid brass does to a space.
            </p>

            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-10 h-px bg-accent/20" />
              <div className="ornament-diamond" />
              <div className="w-10 h-px bg-accent/20" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/collection" className="btn-primary">
                Explore the Collection <ArrowRight size={14} />
              </Link>
              <Link to="/guide" className="btn-outline">
                Find Your Deity
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
