export type AppMode = {
  id: string
  label: string
  blurb: string
  href: string
  group: 'practice' | 'prepare' | 'recruit' | 'coach'
  needsDifficulty?: boolean
}

export const APP_MODES: AppMode[] = [
  {
    id: 'lbo',
    label: 'Paper LBO',
    blurb: 'Timed cases with asks and sensitivity follow-ups',
    href: '/quiz',
    group: 'practice',
    needsDifficulty: true,
  },
  {
    id: 'technicals',
    label: 'Technicals',
    blurb: 'Accounting, valuation, LBO, and returns drills',
    href: '/technicals',
    group: 'practice',
    needsDifficulty: true,
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    blurb: 'Rapid-fire concept cards from the technicals bank',
    href: '/flashcards',
    group: 'practice',
    needsDifficulty: true,
  },
  {
    id: 'fit',
    label: 'Fit answers',
    blurb: 'Core behavioral prompts with 30s/60s model answers',
    href: '/fit',
    group: 'practice',
  },
  {
    id: 'judgment',
    label: 'Business judgment',
    blurb: 'Market sizing, unit economics, and screening prompts',
    href: '/judgment',
    group: 'practice',
  },
  {
    id: 'mock',
    label: 'Mock interview',
    blurb: 'Scripted fit, technical, deal, and mixed sessions',
    href: '/mock',
    group: 'practice',
  },
  {
    id: 'modeling',
    label: 'Modeling lab',
    blurb: 'Paper LBO packs, Excel templates, operating drills',
    href: '/modeling',
    group: 'practice',
  },
  {
    id: 'cases',
    label: 'Case studies',
    blurb: 'CIM-style cases, memo outlines, and IC drills',
    href: '/cases',
    group: 'practice',
  },
  {
    id: 'curriculum',
    label: 'PE education',
    blurb: 'PE 101, roles, lifecycle, workstreams, glossary',
    href: '/curriculum',
    group: 'prepare',
  },
  {
    id: 'story',
    label: 'Story & resume',
    blurb: 'Build your narrative and resume outline versions',
    href: '/story',
    group: 'prepare',
  },
  {
    id: 'deals',
    label: 'Deal library',
    blurb: 'Structure each transaction and rehearse follow-ups',
    href: '/deals',
    group: 'prepare',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    blurb: 'Readiness, study plan, calendar, and debriefs',
    href: '/dashboard',
    group: 'coach',
  },
  {
    id: 'firms',
    label: 'Firm discovery',
    blurb: 'Target firms, strategies, and research briefs',
    href: '/firms',
    group: 'recruit',
  },
  {
    id: 'headhunters',
    label: 'Headhunters',
    blurb: 'Recruiters mapped to PE mandates and prep tips',
    href: '/headhunters',
    group: 'recruit',
  },
  {
    id: 'outreach',
    label: 'Outreach',
    blurb: 'Draft intros, follow-ups, and tracker updates',
    href: '/outreach',
    group: 'recruit',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    blurb: 'Email, docs, calendar, and tracker connectors',
    href: '/integrations',
    group: 'recruit',
  },
  {
    id: 'coach',
    label: 'Recruiting coach',
    blurb: 'Proactive next actions across prep and outreach',
    href: '/coach',
    group: 'coach',
  },
  {
    id: 'settings',
    label: 'Settings',
    blurb: 'Profile, privacy, backup, and agent preferences',
    href: '/settings',
    group: 'coach',
  },
]
