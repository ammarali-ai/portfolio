"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CONTACT_LIMITS, type ContactField, type ContactResponse } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const fields: {
  name: ContactField;
  label: string;
  type?: "email";
  autoComplete?: string;
  multiline?: boolean;
}[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject" },
  { name: "message", label: "Message", multiline: true },
];

const inputClass =
  "w-full rounded-lg border border-input bg-background/70 px-3 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactResponse["fields"]>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await res.json()) as ContactResponse;
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        setFieldErrors(data.fields ?? {});
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/70 p-10 text-center"
      >
        <CheckCircle2 className="size-10 text-brand" aria-hidden="true" />
        <p className="text-lg font-semibold">Message sent. Thank you!</p>
        <p className="text-sm text-muted-foreground">I&apos;ll reply to your email soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-brand underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative space-y-4 rounded-2xl border border-border bg-card/70 p-5 sm:p-6"
    >
      {fields.map((f) => {
        const id = `contact-${f.name}`;
        const errs = fieldErrors?.[f.name];
        const common = {
          id,
          name: f.name,
          required: true,
          maxLength: CONTACT_LIMITS[f.name],
          "aria-invalid": errs ? true : undefined,
          "aria-describedby": errs ? `${id}-error` : undefined,
          className: inputClass,
        };
        return (
          <div key={f.name}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
              {f.label}
            </label>
            {f.multiline ? (
              <textarea
                {...common}
                rows={5}
                minLength={CONTACT_LIMITS.messageMin}
                className={cn(inputClass, "resize-y")}
              />
            ) : (
              <input {...common} type={f.type ?? "text"} autoComplete={f.autoComplete} />
            )}
            {errs && (
              <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
                {errs[0]}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" className="min-h-5 text-sm text-destructive">
        {status === "error" && error}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
      >
        {status === "sending" ? (
          <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
        ) : (
          <Send data-icon="inline-start" aria-hidden="true" />
        )}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
