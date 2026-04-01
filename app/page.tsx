"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import { BrainPulseIcon } from "@/components/ui/AnimatedIcons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const sections = [
  {
    title: "Capture",
    body: "Drop raw ideas, URLs, or voice transcripts into your inbox in seconds.",
  },
  {
    title: "Structure",
    body: "Gemini turns each idea into a plan with tasks, priority, and first action.",
  },
  {
    title: "Execute",
    body: "Ship through kanban, timeline, focus cycles, and weekly reflections.",
  },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.4]);

  return (
    <div className="min-h-screen overflow-x-clip px-4 pb-20 pt-10 md:px-8">
      <header className="mx-auto mb-12 flex w-full max-w-7xl items-center justify-between rounded-full border border-border bg-panel/80 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <BrainPulseIcon className="h-8 w-8 text-accent" />
          <p className="text-sm font-semibold text-ink">Second Brain OS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href="/ideas">Open Inbox</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Launch Dashboard</Link>
          </Button>
        </div>
      </header>

      <motion.section style={{ y: heroY, opacity: heroOpacity }} className="mx-auto w-full max-w-7xl">
        <Badge label="Stop Collecting. Start Executing." tone="warn" className="mb-4" />
        <h1 className="max-w-4xl text-4xl font-black leading-tight text-ink md:text-6xl">
          Ideas deserve shipping pipelines, not digital graveyards.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-ink-muted md:text-lg">
          Second Brain OS converts raw thought into trackable execution with AI planning, focus mode,
          and progress intelligence.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="px-6 py-3 text-base">
            <Link href="/ideas">Capture First Idea</Link>
          </Button>
          <Button asChild variant="secondary" className="px-6 py-3 text-base">
            <Link href="/board">See Execution Board</Link>
          </Button>
        </div>
      </motion.section>

      <section className="mx-auto mt-14 grid w-full max-w-7xl gap-4 md:grid-cols-3">
        {sections.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.1, duration: 0.45 }}
            className="rounded-2xl border border-border bg-panel/70 p-5 backdrop-blur"
          >
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-ink-muted">Step {index + 1}</p>
            <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
            <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
          </motion.article>
        ))}
      </section>

      <motion.section
        className="mx-auto mt-14 w-full max-w-7xl rounded-3xl border border-border bg-panel/75 p-6"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
      >
        <p className="text-xs uppercase tracking-[0.18em] text-ink-muted">Built for velocity</p>
        <div className="mt-2 grid gap-3 md:grid-cols-3">
          <p className="text-sm text-ink-muted">AI structuring, summarizer, weekly report, and autopsy engine</p>
          <p className="text-sm text-ink-muted">Kanban, timeline, galaxy, and distraction-free focus mode</p>
          <p className="text-sm text-ink-muted">PWA install, offline queue, and responsive mobile-first UX</p>
        </div>
      </motion.section>
    </div>
  );
}
