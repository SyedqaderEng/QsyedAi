/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a dedicated rate limiting service
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the time window
   */
  maxRequests: number;

  /**
   * Time window in milliseconds
   * Default: 60000 (1 minute)
   */
  windowMs?: number;
}

interface RateLimitResult {
  /**
   * Whether the request should be allowed
   */
  allowed: boolean;

  /**
   * Number of requests remaining in the current window
   */
  remaining: number;

  /**
   * Time in milliseconds until the rate limit resets
   */
  resetInMs: number;

  /**
   * Total limit for the time window
   */
  limit: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier Unique identifier for the client (IP, user ID, etc.)
 * @param config Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const { maxRequests, windowMs = 60000 } = config;
  const now = Date.now();

  let record = rateLimitStore.get(identifier);

  // If no record or record expired, create new one
  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(identifier, record);
  }

  // Increment count
  record.count++;

  const allowed = record.count <= maxRequests;
  const remaining = Math.max(0, maxRequests - record.count);
  const resetInMs = record.resetTime - now;

  return {
    allowed,
    remaining,
    resetInMs,
    limit: maxRequests,
  };
}

/**
 * Get client identifier from request
 * Uses IP address or a combination of headers
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from headers (for reverse proxy scenarios)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, use the first one
    return forwardedFor.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  // Fallback to a generic identifier if IP can't be determined
  // In production, consider using other identifying factors
  return 'unknown';
}
