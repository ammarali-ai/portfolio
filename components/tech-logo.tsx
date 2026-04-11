const DEVICON: Record<string, string> = {
  Python: "python/python-original",
  "C++": "cplusplus/cplusplus-original",
  SQL: "mysql/mysql-original",
  JavaScript: "javascript/javascript-original",
  "JavaScript (basic)": "javascript/javascript-original",
  TypeScript: "typescript/typescript-original",
  TensorFlow: "tensorflow/tensorflow-original",
  Keras: "keras/keras-original",
  "Scikit-learn": "scikitlearn/scikitlearn-original",
  NumPy: "numpy/numpy-original",
  Pandas: "pandas/pandas-original",
  OpenCV: "opencv/opencv-original",
  Flask: "flask/flask-original",
  FastAPI: "fastapi/fastapi-original",
  MySQL: "mysql/mysql-original",
  "Google Cloud": "googlecloud/googlecloud-original",
  Git: "git/git-original",
  "VS Code": "vscode/vscode-original",
  "Jupyter Notebook": "jupyter/jupyter-original",
  Linux: "linux/linux-original",
  "Linux (basic)": "linux/linux-original",
  Windows: "windows11/windows11-original",
  React: "react/react-original",
  "Next.js": "nextjs/nextjs-original",
  "Node.js": "nodejs/nodejs-original",
  Docker: "docker/docker-original",
};

const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export function TechLogo({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const slug = DEVICON[name];
  const dim = size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";
  const pad = size === "md" ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-[11px]";

  if (!slug) {
    return (
      <span
        className={`inline-flex items-center rounded-full border border-border bg-bg-subtle font-mono text-fg-muted ${pad}`}
      >
        {name}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-subtle font-mono text-fg-muted ${pad}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/${slug}.svg`}
        alt={name}
        className={`${dim} shrink-0`}
        loading="lazy"
      />
      <span>{name}</span>
    </span>
  );
}
