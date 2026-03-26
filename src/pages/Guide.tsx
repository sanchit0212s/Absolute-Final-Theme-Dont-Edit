import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { quizQ1, quizQ2, getQuizResults, type DeityInfo } from "@/data/deities";
import { subscribeEmailToMarketing } from "@/lib/shopify";

export default function Guide() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedChakra, setSelectedChakra] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [results, setResults] = useState<DeityInfo[]>([]);
  const [email, setEmail] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  const handleQ1 = (chakraKey: string) => {
    setSelectedChakra(chakraKey);
    setStep(2);
  };

  const handleQ2 = (element: string) => {
    setSelectedElement(element);
    const matched = getQuizResults(selectedChakra, element);
    setResults(matched);
    setStep(3);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStep(4);
      return;
    }
    setEmailSubmitting(true);
    await subscribeEmailToMarketing(email.trim());
    setEmailSubmitting(false);
    setStep(4);
  };

  const restart = () => {
    setStep(1);
    setSelectedChakra("");
    setSelectedElement("");
    setResults([]);
    setEmail("");
  };

  return (
    <div className="bg-charcoal min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl text-ivory mb-4">The Guide</h1>
          <p className="text-ivory/40 font-body max-w-lg mx-auto">
            Two questions. Your deity revealed. No guesswork, no generic recommendations.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-lg transition-all ${
                step >= s ? "bg-gold/20 text-gold border border-gold/40" : "bg-charcoal-light text-ivory/20 border border-ivory/10"
              }`}>
                {s === 4 ? "✦" : s}
              </div>
              {s < 4 && <div className={`w-12 h-px transition-colors ${step > s ? "bg-gold/40" : "bg-ivory/10"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-2xl md:text-3xl text-ivory text-center mb-10">
                What is the primary shift you want in your life right now?
              </h2>
              <div className="space-y-3">
                {quizQ1.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleQ1(option.chakra!)}
                    className="w-full text-left p-5 border border-ivory/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 group"
                  >
                    <span className="text-ivory/60 group-hover:text-gold font-body transition-colors">{option.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-2xl md:text-3xl text-ivory text-center mb-10">
                Which sentence feels closest to your current inner condition?
              </h2>
              <div className="space-y-3">
                {quizQ2.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleQ2(option.element!)}
                    className="w-full text-left p-5 border border-ivory/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 group"
                  >
                    <span className="text-ivory/60 group-hover:text-gold font-body transition-colors">{option.text}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="mt-6 text-ivory/30 font-body text-sm hover:text-ivory/50 transition-colors">
                ← Go back
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-gold/40 flex items-center justify-center">
                <span className="font-display text-2xl text-gold">✦</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-ivory mb-4">
                Your deity has been revealed
              </h2>
              <p className="text-ivory/40 font-body mb-10 leading-relaxed">
                Enter your email to receive your personalised guidance — deity-specific mantras, placement tips, and sacred care rituals.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-5 py-4 bg-charcoal-light border border-ivory/15 text-ivory font-body placeholder:text-ivory/25 focus:outline-none focus:border-gold/40 transition-colors"
                />
                <button
                  type="submit"
                  disabled={emailSubmitting}
                  className="w-full py-4 bg-gold text-charcoal font-display text-lg tracking-widest hover:bg-gold-light transition-all duration-300 disabled:opacity-60"
                >
                  {emailSubmitting ? "Saving…" : "Get My Recommendations →"}
                </button>
              </form>
              <button
                onClick={() => setStep(4)}
                className="mt-4 text-ivory/30 font-body text-sm hover:text-ivory/50 transition-colors"
              >
                Skip
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-gold/40 flex items-center justify-center">
                <span className="font-display text-2xl text-gold">✦</span>
              </div>
              <h2 className="font-display text-3xl text-ivory mb-4">
                {results.length === 1 ? "Your Deity" : "Your Recommended Deities"}
              </h2>
              <p className="text-ivory/40 font-body mb-12 max-w-lg mx-auto">
                {results.length === 1
                  ? "A perfect alignment between your inner need and elemental energy."
                  : "Your chakra and elemental signals point to multiple forms of sacred energy."
                }
              </p>

              <div className={`grid gap-8 mb-12 ${results.length === 1 ? "max-w-sm mx-auto" : results.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto" : "grid-cols-1 md:grid-cols-3"}`}>
                {results.map((deity, i) => (
                  <motion.div
                    key={deity.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="border border-gold/20 p-8 bg-charcoal-light/30"
                  >
                    <h3 className="font-display text-2xl text-gold mb-2">{deity.name}</h3>
                    <p className="font-display text-ivory/50 text-sm italic mb-3">{deity.tagline}</p>
                    <p className="font-display text-ivory/30 text-xs mb-4">{deity.mantra}</p>
                    <div className="space-y-1 text-xs font-body text-ivory/40">
                      <p>{deity.chakra}</p>
                      <p>{deity.element} Element</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="space-x-4">
                <Link
                  to={`/collection?chakra=${selectedChakra}${selectedElement ? `&element=${selectedElement}` : ''}`}
                  className="inline-block px-10 py-4 bg-gold text-charcoal font-display text-lg tracking-widest hover:bg-gold-light transition-all"
                >
                  {results.length === 1 ? "Find Your Murti" : "Find Murtis That Fit"}
                </Link>
                <button onClick={restart} className="text-ivory/30 font-body text-sm hover:text-ivory/50 transition-colors">
                  Retake
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
