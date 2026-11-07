import type { DealCard } from '../deals'
import { exportAll, importAll, readJson, writeJson } from '../storage/local'
import { STORAGE_KEYS } from '../storage/keys'
import type { ResumeDraft, StoryDraft } from '../story'
import { emptyProfile, emptyReadiness } from './defaults'
import type {
  CalendarItem,
  CandidateProfile,
  DebriefRecord,
  PracticeSessionRecord,
  ReadinessDimension,
  ReadinessScores,
} from './types'

const BACKUP_KEYS = Object.values(STORAGE_KEYS)

export function loadProfile(): CandidateProfile {
  return readJson(STORAGE_KEYS.profile, emptyProfile())
}

export function saveProfile(profile: CandidateProfile): void {
  writeJson(STORAGE_KEYS.profile, {
    ...profile,
    updatedAt: new Date().toISOString(),
  })
}

export function loadSessions(): PracticeSessionRecord[] {
  return readJson(STORAGE_KEYS.sessions, [])
}

export function addSession(session: PracticeSessionRecord): void {
  const sessions = loadSessions()
  sessions.unshift(session)
  writeJson(STORAGE_KEYS.sessions, sessions.slice(0, 500))
  recomputeReadiness()
}

export function loadCalendar(): CalendarItem[] {
  return readJson(STORAGE_KEYS.calendar, [])
}

export function saveCalendar(items: CalendarItem[]): void {
  writeJson(STORAGE_KEYS.calendar, items)
}

export function loadDebriefs(): DebriefRecord[] {
  return readJson(STORAGE_KEYS.debriefs, [])
}

export function addDebrief(debrief: DebriefRecord): void {
  const items = loadDebriefs()
  items.unshift(debrief)
  writeJson(STORAGE_KEYS.debriefs, items)
}

export function loadReadiness(): ReadinessScores {
  return readJson(STORAGE_KEYS.readiness, emptyReadiness())
}

export function recomputeReadiness(): ReadinessScores {
  const sessions = loadSessions()
  const scores = emptyReadiness()
  const counts: Record<ReadinessDimension, number> = {
    fit: 0,
    technicals: 0,
    deals: 0,
    lbo: 0,
    judgment: 0,
    modeling: 0,
    cases: 0,
  }

  for (const session of sessions) {
    if (!session.dimension || session.total == null || session.total <= 0) continue
    const pct = Math.round(((session.score ?? 0) / session.total) * 100)
    const dim = session.dimension
    scores[dim] =
      counts[dim] === 0
        ? pct
        : Math.round((scores[dim] * counts[dim] + pct) / (counts[dim] + 1))
    counts[dim] += 1
  }

  writeJson(STORAGE_KEYS.readiness, scores)
  return scores
}

export function loadDeals(): DealCard[] {
  return readJson(STORAGE_KEYS.deals, [])
}

export function saveDeals(deals: DealCard[]): void {
  writeJson(STORAGE_KEYS.deals, deals)
}

export function loadStories(): StoryDraft[] {
  return readJson(STORAGE_KEYS.stories, [])
}

export function saveStories(stories: StoryDraft[]): void {
  writeJson(STORAGE_KEYS.stories, stories)
}

export function loadResumes(): ResumeDraft[] {
  return readJson(STORAGE_KEYS.resumes, [])
}

export function saveResumes(resumes: ResumeDraft[]): void {
  writeJson(STORAGE_KEYS.resumes, resumes)
}

export function exportBackup(): string {
  return JSON.stringify(exportAll(BACKUP_KEYS), null, 2)
}

export function importBackup(raw: string): void {
  const data = JSON.parse(raw) as Record<string, unknown>
  importAll(data)
}
