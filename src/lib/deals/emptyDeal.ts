import type { DealCard } from './types'

export function emptyDeal(overrides: Partial<DealCard> = {}): DealCard {
  const now = new Date().toISOString()
  return {
    id: `deal-${Date.now()}`,
    companyName: '',
    role: '',
    overview: '',
    businessModel: '',
    industry: '',
    thesis: '',
    valuation: '',
    structure: '',
    diligence: '',
    risks: '',
    contribution: '',
    ...overrides,
    updatedAt: overrides.updatedAt ?? now,
  }
}
