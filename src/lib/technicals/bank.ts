import type { TechnicalQuestion } from './types'

export const TECHNICAL_QUESTIONS: TechnicalQuestion[] = [
  // --- Good LBO candidate ---
  {
    id: 'lbo-stable-fcf',
    difficulty: 'easy',
    topic: 'lboCandidate',
    prompt:
      'Which characteristic best describes a strong LBO candidate?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Highly cyclical cash flows with large discretionary CapEx' },
      { id: 'b', text: 'Stable, predictable free cash flow and modest CapEx needs' },
      { id: 'c', text: 'Negative EBITDA but very high revenue growth' },
      { id: 'd', text: 'A business that requires continuous equity injections' },
    ],
    correctChoiceId: 'b',
    explanation:
      'A leveraged buyout depends on the company’s ability to service debt out of operating cash flow. Stable free cash flow and modest capital expenditure needs support that capital structure, whereas cyclicality or ongoing cash burn increase the risk of default.',
  },
  {
    id: 'lbo-not-ideal',
    difficulty: 'easy',
    topic: 'lboCandidate',
    prompt:
      'Which of the following is generally NOT a desirable LBO attribute?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Recurring or contracted revenue' },
      { id: 'b', text: 'Defensible market position' },
      { id: 'c', text: 'Customer concentration of 70% or more with a single buyer' },
      { id: 'd', text: 'Identifiable cost or pricing levers' },
    ],
    correctChoiceId: 'c',
    explanation:
      'Heavy dependence on a single customer creates both credit and equity risk if that relationship is lost. Recurring revenue, a defensible market position, and clear operating improvement levers are typically viewed as supportive of an LBO thesis.',
  },
  {
    id: 'lbo-exit-path',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'Why do PE interviewers care about a credible exit path when evaluating an LBO candidate?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Because IRR depends only on the entry multiple' },
      { id: 'b', text: 'Because equity returns are realized when the stake is sold or refinanced, so the set of plausible buyers matters' },
      { id: 'c', text: 'Because lenders forbid exits within five years' },
      { id: 'd', text: 'Because money-on-money multiple ignores the passage of time' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Modeled returns assume the sponsor can monetize the equity at exit. If there is no realistic path to a strategic sale, an IPO, or a secondary buyout, the exit equity in the paper LBO is far less credible.',
  },
  {
    id: 'lbo-asset-light',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'All else equal, why is an asset-light business often preferred for an LBO relative to a heavy CapEx manufacturer?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'It always trades at a lower EV/EBITDA multiple' },
      { id: 'b', text: 'A larger share of EBITDA converts into free cash flow available for debt paydown' },
      { id: 'c', text: 'Interest is never tax-deductible for asset-heavy firms' },
      { id: 'd', text: 'Working capital is always negative' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Lower maintenance capital expenditure leaves more free cash flow after EBITDA. That cash can repay debt, reduce net leverage, and increase the equity value realized at exit.',
  },

  // --- Return drivers ---
  {
    id: 'returns-three-levers',
    difficulty: 'easy',
    topic: 'returnDrivers',
    prompt:
      'The three primary sources of equity return in a typical LBO are:',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Revenue growth alone, tax rate reductions, and dividend policy' },
      { id: 'b', text: 'EBITDA growth, debt paydown through deleveraging, and change in exit multiple' },
      { id: 'c', text: 'Working capital, depreciation and amortization, and PIK interest' },
      { id: 'd', text: 'Management fees, carried interest, and preferred equity' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Equity returns are usually attributed to growth in EBITDA, reduction in net debt funded by free cash flow, and any expansion or compression of the exit valuation multiple relative to entry.',
  },
  {
    id: 'returns-least-controllable',
    difficulty: 'easy',
    topic: 'returnDrivers',
    prompt:
      'Which return lever do interviewers usually treat as least controllable by the sponsor?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Cost reduction or margin expansion' },
      { id: 'b', text: 'Debt paydown from free cash flow' },
      { id: 'c', text: 'Multiple expansion at exit' },
      { id: 'd', text: 'Working capital improvement' },
    ],
    correctChoiceId: 'c',
    explanation:
      'Exit multiple expansion depends largely on market conditions and buyer appetite. A strong interview answer emphasizes operating improvements and deleveraging rather than assuming a higher exit multiple.',
  },
  {
    id: 'returns-parity-exit',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'In a paper LBO that assumes the exit multiple equals the entry multiple, which levers still drive money-on-money returns?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Tax rate alone' },
      { id: 'b', text: 'EBITDA growth and net debt reduction, amplified by the size of the equity check' },
      { id: 'c', text: 'PIK interest toggles alone' },
      { id: 'd', text: 'Transaction fees alone' },
    ],
    correctChoiceId: 'b',
    explanation:
      'When the exit multiple matches entry, enterprise value still rises with EBITDA, and equity value rises further as free cash flow reduces net debt. A smaller equity check magnifies the resulting money-on-money multiple.',
  },
  {
    id: 'returns-mom-vs-irr',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'Holding the money-on-money multiple fixed, what happens to IRR if the hold period shortens?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'IRR falls' },
      { id: 'b', text: 'IRR rises' },
      { id: 'c', text: 'IRR is unchanged because the money-on-money multiple is unchanged' },
      { id: 'd', text: 'IRR becomes undefined' },
    ],
    correctChoiceId: 'b',
    explanation:
      'IRR is the annualized rate of return implied by the money-on-money multiple. The same multiple earned over fewer years corresponds to a higher IRR, and the reverse is also true.',
  },
  {
    id: 'returns-ebitda-bridge',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'A sponsor buys at 10.0x LTM EBITDA. If EBITDA rises by $40 million and the exit multiple is unchanged, by how much does exit enterprise value increase ($mm)?',
    kind: 'numeric',
    correctValue: 400,
    tolerance: 1,
    explanation:
      'The change in exit enterprise value equals the exit multiple multiplied by the change in EBITDA, which is 10 × 40, or $400 million, before any change in net debt.',
  },

  // --- Leverage ---
  {
    id: 'lev-why-debt',
    difficulty: 'easy',
    topic: 'leverage',
    prompt: 'Why do private equity firms use leverage in an LBO?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Debt always reduces bankruptcy risk' },
      { id: 'b', text: 'A smaller equity contribution amplifies equity returns if value grows, and interest is often tax-deductible' },
      { id: 'c', text: 'Lenders require a money-on-money multiple above 5.0x' },
      { id: 'd', text: 'Debt eliminates the need for an exit' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Debt reduces the equity the sponsor must contribute, so gains and losses on that equity are magnified. Interest deductibility can improve after-tax cash flow, but higher leverage also increases financial risk.',
  },
  {
    id: 'lev-irr-vs-mom',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'All else equal, increasing leverage at entry typically:',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Lowers IRR and raises the money-on-money multiple' },
      { id: 'b', text: 'Raises both IRR and the money-on-money multiple if the investment succeeds, while increasing downside risk' },
      { id: 'c', text: 'Has no effect on equity returns' },
      { id: 'd', text: 'Affects taxes only and leaves returns unchanged' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Additional debt reduces the equity check, which increases money-on-money and IRR when performance is strong. The same structure worsens outcomes if cash flow disappoints, including a higher likelihood of covenant pressure or distress. A complete answer addresses both the upside amplification and the downside risk.',
  },
  {
    id: 'lev-too-much',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'What is the main constraint on how much debt an LBO can support?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'The company’s free cash flow and the leverage and coverage levels lenders will underwrite' },
      { id: 'b', text: 'The sponsor’s preferred dividend policy' },
      { id: 'c', text: 'Whether the company is public or private' },
      { id: 'd', text: 'The size of the management option pool alone' },
    ],
    correctChoiceId: 'a',
    explanation:
      'Debt capacity is determined by credit fundamentals: free cash flow available to pay interest and amortization, and the leverage multiples the lending market will accept for that business.',
  },
  {
    id: 'lev-equity-check',
    difficulty: 'hard',
    topic: 'leverage',
    prompt:
      'Entry enterprise value is $800 million, funded 60% with debt and 40% with equity, with no fees. What is the sponsor equity check ($mm)?',
    kind: 'numeric',
    correctValue: 320,
    tolerance: 1,
    explanation:
      'Sponsor equity equals 40 percent of entry enterprise value, which is 0.40 × 800, or $320 million.',
  },

  // --- Valuation ---
  {
    id: 'val-ev-equity',
    difficulty: 'easy',
    topic: 'valuation',
    prompt: 'Enterprise value equals:',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Equity value minus net debt' },
      { id: 'b', text: 'Equity value plus net debt, or roughly equity plus debt minus cash' },
      { id: 'c', text: 'Market capitalization alone' },
      { id: 'd', text: 'EBITDA multiplied by the tax rate' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Enterprise value is the value of the firm’s core operations to all capital providers. In the simplified bridge, equity value equals enterprise value minus net debt, where net debt is debt less cash.',
  },
  {
    id: 'val-methods',
    difficulty: 'easy',
    topic: 'valuation',
    prompt:
      'Which set lists the three core valuation approaches private equity interviews most often expect?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Comparable companies, precedent transactions, and discounted cash flow' },
      { id: 'b', text: 'Liquidation value alone' },
      { id: 'c', text: 'LBO returns analysis alone' },
      { id: 'd', text: 'CAPM, WACC, and beta alone' },
    ],
    correctChoiceId: 'a',
    explanation:
      'Trading comps, precedent transactions, and a discounted cash flow are the standard trio. An LBO analysis is typically used as a returns or affordability lens in addition to those methods.',
  },
  {
    id: 'val-unlevered-fcf',
    difficulty: 'medium',
    topic: 'valuation',
    prompt: 'Unlevered free cash flow is best described as:',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Cash flow after interest, available only to equity holders' },
      { id: 'b', text: 'Cash flow before interest, available to debt and equity capital providers' },
      { id: 'c', text: 'Net income plus dividends' },
      { id: 'd', text: 'EBITDA with no further adjustments' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Unlevered free cash flow is measured before interest and is therefore independent of capital structure. That is why discounted cash flow models often discount unlevered free cash flow at the weighted average cost of capital.',
  },
  {
    id: 'val-entry-ev',
    difficulty: 'medium',
    topic: 'valuation',
    prompt:
      'LTM EBITDA is $50 million and the entry multiple is 12.0x. What is entry enterprise value ($mm)?',
    kind: 'numeric',
    correctValue: 600,
    tolerance: 1,
    explanation:
      'Entry enterprise value equals the entry multiple multiplied by LTM EBITDA, which is 12 × 50, or $600 million.',
  },
  {
    id: 'val-ebitda-to-equity',
    difficulty: 'hard',
    topic: 'valuation',
    prompt:
      'Assume EV/EBITDA remains at 8.0x and net debt is unchanged. If EBITDA increases by $25 million, by how much does equity value increase ($mm)?',
    kind: 'numeric',
    correctValue: 200,
    tolerance: 1,
    explanation:
      'With net debt held constant, the change in equity value equals the change in enterprise value. That change is 8 × 25, or $200 million.',
  },

  // --- Accounting ---
  {
    id: 'acct-three-statements',
    difficulty: 'easy',
    topic: 'accounting',
    prompt:
      'How do the three financial statements connect at a high level?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'They are independent and never reconcile' },
      { id: 'b', text: 'Net income flows into the cash flow statement and retained earnings; the cash flow statement reconciles the change in cash on the balance sheet' },
      { id: 'c', text: 'Only the income statement matters for LBOs' },
      { id: 'd', text: 'The balance sheet ignores net income' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Net income links the income statement to the cash flow statement as its typical starting point and to the balance sheet through retained earnings. The cash flow statement then explains the period’s change in cash on the balance sheet.',
  },
  {
    id: 'acct-da-cash',
    difficulty: 'easy',
    topic: 'accounting',
    prompt:
      'Depreciation increases by $10 with no other changes. What happens to cash if taxes are ignored?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Cash falls by $10' },
      { id: 'b', text: 'Cash is unchanged because depreciation and amortization are non-cash' },
      { id: 'c', text: 'Cash rises by $10 on the income statement alone' },
      { id: 'd', text: 'Cash falls by $10 × (1 − tax rate) only if CapEx also rises' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Ignoring taxes, higher depreciation reduces net income but is added back on the cash flow statement, so cash is unchanged. Once taxes are considered, higher depreciation can increase cash through a tax shield.',
  },
  {
    id: 'acct-nwc',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'If net working capital increases, free cash flow:',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Increases dollar for dollar' },
      { id: 'b', text: 'Decreases because more cash is tied up in the business' },
      { id: 'c', text: 'Is unaffected' },
      { id: 'd', text: 'Affects interest expense only' },
    ],
    correctChoiceId: 'b',
    explanation:
      'An increase in net working capital consumes cash. In free cash flow and LBO debt-paydown schedules, growth in net working capital is therefore treated as a cash outflow.',
  },
  {
    id: 'acct-asset-purchase',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'A company buys a $100 asset with cash and no debt. Immediately afterward, what happens to enterprise value in a simple framework that treats cash as non-operating?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Enterprise value rises by $100 because assets increased' },
      { id: 'b', text: 'Enterprise value is essentially unchanged because cash was exchanged for an operating asset' },
      { id: 'c', text: 'Enterprise value falls by $100' },
      { id: 'd', text: 'Equity value must fall by $100' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Cash declines by $100 while property, plant, and equipment rise by $100, so equity value is unchanged. In the usual non-operating cash framework, enterprise value is likewise unchanged: the firm has swapped one asset for another rather than creating $100 of new value.',
  },
  {
    id: 'acct-fcf-simple',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'EBITDA is $120, depreciation and amortization are $20, cash interest is $15, cash taxes are $18, CapEx is $25, and the increase in net working capital is $7. Approximating levered free cash flow as net income plus D&A minus CapEx minus the increase in NWC, and taking net income as EBITDA minus D&A minus interest minus taxes ($67), what is levered free cash flow ($mm)?',
    kind: 'numeric',
    correctValue: 55,
    tolerance: 1,
    explanation:
      'Net income equals 120 − 20 − 15 − 18, or 67. Levered free cash flow is then approximately 67 + 20 − 25 − 7, which equals $55 million.',
  },
  {
    id: 'acct-tax-shield',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'Depreciation increases by $10 and the tax rate is 25 percent. Ignoring other effects, by how much does cash increase?',
    kind: 'numeric',
    correctValue: 2.5,
    tolerance: 0.1,
    explanation:
      'The additional depreciation reduces taxes by 10 × 25 percent, or $2.50. Net income falls by $7.50, but adding back the $10 of depreciation on the cash flow statement leaves cash higher by $2.50.',
  },
  {
    id: 'acct-goodwill',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'In a stock-purchase LBO, purchase accounting often creates goodwill equal to:',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'The residual of purchase price over the fair value of identifiable net assets after write-ups' },
      { id: 'b', text: 'EBITDA multiplied by the entry multiple' },
      { id: 'c', text: 'Total debt alone' },
      { id: 'd', text: 'Annual capital expenditure' },
    ],
    correctChoiceId: 'a',
    explanation:
      'Goodwill is the residual of consideration transferred over the fair value of identifiable net assets after asset write-ups. Interview settings sometimes simplify this as equity paid relative to book equity, but the precise definition is the purchase-accounting residual.',
  },
]
