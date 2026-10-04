"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { DomainId } from "@/content/schema";
import type { CoreDomain } from "@/components/three/neural-core";
import { domainDotClass } from "@/lib/palette";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const NeuralCore = dynamic(() => import("@/components/three/neural-core"), { ssr: false });

/** The canvas bleeds 8% past the frame on every side so node glows aren't clipped. */
const CANVAS_BLEED = 0.08;
/**
 * Photo diameter = 40% of the frame; expressed relative to the (larger) canvas so the
 * 3D shader can hide particles behind the photo disc.
 */
const PHOTO_RADIUS_FRACTION = 0.2 / (1 + 2 * CANVAS_BLEED);

interface Props {
  photo: { src: string; alt: string };
  domains: readonly CoreDomain[];
  legendLabel: string;
}

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero visual: the photo + rings are the server-rendered poster (and LCP image). The WebGL
 * Neural Core loads after the page is idle, fades in on top, and pauses when off-screen.
 * Reduced motion or no WebGL → the poster stays. The legend buttons are the accessible
 * way to reach each domain.
 */
export function HeroVisual({ photo, domains, legendLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const lenis = useLenis();
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [quality, setQuality] = useState<"high" | "low">("high");

  useEffect(() => {
    if (reduceMotion || !supportsWebGL()) return;

    const start = () => {
      const small = window.matchMedia("(max-width: 767px)").matches;
      const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
      setQuality(small || weak ? "low" : "high");
      setLoad(true);
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (id: DomainId) => scrollToId(`domain-${id}`, lenis);
  const theme = resolvedTheme === "light" ? "light" : "dark";

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div ref={ref} className="relative aspect-square w-full">
        {/* Poster: orbit rings + photo. Always present; the canvas draws on top. */}
        <div
          aria-hidden="true"
          className="absolute inset-[4%] rounded-full border border-dashed border-brand/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-[17%] rounded-full border border-brand-2/15"
        />
        <div className="absolute inset-[30%] overflow-hidden rounded-full border-2 border-brand/50 shadow-[0_0_60px_-10px_var(--brand)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="(min-width: 768px) 210px, 40vw"
            className="object-cover object-[50%_22%]"
          />
        </div>

        {load && (
          <div
            className={cn(
              "absolute -inset-[8%] transition-opacity duration-1000",
              ready ? "opacity-100" : "opacity-0",
            )}
          >
            <NeuralCore
              domains={domains}
              theme={theme}
              quality={quality}
              active={visible}
              photoFraction={PHOTO_RADIUS_FRACTION}
              onSelect={select}
              onReady={() => setReady(true)}
            />
          </div>
        )}
      </div>

      <div className="mt-[calc(8%+0.5rem)]">
        <p className="mb-2 text-center font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          {legendLabel}
        </p>
        <ul className="flex flex-wrap justify-center gap-1.5">
          {domains.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => select(d.id)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground"
              >
                <span
                  className={cn("size-2 rounded-full", domainDotClass[d.id])}
                  aria-hidden="true"
                />
                {d.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
