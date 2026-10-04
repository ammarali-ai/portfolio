import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Background } from "@/components/layout/background";
import { Terminal } from "@/components/terminal/terminal";
import { ChatWidget } from "@/components/chat/chat-widget";
import { chatCopy } from "@/content/sections";
import { site } from "@/lib/site";
import { terminalData } from "@/lib/terminal-data";
import "./globals.css";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

// Full SEO (OG image, JSON-LD, sitemap) lands in Phase 7.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Muhammad Ammar Ali" },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <a
            href="#main"
            className="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <Background />
          <Navbar />
          {/* overflow-x-clip: decorative bleed (hero canvas, glows) never widens the page.
              Applied here, not on <body>, because body overflow propagates to the viewport. */}
          <main id="main" className="flex-1 overflow-x-clip">
            {children}
          </main>
          <Footer />
          <Terminal data={terminalData} />
          <ChatWidget copy={chatCopy} />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
