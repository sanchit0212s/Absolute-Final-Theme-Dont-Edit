import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import OrnamentalDivider from "@/components/OrnamentalDivider";

const topics = [
  "General Inquiry",
  "Order Status",
  "Vastu Consultation",
  "Consecration Details",
  "Bulk / Corporate",
  "Other",
];

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard delivery within India takes 5–7 business days. International shipping typically takes 10–14 business days. All pieces are carefully packed with ritual-grade wrapping.",
  },
  {
    q: "Can I return a murti?",
    a: "We accept returns within 14 days of delivery if the piece arrives damaged. Consecrated murtis cannot be returned as the ritual is irreversible. Please contact us for any concerns.",
  },
  {
    q: "What does consecration include?",
    a: "Our Shuddhi Poojan includes full Prana Pratishtha ceremony by our resident pandit, purification with Pancha Amrit, deity-specific mantras, and a handwritten certificate with the ritual date.",
  },
  {
    q: "Are the murtis really solid brass?",
    a: "Yes — 100% solid brass, no hollow castings, no alloy substitutes. You can feel the weight and quality the moment you hold one.",
  },
];

export default function Contact() {
  const [topic, setTopic] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <section className="section-b border-b border-border py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label mb-2">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl text-on-surface font-light mb-3">
            Contact Us
          </h1>
          <p className="font-body text-sm text-on-surface-faint max-w-md mx-auto">
            Questions about placement, consecration, or your order?
            We are here to help.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-14">

          {/* Left — Contact info */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <p className="section-label mb-4">Reach Us</p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "namaste@divinearts.store" },
                    { icon: Phone, label: "WhatsApp", value: "+91 98765 43210" },
                    { icon: MapPin, label: "Origin", value: "Haridwar, Uttarakhand, India" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={16} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-body text-[10px] tracking-wider uppercase text-on-surface-faint">{item.label}</p>
                        <p className="font-body text-sm text-on-surface">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust points */}
              <div className="card-warm p-6">
                <p className="font-display text-base text-on-surface mb-3">Our Promise</p>
                <ul className="space-y-2">
                  {[
                    "Response within 24 hours",
                    "Free Vastu consultation on all orders",
                    "Dedicated support for consecration queries",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="font-body text-sm text-on-surface-faint">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="card-warm p-8">
              <h2 className="font-display text-xl text-on-surface mb-6">Send us a message</h2>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                {/* Topic selector */}
                <div>
                  <label className="font-body text-xs text-on-surface-faint tracking-wider uppercase block mb-2">
                    Topic
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={topic === t ? "filter-chip-active" : "filter-chip"}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="font-body text-xs text-on-surface-faint tracking-wider uppercase block mb-2 transition-colors">Name</label>
                    <input
                      type="text"
                      className="input-sacred w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-faint focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="input-group">
                    <label className="font-body text-xs text-on-surface-faint tracking-wider uppercase block mb-2 transition-colors">Email</label>
                    <input
                      type="email"
                      className="input-sacred w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-faint focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label className="font-body text-xs text-on-surface-faint tracking-wider uppercase block mb-2 transition-colors">Message</label>
                  <textarea
                    rows={5}
                    className="input-sacred w-full bg-surface border border-border rounded-lg px-4 py-3 font-body text-sm text-on-surface placeholder:text-on-surface-faint focus:outline-none resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <button type="submit" className="btn-primary">
                  <Send size={14} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20">
          <OrnamentalDivider label="Frequently Asked" className="mb-10" />

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-warm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display text-base text-on-surface pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-on-surface-faint flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="font-body text-sm text-on-surface-faint leading-relaxed">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
