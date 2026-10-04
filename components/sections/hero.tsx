import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { domains } from "@/content/domains";
import { heroCopy } from "@/content/sections";
import { buttonVariants } from "@/components/ui/button";
import { RoleRotator } from "@/components/hero/role-rotator";
import { HeroVisual } from "@/components/hero/hero-visual";

/** Hero: intro + typing role rotator, with the 3D Neural Core (lazy) on the right. */
export function Hero() {
  const coreDomains = domains.map(({ id, title, status }) => ({ id, title, status }));

  return (
    <section
      aria-labelledby="hero-title"
      className="container-page grid items-center gap-10 pt-12 pb-16 md:grid-cols-[1.25fr_1fr] md:pt-20 md:pb-24"
    >
      <div>
        {profile.availability && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            {profile.availability}
          </p>
        )}
        <h1 id="hero-title" className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 h-8 font-mono text-lg text-brand sm:text-xl">
          <RoleRotator roles={profile.roles} />
        </p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.summary}
        </p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" /> {profile.location}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#projects" className={buttonVariants({ size: "lg" })}>
            View work <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <Download data-icon="inline-start" aria-hidden="true" /> Download CV
            </a>
          )}
          <Link href="/#contact" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Contact
          </Link>
        </div>
      </div>

      <HeroVisual photo={profile.photo} domains={coreDomains} legendLabel={heroCopy.domainLegend} />
    </section>
  );
}
