import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Clock } from "lucide-react";
import CopperRule from "@/components/CopperRule";

type Topic = "order" | "consecration" | "vastu" | "general";

const topics: { key: Topic; label: string; description: string }[] = [
  { key: "order", label: "Order & Shipping", description: "Track an order, shipping queries, returns" },
  { key: "consecration", label: "Consecration", description: "Questions about the Shuddhi Poojan service" },
  { key: "vastu", label: "Vastu Consultation", description: "Placement guidance, deity selection" },
  { key: "general", label: "General Enquiry", description: "Anything else — we'll respond within 24 hours" },
];

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Within India: 5–8 business days. International: 10–18 business days. Each piece is packed individually with ritual care and insured for full value.",
  },
  {
    q: "What is the Shuddhi Poojan service?",
    a: "Our resident pandit performs Prana Pratishtha — a full Vedic consecration ceremony — specific to your deity, before your murti ships. A certificate is included.",
  },
  {
    q: "Can I return a murti?",
    a: "We accept returns within 14 days for non-consecrated pieces. Consecrated murtis cannot be returned once shipped — please reach out before ordering if you have concerns.",
  },
  {
    q: "Are custom sizes or deities available?",
    a: "Yes. For commissions outside our standard range, contact us directly. Timelines are typically 8–12 weeks.",
  },
];

export default function Contact() {
  const [topic, setTopic] = useState<Topic>("general");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-night min-h-screen">
      {/* Header */}
      <section className="border-b border-ember/40 bg-night-mid py-14">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="section-label mb-2">Get in Touch</p>
          <h1 className="font-display text-4xl text-ivory font-light">Contact Us</h1>
          <CopperRule className="mt-4 max-w-xs" />
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-14">

          {/* Form */}
          <div className="lg:col-span-2">
            {/* Topic selector */}
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {topics.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTopic(t.key)}
                  className={`p-4 border text-left transition-all duration-200 ${
                    topic === t.key
                      ? "border-copper/60 bg-copper/5"
                      : "border-ember/40 hover:border-copper/30 hover:bg-dusk/40"
                  }`}
                >
                  <p className={`font-display text-base mb-1 ${topic === t.key ? "text-copper" : "text-ivory/70"}`}>
                    {t.label}
                  </p>
                  <p className="font-body text-xs text-stone/50">{t.description}</p>
                </button>
              ))}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-copper/40 bg-copper/5 p-10 text-center"
              >
                <div className="w-12 h-12 border border-copper/60 flex items-center justify-center text-copper mx-auto mb-4">
                  <Check size={20} />
                </div>
                <h3 className="font-display text-2xl text-ivory mb-2">Message received</h3>
                <p className="font-body text-sm text-stone/60">
                  We'll respond within 24 hours — usually sooner.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-xs text-stone/50 tracking-wider uppercase mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-dusk border border-ember/60 text-ivory font-body text-sm px-4 py-3 placeholder-stone/30 focus:outline-none focus:border-copper/60 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs text-stone/50 tracking-wider uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-dusk border border-ember/60 text-ivory font-body text-sm px-4 py-3 placeholder-stone/30 focus:outline-none focus:border-copper/60 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-xs text-stone/50 tracking-wider uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-dusk border border-ember/60 text-ivory font-body text-sm px-4 py-3 placeholder-stone/30 focus:outline-none focus:border-copper/60 transition-colors resize-none"
                    placeholder={`Your ${topics.find(t => t.key === topic)?.label.toLowerCase()} enquiry...`}
                  />
                </div>
                <button type="submit" className="btn-copper px-10">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <p className="section-label mb-4">Contact Details</p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Mail size={16} className="text-copper flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm text-ivory/70">contact@divinearts.store</p>
                    <p className="font-body text-xs text-stone/40">Replies within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin size={16} className="text-copper flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm text-ivory/70">Jwalapur, Haridwar</p>
                    <p className="font-body text-xs text-stone/40">Uttarakhand 249407, India</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={16} className="text-copper flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body text-sm text-ivory/70">Mon–Sat, 9am–6pm IST</p>
                    <p className="font-body text-xs text-stone/40">Closed on major festival days</p>
                  </div>
                </div>
              </div>
            </div>

            <CopperRule />

            {/* FAQs */}
            <div>
              <p className="section-label mb-4">Common Questions</p>
              <div className="space-y-5">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <p className="font-display text-base text-ivory mb-2">{faq.q}</p>
                    <p className="font-body text-xs text-stone/60 leading-relaxed">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
