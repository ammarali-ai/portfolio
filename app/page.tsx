import { Hero } from "@/components/sections/hero";
import { StatsStrip } from "@/components/sections/stats-strip";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Domains } from "@/components/sections/domains";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { AutomationShowcase } from "@/components/sections/automation-showcase";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <TechMarquee />
      <Domains />
      <FeaturedProjects />
      <AutomationShowcase />
      <ExperienceTimeline />
      <Skills />
      <Certifications />
      <Education />
      <Contact />
    </>
  );
}
