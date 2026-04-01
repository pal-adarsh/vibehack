"use client";

import { useState } from "react";

import { DrawCheckIcon } from "@/components/ui/AnimatedIcons";
import { AppScaffold } from "@/components/layout/AppScaffold";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePersistentState } from "@/hooks/usePersistentState";
import { uid } from "@/lib/utils";

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = usePersistentState<TodoItem[]>("sbos-todos", []);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) {
      return;
    }

    setTodos((prev) => [{ id: uid("todo"), text: input.trim(), done: false }, ...prev]);
    setInput("");
  };

  return (
    <AppScaffold>
      <Card className="space-y-3">
        <h2 className="text-xl font-semibold text-ink">To-Do List</h2>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Add a task"
            className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-ink"
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
      </Card>

      <Card className="mt-4 space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between rounded-lg border border-border p-2">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-ink"
              onClick={() =>
                setTodos((prev) =>
                  prev.map((item) => (item.id === todo.id ? { ...item, done: !item.done } : item)),
                )
              }
            >
              <span className={`grid h-5 w-5 place-items-center rounded border ${todo.done ? "border-[#2f9d61] text-[#2f9d61]" : "border-border text-transparent"}`}>
                <DrawCheckIcon checked={todo.done} />
              </span>
              <span className={todo.done ? "line-through text-ink-muted" : ""}>{todo.text}</span>
            </button>
            <Button variant="ghost" onClick={() => setTodos((prev) => prev.filter((item) => item.id !== todo.id))}>
              Delete
            </Button>
          </div>
        ))}
      </Card>
    </AppScaffold>
  );
}
