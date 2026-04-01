"use client";

import { motion } from "framer-motion";

export function BrainPulseIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      className={className}
      whileHover={{ rotate: 4 }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <motion.path
        d="M22 24c0-6 5-11 11-11s11 5 11 11v16c0 6-5 11-11 11s-11-5-11-11V24Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.path
        d="M32 13v38M22 32h20M24 22c3 2 4 2 8 2m0 16c4 0 5 0 8 2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0.2, opacity: 0.4 }}
        animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="24"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ opacity: 0.2, scale: 0.7 }}
        animate={{ opacity: [0.2, 0], scale: [0.7, 1.2] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.svg>
  );
}

export function DrawCheckIcon({ checked }: { checked: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: checked ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}

export function PriorityMorphIcon({ level }: { level: number }) {
  const d = level >= 80 ? "M12 2l10 20H2L12 2z" : level >= 50 ? "M12 2l8 8-8 12-8-12 8-8z" : "M4 4h16v16H4z";

  return (
    <motion.svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path d={d} fill="currentColor" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} />
    </motion.svg>
  );
}
