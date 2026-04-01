"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrainPulseIcon } from "@/components/ui/AnimatedIcons";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ideas", label: "Idea Inbox" },
  { href: "/board", label: "Execution Board" },
  { href: "/summarizer", label: "Summarizer" },
  { href: "/galaxy", label: "Idea Galaxy" },
  { href: "/focus", label: "Focus Mode" },
  { href: "/report", label: "Weekly Report" },
  { href: "/rooms", label: "Rooms" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-panel/45 p-5 lg:block">
      <div className="mb-8 flex items-center gap-3">
        <BrainPulseIcon className="h-9 w-9 text-accent" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Second Brain</p>
          <p className="text-lg font-semibold text-ink">OS</p>
        </div>
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-xl px-3 py-2 text-sm font-medium transition",
              pathname === link.href
                ? "bg-accent text-accent-contrast"
                : "text-ink-muted hover:bg-panel hover:text-ink",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
