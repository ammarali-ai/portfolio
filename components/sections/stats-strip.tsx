import { stats } from "@/content/stats";
import { Counter } from "@/components/ui/counter";

const showVerifyHints = process.env.NODE_ENV === "development";

export function StatsStrip() {
  return (
    <section aria-label="Key numbers" className="container-page">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative flex flex-col gap-1 bg-card px-5 py-6 last:col-span-2 lg:last:col-span-1"
            title={showVerifyHints ? `Source: ${stat.source}` : undefined}
          >
            <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="order-1 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </dd>
            {showVerifyHints && stat.needsVerification && (
              <span className="absolute top-2 right-2 rounded bg-brand-2/15 px-1.5 py-0.5 font-mono text-[10px] text-brand-2">
                verify
              </span>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
