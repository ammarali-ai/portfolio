"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Workflow, X } from "lucide-react";
import type { FlowSpec } from "@/content/schema";
import { flowSourceLabel } from "@/lib/flow-kinds";
import { LazyFlow } from "./lazy-flow";

/** "How it works" button that opens the project's animated diagram in a modal dialog. */
export function FlowDialogButton({ spec, projectTitle }: { spec: FlowSpec; projectTitle: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="inline-flex items-center gap-1.5 rounded-md border border-brand/40 bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand transition-colors hover:bg-brand/20"
      >
        <Workflow className="size-3.5" aria-hidden="true" />
        How it works
        <span className="sr-only"> for {projectTitle}</span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-labelledby={`flow-${spec.id}-title`}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(64rem,calc(100vw-2rem))] max-w-none overflow-y-auto rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-background/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div>
            <p className="font-mono text-[11px] tracking-widest text-brand uppercase">
              {spec.context} · {flowSourceLabel[spec.source]}
            </p>
            <h3 id={`flow-${spec.id}-title`} className="mt-1 text-xl font-semibold">
              {spec.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{spec.description}</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close diagram"
            className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="p-4 sm:p-5">{open && <LazyFlow spec={spec} interactive />}</div>
      </dialog>
    </>
  );
}
