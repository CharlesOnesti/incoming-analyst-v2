import type { FitAnswerLength, FitGrade, FitQuestion } from './types'

function wordCount(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

function normalize(text: string): string {
  return text.toLowerCase()
}

function lengthBand(
  length: FitAnswerLength,
): { min: number; max: number; idealMin: number; idealMax: number } {
  if (length === '30s') {
    return { min: 40, max: 120, idealMin: 60, idealMax: 90 }
  }
  return { min: 80, max: 240, idealMin: 120, idealMax: 180 }
}

export function gradeFitAnswer(
  question: FitQuestion,
  answer: string,
  length: FitAnswerLength = '60s',
): FitGrade {
  const feedback: string[] = []
  const words = wordCount(answer)
  const band = lengthBand(length)
  const normalized = normalize(answer)

  if (words === 0) {
    return { score: 0, feedback: ['Answer is empty.'] }
  }

  let score = 35

  const hits = question.rubricKeywords.filter((kw) =>
    normalized.includes(kw.toLowerCase()),
  )
  const keywordRatio =
    question.rubricKeywords.length === 0
      ? 0
      : hits.length / question.rubricKeywords.length
  const keywordPoints = Math.round(keywordRatio * 45)
  score += keywordPoints

  if (hits.length === 0) {
    feedback.push(
      'Few rubric keywords detected—tie the answer to PE underwriting themes.',
    )
  } else if (keywordRatio < 0.35) {
    feedback.push(
      `Only ${hits.length}/${question.rubricKeywords.length} rubric themes hit. Weave in more of: ${question.rubricKeywords.slice(0, 4).join(', ')}.`,
    )
  } else {
    feedback.push(
      `Solid keyword coverage (${hits.length}/${question.rubricKeywords.length} themes).`,
    )
  }

  if (words >= band.idealMin && words <= band.idealMax) {
    score += 20
    feedback.push(
      `Length fits a ${length} answer (~${band.idealMin}–${band.idealMax} words; you used ${words}).`,
    )
  } else if (words >= band.min && words <= band.max) {
    score += 10
    feedback.push(
      `Length is acceptable but outside the ideal ${length} band (${band.idealMin}–${band.idealMax} words; you used ${words}).`,
    )
  } else if (words < band.min) {
    score -= 15
    feedback.push(
      `Too short for a ${length} answer (${words} words; aim for ~${band.idealMin}–${band.idealMax}).`,
    )
  } else {
    score -= 10
    feedback.push(
      `Too long for a ${length} answer (${words} words; tighten toward ~${band.idealMin}–${band.idealMax}).`,
    )
  }

  for (const pitfall of question.pitfalls) {
    const tokens = pitfall
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length > 4)
      .slice(0, 3)
    if (tokens.length > 0 && tokens.every((t) => normalized.includes(t))) {
      score -= 8
      feedback.push(`Watch for pitfall: ${pitfall}`)
    }
  }

  if (question.structureHints.length > 0 && score >= 70) {
    feedback.push(`Structure hint: ${question.structureHints[0]}`)
  } else if (score < 55 && question.structureHints.length > 0) {
    feedback.push(`Try this structure: ${question.structureHints[0]}`)
  }

  score = Math.max(0, Math.min(100, score))
  return { score, feedback }
}
