import { FIRMS, type FirmRecord } from './firms'

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2)
}

export type FirmRecommendation = {
  firm: FirmRecord
  score: number
  matched: string[]
}

export function recommendFirms(
  profileTargetFirms: string,
  experience: string,
): FirmRecommendation[] {
  const bag = new Set([
    ...tokens(profileTargetFirms),
    ...tokens(experience),
  ])

  const scored = FIRMS.map((firm) => {
    const corpus = [
      firm.name,
      firm.strategy,
      firm.geography,
      ...firm.sectors,
      ...firm.portfolioSample,
    ]
      .join(' ')
      .toLowerCase()

    const matched: string[] = []
    for (const token of bag) {
      if (corpus.includes(token)) matched.push(token)
    }

    // Boost exact firm-name mentions from targets
    const nameHit = tokens(profileTargetFirms).some((t) =>
      firm.name.toLowerCase().includes(t),
    )
    if (nameHit && !matched.includes(firm.name.toLowerCase())) {
      matched.push(firm.name)
    }

    const score = matched.length + (nameHit ? 3 : 0)
    return { firm, score, matched: [...new Set(matched)] }
  })

  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.firm.name.localeCompare(b.firm.name))
}
