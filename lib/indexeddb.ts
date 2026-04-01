"use client";

import type { QueueItem } from "@/types";

const DB_NAME = "sbos-db";
const STORE_NAME = "offline-queue";
const VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Failed to open IndexedDB."));
  });
}

export async function queueRequest(item: QueueItem): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(new Error("Failed to queue request."));
  });
  db.close();
}

export async function listQueuedRequests(): Promise<QueueItem[]> {
  const db = await openDb();
  const data = await new Promise<QueueItem[]>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result as QueueItem[]);
    request.onerror = () => reject(new Error("Failed to read queued requests."));
  });
  db.close();
  return data;
}

export async function deleteQueuedRequest(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(new Error("Failed to delete queued request."));
  });
  db.close();
}
