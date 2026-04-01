"use client";

import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useEffect, useMemo, useState } from "react";

import { Card } from "@/components/ui/Card";
import type { Idea } from "@/types";

interface NodeDatum extends SimulationNodeDatum {
  id: string;
  title: string;
  priority: number;
  x?: number;
  y?: number;
}

interface LinkDatum extends SimulationLinkDatum<NodeDatum> {
  source: string | NodeDatum;
  target: string | NodeDatum;
}

export function IdeaGalaxy({ ideas }: { ideas: Idea[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const graph = useMemo(() => {
    const nodes: NodeDatum[] = ideas.map((idea) => ({
      id: idea.id,
      title: idea.title,
      priority: idea.priorityScore,
      x: 0,
      y: 0,
    }));

    const links: LinkDatum[] = [];

    for (let i = 0; i < ideas.length; i += 1) {
      for (let j = i + 1; j < ideas.length; j += 1) {
        const a = ideas[i];
        const b = ideas[j];
        const shared = a.tags.some((tag) => b.tags.includes(tag));
        const dependency = a.dependencies.includes(b.id) || b.dependencies.includes(a.id);
        if (shared || dependency) {
          links.push({ source: a.id, target: b.id });
        }
      }
    }

    return { nodes, links };
  }, [ideas]);

  useEffect(() => {
    if (graph.nodes.length === 0) {
      return;
    }

    const simulation = forceSimulation(graph.nodes)
      .force("charge", forceManyBody().strength(-130))
      .force("center", forceCenter(280, 210))
      .force("x", forceX(280).strength(0.02))
      .force("y", forceY(210).strength(0.02))
      .force(
        "link",
        forceLink(graph.links)
          .id((d) => (d as NodeDatum).id)
          .distance(92),
      );

    simulation.tick(120);
    simulation.stop();

    return () => {
      simulation.stop();
    };
  }, [graph]);

  return (
    <Card className="space-y-3">
      <div>
        <h2 className="text-xl font-semibold text-ink">Idea Galaxy</h2>
        <p className="text-sm text-ink-muted">Ideas are linked by shared tags and dependencies.</p>
      </div>

      <svg viewBox="0 0 560 420" className="w-full rounded-xl border border-border bg-bg-soft">
        {graph.links.map((link, index) => {
          const source = link.source as NodeDatum;
          const target = link.target as NodeDatum;
          return (
            <line
              key={`${index}-${source.id}-${target.id}`}
              x1={source.x ?? 0}
              y1={source.y ?? 0}
              x2={target.x ?? 0}
              y2={target.y ?? 0}
              stroke="var(--border)"
              strokeWidth="1.2"
              opacity="0.8"
            />
          );
        })}

        {graph.nodes.map((node) => {
          const isActive = activeId === node.id;
          const radius = 10 + node.priority / 14;
          return (
            <g key={node.id} transform={`translate(${node.x ?? 0}, ${node.y ?? 0})`}>
              <circle
                r={radius}
                fill="var(--accent)"
                opacity={isActive ? 1 : 0.78}
                onMouseEnter={() => setActiveId(node.id)}
                onMouseLeave={() => setActiveId(null)}
                className="cursor-pointer"
              />
              <text y={radius + 14} textAnchor="middle" fill="var(--ink-muted)" fontSize="10">
                {node.title.slice(0, 18)}
              </text>
            </g>
          );
        })}
      </svg>

      {activeId ? (
        <p className="text-sm text-ink-muted">
          Focused node: {ideas.find((idea) => idea.id === activeId)?.title}
        </p>
      ) : null}
    </Card>
  );
}
