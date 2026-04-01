"use client";

import { useState } from "react";

import { AppScaffold } from "@/components/layout/AppScaffold";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePersistentState } from "@/hooks/usePersistentState";
import { uid } from "@/lib/utils";

interface NoteItem {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = usePersistentState<NoteItem[]>("sbos-notes", []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = () => {
    if (!title.trim() && !body.trim()) {
      return;
    }

    setNotes((prev) => [
      {
        id: uid("note"),
        title: title.trim() || "Untitled note",
        body: body.trim(),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setTitle("");
    setBody("");
  };

  const remove = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <AppScaffold>
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">Notes</h2>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Note title"
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-ink"
        />
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={5}
          placeholder="Write your note..."
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-ink"
        />
        <Button onClick={addNote}>Save Note</Button>
      </Card>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="space-y-2">
            <p className="text-base font-semibold text-ink">{note.title}</p>
            <p className="whitespace-pre-wrap text-sm text-ink-muted">{note.body}</p>
            <Button variant="ghost" onClick={() => remove(note.id)}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </AppScaffold>
  );
}
