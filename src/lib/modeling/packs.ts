export type PaperLboPack = {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  durationMin: number
  description: string
}

export const PAPER_LBO_PACKS: PaperLboPack[] = [
  {
    id: 'lbo-basics-15',
    title: 'Paper LBO fundamentals',
    difficulty: 'easy',
    durationMin: 15,
    description:
      'Sources & uses, simple debt schedule, and MOIC/IRR with flat EBITDA.',
  },
  {
    id: 'lbo-growth-case-25',
    title: 'Growth + margin expansion case',
    difficulty: 'medium',
    durationMin: 25,
    description:
      'Revenue CAGR, EBITDA margin ramp, and exit multiple sensitivity.',
  },
  {
    id: 'lbo-cyclical-30',
    title: 'Cyclical trough entry',
    difficulty: 'medium',
    durationMin: 30,
    description:
      'Normalize earnings, size debt through a trough, and stress FCF.',
  },
  {
    id: 'lbo-add-on-35',
    title: 'Platform + add-on paper LBO',
    difficulty: 'hard',
    durationMin: 35,
    description:
      'Base platform returns plus one tuck-in with synergy and financing.',
  },
  {
    id: 'lbo-piks-refi-40',
    title: 'PIK / refinancing path',
    difficulty: 'hard',
    durationMin: 40,
    description:
      'Toggle cash/PIK interest, optional refinancing, and returns bridge.',
  },
]

export function getPack(id: string): PaperLboPack | undefined {
  return PAPER_LBO_PACKS.find((p) => p.id === id)
}
