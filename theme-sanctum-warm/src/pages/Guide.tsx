import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import { quizQ1, quizQ2, getQuizResults, allChakras } from "@/data/deities";
import type { DeityInfo } from "@/data/deities";
import { mainProducts } from "@/data/products";
import { formatINR } from "@/utils/format";
import { useCart } from "@/context/CartContext";

const chakraColors: Record<string, string> = {
  muladhara: "#DC2626",
  svadhisthana: "#EA580C",
  manipura: "#CA8A04",
  anahata: "#16A34A",
  vishuddha: "#2563EB",
  ajna: "#4338CA",
  sahasrara: "#7C3AED",
};

const elementIcons: Record<string, string> = {
  Earth: "🌱",
  Water: "💧",
  Fire: "🔥",
  Air: "💨",
  Ether: "✨",
};

const steps = ["Your Intention", "Your State", "Your Contact", "Your Deity"];

export default function Guide() {
  const [step, setStep] = useState(0);
  const [chakraKey, setChakraKey] = useState("");
  const [element, setElement] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<DeityInfo[]>([]);
  const { addItem, openCart } = useCart();

  function handleQ1(chakra: string) {
    setChakraKey(chakra);
    setStep(1);
  }

  function handleQ2(el: string) {
    setElement(el);
    setStep(2);
  }

  function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    const matched = getQuizResults(chakraKey, element);
    setResults(matched);
    setStep(3);
  }

  function handleAddToCart(productHandle: string) {
    const product = mainProducts.find((p) => p.handle === productHandle);
    if (!product) return;
    addItem(product.variants[0].id);
    openCart();
  }

  return (
    <div className="bg-section-b min-h-screen">
      {/* Header */}
      <div className="bg-section-a border-b border-warm-tan/50 py-10">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-2 small-caps"
          >
            Ancient Wisdom
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-light text-espresso"
          >
            Find Your Deity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-walnut text-sm mt-2 max-w-lg mx-auto"
          >
            Two questions. Ancient wisdom. The sacred form that resonates with your intention.
          </motion.p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="bg-section-a border-b border-warm-tan/40 py-4">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    i <= step ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-body text-xs transition-all duration-300 ${
                      i < step
                        ? "bg-temple-gold text-parchment"
                        : i === step
                        ? "border-2 border-temple-gold text-temple-gold bg-temple-gold/10"
                        : "border border-warm-tan/70 text-walnut/50"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className="hidden sm:block font-body text-xs tracking-wider text-walnut">
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 h-px bg-warm-tan/60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz content */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <AnimatePresence mode="wait">
          {/* Step 0: Q1 — Intention / Chakra */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-10">
                <p className="font-body text-xs tracking-[0.22em] text-saffron uppercase mb-3 small-caps">
                  Question 1 of 2
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-espresso mb-3">
                  What are you seeking?
                </h2>
                <p className="font-serif italic text-walnut text-sm">
                  Choose the intention that resonates most deeply right now.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quizQ1.map((option) => {
                  const chakra = allChakras.find((c) => c.key === option.chakra);
                  const color = option.chakra ? chakraColors[option.chakra] : "#B8860B";
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQ1(option.chakra!)}
                      className="flex items-center gap-4 p-5 bg-parchment border border-warm-tan/70 text-left hover:border-temple-gold/50 hover:bg-antique-ivory transition-all duration-200 group"
                    >
                      <div
                        className="w-3 flex-shrink-0 h-12 rounded-full"
                        style={{ background: color }}
                      />
                      <div>
                        <p className="font-display text-base text-espresso group-hover:text-temple-gold transition-colors">
                          {option.text}
                        </p>
                        {chakra && (
                          <p className="font-body text-xs text-walnut mt-0.5 tracking-wide">
                            {chakra.name}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 1: Q2 — State / Element */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-10">
                <p className="font-body text-xs tracking-[0.22em] text-saffron uppercase mb-3 small-caps">
                  Question 2 of 2
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-espresso mb-3">
                  How are you feeling?
                </h2>
                <p className="font-serif italic text-walnut text-sm">
                  Be honest with yourself. The right choice comes from where you actually are, not where you wish to be.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {quizQ2.map((option) => {
                  const icon = option.element ? elementIcons[option.element] : "◆";
                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQ2(option.element!)}
                      className="flex items-center gap-4 p-5 bg-parchment border border-warm-tan/70 text-left hover:border-temple-gold/50 hover:bg-antique-ivory transition-all duration-200 group"
                    >
                      <span className="text-xl flex-shrink-0">{icon}</span>
                      <div>
                        <p className="font-display text-base text-espresso group-hover:text-temple-gold transition-colors">
                          {option.text}
                        </p>
                        {option.element && (
                          <p className="font-body text-xs text-walnut mt-0.5 tracking-wide">
                            {option.element} element
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 font-body text-xs text-walnut hover:text-temple-gold transition-colors tracking-wider uppercase"
              >
                <ArrowLeft size={12} />
                Go Back
              </button>
            </motion.div>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <div className="text-center mb-10">
                <p className="font-body text-xs tracking-[0.22em] text-saffron uppercase mb-3 small-caps">
                  Almost There
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-espresso mb-3">
                  Where shall we send your guidance?
                </h2>
                <p className="font-serif italic text-walnut text-sm max-w-sm mx-auto">
                  We'll show your matched deities and send occasional Vastu guidance and ritual insights. No noise.
                </p>
              </div>

              <form onSubmit={handleEmail} className="bg-saffron/8 border border-saffron/25 p-8">
                <label className="block font-body text-xs tracking-widest text-saffron uppercase mb-2 small-caps">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-parchment border border-warm-tan/70 font-body text-sm text-espresso placeholder:text-walnut/40 focus:outline-none focus:border-temple-gold/60 transition-colors mb-4"
                />
                <button type="submit" className="w-full btn-gold flex items-center justify-center gap-2 py-4">
                  Reveal My Deity
                  <ArrowRight size={14} />
                </button>
                <p className="font-body text-[11px] text-walnut/60 text-center mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => { setResults(getQuizResults(chakraKey, element)); setStep(3); }}
                  className="font-body text-xs text-walnut/60 hover:text-walnut underline transition-colors"
                >
                  Skip and see my results
                </button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-6 flex items-center gap-2 font-body text-xs text-walnut hover:text-temple-gold transition-colors tracking-wider uppercase"
              >
                <ArrowLeft size={12} />
                Go Back
              </button>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <p className="font-body text-xs tracking-[0.22em] text-saffron uppercase mb-3 small-caps">
                  Your Sacred Form
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-espresso mb-3">
                  {results.length === 1
                    ? "Your deity has revealed itself."
                    : `${results.length} deities resonate with your path.`}
                </h2>
                <p className="font-serif italic text-walnut text-sm max-w-lg mx-auto">
                  These sacred forms align with your stated intention and current state. Trust your instinct when you see them.
                </p>
              </div>

              <OrnamentalDivider tight />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
                {results.map((deity, i) => {
                  const product = mainProducts.find((p) =>
                    p.title.toLowerCase().includes(deity.name.toLowerCase())
                  );
                  const color = chakraColors[deity.chakraKey] ?? "#B8860B";

                  return (
                    <motion.div
                      key={deity.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-parchment border border-warm-tan/60 overflow-hidden hover:border-temple-gold/40 transition-colors duration-300"
                    >
                      {product && (
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={deity.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div
                          className="inline-block w-3 h-3 rounded-full mb-3"
                          style={{ background: color }}
                        />
                        <h3 className="font-display text-2xl text-espresso mb-1">{deity.name}</h3>
                        <p className="font-serif italic text-sm text-walnut mb-1">{deity.tagline}</p>
                        <p className="font-body text-[11px] text-walnut/70 tracking-wide mb-1">{deity.chakra}</p>
                        <p className="font-body text-xs text-temple-gold/80 italic mb-4 truncate">{deity.mantra}</p>

                        {product && (
                          <div className="flex gap-2">
                            <Link
                              to={`/product/${product.handle}`}
                              className="flex-1 btn-outline-gold text-xs py-2.5 text-center"
                            >
                              Explore
                            </Link>
                            <button
                              onClick={() => handleAddToCart(product.handle)}
                              className="flex-1 btn-gold text-xs py-2.5"
                            >
                              Add to Altar
                            </button>
                          </div>
                        )}

                        {!product && (
                          <Link
                            to={`/collection?deity=${encodeURIComponent(deity.name)}`}
                            className="block w-full btn-outline-gold text-xs py-2.5 text-center"
                          >
                            View in Collection
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <OrnamentalDivider />

              <div className="text-center mt-6">
                <p className="font-serif italic text-walnut text-sm mb-4">
                  Want to explore more? Browse the full collection or retake the guide.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/collection" className="btn-gold">Browse All Murtis</Link>
                  <button
                    onClick={() => { setStep(0); setChakraKey(""); setElement(""); setEmail(""); setResults([]); }}
                    className="btn-outline-gold"
                  >
                    Retake the Guide
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
