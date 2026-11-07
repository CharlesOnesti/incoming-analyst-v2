export type CurriculumSection =
  | 'pe101'
  | 'roles'
  | 'lifecycle'
  | 'workstreams'
  | 'glossary'

export type Lesson = {
  id: string
  section: CurriculumSection
  title: string
  summary: string
  body: string
  order: number
}
