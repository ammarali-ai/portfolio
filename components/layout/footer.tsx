import Link from "next/link";
import { Mail } from "lucide-react";
import { profile, siteNav } from "@/content/profile";
import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/brand-icons";

const socials = [
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  { label: "GitHub", href: profile.links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedInIcon },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-heading text-lg font-semibold">{profile.name}</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {profile.roles[0]} · {profile.location}. Building AI that ships: LLM automation, NLP and
            computer vision.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Explore
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {siteNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Connect
          </p>
          <ul className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            Built with Next.js, Three.js &amp; Claude ·{" "}
            <a
              href={site.repo}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
