import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { featuredProjects } from "@/content/projects";
import { domains } from "@/content/domains";

/** Compact, serializable snapshot of site content for the terminal easter egg. */
export interface TerminalData {
  name: string;
  roles: readonly string[];
  location: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string | null;
  skills: readonly { category: string; items: readonly string[] }[];
  projects: readonly { slug: string; title: string; impact: string }[];
  domains: readonly { id: string; title: string; status: string }[];
}

export const terminalData: TerminalData = {
  name: profile.name,
  roles: profile.roles,
  location: profile.location,
  summary: profile.summary,
  email: profile.email,
  github: profile.links.github,
  linkedin: profile.links.linkedin,
  resumeUrl: profile.resumeUrl,
  skills: skillGroups.map(({ category, items }) => ({ category, items })),
  projects: featuredProjects.map(({ slug, title, impact }) => ({ slug, title, impact })),
  domains: domains.map(({ id, title, status }) => ({ id, title, status })),
};
