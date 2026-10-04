import {
  siClaude,
  siDocker,
  siFastapi,
  siHuggingface,
  siLangchain,
  siN8n,
  siNextdotjs,
  siPostgresql,
  siPython,
  siPytorch,
  siSupabase,
  siTensorflow,
  type SimpleIcon,
} from "simple-icons";

/** Tech name (as written in content) → Simple Icons glyph. Unknown names render as text only. */
const icons: Record<string, SimpleIcon> = {
  Python: siPython,
  PyTorch: siPytorch,
  TensorFlow: siTensorflow,
  "Hugging Face": siHuggingface,
  LangChain: siLangchain,
  Claude: siClaude,
  n8n: siN8n,
  FastAPI: siFastapi,
  Docker: siDocker,
  PostgreSQL: siPostgresql,
  Supabase: siSupabase,
  "Next.js": siNextdotjs,
};

export function techIcon(name: string): SimpleIcon | undefined {
  return icons[name];
}
