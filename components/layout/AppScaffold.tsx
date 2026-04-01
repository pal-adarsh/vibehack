"use client";

import type { ReactNode } from "react";

import { PageTransition } from "@/components/effects/PageTransition";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export function AppScaffold({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto w-full max-w-7xl">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
