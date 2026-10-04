import type { Stat } from "./schema";

/** Only real numbers. Every stat names its source; unverified ones are flagged. */
export const stats: readonly Stat[] = [
  {
    value: 2,
    suffix: "+",
    label: "Years in ML, automation & IT",
    source: "Resume: professional summary (Jul 2024 onwards)",
  },
  {
    value: 92,
    suffix: "%",
    label: "Top model accuracy",
    source: "Resume: Rice Leaf Disease AI, final-year project (10,000+ images)",
  },
  {
    value: 900,
    suffix: "+",
    label: "User accounts supported",
    source: "Resume: Mindbridge, IT Support & Systems Monitoring Officer",
  },
  {
    value: 70,
    suffix: "+",
    label: "n8n workflows built",
    source:
      "n8n workspace screenshots: 56 in folders + 21 standalone = 77, including practice flows",
    needsVerification: true,
  },
  {
    value: 3,
    label: "Languages in NLP system",
    source: "Resume: Fake News Detection, BERT + SVM (English, Urdu, Spanish), confirmed by owner",
  },
];
