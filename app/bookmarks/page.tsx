"use client";

import { useState } from "react";

import { AppScaffold } from "@/components/layout/AppScaffold";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePersistentState } from "@/hooks/usePersistentState";
import { uid } from "@/lib/utils";

interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  tags: string;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = usePersistentState<BookmarkItem[]>("sbos-bookmarks", []);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  const addBookmark = () => {
    try {
      const parsed = new URL(url.trim());
      setBookmarks((prev) => [
        {
          id: uid("bookmark"),
          title: title.trim() || parsed.hostname,
          url: parsed.toString(),
          tags: tags.trim(),
        },
        ...prev,
      ]);

      setTitle("");
      setUrl("");
      setTags("");
    } catch {
      // Ignore invalid URL entries.
    }
  };

  return (
    <AppScaffold>
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">Bookmarks</h2>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-ink"
        />
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-ink"
        />
        <input
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="tags: ai, research"
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-ink"
        />
        <Button onClick={addBookmark}>Save Bookmark</Button>
      </Card>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="space-y-2">
            <a href={bookmark.url} target="_blank" rel="noreferrer" className="text-base font-semibold text-ink underline">
              {bookmark.title}
            </a>
            <p className="break-all text-sm text-ink-muted">{bookmark.url}</p>
            {bookmark.tags ? <p className="text-xs text-ink-muted">{bookmark.tags}</p> : null}
            <Button variant="ghost" onClick={() => setBookmarks((prev) => prev.filter((entry) => entry.id !== bookmark.id))}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </AppScaffold>
  );
}
