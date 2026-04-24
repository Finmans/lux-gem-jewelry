"use client";

// Pre-computed to avoid SSR/hydration mismatch
// Desktop: 24 particles, Mobile: 8 particles (CSS media query)
const PARTICLES = [
  { id: 0,  x: 4,  size: 5,  dur: 14, drift: 12,  opacity: 0.18, delay: 0    },
  { id: 1,  x: 11, size: 3,  dur: 18, drift: -10, opacity: 0.12, delay: 1.8  },
  { id: 2,  x: 19, size: 7,  dur: 12, drift: 18,  opacity: 0.22, delay: 3.2  },
  { id: 3,  x: 28, size: 4,  dur: 16, drift: -6,  opacity: 0.14, delay: 0.5  },
  { id: 4,  x: 35, size: 6,  dur: 11, drift: 8,   opacity: 0.20, delay: 5    },
  { id: 5,  x: 43, size: 3,  dur: 19, drift: -14, opacity: 0.10, delay: 2.1  },
  { id: 6,  x: 52, size: 8,  dur: 13, drift: 20,  opacity: 0.16, delay: 4.4  },
  { id: 7,  x: 60, size: 4,  dur: 15, drift: -8,  opacity: 0.20, delay: 1.1  },
  { id: 8,  x: 67, size: 5,  dur: 17, drift: 10,  opacity: 0.14, delay: 6.2  },
  { id: 9,  x: 74, size: 3,  dur: 12, drift: -18, opacity: 0.18, delay: 0.8  },
  { id: 10, x: 81, size: 6,  dur: 14, drift: 6,   opacity: 0.12, delay: 3.7  },
  { id: 11, x: 88, size: 4,  dur: 16, drift: -12, opacity: 0.22, delay: 2.9  },
  { id: 12, x: 94, size: 3,  dur: 11, drift: 16,  opacity: 0.16, delay: 5.5  },
  { id: 13, x: 7,  size: 9,  dur: 20, drift: -4,  opacity: 0.10, delay: 7.2  },
  { id: 14, x: 23, size: 4,  dur: 13, drift: 22,  opacity: 0.18, delay: 4.1  },
  { id: 15, x: 47, size: 5,  dur: 15, drift: -16, opacity: 0.14, delay: 1.6  },
  { id: 16, x: 63, size: 3,  dur: 18, drift: 8,   opacity: 0.20, delay: 8.3  },
  { id: 17, x: 78, size: 7,  dur: 12, drift: -10, opacity: 0.12, delay: 3.0  },
  { id: 18, x: 90, size: 4,  dur: 16, drift: 14,  opacity: 0.16, delay: 6.8  },
  { id: 19, x: 16, size: 5,  dur: 14, drift: -20, opacity: 0.18, delay: 9.1  },
  { id: 20, x: 55, size: 3,  dur: 22, drift: 6,   opacity: 0.10, delay: 0.3  },
  { id: 21, x: 38, size: 6,  dur: 11, drift: -8,  opacity: 0.14, delay: 7.5  },
  { id: 22, x: 70, size: 4,  dur: 17, drift: 18,  opacity: 0.18, delay: 4.8  },
  { id: 23, x: 84, size: 3,  dur: 13, drift: -12, opacity: 0.12, delay: 2.4  },
];

// Inject keyframe CSS once at module load — avoids SSR issues
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("diamond-particles-style")) return;

  const style = document.createElement("style");
  style.id = "diamond-particles-style";
  style.textContent = `
    @keyframes diamond-rise {
      0%   { transform: translateY(0)          translateX(0)                                  rotate(0deg);   opacity: 0; }
      5%   { opacity: 1; }
      40%  { transform: translateY(-44vh)      translateX(var(--drift))                        rotate(144deg); opacity: var(--op); }
      70%  { transform: translateY(-77vh)      translateX(calc(var(--drift) * 0.5))            rotate(252deg); opacity: var(--op); }
      95%  { opacity: 0.3; }
      100% { transform: translateY(-110vh)    translateX(0)                                  rotate(360deg); opacity: 0; }
    }
    .diamond-particle {
      will-change: transform, opacity;
      transform: translateZ(0);
    }
    @media (max-width: 768px) {
      .diamond-particle.desktop-only { display: none; }
    }
    @media (min-width: 769px) {
      .diamond-particle.mobile-only { display: none; }
    }
  `;
  document.head.appendChild(style);
}

// Mobile subset — every 3rd particle (8 total vs 24 on desktop)
const MOBILE_PARTICLES = PARTICLES.filter((_, i) => i % 3 === 0);

function MicroDiamond({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
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
  if (typeof window !== "undefined") {
    injectStyles();
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {PARTICLES.map((p) => (
        <div
          key={`d-${p.id}`}
          className="absolute bottom-0 diamond-particle desktop-only"
          style={{
            left: `${p.x}%`,
            "--drift": `${p.drift}px`,
            "--op": p.opacity,
          } as React.CSSProperties}
        >
          <MicroDiamond size={p.size} opacity={p.opacity} />
          <style>{`
            .diamond-particle.desktop-only {
              animation: diamond-rise ${p.dur}s linear ${p.delay}s infinite;
            }
          `}</style>
        </div>
      ))}
      {MOBILE_PARTICLES.map((p) => (
        <div
          key={`m-${p.id}`}
          className="absolute bottom-0 diamond-particle mobile-only"
          style={{
            left: `${p.x}%`,
            "--drift": `${p.drift}px`,
            "--op": p.opacity,
          } as React.CSSProperties}
        >
          <MicroDiamond size={p.size} opacity={p.opacity} />
          <style>{`
            .diamond-particle.mobile-only {
              animation: diamond-rise ${p.dur}s linear ${p.delay}s infinite;
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
