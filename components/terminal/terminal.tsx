"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import type { TerminalData } from "@/lib/terminal-data";
import { scrollToId } from "@/lib/scroll";
import { OPEN_TERMINAL_EVENT } from "@/lib/events";

interface Line {
  id: number;
  kind: "in" | "out" | "err";
  content: ReactNode;
}

const HELP: [string, string][] = [
  ["help", "list commands"],
  ["whoami", "who is Ammar?"],
  ["skills", "tech arsenal by category"],
  ["projects", "featured projects (click to jump)"],
  ["research", "research domains + status"],
  ["contact", "email, LinkedIn, GitHub"],
  ["resume", "open the CV (PDF)"],
  ["clear", "clear the screen"],
  ["exit", "close the terminal"],
];
const COMMANDS = [...HELP.map(([c]) => c), "sudo hire ammar"];

function isEditable(el: EventTarget | null) {
  return (
    el instanceof HTMLElement &&
    (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))
  );
}

/** Retro terminal overlay. Opens with ` (backtick) or the navbar button. */
export function Terminal({ data }: { data: TerminalData }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [lines, setLines] = useState<Line[]>([]);

  const print = useCallback((kind: Line["kind"], content: ReactNode) => {
    setLines((prev) => [...prev, { id: nextId.current++, kind, content }]);
  }, []);

  const show = useCallback(() => {
    if (!dialogRef.current || dialogRef.current.open) return;
    dialogRef.current.showModal();
    setOpen(true);
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  const jumpTo = (id: string) => {
    close();
    window.setTimeout(() => scrollToId(id, lenis), 50);
  };

  // Global shortcuts: ` toggles open; custom event from the navbar button.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "`" || e.ctrlKey || e.metaKey || e.altKey || isEditable(e.target)) return;
      e.preventDefault();
      show();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_TERMINAL_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_TERMINAL_EVENT, show);
    };
  }, [show]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
    print("in", raw);
    if (!cmd) return;
    setHistory((h) => [raw, ...h].slice(0, 50));
    setCursor(-1);

    switch (cmd) {
      case "help":
      case "ls":
        print(
          "out",
          <ul>
            {HELP.map(([c, d]) => (
              <li key={c}>
                <span className="inline-block w-24 text-brand">{c}</span>
                <span className="text-muted-foreground">{d}</span>
              </li>
            ))}
          </ul>,
        );
        break;
      case "whoami":
        print(
          "out",
          <div>
            <p className="font-semibold text-foreground">{data.name}</p>
            <p className="text-brand">{data.roles.join(" · ")}</p>
            <p className="text-muted-foreground">{data.location}</p>
            <p className="mt-1">{data.summary}</p>
          </div>,
        );
        break;
      case "skills":
        print(
          "out",
          <ul className="space-y-1">
            {data.skills.map((g) => (
              <li key={g.category}>
                <span className="text-brand-2">{g.category}:</span> {g.items.join(", ")}
              </li>
            ))}
          </ul>,
        );
        break;
      case "projects":
        print(
          "out",
          <ul className="space-y-1">
            {data.projects.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => jumpTo(`project-${p.slug}`)}
                  className="text-left text-brand underline-offset-4 hover:underline"
                >
                  {p.title}
                </button>
                <span className="text-muted-foreground">: {p.impact}</span>
              </li>
            ))}
          </ul>,
        );
        break;
      case "research":
        print(
          "out",
          <ul className="space-y-1">
            {data.domains.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(`domain-${d.id}`)}
                  className="text-brand underline-offset-4 hover:underline"
                >
                  {d.title}
                </button>{" "}
                <span className="text-muted-foreground">[{d.status}]</span>
              </li>
            ))}
          </ul>,
        );
        break;
      case "contact":
        print(
          "out",
          <ul>
            <li>
              email:{" "}
              <a className="text-brand hover:underline" href={`mailto:${data.email}`}>
                {data.email}
              </a>
            </li>
            <li>
              linkedin:{" "}
              <a
                className="text-brand hover:underline"
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {data.linkedin.replace("https://www.", "")}
              </a>
            </li>
            <li>
              github:{" "}
              <a
                className="text-brand hover:underline"
                href={data.github}
                target="_blank"
                rel="noreferrer"
              >
                {data.github.replace("https://", "")}
              </a>
            </li>
          </ul>,
        );
        break;
      case "resume":
        if (data.resumeUrl) {
          window.open(data.resumeUrl, "_blank", "noopener");
          print("out", "Opening resume in a new tab…");
        } else print("err", "Resume not available yet.");
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        close();
        break;
      case "sudo hire ammar":
      case "hire":
      case "sudo hire":
        print(
          "out",
          <span className="text-leaf">Permission granted ✓ Opening the contact form…</span>,
        );
        window.setTimeout(() => jumpTo("contact"), 700);
        break;
      default:
        print("err", `command not found: ${cmd}. Type "help".`);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (next >= 0) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(value.trim().toLowerCase()) && value.trim());
      if (match) setValue(match);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === e.currentTarget && close()}
      aria-label="Terminal"
      className="m-auto w-[min(48rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-xl border border-border bg-background p-0 font-mono text-sm text-foreground shadow-2xl backdrop:bg-background/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2.5">
        <span className="size-3 rounded-full bg-flare/80" aria-hidden="true" />
        <span className="size-3 rounded-full bg-sun/80" aria-hidden="true" />
        <span className="size-3 rounded-full bg-leaf/80" aria-hidden="true" />
        <span className="ml-2 flex-1 truncate text-xs text-muted-foreground">
          ammar@portfolio: ~
        </span>
        <button
          type="button"
          onClick={close}
          aria-label="Close terminal"
          className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={bodyRef}
        className="h-[min(26rem,60vh)] space-y-1.5 overflow-y-auto p-4 leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        <p className="text-brand">
          Welcome to {data.name.split(" ").slice(-2).join(" ")}&apos;s terminal.
        </p>
        <p className="text-muted-foreground">
          Type &quot;help&quot; to get started. Tab completes, ↑ ↓ for history.
        </p>
        <div aria-live="polite" className="space-y-1.5">
          {lines.map((line) => (
            <div key={line.id} className={line.kind === "err" ? "text-flare" : undefined}>
              {line.kind === "in" ? (
                <p>
                  <span className="text-leaf">ammar@portfolio</span>
                  <span className="text-muted-foreground">:~$</span> {line.content}
                </p>
              ) : (
                line.content
              )}
            </div>
          ))}
        </div>
        <label className="flex items-center gap-2">
          <span className="shrink-0">
            <span className="text-leaf">ammar@portfolio</span>
            <span className="text-muted-foreground">:~$</span>
          </span>
          <span className="sr-only">Command</span>
          <input
            ref={inputRef}
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent caret-brand outline-none"
          />
        </label>
      </div>
    </dialog>
  );
}
