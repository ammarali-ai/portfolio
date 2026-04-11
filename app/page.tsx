import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { SkillsMarquee } from "@/components/skills-grid";
import { StatsCounter, type Stat } from "@/components/stats-counter";
import { NowSection } from "@/components/now-section";
import { Testimonials } from "@/components/testimonials";
import { GitHubGraph } from "@/components/github-graph";
import {
  getProfile,
  getProjects,
  getSkills,
  getExperience,
  getCertifications,
  getNow,
  getTestimonials,
} from "@/lib/content";

export default async function HomePage() {
  const profile = await getProfile();
  const projects = await getProjects();
  const skills = getSkills();
  const experience = getExperience();
  const certifications = getCertifications();
  const now = getNow();
  const testimonials = getTestimonials();
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  const recent = experience.slice(0, 2);

  const stats: Stat[] = [
    { value: 500, suffix: "+", label: "Users supported" },
    { value: 92, suffix: "%", label: "Model accuracy" },
    { value: certifications.length, suffix: "+", label: "Certifications" },
    { value: projects.length, suffix: "", label: "AI projects shipped" },
  ];

  return (
    <>
      <Hero
        name={profile.name}
        role={profile.role}
        title={profile.title}
        bio={profile.bio}
        avatar={profile.avatar}
      />

      <SkillsMarquee categories={skills} />

      {now.status && (
        <section className="container-wide pt-14 md:pt-16">
          <NowSection status={now.status} updated={now.updated} />
        </section>
      )}

      <section className="container-wide pt-14 md:pt-16">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
            By the numbers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Impact at a glance</h2>
        </div>
        <StatsCounter stats={stats} />
      </section>

      <section className="container-wide py-14 md:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
              Featured Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Selected Projects</h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg"
          >
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="container-wide py-14 md:py-20">
        <div className="mb-10">
          <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
            Where I&apos;ve Worked
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Recent Experience</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {recent.map((e) => (
            <div key={e.company} className="card">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{e.role}</h3>
                <time className="font-mono text-xs text-fg-muted">
                  {e.start} – {e.end}
                </time>
              </div>
              <p className="text-sm text-accent-cyan font-medium mt-0.5">{e.company}</p>
              <p className="mt-3 text-sm text-fg-muted line-clamp-3">{e.bullets[0]}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/experience" className="btn-ghost">
            Full timeline <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="container-wide py-14 md:py-20">
        <div className="mb-10 text-center">
          <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
            Open Source
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">GitHub Activity</h2>
          <p className="mt-3 text-fg-muted max-w-xl mx-auto">
            Live contribution graph pulled from GitHub — fresh every visit.
          </p>
        </div>
        <GitHubGraph />
      </section>

      {testimonials.length > 0 && (
        <section className="container-wide py-14 md:py-20">
          <div className="mb-10">
            <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">
              What People Say
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Testimonials</h2>
          </div>
          <Testimonials items={testimonials} />
        </section>
      )}

      <section className="container-wide py-14 md:py-20">
        <div className="card text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Let&apos;s build something intelligent.</h2>
          <p className="mt-3 text-fg-muted max-w-xl mx-auto">
            Open to AI, ML, and automation collaborations. Reach out anytime.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/resume" className="btn-ghost">View Resume</Link>
          </div>
        </div>
      </section>
    </>
  );
}
