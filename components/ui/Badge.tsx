import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  tone?: "default" | "good" | "warn" | "hot";
  className?: string;
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  default: "bg-panel text-ink-muted border border-border",
  good: "bg-[#1f5d3a] text-[#d6ffe8]",
  warn: "bg-[#7a4a15] text-[#ffe9c9]",
  hot: "bg-[#7a1f1f] text-[#ffd7d7]",
};

export function Badge({ label, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}
