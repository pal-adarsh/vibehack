"use client";

import { useCallback, useEffect, useState } from "react";

import { deleteQueuedRequest, listQueuedRequests, queueRequest } from "@/lib/indexeddb";
import { uid } from "@/lib/utils";
import type { QueueItem } from "@/types";

export function useOfflineQueue() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const refreshQueueSize = useCallback(async () => {
    const items = await listQueuedRequests();
    setPendingCount(items.length);
  }, []);

  useEffect(() => {
    listQueuedRequests().then((items) => {
      setPendingCount(items.length);
    });
  }, []);

  const enqueue = useCallback(
    async (endpoint: string, payload: unknown) => {
      const item: QueueItem = {
        id: uid("queue"),
        endpoint,
        payload,
        createdAt: new Date().toISOString(),
      };

      await queueRequest(item);
      await refreshQueueSize();
    },
    [refreshQueueSize],
  );

  const flush = useCallback(async () => {
    if (!navigator.onLine) {
      return;
    }

    const items = await listQueuedRequests();

    for (const item of items) {
      try {
        await fetch(item.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.payload),
        });

        await deleteQueuedRequest(item.id);
      } catch {
        break;
      }
    }

    await refreshQueueSize();
  }, [refreshQueueSize]);

  useEffect(() => {
    if (isOnline) {
      queueMicrotask(() => {
        void flush();
      });
    }
  }, [flush, isOnline]);

  return {
    isOnline,
    pendingCount,
    enqueue,
    flush,
  };
}
