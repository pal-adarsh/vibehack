"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/board", label: "Board" },
  { href: "/focus", label: "Focus" },
  { href: "/notes", label: "Notes" },
  { href: "/bookmarks", label: "Links" },
  { href: "/todos", label: "To-Do" },
  { href: "/report", label: "Report" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-[color-mix(in_oklab,var(--panel)_90%,transparent)] px-3 py-2 backdrop-blur lg:hidden">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 rounded-lg px-3 py-2 text-center text-xs font-semibold",
              pathname === item.href ? "bg-accent text-accent-contrast" : "text-ink-muted",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
