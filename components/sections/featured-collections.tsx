"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GemSparkle } from "@/components/ui/gem-sparkle";
import type { CollectionCard } from "@/lib/site-data";

// Animated diamond mark
function DiamondMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <defs>
        <filter id="dmGlow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {/* Outer diamond */}
      <polygon points="40,2 78,40 40,78 2,40" stroke="#C6A878" strokeWidth="0.6" fill="none" opacity="0.5" filter="url(#dmGlow)" />
      {/* Inner diamond */}
      <polygon points="40,18 62,40 40,62 18,40" stroke="#C6A878" strokeWidth="0.5" fill="rgba(198,168,120,0.06)" opacity="0.7" />
      {/* Table octagon */}
      <polygon points="49,26 54,40 49,54 40,58 31,54 26,40 31,26 40,22"
        stroke="#C6A878" strokeWidth="0.4" fill="rgba(198,168,120,0.08)" opacity="0.9" />
      {/* Facet lines */}
      <line x1="2" y1="40" x2="78" y2="40" stroke="#C6A878" strokeWidth="0.3" opacity="0.3" />
      <line x1="40" y1="2" x2="40" y2="78" stroke="#C6A878" strokeWidth="0.3" opacity="0.3" />
      <line x1="13" y1="13" x2="67" y2="67" stroke="#C6A878" strokeWidth="0.2" opacity="0.2" />
      <line x1="67" y1="13" x2="13" y2="67" stroke="#C6A878" strokeWidth="0.2" opacity="0.2" />
      {/* Vertex glints */}
      <circle cx="40" cy="2" r="1.5" fill="#F6F1E8" opacity="0.8" filter="url(#dmGlow)" />
      <circle cx="78" cy="40" r="1.5" fill="#F6F1E8" opacity="0.8" filter="url(#dmGlow)" />
      <circle cx="40" cy="78" r="1.5" fill="#F6F1E8" opacity="0.8" filter="url(#dmGlow)" />
      <circle cx="2"  cy="40" r="1.5" fill="#F6F1E8" opacity="0.8" filter="url(#dmGlow)" />
      {/* Center */}
      <circle cx="40" cy="40" r="2.5" fill="#C6A878" opacity="0.6" filter="url(#dmGlow)" />
    </svg>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type FeaturedCollectionsSectionProps = {
  collections: CollectionCard[];
};

export function FeaturedCollectionsSection({ collections }: FeaturedCollectionsSectionProps) {
  const featured = collections.slice(0, 6);

  return (
    <section className="py-28 bg-[#080809] relative overflow-hidden">
      {/* Section-wide diagonal light strip */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C6A878]/15 to-transparent"
        style={{ left: "30%" }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-4">
              Collections
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-[#F6F1E8]">
              Fine jewelry for
              <br />
              <em className="not-italic text-[#C6A878]">every chapter</em>
            </h2>
          </div>
          <Link
            href="/collections"
            className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#8A8F98] hover:text-[#C6A878] uppercase transition-colors group"
          >
            View All Collections
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {featured.map((col) => (
            <motion.div key={col.id} variants={item}>
              <Link
                href={`/collections/${col.slug}`}
                className="group block relative overflow-hidden border border-[#1A1A1E] hover:border-[#C6A878]/40 transition-all duration-500"
              >
                {/* Visual area */}
                <div className={`relative flex items-center justify-center bg-gradient-to-br ${col.gradient} h-56 overflow-hidden`}>
                  {/* Animated diamond */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="opacity-25 group-hover:opacity-50 transition-opacity duration-700"
                  >
                    <DiamondMark className="w-24 h-24" />
                  </motion.div>

                  {/* Counter-rotating inner */}
                  <motion.div
                    className="absolute"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <DiamondMark className="w-10 h-10 opacity-15 group-hover:opacity-30 transition-opacity duration-700" />
                  </motion.div>

                  {/* Sparkle on hover */}
                  <GemSparkle
                    size={18}
                    delay={0}
                    duration={1.5}
                    repeatDelay={2}
                    color="#F6F1E8"
                    className="top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <GemSparkle
                    size={10}
                    delay={0.8}
                    duration={1.2}
                    repeatDelay={2.5}
                    color="#C6A878"
                    className="bottom-5 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Light sweep */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#F6F1E8]/12 to-transparent skew-x-[-12deg]"
                    />
                  </div>

                  {/* Corner lines */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[#C6A878]/30 group-hover:border-[#C6A878]/60 transition-colors duration-500" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#C6A878]/30 group-hover:border-[#C6A878]/60 transition-colors duration-500" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#C6A878]/30 group-hover:border-[#C6A878]/60 transition-colors duration-500" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[#C6A878]/30 group-hover:border-[#C6A878]/60 transition-colors duration-500" />
                </div>

                {/* Info */}
                <div className="p-6 bg-[#0D0D10] relative overflow-hidden">
                  {/* Subtle shimmer on bg */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-[#C6A878]/3 to-transparent" />

                  <div className="relative">
                    <h3 className="font-display text-xl font-light text-[#F6F1E8] group-hover:text-[#C6A878] transition-colors duration-300">
                      {col.name}
                    </h3>
                    <p className="text-[9px] tracking-[0.2em] text-[#8A8F98] mt-0.5 mb-3 uppercase">
                      {col.nameTH}
                    </p>
                    <p className="text-xs text-[#8A8F98] font-light leading-relaxed line-clamp-2">
                      {col.description}
                    </p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#1A1A1E] group-hover:border-[#C6A878]/15 transition-colors duration-500">
                      <div>
                        <p className="text-[9px] text-[#8A8F98]/60 tracking-wider uppercase">From</p>
                        <p className="text-sm text-[#C6A878] font-light">
                          ฿{col.startingPriceTHB.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] text-[#8A8F98] uppercase">
                        <div className="w-1 h-1 rotate-45 bg-[#C6A878]/40" />
                        {col.pieceCount} pieces
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
