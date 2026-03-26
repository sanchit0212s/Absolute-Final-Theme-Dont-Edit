import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function Connect() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div className="min-h-screen pt-[72px]">

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="overline-clay mb-3">Contact</p>
          <h1 className="text-hero text-ink leading-none mb-5">
            Get in touch.
          </h1>
          <div className="editorial-line" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">

          {/* Form — 7 cols */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-ash py-16 text-center"
              >
                <div className="w-12 h-12 border border-clay text-clay flex items-center justify-center mx-auto mb-5">
                  <Check size={20} />
                </div>
                <h3 className="font-display text-2xl text-ink mb-2">Message sent.</h3>
                <p className="font-body text-sm text-smoke">We typically respond within one working day.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="overline block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border-b border-ash bg-transparent text-ink font-body py-3 focus:outline-none focus:border-clay transition-colors placeholder-smoke/40"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="overline block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border-b border-ash bg-transparent text-ink font-body py-3 focus:outline-none focus:border-clay transition-colors placeholder-smoke/40"
                      placeholder="your@email"
                    />
                  </div>
                </div>

                <div>
                  <label className="overline block mb-2">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full border-b border-ash bg-transparent text-ink font-body py-3 focus:outline-none focus:border-clay transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Choose a topic</option>
                    <option value="order">Order & shipping</option>
                    <option value="custom">Custom commission</option>
                    <option value="gift">Gift & housewarming enquiry</option>
                    <option value="consecration">Consecration service</option>
                    <option value="general">General enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="overline block mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border-b border-ash bg-transparent text-ink font-body py-3 focus:outline-none focus:border-clay transition-colors resize-none placeholder-smoke/40"
                    placeholder="Tell us what you need"
                  />
                </div>

                <button type="submit" className="btn-clay mt-2">
                  Send Message <ArrowRight size={12} />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar — 5 cols */}
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="overline mb-5">Details</p>
            <div className="space-y-5 mb-10">
              <div>
                <p className="font-body text-sm text-ink mb-0.5">Email</p>
                <p className="font-body text-sm text-smoke">contact@divinearts.store</p>
              </div>
              <div>
                <p className="font-body text-sm text-ink mb-0.5">Workshop</p>
                <p className="font-body text-sm text-smoke">Jwalapur, Haridwar<br />Uttarakhand 249407, India</p>
              </div>
              <div>
                <p className="font-body text-sm text-ink mb-0.5">Hours</p>
                <p className="font-body text-sm text-smoke">Mon–Sat, 9am–6pm IST</p>
              </div>
            </div>

            <div className="editorial-line mb-8" />

            <p className="overline mb-5">Common questions</p>
            <div className="space-y-5">
              {[
                { q: "How long does shipping take?", a: "India: 5–8 days. International: 10–18 days. Fully insured." },
                { q: "Can I return a piece?", a: "Within 14 days for standard pieces. Consecrated items cannot be returned." },
                { q: "Do you do custom commissions?", a: "Yes — 8–12 week timeline. Custom sizes and designs available." },
                { q: "What about gift wrapping?", a: "Every piece ships in premium packaging suitable for gifting." },
              ].map((faq) => (
                <div key={faq.q}>
                  <p className="font-display text-base text-ink mb-1">{faq.q}</p>
                  <p className="font-body text-xs text-smoke leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
