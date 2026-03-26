import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageCircle, Phone, Mail } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="label-brass mb-4">Contact</p>
          <h1 className="font-display text-big text-ink tracking-tight mb-6">
            Talk to us.
          </h1>
          <div className="w-12 h-px bg-brass mb-10" />
        </motion.div>

        {/* Primary: WhatsApp */}
        <div className="bg-gallery p-8 mb-10">
          <p className="font-display text-lg text-ink tracking-tight mb-2">The fastest way</p>
          <p className="font-body text-sm text-graphite mb-5">
            Most of our customers reach us on WhatsApp. Replies within minutes during
            business hours.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20question"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={14} /> Open WhatsApp Chat
          </a>
        </div>

        {/* Or: form */}
        <p className="label mb-6">Or send a message</p>

        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-gallery py-16 text-center">
            <div className="w-10 h-10 border border-brass text-brass flex items-center justify-center mx-auto mb-4">
              <Check size={18} />
            </div>
            <p className="font-display text-xl text-ink mb-1">Received.</p>
            <p className="font-body text-sm text-graphite">We'll respond within 24 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5 mb-16">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="label block mb-2">Name</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border-b border-gallery bg-transparent text-ink font-body py-3 focus:outline-none focus:border-brass transition-colors" placeholder="Your name" />
              </div>
              <div>
                <label className="label block mb-2">Email</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border-b border-gallery bg-transparent text-ink font-body py-3 focus:outline-none focus:border-brass transition-colors" placeholder="your@email" />
              </div>
            </div>
            <div>
              <label className="label block mb-2">Message</label>
              <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full border-b border-gallery bg-transparent text-ink font-body py-3 focus:outline-none focus:border-brass transition-colors resize-none" placeholder="What do you need?" />
            </div>
            <button type="submit" className="btn-black">Send</button>
          </form>
        )}

        {/* Details */}
        <div className="border-t border-gallery pt-10 grid md:grid-cols-3 gap-8">
          <div className="flex items-start gap-3">
            <Mail size={14} className="text-brass mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-display text-sm text-ink">Email</p>
              <p className="font-body text-xs text-graphite">contact@divinearts.store</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={14} className="text-brass mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-display text-sm text-ink">Phone</p>
              <p className="font-body text-xs text-graphite">+91 98765 43210</p>
            </div>
          </div>
          <div>
            <p className="font-display text-sm text-ink">Workshop</p>
            <p className="font-body text-xs text-graphite">Jwalapur, Haridwar<br/>Uttarakhand 249407</p>
          </div>
        </div>
      </div>
    </div>
  );
}
