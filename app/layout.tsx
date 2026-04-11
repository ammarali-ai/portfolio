import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AskCvChat } from "@/components/ask-cv-chat";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Muhammad Ammar Ali — AI Automation Engineer",
    template: "%s · Muhammad Ammar Ali",
  },
  description:
    "AI graduate with hands-on experience in machine learning, deep learning, computer vision, and natural language processing. AI Automation Engineer at Metaviz.",
  keywords: [
    "Muhammad Ammar Ali",
    "AI Engineer",
    "Automation",
    "n8n",
    "Machine Learning",
    "Data Science",
    "Pakistan",
  ],
  authors: [{ name: "Muhammad Ammar Ali" }],
  openGraph: {
    title: "Muhammad Ammar Ali — AI Automation Engineer",
    description: "AI Automation Engineer · Data Science & AI Professional",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable} ${caveat.variable}`}>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <AskCvChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
