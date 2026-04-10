import { getAboutHtml, getEducation, getConferences, getProfile } from "@/lib/content";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const html = await getAboutHtml();
  const profile = await getProfile();
  const education = getEducation();
  const conferences = getConferences();

  return (
    <div className="container-wide py-16 md:py-24">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">About</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">{profile.name}</h1>
      <p className="text-fg-muted font-mono mt-1">{profile.title} · {profile.role}</p>

      <div className="grid gap-10 lg:grid-cols-3 mt-12">
        <article className="lg:col-span-2 card">
          <div className="prose-md" dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        <aside className="space-y-6">
          <div className="card">
            <h3 className="text-sm font-mono uppercase tracking-wider text-accent-cyan">Contact</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div><dt className="text-fg-muted">Email</dt><dd>{profile.email}</dd></div>
              <div><dt className="text-fg-muted">Phone</dt><dd>{profile.phone}</dd></div>
              <div><dt className="text-fg-muted">Location</dt><dd>{profile.location}</dd></div>
              <div><dt className="text-fg-muted">LinkedIn</dt><dd>{profile.linkedin}</dd></div>
              <div><dt className="text-fg-muted">GitHub</dt><dd>{profile.github}</dd></div>
            </dl>
          </div>

          <div className="card">
            <h3 className="text-sm font-mono uppercase tracking-wider text-accent-cyan">Education</h3>
            {education.map((e) => (
              <div key={e.institution} className="mt-3">
                <p className="font-semibold">{e.degree}</p>
                <p className="text-xs text-fg-muted">{e.focus}</p>
                <p className="text-sm mt-1">{e.institution}</p>
                <p className="font-mono text-xs text-fg-muted mt-1">{e.start} – {e.end} · CGPA {e.cgpa}</p>
              </div>
            ))}
          </div>

          <div className="card">
            <h3 className="text-sm font-mono uppercase tracking-wider text-accent-cyan">Conferences</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {conferences.map((c) => (
                <li key={c.name}>
                  <p className="text-fg">{c.name}</p>
                  <p className="text-xs text-fg-muted">{c.host} · {c.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
