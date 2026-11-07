export type ModelTemplate = {
  id: string
  title: string
  filename: string
  description: string
  /** Public path under /templates/... */
  path: string
}

export const MODEL_TEMPLATES: ModelTemplate[] = [
  {
    id: 'simple-lbo-outline',
    title: 'Simple LBO outline',
    filename: 'simple-lbo-outline.txt',
    description:
      'Entry / debt / FCF / exit skeleton for timed paper LBOs.',
    path: '/templates/simple-lbo-outline.txt',
  },
  {
    id: 'saas-operating-outline',
    title: 'SaaS operating outline',
    filename: 'saas-operating-outline.txt',
    description:
      'ARR bridge, retention, and unit-economics checklist for SaaS drills.',
    path: '/templates/saas-operating-outline.txt',
  },
]

export function getTemplate(id: string): ModelTemplate | undefined {
  return MODEL_TEMPLATES.find((t) => t.id === id)
}
