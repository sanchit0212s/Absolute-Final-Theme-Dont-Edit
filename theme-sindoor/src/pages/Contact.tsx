import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Clock } from "lucide-react";
import LotusRule from "@/components/LotusRule";

type Topic = "order" | "consecration" | "vastu" | "general";

const topics: { key: Topic; label: string; desc: string }[] = [
  { key: "order", label: "Order & Shipping", desc: "Tracking, returns, delivery" },
  { key: "consecration", label: "Consecration", desc: "Shuddhi Poojan service" },
  { key: "vastu", label: "Vastu Guidance", desc: "Placement & deity selection" },
  { key: "general", label: "General", desc: "Anything else" },
];

export default function Contact() {
  const [topic, setTopic] = useState<Topic>("general");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="bg-ivory min-h-screen">
      {/* Saffron header */}
      <section className="bg-saffron pt-16">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <p className="overline-label text-white/60 mb-4">Reach Us</p>
          <h1
            className="font-display text-white font-light"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "0.95" }}
          >
            Contact Us
          </h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">

          {/* Form */}
          <div className="lg:col-span-2">
            {/* Topic tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {topics.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTopic(t.key)}
                  className={`p-4 border-2 text-left transition-all duration-200 ${
                    topic === t.key
                      ? "border-saffron bg-saffron/5"
                      : "border-sand/60 hover:border-saffron/50"
                  }`}
                >
                  <p className={`font-display text-base mb-1 ${topic === t.key ? "text-saffron" : "text-espresso"}`}>
                    {t.label}
                  </p>
                  <p className="font-body text-xs text-bark">{t.desc}</p>
                </button>
              ))}
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-saffron p-12 text-center"
              >
                <div className="w-14 h-14 bg-white flex items-center justify-center mx-auto mb-5">
                  <Check size={24} className="text-saffron" />
                </div>
                <h3 className="font-display text-3xl text-white mb-2">Message received</h3>
                <p className="font-body text-white/70">We'll respond within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-[10px] text-bark tracking-widest uppercase block mb-2">Name</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border-2 border-sand/60 bg-transparent text-espresso font-body px-4 py-3 placeholder-bark/40 focus:outline-none focus:border-saffron transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] text-bark tracking-widest uppercase block mb-2">Email</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border-2 border-sand/60 bg-transparent text-espresso font-body px-4 py-3 placeholder-bark/40 focus:outline-none focus:border-saffron transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-[10px] text-bark tracking-widest uppercase block mb-2">Message</label>
                  <textarea
                    required rows={6}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border-2 border-sand/60 bg-transparent text-espresso font-body px-4 py-3 placeholder-bark/40 focus:outline-none focus:border-saffron transition-colors resize-none"
                    placeholder={`Your ${topics.find(t => t.key === topic)?.label.toLowerCase()} enquiry...`}
                  />
                </div>
                <button type="submit" className="btn-saffron px-12">Send Message</button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <p className="overline-label text-saffron mb-6">Contact Details</p>
            <div className="space-y-5 mb-10">
              {[
                { icon: <Mail size={15} />, label: "contact@divinearts.store", sub: "Replies within 24 hours" },
                { icon: <MapPin size={15} />, label: "Jwalapur, Haridwar", sub: "Uttarakhand 249407, India" },
                { icon: <Clock size={15} />, label: "Mon–Sat, 9am–6pm IST", sub: "Closed on festival days" },
              ].map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 bg-saffron/10 flex items-center justify-center text-saffron flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="font-body text-sm text-espresso">{c.label}</p>
                    <p className="font-body text-xs text-bark">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <LotusRule className="mb-10" />

            <p className="overline-label text-saffron mb-6">Common Questions</p>
            <div className="space-y-6">
              {[
                { q: "How long does shipping take?", a: "Within India: 5–8 days. International: 10–18 days. Each piece is individually packed and fully insured." },
                { q: "Can I return a murti?", a: "Yes, within 14 days for unconsecrated pieces. Consecrated murtis cannot be returned once shipped." },
                { q: "Are custom commissions possible?", a: "Yes. Contact us directly — typical timeline is 8–12 weeks. Custom sizes and deities available." },
                { q: "What is Shuddhi Poojan?", a: "Full Vedic consecration (Prana Pratishtha) by our resident pandit before shipping. Includes a certificate." },
              ].map((faq, i) => (
                <div key={i} className="border-l-2 border-saffron pl-4">
                  <p className="font-display text-base text-espresso mb-1.5">{faq.q}</p>
                  <p className="font-body text-xs text-bark leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
