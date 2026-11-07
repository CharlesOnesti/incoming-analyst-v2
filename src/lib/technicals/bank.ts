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

  // ---------------------------------------------------------------------------
  // Milestone 0 expansion — accounting, valuation, LBO concepts, return drivers
  // ---------------------------------------------------------------------------

  // Easy additions
  {
    id: 'acct-ebitda-def',
    difficulty: 'easy',
    topic: 'accounting',
    prompt: 'EBITDA is closest to which definition?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Net income plus dividends and share repurchases',
      },
      {
        id: 'b',
        text: 'Operating earnings before interest, taxes, depreciation, and amortization',
      },
      {
        id: 'c',
        text: 'Cash on the balance sheet minus total debt',
      },
      {
        id: 'd',
        text: 'Revenue minus CapEx only',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'EBITDA starts from operating profit and adds back D&A (or equivalently EBIT + D&A). It is a proxy for operating cash generation before capital structure and non-cash charges, not a cash figure and not net income plus capital returns.',
  },
  {
    id: 'acct-income-vs-cash',
    difficulty: 'easy',
    topic: 'accounting',
    prompt:
      'Why can net income and free cash flow diverge in the same period?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Because CapEx, working-capital changes, and non-cash charges (like D&A) sit outside net income',
      },
      {
        id: 'b',
        text: 'Because free cash flow always equals EBITDA by definition',
      },
      {
        id: 'c',
        text: 'Because the income statement ignores revenue recognition',
      },
      {
        id: 'd',
        text: 'Because interest is never recorded on the income statement',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Net income is accrual-based. Free cash flow adjusts for non-cash items and subtracts cash uses such as CapEx and increases in net working capital, so the two can move differently in the same year.',
  },
  {
    id: 'acct-capex-vs-opex',
    difficulty: 'easy',
    topic: 'accounting',
    prompt:
      'In a simple interview framing, how does CapEx differ from operating expense?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'CapEx is capitalized on the balance sheet and depreciated over time; OpEx hits the income statement immediately',
      },
      {
        id: 'b',
        text: 'CapEx never uses cash; OpEx always does',
      },
      {
        id: 'c',
        text: 'OpEx is always added back in free cash flow; CapEx is never deducted',
      },
      {
        id: 'd',
        text: 'CapEx only occurs in LBOs; OpEx only occurs in public companies',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'CapEx buys long-lived assets that sit on the balance sheet and flow through D&A over time, while OpEx is expensed as incurred. Both can consume cash, but CapEx is a cash outflow below EBITDA in typical FCF bridges.',
  },
  {
    id: 'val-equity-bridge',
    difficulty: 'easy',
    topic: 'valuation',
    prompt:
      'Starting from enterprise value, equity value is closest to:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Enterprise value plus net debt',
      },
      {
        id: 'b',
        text: 'Enterprise value minus net debt (roughly EV − debt + cash)',
      },
      {
        id: 'c',
        text: 'Enterprise value multiplied by the tax rate',
      },
      {
        id: 'd',
        text: 'Enterprise value divided by LTM revenue',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'Equity value ≈ EV − net debt, or EV − debt + cash in the simplified bridge. Adding net debt would move the wrong direction.',
  },
  {
    id: 'val-multiple-meaning',
    difficulty: 'easy',
    topic: 'valuation',
    prompt: 'An EV/EBITDA multiple of 10.0x most directly means:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Enterprise value is ten times trailing (or forward) EBITDA',
      },
      {
        id: 'b',
        text: 'Equity value is ten times net income',
      },
      {
        id: 'c',
        text: 'Debt is ten times cash',
      },
      {
        id: 'd',
        text: 'Revenue grows at 10% forever',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'EV/EBITDA expresses how many years of EBITDA the market (or buyer) is paying for the firm’s enterprise value. It is not a P/E, leverage, or growth rate by itself.',
  },
  {
    id: 'val-dcf-intuition',
    difficulty: 'easy',
    topic: 'valuation',
    prompt:
      'In a DCF, what is the core idea behind discounting future free cash flows?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'A dollar received later is worth less than a dollar today, so future cash is brought back to present value at a required return',
      },
      {
        id: 'b',
        text: 'Future cash flows are ignored; only the current cash balance matters',
      },
      {
        id: 'c',
        text: 'Discounting increases distant cash flows so they dominate near-term cash',
      },
      {
        id: 'd',
        text: 'DCF replaces the need for any cost of capital',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Discounting reflects time value of money and risk: cash further out is worth less in today’s dollars when discounted at WACC (or another required return).',
  },
  {
    id: 'lbo-management-quality',
    difficulty: 'easy',
    topic: 'lboCandidate',
    prompt:
      'Why do sponsors care about management quality when screening an LBO candidate?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Because value creation often depends on executing operational plans, cost programs, and growth initiatives under a leveraged capital structure',
      },
      {
        id: 'b',
        text: 'Because lenders forbid any change in headcount after close',
      },
      {
        id: 'c',
        text: 'Because MoM is mathematically independent of operations',
      },
      {
        id: 'd',
        text: 'Because management quality sets the statutory tax rate',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'LBO returns usually require the team to deliver EBITDA growth, FCF conversion, and sometimes M&A or pricing initiatives while meeting debt covenants. Weak management raises execution and credit risk.',
  },
  {
    id: 'lbo-defensive-niche',
    difficulty: 'easy',
    topic: 'lboCandidate',
    prompt:
      'Which business profile is generally more attractive as a classic LBO candidate?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'A niche leader with sticky customers, stable margins, and modest CapEx needs',
      },
      {
        id: 'b',
        text: 'A pre-revenue biotech with binary clinical outcomes',
      },
      {
        id: 'c',
        text: 'A commodity trader with highly volatile earnings and thin tangible collateral',
      },
      {
        id: 'd',
        text: 'A venture-stage software company burning cash with no path to FCF',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Traditional LBO underwriting favors predictable cash flow, durable competitive position, and limited reinvestment needs so debt can be serviced. Binary R&D, commodity volatility, and sustained cash burn are poor fits for heavy leverage.',
  },
  {
    id: 'returns-hold-period',
    difficulty: 'easy',
    topic: 'returnDrivers',
    prompt:
      'All else equal, lengthening the hold period while keeping exit equity proceeds fixed typically:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Raises IRR because more time always helps returns',
      },
      {
        id: 'b',
        text: 'Lowers IRR because the same gain is earned over more years; MoM is unchanged',
      },
      {
        id: 'c',
        text: 'Raises MoM one-for-one with years held',
      },
      {
        id: 'd',
        text: 'Leaves both IRR and MoM unchanged by definition',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'MoM = exit equity / entry equity and ignores time. IRR annualizes that multiple, so the same MoM over a longer hold produces a lower IRR.',
  },
  {
    id: 'returns-fcf-delever',
    difficulty: 'easy',
    topic: 'returnDrivers',
    prompt:
      'How does free cash flow create equity value in a typical LBO returns story?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'By paying down net debt so equity owns a larger share of enterprise value at exit',
      },
      {
        id: 'b',
        text: 'By automatically expanding the exit EV/EBITDA multiple',
      },
      {
        id: 'c',
        text: 'By eliminating the need for an exit altogether',
      },
      {
        id: 'd',
        text: 'By converting all interest into non-deductible preferred dividends',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'FCF used to repay debt reduces net debt. At a given exit EV, lower net debt means higher equity value—the classic deleveraging lever.',
  },
  {
    id: 'lev-interest-coverage',
    difficulty: 'easy',
    topic: 'leverage',
    prompt: 'Interest coverage (e.g. EBITDA / interest) is used primarily to assess:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'How comfortably cash earnings can service interest expense',
      },
      {
        id: 'b',
        text: 'The company’s equity market capitalization',
      },
      {
        id: 'c',
        text: 'Whether CapEx equals depreciation',
      },
      {
        id: 'd',
        text: 'The statutory corporate tax rate only',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Coverage ratios measure the buffer between operating earnings (or cash flow) and interest burden. Low coverage signals refinancing and distress risk in a leveraged structure.',
  },
  {
    id: 'lev-seniority',
    difficulty: 'easy',
    topic: 'leverage',
    prompt:
      'In a typical LBO capital structure, which claim is generally most senior in a downside?',
    kind: 'mcq',
    choices: [
      { id: 'a', text: 'Common equity' },
      { id: 'b', text: 'First-lien / senior secured debt' },
      { id: 'c', text: 'Preferred equity with PIK dividends' },
      { id: 'd', text: 'Management’s unvested options' },
    ],
    correctChoiceId: 'b',
    explanation:
      'Senior secured (often first-lien) debt sits at the top of the priority waterfall and is repaid before junior debt, preferred, and common equity in a restructuring or liquidation.',
  },
  {
    id: 'val-ltm-ebitda-mult',
    difficulty: 'easy',
    topic: 'valuation',
    prompt:
      'LTM EBITDA is $80 million and EV/EBITDA is 9.0x. What is enterprise value ($mm)?',
    kind: 'numeric',
    correctValue: 720,
    tolerance: 0.5,
    explanation: 'EV = 9 × 80 = $720 million.',
  },
  {
    id: 'lev-debt-ebitda',
    difficulty: 'easy',
    topic: 'leverage',
    prompt:
      'Entry EV is $600mm funded 50% with debt. LTM EBITDA is $75mm. What is entry Debt/EBITDA (turns)?',
    kind: 'numeric',
    correctValue: 4,
    tolerance: 0.05,
    explanation:
      'Debt = 50% × 600 = $300mm. Debt/EBITDA = 300 / 75 = 4.0x.',
  },

  // Medium additions
  {
    id: 'acct-deferred-revenue',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'All else equal, an increase in deferred revenue (cash collected before revenue recognition) typically:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Is a source of cash in the period and increases operating liabilities',
      },
      {
        id: 'b',
        text: 'Is always a use of cash equal to the deferred balance',
      },
      {
        id: 'c',
        text: 'Never appears on the balance sheet',
      },
      {
        id: 'd',
        text: 'Reduces enterprise value dollar-for-dollar when recognized',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Cash received before revenue recognition increases cash and creates a deferred-revenue liability. The liability increase is a working-capital source in the cash flow statement until revenue is recognized.',
  },
  {
    id: 'acct-write-down',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'A company takes a non-cash inventory write-down of $20 with a 25% tax rate (and the write-down is tax-deductible). Ignoring other effects, cash:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Falls by $20 immediately',
      },
      {
        id: 'b',
        text: 'Rises by the tax shield of $5 (20 × 25%), while the $20 charge is non-cash',
      },
      {
        id: 'c',
        text: 'Is unchanged in all cases because inventory never affects cash',
      },
      {
        id: 'd',
        text: 'Rises by the full $20',
      },
    ],
    correctChoiceId: 'b',
    explanation:
      'The write-down itself is non-cash. If deductible, it reduces taxable income and taxes paid by 20 × 25% = $5, so cash increases by the tax shield (timing of tax cash depends on when taxes are paid).',
  },
  {
    id: 'acct-lease-intuition',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'Under modern lease accounting (e.g. ASC 842 / IFRS 16), capitalizing operating leases typically:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Adds a right-of-use asset and a lease liability, increasing reported leverage versus older off-balance-sheet treatment',
      },
      {
        id: 'b',
        text: 'Removes all rent expense forever with no balance-sheet impact',
      },
      {
        id: 'c',
        text: 'Converts every lease into equity automatically',
      },
      {
        id: 'd',
        text: 'Has no effect on EBITDA definitions used by lenders',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Capitalized leases put ROU assets and lease liabilities on the balance sheet, which increases reported debt-like claims. Credit agreements often define EBITDA and leverage with specific lease add-backs, so analysts still reconcile GAAP to credit metrics.',
  },
  {
    id: 'val-trading-vs-transaction',
    difficulty: 'medium',
    topic: 'valuation',
    prompt:
      'Why do precedent transaction multiples often sit above trading (comparable company) multiples?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Because control / synergy premiums are often paid in M&A, while trading comps reflect minority, stand-alone prices',
      },
      {
        id: 'b',
        text: 'Because transaction comps always use book value instead of enterprise value',
      },
      {
        id: 'c',
        text: 'Because trading comps ignore EBITDA by construction',
      },
      {
        id: 'd',
        text: 'Because precedent deals never include debt in EV',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Acquirers frequently pay a control premium (and sometimes synergies). Public trading multiples are typically minority valuations without that premium, so transaction comps can print higher.',
  },
  {
    id: 'val-wacc-intuition',
    difficulty: 'medium',
    topic: 'valuation',
    prompt:
      'All else equal, if a company’s WACC rises, a DCF enterprise value typically:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Falls because future free cash flows are discounted more heavily',
      },
      {
        id: 'b',
        text: 'Rises because a higher discount rate increases present value',
      },
      {
        id: 'c',
        text: 'Is unchanged because WACC only affects the income statement',
      },
      {
        id: 'd',
        text: 'Equals the book value of equity automatically',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'A higher discount rate reduces the present value of the same projected UFCFs and terminal value, so DCF EV declines all else equal.',
  },
  {
    id: 'val-terminal-value-weight',
    difficulty: 'medium',
    topic: 'valuation',
    prompt:
      'In many interview DCFs, why does terminal value often dominate total enterprise value?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Because a large share of value is assumed to occur beyond the explicit forecast via perpetuity or exit-multiple assumptions',
      },
      {
        id: 'b',
        text: 'Because near-term free cash flow is never discounted',
      },
      {
        id: 'c',
        text: 'Because terminal value equals cash on the balance sheet only',
      },
      {
        id: 'd',
        text: 'Because WACC is set to zero after year five',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Explicit forecasts are short (often 5–10 years). The terminal value capitalizes cash flows thereafter, so it can be a majority of PV—making growth, margin, and exit-multiple / WACC assumptions highly sensitive.',
  },
  {
    id: 'lbo-cyclical',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'When underwriting a cyclical industrial LBO, what do interviewers most expect you to stress?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Downside EBITDA and free cash flow through the cycle, and whether leverage still clears coverage / covenants',
      },
      {
        id: 'b',
        text: 'Only the peak-year multiple expansion case',
      },
      {
        id: 'c',
        text: 'Ignoring working capital because cyclicals never use NWC',
      },
      {
        id: 'd',
        text: 'Assuming interest rates cannot change over the hold',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Cyclical cash flows can collapse in a downturn. Strong answers size debt off through-the-cycle FCF and show coverage and covenant headroom in a recession case, not just the peak.',
  },
  {
    id: 'lbo-add-on',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'Why can a platform with a credible add-on M&A strategy be attractive in PE?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Bolt-ons can buy earnings cheaper than the platform multiple and create scale / synergy value if integration works',
      },
      {
        id: 'b',
        text: 'Add-ons automatically eliminate all integration risk',
      },
      {
        id: 'c',
        text: 'Lenders forbid organic growth, so M&A is the only allowed path',
      },
      {
        id: 'd',
        text: 'Add-ons never require incremental capital',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Sponsors often underwrite multiple arbitrage (buy small targets below the platform’s exit multiple) plus cost or revenue synergies. Integration, culture, and funding needs remain real risks that must be diligenced.',
  },
  {
    id: 'lbo-sponsor-vs-strategic',
    difficulty: 'medium',
    topic: 'lboCandidate',
    prompt:
      'Relative to a strategic acquirer, a financial sponsor’s willingness to pay is most constrained by:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Required equity returns (IRR/MoM) given leverage, cash flow, and exit assumptions—not by operational synergies the sponsor cannot uniquely capture',
      },
      {
        id: 'b',
        text: 'Unlimited synergy value from combining product lines',
      },
      {
        id: 'c',
        text: 'A legal prohibition on paying more than 5.0x EBITDA',
      },
      {
        id: 'd',
        text: 'The target’s historical dividend yield alone',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Financial buyers underwrite to a returns hurdle with debt capacity and exit math. Strategics can often pay more when they underwrite cost/revenue synergies unavailable to a pure financial buyer.',
  },
  {
    id: 'returns-margin-vs-growth',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'In a flat-exit-multiple LBO, raising EBITDA margin with revenue held flat primarily creates value by:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Increasing EBITDA (and thus exit EV) and usually improving free cash flow for debt paydown',
      },
      {
        id: 'b',
        text: 'Automatically reducing the entry equity check after close',
      },
      {
        id: 'c',
        text: 'Changing only the tax rate with no EV impact',
      },
      {
        id: 'd',
        text: 'Eliminating interest expense regardless of debt levels',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Higher margins lift EBITDA → higher exit EV at a constant multiple, and typically lift FCF (less opex) which supports faster deleveraging. Entry equity is set at close, not by post-close margins.',
  },
  {
    id: 'returns-dividend-recap',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'A dividend recapitalization mid-hold typically:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Raises new debt to distribute cash to equity holders, increasing MoM/IRR timing benefits while leaving less equity cushion',
      },
      {
        id: 'b',
        text: 'Always reduces IRR because distributions are ignored in returns',
      },
      {
        id: 'c',
        text: 'Is identical to an equity IPO with no new debt',
      },
      {
        id: 'd',
        text: 'Must be funded entirely with excess cash and never with debt',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'In a dividend recap, the company borrows (or uses capacity) to pay a sponsor dividend. That pulls cash forward and can boost IRR, but leverage rises and downside risk increases.',
  },
  {
    id: 'lev-amortization',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'Mandatory debt amortization in an LBO debt schedule:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Requires scheduled principal repayment each period, reducing debt even before optional cash sweeps',
      },
      {
        id: 'b',
        text: 'Means interest is paid only at maturity',
      },
      {
        id: 'c',
        text: 'Converts the term loan into equity each quarter',
      },
      {
        id: 'd',
        text: 'Applies only to revolving credit undrawn commitments',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Amortizing term debt has a contractual principal schedule. That repayment is a required cash use and lowers ending debt before any excess-cash sweep.',
  },
  {
    id: 'lev-revolver',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'What is the primary role of a revolving credit facility in many LBO structures?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Provide flexible liquidity for working-capital swings and seasonal needs, drawn and repaid as cash fluctuates',
      },
      {
        id: 'b',
        text: 'Replace all term loan principal permanently',
      },
      {
        id: 'c',
        text: 'Serve as permanent equity in the sources and uses',
      },
      {
        id: 'd',
        text: 'Eliminate the need for any cash interest',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Revolvers are working-capital / liquidity tools: borrowers draw when cash is tight and repay when cash builds. They are not permanent equity and usually do not replace the term structure wholesale.',
  },
  {
    id: 'lev-covenant-headroom',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'Why do interviewers ask about covenant headroom in a leveraged deal?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Because breach risk (e.g. leverage or coverage tests) can restrict operations, force amendments, or trigger default even if the equity story still looks okay on paper',
      },
      {
        id: 'b',
        text: 'Because covenants set the exit EV/EBITDA multiple by formula',
      },
      {
        id: 'c',
        text: 'Because headroom replaces the need to model free cash flow',
      },
      {
        id: 'd',
        text: 'Because covenants only apply to public companies',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Maintenance or springing covenants constrain how much EBITDA can fall before a default or amendment process. Headroom is the buffer between projected metrics and those tests.',
  },
  {
    id: 'val-equity-from-ev',
    difficulty: 'medium',
    topic: 'valuation',
    prompt:
      'Enterprise value is $900mm, debt is $400mm, and cash is $50mm. What is equity value ($mm)?',
    kind: 'numeric',
    correctValue: 550,
    tolerance: 0.5,
    explanation:
      'Equity value = EV − debt + cash = 900 − 400 + 50 = $550mm.',
  },
  {
    id: 'acct-fcf-unlevered',
    difficulty: 'medium',
    topic: 'accounting',
    prompt:
      'EBIT $100, tax rate 25%, D&A $20, CapEx $30, ΔNWC +$5 (use of cash). What is unlevered FCF ($mm)? Use EBIT(1−t) + D&A − CapEx − ΔNWC.',
    kind: 'numeric',
    correctValue: 60,
    tolerance: 0.5,
    explanation:
      'EBIT(1−t) = 100 × 0.75 = 75. UFCF = 75 + 20 − 30 − 5 = $60mm.',
  },
  {
    id: 'returns-mom-from-equity',
    difficulty: 'medium',
    topic: 'returnDrivers',
    prompt:
      'Entry equity is $200mm and exit equity proceeds are $500mm with no intermediate distributions. What is MoM?',
    kind: 'numeric',
    correctValue: 2.5,
    tolerance: 0.05,
    explanation: 'MoM = 500 / 200 = 2.5x.',
  },
  {
    id: 'lev-sources-uses-balance',
    difficulty: 'medium',
    topic: 'leverage',
    prompt:
      'Uses are purchase equity value of ops $700mm (EV), refinance of $100mm existing debt, and $25mm fees. New debt raised is $500mm. How much sponsor equity is required ($mm)?',
    kind: 'numeric',
    correctValue: 325,
    tolerance: 0.5,
    explanation:
      'Total uses = 700 + 100 + 25 = $825mm. Equity = uses − new debt = 825 − 500 = $325mm.',
  },

  // Hard additions
  {
    id: 'acct-revenue-cut-cascade',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'Revenue falls $40 with a 30% EBITDA margin, D&A unchanged, and ignore NWC/CapEx changes. Roughly how much does EBITDA fall ($mm)?',
    kind: 'numeric',
    correctValue: 12,
    tolerance: 0.5,
    explanation:
      'If margin is constant, ΔEBITDA ≈ margin × ΔRevenue = 0.30 × 40 = $12mm decline.',
  },
  {
    id: 'acct-cash-conversion',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'EBITDA $200, cash interest $40, cash taxes $30, CapEx $50, NWC release (source) $10. Approximate levered FCF as EBITDA − interest − taxes − CapEx + NWC source. What is FCF ($mm)?',
    kind: 'numeric',
    correctValue: 90,
    tolerance: 0.5,
    explanation:
      'FCF ≈ 200 − 40 − 30 − 50 + 10 = $90mm. (This skips D&A because the bridge starts at EBITDA rather than NI.)',
  },
  {
    id: 'acct-goodwill-impairment',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'A goodwill impairment of $50 is recorded (ignore taxes). What is the immediate effect on cash and on equity book value?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Cash unchanged; equity book value falls by $50',
      },
      {
        id: 'b',
        text: 'Cash falls $50; equity book value unchanged',
      },
      {
        id: 'c',
        text: 'Cash rises $50; equity book value rises $50',
      },
      {
        id: 'd',
        text: 'Cash falls $50; equity book value rises $50',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Impairment is a non-cash charge that reduces assets and hits earnings / retained earnings, so book equity falls. Cash does not move at the impairment date (tax effects aside).',
  },
  {
    id: 'val-implied-share-price',
    difficulty: 'hard',
    topic: 'valuation',
    prompt:
      'DCF EV is $1,200mm, net debt is $300mm, and diluted shares are 45mm. What is implied equity value per share ($)?',
    kind: 'numeric',
    correctValue: 20,
    tolerance: 0.05,
    explanation:
      'Equity value = 1,200 − 300 = $900mm. Per share = 900 / 45 = $20.',
  },
  {
    id: 'val-football-field',
    difficulty: 'hard',
    topic: 'valuation',
    prompt:
      'On a valuation football field, a financial buyer’s LBO “ability to pay” is best interpreted as:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'The maximum entry price that still clears the sponsor’s IRR/MoM hurdle under underwriting assumptions',
      },
      {
        id: 'b',
        text: 'The same number as a synergy-rich strategic DCF by definition',
      },
      {
        id: 'c',
        text: 'Book value of tangible assets only',
      },
      {
        id: 'd',
        text: 'The current trading price plus 50% always',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'An LBO analysis backs into what a PE buyer can pay while meeting return hurdles given leverage, FCF, and exit. It is a returns constraint, not a synergistic intrinsic value.',
  },
  {
    id: 'val-net-debt-adjust',
    difficulty: 'hard',
    topic: 'valuation',
    prompt:
      'Equity purchase price is $500mm. The target has $120mm debt, $30mm cash, and $20mm preferred equity treated like debt in the bridge. What is implied enterprise value ($mm)?',
    kind: 'numeric',
    correctValue: 610,
    tolerance: 0.5,
    explanation:
      'EV ≈ equity + debt + preferred − cash = 500 + 120 + 20 − 30 = $610mm.',
  },
  {
    id: 'lbo-limited-partners',
    difficulty: 'hard',
    topic: 'lboCandidate',
    prompt:
      'A target generates strong EBITDA but requires continuous growth CapEx equal to ~90% of EBITDA to stay competitive. What is the core LBO concern?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Free cash flow conversion may be too weak to service and amortize a highly leveraged structure',
      },
      {
        id: 'b',
        text: 'EBITDA will be ignored by all lenders regardless of CapEx',
      },
      {
        id: 'c',
        text: 'Entry multiples are illegal above 5x when CapEx is high',
      },
      {
        id: 'd',
        text: 'Working capital must be negative for the model to solve',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Debt capacity depends on FCF, not EBITDA alone. If maintenance/growth CapEx consumes most EBITDA, little cash remains for interest and principal—raising refinancing and covenant risk.',
  },
  {
    id: 'lbo-carveout',
    difficulty: 'hard',
    topic: 'lboCandidate',
    prompt:
      'Why are corporate carve-outs often both attractive and risky as LBO candidates?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'They can be under-managed orphans with margin upside, but may lack standalone systems, contracts, and stranded-cost clarity',
      },
      {
        id: 'b',
        text: 'Carve-outs never need transition service agreements',
      },
      {
        id: 'c',
        text: 'Carve-outs always come with zero working capital',
      },
      {
        id: 'd',
        text: 'Carve-outs cannot be financed with any debt',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Sponsors like carve-outs for operational improvement and focus, but must diligence stranded costs, TSA dependency, IT separation, and customer/contract transfers that can impair FCF early in the hold.',
  },
  {
    id: 'returns-irr-approx',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'Using the compound-growth relationship, what MoM over 4 years is closest to a 25% IRR? (Answer as a multiple, e.g. 2.44)',
    kind: 'numeric',
    correctValue: 2.44,
    tolerance: 0.05,
    explanation:
      'MoM ≈ (1 + IRR)^n = 1.25^4 ≈ 2.441. Interviewers often accept ~2.4x.',
  },
  {
    id: 'returns-attribution-ebitda',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'Entry EBITDA $80 at 8.0x. Exit EBITDA $100 at 8.0x. Ignoring net debt, how much equity value creation comes from EBITDA growth ($mm)?',
    kind: 'numeric',
    correctValue: 160,
    tolerance: 0.5,
    explanation:
      'ΔEV from EBITDA = 8 × (100 − 80) = $160mm. With net debt ignored, that full amount maps to equity.',
  },
  {
    id: 'returns-multiple-bridge',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'Exit EBITDA is $120mm. Entry multiple was 10.0x and exit multiple is 11.0x. How much incremental EV comes from multiple expansion alone ($mm)?',
    kind: 'numeric',
    correctValue: 120,
    tolerance: 0.5,
    explanation:
      'Multiple expansion value = (11 − 10) × exit EBITDA = 1 × 120 = $120mm.',
  },
  {
    id: 'lev-refinance-risk',
    difficulty: 'hard',
    topic: 'leverage',
    prompt:
      'A large bullet maturity falls in year 4 of a 5-year hold with limited amortization. What risk should you highlight?',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Refinancing / maturity risk if credit markets or performance are weak when the bullet comes due',
      },
      {
        id: 'b',
        text: 'That interest will automatically convert to equity',
      },
      {
        id: 'c',
        text: 'That MoM cannot be calculated with bullet debt',
      },
      {
        id: 'd',
        text: 'That CapEx must equal zero in year 4',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Bullet structures rely on refinance or exit proceeds at maturity. A weak market or missed underwriting can strand the capital structure even if earlier years looked fine.',
  },
  {
    id: 'lev-pik-toggle',
    difficulty: 'hard',
    topic: 'leverage',
    prompt:
      'A PIK toggle note that switches from cash interest to PIK when cash is tight typically:',
    kind: 'mcq',
    choices: [
      {
        id: 'a',
        text: 'Preserves near-term liquidity by accreting principal, at the cost of higher exit debt and often a higher coupon while toggling',
      },
      {
        id: 'b',
        text: 'Cancels all accrued interest permanently',
      },
      {
        id: 'c',
        text: 'Is treated as equity for all leverage covenants automatically',
      },
      {
        id: 'd',
        text: 'Has no effect on the debt balance',
      },
    ],
    correctChoiceId: 'a',
    explanation:
      'Toggling to PIK saves cash interest today but increases the claim that must be repaid later (and pricing often steps up). It is a liquidity valve, not forgiveness.',
  },
  {
    id: 'lev-entry-leverage-numeric',
    difficulty: 'hard',
    topic: 'leverage',
    prompt:
      'Buy $90mm EBITDA at 11.0x with 55% debt financing. What is entry Debt/EBITDA (turns)?',
    kind: 'numeric',
    correctValue: 6.05,
    tolerance: 0.05,
    explanation:
      'Entry EV = 90 × 11 = $990mm. Debt = 0.55 × 990 = $544.5mm. Debt/EBITDA = 544.5 / 90 = 6.05x.',
  },
  {
    id: 'returns-exit-equity-full',
    difficulty: 'hard',
    topic: 'returnDrivers',
    prompt:
      'Entry: $100mm EBITDA, 9.0x, 60% debt. After 5 years EBITDA is $140mm, $200mm of debt is repaid, exit at 9.0x, no excess cash. What is exit equity value ($mm)?',
    kind: 'numeric',
    correctValue: 920,
    tolerance: 1,
    explanation:
      'Entry EV = 900; entry debt = 540. Exit EV = 140 × 9 = 1,260. Exit debt = 540 − 200 = 340. Exit equity = 1,260 − 340 = $920mm.',
  },
  {
    id: 'val-premium-calc',
    difficulty: 'hard',
    topic: 'valuation',
    prompt:
      'Unaffected share price is $40. Offer price is $52. What is the offer premium (%)?',
    kind: 'numeric',
    correctValue: 30,
    tolerance: 0.5,
    explanation: 'Premium = (52 − 40) / 40 = 30%.',
  },
  {
    id: 'acct-bs-balances',
    difficulty: 'hard',
    topic: 'accounting',
    prompt:
      'Assets are $800mm. Liabilities are $450mm. What is equity book value ($mm)?',
    kind: 'numeric',
    correctValue: 350,
    tolerance: 0.5,
    explanation: 'Assets = liabilities + equity → equity = 800 − 450 = $350mm.',
  },
]
