import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/content";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project — Muhammad Ammar Ali";

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  const title = project?.title ?? "Project";
  const summary = project?.summary ?? "";
  const tech = project?.tech ?? [];

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
          background: "linear-gradient(135deg, #0a0a0f 0%, #0a1a2a 50%, #0a0a25 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontFamily: "monospace",
            color: "#38bdf8",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          Project Case Study
        </div>

        <div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 24,
            }}
          >
            {title.slice(0, 60)}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a0a0b4",
              lineHeight: 1.4,
            }}
          >
            {summary.slice(0, 140)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 14, fontSize: 20, color: "#8080a0" }}>
            {tech.slice(0, 5).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div style={{ fontSize: 22, color: "#a78bfa", fontFamily: "monospace" }}>
            muhammad ammar ali
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
