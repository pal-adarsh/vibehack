"use client";

import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
}

export function ScoreRing({ score }: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(1000, score));
  const normalized = clamped / 1000;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - normalized);

  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 132 132" className="h-36 w-36 -rotate-90">
        <circle cx="66" cy="66" r="52" className="fill-none stroke-border" strokeWidth="12" />
        <motion.circle
          cx="66"
          cy="66"
          r="52"
          className="fill-none stroke-accent"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-bold text-ink">{clamped}</p>
        <p className="text-xs uppercase tracking-[0.15em] text-ink-muted">Second Brain Score</p>
      </div>
    </div>
  );
}
