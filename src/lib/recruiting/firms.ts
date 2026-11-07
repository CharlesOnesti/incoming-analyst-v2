export type FirmRecord = {
  id: string
  name: string
  fundSize: string
  strategy: string
  sectors: string[]
  geography: string
  recruitingNotes: string
  portfolioSample: string[]
  sourceTag: 'verified' | 'inferred'
}

export const FIRMS: FirmRecord[] = [
  {
    id: 'kkr',
    name: 'KKR',
    fundSize: 'Multi-strategy; flagship PE funds tens of billions AUM',
    strategy: 'Global private equity across buyout, growth, and infrastructure',
    sectors: ['Technology', 'Healthcare', 'Consumer', 'Industrials', 'Financial services'],
    geography: 'Global (Americas, Europe, Asia)',
    recruitingNotes:
      'Associate hiring via on-cycle and off-cycle; strong emphasis on deal reps and modeling.',
    portfolioSample: ['Envision Healthcare (historical)', 'Petco (historical)', 'Axalta'],
    sourceTag: 'verified',
  },
  {
    id: 'blackstone',
    name: 'Blackstone',
    fundSize: 'Largest alternative asset manager; PE among multiple strategies',
    strategy: 'Corporate private equity, real estate, credit, and multi-asset',
    sectors: ['Software', 'Business services', 'Healthcare', 'Consumer'],
    geography: 'Global',
    recruitingNotes:
      'Highly competitive analyst/associate funnel; expect fit + technical depth.',
    portfolioSample: ['Hilton (historical)', 'Refinitiv (historical)', 'Ancestry'],
    sourceTag: 'verified',
  },
  {
    id: 'carlyle',
    name: 'The Carlyle Group',
    fundSize: 'Global multi-fund PE platform',
    strategy: 'Corporate private equity, real assets, and global credit',
    sectors: ['Aerospace & defense', 'Healthcare', 'Technology', 'Consumer'],
    geography: 'Global',
    recruitingNotes:
      'Sector coverage varies by fund; prepare industry opinions for coverage teams.',
    portfolioSample: ['ZoomInfo (historical stake contexts)', 'MedRisk', 'USIS (historical)'],
    sourceTag: 'verified',
  },
  {
    id: 'tpg',
    name: 'TPG',
    fundSize: 'Large-cap and middle-market PE strategies',
    strategy: 'Control buyouts and growth equity with operating partner model',
    sectors: ['Healthcare', 'Technology', 'Consumer', 'Travel'],
    geography: 'Primarily Americas; selective Europe/Asia',
    recruitingNotes:
      'Values commercial judgment and operating-plan fluency in interviews.',
    portfolioSample: ['DirecTV (historical)', 'Uber (historical growth)', 'McAfee (historical)'],
    sourceTag: 'verified',
  },
  {
    id: 'apollo',
    name: 'Apollo Global Management',
    fundSize: 'Large PE and hybrid value strategies; significant credit platform',
    strategy: 'Opportunistic buyouts, hybrid capital, and credit adjacency',
    sectors: ['Chemicals', 'Logistics', 'Financial services', 'Industrials'],
    geography: 'Global',
    recruitingNotes:
      'Expect comfort with complex capital structures and downside cases.',
    portfolioSample: ['ADTs (historical contexts)', 'Yahoo (historical)', 'Rackspace (historical)'],
    sourceTag: 'verified',
  },
  {
    id: 'warburg',
    name: 'Warburg Pincus',
    fundSize: 'Global growth-oriented PE',
    strategy: 'Growth equity and buyouts with thematic sector investing',
    sectors: ['Technology', 'Healthcare', 'Financial services', 'Consumer'],
    geography: 'Global with deep Asia exposure historically',
    recruitingNotes:
      'Growth stories and market-sizing judgment often featured in process.',
    portfolioSample: ['Malt', 'Cedar Gate (illustrative growth names vary by vintage)'],
    sourceTag: 'verified',
  },
  {
    id: 'silver-lake',
    name: 'Silver Lake',
    fundSize: 'Large technology-focused PE',
    strategy: 'Technology control and growth investments',
    sectors: ['Enterprise software', 'Internet', 'Semi / hardware adjacencies'],
    geography: 'Global tech hubs',
    recruitingNotes:
      'Product and tech diligence literacy is a differentiator.',
    portfolioSample: ['Dell (historical)', 'Airbnb (historical)', 'Wayfair (historical contexts)'],
    sourceTag: 'verified',
  },
  {
    id: 'thoma-bravo',
    name: 'Thoma Bravo',
    fundSize: 'Software-focused mega-fund complex',
    strategy: 'Application and infrastructure software buyouts',
    sectors: ['Software', 'Cybersecurity', 'Fintech infrastructure'],
    geography: 'Primarily North America; selective Europe',
    recruitingNotes:
      'SaaS metrics fluency (NRR, Rule of 40) is table stakes.',
    portfolioSample: ['SolarWinds (historical)', 'Proofpoint', 'RealPage (historical)'],
    sourceTag: 'verified',
  },
  {
    id: 'advent',
    name: 'Advent International',
    fundSize: 'Global large buyout platform',
    strategy: 'Control buyouts with sector specialization',
    sectors: ['Healthcare', 'Retail / consumer', 'Business services', 'Technology'],
    geography: 'Americas and Europe',
    recruitingNotes:
      'Strong process discipline; prepare clean deal walkthroughs.',
    portfolioSample: ['lululemon (historical)', 'Nilsen', 'Grupo Biotoscana (historical)'],
    sourceTag: 'verified',
  },
]

export function getFirm(id: string): FirmRecord | undefined {
  return FIRMS.find((f) => f.id === id)
}

export function findFirmByName(name: string): FirmRecord | undefined {
  const n = name.trim().toLowerCase()
  return FIRMS.find(
    (f) => f.name.toLowerCase() === n || f.id === n.replace(/\s+/g, '-'),
  )
}
