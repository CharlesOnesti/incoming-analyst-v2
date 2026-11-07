import { STORAGE_KEYS } from '../storage/keys'
import { readJson, writeJson } from '../storage/local'

export type TrackerEntry = {
  id: string
  firm: string
  contact: string
  stage: string
  channel: string
  nextAction: string
  dueDate?: string
  updatedAt: string
}

export function loadTracker(): TrackerEntry[] {
  return readJson<TrackerEntry[]>(STORAGE_KEYS.tracker, [])
}

export function saveTracker(entries: TrackerEntry[]): void {
  writeJson(STORAGE_KEYS.tracker, entries)
}

export function upsertTrackerEntry(entry: TrackerEntry): TrackerEntry[] {
  const items = loadTracker()
  const idx = items.findIndex((e) => e.id === entry.id)
  const next = {
    ...entry,
    updatedAt: new Date().toISOString(),
  }
  if (idx >= 0) items[idx] = next
  else items.unshift(next)
  saveTracker(items)
  return items
}

export function removeTrackerEntry(id: string): TrackerEntry[] {
  const items = loadTracker().filter((e) => e.id !== id)
  saveTracker(items)
  return items
}

export function overdueEntries(asOf = new Date()): TrackerEntry[] {
  const today = asOf.toISOString().slice(0, 10)
  return loadTracker().filter((e) => e.dueDate && e.dueDate < today)
}
