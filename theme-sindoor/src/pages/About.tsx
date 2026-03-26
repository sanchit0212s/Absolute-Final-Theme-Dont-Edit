import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LotusRule from "@/components/LotusRule";

export default function About() {
  return (
    <div className="bg-ivory min-h-screen">

      {/* Saffron hero */}
      <section className="bg-saffron pt-16">
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-end">
            <div>
              <p className="overline-label text-white/60 mb-6">Our Story</p>
              <h1
                className="font-display text-white font-light"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: "0.95" }}
              >
                Cast with<br />
                intention.<br />
                Since 1987.
              </h1>
            </div>
            <div>
              <LotusRule color="white" className="mb-8" />
              <p className="font-body text-white/70 leading-relaxed">
                Divine Arts began as three artisans, one kiln, and a single conviction —
                that the Dhokra tradition was worth preserving not as museum craft, but as
                living, devotional practice. Thirty-seven years later, that conviction is
                still the only thing that matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full bleed image */}
      <div className="h-72 md:h-96 bg-cream overflow-hidden">
        <img
          src="https://picsum.photos/seed/haridwar-ganga/1400/400"
          alt="Haridwar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* The craft — large editorial layout */}
      <section className="py-24 bg-ivory">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Giant section number */}
            <div className="lg:col-span-2 flex items-start justify-end">
              <span className="section-num leading-none">01</span>
            </div>
            <div className="lg:col-span-5">
              <p className="overline-label text-saffron mb-4">The Dhokra Method</p>
              <h2 className="font-display text-4xl text-espresso font-light mb-6 leading-tight">
                Four thousand years of unbroken craft
              </h2>
              <p className="font-body text-mahogany leading-relaxed mb-4">
                The Dhokra lost-wax casting technique is the oldest known metal-casting method
                in continuous practice. A bronze dancing girl found at Mohenjo-Daro — circa 2500 BCE —
                was made using this exact process. Our artisans are the living continuation of that lineage.
              </p>
              <p className="font-body text-mahogany leading-relaxed mb-8">
                Each murti begins as beeswax, hand-sculpted into the desired form. The wax is encased
                in successive layers of clay and fired — the wax burns away, leaving a void. Molten brass
                at over 900°C is poured into that void. When the clay is broken, what emerges is unique.
                No two pieces are identical. Every Divine Arts murti is an original.
              </p>
              <Link to="/collection" className="btn-saffron inline-flex items-center gap-2">
                See the Collection <ArrowRight size={14} />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] bg-cream overflow-hidden">
                <img
                  src="https://picsum.photos/seed/wax-casting/600/750"
                  alt="Dhokra casting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full saffron band — pull quote */}
      <section className="bg-saffron py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p
            className="font-display text-white font-light italic"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: "1.2" }}
          >
            "We do not make decorative objects. We make forms that carry
            the intention of whoever commissioned them — and the devotion
            of whoever cast them."
          </p>
          <LotusRule color="white" className="mt-10 mb-6" />
          <p className="overline-label text-white/50 text-[10px]">Shri Ramesh Sharma · Founder</p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-2 flex items-start justify-end">
              <span className="section-num">02</span>
            </div>
            <div className="lg:col-span-10">
              <p className="overline-label text-saffron mb-4">What We Stand For</p>
              <h2 className="font-display text-4xl text-espresso font-light mb-14 leading-tight">
                Four commitments, non-negotiable
              </h2>
              <div className="grid md:grid-cols-2 gap-0 border-t border-sand/60">
                {[
                  { n: "01", title: "Handcrafted, always", body: "Every murti is individually lost-wax cast. We have never produced a machine-made or hollow form, and we never will." },
                  { n: "02", title: "Haridwar, not elsewhere", body: "Our workshop, our artisans, and our pandit are all based in Haridwar. We are not a curator — we are a producer." },
                  { n: "03", title: "Solid brass, no exceptions", body: "We use 100% solid brass in every form. Weight is the first thing you will notice when you hold one — it should feel substantial." },
                  { n: "04", title: "Consecrated before shipping", body: "Every murti receives Shuddhi Poojan from our resident pandit. We do not ship an unconsecrated form as sacred." },
                ].map((v, i) => (
                  <motion.div
                    key={v.n}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="py-10 pr-10 border-b md:even:border-l border-sand/60 even:pl-10 last:border-b-0 [&:nth-child(3)]:border-b-0"
                  >
                    <span className="font-body text-[11px] text-saffron tracking-widest font-medium block mb-4">{v.n}</span>
                    <h3 className="font-display text-2xl text-espresso mb-3 italic">{v.title}</h3>
                    <p className="font-body text-sm text-mahogany leading-relaxed">{v.body}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-ivory py-20 border-t border-sand/40">
        <div className="max-w-[1400px] mx-auto px-6">
          <LotusRule className="mb-12" />
          <p className="overline-label text-saffron mb-10">The People Behind Every Form</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Shri Ramesh Sharma", role: "Founder & Master Craftsman", years: "37 years" },
              { name: "Shri Gopal Vishwakarma", role: "Lead Caster", years: "24 years" },
              { name: "Pandit Suresh Tiwari", role: "Resident Pandit — Consecrations", years: "21 years" },
            ].map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 items-start border-t-4 border-saffron pt-6"
              >
                <div className="w-14 h-14 bg-cream overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/person-${i+10}/56/56`} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-display text-lg text-espresso leading-snug">{a.name}</p>
                  <p className="overline-label text-saffron text-[9px] mt-1 mb-2">{a.role}</p>
                  <p className="font-body text-xs text-bark">{a.years} with Divine Arts</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
