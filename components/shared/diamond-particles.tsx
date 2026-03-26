"use client";

import { motion } from "framer-motion";

// Pre-computed to avoid SSR/hydration mismatch
const PARTICLES = [
  { id: 0,  x: 4,  size: 5,  delay: 0,   dur: 14, drift: 12,  opacity: 0.18 },
  { id: 1,  x: 11, size: 3,  delay: 1.8, dur: 18, drift: -10, opacity: 0.12 },
  { id: 2,  x: 19, size: 7,  delay: 3.2, dur: 12, drift: 18,  opacity: 0.22 },
  { id: 3,  x: 28, size: 4,  delay: 0.5, dur: 16, drift: -6,  opacity: 0.14 },
  { id: 4,  x: 35, size: 6,  delay: 5,   dur: 11, drift: 8,   opacity: 0.20 },
  { id: 5,  x: 43, size: 3,  delay: 2.1, dur: 19, drift: -14, opacity: 0.10 },
  { id: 6,  x: 52, size: 8,  delay: 4.4, dur: 13, drift: 20,  opacity: 0.16 },
  { id: 7,  x: 60, size: 4,  delay: 1.1, dur: 15, drift: -8,  opacity: 0.20 },
  { id: 8,  x: 67, size: 5,  delay: 6.2, dur: 17, drift: 10,  opacity: 0.14 },
  { id: 9,  x: 74, size: 3,  delay: 0.8, dur: 12, drift: -18, opacity: 0.18 },
  { id: 10, x: 81, size: 6,  delay: 3.7, dur: 14, drift: 6,   opacity: 0.12 },
  { id: 11, x: 88, size: 4,  delay: 2.9, dur: 16, drift: -12, opacity: 0.22 },
  { id: 12, x: 94, size: 3,  delay: 5.5, dur: 11, drift: 16,  opacity: 0.16 },
  { id: 13, x: 7,  size: 9,  delay: 7.2, dur: 20, drift: -4,  opacity: 0.10 },
  { id: 14, x: 23, size: 4,  delay: 4.1, dur: 13, drift: 22,  opacity: 0.18 },
  { id: 15, x: 47, size: 5,  delay: 1.6, dur: 15, drift: -16, opacity: 0.14 },
  { id: 16, x: 63, size: 3,  delay: 8.3, dur: 18, drift: 8,   opacity: 0.20 },
  { id: 17, x: 78, size: 7,  delay: 3.0, dur: 12, drift: -10, opacity: 0.12 },
  { id: 18, x: 90, size: 4,  delay: 6.8, dur: 16, drift: 14,  opacity: 0.16 },
  { id: 19, x: 16, size: 5,  delay: 9.1, dur: 14, drift: -20, opacity: 0.18 },
  { id: 20, x: 55, size: 3,  delay: 0.3, dur: 22, drift: 6,   opacity: 0.10 },
  { id: 21, x: 38, size: 6,  delay: 7.5, dur: 11, drift: -8,  opacity: 0.14 },
  { id: 22, x: 70, size: 4,  delay: 4.8, dur: 17, drift: 18,  opacity: 0.18 },
  { id: 23, x: 84, size: 3,  delay: 2.4, dur: 13, drift: -12, opacity: 0.12 },
];

// Tiny diamond shape SVG
function MicroDiamond({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="5,0.5 9.5,5 5,9.5 0.5,5"
        stroke="#C6A878"
        strokeWidth="0.8"
        fill="rgba(198,168,120,0.15)"
        opacity={opacity * 2}
      />
      <line x1="0.5" y1="5" x2="9.5" y2="5" stroke="#C6A878" strokeWidth="0.3" opacity={opacity} />
      <line x1="5" y1="0.5" x2="5" y2="9.5" stroke="#C6A878" strokeWidth="0.3" opacity={opacity} />
    </svg>
  );
}

export function DiamondParticles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0"
          style={{ left: `${p.x}%` }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [0, p.drift, p.drift * 0.5, 0],
            rotate: [0, 180, 360],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: p.delay * 0.8 + 2,
            ease: "linear",
          }}
        >
          <MicroDiamond size={p.size} opacity={p.opacity} />
        </motion.div>
      ))}
    </div>
  );
}
