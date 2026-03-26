import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, MessageSquare, Package, HelpCircle, Flame } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

const topics = [
  { icon: Package, label: "Order & Shipping" },
  { icon: Flame, label: "Consecration Service" },
  { icon: HelpCircle, label: "Vastu Guidance" },
  { icon: MessageSquare, label: "General Enquiry" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-section-a min-h-screen">
      {/* Header */}
      <div className="bg-section-b border-b border-warm-tan/50 py-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="font-body text-xs tracking-[0.25em] text-saffron uppercase mb-2 small-caps"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-light text-espresso"
          >
            We're Here to Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif italic text-walnut text-sm mt-2 max-w-lg"
          >
            Questions about your order, Vastu guidance, or choosing the right deity for your space — we respond within one business day.
          </motion.p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-temple-gold/8 border border-temple-gold/30 p-10 text-center"
              >
                <div className="w-12 h-12 bg-temple-gold/15 border border-temple-gold/40 flex items-center justify-center mx-auto mb-4">
                  <span className="text-temple-gold text-lg">✓</span>
                </div>
                <h3 className="font-display text-2xl text-espresso mb-2">Message received.</h3>
                <p className="font-serif italic text-walnut text-sm max-w-sm mx-auto">
                  We'll respond within one business day. Thank you for reaching out.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-[10px] tracking-widest text-walnut uppercase mb-2 small-caps">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-antique-ivory/60 border border-warm-tan/70 font-body text-sm text-espresso placeholder:text-walnut/40 focus:outline-none focus:border-temple-gold/60 transition-colors"
                      placeholder="Priya Mehta"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-widest text-walnut uppercase mb-2 small-caps">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 bg-antique-ivory/60 border border-warm-tan/70 font-body text-sm text-espresso placeholder:text-walnut/40 focus:outline-none focus:border-temple-gold/60 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Topic selector */}
                <div>
                  <label className="block font-body text-[10px] tracking-widest text-walnut uppercase mb-3 small-caps">
                    What can we help with?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {topics.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setForm({ ...form, topic: label })}
                        className={`flex flex-col items-center gap-2 p-4 border font-body text-xs text-center transition-all duration-200 ${
                          form.topic === label
                            ? "border-temple-gold bg-temple-gold/8 text-temple-gold"
                            : "border-warm-tan/60 text-walnut hover:border-temple-gold/40 hover:text-mahogany"
                        }`}
                      >
                        <Icon size={16} strokeWidth={1.5} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[10px] tracking-widest text-walnut uppercase mb-2 small-caps">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-antique-ivory/60 border border-warm-tan/70 font-body text-sm text-espresso placeholder:text-walnut/40 focus:outline-none focus:border-temple-gold/60 transition-colors resize-none"
                    placeholder="Tell us about your enquiry — the more detail the better. If you're asking about Vastu, tell us the purpose and layout of the room."
                  />
                </div>

                <button type="submit" className="btn-gold w-full sm:w-auto px-10 py-4">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="space-y-6">
            {/* Contact details */}
            <div className="bg-section-b border border-warm-tan/60 p-6">
              <h3 className="font-display text-xl text-espresso mb-5">Contact Details</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Address", value: "Divine Arts Studio\nHaridwar, Uttarakhand 249401\nIndia" },
                  { icon: Mail, label: "Email", value: "hello@divinearts.store" },
                  { icon: Phone, label: "Phone (WhatsApp)", value: "+91 98765 43210" },
                  { icon: Clock, label: "Response Time", value: "Within 1 business day\nMon – Sat, 9am – 6pm IST" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-7 h-7 bg-temple-gold/10 border border-temple-gold/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={13} className="text-temple-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-body text-[10px] tracking-widest text-walnut/70 uppercase mb-0.5 small-caps">{label}</p>
                      <p className="font-body text-sm text-mahogany whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust signals */}
            <div className="bg-saffron/8 border border-saffron/25 p-6">
              <h3 className="font-display text-lg text-espresso mb-4">You Can Trust Us With</h3>
              <div className="space-y-3">
                {[
                  "Vastu placement guidance for your specific space",
                  "Choosing the right deity for your intention",
                  "Custom sizing and finish options",
                  "Consecration service scheduling",
                  "International shipping questions",
                  "Returns and exchanges",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-3.5 h-3.5 mt-0.5 bg-saffron/20 border border-saffron/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-saffron text-[8px]">✓</span>
                    </div>
                    <p className="font-body text-xs text-mahogany">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrnamentalDivider />

      {/* FAQ strip */}
      <div className="bg-section-b border-t border-warm-tan/40 py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <h2 className="font-display text-3xl text-espresso mb-8 text-center">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: "How long does shipping take?",
                a: "India: 10–14 days. International: 14–21 days. All orders include tracking from dispatch.",
              },
              {
                q: "What if I need help choosing a deity?",
                a: "Use our 2-minute guide — it matches you to the right sacred form based on chakra and element. Or write to us directly.",
              },
              {
                q: "Is the consecration service optional?",
                a: "Yes, but highly recommended for murtis intended for active puja use. It transforms a sacred object into a sacred presence.",
              },
              {
                q: "Do you offer returns?",
                a: "Yes — 30-day returns on all items in original condition. Consecration service is non-refundable once performed.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-parchment border border-warm-tan/60 p-5">
                <p className="font-display text-base text-espresso mb-2">{q}</p>
                <p className="font-body text-sm text-walnut leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
