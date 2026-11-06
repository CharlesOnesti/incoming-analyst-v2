import type { TechnicalQuestion } from './types'

/**
 * PE / IB technicals bank.
 *
 * Difficulty rules (see questionsForDifficulty):
 * - easy: foundational concepts with plausible distractors
 * - medium: first-round screen depth (mechanics + light math)
 * - hard: paper-LBO math, statement linkages, and edge cases
 *
 * Sources cross-checked against common PE interview frameworks
 * (BIWS LBO walkthroughs, WSP PE guides, standard EV/equity bridges).
 */
export const TECHNICAL_QUESTIONS: TechnicalQuestion[] = [
  // ---------------------------------------------------------------------------
  // Easy — concepts a strong undergrad / new analyst must own
  // ---------------------------------------------------------------------------
  {
    id: 'lbo-stable-fcf',
    difficulty: 'easy',
    topic: 'lboCandidate',
    prompt:
      'Which attribute most improves a company’s fitness as an LBO candidate?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Lumpy, project-based revenue that can spike 40% in a good year',
      },
      {
        id: 'b',
        text: 'Predictable free cash flow that can service interest and amortize debt',
      },
      {
        id: 'c',
        text: 'A high revenue growth rate even if free cash flow is deeply negative',
      },
      {
        id: 'd',
        text: 'A large addressable market with no near-term path to positive EBITDA',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'An LBO funds a large share of the purchase with debt that must be serviced from the company’s cash flow. Predictable free cash flow supports interest coverage and principal paydown. High growth with negative free cash flow, or lumpy project revenue, raises the risk that the capital structure cannot be sustained.',
  },
  {
    id: 'returns-three-levers',
    difficulty: 'easy',
    topic: 'returnDrivers',
    prompt:
      'In a standard LBO returns attribution, equity value creation is usually split into which three drivers?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Revenue seasonality, working-capital timing, and dividend policy',
      },
      {
        id: 'b',
        text: 'EBITDA growth, debt paydown (deleveraging), and change in the exit multiple',
      },
      {
        id: 'c',
        text: 'Management fees, carried interest, and preferred equity coupons',
      },
      {
        id: 'd',
        text: 'Tax rate changes, share count changes, and FX translation',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Sponsors typically attribute equity gains to (1) higher EBITDA capitalized at a multiple, (2) free cash flow reducing net debt so equity owns more of enterprise value, and (3) any expansion or contraction in the exit EV/EBITDA multiple versus entry. Fee economics and tax items matter, but they are not the three core equity-value drivers interviewers expect.',
  },
  {
    id: 'lev-why-debt',
    difficulty: 'easy',
    topic: 'leverage',
    prompt: 'Why do private equity sponsors typically finance LBOs with substantial debt?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Debt eliminates operating risk and guarantees a successful exit',
      },
      {
        id: 'b',
        text: 'A smaller equity check amplifies equity returns if value grows, and interest is often tax-deductible',
      },
      {
        id: 'c',
        text: 'Lenders require sponsors to minimize equity to below 5% of enterprise value',
      },
      {
        id: 'd',
        text: 'Debt automatically increases the exit EV/EBITDA multiple',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Debt reduces the equity the sponsor must contribute, so gains (and losses) on that equity are magnified. Interest tax deductibility can improve after-tax cash flow. Leverage does not remove operating risk or force multiple expansion; it increases financial risk if cash flow disappoints.',
  },
  {
    id: 'val-ev-equity',
    difficulty: 'easy',
    topic: 'valuation',
    prompt:
      'In the simplified interview bridge, enterprise value is closest to:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Equity value minus net debt',
      },
      {
        id: 'b',
        text: 'Equity value plus net debt (roughly equity + debt − cash)',
      },
      {
        id: 'c',
        text: 'Market capitalization alone, ignoring debt and cash',
      },
      {
        id: 'd',
        text: 'EBITDA multiplied by the statutory tax rate',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Enterprise value is the value of core operations to all capital providers. The common bridge is equity value + debt − cash (plus other adjustments such as preferred or NCI when relevant). Equity value alone is only the claim of equity holders.',
  },
  {
    id: 'val-methods',
    difficulty: 'easy',
    topic: 'valuation',
    prompt:
      'Which trio are the core valuation approaches PE interviews most often expect before discussing an LBO as a returns lens?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Comparable companies, precedent transactions, and discounted cash flow',
      },
      {
        id: 'b',
        text: 'Liquidation value, replacement cost, and sum-of-the-parts only',
      },
      {
        id: 'c',
        text: 'CAPM, arbitrage pricing theory, and dividend discount models only',
      },
      {
        id: 'd',
        text: 'LBO returns analysis used as the sole valuation method',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Trading comps, precedent transactions, and DCF are the standard valuation trio. An LBO analysis is usually used to test what a financial buyer could pay while still clearing return hurdles, not as a replacement for those methods.',
  },
  {
    id: 'acct-nwc-sign',
    difficulty: 'easy',
    topic: 'accounting',
    prompt:
      'All else equal, if net working capital increases during the year, free cash flow:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Increases dollar-for-dollar with the NWC increase',
      },
      {
        id: 'b',
        text: 'Decreases because more cash is tied up in operating working capital',
      },
      {
        id: 'c',
        text: 'Is unaffected because NWC is a non-cash balance-sheet item',
      },
      {
        id: 'd',
        text: 'Affects only interest expense, not free cash flow',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'An increase in net working capital (for example, higher receivables or inventory not offset by payables) consumes cash. In LBO free-cash-flow bridges, ΔNWC is therefore a cash outflow when NWC rises and a source when NWC falls.',
  },
  {
    id: 'acct-da-noncash',
    difficulty: 'easy',
    topic: 'accounting',
    prompt:
      'Depreciation expense rises by $10 and you ignore taxes. What is the immediate effect on cash?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Cash falls by $10 because expense reduces cash',
      },
      {
        id: 'b',
        text: 'Cash is unchanged: net income falls by $10 but depreciation is added back on the cash flow statement',
      },
      {
        id: 'c',
        text: 'Cash rises by $10 because depreciation is a financing inflow',
      },
      {
        id: 'd',
        text: 'Cash falls by $10 × (1 − tax rate) even when taxes are ignored',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Ignoring taxes, higher depreciation lowers net income but is a non-cash charge added back in cash from operations, so cash is unchanged. Once taxes are considered, higher depreciation can increase cash through a tax shield.',
  },
  {
    id: 'returns-mom-irr-time',
    difficulty: 'easy',
    topic: 'returnDrivers',
    prompt:
      'Holding the money-on-money (MoM) multiple fixed, what happens to IRR if the hold period shortens?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'IRR falls because the same gain is earned over fewer years' },
      { id: 'b', text: 'IRR rises because the same multiple is earned in less time' },
      {
        id: 'c',
        text: 'IRR is unchanged because MoM already embeds timing',
      },
      {
        id: 'd',
        text: 'IRR becomes undefined whenever MoM is greater than 1.0x',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'MoM ignores time; IRR annualizes the return. The same MoM over fewer years implies a higher IRR (and a longer hold implies a lower IRR for the same MoM).',
  },

  // ---------------------------------------------------------------------------
  // Medium — first-round PE screen depth
  // ---------------------------------------------------------------------------
  {
    id: 'lbo-not-ideal',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'Which feature is most often a red flag for leverage capacity in an LBO screen?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Recurring or contracted revenue with high retention',
      },
      {
        id: 'b',
        text: 'A diversified customer base and clear pricing or cost levers',
      },
      {
        id: 'c',
        text: 'Roughly 70% of revenue tied to a single customer that can cancel with limited notice',
      },
      {
        id: 'd',
        text: 'Modest maintenance CapEx relative to EBITDA',
      },
    ],
    correctChoiceId: 'c',
    explanation:
      'Extreme customer concentration creates binary credit and equity risk if that relationship is lost—especially when cancellation terms are weak. Recurring revenue, diversification, operating levers, and modest CapEx are generally supportive of debt capacity.',
  },
  {
    id: 'lbo-asset-light',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'All else equal, why do interviewers often prefer an asset-light business to a heavy continuous-CapEx manufacturer for an LBO?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Asset-light businesses always trade at lower EV/EBITDA multiples',
      },
      {
        id: 'b',
        text: 'A larger share of EBITDA typically converts into free cash flow available for debt paydown',
      },
      {
        id: 'c',
        text: 'Interest is never tax-deductible for asset-heavy manufacturers',
      },
      {
        id: 'd',
        text: 'Working capital is definitionally negative for every asset-light model',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Lower maintenance CapEx leaves more free cash flow after EBITDA for interest, taxes, and debt repayment. Multiple levels, tax rules, and working-capital signs are business-specific and are not automatic advantages of being asset-light.',
  },
  {
    id: 'lbo-exit-path',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'Why do PE interviewers press on a credible exit path when screening an LBO candidate?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Because modeled IRR depends only on the entry multiple, not on exit proceeds',
      },
      {
        id: 'b',
        text: 'Because equity returns are realized when the stake is sold or refinanced, so the set of plausible buyers (or IPO feasibility) matters',
      },
      {
        id: 'c',
        text: 'Because credit agreements always forbid any exit within five years',
      },
      {
        id: 'd',
        text: 'Because MoM multiples ignore exit value by construction',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Paper LBOs assume the sponsor can monetize equity at exit via a strategic sale, sponsor-to-sponsor sale, or IPO. Without a plausible path, the exit equity value used in IRR/MoM is not credible—even if entry multiple and operations look fine.',
  },
  {
    id: 'returns-least-controllable',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'Which equity-return lever do interviewers usually treat as least under the sponsor’s control?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Cost reduction or margin expansion' },
      { id: 'b', text: 'Debt paydown funded by free cash flow' },
      { id: 'c', text: 'Multiple expansion at exit versus entry' },
      { id: 'd', text: 'Working-capital improvement that releases cash' },
    ],
    correctChoiceId: 'c',
    explanation:
      'Exit multiple expansion depends heavily on market conditions and buyer appetite at exit. Strong answers underwrite returns primarily from EBITDA growth and deleveraging, and treat flat or compressed exit multiples as the conservative case.',
  },
  {
    id: 'returns-parity-exit',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'In a paper LBO that assumes exit EV/EBITDA equals entry EV/EBITDA, which levers can still create MoM returns?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Only a reduction in the corporate tax rate',
      },
      {
        id: 'b',
        text: 'EBITDA growth and net debt reduction (often amplified by a smaller equity check)',
      },
      {
        id: 'c',
        text: 'Only toggling interest from cash-pay to PIK',
      },
      {
        id: 'd',
        text: 'Only capitalization of transaction fees into goodwill',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'With a flat multiple, enterprise value still rises if EBITDA grows, and equity value rises further as free cash flow reduces net debt. A smaller equity contribution increases MoM for a given dollar gain. Tax, PIK, and fee items can matter at the margin but are not the primary flat-multiple return story.',
  },
  {
    id: 'lev-irr-vs-mom',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'All else equal, increasing leverage at entry typically:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Lowers IRR and raises MoM when the investment succeeds',
      },
      {
        id: 'b',
        text: 'Raises IRR and MoM if the investment succeeds, while increasing downside risk if cash flow disappoints',
      },
      {
        id: 'c',
        text: 'Has no effect on equity returns because enterprise value is unchanged at entry',
      },
      {
        id: 'd',
        text: 'Affects only the tax rate and leaves IRR and MoM unchanged',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'More debt shrinks the equity check, so the same exit equity proceeds produce higher MoM and IRR when the plan works. The same structure worsens outcomes if EBITDA or free cash flow underperforms, including covenant and distress risk. A complete answer states both the upside amplification and the downside.',
  },
  {
    id: 'lev-too-much',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'What most tightly constrains how much debt an LBO can support at entry?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'The company’s free cash flow profile and the leverage / coverage levels lenders will underwrite for that credit',
      },
      {
        id: 'b',
        text: 'The sponsor’s preferred dividend distribution policy alone',
      },
      {
        id: 'c',
        text: 'Whether the target is currently publicly listed',
      },
      {
        id: 'd',
        text: 'The size of the management option pool alone',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Debt capacity is a credit question: cash available to pay interest and amortization, plus the leverage and coverage multiples the lending market will accept for that industry and cash-flow quality. Listing status, dividends, and option pools are secondary.',
  },
  {
    id: 'lev-cash-sweep',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'In an LBO debt schedule, what does a cash sweep do?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Forces the company to pay dividends equal to excess cash each year',
      },
      {
        id: 'b',
        text: 'Uses excess free cash flow after required debt service to prepay debt ahead of schedule',
      },
      {
        id: 'c',
        text: 'Converts all term loan interest into PIK automatically',
      },
      {
        id: 'd',
        text: 'Refinances senior debt into equity at the end of each year',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'A cash sweep applies leftover free cash flow (after mandatory interest and amortization) to optional or mandatory prepayment of debt. Faster paydown lowers exit net debt and increases equity proceeds, all else equal.',
  },
  {
    id: 'val-unlevered-fcf',
    difficulty: 'medium',
    topic: 'valuation',
    prompt: 'Unlevered free cash flow is best described as:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Cash flow after interest expense, available only to equity holders',
      },
      {
        id: 'b',
        text: 'Cash flow before interest, available to debt and equity capital providers',
      },
      {
        id: 'c',
        text: 'Net income plus dividends declared',
      },
      {
        id: 'd',
        text: 'EBITDA with no adjustments for tax, CapEx, or working capital',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Unlevered free cash flow is measured before interest (and is therefore capital-structure neutral). That is why DCFs often discount UFCF at WACC. Cash flow after interest is levered free cash flow / FCFE territory.',
  },
  {
    id: 'val-debt-issue-cash',
    difficulty: 'medium',
    topic: 'valuation',
    prompt:
      'A company issues $100 of new debt and keeps the $100 as cash on the balance sheet. In the standard interview bridge, what happens immediately to enterprise value and equity value?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Enterprise value rises by $100; equity value is unchanged',
      },
      {
        id: 'b',
        text: 'Enterprise value is unchanged; equity value is unchanged',
      },
      {
        id: 'c',
        text: 'Enterprise value and equity value both rise by $100',
      },
      {
        id: 'd',
        text: 'Enterprise value falls by $100; equity value rises by $100',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Debt and cash both rise by $100, so they offset in EV = equity + debt − cash. Equity value does not rise because the extra cash was funded by lenders, not by equity investors. This is a financing transaction, not a change in core operating value.',
  },
  {
    id: 'val-entry-ev',
    difficulty: 'medium',
    topic: 'valuation',
    prompt:
      'LTM EBITDA is $50 million and the entry multiple is 12.0x. What is entry enterprise value ($mm)?',
    kind: 'numeric',
    correctValue: 600,
    tolerance: 0.5,
    explanation:
      'Entry enterprise value = entry multiple × LTM EBITDA = 12 × 50 = $600 million.',
  },
  {
    id: 'acct-three-statements',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'How do the three financial statements connect at a high level?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'They are independent reports that never share line items',
      },
      {
        id: 'b',
        text: 'Net income flows into retained earnings and is the usual starting point of the cash flow statement; the cash flow statement explains the change in cash on the balance sheet',
      },
      {
        id: 'c',
        text: 'Only the income statement matters for LBO debt capacity',
      },
      {
        id: 'd',
        text: 'The balance sheet ignores net income by definition',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Net income links the income statement to the cash flow statement (typical starting point) and to the balance sheet through retained earnings. The cash flow statement then bridges the period’s change in the cash line on the balance sheet.',
  },
  {
    id: 'acct-goodwill',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'In purchase accounting for a stock acquisition, goodwill is best defined as:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'The residual of purchase consideration over the fair value of identifiable net assets acquired',
      },
      {
        id: 'b',
        text: 'Entry EV/EBITDA multiplied by LTM EBITDA',
      },
      {
        id: 'c',
        text: 'Total debt raised in the sources and uses',
      },
      {
        id: 'd',
        text: 'Annual maintenance CapEx',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'After writing identifiable assets and liabilities to fair value (including intangibles and step-ups), any remaining excess of consideration transferred over fair-value identifiable net assets is goodwill. It is not simply the entry enterprise value or the debt raised.',
  },
  {
    id: 'acct-pik-mechanics',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'Compared with cash-pay interest of the same amount, what is the distinctive balance-sheet effect of PIK interest in an LBO?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'PIK interest never appears as interest expense on the income statement',
      },
      {
        id: 'b',
        text: 'PIK interest increases the debt principal (non-cash), so exit net debt can be higher even though cash interest is lower',
      },
      {
        id: 'c',
        text: 'PIK interest reduces cash one-for-one like CapEx',
      },
      {
        id: 'd',
        text: 'PIK interest permanently reduces enterprise value at entry',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'PIK interest is still interest expense on the P&L, but it is not paid in cash; instead the debt balance accretes. Cash interest burden falls, but exit debt (and often net debt) is higher, which can reduce equity proceeds. Modeling usually adds PIK back when bridging to cash flow, similar in spirit to other non-cash charges.',
  },
  {
    id: 'returns-irr-rule-thumb',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'Using the common interview rule of thumb, a 2.5x MoM earned evenly over a 5-year hold is closest to which IRR?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'About 10%' },
      { id: 'b', text: 'About 20%' },
      { id: 'c', text: 'About 35%' },
      { id: 'd', text: 'About 50%' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Standard shortcuts: ~2.0x over 5 years ≈ 15% IRR and ~3.0x over 5 years ≈ 25% IRR, so 2.5x over 5 years is about 20%. Exact IRR is 2.5^(1/5) − 1 ≈ 20.1%.',
  },
  {
    id: 'returns-ebitda-bridge',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'A sponsor buys at 10.0x LTM EBITDA. If EBITDA rises by $40 million and the exit multiple is unchanged, by how much does exit enterprise value increase ($mm)?',
    kind: 'numeric',
    correctValue: 400,
    tolerance: 0.5,
    explanation:
      'ΔEV = exit multiple × ΔEBITDA = 10 × 40 = $400 million, before any change in net debt.',
  },

  // ---------------------------------------------------------------------------
  // Hard — paper-LBO math and statement / returns edge cases
  // ---------------------------------------------------------------------------
  {
    id: 'returns-biws-mom',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'Buy $100mm EBITDA at 10.0x with 60% debt / 40% equity. Over 5 years EBITDA grows to $150mm, $250mm of debt is repaid, and you exit at 9.0x with no excess cash. What is MoM on sponsor equity?',
    kind: 'numeric',
    correctValue: 2.5,
    tolerance: 0.05,
    explanation:
      'Entry EV = 100 × 10 = $1,000mm; equity = 40% × 1,000 = $400mm; debt = $600mm. Exit EV = 150 × 9 = $1,350mm; exit debt = 600 − 250 = $350mm; exit equity = 1,350 − 350 = $1,000mm. MoM = 1,000 / 400 = 2.5x (≈20% IRR over 5 years).',
  },
  {
    id: 'returns-backsolve-ebitda',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'You buy $100mm EBITDA at 10.0x, fund with 5.0x Debt/EBITDA, and repay 50% of that debt over 5 years (no excess cash). Exit multiple equals entry. What exit EBITDA ($mm) is required for a ~20% IRR (≈2.5x MoM)?',
    kind: 'numeric',
    correctValue: 150,
    tolerance: 1,
    explanation:
      'Entry EV = $1,000mm; debt = $500mm; equity = $500mm. A ~20% 5-year IRR needs ≈2.5x MoM, so exit equity ≈ 500 × 2.5 = $1,250mm. Remaining debt = $250mm, so required exit EV = 1,250 + 250 = $1,500mm. At a 10x exit multiple, required EBITDA = 1,500 / 10 = $150mm.',
  },
  {
    id: 'lev-equity-check',
    difficulty: 'hard',
    topic: 'leverage',
    prompt:
      'Entry enterprise value is $800mm. Sources are $480mm debt and sponsor equity for the remainder. Transaction fees of $20mm are a use funded entirely by additional sponsor equity (no incremental debt). What is total sponsor equity ($mm)?',
    kind: 'numeric',
    correctValue: 340,
    tolerance: 0.5,
    explanation:
      'Equity needed for the enterprise purchase = 800 − 480 = $320mm. Fees of $20mm are an additional use funded with equity, so total sponsor equity = 320 + 20 = $340mm. (Sources must still equal uses.)',
  },
  {
    id: 'val-ebitda-to-equity',
    difficulty: 'hard',
    topic: 'valuation',
    prompt:
      'EV/EBITDA stays at 8.0x and net debt is unchanged. If EBITDA increases by $25mm, by how much does equity value increase ($mm)?',
    kind: 'numeric',
    correctValue: 200,
    tolerance: 0.5,
    explanation:
      'With net debt fixed, Δ equity value = Δ enterprise value = 8 × 25 = $200mm.',
  },
  {
    id: 'val-debt-div',
    difficulty: 'hard',
    topic: 'valuation',
    prompt:
      'A company raises $100 of debt and immediately pays a $100 cash dividend. In the standard interview bridge, what happens to enterprise value and equity value?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Enterprise value rises $100; equity value is unchanged',
      },
      {
        id: 'b',
        text: 'Enterprise value is unchanged; equity value falls $100',
      },
      {
        id: 'c',
        text: 'Enterprise value and equity value both fall $100',
      },
      {
        id: 'd',
        text: 'Enterprise value falls $100; equity value rises $100',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Raising debt and holding cash leaves EV unchanged (debt +100, cash +100). Paying the cash out as a dividend reduces cash and equity value by $100; debt is still +100, so EV remains unchanged while equity value is $100 lower. This is a classic financing-only bridge.',
  },
  {
    id: 'acct-fcf-simple',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'EBITDA $120, D&A $20, cash interest $15, cash taxes $18, CapEx $25, increase in NWC $7. Approximate levered FCF as NI + D&A − CapEx − ΔNWC, with NI = EBITDA − D&A − interest − taxes. What is levered FCF ($mm)?',
    kind: 'numeric',
    correctValue: 55,
    tolerance: 0.5,
    explanation:
      'NI = 120 − 20 − 15 − 18 = 67. Levered FCF ≈ 67 + 20 − 25 − 7 = $55mm.',
  },
  {
    id: 'acct-tax-shield',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'Depreciation increases by $10 and the tax rate is 25%. Ignoring other effects, by how much does cash increase?',
    kind: 'numeric',
    correctValue: 2.5,
    tolerance: 0.05,
    explanation:
      'Extra depreciation reduces taxes by 10 × 25% = $2.50. Net income falls by $7.50, but adding back the full $10 of depreciation on the cash flow statement leaves cash higher by $2.50—the depreciation tax shield.',
  },
  {
    id: 'acct-nwc-numeric',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'Year 1 operating current assets $100 and operating current liabilities $80. Year 2 operating current assets $130 and operating current liabilities $70. What is the cash-flow impact of the change in NWC ($mm)? Use a negative number for a cash use.',
    kind: 'numeric',
    correctValue: -40,
    tolerance: 0.5,
    explanation:
      'Year 1 NWC = 100 − 80 = 20. Year 2 NWC = 130 − 70 = 60. ΔNWC = +40, which is a $40 cash use, so the cash-flow impact is −40.',
  },
  {
    id: 'acct-asset-purchase',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'A company buys a $100 core operating asset (e.g. PP&E) with cash and no debt. Immediately afterward, what happens to equity value and enterprise value in the standard interview bridge (cash treated as non-operating)?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Equity value rises $100; enterprise value is unchanged',
      },
      {
        id: 'b',
        text: 'Equity value is unchanged; enterprise value rises $100',
      },
      {
        id: 'c',
        text: 'Equity value and enterprise value are both unchanged',
      },
      {
        id: 'd',
        text: 'Equity value falls $100; enterprise value falls $100',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Equity value is unchanged: total assets are unchanged (cash −100, PP&E +100) with no new equity claim. Enterprise value rises by $100 because core operating assets increased, which appears in the bridge as cash falling by $100 while equity and debt do not: EV = equity + debt − cash increases by $100. Interviewers treat purchases of core-business assets with cash as EV-increasing.',
  },
  {
    id: 'returns-attribution-dollars',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'Entry: EBITDA $100, 10.0x, net debt $600, equity $400. Exit: EBITDA $130, still 10.0x, net debt $350. Roughly how much of the $550 equity gain is from deleveraging ($mm), holding EV at the exit EV while isolating the net-debt reduction?',
    kind: 'numeric',
    correctValue: 250,
    tolerance: 1,
    explanation:
      'Exit EV = 130 × 10 = $1,300. Equity rises from $400 to $1,300 − $350 = $950 (gain $550). Isolating deleveraging as the $250 reduction in net debt attributes $250 of the equity gain to debt paydown; the remainder is primarily EBITDA growth at a constant multiple ($300 of EV growth).',
  },
]
