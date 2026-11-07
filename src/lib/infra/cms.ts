import { LESSONS } from '../curriculum/lessons'
import { FIT_QUESTIONS } from '../fit/bank'
import { JUDGMENT_PROMPTS } from '../judgment/bank'
import { TECHNICAL_QUESTIONS } from '../technicals/bank'

export type ContentModuleSummary = {
  id: string
  label: string
  count: number
  href: string
}

export function listContentModules(): ContentModuleSummary[] {
  return [
    {
      id: 'curriculum',
      label: 'Curriculum lessons',
      count: LESSONS.length,
      href: '/learn',
    },
    {
      id: 'fit',
      label: 'Fit questions',
      count: FIT_QUESTIONS.length,
      href: '/fit',
    },
    {
      id: 'judgment',
      label: 'Judgment prompts',
      count: JUDGMENT_PROMPTS.length,
      href: '/judgment',
    },
    {
      id: 'technical',
      label: 'Technical questions',
      count: TECHNICAL_QUESTIONS.length,
      href: '/technicals',
    },
  ]
}
