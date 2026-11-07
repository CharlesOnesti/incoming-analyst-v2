export type DealSeniority = 'associate' | 'vp' | 'partner'

export type DealSection =
  | 'overview'
  | 'businessModel'
  | 'industry'
  | 'thesis'
  | 'valuation'
  | 'structure'
  | 'diligence'
  | 'risks'
  | 'contribution'

export type DealCard = {
  id: string
  companyName: string
  role: string
  overview: string
  businessModel: string
  industry: string
  thesis: string
  valuation: string
  structure: string
  diligence: string
  risks: string
  contribution: string
  updatedAt: string
}
