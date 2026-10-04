import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cvRankerCopy } from "@/content/sections";
import { SectionHeading } from "@/components/ui/section-heading";
import { CvRanker } from "@/components/tools/cv-ranker";

export const metadata: Metadata = {
  title: "CV Ranker",
  description:
    "Score how well a CV matches a job description with Claude: match score, matched and missing skills, and honest rewrite tips.",
};

export default function CvRankerPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to projects
      </Link>
      <SectionHeading copy={cvRankerCopy} id="cv-ranker-title" />
      <CvRanker privacyNote={cvRankerCopy.privacy} />
    </div>
  );
}
