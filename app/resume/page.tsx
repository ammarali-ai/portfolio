import Link from "next/link";
import { Download, FileText } from "lucide-react";

export const metadata = { title: "Resume" };

const RESUME_PATH = "/resume/Muhammad_Ammar_Ali_Resume_2026.pdf";

export default function ResumePage() {
  return (
    <div className="container-wide py-16 md:py-24">
      <p className="font-mono text-xs text-accent-cyan uppercase tracking-wider">Resume</p>
      <h1 className="text-4xl md:text-5xl font-bold mt-2">Curriculum Vitae</h1>
      <p className="mt-3 text-fg-muted max-w-2xl">
        Full resume available for download. Place your latest PDF at <code className="font-mono text-accent-cyan">/public{RESUME_PATH}</code>.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={RESUME_PATH} download className="btn-primary">
          <Download className="h-4 w-4" /> Download PDF
        </a>
        <Link href="/contact" className="btn-ghost">
          <FileText className="h-4 w-4" /> Request a copy
        </Link>
      </div>

      <div className="mt-12 card overflow-hidden p-0">
        <object
          data={RESUME_PATH}
          type="application/pdf"
          className="w-full h-[80vh] min-h-[600px]"
        >
          <div className="p-12 text-center text-fg-muted">
            <p>Your browser doesn&apos;t support inline PDFs.</p>
            <a href={RESUME_PATH} className="text-accent-cyan underline mt-2 inline-block">
              Click here to download the resume.
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
