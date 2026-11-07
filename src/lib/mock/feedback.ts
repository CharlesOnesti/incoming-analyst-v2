const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually']

export type AnswerAnalysis = {
  score: number
  notes: string[]
}

function wordCount(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

function countFillers(normalized: string): { total: number; hits: string[] } {
  const hits: string[] = []
  let total = 0
  for (const filler of FILLER_WORDS) {
    const pattern =
      filler.includes(' ')
        ? new RegExp(`\\b${filler.replace(/\s+/g, '\\s+')}\\b`, 'gi')
        : new RegExp(`\\b${filler}\\b`, 'gi')
    const matches = normalized.match(pattern)
    if (matches && matches.length > 0) {
      total += matches.length
      hits.push(`${filler}×${matches.length}`)
    }
  }
  return { total, hits }
}

export function analyzeAnswer(
  text: string,
  rubricKeywords: string[],
): AnswerAnalysis {
  const notes: string[] = []
  const words = wordCount(text)
  const normalized = text.toLowerCase()

  if (words === 0) {
    return { score: 0, notes: ['Answer is empty.'] }
  }

  let score = 40

  // Length: reward mid-length interview answers (~80–180 words)
  if (words >= 80 && words <= 180) {
    score += 25
    notes.push(`Strong length for a spoken answer (${words} words).`)
  } else if (words >= 40 && words < 80) {
    score += 10
    notes.push(`A bit short (${words} words) — add one concrete example.`)
  } else if (words > 180 && words <= 260) {
    score += 10
    notes.push(`Slightly long (${words} words) — tighten the close.`)
  } else if (words < 40) {
    score -= 15
    notes.push(`Too short (${words} words) for a credible interview answer.`)
  } else {
    score -= 10
    notes.push(`Too long (${words} words) — cut filler and land the point.`)
  }

  const { total: fillerCount, hits: fillerHits } = countFillers(normalized)
  if (fillerCount === 0) {
    score += 10
    notes.push('No common filler words detected.')
  } else if (fillerCount <= 2) {
    score += 3
    notes.push(`Light filler usage (${fillerHits.join(', ')}).`)
  } else {
    score -= Math.min(20, fillerCount * 3)
    notes.push(
      `Reduce fillers (${fillerHits.join(', ')}) — pause instead of padding.`,
    )
  }

  const hits = rubricKeywords.filter((kw) =>
    normalized.includes(kw.toLowerCase()),
  )
  const ratio =
    rubricKeywords.length === 0 ? 0 : hits.length / rubricKeywords.length
  score += Math.round(ratio * 35)

  if (rubricKeywords.length === 0) {
    notes.push('No rubric keywords provided — scored on length and fillers.')
  } else if (hits.length === 0) {
    notes.push(
      `Missed rubric themes. Weave in: ${rubricKeywords.slice(0, 4).join(', ')}.`,
    )
  } else if (ratio < 0.4) {
    notes.push(
      `Partial rubric coverage (${hits.length}/${rubricKeywords.length}): ${hits.join(', ')}.`,
    )
  } else {
    notes.push(
      `Good rubric coverage (${hits.length}/${rubricKeywords.length}): ${hits.join(', ')}.`,
    )
  }

  score = Math.max(0, Math.min(100, score))
  return { score, notes }
}
