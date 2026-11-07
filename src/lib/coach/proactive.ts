import { buildStudyPlan, type StudyAction } from '../profile/studyPlan'
import { loadCalendar, loadReadiness } from '../profile/persistence'
import type { ReadinessDimension } from '../profile/types'
import { overdueEntries } from '../recruiting/tracker'

export type DailyAction = {
  id: string
  title: string
  reason: string
  href: string
  source: 'study' | 'tracker' | 'calendar' | 'readiness'
  priority: number
}

const GAP_HREF: Record<ReadinessDimension, string> = {
  fit: '/fit',
  technicals: '/technicals',
  deals: '/deals',
  lbo: '/quiz',
  judgment: '/judgment',
  modeling: '/modeling',
  cases: '/cases',
}

export function buildDailyPlan(asOf = new Date()): DailyAction[] {
  const actions: DailyAction[] = []
  const today = asOf.toISOString().slice(0, 10)

  const study = buildStudyPlan()
  study.slice(0, 4).forEach((item: StudyAction, index) => {
    actions.push({
      id: `study-${item.id}`,
      title: item.title,
      reason: item.reason,
      href: item.href,
      source: 'study',
      priority: index,
    })
  })

  for (const entry of overdueEntries(asOf)) {
    actions.push({
      id: `tracker-${entry.id}`,
      title: `Overdue: ${entry.nextAction}`,
      reason: `${entry.firm} · was due ${entry.dueDate}`,
      href: '/outreach',
      source: 'tracker',
      priority: actions.length,
    })
  }

  const calendar = loadCalendar()
    .filter((item) => item.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  for (const item of calendar) {
    actions.push({
      id: `cal-${item.id}`,
      title: item.title,
      reason: `${item.kind} on ${item.date}${item.firm ? ` · ${item.firm}` : ''}`,
      href: item.kind === 'interview' ? '/mock' : '/dashboard',
      source: 'calendar',
      priority: actions.length,
    })
  }

  const readiness = loadReadiness()
  const gaps = (Object.entries(readiness) as [ReadinessDimension, number][])
    .filter(([, score]) => score < 60)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)

  for (const [dim, score] of gaps) {
    const already = actions.some((a) => a.href === GAP_HREF[dim])
    if (already) continue
    actions.push({
      id: `gap-${dim}`,
      title: `Close ${dim} gap`,
      reason: `Readiness ${score}% — below 60% threshold.`,
      href: GAP_HREF[dim],
      source: 'readiness',
      priority: actions.length,
    })
  }

  return actions.sort((a, b) => a.priority - b.priority)
}
