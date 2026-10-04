import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  /** Unix ms when the window resets. */
  reset: number;
}

export type RateLimiter = (key: string) => Promise<RateLimitResult>;

interface Options {
  /** Namespace so limiters don't share counters. */
  name: string;
  limit: number;
  windowSeconds: number;
}

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

/**
 * Per-key rate limiter. Uses Upstash Redis when configured (shared across serverless
 * instances), otherwise a best-effort in-memory fixed window (per instance).
 */
export function createRateLimiter({ name, limit, windowSeconds }: Options): RateLimiter {
  if (hasUpstash) {
    const ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: `rl:${name}`,
    });
    return async (key) => {
      const { success, reset } = await ratelimit.limit(key);
      return { success, reset };
    };
  }

  const hits = new Map<string, { count: number; reset: number }>();
  const windowMs = windowSeconds * 1000;

  return async (key) => {
    const now = Date.now();
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || entry.reset < now) {
      const reset = now + windowMs;
      hits.set(key, { count: 1, reset });
      return { success: true, reset };
    }
    if (entry.count >= limit) return { success: false, reset: entry.reset };
    entry.count += 1;
    return { success: true, reset: entry.reset };
  };
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown"
  );
}
