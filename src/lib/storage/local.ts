export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeKey(key: string): void {
  localStorage.removeItem(key)
}

export function exportAll(keys: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of keys) {
    const raw = localStorage.getItem(key)
    if (raw) {
      try {
        out[key] = JSON.parse(raw)
      } catch {
        out[key] = raw
      }
    }
  }
  return out
}

export function importAll(data: Record<string, unknown>): void {
  for (const [key, value] of Object.entries(data)) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
