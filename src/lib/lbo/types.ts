export type Difficulty = 'easy' | 'medium' | 'hard'

export type LboInputs = {
  entryMult: number
  exitMult: number
  ltmRev: number
  ebitdaMargin: number
  debtPercent: number
  intRate: number
  revGrowth: number
  taxRate: number
  capexPr: number
  nwcPr: number
}

export type FinancialKey =
  | 'Revenue'
  | 'EBITDA'
  | 'DA'
  | 'EBIT'
  | 'Interest'
  | 'EBT'
  | 'Taxes'
  | 'Income'
  | 'NegatedDA'
  | 'NWC_Change'
  | 'Capex'
  | 'FCF'
  | 'NWC'

export type LboSolution = {
  irr: number
  financials: Record<FinancialKey, number[]>
  returns: {
    entryMult: number
    exitMult: number
    entryEv: number
    exitEv: number
    entryNd: number
    exitNd: number
    entryEquity: number
    exitEquity: number
    mom: number
  }
}

export type AskKind =
  | 'irr'
  | 'mom'
  | 'entryEquity'
  | 'exitEquity'
  | 'yearFcf'
  | 'sourcesUses'

export type FcfYear = 1 | 2 | 3 | 4 | 5

export type Ask =
  | { kind: 'irr' }
  | { kind: 'mom' }
  | { kind: 'entryEquity' }
  | { kind: 'exitEquity' }
  | { kind: 'yearFcf'; year: FcfYear }
  | { kind: 'sourcesUses' }

export type SourcesUsesAnswer = {
  entryEv: number
  debt: number
  equity: number
}

export type PromptResult = {
  text: string
  styleId: string
}

export type ShockId =
  | 'exitMultUp'
  | 'exitMultDown'
  | 'revGrowthUp'
  | 'revGrowthDown'
  | 'marginUp'
  | 'marginDown'
  | 'debtUp'
  | 'debtDown'
  | 'taxRateUp'
  | 'taxRateDown'
  | 'capexUp'
  | 'capexDown'
  | 'intRateUp'
  | 'intRateDown'

export type Shock = {
  id: ShockId
  label: string
  apply: (inputs: LboInputs) => LboInputs
}

export type Scenario = {
  inputs: LboInputs
  solution: LboSolution
  ask: Ask
  promptText: string
  styleId: string
  difficulty: Difficulty
  followUpPrompt?: string
  shock?: Shock
}
