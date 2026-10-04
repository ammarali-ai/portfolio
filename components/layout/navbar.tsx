"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, SquareTerminal, X } from "lucide-react";
import { profile, siteNav } from "@/content/profile";
import { OPEN_TERMINAL_EVENT } from "@/lib/events";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-border glass" : "border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between gap-4"
      >
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg border border-border bg-card font-mono text-xs font-semibold text-brand transition-colors group-hover:border-brand/50"
          >
            MA
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {siteNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_TERMINAL_EVENT))}
            aria-label="Open terminal (shortcut: backtick key)"
            title="Terminal ( ` )"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <SquareTerminal className="size-4" aria-hidden="true" />
          </button>
          <ThemeToggle />
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download
              className={cn(buttonVariants({ size: "sm" }), "ml-1 hidden sm:inline-flex")}
            >
              Download CV
            </a>
          )}
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div id="mobile-nav" hidden={!open} className="border-t border-border lg:hidden">
        <ul className="container-page flex flex-col py-3">
          {siteNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-3 text-base text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
