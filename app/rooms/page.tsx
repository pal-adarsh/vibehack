"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { AppScaffold } from "@/components/layout/AppScaffold";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { uid } from "@/lib/utils";

interface RoomMessage {
  type: "cursor" | "comment";
  userId: string;
  payload: unknown;
}

interface CursorPayload {
  x: number;
  y: number;
  label: string;
}

interface CommentPayload {
  text: string;
  createdAt: string;
}

export default function RoomsPage() {
  const [roomName, setRoomName] = useState("hackathon-room");
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentPayload[]>([]);
  const [cursors, setCursors] = useState<Record<string, CursorPayload>>({});

  const userId = useMemo(() => uid("user"), []);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel(`sbos-${roomName}`);
    channelRef.current = channel;

    const onMessage = (event: MessageEvent<RoomMessage>) => {
      const message = event.data;
      if (message.userId === userId) {
        return;
      }

      if (message.type === "comment") {
        setComments((prev) => [...prev, message.payload as CommentPayload]);
      }

      if (message.type === "cursor") {
        setCursors((prev) => ({
          ...prev,
          [message.userId]: message.payload as CursorPayload,
        }));
      }
    };

    channel.addEventListener("message", onMessage);

    return () => {
      channel.removeEventListener("message", onMessage);
      channel.close();
    };
  }, [roomName, userId]);

  const broadcast = (message: RoomMessage) => {
    channelRef.current?.postMessage(message);
  };

  const postComment = () => {
    if (!input.trim()) {
      return;
    }
    const payload: CommentPayload = { text: input.trim(), createdAt: new Date().toISOString() };
    broadcast({ type: "comment", userId, payload } satisfies RoomMessage);
    setComments((prev) => [...prev, payload]);
    setInput("");
  };

  return (
    <AppScaffold>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-ink">Collaborative Execution Room</h2>
            <input
              value={roomName}
              onChange={(event) => setRoomName(event.target.value || "hackathon-room")}
              className="rounded-lg border border-border bg-bg-soft px-3 py-1 text-sm text-ink"
            />
          </div>

          <div
            className="relative h-90 rounded-xl border border-border bg-bg-soft"
            onMouseMove={(event) => {
              const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
              broadcast({
                type: "cursor",
                userId,
                payload: {
                  x: event.clientX - rect.left,
                  y: event.clientY - rect.top,
                  label: userId.slice(0, 6),
                },
              } satisfies RoomMessage);
            }}
          >
            {Object.entries(cursors).map(([id, cursor]) => (
              <div key={id} className="absolute" style={{ left: cursor.x, top: cursor.y }}>
                <div className="h-3 w-3 rounded-full bg-accent" />
                <p className="text-[10px] text-ink-muted">{cursor.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <h3 className="text-base font-semibold text-ink">Room Comments</h3>
          <div className="max-h-65 space-y-2 overflow-auto rounded-lg border border-border bg-bg-soft p-2 text-sm text-ink-muted">
            {comments.map((comment, index) => (
              <p key={`${comment.createdAt}-${index}`}>- {comment.text}</p>
            ))}
          </div>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-bg-soft px-2 py-1 text-sm text-ink"
            placeholder="Leave a comment for your team"
          />
          <Button onClick={postComment}>Send</Button>
        </Card>
      </div>
    </AppScaffold>
  );
}
