import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/content";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post — Muhammad Ammar Ali";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  const title = post?.title ?? "Blog post";
  const excerpt = post?.excerpt ?? "";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #150a25 50%, #0a1520 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontFamily: "monospace",
            color: "#a78bfa",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "flex",
            gap: 16,
          }}
        >
          <span>Research Notes</span>
          {tags.slice(0, 3).map((t) => (
            <span key={t} style={{ color: "#38bdf8" }}>
              · {t}
            </span>
          ))}
        </div>

        <div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#f0f0fa",
              marginBottom: 20,
            }}
          >
            {title.slice(0, 90)}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#a0a0b4",
              lineHeight: 1.4,
            }}
          >
            {excerpt.slice(0, 160)}
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#8080a0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Muhammad Ammar Ali</span>
          <span style={{ color: "#38bdf8" }}>ammarali-ai.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
