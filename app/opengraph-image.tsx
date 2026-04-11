import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Muhammad Ammar Ali — AI Automation Engineer";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2a 50%, #0a1a2a 100%)",
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
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.05,
            background: "linear-gradient(90deg, #38bdf8, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 24,
          }}
        >
          Muhammad Ammar Ali
        </div>
        <div style={{ fontSize: 36, color: "#a0a0b4", fontFamily: "monospace" }}>
          AI Automation Engineer · Data Science
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#8080a0",
            display: "flex",
            gap: 32,
          }}
        >
          <span>n8n</span>
          <span>·</span>
          <span>TensorFlow</span>
          <span>·</span>
          <span>Claude Code</span>
          <span>·</span>
          <span>Python</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
