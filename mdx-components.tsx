import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

/** Article typography for MDX content (case studies and research), using the design tokens. */
const components: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2 className={cn("mt-12 mb-4 text-2xl font-semibold first:mt-0", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("mt-8 mb-3 text-xl font-semibold", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("my-4 leading-relaxed text-foreground/85", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 list-disc space-y-2 pl-6 marker:text-brand", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-4 list-decimal space-y-2 pl-6 marker:text-brand", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-relaxed text-foreground/85", className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  a: ({ href = "", className, ...props }: ComponentPropsWithoutRef<"a">) => {
    const cls = cn("text-brand underline-offset-4 hover:underline", className);
    return href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} className={cls} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noreferrer" className={cls} {...props} />
    );
  },
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("my-6 border-l-2 border-brand pl-4 text-muted-foreground italic", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm [&_code]:bg-transparent [&_code]:p-0",
        className,
      )}
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn("border-b border-border px-3 py-2 text-left font-semibold", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn("border-b border-border px-3 py-2 text-foreground/85", className)}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
