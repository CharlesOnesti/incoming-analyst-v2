import type { FinancialKey } from './types'

export const FINANCIAL_LABELS: Record<FinancialKey, string> = {
  Revenue: 'Revenue',
  EBITDA: 'EBITDA',
  DA: '(-) D&A',
  EBIT: 'EBIT',
  Interest: '(-) Interest',
  EBT: 'EBT',
  Taxes: '(-) Taxes',
  Income: 'Net Income',
  NegatedDA: '(+) D&A',
  NWC_Change: '(-) Increase in NWC',
  Capex: '(-) Capex',
  FCF: 'Free Cash Flow',
  NWC: 'Memo: NWC',
}

export const FINANCIAL_ORDER: FinancialKey[] = [
  'Revenue',
  'EBITDA',
  'DA',
  'EBIT',
  'Interest',
  'EBT',
  'Taxes',
  'Income',
  'NegatedDA',
  'NWC_Change',
  'Capex',
  'FCF',
  'NWC',
]
