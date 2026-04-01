import { Card } from "@/components/ui/Card";

interface StatsGridProps {
  captured: number;
  inProgress: number;
  done: number;
  streak: number;
}

export function StatsGrid({ captured, inProgress, done, streak }: StatsGridProps) {
  const cards = [
    { label: "Ideas Captured", value: captured },
    { label: "In Progress", value: inProgress },
    { label: "Shipped", value: done },
    { label: "Execution Streak", value: `${streak}d` },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="space-y-1">
          <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">{card.label}</p>
          <p className="text-2xl font-bold text-ink">{card.value}</p>
        </Card>
      ))}
    </div>
  );
}
