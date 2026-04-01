"use client";

import { useEffect, useRef } from "react";

import { useToast } from "@/components/ui/Toast";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";

export function OfflineQueueSync() {
  const { isOnline, pendingCount } = useOfflineQueue();
  const { push } = useToast();
  const lastOnline = useRef<boolean | null>(null);

  useEffect(() => {
    if (lastOnline.current === null) {
      lastOnline.current = isOnline;
      return;
    }

    if (!isOnline && lastOnline.current) {
      push({ title: "Offline mode", description: "Actions will be queued and synced later.", tone: "info" });
    }

    if (isOnline && !lastOnline.current) {
      push({ title: "Back online", description: "Queued actions are syncing.", tone: "success" });
    }

    lastOnline.current = isOnline;
  }, [isOnline, push]);

  useEffect(() => {
    if (pendingCount > 0) {
      push({
        title: "Pending sync",
        description: `${pendingCount} queued action${pendingCount > 1 ? "s" : ""}.`,
        tone: "info",
      });
    }
  }, [pendingCount, push]);

  return null;
}
