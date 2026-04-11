import { CvRankerForm } from "@/components/cv-ranker-form";

export const metadata = {
  title: "CV Ranker",
  description:
    "Paste your CV and a job description — Gemini scores the match, lists keywords, and suggests rewrites.",
};

export default function CvRankerPage() {
  return (
    <div className="container-wide py-16 md:py-24 max-w-5xl">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Tools</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">CV Ranker</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        An AI-powered ATS analyzer. Paste your CV + a job description. Gemini scores the match,
        pulls out matched and missing keywords, and gives you concrete rewrite suggestions.
      </p>
      <p className="mt-2 text-xs text-fg-muted">
        Nothing is stored. 5 analyses per IP every 10 minutes.
      </p>

      <div className="mt-10">
        <CvRankerForm />
      </div>
    </div>
  );
}
