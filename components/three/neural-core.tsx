"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { DomainId, Status } from "@/content/schema";
import { palette } from "@/lib/palette";

export interface CoreDomain {
  id: DomainId;
  title: string;
  status: Status;
}

export interface NeuralCoreProps {
  domains: readonly CoreDomain[];
  theme: "dark" | "light";
  quality: "high" | "low";
  /** Render loop runs only while the hero is visible. */
  active: boolean;
  /** Radius of the HTML photo behind the canvas, as a fraction of the canvas width. */
  photoFraction: number;
  onSelect: (id: DomainId) => void;
  onReady: () => void;
}

const CAMERA_Z = 6.4;
const FOV = 42;
const SHELL_R = 2.0;
/** World-space height visible at z = 0 (the photo plane). */
const PLANE_H = 2 * CAMERA_Z * Math.tan(((FOV / 2) * Math.PI) / 180);

/** Deterministic PRNG so the network looks the same on every load. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShell(count: number) {
  const rand = mulberry32(42);
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i + rand() * 0.35;
    const radius = SHELL_R * (0.8 + rand() * 0.2);
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    seeds[i] = rand();
  }

  // Connect each particle to its two nearest neighbours (within reach).
  const segments: number[] = [];
  const maxDist2 = 0.5 * 0.5;
  for (let i = 0; i < count; i++) {
    let best1 = -1;
    let best2 = -1;
    let d1 = Infinity;
    let d2 = Infinity;
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      const d = dx * dx + dy * dy + dz * dz;
      if (d < d1) {
        d2 = d1;
        best2 = best1;
        d1 = d;
        best1 = j;
      } else if (d < d2) {
        d2 = d;
        best2 = j;
      }
    }
    for (const [j, d] of [
      [best1, d1],
      [best2, d2],
    ] as const) {
      if (j > i && d < maxDist2) {
        segments.push(
          ...positions.subarray(i * 3, i * 3 + 3),
          ...positions.subarray(j * 3, j * 3 + 3),
        );
      }
    }
  }
  return { positions, seeds, lines: new Float32Array(segments) };
}

/** Five domain nodes on a ring around the photo, slightly in front, never overlapping it. */
function domainPositions(n: number): THREE.Vector3[] {
  return Array.from({ length: n }, (_, i) => {
    const a = Math.PI / 2 + (i * 2 * Math.PI) / n;
    return new THREE.Vector3(Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0.44)
      .normalize()
      .multiplyScalar(SHELL_R * 1.02);
  });
}

// Shared GLSL: fade by depth, hide what's behind the photo disc, soften what's in front of it.
const fadeChunk = /* glsl */ `
  uniform float uDiscR;
  uniform float uCamZ;
  float coreFade(vec4 mv) {
    float planeDist = length(mv.xy) * (uCamZ / -mv.z);
    float inside = 1.0 - smoothstep(uDiscR * 0.97, uDiscR * 1.08, planeDist);
    float behind = step(mv.z, -uCamZ);
    float depth = smoothstep(-uCamZ - 2.4, -uCamZ + 1.8, mv.z);
    return mix(0.22, 1.0, depth) * mix(1.0, mix(0.16, 0.0, behind), inside);
  }
`;

function makeMaterials(theme: "dark" | "light", discR: number, pixelRatio: number) {
  const p = palette[theme];
  const blending = theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending;
  const common = {
    transparent: true,
    depthWrite: false,
    blending,
  };
  const points = new THREE.ShaderMaterial({
    ...common,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: theme === "dark" ? 5.5 : 4.5 },
      uPixelRatio: { value: pixelRatio },
      uColor: { value: new THREE.Color(p.particle) },
      uOpacity: { value: theme === "dark" ? 0.95 : 0.8 },
      uDiscR: { value: discR },
      uCamZ: { value: CAMERA_Z },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSize;
      uniform float uPixelRatio;
      attribute float aSeed;
      varying float vAlpha;
      ${fadeChunk}
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vAlpha = coreFade(mv);
        float twinkle = 0.7 + 0.45 * sin(uTime * 1.6 + aSeed * 6.2831);
        gl_PointSize = uSize * uPixelRatio * twinkle * (uCamZ / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
      }
    `,
  });
  const lines = new THREE.ShaderMaterial({
    ...common,
    uniforms: {
      uColor: { value: new THREE.Color(p.line) },
      uOpacity: { value: theme === "dark" ? 0.2 : 0.22 },
      uDiscR: { value: discR },
      uCamZ: { value: CAMERA_Z },
    },
    vertexShader: /* glsl */ `
      varying float vAlpha;
      ${fadeChunk}
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vAlpha = coreFade(mv);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() { gl_FragColor = vec4(uColor, vAlpha * uOpacity); }
    `,
  });
  return { points, lines };
}

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.45)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface DomainNodeProps {
  domain: CoreDomain;
  position: THREE.Vector3;
  color: string;
  theme: "dark" | "light";
  glow: THREE.Texture;
  hovered: boolean;
  phase: number;
  onHover: (id: DomainId | null) => void;
  onSelect: (id: DomainId) => void;
}

function DomainNode({
  domain,
  position,
  color,
  theme,
  glow,
  hovered,
  phase,
  onHover,
  onSelect,
}: DomainNodeProps) {
  const ref = useRef<THREE.Group>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const s = (hovered ? 1.6 : 1) * (1 + 0.1 * Math.sin(clock.elapsedTime * 2.2 + phase));
    ref.current.scale.lerp(target.set(s, s, s), 0.15);
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(domain.id);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    onHover(null);
    document.body.style.cursor = "";
  };

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.085, 20, 20]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <sprite scale={0.8}>
        <spriteMaterial
          map={glow}
          color={color}
          transparent
          depthWrite={false}
          opacity={theme === "dark" ? 0.95 : 0.55}
          blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </sprite>
      {/* Larger invisible hit area for easier hovering. */}
      <mesh
        onPointerOver={over}
        onPointerOut={out}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(domain.id);
        }}
      >
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {hovered && (
        <Html
          center
          position={[0, 0.38, 0]}
          zIndexRange={[30, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="rounded-md border border-border px-2 py-1 font-mono text-xs whitespace-nowrap text-foreground shadow-lg glass">
            {domain.title}
            <span className="ml-1.5 text-muted-foreground">→</span>
          </div>
        </Html>
      )}
    </group>
  );
}

function Core({
  domains,
  theme,
  quality,
  photoFraction,
  onSelect,
}: Omit<NeuralCoreProps, "active" | "onReady">) {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<DomainId | null>(null);
  const { gl } = useThree();

  const shell = useMemo(() => buildShell(quality === "high" ? 1100 : 480), [quality]);
  const nodePositions = useMemo(() => domainPositions(domains.length), [domains.length]);
  const discR = photoFraction * PLANE_H;
  const materials = useMemo(
    () => makeMaterials(theme, discR, gl.getPixelRatio()),
    [theme, discR, gl],
  );
  const glow = useMemo(() => makeGlowTexture(), []);

  const objects = useMemo(() => {
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(shell.positions, 3));
    pointsGeo.setAttribute("aSeed", new THREE.BufferAttribute(shell.seeds, 1));
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.BufferAttribute(shell.lines, 3));

    // Bright links from every domain node to its nearest particles.
    const p = palette[theme];
    const linkPos: number[] = [];
    const linkCol: number[] = [];
    nodePositions.forEach((np, k) => {
      const c = new THREE.Color(p.domain[domains[k].id]);
      const near: [number, number][] = [];
      for (let i = 0; i < shell.positions.length / 3; i++) {
        const dx = shell.positions[i * 3] - np.x;
        const dy = shell.positions[i * 3 + 1] - np.y;
        const dz = shell.positions[i * 3 + 2] - np.z;
        near.push([dx * dx + dy * dy + dz * dz, i]);
      }
      near.sort((a, b) => a[0] - b[0]);
      for (const [, i] of near.slice(0, quality === "high" ? 12 : 7)) {
        linkPos.push(
          np.x,
          np.y,
          np.z,
          shell.positions[i * 3],
          shell.positions[i * 3 + 1],
          shell.positions[i * 3 + 2],
        );
        linkCol.push(c.r, c.g, c.b, c.r, c.g, c.b);
      }
    });
    const linksGeo = new THREE.BufferGeometry();
    linksGeo.setAttribute("position", new THREE.Float32BufferAttribute(linkPos, 3));
    linksGeo.setAttribute("color", new THREE.Float32BufferAttribute(linkCol, 3));
    const linksMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: theme === "dark" ? 0.55 : 0.45,
      depthWrite: false,
      blending: theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    return {
      points: new THREE.Points(pointsGeo, materials.points),
      lines: new THREE.LineSegments(linesGeo, materials.lines),
      links: new THREE.LineSegments(linksGeo, linksMat),
    };
  }, [shell, materials, nodePositions, domains, theme, quality]);

  useEffect(
    () => () => {
      objects.points.geometry.dispose();
      objects.lines.geometry.dispose();
      objects.links.geometry.dispose();
      (objects.links.material as THREE.Material).dispose();
    },
    [objects],
  );
  useEffect(
    () => () => {
      materials.points.dispose();
      materials.lines.dispose();
    },
    [materials],
  );
  useEffect(() => () => glow.dispose(), [glow]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const shader = pointsRef.current?.material;
    if (shader instanceof THREE.ShaderMaterial) shader.uniforms.uTime.value = t;
    const g = group.current;
    if (!g) return;
    const yaw = Math.sin(t * 0.18) * 0.2 + pointer.current.x * 0.15;
    const pitch = Math.sin(t * 0.13) * 0.06 + pointer.current.y * 0.12;
    const k = 1 - Math.exp(-delta * 2.5);
    g.rotation.y += (yaw - g.rotation.y) * k;
    g.rotation.x += (pitch - g.rotation.x) * k;
  });

  return (
    <group ref={group}>
      <primitive object={objects.lines} />
      <primitive ref={pointsRef} object={objects.points} />
      <primitive object={objects.links} />
      {domains.map((d, i) => (
        <DomainNode
          key={d.id}
          domain={d}
          position={nodePositions[i]}
          color={palette[theme].domain[d.id]}
          theme={theme}
          glow={glow}
          hovered={hovered === d.id}
          phase={i * 1.3}
          onHover={setHovered}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

/** The 3D Neural Core. Loaded lazily (ssr: false) by HeroVisual; decorative for assistive tech. */
export default function NeuralCore({ active, onReady, quality, ...rest }: NeuralCoreProps) {
  return (
    <Canvas
      aria-hidden="true"
      frameloop={active ? "always" : "never"}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => requestAnimationFrame(onReady)}
      style={{ background: "transparent" }}
    >
      <Core quality={quality} {...rest} />
    </Canvas>
  );
}
