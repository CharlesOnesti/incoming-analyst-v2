export type HeadhunterRecord = {
  id: string
  name: string
  firm: string
  covers: string[]
  mandates: string
  prepTips: string[]
}

export const HEADHUNTERS: HeadhunterRecord[] = [
  {
    id: 'hh-sg-1',
    name: 'Alex Rivera',
    firm: 'SG Partners',
    covers: ['KKR', 'Blackstone', 'Apollo'],
    mandates: 'On-cycle and off-cycle PE associate seats at mega-funds',
    prepTips: [
      'Have two deal stories with crisp risks',
      'Paper LBO under 20 minutes',
      'Know why each covered firm’s strategy fits you',
    ],
  },
  {
    id: 'hh-oxbridge-1',
    name: 'Jordan Lee',
    firm: 'Oxbridge Group',
    covers: ['TPG', 'Warburg Pincus', 'Carlyle'],
    mandates: 'Growth and buyout associate searches',
    prepTips: [
      'Market-sizing fluency for growth processes',
      'Clean “why PE / why now” under 60 seconds',
      'Follow up within 24 hours after screens',
    ],
  },
  {
    id: 'hh-cpi-1',
    name: 'Sam Patel',
    firm: 'CPI',
    covers: ['Thoma Bravo', 'Silver Lake'],
    mandates: 'Software / tech PE associate mandates',
    prepTips: [
      'SaaS KPI vocabulary (NRR, CAC payback)',
      'One technical software diligence example',
      'Avoid generic “I like tech” answers',
    ],
  },
  {
    id: 'hh-amity-1',
    name: 'Taylor Brooks',
    firm: 'Amity Search',
    covers: ['Advent International', 'Carlyle', 'KKR'],
    mandates: 'Europe–US cross-border PE associate roles',
    prepTips: [
      'Be ready for timezone-flexible scheduling',
      'Prepare a sector opinion for coverage groups',
      'Keep CV deal bullets quantified',
    ],
  },
  {
    id: 'hh-ratio-1',
    name: 'Casey Nguyen',
    firm: 'Ratio Partners',
    covers: ['Blackstone', 'Apollo', 'TPG'],
    mandates: 'Credit-adjacent and hybrid capital interviews into PE',
    prepTips: [
      'Explain leverage downside clearly',
      'Bridge IB → PE motivation without trashing banking',
      'Have a structured weakness answer',
    ],
  },
  {
    id: 'hh-independents-1',
    name: 'Riley Chen',
    firm: 'Independent / boutique desk',
    covers: ['Thoma Bravo', 'Warburg Pincus', 'Advent International'],
    mandates: 'Off-cycle MM and upper-MM PE associate placements',
    prepTips: [
      'Emphasize ownership of analysis, not just staffing',
      'Know 3 target firms deeply vs. listing 20',
      'Ask the recruiter about process timelines explicitly',
    ],
  },
]

export function getHeadhunter(id: string): HeadhunterRecord | undefined {
  return HEADHUNTERS.find((h) => h.id === id)
}
