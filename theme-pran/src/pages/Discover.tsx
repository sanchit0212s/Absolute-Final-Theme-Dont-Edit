import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { quizQ1, quizQ2, getQuizResults, type DeityInfo } from "@/data/deities";
import { useMainProducts } from "@/hooks/useProducts";
import { formatINR } from "@/utils/format";

/* ── Friendly labels for quiz options (hide spiritual jargon) ── */
const q1Labels: Record<string, string> = {
  muladhara: "Grounding & stability",
  svadhisthana: "Joy & creativity",
  manipura: "Confidence & strength",
  anahata: "Love & compassion",
  vishuddha: "Expression & truth",
  ajna: "Clarity & wisdom",
  sahasrara: "Transcendence & peace",
};

const q2Labels: Record<string, string> = {
  Earth: "Steady and rooted",
  Water: "Flowing and adaptive",
  Fire: "Passionate and driven",
  Air: "Free and expansive",
  Ether: "Still and open",
};

export default function Discover() {
  const { products: mainProducts } = useMainProducts();
  const [step, setStep] = useState(0);
  const [chakraKey, setChakraKey] = useState("");
  const [element, setElement] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<DeityInfo[]>([]);

  function getProduct(d: DeityInfo) {
    return mainProducts.find(p => p.title.toLowerCase().includes(d.name.toLowerCase()));
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">

        {/* ── INTRO ─────────────────────────────────────── */}
        {step === 0 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center pt-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="overline-clay mb-4">Personalized recommendation</p>
              <h1 className="text-title text-ink max-w-lg mx-auto mb-4">
                Find the piece<br />made for you.
              </h1>
              <div className="editorial-line mx-auto mb-5" />
              <p className="font-body text-graphite max-w-md mx-auto leading-relaxed mb-8">
                Two quick questions about what you're looking for. We'll match you
                with the perfect brass sculpture for your space.
              </p>
              <button
                onClick={() => setStep(1)}
                className="btn-clay"
              >
                Let's start <ArrowRight size={13} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ── QUESTION 1 — What are you looking for? ──── */}
        {step === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="min-h-screen flex items-center justify-center px-6 pt-20"
          >
            <div className="max-w-[600px] w-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-8 h-1 bg-clay rounded-full" />
                  <div className="w-8 h-1 bg-ash rounded-full" />
                </div>
                <span className="font-body text-[10px] text-smoke tracking-wider">Step 1 of 2</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-2">
                What feeling do you want<br />in your space?
              </h2>
              <p className="font-body text-sm text-smoke mb-10">Choose what resonates most.</p>

              <div className="space-y-2">
                {quizQ1.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => { setChakraKey(opt.chakra || ""); setStep(2); }}
                    className="w-full flex items-center gap-4 py-4 px-5 border border-ash text-left group hover:border-clay hover:bg-clay/[0.02] transition-all duration-300"
                  >
                    <span className="font-body text-[10px] text-smoke/50 tracking-wider w-6">0{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-body text-[15px] text-ink group-hover:text-clay transition-colors">
                        {opt.text}
                      </p>
                      {opt.chakra && q1Labels[opt.chakra] && (
                        <p className="font-body text-[10px] text-smoke tracking-wider mt-0.5">
                          {q1Labels[opt.chakra]}
                        </p>
                      )}
                    </div>
                    <ArrowRight size={13} className="text-ash group-hover:text-clay transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── QUESTION 2 — Your current energy ─────────── */}
        {step === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="min-h-screen flex items-center justify-center px-6 pt-20"
          >
            <div className="max-w-[600px] w-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  <div className="w-8 h-1 bg-clay rounded-full" />
                  <div className="w-8 h-1 bg-clay rounded-full" />
                </div>
                <span className="font-body text-[10px] text-smoke tracking-wider">Step 2 of 2</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-2">
                How would you describe<br />your current state?
              </h2>
              <p className="font-body text-sm text-smoke mb-10">Go with your gut.</p>

              <div className="space-y-2">
                {quizQ2.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      setElement(opt.element || "");
                      const res = getQuizResults(chakraKey, opt.element || "");
                      setResults(res);
                      setStep(3);
                    }}
                    className="w-full flex items-center gap-4 py-4 px-5 border border-ash text-left group hover:border-clay hover:bg-clay/[0.02] transition-all duration-300"
                  >
                    <span className="font-body text-[10px] text-smoke/50 tracking-wider w-6">0{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-body text-[15px] text-ink group-hover:text-clay transition-colors">
                        {opt.text}
                      </p>
                      {opt.element && q2Labels[opt.element] && (
                        <p className="font-body text-[10px] text-smoke tracking-wider mt-0.5">
                          {q2Labels[opt.element]}
                        </p>
                      )}
                    </div>
                    <ArrowRight size={13} className="text-ash group-hover:text-clay transition-colors" />
                  </motion.button>
                ))}
              </div>

              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 mt-8 font-body text-xs text-smoke hover:text-clay transition-colors">
                <ArrowLeft size={11} /> Back
              </button>
            </div>
          </motion.div>
        )}

        {/* ── EMAIL (optional) — removed, skip straight to results */}

        {/* ── RESULTS ──────────────────────────────────── */}
        {step === 3 && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="min-h-screen pt-28 pb-20 px-6"
          >
            <div className="max-w-[1000px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <p className="overline-clay mb-3">Your recommendation</p>
                <h2 className="font-display text-title text-ink mb-3">
                  {results.length === 1
                    ? `We recommend the ${results[0].name}.`
                    : "Here's what we found for you."}
                </h2>
                <p className="font-body text-sm text-smoke">Based on your preferences, these pieces are the best fit.</p>
              </motion.div>

              <div className="space-y-10">
                {results.map((d, i) => {
                  const p = getProduct(d);
                  return (
                    <motion.div
                      key={d.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 + 0.2, duration: 0.6 }}
                      className="grid md:grid-cols-12 gap-8 items-start bg-linen/50 border border-ash/50 p-6 md:p-8"
                    >
                      {p && (
                        <div className="md:col-span-4">
                          <div className="aspect-[3/4] bg-linen overflow-hidden">
                            <img src={p.images[0]} alt={d.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}
                      <div className={p ? "md:col-span-8" : "md:col-span-12"}>
                        <p className="overline-clay mb-2">{d.tagline}</p>
                        <h3 className="font-display text-3xl text-ink mb-1">{d.name}</h3>
                        {d.mantra && (
                          <p className="font-display italic text-smoke text-base mb-4">{d.mantra}</p>
                        )}
                        <div className="editorial-line mb-4" />
                        <p className="font-body text-sm text-graphite leading-relaxed mb-2">
                          {d.vastuPlacement}
                        </p>
                        <p className="font-body text-xs text-smoke leading-relaxed mb-5">
                          Perfect for adding presence and intention to your space.
                        </p>
                        {p && (
                          <div className="flex items-center gap-5">
                            <Link to={`/form/${p.handle}`} className="btn-clay">
                              View this piece <ArrowRight size={12} />
                            </Link>
                            <span className="font-display text-xl text-ink">{formatINR(p.variants[0].priceINR)}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
                <button
                  onClick={() => { setStep(0); setChakraKey(""); setElement(""); setResults([]); }}
                  className="btn-ghost"
                >
                  <ArrowLeft size={12} /> Start over
                </button>
                <Link to="/forms" className="btn-outline">
                  Browse full collection
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
