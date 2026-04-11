import { ContactForm } from "@/components/contact-form";
import { DiscordIcon } from "@/components/discord-icon";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import { getProfile } from "@/lib/content";

export const metadata = { title: "Contact" };

type SocialRow = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
};

export default async function ContactPage() {
  const profile = await getProfile();
  const s = profile.socials;

  const rows: SocialRow[] = [
    {
      icon: <Mail className="h-5 w-5 text-accent-cyan" />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <Phone className="h-5 w-5 text-accent-cyan" />,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: <MapPin className="h-5 w-5 text-accent-cyan" />,
      label: "Location",
      value: profile.location,
      href: "",
    },
    {
      icon: <Linkedin className="h-5 w-5 text-accent-cyan" />,
      label: "LinkedIn",
      value: "muhammadammarali-ai",
      href: s.linkedin,
    },
    {
      icon: <Github className="h-5 w-5 text-accent-cyan" />,
      label: "GitHub",
      value: "ammarali-ai",
      href: s.github,
    },
    {
      icon: <Instagram className="h-5 w-5 text-accent-cyan" />,
      label: "Instagram",
      value: "@o_whois_ammar",
      href: s.instagram,
    },
    {
      icon: <DiscordIcon className="h-5 w-5 text-accent-cyan" />,
      label: "Discord",
      value: s.discord_username,
      href: `https://discord.com/users/${s.discord_user_id}`,
    },
  ];

  return (
    <div className="container-wide py-16 md:py-24">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Contact</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Let&apos;s Talk</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        Have a project in mind? Drop a message — I&apos;ll get back to you soon.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <aside className="space-y-3">
          {rows.map((r) => {
            const content = (
              <div className="card flex items-center gap-3 hover:border-accent-cyan/40 transition">
                {r.icon}
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-fg-muted">{r.label}</p>
                  <p className="text-sm truncate">{r.value}</p>
                </div>
              </div>
            );
            return r.href ? (
              <a
                key={r.label}
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={r.label}>{content}</div>
            );
          })}
        </aside>

        <div className="lg:col-span-2 card">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
