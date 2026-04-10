import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { getProfile } from "@/lib/content";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const profile = await getProfile();
  return (
    <div className="container-wide py-16 md:py-24">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Contact</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Let&apos;s Talk</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        Have a project in mind? Drop a message — I&apos;ll get back to you soon.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <aside className="space-y-3">
          <div className="card flex items-center gap-3">
            <Mail className="h-5 w-5 text-accent-cyan" />
            <div>
              <p className="text-xs text-fg-muted">Email</p>
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <Phone className="h-5 w-5 text-accent-cyan" />
            <div>
              <p className="text-xs text-fg-muted">Phone</p>
              <p className="text-sm">{profile.phone}</p>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <MapPin className="h-5 w-5 text-accent-cyan" />
            <div>
              <p className="text-xs text-fg-muted">Location</p>
              <p className="text-sm">{profile.location}</p>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <Linkedin className="h-5 w-5 text-accent-cyan" />
            <div>
              <p className="text-xs text-fg-muted">LinkedIn</p>
              <p className="text-sm">{profile.linkedin}</p>
            </div>
          </div>
          <div className="card flex items-center gap-3">
            <Github className="h-5 w-5 text-accent-cyan" />
            <div>
              <p className="text-xs text-fg-muted">GitHub</p>
              <p className="text-sm">{profile.github}</p>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-2 card">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
