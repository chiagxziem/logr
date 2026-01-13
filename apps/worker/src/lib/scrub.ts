/**
 * Simple PII scrubber for cleaning logs.
 */

// Common PII regex patterns
const PII_PATTERNS = {
  EMAIL: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/g,
  CREDIT_CARD: /\b(?:\d[ -]*?){13,16}\b/g,
  // Basic IPv4 (though often not considered PII in isolate, we hash it in API)
  // IPv4: /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
};

// Keys to recursively scrub in objects
const SENSITIVE_KEYS = new Set([
  "password",
  "secret",
  "token",
  "api_key",
  "apikey",
  "authorization",
  "cookie",
  "set-cookie",
  "credit_card",
  "cc",
  "cvv",
]);

/**
 * Scrub a string for PII patterns.
 */
export function scrubString(str: string): string {
  let scrubbed = str;
  scrubbed = scrubbed.replace(PII_PATTERNS.EMAIL, "[EMAIL REDACTED]");
  scrubbed = scrubbed.replace(PII_PATTERNS.CREDIT_CARD, "[CARD REDACTED]");
  return scrubbed;
}

/**
 * Scrub an object or array recursively for sensitive keys and PII patterns in strings.
 */
export function scrubPII<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  // Handle Dates immediately
  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj === "string") {
    return scrubString(obj) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => scrubPII(item)) as unknown as T;
  }

  // Ensure we only recurse into "plain" objects
  if (typeof obj === "object") {
    const newObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_KEYS.has(lowerKey)) {
        newObj[key] = "[REDACTED]";
      } else {
        newObj[key] = scrubPII(value as unknown);
      }
    }
    return newObj as T;
  }

  return obj;
}
