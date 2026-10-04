import type { Status } from "@/content/schema";
import { cn } from "@/lib/utils";

const styles: Record<Status, { label: string; className: string }> = {
  built: { label: "Built", className: "border-brand/40 bg-brand/10 text-brand" },
  "in-progress": {
    label: "In progress",
    className: "border-brand-2/40 bg-brand-2/10 text-brand-2",
  },
  exploring: { label: "Exploring", className: "border-border bg-muted text-muted-foreground" },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium",
        s.className,
        className,
      )}
    >
      {s.label}
    </span>
  );
}
