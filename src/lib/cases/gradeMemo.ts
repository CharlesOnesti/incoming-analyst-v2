import type { CaseStudy } from './library'

export type MemoGrade = {
  score: number
  checked: string[]
  missing: string[]
  notes: string[]
}

export function gradeMemo(
  caseStudy: CaseStudy,
  checkedIds: string[],
): MemoGrade {
  const checklist = caseStudy.thesisChecklist
  const checkedSet = new Set(checkedIds)
  const checked = checklist.filter((id) => checkedSet.has(id))
  const missing = checklist.filter((id) => !checkedSet.has(id))

  const ratio = checklist.length === 0 ? 0 : checked.length / checklist.length
  const score = Math.round(ratio * 100)

  const notes: string[] = []
  if (checklist.length === 0) {
    notes.push('No thesis checklist configured for this case.')
  } else if (score === 100) {
    notes.push('All thesis checklist items covered.')
  } else if (score >= 60) {
    notes.push(
      `Solid coverage (${checked.length}/${checklist.length}). Fill gaps: ${missing.join(', ')}.`,
    )
  } else {
    notes.push(
      `Thin thesis coverage (${checked.length}/${checklist.length}). Revisit: ${missing.join(', ')}.`,
    )
  }

  if (caseStudy.memoOutline.length > 0 && score < 80) {
    notes.push(`Memo structure reminder: ${caseStudy.memoOutline[0]}`)
  }

  return { score, checked, missing, notes }
}
