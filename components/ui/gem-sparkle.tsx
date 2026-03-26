"use client";

import { motion } from "framer-motion";

interface GemSparkleProps {
  size?: number;
  delay?: number;
  duration?: number;
  repeatDelay?: number;
  color?: string;
  className?: string;
}

export function GemSparkle({
  size = 16,
  delay = 0,
  duration = 1.8,
  repeatDelay = 3,
  color = "#F6F1E8",
  className = "",
}: GemSparkleProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.2, 1, 1.1, 0.2],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" width={size} height={size} aria-hidden="true">
        {/* 4-point star (classic gem sparkle) */}
        <path
          d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"
          fill={color}
          opacity="0.9"
        />
        {/* Inner diamond */}
        <path
          d="M12 6 L12.6 11.4 L18 12 L12.6 12.6 L12 18 L11.4 12.6 L6 12 L11.4 11.4 Z"
          fill="#C6A878"
          opacity="0.6"
        />
        {/* Center */}
        <circle cx="12" cy="12" r="1.5" fill={color} opacity="1" />
        {/* Diagonal micro lines */}
        <line x1="4" y1="4" x2="7" y2="7" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="20" y1="4" x2="17" y2="7" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="20" x2="7" y2="17" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <line x1="20" y1="20" x2="17" y2="17" stroke={color} strokeWidth="0.5" opacity="0.4" />
      </svg>
    </motion.div>
  );
}
