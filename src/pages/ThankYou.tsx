import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="bg-charcoal min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-gold/30 flex items-center justify-center">
            <span className="font-display text-4xl text-gold">✦</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-ivory mb-4">Welcome to the Family.</h1>
          <p className="text-ivory/40 font-body max-w-lg mx-auto leading-relaxed">
            Your deity is currently being prepared for its journey to you. 
            Thank you for becoming part of the Divine Arts family.
          </p>
        </motion.div>

        {/* Founder Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="aspect-video bg-charcoal-light border border-ivory/10 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
            <div className="text-center z-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-gold/30 flex items-center justify-center">
                <span className="font-display text-3xl text-gold">▶</span>
              </div>
              <p className="text-ivory/60 font-display text-lg mb-2">A Personal Message from Our Founder</p>
              <p className="text-ivory/30 font-body text-sm max-w-md mx-auto">
                "Namaste. I want to personally thank you. You haven't just bought an object; 
                you've supported a lineage of artisans here in Haridwar."
              </p>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl text-ivory text-center mb-8">What Happens Next</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Quality Inspection",
                desc: "Your piece undergoes a final quality check by our team in Haridwar.",
              },
              {
                step: "2",
                title: "Secure Packing",
                desc: "Each deity is wrapped in protective layers and packed in a custom box to ensure safe transit.",
              },
              {
                step: "3",
                title: "Tracking & Delivery",
                desc: "You'll receive a tracking number via email. India: 5–7 days. International: 10–15 days.",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 bg-gold/5">
                  <span className="font-display text-gold text-lg">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-ivory text-lg mb-1">{item.title}</h3>
                  <p className="text-ivory/40 font-body text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border border-gold/20 bg-gold/5 p-8 md:p-10 text-center mb-12"
        >
          <h2 className="font-display text-2xl text-ivory mb-3">Join Our Private Community</h2>
          <p className="text-ivory/40 font-body text-sm mb-6 max-w-md mx-auto">
            Get care tips, placement guidance, behind-the-scenes from Haridwar, and connect 
            with other devotees who share your journey.
          </p>
          <button
            className="px-10 py-4 bg-gold text-charcoal font-display text-lg tracking-widest hover:bg-gold-light transition-all duration-500"
            onClick={() => window.open("#", "_blank")}
          >
            Join the Community
          </button>
        </motion.div>

        {/* Continue Shopping */}
        <div className="text-center">
          <Link
            to="/collection"
            className="text-ivory/40 font-body text-sm hover:text-gold transition-colors"
          >
            ← Continue Browsing the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
