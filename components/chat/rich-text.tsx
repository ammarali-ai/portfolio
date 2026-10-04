import { Fragment, type ReactNode } from "react";

/** Inline **bold** only; everything else is plain text (no HTML injection possible). */
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Minimal Markdown for chat replies: paragraphs, "- " / "* " bullet lists and **bold**. */
export function RichText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-1.5 list-disc space-y-1 pl-5">
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const flushPara = () => {
    if (!para.length) return;
    blocks.push(
      <p key={`p-${blocks.length}`} className="my-1.5 first:mt-0 last:mb-0">
        {inline(para.join(" "))}
      </p>,
    );
    para = [];
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const bullet = /^[-*]\s+(.*)$/.exec(line);
    if (bullet) {
      flushPara();
      list.push(bullet[1]);
    } else if (!line) {
      flushPara();
      flushList();
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return <>{blocks}</>;
}
