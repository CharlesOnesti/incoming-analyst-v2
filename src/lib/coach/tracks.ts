export type CareerTrackId = 'pe' | 'ib' | 'growth' | 'credit' | 'hf'

export type CareerTrack = {
  id: CareerTrackId
  title: string
  summary: string
  focusAreas: string[]
  interviewEmphasis: string[]
  href: string
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'pe',
    title: 'Private equity',
    summary: 'Control / growth buyouts — LBO fluency, deals, and judgment.',
    focusAreas: ['Paper LBOs', 'Deal walkthroughs', 'Operating diligence'],
    interviewEmphasis: ['Fit + technicals', 'Case / CIM memos', 'Firm knowledge'],
    href: '/dashboard',
  },
  {
    id: 'ib',
    title: 'Investment banking',
    summary: 'Coverage and product — accounting, valuation, and process.',
    focusAreas: ['Accounting links', 'DCF / comps', 'Process stories'],
    interviewEmphasis: ['Technical drills', 'Behavioral', 'Deal experience'],
    href: '/technicals',
  },
  {
    id: 'growth',
    title: 'Growth equity',
    summary: 'Minority growth capital — market sizing and unit economics.',
    focusAreas: ['Market sizing', 'SaaS metrics', 'Go-to-market diligence'],
    interviewEmphasis: ['Commercial judgment', 'Growth cases', 'Why growth vs buyout'],
    href: '/judgment',
  },
  {
    id: 'credit',
    title: 'Private credit',
    summary: 'Direct lending and opportunistic credit — downside and docs.',
    focusAreas: ['Credit memos', 'Coverage / covenants', 'Capital structure'],
    interviewEmphasis: ['Downside cases', 'Docs literacy', 'Relative value'],
    href: '/technicals',
  },
  {
    id: 'hf',
    title: 'Hedge fund',
    summary: 'Public markets investing — thesis quality and risk framing.',
    focusAreas: ['Long/short theses', 'Variant perception', 'Risk management'],
    interviewEmphasis: ['Stock pitches', 'Market awareness', 'Intellectual honesty'],
    href: '/judgment',
  },
]

export function getTrack(id: CareerTrackId): CareerTrack | undefined {
  return CAREER_TRACKS.find((t) => t.id === id)
}
