"use client";

import { motion } from "framer-motion";

export function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-16 top-6 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--accent)_48%,transparent),transparent_70%)]"
        animate={{ x: [0, 40, -10, 0], y: [0, 10, 30, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--secondary)_65%,transparent),transparent_70%)]"
        animate={{ x: [0, -30, 20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--accent-2)_72%,transparent),transparent_70%)]"
        animate={{ x: [0, 20, -40, 0], y: [0, -14, 16, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
