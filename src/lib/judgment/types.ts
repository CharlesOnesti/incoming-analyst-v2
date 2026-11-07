export type JudgmentKind =
  | 'marketSizing'
  | 'unitEconomics'
  | 'screening'
  | 'qualitative'

export type JudgmentPrompt = {
  id: string
  kind: JudgmentKind
  prompt: string
  framework: string[]
  checklist: string[]
  workedExample: string
}
