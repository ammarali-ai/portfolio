import { cn } from "@/lib/utils";

export function TechChip({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-xs text-muted-foreground",
        className,
      )}
    >
      {name}
    </span>
  );
}
