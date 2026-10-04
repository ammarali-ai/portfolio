import { Download, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { sections } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";

export function Contact() {
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    {
      label: "LinkedIn",
      value: profile.links.linkedin.replace("https://www.", ""),
      href: profile.links.linkedin,
      Icon: LinkedInIcon,
    },
    {
      label: "GitHub",
      value: profile.links.github.replace("https://", ""),
      href: profile.links.github,
      Icon: GitHubIcon,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading copy={sections.contact} id="contact-title" className="mb-8 md:mb-10" />
          <ul className="space-y-3">
            {links.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-brand/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:text-brand">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{label}</span>
                    <span className="block truncate text-sm font-medium">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            {profile.resumeUrl && (
              <li>
                <a
                  href={profile.resumeUrl}
                  download
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-brand/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground group-hover:text-brand">
                    <Download className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">Download CV (PDF)</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
