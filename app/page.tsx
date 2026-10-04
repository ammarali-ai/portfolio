import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { buttonVariants } from "@/components/ui/button";

// Phase 2 foundation preview. Phase 3 replaces this with the full section components.
const upcoming = [
  { id: "domains", title: "Research & Domains" },
  { id: "projects", title: "Featured Projects" },
  { id: "automation", title: "Live Automation" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Tech Arsenal" },
  { id: "certifications", title: "Certifications" },
  { id: "contact", title: "Contact" },
] as const;

export default function Home() {
  return (
    <>
      <section className="container-page grid items-center gap-12 pt-16 pb-24 md:grid-cols-[1.4fr_1fr] md:pt-24">
        <div>
          {profile.availability && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
              {profile.availability}
            </p>
          )}
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">{profile.name}</h1>
          <p className="mt-4 font-mono text-lg text-brand sm:text-xl">{profile.roles[0]}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.summary}
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" /> {profile.location}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#projects" className={buttonVariants({ size: "lg" })}>
              View work <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <Link href="/#contact" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Contact
            </Link>
          </div>
        </div>

        <div className="glow-border relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card">
          <Image
            src={profile.photo.src}
            alt={profile.photo.alt}
            fill
            priority
            sizes="(min-width: 768px) 384px, 90vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
      </section>

      {upcoming.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-title`}
          className="container-page py-12"
        >
          <div className="rounded-2xl border border-dashed border-border p-8">
            <h2 id={`${s.id}-title`} className="text-2xl font-semibold">
              {s.title}
            </h2>
            <p className="mt-2 font-mono text-sm text-muted-foreground">Coming in Phase 3</p>
          </div>
        </section>
      ))}
    </>
  );
}
