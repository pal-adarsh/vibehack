"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { usePWA } from "@/components/effects/PWAProvider";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";
import { useTheme } from "@/hooks/useTheme";

export function TopBar() {
  const { theme, cycleTheme } = useTheme();
  const { canInstall, promptInstall } = usePWA();
  const { isOnline, pendingCount } = useOfflineQueue();
  const { push } = useToast();
  const [installing, setInstalling] = useState(false);
  const notificationPermission =
    typeof Notification === "undefined" ? "unsupported" : Notification.permission;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_oklab,var(--bg)_78%,transparent)] px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Stop collecting</p>
          <h1 className="text-lg font-semibold text-ink">Start executing</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border px-2 py-1 text-xs text-ink-muted">
            {isOnline ? "Online" : "Offline"}
          </span>
          {pendingCount > 0 ? (
            <span className="rounded-full border border-border px-2 py-1 text-xs text-ink-muted">
              {pendingCount} queued
            </span>
          ) : null}
          <Button
            variant="secondary"
            onClick={cycleTheme}
            aria-label="Toggle theme"
            data-cursor="ring"
            className="capitalize"
          >
            {theme}
          </Button>
          {notificationPermission === "default" ? (
            <Button
              variant="secondary"
              onClick={async () => {
                const permission = await Notification.requestPermission();
                push({
                  title:
                    permission === "granted"
                      ? "Notifications enabled"
                      : "Notifications blocked",
                  tone: permission === "granted" ? "success" : "info",
                });
              }}
            >
              Enable Alerts
            </Button>
          ) : null}
          {canInstall ? (
            <Button
              variant="secondary"
              onClick={async () => {
                setInstalling(true);
                const installed = await promptInstall();
                setInstalling(false);
                push({
                  title: installed ? "App installed" : "Install dismissed",
                  tone: installed ? "success" : "info",
                });
              }}
              disabled={installing}
            >
              Install App
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
