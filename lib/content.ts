import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Profile = {
  name: string;
  role: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  bio: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  bullets: string[];
};

export type SkillCategory = { name: string; items: string[] };

export type EducationItem = {
  institution: string;
  degree: string;
  focus: string;
  start: string;
  end: string;
  cgpa: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
};

export type ConferenceItem = {
  name: string;
  host: string;
  date: string;
};

export type Project = {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  tech: string[];
  github: string;
  demo: string;
  featured: boolean;
  order: number;
  cover: string;
  bodyHtml: string;
  bodyRaw: string;
};

function readMd(relPath: string) {
  const fullPath = path.join(CONTENT_DIR, relPath);
  const raw = fs.readFileSync(fullPath, "utf8");
  return matter(raw);
}

async function mdToHtml(md: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml).process(md);
  return String(file);
}

export async function getProfile(): Promise<Profile> {
  const { data, content } = readMd("profile.md");
  return {
    name: data.name ?? "",
    role: data.role ?? "",
    title: data.title ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    linkedin: data.linkedin ?? "",
    github: data.github ?? "",
    location: data.location ?? "",
    bio: content.trim(),
  };
}

export async function getAboutHtml(): Promise<string> {
  const { content } = readMd("about.md");
  return mdToHtml(content);
}

export function getExperience(): ExperienceItem[] {
  const { data } = readMd("experience.md");
  return (data.items ?? []) as ExperienceItem[];
}

export function getSkills(): SkillCategory[] {
  const { data } = readMd("skills.md");
  return (data.categories ?? []) as SkillCategory[];
}

export function getEducation(): EducationItem[] {
  const { data } = readMd("education.md");
  return (data.items ?? []) as EducationItem[];
}

export function getCertifications(): CertificationItem[] {
  const { data } = readMd("certifications.md");
  return (data.items ?? []) as CertificationItem[];
}

export function getConferences(): ConferenceItem[] {
  const { data } = readMd("conferences.md");
  return (data.items ?? []) as ConferenceItem[];
}

export async function getProjects(): Promise<Project[]> {
  const dir = path.join(CONTENT_DIR, "projects");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const projects = await Promise.all(
    files.map(async (file) => {
      const { data, content } = readMd(path.join("projects", file));
      const bodyHtml = await mdToHtml(content);
      return {
        title: data.title ?? "",
        slug: data.slug ?? file.replace(/\.md$/, ""),
        summary: data.summary ?? "",
        tags: data.tags ?? [],
        tech: data.tech ?? [],
        github: data.github ?? "",
        demo: data.demo ?? "",
        featured: data.featured ?? false,
        order: data.order ?? 99,
        cover: data.cover ?? "",
        bodyHtml,
        bodyRaw: content,
      } as Project;
    }),
  );
  return projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCvContext(): Promise<string> {
  const profile = await getProfile();
  const experience = getExperience();
  const skills = getSkills();
  const education = getEducation();
  const certifications = getCertifications();
  const projects = await getProjects();

  const expText = experience
    .map(
      (e) =>
        `${e.role} — ${e.company} (${e.start} – ${e.end})\n${e.bullets.map((b) => `  • ${b}`).join("\n")}`,
    )
    .join("\n\n");

  const skillsText = skills
    .map((c) => `${c.name}: ${c.items.join(", ")}`)
    .join("\n");

  const eduText = education
    .map(
      (e) =>
        `${e.degree} (${e.focus}) — ${e.institution} (${e.start} – ${e.end}), CGPA ${e.cgpa}`,
    )
    .join("\n");

  const certText = certifications
    .map((c) => `• ${c.title} — ${c.issuer} (${c.date})`)
    .join("\n");

  const projText = projects
    .map(
      (p) =>
        `${p.title}${p.featured ? " (featured)" : ""}\n  Tech: ${p.tech.join(", ")}\n  ${p.summary}`,
    )
    .join("\n\n");

  return `# Muhammad Ammar Ali — CV
Role: ${profile.role}
Title: ${profile.title}
Email: ${profile.email}
Phone: ${profile.phone}
Location: ${profile.location}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}

## About
${profile.bio}

## Experience
${expText}

## Projects
${projText}

## Skills
${skillsText}

## Education
${eduText}

## Certifications
${certText}
`;
}
