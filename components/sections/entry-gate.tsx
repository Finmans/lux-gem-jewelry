"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GemSparkle } from "@/components/ui/gem-sparkle";

const paths = [
  {
    id: "collections",
    label: "01",
    title: "Shop Collections",
    titleTH: "เลือกจากคอลเลกชัน",
    description:
      "Browse our curated jewelry collections — from solitaire engagement rings to high jewelry masterworks. Find the design that speaks to you.",
    cta: "Explore Collections",
    href: "/collections",
    accent: "#C6A878",
    gradient: "from-[#C6A878]/12 via-[#C6A878]/4 to-transparent",
    border: "border-[#C6A878]/30",
    hoverBorder: "hover:border-[#C6A878]/70",
    sparkleColor: "#C6A878",
    bgPattern: "rgba(198,168,120,0.03)",
  },
  {
    id: "diamonds",
    label: "02",
    title: "Search Diamond Stock",
    titleTH: "เลือกเพชรจากสต็อก",
    description:
      "Browse our certified lab diamonds by shape, carat, color, clarity, and cut. Select your perfect stone and build around it.",
    cta: "Search Diamonds",
    href: "/diamonds",
    accent: "#D9DDE3",
    gradient: "from-[#D9DDE3]/10 via-[#D9DDE3]/3 to-transparent",
    border: "border-[#D9DDE3]/20",
    hoverBorder: "hover:border-[#D9DDE3]/50",
    sparkleColor: "#D9DDE3",
    bgPattern: "rgba(217,221,227,0.02)",
  },
  {
    id: "build",
    label: "03",
    title: "Build Your Ring",
    titleTH: "ประกอบแหวนด้วยตัวเอง",
    description:
      "Choose your diamond. Choose your setting. See your ring in a 3D real-time preview before it's crafted by hand just for you.",
    cta: "Start Building",
    href: "/build",
    accent: "#8A8F98",
    gradient: "from-[#8A8F98]/10 via-[#8A8F98]/3 to-transparent",
    border: "border-[#8A8F98]/20",
    hoverBorder: "hover:border-[#8A8F98]/50",
    sparkleColor: "#F6F1E8",
    bgPattern: "rgba(138,143,152,0.02)",
  },
];

// Mini diamond facet decoration
function FacetDecor({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 opacity-40" aria-hidden="true">
      <polygon points="20,2 38,20 20,38 2,20" stroke={color} strokeWidth="0.6" fill="none" />
      <polygon points="20,8 32,20 20,32 8,20" stroke={color} strokeWidth="0.4" fill="none" />
      <line x1="2" y1="20" x2="38" y2="20" stroke={color} strokeWidth="0.3" />
      <line x1="20" y1="2" x2="20" y2="38" stroke={color} strokeWidth="0.3" />
      <line x1="6" y1="6" x2="34" y2="34" stroke={color} strokeWidth="0.2" />
      <line x1="34" y1="6" x2="6" y2="34" stroke={color} strokeWidth="0.2" />
      <circle cx="20" cy="20" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

export function EntryGateSection() {
  return (
    <section className="py-24 bg-[#0B0B0D] relative overflow-hidden">
      {/* Section background facet pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='40,4 76,40 40,76 4,40' stroke='%23C6A878' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-4">
            How would you like to begin?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-[#F6F1E8]">
            Your journey starts here
          </h2>
        </motion.div>

        {/* Path cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                href={path.href}
                className={`group block h-full border ${path.border} ${path.hoverBorder} bg-gradient-to-br ${path.gradient} transition-all duration-500 p-8 relative overflow-hidden`}
              >
                {/* Animated radial glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${path.accent}15 0%, transparent 65%)`,
                  }}
                />

                {/* Facet pattern bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    backgroundImage: `radial-gradient(circle at 70% 20%, ${path.bgPattern} 0%, transparent 60%)`,
                  }}
                />

                {/* Corner diamond decor */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                  <FacetDecor color={path.accent} />
                </div>

                {/* Sparkle on hover */}
                <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <GemSparkle size={12} delay={0} duration={1.4} repeatDelay={2} color={path.sparkleColor} className="relative" />
                </div>

                {/* Number */}
                <p className="font-display text-6xl font-light text-[#2A2A30] group-hover:text-[#C6A878]/15 transition-colors duration-500 mb-6 leading-none">
                  {path.label}
                </p>

                {/* Title */}
                <h3 className="font-display text-2xl font-light text-[#F6F1E8] mb-1 leading-tight">
                  {path.title}
                </h3>
                <p className="text-xs tracking-[0.15em] text-[#8A8F98] mb-5">
                  {path.titleTH}
                </p>

                {/* Description */}
                <p className="text-sm text-[#8A8F98] leading-relaxed font-light mb-8">
                  {path.description}
                </p>

                {/* Diamond divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-[#1A1A1E] group-hover:bg-[#C6A878]/20 transition-colors duration-500" />
                  <div className="w-1.5 h-1.5 rotate-45 border border-[#C6A878]/30 group-hover:border-[#C6A878]/60 group-hover:bg-[#C6A878]/20 transition-all duration-300" />
                  <div className="flex-1 h-px bg-[#1A1A1E] group-hover:bg-[#C6A878]/20 transition-colors duration-500" />
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-300"
                  style={{ color: path.accent }}
                >
                  {path.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>

                {/* Bottom light sweep */}
                <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ background: `linear-gradient(to right, transparent, ${path.accent}60, transparent)` }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 + i, ease: "easeInOut" }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
