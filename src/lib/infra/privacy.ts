import { STORAGE_KEYS } from '../storage/keys'
import { readJson, writeJson } from '../storage/local'

export type Settings = {
  retainTranscripts: boolean
  redactDealNames: boolean
  shareAnonymousTelemetry: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  retainTranscripts: true,
  redactDealNames: false,
  shareAnonymousTelemetry: false,
}

export function loadSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...readJson<Partial<Settings>>(STORAGE_KEYS.settings, {}) }
}

export function saveSettings(settings: Settings): void {
  writeJson(STORAGE_KEYS.settings, settings)
}

/** Replace whole-word occurrences of each name with [REDACTED]. */
export function redactText(text: string, names: string[]): string {
  let out = text
  for (const name of names) {
    const trimmed = name.trim()
    if (!trimmed) continue
    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    out = out.replace(new RegExp(`\\b${escaped}\\b`, 'gi'), '[REDACTED]')
  }
  return out
}
