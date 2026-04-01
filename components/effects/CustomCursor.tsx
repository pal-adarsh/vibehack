"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "ring" | "drag" | "loading">("default");
  const x = useSpring(0, { stiffness: 500, damping: 38, mass: 0.2 });
  const y = useSpring(0, { stiffness: 500, damping: 38, mass: 0.2 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setVisible(true);
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr === "drag") {
        setMode("drag");
      } else if (cursorAttr === "ring") {
        setMode("ring");
      } else if (cursorAttr === "loading") {
        setMode("loading");
      } else {
        setMode("default");
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  const size = useMemo(() => {
    if (mode === "ring") return 42;
    if (mode === "drag") return 52;
    if (mode === "loading") return 34;
    return 12;
  }, [mode]);

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-90 grid place-items-center rounded-full border border-accent/60",
        mode === "default" ? "bg-accent" : "bg-transparent",
      )}
      style={{
        x,
        y,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={mode === "loading" ? { rotate: 360 } : { rotate: 0 }}
      transition={mode === "loading" ? { duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : { duration: 0.2 }}
    >
      {mode === "drag" ? <span className="text-[10px] font-semibold text-ink">drag</span> : null}
    </motion.div>
  );
}
