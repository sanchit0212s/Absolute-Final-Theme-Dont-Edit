import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { quizQ1, quizQ2, allChakras, getQuizResults, type DeityInfo } from "@/data/deities";
import { mainProducts } from "@/data/products";
import CopperRule from "@/components/CopperRule";
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

export default function Guide() {
  const [step, setStep] = useState(1);
  const [chakraKey, setChakraKey] = useState("");
  const [element, setElement] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<DeityInfo[]>([]);
  const { addItem, openCart } = useCart();

  function handleQ1(option: typeof quizQ1[0]) {
    setChakraKey(option.chakra || "");
    setStep(2);
  }

  function handleQ2(option: typeof quizQ2[0]) {
    setElement(option.element || "");
    setStep(3);
  }

  function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    const found = getQuizResults(chakraKey, element);
    setResults(found);
    setStep(4);
  }

  function getProductForDeity(deity: DeityInfo) {
    return mainProducts.find((p) =>
      p.title.toLowerCase().includes(deity.name.toLowerCase())
    );
  }

  const stepLabels = ["Intention", "Element", "Connect", "Your Forms"];

  return (
    <div className="bg-night min-h-screen">
      {/* Hero */}
      <section className="border-b border-ember/40 bg-night-mid py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="section-label mb-3">The Deity Alignment Guide</p>
          <h1 className="font-display text-4xl md:text-5xl text-ivory font-light mb-4">
            Find Your Sacred Form
          </h1>
          <CopperRule className="mx-auto max-w-xs mb-6" />
          <p className="font-body text-stone/60 max-w-lg mx-auto leading-relaxed">
            A 4-step process to align your intention, elemental affinity, and chakra focus
            with the deity form that resonates most deeply with you.
          </p>
        </div>
      </section>

      {/* Progress */}
      <div className="border-b border-ember/30 bg-night">
        <div className="max-w-[600px] mx-auto px-6 py-4 flex items-center justify-between">
          {stepLabels.map((label, i) => {
            const num = i + 1;
            const active = num === step;
            const done = num < step;
            return (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 border text-[10px] flex items-center justify-center font-body transition-colors ${
                    active
                      ? "border-copper bg-copper text-night"
                      : done
                      ? "border-copper/40 text-copper/40"
                      : "border-ember/40 text-stone/30"
                  }`}
                >
                  {done ? "✓" : num}
                </span>
                <span
                  className={`font-body text-[10px] tracking-wider uppercase hidden sm:block ${
                    active ? "text-copper" : "text-stone/30"
                  }`}
                >
                  {label}
                </span>
                {i < stepLabels.length - 1 && (
                  <div className="w-8 h-px bg-ember/30 mx-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz content */}
      <div className="max-w-[700px] mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="num-label mb-2">01 / 04</p>
              <h2 className="font-display text-3xl text-ivory font-light mb-2">
                What are you seeking?
              </h2>
              <p className="font-body text-sm text-stone/50 mb-8">
                Select the intention that feels most alive for you right now.
              </p>
              <div className="space-y-3">
                {quizQ1.map((opt) => {
                  const chakra = allChakras.find(c => c.key === opt.chakra);
                  const color = chakraColors[opt.chakra || ""] || "#C8901F";
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQ1(opt)}
                      className="w-full flex items-center gap-4 p-4 border border-ember/40 text-left hover:border-copper/40 hover:bg-dusk/50 transition-all duration-200 group"
                    >
                      <div
                        className="w-1 h-8 flex-shrink-0 transition-all duration-200 group-hover:h-10"
                        style={{ backgroundColor: color }}
                      />
                      <div>
                        <p className="font-body text-sm text-ivory/80 group-hover:text-ivory transition-colors">
                          {opt.text}
                        </p>
                        {chakra && (
                          <p className="font-body text-[10px] text-stone/40 mt-0.5 tracking-wider">
                            {chakra.name}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="num-label mb-2">02 / 04</p>
              <h2 className="font-display text-3xl text-ivory font-light mb-2">
                Where are you now?
              </h2>
              <p className="font-body text-sm text-stone/50 mb-8">
                Describe your current inner state honestly.
              </p>
              <div className="space-y-3">
                {quizQ2.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleQ2(opt)}
                    className="w-full flex items-center gap-4 p-4 border border-ember/40 text-left hover:border-copper/40 hover:bg-dusk/50 transition-all duration-200 group"
                  >
                    <span className="text-copper/30 group-hover:text-copper/60 transition-colors">✦</span>
                    <div>
                      <p className="font-body text-sm text-ivory/80 group-hover:text-ivory transition-colors">
                        {opt.text}
                      </p>
                      <p className="font-body text-[10px] text-stone/40 mt-0.5 tracking-wider">
                        Element: {opt.element}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 mt-8 font-body text-xs text-stone/40 hover:text-stone/70 transition-colors"
              >
                <ArrowLeft size={12} /> Back
              </button>
            </motion.div>
          )}

          {/* Step 3 — email */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="num-label mb-2">03 / 04</p>
              <h2 className="font-display text-3xl text-ivory font-light mb-2">
                Where shall we send your results?
              </h2>
              <p className="font-body text-sm text-stone/50 mb-8">
                Optional — skip to see your forms now.
              </p>
              <form onSubmit={handleEmail} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-dusk border border-ember/60 text-ivory font-body text-sm px-4 py-3 placeholder-stone/30 focus:outline-none focus:border-copper/60 transition-colors"
                />
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 btn-copper text-center">
                    Send My Results
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const found = getQuizResults(chakraKey, element);
                      setResults(found);
                      setStep(4);
                    }}
                    className="flex-1 btn-outline-copper text-center"
                  >
                    Skip
                  </button>
                </div>
              </form>
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 mt-6 font-body text-xs text-stone/40 hover:text-stone/70 transition-colors"
              >
                <ArrowLeft size={12} /> Back
              </button>
            </motion.div>
          )}

          {/* Step 4 — results */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="num-label mb-2">04 / 04</p>
              <h2 className="font-display text-3xl text-ivory font-light mb-2">
                Your Sacred Forms
              </h2>
              <p className="font-body text-sm text-stone/50 mb-8">
                Based on your intention and current state, these deities align most closely with your path.
              </p>

              {results.length === 0 ? (
                <div className="text-center py-10">
                  <p className="font-body text-stone/50">No matching forms found. Explore the full collection.</p>
                  <Link to="/collection" className="btn-outline-copper mt-6 inline-block">
                    View Collection
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map((deity, i) => {
                    const product = getProductForDeity(deity);
                    return (
                      <motion.div
                        key={deity.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="border border-ember/40 p-6 flex gap-6 items-start hover:border-copper/30 transition-colors"
                      >
                        {product && (
                          <div className="w-20 aspect-[3/4] bg-dusk overflow-hidden flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="section-label mb-1">{deity.tagline}</p>
                          <h3 className="font-display text-2xl text-ivory mb-1">{deity.name}</h3>
                          <p className="font-body text-xs text-stone/40 italic mb-3">{deity.mantra}</p>
                          <div className="flex gap-3 text-[10px] font-body text-stone/40 tracking-wider mb-4">
                            <span>{deity.chakra}</span>
                            <span>·</span>
                            <span>{deity.element}</span>
                          </div>
                          {product && (
                            <div className="flex items-center gap-3">
                              <Link
                                to={`/product/${product.handle}`}
                                className="flex items-center gap-1.5 btn-outline-copper text-xs py-2 px-4"
                              >
                                View Murti <ArrowRight size={12} />
                              </Link>
                              <span className="font-display text-copper text-sm">
                                {formatINR(product.variants[0].priceINR)}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => { setStep(1); setChakraKey(""); setElement(""); setResults([]); }}
                className="flex items-center gap-1.5 mt-10 font-body text-xs text-stone/40 hover:text-stone/70 transition-colors"
              >
                <ArrowLeft size={12} /> Retake Guide
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
