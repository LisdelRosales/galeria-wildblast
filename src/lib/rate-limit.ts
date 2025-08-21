import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 requests per hour
  analytics: true,
  prefix: "galeria-wildblast",
})

export async function checkRateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await rateLimiter.limit(identifier)
  
  return {
    success,
    limit,
    reset,
    remaining,
  }
}

export const downloadRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    parseInt(process.env.MAX_DOWNLOADS_PER_HOUR || "10"),
    "1 h"
  ),
  analytics: true,
  prefix: "galeria-wildblast-downloads",
})
