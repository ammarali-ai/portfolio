import { marqueeTech } from "@/content/skills";
import { techIcon } from "@/lib/tech-icons";

function TechItem({ name }: { name: string }) {
  const icon = techIcon(name);
  return (
    <li className="flex shrink-0 items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground">
      {icon && (
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          <path d={icon.path} />
        </svg>
      )}
      <span className="font-mono text-sm">{name}</span>
    </li>
  );
}

/** CSS-only infinite marquee; pauses on hover, static and wrapped for reduced motion. */
export function TechMarquee() {
  return (
    <section aria-label="Core technologies" className="py-14">
      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          <ul className="flex shrink-0 gap-12 pr-12 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4 motion-reduce:px-4">
            {marqueeTech.map((name) => (
              <TechItem key={name} name={name} />
            ))}
          </ul>
          <ul className="flex shrink-0 gap-12 pr-12 motion-reduce:hidden" aria-hidden="true">
            {marqueeTech.map((name) => (
              <TechItem key={name} name={name} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
