"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import type { DiamondRecord } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const shapeIcons: Record<string, string> = {
  Round: "◯", Oval: "⬭", Cushion: "▣", Emerald: "▬",
  Princess: "◻", Pear: "⊙", Radiant: "◈", Marquise: "◇",
  Heart: "♡", Asscher: "⊠",
};

const colorBadge = (color: string) => {
  const map: Record<string, string> = {
    D: "text-[#F6F1E8] border-[#F6F1E8]/40",
    E: "text-[#F0EBE0] border-[#F0EBE0]/30",
    F: "text-[#EAE3D5] border-[#EAE3D5]/30",
    G: "text-[#E4DAC8] border-[#E4DAC8]/30",
  };
  return map[color] ?? "text-[#8A8F98] border-[#8A8F98]/30";
};

const clarityColor = (clarity: string) => {
  if (["IF", "VVS1"].includes(clarity)) return "text-[#C6A878]";
  if (["VVS2", "VS1"].includes(clarity)) return "text-[#D9DDE3]";
  return "text-[#8A8F98]";
};

// Animated facet icon per shape
function ShapeGlyph({ shape }: { shape: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-0.5"
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="text-xl text-[#C6A878]/80 leading-none" style={{ textShadow: "0 0 8px rgba(198,168,120,0.4)" }}>
        {shapeIcons[shape] ?? "◇"}
      </span>
      <span className="text-[8px] text-[#8A8F98]/50 tracking-wider">{shape}</span>
    </motion.div>
  );
}

// Animated carat dot indicator
function CaratBar({ carat }: { carat: number }) {
  const pct = Math.min((carat / 4) * 100, 100);
  return (
    <div className="hidden lg:flex items-center gap-2">
      <div className="w-12 h-px bg-[#1A1A1E] relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#C6A878]/60"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs text-[#F6F1E8] font-light tabular-nums">{carat}</span>
    </div>
  );
}

type DiamondStockPreviewSectionProps = {
  diamonds: DiamondRecord[];
};

export function DiamondStockPreviewSection({ diamonds }: DiamondStockPreviewSectionProps) {
  const preview = diamonds.slice(0, 6);

  return (
    <section className="py-28 bg-[#0B0B0D] relative overflow-hidden">

      {/* Facet grid background */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='60,4 116,60 60,116 4,60' stroke='%23C6A878' stroke-width='0.5' fill='none'/%3E%3Cpolygon points='60,22 98,60 60,98 22,60' stroke='%23C6A878' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Vertical light column */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C6A878]/20 to-transparent"
        style={{ left: "8%" }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
              Diamond Stock
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-[#F6F1E8]">
              Select your
              <br />
              <em className="not-italic text-[#C6A878]">perfect stone</em>
            </h2>
            <p className="mt-4 text-sm text-[#8A8F98] font-light max-w-md leading-relaxed">
              Every diamond in our stock is individually selected, GIA or IGI certified,
              and ready for immediate setting.
            </p>
          </div>
          <Link
            href="/diamonds"
            className="flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#8A8F98] hover:text-[#C6A878] uppercase transition-colors group shrink-0"
          >
            View Full Stock
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Column headers */}
        <div className="hidden md:grid grid-cols-[56px_1fr_140px_56px_72px_80px_80px_128px] gap-4 px-5 pb-3 mb-1">
          <div />
          {["Diamond", "Carat", "Color", "Clarity", "Cut", "Lab", "Price"].map((h) => (
            <p key={h} className="text-[9px] tracking-[0.25em] text-[#8A8F98]/40 uppercase">{h}</p>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-1 relative">
          {/* Animated scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6A878]/30 to-transparent pointer-events-none"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />

          {preview.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/diamonds/${d.id}`}
                className="group grid grid-cols-2 md:grid-cols-[56px_1fr_140px_56px_72px_80px_80px_128px] gap-4 px-5 py-4 border border-[#1A1A1E] hover:border-[#C6A878]/40 hover:bg-[#0F0F12] transition-all duration-300 items-center relative overflow-hidden"
              >
                {/* Row hover sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#C6A878]/3 via-transparent to-transparent pointer-events-none" />

                {/* Shape */}
                <ShapeGlyph shape={d.shape} />

                {/* ID + cert */}
                <div className="col-span-1 md:col-auto">
                  <p className="text-sm text-[#F6F1E8] font-light md:hidden">{d.carat}ct {d.shape}</p>
                  <p className="text-[10px] text-[#8A8F98] font-mono hidden md:block">{d.id}</p>
                  <p className="text-[9px] text-[#8A8F98]/40 mt-0.5 font-mono truncate hidden md:block">
                    #{d.certificate}
                  </p>
                  <p className="text-xs text-[#C6A878] mt-1 md:hidden">฿{d.priceTHB.toLocaleString()}</p>
                </div>

                {/* Carat bar */}
                <div className="hidden md:block">
                  <CaratBar carat={d.carat} />
                </div>

                {/* Color badge */}
                <div className="hidden md:flex">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={cn("text-xs border px-2 py-0.5 font-light", colorBadge(d.color))}
                  >
                    {d.color}
                  </motion.span>
                </div>

                {/* Clarity */}
                <p className={cn("hidden md:block text-sm font-light", clarityColor(d.clarity))}
                  style={["IF","VVS1"].includes(d.clarity) ? { textShadow: "0 0 6px rgba(198,168,120,0.3)" } : {}}>
                  {d.clarity}
                </p>

                {/* Cut */}
                <p className="hidden md:block text-xs text-[#8A8F98] font-light">{d.cut}</p>

                {/* Lab */}
                <div className="hidden md:flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[#C6A878]/50" />
                  <span className="text-xs text-[#8A8F98]">{d.lab}</span>
                </div>

                {/* Price */}
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-sm text-[#C6A878] font-light group-hover:text-[#D9C4A0] transition-colors">
                    ฿{d.priceTHB.toLocaleString()}
                  </p>
                  <p className="text-[9px] text-[#8A8F98]/40 mt-0.5">${d.priceUSD.toLocaleString()}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#1A1A1E]"
        >
          <div className="flex items-center gap-3">
            {/* Animated count */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-[#8A8F98] font-light"
            >
              Showing <span className="text-[#F6F1E8]">{preview.length}</span> of{" "}
              <span className="text-[#C6A878]">{diamonds.length}</span> certified diamonds
            </motion.p>
            <div className="w-1 h-1 rotate-45 bg-[#C6A878]/30" />
            <p className="text-[10px] text-[#8A8F98]/50">GIA · IGI · HRD</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/diamonds"
              className="relative overflow-hidden px-6 py-3 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:border-[#C6A878]/70 transition-colors group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A878]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Browse All Diamonds
            </Link>
            <Link
              href="/build"
              className="relative overflow-hidden px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              Build Your Ring
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
