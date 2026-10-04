import { BrainCircuit, Database, Send, Split, Zap, type LucideIcon } from "lucide-react";
import type { FlowNodeKind, FlowSource } from "@/content/schema";

export const flowKinds: Record<FlowNodeKind, { label: string; Icon: LucideIcon; chip: string }> = {
  trigger: { label: "Trigger", Icon: Zap, chip: "border-brand/40 bg-brand/10 text-brand" },
  data: { label: "Data", Icon: Database, chip: "border-leaf/40 bg-leaf/10 text-leaf" },
  logic: { label: "Logic", Icon: Split, chip: "border-border bg-muted text-muted-foreground" },
  ai: { label: "AI", Icon: BrainCircuit, chip: "border-brand-2/40 bg-brand-2/10 text-brand-2" },
  output: { label: "Output", Icon: Send, chip: "border-sun/40 bg-sun/10 text-sun" },
};

export const flowSourceLabel: Record<FlowSource, string> = {
  "n8n-export": "Rendered from the n8n export",
  "n8n-anonymized": "Real n8n structure, anonymized",
  architecture: "Architecture diagram",
};
