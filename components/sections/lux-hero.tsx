"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

const CONTENT = {
  en: {
    tagline: "Lab-Grown Diamond House",
    headline: ["Crafted", "Brilliance,", "Reimagined."],
    subline:
      "Premium lab-grown diamonds of exceptional beauty — selected for perfection, crafted for eternity. Discover a new standard of luxury that is transparent, ethical, and breathtakingly beautiful.",
    shopCollections: "Shop Collections",
    searchDiamonds: "Search Diamonds",
    buildYourRing: "Build Your Ring",
    stats: [
      { value: "IGI", label: "Certified" },
      { value: null, label: "Diamonds in stock" },
      { value: "30-Day", label: "Returns" },
    ],
  },
  th: {
    tagline: "แบรนด์เพชร Lab-Grown",
    headline: ["สร้างสรรค์", "ความแวววาว", "นิยามใหม่"],
    subline:
      "เพชร Lab-Grown คุณภาพพรีเมียมที่งดงามเป็นพิเศษ — คัดสรรเพื่อความสมบูรณ์แบบ สร้างสรรค์เพื่อนิรันดร์ ค้นพบมาตรฐานใหม่ของความหรูหราที่โปร่งใส มีจริยธรรม และงดงามอย่างน่าทึ่ง",
    shopCollections: "ช้อปคอลเลกชัน",
    searchDiamonds: "ค้นหาเพชร",
    buildYourRing: "ออกแบบแหวน",
    stats: [
      { value: "IGI", label: "ผ่านการรับรอง" },
      { value: null, label: "เพชรในสต็อก" },
      { value: "30 วัน", label: "รับคืนสินค้า" },
    ],
  },
};

// ── Inject global keyframes once ──────────────────────────────
function injectHeroStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("lux-hero-styles")) return;

  const s = document.createElement("style");
  s.id = "lux-hero-styles";
  s.textContent = `
    /* ── Aurora bands ─────────────────────────────────────── */
    @keyframes aurora-pulse {
      0%,100% { opacity: 0.4; transform: rotate(var(--rot)) scaleX(1.4) translateY(0); }
      25%      { opacity: 1;   transform: rotate(var(--rot)) scaleX(1.6) translateY(-15px); }
      50%      { opacity: 0.6; transform: rotate(var(--rot)) scaleX(1.3) translateY(8px); }
      75%      { opacity: 1;   transform: rotate(var(--rot)) scaleX(1.5) translateY(-5px); }
    }
    .aurora-band {
      animation: aurora-pulse var(--dur) ease-in-out var(--delay) infinite;
      will-change: transform, opacity;
      transform: translateZ(0);
    }

    /* ── Bokeh blobs ───────────────────────────────────────── */
    @keyframes bokeh-drift {
      0%,100% { transform: translate(-50%,-50%) translate(0,0) scale(1);     opacity: var(--base-o); }
      25%      { transform: translate(-50%,-50%) translate(30px,-40px) scale(1.15); opacity: calc(var(--base-o) * 1.4); }
      50%      { transform: translate(-50%,-50%) translate(-20px,20px) scale(0.9);  opacity: calc(var(--base-o) * 0.7); }
      75%      { transform: translate(-50%,-50%) translate(10px,-30px) scale(1.05); opacity: var(--base-o); }
    }
    .bokeh {
      animation: bokeh-drift var(--dur) ease-in-out var(--delay) infinite;
      will-change: transform, opacity;
      transform: translateZ(0);
    }

    /* ── Rising micro-particles (hero only) ───────────────── */
    @keyframes hero-particle-rise {
      0%   { transform: translateY(0)         translateX(0);           opacity: 0; }
      8%   { opacity: var(--op); }
      50%  { transform: translateY(-50vh)    translateX(var(--dx));   opacity: var(--op); }
      90%  { opacity: calc(var(--op) * 0.4); }
      100% { transform: translateY(-100vh)   translateX(0);           opacity: 0; }
    }
    .hero-particle {
      animation: hero-particle-rise var(--dur) linear var(--delay) infinite;
      will-change: transform, opacity;
      transform: translateZ(0);
    }

    /* ── Prism rays ──────────────────────────────────────── */
    @keyframes ray-pulse {
      0%,100% { opacity: calc(var(--base-o) * 0.5); }
      50%      { opacity: var(--base-o); }
    }
    .prism-ray {
      animation: ray-pulse var(--dur) ease-in-out var(--delay) infinite;
    }

    /* ── Diamond orbit rings ─────────────────────────────── */
    @keyframes orbit-cw {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes orbit-ccw {
      from { transform: rotate(0deg); }
      to   { transform: rotate(-360deg); }
    }
    .orbit-cw  { animation: orbit-cw  var(--dur) linear infinite; transform-origin: center; will-change: transform; transform: translateZ(0); }
    .orbit-ccw { animation: orbit-ccw var(--dur) linear infinite; transform-origin: center; will-change: transform; transform: translateZ(0); }

    /* ── Diamond ring halos ──────────────────────────────── */
    @keyframes ring-pulse {
      0%,100% { opacity: calc(0.03 + var(--i) * 0.02); transform: scale(1); }
      50%      { opacity: calc(0.12 - var(--i) * 0.01); transform: scale(1.01); }
    }
    .diamond-ring {
      animation: ring-pulse calc(3s + var(--i) * 0.8s) ease-in-out calc(var(--i) * 0.5s) infinite;
      will-change: transform, opacity;
      transform: translateZ(0);
    }

    /* ── Scroll indicator bounce ─────────────────────────── */
    @keyframes scroll-bounce {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(8px); }
    }
    .scroll-indicator { animation: scroll-bounce 2s ease-in-out infinite; }

    /* ── Text entrance ────────────────────────────────────── */
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up-1 { animation: fade-up 0.7s ease-out 0s     forwards; opacity: 0; }
    .fade-up-2 { animation: fade-up 0.7s ease-out 0.1s  forwards; opacity: 0; }
    .fade-up-3 { animation: fade-up 0.7s ease-out 0.2s  forwards; opacity: 0; }
    .fade-up-4 { animation: fade-up 0.7s ease-out 0.3s  forwards; opacity: 0; }
    .fade-up-5 { animation: fade-up 0.7s ease-out 0.45s forwards; opacity: 0; }

    /* ── Stat entrance ────────────────────────────────────── */
    @keyframes stat-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .stat-0 { animation: stat-in 0.5s ease-out 0.6s  forwards; opacity: 0; }
    .stat-1 { animation: stat-in 0.5s ease-out 0.7s  forwards; opacity: 0; }
    .stat-2 { animation: stat-in 0.5s ease-out 0.8s  forwards; opacity: 0; }

    /* ── Tagline line expand ──────────────────────────────── */
    @keyframes line-expand {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    .tagline-line { animation: line-expand 0.8s ease-out 0.3s forwards; transform-origin: left center; }

    /* ── Hero diamond entrance ────────────────────────────── */
    @keyframes diamond-appear {
      from { opacity: 0; transform: scale(0.8); }
      to   { opacity: 1; transform: scale(1); }
    }
    .diamond-entrance {
      animation: diamond-appear 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      opacity: 0;
    }
  `;
  document.head.appendChild(s);
}

// ── Diamond SVG ─────────────────────────────────────────────
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
    return `${pk.x.toFixed(1)},${qA.y.toFixed(1)} ${qA.x.toFixed(1)},${qA.y.toFixed(1)} ${qB.x.toFixed(1)},${qB.y.toFixed(1)}`;
  });
  const starFacets = q.map((qk, k) => {
    const pA = p[k];
    const pB = p[(k + 1) % 8];
    return `${qk.x.toFixed(1)},${pA.y.toFixed(1)} ${pA.x.toFixed(1)},${pA.y.toFixed(1)} ${pB.x.toFixed(1)},${pB.y.toFixed(1)}`;
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

function DiamondHero() {
  return (
    <div className="diamond-2d-spin w-full h-full flex items-center justify-center">
      <DiamondGem />
    </div>
  );
}

// ── Static data ──────────────────────────────────────────────
const AURORA = [
  { top: "8%",  h: "28%", rot: -12, delay: "0s",  dur: "14s", grad: "linear-gradient(to right,rgba(120,60,220,0),rgba(120,60,220,0.06) 40%,rgba(120,60,220,0.06) 60%,rgba(60,160,220,0))" },
  { top: "55%", h: "22%", rot: 8,   delay: "3s",  dur: "18s", grad: "linear-gradient(to right,rgba(40,180,200,0),rgba(40,180,200,0.05) 40%,rgba(40,180,200,0.05) 60%,rgba(120,60,220,0))" },
  { top: "30%", h: "18%", rot: -6,  delay: "6s",  dur: "22s", grad: "linear-gradient(to right,rgba(200,100,60,0),rgba(198,168,120,0.07) 40%,rgba(198,168,120,0.07) 60%,rgba(200,100,60,0))" },
  { top: "72%", h: "20%", rot: 10,  delay: "9s",  dur: "16s", grad: "linear-gradient(to right,rgba(60,200,160,0),rgba(60,200,160,0.04) 40%,rgba(60,200,160,0.04) 60%,rgba(200,180,60,0))" },
  { top: "18%", h: "15%", rot: 15,  delay: "4s",  dur: "20s", grad: "linear-gradient(to right,rgba(180,40,120,0),rgba(180,40,120,0.04) 40%,rgba(180,40,120,0.04) 60%,rgba(40,100,220,0))" },
];

const BOKEH = [
  { size: 180, x: "20%", y: "30%", delay: "0s",   dur: "18s", color: "198,168,120", o: 0.06 },
  { size: 120, x: "70%", y: "60%", delay: "3s",   dur: "14s", color: "217,221,227", o: 0.05 },
  { size: 240, x: "50%", y: "80%", delay: "6s",   dur: "22s", color: "198,168,120", o: 0.04 },
  { size: 80,  x: "85%", y: "20%", delay: "1.5s", dur: "16s", color: "246,241,232", o: 0.07 },
  { size: 160, x: "10%", y: "70%", delay: "4s",   dur: "20s", color: "138,143,152", o: 0.05 },
  { size: 100, x: "60%", y: "15%", delay: "2.5s", dur: "12s", color: "198,168,120", o: 0.08 },
  { size: 220, x: "35%", y: "15%", delay: "1s",   dur: "26s", color: "120,80,220",  o: 0.05 },
  { size: 150, x: "88%", y: "55%", delay: "5s",   dur: "19s", color: "40,160,210",  o: 0.06 },
  { size: 280, x: "5%",  y: "45%", delay: "2s",   dur: "32s", color: "190,60,130",  o: 0.04 },
  { size: 110, x: "72%", y: "88%", delay: "7s",   dur: "15s", color: "60,190,160",  o: 0.07 },
  { size: 90,  x: "25%", y: "92%", delay: "3.5s", dur: "21s", color: "220,140,60",  o: 0.06 },
  { size: 130, x: "55%", y: "42%", delay: "9s",   dur: "17s", color: "80,120,220",  o: 0.05 },
];

// Mobile: reduced to 6 particles
const HERO_PARTICLES = [
  { x: 8,  delay: "0s",   dur: "12s", size: 1.5, o: 0.4, dx: 20  },
  { x: 23, delay: "3s",   dur: "11s", size: 2,   o: 0.5, dx: -20 },
  { x: 40, delay: "5s",   dur: "18s", size: 1,   o: 0.3, dx: 20  },
  { x: 55, delay: "7s",   dur: "10s", size: 2,   o: 0.45,dx: -20 },
  { x: 69, delay: "4s",   dur: "19s", size: 1.5, o: 0.3, dx: 20  },
  { x: 84, delay: "2.8s", dur: "17s", size: 1,   o: 0.5, dx: -20 },
  { x: 12, delay: "9s",   dur: "13s", size: 2,   o: 0.4, dx: 20  },
  { x: 58, delay: "8s",   dur: "14s", size: 1.5, o: 0.35,dx: -20 },
  { x: 35, delay: "3.5s", dur: "20s", size: 1,   o: 0.25,dx: 20  },
  { x: 74, delay: "1.8s", dur: "16s", size: 1,   o: 0.4, dx: -20 },
];

const PRISM_RAYS = [
  { angle: -35, color: "#7EC8E3", w: 120, o: 0.12, delay: "0s",   dur: "8s"  },
  { angle: -20, color: "#C6A878", w: 80,  o: 0.10, delay: "1.5s", dur: "10s" },
  { angle: -8,  color: "#E8C4F0", w: 60,  o: 0.08, delay: "3s",   dur: "7s"  },
  { angle: 5,   color: "#60D8B0", w: 90,  o: 0.09, delay: "0.8s", dur: "12s" },
  { angle: 18,  color: "#F0C8A0", w: 70,  o: 0.11, delay: "2.5s", dur: "9s"  },
];

type LuxHeroSectionProps = { diamondCount: number };

export function LuxHeroSection({ diamondCount }: LuxHeroSectionProps) {
  const locale = useLocale() as "en" | "th";
  const c = CONTENT[locale];

  if (typeof window !== "undefined") {
    injectHeroStyles();
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B0B0D]">

      {/* ── Layer 1: Deep atmosphere & aurora ─────────────── */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(198,168,120,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_20%_70%,rgba(100,80,180,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(60,100,140,0.05)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_10%_20%,rgba(120,60,200,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_90%_30%,rgba(40,160,210,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_30%_at_50%_95%,rgba(60,190,140,0.04)_0%,transparent_70%)]" />

        {AURORA.map((a, i) => (
          <div
            key={`aurora${i}`}
            className="absolute inset-x-0 aurora-band pointer-events-none"
            style={{
              top: a.top, height: a.h,
              background: a.grad,
              filter: "blur(40px)",
              "--rot": `${a.rot}deg`,
              "--dur": a.dur,
              "--delay": a.delay,
            } as React.CSSProperties}
          />
        ))}

        {BOKEH.map((b, i) => (
          <div
            key={`bokeh${i}`}
            className="absolute rounded-full bokeh pointer-events-none"
            style={{
              width: b.size, height: b.size, left: b.x, top: b.y,
              background: `radial-gradient(circle, rgba(${b.color},${b.o}) 0%, transparent 70%)`,
              filter: `blur(${b.size * 0.3}px)`,
              "--dur": b.dur,
              "--delay": b.delay,
              "--base-o": b.o,
            } as React.CSSProperties}
          />
        ))}

        {HERO_PARTICLES.map((p, i) => (
          <div
            key={`hp${i}`}
            className="absolute hero-particle pointer-events-none rounded-full bg-[#C6A878]"
            style={{
              width: p.size, height: p.size, left: `${p.x}%`, bottom: "-4px",
              "--dur": p.dur,
              "--delay": p.delay,
              "--op": p.o,
              "--dx": `${p.dx}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Layer 2: Grid & prism structure ──────────────── */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right,rgba(198,168,120,0.06) 1px,transparent 1px),linear-gradient(to bottom,rgba(198,168,120,0.06) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right,rgba(198,168,120,0.12) 1px,transparent 1px),linear-gradient(to bottom,rgba(198,168,120,0.12) 1px,transparent 1px)",
          backgroundSize: "240px 240px",
        }} />
        <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-[#7EC8E3]/8 to-transparent" />
        <div className="absolute top-0 right-[32%] w-px h-full bg-gradient-to-b from-transparent via-[#C6A878]/6 to-transparent" />
        <div className="absolute top-0 right-[34%] w-px h-full bg-gradient-to-b from-transparent via-[#E8C4C4]/5 to-transparent" />
        <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#A080E8]/6 to-transparent" />
        <div className="absolute top-0 left-[65%] w-px h-full bg-gradient-to-b from-transparent via-[#40C8A0]/5 to-transparent" />
        <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-transparent via-[#E8A060]/6 to-transparent" />
        <div className="absolute top-0 left-[42%] w-px h-full bg-gradient-to-b from-transparent via-[#60A8E8]/4 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_30%,rgba(11,11,13,0.5)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
      </div>

      {/* ── Prism rays from diamond side ─────────────────── */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden -z-10">
        {PRISM_RAYS.map((r, i) => (
          <div
            key={`ray${i}`}
            className="absolute right-[30%] top-1/2 prism-ray"
            style={{
              width: `${r.w}px`, height: "1px",
              background: `linear-gradient(to left, transparent, ${r.color})`,
              transform: `rotate(${r.angle}deg)`,
              transformOrigin: "right center",
              opacity: r.o,
              filter: "blur(1px)",
              "--base-o": r.o,
              "--dur": r.dur,
              "--delay": r.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-8 fade-up-1">
              <div className="w-8 h-px bg-[#C6A878]/60 tagline-line" />
              <span className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase font-light">
                {c.tagline}
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.05] text-[#F6F1E8] mb-6 fade-up-2">
              {c.headline.map((line, i) => (
                <span key={i} className={i === 1 ? "not-italic text-shimmer" : ""}>
                  {line}<br />
                </span>
              ))}
            </h1>

            <p className="text-[#8A8F98] text-lg font-light leading-relaxed max-w-lg mb-10 fade-up-3">
              {c.subline}
            </p>

            <div className="flex flex-wrap gap-3 fade-up-4">
              <Link href="/collections" className="relative flex items-center gap-2 px-8 py-4 bg-[#C6A878] text-[#0B0B0D] text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#D9C4A0] transition-colors duration-300 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {c.shopCollections}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/diamonds" className="flex items-center gap-2 px-8 py-4 border border-[#C6A878]/40 text-[#C6A878] text-[11px] tracking-[0.25em] uppercase font-light hover:bg-[#C6A878]/8 hover:border-[#C6A878]/70 transition-all duration-300">
                {c.searchDiamonds}
              </Link>
              <Link href="/build" className="flex items-center gap-2 px-8 py-4 border border-[#2A2A30] text-[#8A8F98] text-[11px] tracking-[0.25em] uppercase font-light hover:border-[#C6A878]/30 hover:text-[#F6F1E8] transition-colors duration-300">
                {c.buildYourRing}
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[#1A1A1E] fade-up-5">
              {c.stats.map((stat, i) => (
                <div key={stat.label} className={`stat-${i}`}>
                  <p className="text-sm font-light text-[#F6F1E8]">
                    {stat.value ?? diamondCount}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] text-[#8A8F98] uppercase mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Diamond sculpture */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] diamond-entrance">

              {/* Concentric rings */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={`ring${i}`}
                  className="absolute rounded-full border border-[#C6A878] diamond-ring"
                  style={{ inset: i * 10, "--i": i } as React.CSSProperties}
                />
              ))}

              {/* Bounded glow rings */}
              <div className="absolute inset-0 rounded-full border border-[#7EC8E3]/20 orbit-cw" style={{ "--dur": "5s", animationDelay: "1s" } as React.CSSProperties} />
              <div className="absolute inset-0 rounded-full border border-[#C080E8]/15 orbit-ccw" style={{ inset: "-8px", "--dur": "7s", animationDelay: "2.5s" } as React.CSSProperties} />

              {/* SVG arc orbits */}
              <div className="absolute inset-0 orbit-cw" style={{ "--dur": "12s" } as React.CSSProperties}>
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
              </div>
              <div className="absolute inset-2 orbit-ccw" style={{ "--dur": "20s" } as React.CSSProperties}>
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20" aria-hidden="true">
                  <path d="M 50,5 A 45,45 0 0,0 5,50" fill="none" stroke="#C6A878" strokeWidth="0.4" strokeLinecap="round" strokeDasharray="20 80" />
                </svg>
              </div>
              <div className="absolute inset-4 orbit-cw" style={{ "--dur": "30s" } as React.CSSProperties}>
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
              </div>

              <div className="absolute inset-8 rounded-full bg-[#C6A878]/10 blur-3xl" />
              <div className="absolute inset-8 rounded-full bg-[#7EC8E3]/6 blur-2xl" style={{ transform: "translate(10%, -10%)" }} />
              <div className="absolute inset-8 rounded-full bg-[#C080E8]/5 blur-2xl" style={{ transform: "translate(-8%, 12%)" }} />
              <div className="absolute inset-16">
                <DiamondHero />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <ChevronDown className="w-5 h-5 text-[#8A8F98]" />
      </div>

    </section>
  );
}
