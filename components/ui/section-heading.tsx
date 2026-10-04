import type { SectionCopy } from "@/content/schema";
import { cn } from "@/lib/utils";

interface Props {
  copy: SectionCopy;
  /** id for aria-labelledby on the parent <section>. */
  id: string;
  className?: string;
}

export function SectionHeading({ copy, id, className }: Props) {
  return (
    <div className={cn("mb-10 max-w-2xl md:mb-14", className)}>
      <p className="mb-3 font-mono text-xs tracking-widest text-brand uppercase">{copy.eyebrow}</p>
      <h2 id={id} className="text-3xl font-semibold sm:text-4xl">
        {copy.title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {copy.description}
      </p>
    </div>
  );
}
