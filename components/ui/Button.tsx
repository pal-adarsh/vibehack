"use client";

import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  asChild?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-accent-contrast shadow-[0_8px_30px_color-mix(in_oklab,var(--accent)_35%,transparent)] hover:bg-accent-strong",
  secondary:
    "bg-panel/80 text-ink border border-border hover:bg-panel",
  ghost: "bg-transparent text-ink-muted hover:text-ink hover:bg-panel/60",
};

export function Button({
  children,
  variant = "primary",
  className,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
