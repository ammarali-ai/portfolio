import type { SkillGroup } from "./schema";

/** Grouped exactly as on the resume. */
export const skillGroups: readonly SkillGroup[] = [
  { category: "Programming", items: ["Python", "C++", "SQL", "JavaScript (basic)"] },
  {
    category: "ML & Deep Learning",
    items: [
      "TensorFlow",
      "Keras",
      "PyTorch",
      "Scikit-learn",
      "CNNs",
      "RNNs / LSTMs",
      "Transformers",
      "Transfer Learning",
      "Feature Engineering",
      "Hyperparameter Tuning",
    ],
  },
  {
    category: "NLP, GenAI & Computer Vision",
    items: [
      "Hugging Face Transformers",
      "BERT",
      "LangChain",
      "LLMs",
      "Prompt Engineering",
      "RAG",
      "NLTK",
      "spaCy",
      "OpenCV",
    ],
  },
  {
    category: "Automation & Tools",
    items: [
      "n8n",
      "Zapier",
      "GoHighLevel",
      "Claude API",
      "Git",
      "Jupyter",
      "VS Code",
      "Google Colab",
    ],
  },
  {
    category: "Data Science & Analytics",
    items: ["Pandas", "NumPy", "EDA", "Statistical Analysis", "ETL Pipelines"],
  },
  { category: "Visualisation", items: ["Matplotlib", "Seaborn", "Plotly", "Power BI"] },
  { category: "Deployment & Cloud", items: ["Flask", "FastAPI", "Docker", "Google Cloud"] },
  { category: "Databases", items: ["MySQL", "PostgreSQL", "Supabase"] },
  {
    category: "Networking & IT",
    items: ["LAN/WAN", "TCP/IP", "DNS", "DHCP", "Windows / macOS / Linux", "Help desk operations"],
  },
];

/** Tech marquee on the homepage (logos added in Phase 3). */
export const marqueeTech: readonly string[] = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Hugging Face",
  "LangChain",
  "Claude",
  "n8n",
  "FastAPI",
  "Docker",
  "PostgreSQL",
  "Supabase",
  "Next.js",
];
