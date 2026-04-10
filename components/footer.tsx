import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-wide py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fg-muted">
        <p>© {new Date().getFullYear()} Muhammad Ammar Ali. Built with Next.js.</p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/" aria-label="GitHub" className="hover:text-fg">
            <Github className="h-4 w-4" />
          </Link>
          <Link href="https://linkedin.com/" aria-label="LinkedIn" className="hover:text-fg">
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link href="mailto:muhammadammaralibhutta@gmail.com" aria-label="Email" className="hover:text-fg">
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
