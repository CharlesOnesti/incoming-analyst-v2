const memory = new Map<string, string>()

type KvStore = {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

function store(): KvStore {
  try {
    if (typeof localStorage !== 'undefined') return localStorage
  } catch {
    // ignore
  }
  return {
    getItem: (key) => memory.get(key) ?? null,
    setItem: (key, value) => {
      memory.set(key, value)
    },
    removeItem: (key) => {
      memory.delete(key)
    },
  }
}

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = store().getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJson<T>(key: string, value: T): void {
  store().setItem(key, JSON.stringify(value))
}

export function removeKey(key: string): void {
  store().removeItem(key)
}

export function exportAll(keys: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const key of keys) {
    const raw = store().getItem(key)
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
    store().setItem(key, JSON.stringify(value))
  }
}

/** Test helper — clears in-memory fallback store. */
export function clearMemoryStore(): void {
  memory.clear()
}
