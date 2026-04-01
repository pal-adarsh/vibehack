"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { CustomCursor } from "@/components/effects/CustomCursor";
import { DeadlineNotifier } from "@/components/effects/DeadlineNotifier";
import { OfflineQueueSync } from "@/components/effects/OfflineQueueSync";
import { PWAProvider } from "@/components/effects/PWAProvider";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { ToastProvider } from "@/components/ui/Toast";
import { useTheme } from "@/hooks/useTheme";

function ThemeBridge() {
  useTheme();
  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PWAProvider>
        <ToastProvider>
          <ThemeBridge />
          <DeadlineNotifier />
          <OfflineQueueSync />
          <ParticleBackground />
          <CustomCursor />
          {children}
        </ToastProvider>
      </PWAProvider>
    </QueryClientProvider>
  );
}
