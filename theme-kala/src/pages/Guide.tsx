import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";
import { quizQ1, quizQ2, getQuizResults, allChakras } from "@/data/deities";
import type { DeityInfo, QuizOption } from "@/data/deities";
import { mainProducts } from "@/data/products";
import OrnamentalDivider from "@/components/OrnamentalDivider";

// Module-level state — survives route changes within SPA session, resets on full page reload
let savedResults: DeityInfo[] | null = null;

const chakraColors: Record<string, string> = {
  muladhara: "#E53E3E",
  svadhisthana: "#ED8936",
  manipura: "#ECC94B",
  anahata: "#48BB78",
  vishuddha: "#4299E1",
  ajna: "#805AD5",
  sahasrara: "#D53F8C",
};

export default function Guide() {
  const [step, setStep] = useState(savedResults ? 4 : 1);
  const [q1Answer, setQ1Answer] = useState<QuizOption | null>(null);
  const [q2Answer, setQ2Answer] = useState<QuizOption | null>(null);
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<DeityInfo[]>(savedResults || []);

  function handleQ1(opt: QuizOption) {
    setQ1Answer(opt);
    setTimeout(() => setStep(2), 300);
  }

  function handleQ2(opt: QuizOption) {
    setQ2Answer(opt);
    setTimeout(() => setStep(3), 300);
  }

  function isValidEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  }

  function handleEmailSubmit() {
    if (!isValidEmail(email)) return;
    if (q1Answer?.chakra && q2Answer?.element) {
      const r = getQuizResults(q1Answer.chakra, q2Answer.element);
      setResults(r);
      savedResults = r;
    }
    setStep(4);
  }

  function retakeQuiz() {
    savedResults = null;
    setResults([]);
    setQ1Answer(null);
    setQ2Answer(null);
    setEmail("");
    setStep(1);
  }

  const progress = (step / 4) * 100;

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="section-b border-b border-border py-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-mandala pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <p className="section-label mb-2">Sacred Guide</p>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface font-light mb-3">
            Find Your Deity
          </h1>
          <p className="font-body text-sm text-on-surface-faint max-w-md mx-auto">
            Two questions. Your inner state meets the right sacred form.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <div className="h-1 bg-surface-2">
        <motion.div
          className="h-full bg-gradient-to-r from-temple-gold to-bright-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Quiz area */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <p className="num-label mb-2">Step 1 of 4</p>
                <h2 className="font-display text-2xl text-on-surface mb-2">
                  What are you seeking right now?
                </h2>
                <p className="font-body text-sm text-on-surface-faint">
                  Choose the intention that resonates most.
                </p>
              </div>

              <div className="space-y-3">
                {quizQ1.map((opt) => {
                  const chakra = allChakras.find(c => c.key === opt.chakra);
                  return (
                    <motion.button
                      key={opt.id}
                      onClick={() => handleQ1(opt)}
                      whileTap={{ scale: 0.98 }}
                      animate={q1Answer?.id === opt.id ? {
                        boxShadow: "0 0 0 4px hsl(40 90% 42% / 0.15)",
                      } : {
                        boxShadow: "0 0 0 0px hsl(40 90% 42% / 0)",
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-full text-left p-5 rounded-lg border transition-colors duration-200 flex items-center gap-4 group ${
                        q1Answer?.id === opt.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/30 bg-surface-2 hover:bg-surface-3"
                      }`}
                    >
                      {/* Chakra color indicator */}
                      <div
                        className="w-3 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: chakraColors[opt.chakra || ""] || "#888" }}
                      />
                      <div>
                        <p className="font-body text-sm text-on-surface">{opt.text}</p>
                        {chakra && (
                          <p className="font-body text-[10px] text-on-surface-faint mt-1">
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

          {/* Step 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <p className="num-label mb-2">Step 2 of 4</p>
                <h2 className="font-display text-2xl text-on-surface mb-2">
                  What best describes your current state?
                </h2>
                <p className="font-body text-sm text-on-surface-faint">
                  This helps us understand the element you need.
                </p>
              </div>

              <div className="space-y-3">
                {quizQ2.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => handleQ2(opt)}
                    whileTap={{ scale: 0.98 }}
                    animate={q2Answer?.id === opt.id ? {
                      boxShadow: "0 0 0 4px hsl(40 90% 42% / 0.15)",
                    } : {
                      boxShadow: "0 0 0 0px hsl(40 90% 42% / 0)",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-full text-left p-5 rounded-lg border transition-colors duration-200 ${
                      q2Answer?.id === opt.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/30 bg-surface-2 hover:bg-surface-3"
                    }`}
                  >
                    <p className="font-body text-sm text-on-surface">{opt.text}</p>
                    <p className="font-body text-[10px] text-on-surface-faint mt-1">
                      {opt.element} Element
                    </p>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="btn-ghost mt-6"
              >
                <ArrowLeft size={14} /> Back
              </button>
            </motion.div>
          )}

          {/* Step 3 — Email */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <p className="num-label mb-2">Step 3 of 4</p>
                <h2 className="font-display text-2xl text-on-surface mb-2">
                  Where should we send your guide?
                </h2>
                <p className="font-body text-sm text-on-surface-faint">
                  Get your personalized deity placement guide via email.
                </p>
              </div>

              <div className="max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-surface-2 border border-border rounded-lg px-5 py-4 font-body text-sm text-on-surface placeholder:text-on-surface-faint focus:outline-none focus:border-accent transition-colors mb-4"
                />
                <button
                  onClick={handleEmailSubmit}
                  disabled={!isValidEmail(email)}
                  className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  See My Results <ArrowRight size={14} />
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn-ghost mt-6"
              >
                <ArrowLeft size={14} /> Back
              </button>
            </motion.div>
          )}

          {/* Step 4 — Results */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Sparkles size={24} className="text-accent" />
                </div>
                <h2 className="font-display text-3xl text-on-surface mb-2">
                  Your Sacred Forms
                </h2>
                <p className="font-body text-sm text-on-surface-faint max-w-md mx-auto">
                  Based on your intention and inner state, these deities align with your energy.
                </p>
              </div>

              <OrnamentalDivider className="mb-10 max-w-xs mx-auto" />

              <div className="space-y-6">
                {results.map((deity) => {
                  const product = mainProducts.find(
                    (p) => p.title.toLowerCase().includes(deity.name.toLowerCase())
                  );

                  return (
                    <motion.div
                      key={deity.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card-warm p-6 flex gap-6"
                    >
                      {product && (
                        <div className="w-24 h-32 rounded-lg overflow-hidden bg-surface-3 flex-shrink-0">
                          <img src={product.images[0]} alt={deity.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-display text-xl text-on-surface mb-1">{deity.name}</h3>
                        <p className="font-prose text-sm text-accent italic mb-2">{deity.tagline}</p>
                        <p className="font-body text-xs text-on-surface-faint mb-1">
                          <span className="text-on-surface-muted">Chakra:</span> {deity.chakra}
                        </p>
                        <p className="font-body text-xs text-on-surface-faint mb-3">
                          <span className="text-on-surface-muted">Element:</span> {deity.element}
                        </p>
                        <Link
                          to={`/collection?deity=${encodeURIComponent(deity.name)}`}
                          className="inline-flex items-center gap-1.5 font-body text-xs tracking-wider uppercase text-accent hover:text-accent-hover transition-colors"
                        >
                          Find Your Murti <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center mt-10 flex flex-col items-center gap-3 max-w-xs mx-auto">
                <Link
                  to={`/collection?deity=${results.map((d) => encodeURIComponent(d.name)).join(",")}`}
                  className="btn-primary w-full justify-center"
                >
                  View All Recommendations <ArrowRight size={14} />
                </Link>
                <Link to="/collection" className="btn-outline w-full justify-center">
                  View Full Collection
                </Link>
                <button
                  onClick={retakeQuiz}
                  className="btn-ghost mt-2 text-on-surface-faint"
                >
                  <RotateCcw size={14} /> Retake Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
