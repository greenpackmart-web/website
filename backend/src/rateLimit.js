const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

const hits = new Map()

export function checkRateLimit(key) {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(key, { start: now, count: 1 })
    return true
  }

  entry.count += 1
  return entry.count <= MAX_HITS
}

export function resetRateLimits() {
  hits.clear()
}
