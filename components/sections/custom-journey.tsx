"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GemSparkle } from "@/components/ui/gem-sparkle";

const steps = [
  {
    number: "01",
    title: "Choose Your Diamond",
    titleTH: "เลือกเพชร",
    description:
      "Browse our certified stock or let our gemologists source a diamond matched to your exact specifications. Shape, carat, color, clarity — every detail is yours to decide.",
    detail: "Live certified stock in current inventory",
    icon: "◈",
  },
  {
    number: "02",
    title: "Choose Your Setting",
    titleTH: "เลือกตัวเรือน",
    description:
      "Select from our signature settings or work with our designers to create a custom mount. Choose your metal, prong style, and any accent stones.",
    detail: "Platinum · 18k Gold · Rose Gold",
    icon: "⬡",
  },
  {
    number: "03",
    title: "Preview in 3D",
    titleTH: "ดูตัวอย่าง 3D",
    description:
      "See your ring come to life in a real-time 3D render before a single metal is cast. Adjust proportions, metals, and stones until it's perfect.",
    detail: "Real-time configuration",
    icon: "◯",
  },
];

// Animated connecting diamond node
function ConnectorNode({ active }: { active?: boolean }) {
  return (
    <motion.div
      className="relative w-3 h-3 shrink-0"
      animate={active ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div
        className="absolute inset-0 rotate-45 border border-[#C6A878]/60 bg-[#C6A878]/20"
      />
      {active && (
        <motion.div
          className="absolute inset-[-4px] rotate-45 border border-[#C6A878]/20"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export function CustomJourneySection() {
  return (
    <section className="py-28 bg-[#0B0B0D] overflow-hidden relative">
      {/* Facet tile background */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='45,5 85,45 45,85 5,45' stroke='%23C6A878' stroke-width='0.5' fill='none'/%3E%3Cpolygon points='45,20 70,45 45,70 20,45' stroke='%23C6A878' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "90px 90px",
        }}
      />

      {/* Vertical light accent */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C6A878]/12 to-transparent"
        style={{ left: "50%" }}
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-4">
            Build Your Ring
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-[#F6F1E8] mb-4">
            Design your dream ring
            <br />
            <em className="not-italic text-[#C6A878]">in three steps</em>
          </h2>
          <p className="text-sm text-[#8A8F98] font-light leading-relaxed">
            Our immersive ring builder puts you in the designer&apos;s seat.
            Create something truly one-of-a-kind — then watch it become real.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) — animated fill */}
          <div className="hidden lg:block absolute top-[42px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-[#1A1A1E] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C6A878]/60 via-[#C6A878] to-[#C6A878]/60"
              initial={{ x: "-100%" }}
              whileInView={{ x: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
            {/* Traveling dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C6A878]"
              animate={{ x: ["0%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 4px #C6A878)" }}
            />
          </div>

          {/* Connector diamonds (desktop) */}
          <div className="hidden lg:flex absolute top-[36px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] justify-between pointer-events-none">
            {[0, 1, 2].map((i) => (
              <ConnectorNode key={i} active={i === 1} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col"
              >
                {/* Step number with glyph */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-12 h-12 border border-[#C6A878]/50 flex items-center justify-center bg-[#0B0B0D] shrink-0 group overflow-hidden">
                    {/* Hover fill */}
                    <motion.div
                      className="absolute inset-0 bg-[#C6A878]/8"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="font-display text-lg font-light text-[#C6A878] relative z-10">
                      {i + 1}
                    </span>
                    {/* Animated corner accents */}
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t border-[#C6A878]/40" />
                    <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t border-[#C6A878]/40" />
                    <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b border-[#C6A878]/40" />
                    <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b border-[#C6A878]/40" />
                    {/* Connector dot */}
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#C6A878]/70 hidden lg:block" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] text-[#8A8F98]/50 uppercase font-mono">
                      {step.number}
                    </p>
                    <p className="text-lg text-[#C6A878]/40">{step.icon}</p>
                  </div>
                </div>

                {/* Content card */}
                <div className="flex-1 border border-[#1A1A1E] p-7 hover:border-[#C6A878]/30 transition-colors duration-500 group relative overflow-hidden">
                  {/* Hover radial glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(198,168,120,0.06)_0%,transparent_70%)]" />

                  {/* Sparkle on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <GemSparkle size={10} delay={0} duration={1.4} repeatDelay={2} color="#C6A878" className="relative" />
                  </div>

                  {/* Animated bottom border sweep */}
                  <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-transparent via-[#C6A878]/50 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 + i, ease: "easeInOut" }}
                    />
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-2xl font-light text-[#F6F1E8] mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-[10px] tracking-[0.2em] text-[#8A8F98] mb-4 uppercase">
                      {step.titleTH}
                    </p>

                    {/* Diamond divider */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 h-px bg-[#1A1A1E] group-hover:bg-[#C6A878]/20 transition-colors duration-500" />
                      <div className="w-1 h-1 rotate-45 bg-[#C6A878]/30" />
                      <div className="flex-1 h-px bg-[#1A1A1E] group-hover:bg-[#C6A878]/20 transition-colors duration-500" />
                    </div>

                    <p className="text-sm text-[#8A8F98] font-light leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] text-[#C6A878]/70 uppercase">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Link
            href="/build"
            className="relative inline-flex items-center gap-3 px-10 py-4 bg-[#C6A878] text-[#0B0B0D] text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-[#D9C4A0] transition-colors duration-300 group overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600" />
            Start Building Your Ring
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform relative" />
          </Link>
          <p className="text-xs text-[#8A8F98]/60 mt-4 font-light">
            Free consultation · No commitment required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
