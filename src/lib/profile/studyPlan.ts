import { loadCalendar, loadProfile, loadReadiness } from './persistence'
import type { ReadinessDimension } from './types'

export type StudyAction = {
  id: string
  title: string
  reason: string
  href: string
  priority: number
}

const DIMENSION_ROUTES: Record<
  ReadinessDimension,
  { title: string; href: string }
> = {
  fit: { title: 'Practice fit answers', href: '/fit' },
  technicals: { title: 'Drill technicals', href: '/technicals' },
  deals: { title: 'Tighten a deal walkthrough', href: '/deals' },
  lbo: { title: 'Run a paper LBO', href: '/quiz' },
  judgment: { title: 'Business judgment prompts', href: '/judgment' },
  modeling: { title: 'Modeling lab', href: '/modeling' },
  cases: { title: 'Work a case study', href: '/cases' },
}

export function buildStudyPlan(): StudyAction[] {
  const readiness = loadReadiness()
  const profile = loadProfile()
  const calendar = loadCalendar()
  const actions: StudyAction[] = []

  const weak =
    profile.weakAreas.length > 0
      ? profile.weakAreas
      : (Object.entries(readiness) as [ReadinessDimension, number][])
          .sort((a, b) => a[1] - b[1])
          .slice(0, 3)
          .map(([dim]) => dim)

  weak.forEach((dim, index) => {
    const route = DIMENSION_ROUTES[dim]
    actions.push({
      id: `weak-${dim}`,
      title: route.title,
      reason: `Readiness in ${dim} is ${readiness[dim]}% — prioritize this gap.`,
      href: route.href,
      priority: index,
    })
  })

  const upcoming = [...calendar]
    .filter((item) => item.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2)

  for (const item of upcoming) {
    actions.push({
      id: `cal-${item.id}`,
      title: `Prep for ${item.title}`,
      reason: `${item.kind} on ${item.date}${item.firm ? ` · ${item.firm}` : ''}`,
      href: item.kind === 'interview' ? '/mock' : '/dashboard',
      priority: actions.length,
    })
  }

  if (actions.length === 0) {
    actions.push({
      id: 'default-tech',
      title: 'Warm up with technicals',
      reason: 'No weak areas logged yet — start with a short drill set.',
      href: '/technicals',
      priority: 0,
    })
  }

  return actions.sort((a, b) => a.priority - b.priority)
}
