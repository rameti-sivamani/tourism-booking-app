/**
 * Safe wrappers around localStorage. Storage can be unavailable (private
 * browsing, blocked cookies) or hold corrupted data, so every access is
 * guarded and falls back to a default value.
 */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore quota or availability errors; the app keeps working in memory.
  }
}
