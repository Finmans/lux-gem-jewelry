"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { GemSparkle } from "@/components/ui/gem-sparkle";
import dynamic from "next/dynamic";

// Dynamic import — no SSR, show the SVG diamond while the 3D bundle loads
const Diamond3DLazy = dynamic(
  () => import("@/components/3d/diamond-3d").then((m) => m.Diamond3D),
  {
    ssr: false,
    loading: () => (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="w-full h-full"
      >
        <DiamondGem />
      </motion.div>
    ),
  }
);

// ── Round brilliant top-view diamond SVG ─────────────────
function DiamondGem({ opacity = 1 }: { opacity?: number }) {
  const rOuter = 90;
  const rInner = 38;
  const p = Array.from({ length: 8 }, (_, k) => {
    const a = (k * 45 * Math.PI) / 180;
    return { x: rOuter * Math.cos(a), y: rOuter * Math.sin(a) };
  });
  const q = Array.from({ length: 8 }, (_, k) => {
    const a = ((22.5 + k * 45) * Math.PI) / 180;
    return { x: rInner * Math.cos(a), y: rInner * Math.sin(a) };
  });
  const outerPts = p.map((v) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(" ");
  const innerPts = q.map((v) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`).join(" ");
  const mainFacets = p.map((pk, k) => {
    const qA = q[(k + 7) % 8];
    const qB = q[k];
    return `${pk.x.toFixed(1)},${pk.y.toFixed(1)} ${qA.x.toFixed(1)},${qA.y.toFixed(1)} ${qB.x.toFixed(1)},${qB.y.toFixed(1)}`;
  });
  const starFacets = q.map((qk, k) => {
    const pA = p[k];
    const pB = p[(k + 1) % 8];
    return `${qk.x.toFixed(1)},${qk.y.toFixed(1)} ${pA.x.toFixed(1)},${pA.y.toFixed(1)} ${pB.x.toFixed(1)},${pB.y.toFixed(1)}`;
  });
  const crossLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  p.forEach((pk, k) => {
    crossLines.push({ x1: pk.x, y1: pk.y, x2: q[(k + 7) % 8].x, y2: q[(k + 7) % 8].y });
    crossLines.push({ x1: pk.x, y1: pk.y, x2: q[k].x, y2: q[k].y });
  });

  return (
    <svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true" style={{ opacity }}>
      <defs>
        <radialGradient id="dg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C6A878" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#C6A878" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C6A878" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tableGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F6F1E8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C6A878" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="0" cy="0" r="98" fill="url(#dg1)" />
      {p.map((pk, k) => (
        <line key={`ray${k}`} x1="0" y1="0"
          x2={(pk.x * 1.1).toFixed(1)} y2={(pk.y * 1.1).toFixed(1)}
          stroke="#C6A878" strokeWidth="0.2" opacity={k % 2 === 0 ? 0.18 : 0.08} />
      ))}
      {mainFacets.map((pts, k) => (
        <polygon key={`m${k}`} points={pts} fill={`rgba(198,168,120,${k % 2 === 0 ? 0.14 : 0.04})`} stroke="none" />
      ))}
      {starFacets.map((pts, k) => (
        <polygon key={`s${k}`} points={pts} fill={`rgba(246,241,232,${k % 2 === 0 ? 0.04 : 0.10})`} stroke="none" />
      ))}
      <polygon points={outerPts} fill="none" stroke="#C6A878" strokeWidth="1" opacity="0.8" filter="url(#glow)" />
      <polygon points={outerPts} fill="none" stroke="#F6F1E8" strokeWidth="0.3" opacity="0.3" />
      <polygon points={innerPts} fill="url(#tableGlow)" stroke="#C6A878" strokeWidth="1" opacity="1" filter="url(#glow)" />
      <polygon points={innerPts} fill="none" stroke="#F6F1E8" strokeWidth="0.4" opacity="0.4" />
      {crossLines.map((ln, i) => (
        <line key={i} x1={ln.x1.toFixed(1)} y1={ln.y1.toFixed(1)} x2={ln.x2.toFixed(1)} y2={ln.y2.toFixed(1)}
          stroke="#C6A878" strokeWidth="0.4" opacity="0.5" />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <line key={`td${k}`} x1={q[k].x.toFixed(1)} y1={q[k].y.toFixed(1)}
          x2={q[k + 4].x.toFixed(1)} y2={q[k + 4].y.toFixed(1)}
          stroke="#F6F1E8" strokeWidth="0.35" opacity="0.25" />
      ))}
      {p.map((pk, k) => (
        <circle key={`vg${k}`} cx={pk.x.toFixed(1)} cy={pk.y.toFixed(1)} r="1.8"
          fill="#F6F1E8" opacity={k % 2 === 0 ? 0.7 : 0.3} filter="url(#glow)" />
      ))}
      <circle cx="0" cy="0" r="5" fill="#C6A878" opacity="0.4" filter="url(#strongGlow)" />
      <circle cx="0" cy="0" r="2" fill="#F6F1E8" opacity="0.95" filter="url(#glow)" />
    </svg>
  );
}

// ── Sparkle positions ─────────────────────────────────────
const SPARKLE_RING: { top: string; left: string; delay: number; size: number }[] = [
  { top: "50%",  left: "88%", delay: 0,   size: 14 },
  { top: "16%",  left: "83%", delay: 0.8, size: 10 },
  { top: "5%",   left: "50%", delay: 1.6, size: 16 },
  { top: "16%",  left: "17%", delay: 2.4, size: 10 },
  { top: "50%",  left: "6%",  delay: 3.2, size: 12 },
  { top: "82%",  left: "17%", delay: 1.0, size: 10 },
  { top: "94%",  left: "50%", delay: 2.0, size: 14 },
  { top: "82%",  left: "83%", delay: 3.8, size: 10 },
];

// ── Bokeh — gold/silver originals + new colored ones ──────
const BOKEH = [
  // originals
  { size: 180, x: "20%", y: "30%", delay: 0,   dur: 18, color: "198,168,120", o: 0.06 },
  { size: 120, x: "70%", y: "60%", delay: 3,   dur: 14, color: "217,221,227", o: 0.05 },
  { size: 240, x: "50%", y: "80%", delay: 6,   dur: 22, color: "198,168,120", o: 0.04 },
  { size: 80,  x: "85%", y: "20%", delay: 1.5, dur: 16, color: "246,241,232", o: 0.07 },
  { size: 160, x: "10%", y: "70%", delay: 4,   dur: 20, color: "138,143,152", o: 0.05 },
  { size: 100, x: "60%", y: "15%", delay: 2.5, dur: 12, color: "198,168,120", o: 0.08 },
  // new — colored
  { size: 220, x: "35%", y: "15%", delay: 1,   dur: 26, color: "120,80,220",  o: 0.05 }, // violet
  { size: 150, x: "88%", y: "55%", delay: 5,   dur: 19, color: "40,160,210",  o: 0.06 }, // cyan
  { size: 280, x: "5%",  y: "45%", delay: 2,   dur: 32, color: "190,60,130",  o: 0.04 }, // rose
  { size: 110, x: "72%", y: "88%", delay: 7,   dur: 15, color: "60,190,160",  o: 0.07 }, // teal
  { size: 90,  x: "25%", y: "92%", delay: 3.5, dur: 21, color: "220,140,60",  o: 0.06 }, // amber
  { size: 130, x: "55%", y: "42%", delay: 9,   dur: 17, color: "80,120,220",  o: 0.05 }, // indigo
];

// ── Aurora bands — pre-computed, no Math.random() ─────────
const AURORA = [
  { from: "rgba(120,60,220,0)",  via: "rgba(120,60,220,0.06)", to: "rgba(60,160,220,0)",  top: "8%",  h: "28%", rot: -12, delay: 0,   dur: 14 },
  { from: "rgba(40,180,200,0)",  via: "rgba(40,180,200,0.05)", to: "rgba(120,60,220,0)",  top: "55%", h: "22%", rot: 8,   delay: 3,   dur: 18 },
  { from: "rgba(200,100,60,0)",  via: "rgba(198,168,120,0.07)",to: "rgba(200,100,60,0)",  top: "30%", h: "18%", rot: -6,  delay: 6,   dur: 22 },
  { from: "rgba(60,200,160,0)",  via: "rgba(60,200,160,0.04)", to: "rgba(200,180,60,0)",  top: "72%", h: "20%", rot: 10,  delay: 9,   dur: 16 },
  { from: "rgba(180,40,120,0)",  via: "rgba(180,40,120,0.04)", to: "rgba(40,100,220,0)",  top: "18%", h: "15%", rot: 15,  delay: 4,   dur: 20 },
];

// ── Floating micro-particles (pre-computed to avoid SSR mismatch) ──
const PARTICLES = [
  { x: 8,  delay: 0,    dur: 12, size: 1.5, o: 0.4 },
  { x: 15, delay: 1.5,  dur: 16, size: 1,   o: 0.3 },
  { x: 23, delay: 3,    dur: 11, size: 2,   o: 0.5 },
  { x: 31, delay: 0.8,  dur: 14, size: 1.5, o: 0.35},
  { x: 40, delay: 5,    dur: 18, size: 1,   o: 0.3 },
  { x: 47, delay: 2.2,  dur: 13, size: 2,   o: 0.45},
  { x: 55, delay: 7,    dur: 10, size: 1,   o: 0.25},
  { x: 62, delay: 1,    dur: 15, size: 1.5, o: 0.4 },
  { x: 69, delay: 4,    dur: 19, size: 2,   o: 0.3 },
  { x: 78, delay: 6,    dur: 12, size: 1,   o: 0.35},
  { x: 84, delay: 2.8,  dur: 17, size: 1.5, o: 0.5 },
  { x: 91, delay: 0.5,  dur: 11, size: 1,   o: 0.3 },
  { x: 12, delay: 9,    dur: 13, size: 2,   o: 0.4 },
  { x: 35, delay: 3.5,  dur: 20, size: 1,   o: 0.25},
  { x: 58, delay: 8,    dur: 14, size: 1.5, o: 0.35},
  { x: 74, delay: 1.8,  dur: 16, size: 1,   o: 0.4 },
  { x: 88, delay: 5.5,  dur: 10, size: 2,   o: 0.3 },
  { x: 42, delay: 11,   dur: 15, size: 1,   o: 0.2 },
  { x: 19, delay: 7.5,  dur: 18, size: 1.5, o: 0.45},
  { x: 65, delay: 4.5,  dur: 12, size: 1,   o: 0.3 },
];

// ── Prism light rays — emanating from diamond area ────────
const PRISM_RAYS = [
  { angle: -35, color: "#7EC8E3", w: 120, o: 0.12, delay: 0,   dur: 8  },
  { angle: -20, color: "#C6A878", w: 80,  o: 0.10, delay: 1.5, dur: 10 },
  { angle: -8,  color: "#E8C4F0", w: 60,  o: 0.08, delay: 3,   dur: 7  },
  { angle: 5,   color: "#60D8B0", w: 90,  o: 0.09, delay: 0.8, dur: 12 },
  { angle: 18,  color: "#F0C8A0", w: 70,  o: 0.11, delay: 2.5, dur: 9  },
];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

type LuxHeroSectionProps = {
  diamondCount: number;
};

export function LuxHeroSection({ diamondCount }: LuxHeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0B0D]">

      {/* ── Layer 1: Deep atmosphere & aurora ─────────────── */}
      <div className="absolute inset-0 -z-20">
        {/* Base radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(198,168,120,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_70%,rgba(100,80,180,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(60,100,140,0.05)_0%,transparent_60%)]" />
        {/* Extra colored radials */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_10%_20%,rgba(120,60,200,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_90%_30%,rgba(40,160,210,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_30%_at_50%_95%,rgba(60,190,140,0.04)_0%,transparent_70%)]" />

        {/* ── Aurora bands ── */}
        {AURORA.map((a, i) => (
          <motion.div
            key={`aurora${i}`}
            className="absolute inset-x-0 pointer-events-none"
            style={{
              top: a.top,
              height: a.h,
              background: `linear-gradient(to right, ${a.from}, ${a.via} 40%, ${a.via} 60%, ${a.to})`,
              transform: `rotate(${a.rot}deg) scaleX(1.4)`,
              filter: "blur(40px)",
            }}
            animate={{
              opacity: [0.4, 1, 0.6, 1, 0.4],
              scaleX: [1.4, 1.6, 1.3, 1.5, 1.4],
              y: [0, -15, 8, -5, 0],
            }}
            transition={{ duration: a.dur, delay: a.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── Bokeh blobs (original + colored) ── */}
        {BOKEH.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: b.x,
              top: b.y,
              background: `radial-gradient(circle, rgba(${b.color},${b.o}) 0%, transparent 70%)`,
              filter: `blur(${b.size * 0.3}px)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.15, 0.9, 1],
              opacity: [b.o * 8, b.o * 12, b.o * 6, b.o * 8],
            }}
            transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── Floating micro-particles ── */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={`p${i}`}
            className="absolute rounded-full bg-[#C6A878]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              bottom: "-4px",
              opacity: p.o,
            }}
            animate={{
              y: [0, "-100vh"],
              opacity: [0, p.o, p.o, 0],
              x: [0, (i % 2 === 0 ? 20 : -20)],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ── Layer 2: Grid & prism structure ──────────────── */}
      <div className="absolute inset-0 -z-10">
        {/* Fine gold grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(198,168,120,0.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(198,168,120,0.06) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Coarse accent grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(198,168,120,0.12) 1px,transparent 1px),linear-gradient(to bottom,rgba(198,168,120,0.12) 1px,transparent 1px)",
            backgroundSize: "240px 240px",
          }}
        />

        {/* Original prismatic vertical lines */}
        <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-[#7EC8E3]/8 to-transparent" />
        <div className="absolute top-0 right-[32%] w-px h-full bg-gradient-to-b from-transparent via-[#C6A878]/6 to-transparent" />
        <div className="absolute top-0 right-[34%] w-px h-full bg-gradient-to-b from-transparent via-[#E8C4C4]/5 to-transparent" />

        {/* New prismatic lines — colored spectrum */}
        <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#A080E8]/6 to-transparent" />
        <div className="absolute top-0 left-[65%] w-px h-full bg-gradient-to-b from-transparent via-[#40C8A0]/5 to-transparent" />
        <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-[#E8A060]/6 to-transparent" />
        <div className="absolute top-0 left-[42%] w-px h-full bg-gradient-to-b from-transparent via-[#60A8E8]/4 to-transparent" />

        {/* Animated horizontal scanline */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C6A878]/20 to-transparent"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
        />
        {/* Second scanline (offset, different color) */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#80C8FF]/15 to-transparent"
          animate={{ top: ["100%", "0%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 4 }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_30%,rgba(11,11,13,0.5)_100%)]" />
        {/* Bottom dark gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
      </div>

      {/* ── Prism rays from diamond side ─────────────────── */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden -z-10">
        {PRISM_RAYS.map((r, i) => (
          <motion.div
            key={`ray${i}`}
            className="absolute right-[30%] top-1/2"
            style={{
              width: `${r.w}px`,
              height: "1px",
              background: `linear-gradient(to left, transparent, ${r.color})`,
              transform: `rotate(${r.angle}deg)`,
              transformOrigin: "right center",
              opacity: r.o,
              filter: "blur(1px)",
            }}
            animate={{ opacity: [r.o * 0.5, r.o, r.o * 0.3, r.o] }}
            transition={{ duration: r.dur, delay: r.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeUp} initial="initial" animate="animate"
              transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-8">
              <motion.div
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-8 h-px bg-[#C6A878]/60 origin-left"
              />
              <span className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase font-light">
                Lab-Grown Diamond House
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} initial="initial" animate="animate"
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-[#F6F1E8] mb-6">
              Crafted
              <br />
              <em className="not-italic text-shimmer">Brilliance,</em>
              <br />
              Reimagined.
            </motion.h1>

            <motion.p variants={fadeUp} initial="initial" animate="animate"
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[#8A8F98] text-lg font-light leading-relaxed max-w-lg mb-10">
              Premium lab-grown diamonds of exceptional beauty — selected for
              perfection, crafted for eternity. Discover a new standard of luxury
              that is transparent, ethical, and breathtakingly beautiful.
            </motion.p>

            <motion.div variants={fadeUp} initial="initial" animate="animate"
              transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-wrap gap-3">
              <Link href="/collections"
                className="relative flex items-center gap-2 px-8 py-4 bg-[#C6A878] text-[#0B0B0D] text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#D9C4A0] transition-colors duration-300 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                Shop Collections
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/diamonds"
                className="flex items-center gap-2 px-8 py-4 border border-[#C6A878]/40 text-[#C6A878] text-[11px] tracking-[0.25em] uppercase font-light hover:bg-[#C6A878]/8 hover:border-[#C6A878]/70 transition-all duration-300">
                Search Diamonds
              </Link>
              <Link href="/build"
                className="flex items-center gap-2 px-8 py-4 border border-[#2A2A30] text-[#8A8F98] text-[11px] tracking-[0.25em] uppercase font-light hover:border-[#C6A878]/30 hover:text-[#F6F1E8] transition-colors duration-300">
                Build Your Ring
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div variants={fadeUp} initial="initial" animate="animate"
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-[#1A1A1E]">
                {[
                  { value: "GIA / IGI", label: "Certified" },
                  { value: `${diamondCount}`, label: "Diamonds in stock" },
                  { value: "30-Day", label: "Returns" },
                ].map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}>
                  <p className="text-sm font-light text-[#F6F1E8]">{stat.value}</p>
                  <p className="text-[10px] tracking-[0.15em] text-[#8A8F98] uppercase mt-0.5">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Diamond sculpture */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[360px] h-[360px] sm:w-[460px] sm:h-[460px]"
            >
              {/* ── Outer pulse rings — gold + colored ── */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`ring${i}`}
                  className="absolute rounded-full border border-[#C6A878]"
                  style={{ inset: i * 10 }}
                  animate={{ opacity: [0.03 + i * 0.02, 0.12 - i * 0.01, 0.03 + i * 0.02], scale: [1, 1.01, 1] }}
                  transition={{ duration: 3 + i * 0.8, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
              {/* Extra colored ring pulses */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[#7EC8E3]/20"
                animate={{ opacity: [0.05, 0.2, 0.05], scale: [1.02, 1.06, 1.02] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute rounded-full border border-[#C080E8]/15"
                style={{ inset: -8 }}
                animate={{ opacity: [0.04, 0.16, 0.04], scale: [1, 1.04, 1] }}
                transition={{ duration: 7, delay: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Rotating arc scan ── */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-40" aria-hidden="true">
                  <defs>
                    <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C6A878" stopOpacity="0" />
                      <stop offset="50%" stopColor="#C6A878" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#F6F1E8" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path d="M 50,3 A 47,47 0 0,1 97,50" fill="none" stroke="url(#arcGrad)" strokeWidth="0.5" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* ── Counter-rotating arc ── */}
              <motion.div
                className="absolute inset-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20" aria-hidden="true">
                  <path d="M 50,5 A 45,45 0 0,0 5,50" fill="none" stroke="#C6A878" strokeWidth="0.4" strokeLinecap="round" strokeDasharray="20 80" />
                </svg>
              </motion.div>

              {/* ── Colored rotating arc (new) ── */}
              <motion.div
                className="absolute inset-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-30" aria-hidden="true">
                  <defs>
                    <linearGradient id="arcCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7EC8E3" stopOpacity="0" />
                      <stop offset="50%" stopColor="#7EC8E3" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#C080E8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 50,5 A 45,45 0 0,1 95,50 A 45,45 0 0,1 50,95" fill="none" stroke="url(#arcCyan)" strokeWidth="0.4" strokeLinecap="round" strokeDasharray="30 70" />
                </svg>
              </motion.div>

              {/* ── Bokeh behind diamond — expanded palette ── */}
              <div className="absolute inset-8 rounded-full bg-[#C6A878]/10 blur-3xl" />
              <div className="absolute inset-8 rounded-full bg-[#7EC8E3]/6 blur-2xl" style={{ transform: "translate(10%, -10%)" }} />
              <div className="absolute inset-8 rounded-full bg-[#C080E8]/5 blur-2xl" style={{ transform: "translate(-8%, 12%)" }} />
              <motion.div
                className="absolute inset-16 rounded-full bg-[#F6F1E8]/5 blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ── Prismatic refraction hints — more colorful ── */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="absolute top-[15%] left-[10%] w-[2px] h-[40%] bg-gradient-to-b from-transparent via-[#7EC8E3]/18 to-transparent rotate-[25deg]" />
                <div className="absolute top-[20%] right-[12%] w-[2px] h-[35%] bg-gradient-to-b from-transparent via-[#E8C4C4]/15 to-transparent rotate-[-20deg]" />
                <div className="absolute bottom-[15%] left-[20%] w-[1px] h-[25%] bg-gradient-to-b from-transparent via-[#C6E8C4]/12 to-transparent rotate-[15deg]" />
                {/* New colored lines */}
                <div className="absolute top-[30%] right-[25%] w-[1px] h-[30%] bg-gradient-to-b from-transparent via-[#C080E8]/14 to-transparent rotate-[-35deg]" />
                <div className="absolute top-[10%] left-[35%] w-[2px] h-[20%] bg-gradient-to-b from-transparent via-[#60C8A0]/12 to-transparent rotate-[10deg]" />
                <div className="absolute bottom-[20%] right-[15%] w-[1px] h-[28%] bg-gradient-to-b from-transparent via-[#E8C060]/10 to-transparent rotate-[28deg]" />
              </div>

              {/* ── Rainbow prism flash — sweeps from top ── */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  className="absolute inset-x-0 h-[120%] -top-[10%]"
                  style={{
                    background: "linear-gradient(to bottom, transparent 0%, rgba(126,200,227,0.06) 20%, rgba(192,128,232,0.05) 35%, rgba(198,168,120,0.06) 50%, rgba(96,200,160,0.04) 65%, transparent 80%)",
                    filter: "blur(8px)",
                  }}
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 8, ease: "easeInOut", delay: 2 }}
                />
              </div>

              {/* ── 3D Interactive Diamond ── */}
              <div className="absolute inset-10 pointer-events-auto">
                <Diamond3DLazy />
              </div>

              {/* ── Light sweep 1 (diagonal white) ── */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#F6F1E8]/16 to-transparent skew-x-[-15deg]"
                />
              </div>

              {/* ── Light sweep 2 (narrow gold) ── */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 7, delay: 3.5, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-[8%] bg-gradient-to-r from-transparent via-[#C6A878]/25 to-transparent skew-x-[-10deg]"
                />
              </div>

              {/* ── Light sweep 3 (cyan, from bottom) ── */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <motion.div
                  animate={{ x: ["220%", "-120%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 9, delay: 5, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-[6%] bg-gradient-to-r from-transparent via-[#7EC8E3]/20 to-transparent skew-x-[10deg]"
                />
              </div>

              {/* ── Gem sparkles around the ring ── */}
              {SPARKLE_RING.map((sp, i) => (
                <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: sp.top, left: sp.left }}>
                  <GemSparkle
                    size={sp.size}
                    delay={sp.delay}
                    duration={1.6 + (i % 3) * 0.4}
                    repeatDelay={3.5 + (i % 4)}
                    className="relative"
                  />
                </div>
              ))}

              {/* ── Floating spec badges ── */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
                className="absolute -right-6 top-[22%] bg-[#0D0D10]/95 border border-[#C6A878]/40 px-4 py-2.5 shadow-2xl backdrop-blur-sm"
              >
                <p className="text-[9px] tracking-[0.25em] text-[#C6A878] uppercase">D Color</p>
                <p className="text-xs text-[#F6F1E8] font-light">Colorless</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.7 }}
                className="absolute -left-6 bottom-[28%] bg-[#0D0D10]/95 border border-[#C6A878]/40 px-4 py-2.5 shadow-2xl backdrop-blur-sm"
              >
                <p className="text-[9px] tracking-[0.25em] text-[#C6A878] uppercase">VVS1</p>
                <p className="text-xs text-[#F6F1E8] font-light">Clarity</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.7 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 bg-[#0D0D10]/95 border border-[#C6A878]/40 px-4 py-2 shadow-2xl backdrop-blur-sm"
              >
                <p className="text-[9px] tracking-[0.25em] text-[#C6A878] uppercase text-center">Excellent Cut</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.7 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 bg-[#0D0D10]/95 border border-[#2A2A30] px-4 py-2 shadow-2xl backdrop-blur-sm"
              >
                <p className="text-[9px] tracking-[0.25em] text-[#8A8F98] uppercase text-center">GIA Certified</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-[9px] tracking-[0.4em] text-[#8A8F98]/50 uppercase">Discover</p>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#8A8F98]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
