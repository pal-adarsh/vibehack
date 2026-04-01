import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-[skeleton_1.25s_ease-in-out_infinite] rounded-lg bg-[linear-gradient(90deg,var(--panel),color-mix(in_oklab,var(--panel)_75%,var(--accent)),var(--panel))] bg-size-[240%_100%]",
        className,
      )}
    />
  );
}
