import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { quizQ1, quizQ2, allChakras, getQuizResults, type DeityInfo } from "@/data/deities";
import { mainProducts } from "@/data/products";
import LotusRule from "@/components/LotusRule";
import { formatINR } from "@/utils/format";

const chakraColors: Record<string, string> = {
  muladhara: "#DC2626", svadhisthana: "#EA580C", manipura: "#CA8A04",
  anahata: "#16A34A", vishuddha: "#2563EB", ajna: "#4338CA", sahasrara: "#7C3AED",
};

const steps = ["Intention", "State", "Connect", "Your Form"];

export default function Guide() {
  const [step, setStep] = useState(1);
  const [chakraKey, setChakraKey] = useState("");
  const [element, setElement] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<DeityInfo[]>([]);

  function getProduct(d: DeityInfo) {
    return mainProducts.find(p => p.title.toLowerCase().includes(d.name.toLowerCase()));
  }

  return (
    <div className="bg-ivory min-h-screen">
      {/* Saffron header */}
      <section className="bg-saffron pt-16">
        <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
          <p className="overline-label text-white/60 mb-4">The Deity Alignment Guide</p>
          <h1
            className="font-display text-white font-light mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: "1" }}
          >
            Find Your Sacred Form
          </h1>
          <LotusRule color="white" className="mx-auto max-w-xs mb-6" />
          <p className="font-body text-white/70 max-w-md mx-auto leading-relaxed">
            Four steps. Your chakra, your element, your intention — matched to the deity
            that belongs in your space.
          </p>
        </div>

        {/* Step bar */}
        <div className="border-t border-white/20">
          <div className="max-w-[700px] mx-auto px-6 py-4 flex items-center justify-center gap-2">
            {steps.map((s, i) => {
              const n = i + 1;
              const active = n === step;
              const done = n < step;
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1.5 transition-all ${
                    active ? "bg-white" : done ? "bg-white/20" : "bg-transparent"
                  }`}>
                    <span className={`font-body text-[10px] font-semibold ${active ? "text-saffron" : "text-white/50"}`}>
                      {done ? "✓" : n}
                    </span>
                    <span className={`font-body text-[10px] tracking-widest uppercase hidden sm:block ${
                      active ? "text-saffron" : "text-white/40"
                    }`}>{s}</span>
                  </div>
                  {i < steps.length - 1 && <div className="w-6 h-px bg-white/20" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <div className="max-w-[700px] mx-auto px-6 py-16">
        <AnimatePresence mode="wait">

          {/* Step 1 */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <p className="font-body text-xs text-bark tracking-widest uppercase mb-2">01 of 04</p>
              <h2 className="font-display text-4xl text-espresso font-light mb-2">What are you seeking?</h2>
              <p className="font-body text-sm text-bark mb-10">Choose the intention that feels most alive right now.</p>
              <div className="space-y-3">
                {quizQ1.map((opt) => {
                  const chakra = allChakras.find(c => c.key === opt.chakra);
                  const color = chakraColors[opt.chakra || ""] || "#FF8C00";
                  return (
                    <button
                      key={opt.id}
                      onClick={() => { setChakraKey(opt.chakra || ""); setStep(2); }}
                      className="w-full flex items-center gap-5 p-5 border-2 border-sand/60 text-left hover:border-saffron group transition-all duration-200"
                    >
                      <div className="w-1 h-10 flex-shrink-0 rounded-full" style={{ backgroundColor: color }} />
                      <div>
                        <p className="font-body text-base text-espresso group-hover:text-saffron transition-colors">{opt.text}</p>
                        {chakra && <p className="font-body text-[10px] text-bark tracking-wider mt-0.5">{chakra.name}</p>}
                      </div>
                      <div className="ml-auto text-sand group-hover:text-saffron transition-colors">
                        <ArrowRight size={16} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <p className="font-body text-xs text-bark tracking-widest uppercase mb-2">02 of 04</p>
              <h2 className="font-display text-4xl text-espresso font-light mb-2">Where are you now?</h2>
              <p className="font-body text-sm text-bark mb-10">An honest reading of your current inner state.</p>
              <div className="space-y-3">
                {quizQ2.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setElement(opt.element || ""); setStep(3); }}
                    className="w-full flex items-center gap-5 p-5 border-2 border-sand/60 text-left hover:border-saffron group transition-all duration-200"
                  >
                    <span className="text-sand group-hover:text-saffron text-xl transition-colors">◦</span>
                    <div>
                      <p className="font-body text-base text-espresso group-hover:text-saffron transition-colors">{opt.text}</p>
                      <p className="font-body text-[10px] text-bark tracking-wider mt-0.5">Element: {opt.element}</p>
                    </div>
                    <div className="ml-auto text-sand group-hover:text-saffron transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="flex items-center gap-1.5 mt-8 font-body text-xs text-bark hover:text-saffron transition-colors">
                <ArrowLeft size={12} /> Back
              </button>
            </motion.div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <p className="font-body text-xs text-bark tracking-widest uppercase mb-2">03 of 04</p>
              <h2 className="font-display text-4xl text-espresso font-light mb-2">Where to send your results?</h2>
              <p className="font-body text-sm text-bark mb-10">Optional — skip ahead to see your forms immediately.</p>
              <form onSubmit={(e) => { e.preventDefault(); setResults(getQuizResults(chakraKey, element)); setStep(4); }} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border-2 border-sand/60 bg-cream text-espresso font-body px-4 py-3.5 placeholder-bark/40 focus:outline-none focus:border-saffron transition-colors"
                />
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 btn-saffron text-center">Send My Results</button>
                  <button
                    type="button"
                    onClick={() => { setResults(getQuizResults(chakraKey, element)); setStep(4); }}
                    className="flex-1 btn-outline-espresso text-center"
                  >
                    Skip
                  </button>
                </div>
              </form>
              <button onClick={() => setStep(2)} className="flex items-center gap-1.5 mt-6 font-body text-xs text-bark hover:text-saffron transition-colors">
                <ArrowLeft size={12} /> Back
              </button>
            </motion.div>
          )}

          {/* Step 4 — results */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-body text-xs text-bark tracking-widest uppercase mb-2">04 of 04</p>
              <h2 className="font-display text-4xl text-espresso font-light mb-2">Your Sacred Forms</h2>
              <p className="font-body text-sm text-bark mb-10">
                Based on your intention and current state.
              </p>

              <div className="space-y-6">
                {results.map((d, i) => {
                  const p = getProduct(d);
                  return (
                    <motion.div
                      key={d.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-2 border-sand/60 p-6 flex gap-6 hover:border-saffron transition-colors"
                    >
                      {p && (
                        <div className="w-20 h-20 bg-cream overflow-hidden flex-shrink-0">
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="overline-label text-saffron text-[9px] mb-1">{d.tagline}</p>
                        <h3 className="font-display text-2xl text-espresso mb-1">{d.name}</h3>
                        <p className="font-body text-xs text-bark italic mb-3">{d.mantra}</p>
                        <p className="font-body text-xs text-bark mb-4">{d.chakra} · {d.element}</p>
                        {p && (
                          <div className="flex items-center gap-4">
                            <Link to={`/product/${p.handle}`} className="btn-saffron text-xs py-2 px-5 flex items-center gap-1.5">
                              View Murti <ArrowRight size={12} />
                            </Link>
                            <span className="font-display text-espresso">{formatINR(p.variants[0].priceINR)}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={() => { setStep(1); setChakraKey(""); setElement(""); setResults([]); }}
                className="flex items-center gap-1.5 mt-10 font-body text-xs text-bark hover:text-saffron transition-colors"
              >
                <ArrowLeft size={12} /> Retake the Guide
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
