"use client";

import { motion } from "framer-motion";
import { GemSparkle } from "@/components/ui/gem-sparkle";

const pillars = [
  {
    title: "Exceptional Beauty",
    description:
      "Our lab-grown diamonds achieve D-F color and VVS clarity as standard. Every stone is selected by our gemologists for fire, brilliance, and scintillation.",
  },
  {
    title: "Modern Transparency",
    description:
      "Full certificate traceability on every diamond. Know exactly what you're buying — grade, origin, and independent lab verification.",
  },
  {
    title: "Timeless Craftsmanship",
    description:
      "Each piece is handcrafted by our master jewelers using platinum and 18k gold. Precision setting techniques perfected over generations.",
  },
];

// Full round-brilliant diamond SVG for brand visual
function BrandDiamond() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full" aria-hidden="true">
      <defs>
        <filter id="bdGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="bdStrongGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bdTable" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F6F1E8" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#C6A878" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C6A878" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer octagon */}
      <polygon
        points="100,8 157,28 192,85 192,115 157,172 100,192 43,172 8,115 8,85 43,28"
        stroke="#C6A878" strokeWidth="0.6" fill="none" opacity="0.5" filter="url(#bdGlow)"
      />
      {/* Inner table */}
      <polygon
        points="100,42 128,58 142,88 142,112 128,142 100,158 72,142 58,112 58,88 72,58"
        stroke="#C6A878" strokeWidth="0.5" fill="url(#bdTable)" opacity="0.8"
      />
      {/* Bezel facets */}
      {[
        "100,8 157,28 128,58 100,42 72,58 43,28",
        "157,28 192,85 142,88 128,58",
        "192,85 192,115 142,112 142,88",
        "192,115 157,172 128,142 142,112",
        "157,172 100,192 100,158 128,142",
        "100,192 43,172 72,142 100,158",
        "43,172 8,115 58,112 72,142",
        "8,115 8,85 58,88 58,112",
        "8,85 43,28 72,58 58,88",
      ].map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          stroke="#C6A878"
          strokeWidth="0.35"
          fill={i % 2 === 0 ? "rgba(198,168,120,0.07)" : "rgba(246,241,232,0.04)"}
          opacity="0.7"
        />
      ))}
      {/* Star facets */}
      {[
        "100,42 128,58 100,75", "128,58 142,88 120,88",
        "142,88 142,112 125,100", "142,112 128,142 120,112",
        "128,142 100,158 100,125", "100,158 72,142 80,112",
        "72,142 58,112 75,100", "58,112 58,88 80,88",
        "58,88 72,58 80,75", "72,58 100,42 100,75",
      ].map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          stroke="#C6A878"
          strokeWidth="0.25"
          fill={i % 2 === 0 ? "rgba(198,168,120,0.05)" : "rgba(246,241,232,0.03)"}
          opacity="0.6"
        />
      ))}
      {/* Cross lines */}
      <line x1="8" y1="100" x2="192" y2="100" stroke="#C6A878" strokeWidth="0.3" opacity="0.25" />
      <line x1="100" y1="8" x2="100" y2="192" stroke="#C6A878" strokeWidth="0.3" opacity="0.25" />
      <line x1="43" y1="28" x2="157" y2="172" stroke="#C6A878" strokeWidth="0.2" opacity="0.15" />
      <line x1="157" y1="28" x2="43" y2="172" stroke="#C6A878" strokeWidth="0.2" opacity="0.15" />

      {/* Vertex glints */}
      {[[100,8],[157,28],[192,85],[192,115],[157,172],[100,192],[43,172],[8,115],[8,85],[43,28]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="#F6F1E8" opacity="0.7" filter="url(#bdGlow)" />
      ))}
      {/* Center table glow */}
      <circle cx="100" cy="100" r="22" fill="rgba(198,168,120,0.12)" filter="url(#bdStrongGlow)" />
      <circle cx="100" cy="100" r="6" fill="#C6A878" opacity="0.4" filter="url(#bdStrongGlow)" />
    </svg>
  );
}

// Animated light ray
function LightRay({ angle, delay }: { angle: number; delay: number }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 origin-bottom"
      style={{
        width: "1px",
        height: "45%",
        background: "linear-gradient(to top, rgba(198,168,120,0.5), transparent)",
        transform: `translateX(-50%) rotate(${angle}deg)`,
        transformOrigin: "bottom center",
      }}
      animate={{ opacity: [0, 0.8, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

type BrandStorySectionProps = {
  diamondCount: number;
};

export function BrandStorySection({ diamondCount }: BrandStorySectionProps) {
  return (
    <section className="py-28 bg-[#080809] relative overflow-hidden">
      {/* Section facet background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='50,5 95,50 50,95 5,50' stroke='%23C6A878' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Diagonal gold accent line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C6A878]/10 to-transparent"
        style={{ left: "62%" }}
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main visual block */}
            <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a1410] via-[#0F0F12] to-[#0D0D0F] border border-[#2A2A30] overflow-hidden">
              {/* Fine grid */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #C6A878 1px, transparent 1px), linear-gradient(to bottom, #C6A878 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Ambient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,168,120,0.08)_0%,transparent_65%)]" />

              {/* Centered diamond with light rays */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Light rays */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <LightRay key={angle} angle={angle} delay={i * 0.35} />
                ))}

                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                  className="absolute w-56 h-56 border border-[#C6A878]/15 rounded-full"
                  style={{ borderStyle: "dashed" }}
                />

                {/* Mid ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute w-44 h-44 border border-[#C6A878]/10"
                  style={{ transform: "rotate(45deg)" }}
                />

                {/* Main diamond */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                  className="w-44 h-44 relative z-10"
                >
                  <BrandDiamond />
                </motion.div>

                {/* Pulsing glow behind diamond */}
                <motion.div
                  className="absolute w-32 h-32 rounded-full bg-[#C6A878]/10"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "blur(20px)" }}
                />

                {/* Sparkles around diamond */}
                <div className="absolute" style={{ top: "12%", left: "20%" }}>
                  <GemSparkle size={10} delay={0} duration={1.6} repeatDelay={3} color="#C6A878" className="relative" />
                </div>
                <div className="absolute" style={{ top: "15%", right: "18%" }}>
                  <GemSparkle size={8} delay={1.2} duration={1.4} repeatDelay={4} color="#F6F1E8" className="relative" />
                </div>
                <div className="absolute" style={{ bottom: "18%", left: "16%" }}>
                  <GemSparkle size={7} delay={0.8} duration={1.8} repeatDelay={3.5} color="#C6A878" className="relative" />
                </div>
                <div className="absolute" style={{ bottom: "14%", right: "22%" }}>
                  <GemSparkle size={9} delay={2} duration={1.5} repeatDelay={4.5} color="#F6F1E8" className="relative" />
                </div>
              </div>

              {/* Stats overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#080809] via-[#080809]/80 to-transparent p-6 pt-16">
                <div className="flex items-end justify-between">
                  <div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="font-display text-3xl font-light text-[#C6A878]"
                    >
                      {diamondCount}
                    </motion.p>
                    <p className="text-[9px] tracking-[0.2em] text-[#8A8F98] uppercase mt-0.5">Certified Diamonds</p>
                  </div>
                  <div className="text-right">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="font-display text-3xl font-light text-[#C6A878]"
                    >
                      GIA
                    </motion.p>
                    <p className="text-[9px] tracking-[0.2em] text-[#8A8F98] uppercase mt-0.5">Certified · IGI</p>
                  </div>
                </div>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[#C6A878]/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-[#C6A878]/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-[#C6A878]/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-[#C6A878]/50" />

              {/* Prismatic accent */}
              <motion.div
                className="absolute top-0 bottom-0 w-[2px] opacity-20"
                style={{
                  left: "30%",
                  background: "linear-gradient(to bottom, transparent, #C6A878, #D9DDE3, transparent)",
                  filter: "blur(1px)",
                }}
                animate={{ opacity: [0, 0.25, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-[#0B0B0D] border border-[#C6A878]/40 p-6 shadow-2xl overflow-hidden"
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A878]/8 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              />
              <p className="font-display text-4xl font-light text-[#C6A878] relative">99.8%</p>
              <p className="text-[10px] tracking-[0.2em] text-[#8A8F98] uppercase mt-1 relative">
                Customer satisfaction
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-6">
              Our Philosophy
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-[#F6F1E8] leading-tight mb-6">
              The future of fine
              <br />
              jewelry is{" "}
              <em className="not-italic text-[#C6A878]">brilliant</em>
            </h2>
            <p className="text-[#8A8F98] font-light leading-relaxed mb-8">
              LUX GEM was founded on a conviction: that exceptional diamonds should
              not come at the cost of the planet. Lab-grown diamonds are
              chemically, physically, and optically identical to mined diamonds —
              and we source only the finest examples, graded to the world&apos;s
              strictest standards.
            </p>
            <p className="text-[#8A8F98] font-light leading-relaxed mb-12">
              Our craftspeople combine generations of Thai goldsmithing heritage
              with cutting-edge precision tools to produce jewelry that transcends
              the ordinary.
            </p>

            {/* Pillars */}
            <div className="space-y-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 group"
                >
                  {/* Animated vertical bar */}
                  <div className="relative shrink-0 mt-1 w-px self-stretch">
                    <div className="absolute inset-0 bg-[#2A2A30]" />
                    <motion.div
                      className="absolute top-0 left-0 right-0 bg-[#C6A878]"
                      initial={{ height: "0%" }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {/* Mini diamond marker */}
                      <div className="w-1.5 h-1.5 rotate-45 bg-[#C6A878]/60 group-hover:bg-[#C6A878] transition-colors duration-300" />
                      <h4 className="text-sm font-light text-[#F6F1E8] tracking-wide">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#8A8F98] font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
