import Link from "next/link";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { DiscordIcon } from "./discord-icon";
import { getProfile } from "@/lib/content";

export async function Footer() {
  const profile = await getProfile();
  const s = profile.socials;
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-wide py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fg-muted">
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js.</p>
        <div className="flex items-center gap-4">
          <Link href={s.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-fg transition">
            <Github className="h-4 w-4" />
          </Link>
          <Link href={s.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-fg transition">
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link href={s.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-fg transition">
            <Instagram className="h-4 w-4" />
          </Link>
          <Link
            href={`https://discord.com/users/${s.discord_user_id}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
            className="hover:text-fg transition"
          >
            <DiscordIcon className="h-4 w-4" />
          </Link>
          <Link href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-fg transition">
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
