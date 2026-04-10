import { Award } from "lucide-react";
import { getCertifications } from "@/lib/content";

export const metadata = { title: "Certifications" };

export default function CertificationsPage() {
  const items = getCertifications();
  return (
    <div className="container-wide py-16 md:py-24 max-w-4xl">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Training</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Certifications</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        Continuous learning across AI, data science, networking, and cybersecurity.
      </p>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {items.map((c, i) => (
          <li key={`${c.title}-${i}`} className="card flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-cyan/10 border border-accent-cyan/30">
              <Award className="h-4 w-4 text-accent-cyan" />
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-snug">{c.title}</h3>
              <p className="text-xs text-fg-muted mt-1">
                {c.issuer} · <span className="font-mono">{c.date}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
