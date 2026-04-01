import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-panel/80 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}
