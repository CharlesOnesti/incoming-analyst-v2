import type { LboInputs, LboSolution } from './types'

export function solve(inputs: LboInputs): LboSolution {
  const {
    entryMult,
    exitMult,
    ltmRev,
    ebitdaMargin,
    debtPercent,
    intRate,
    revGrowth,
    taxRate,
    capexPr,
    nwcPr,
  } = inputs

  const years = [0, 1, 2, 3, 4, 5]
  const revenue = years.map((i) => ltmRev * (1 + revGrowth / 100) ** i)
  const ebitda = revenue.map((a) => a * (ebitdaMargin / 100))

  const entryEv = entryMult * ebitda[0]
  const entryNd = (debtPercent / 100) * entryEv
  const da = revenue.map((a) => -(a * (capexPr / 100)))
  const ebit = ebitda.map((a, i) => a + da[i])
  const interest = new Array(6).fill(-((intRate / 100) * entryNd)) as number[]
  const ebt = ebit.map((a, i) => a + interest[i])
  const nwc = revenue.map((a) => a * (nwcPr / 100))
  const taxes = ebt.map((a) => -(Math.max(a, 0) * (taxRate / 100)))
  const income = ebt.map((a, i) => a + taxes[i])
  const capex = revenue.map((a) => -(a * (capexPr / 100)))

  const nwcChange = [0]
  for (let i = 1; i < nwc.length; i++) {
    nwcChange[i] = (nwc[i] - nwc[i - 1]) * -1
  }

  const fcf = income.map(
    (a, i) => a - da[i] + nwcChange[i] + capex[i],
  )

  const exitEv = exitMult * ebitda[5]
  const exitNd = entryNd - fcf.slice(1, 6).reduce((a, b) => a + b, 0)
  const exitEquity = exitEv - exitNd
  const entryEquity = entryEv - entryNd
  const mom = exitEquity / entryEquity
  const irr = mom ** 0.2 - 1

  return {
    irr,
    financials: {
      Revenue: revenue,
      EBITDA: ebitda,
      DA: da,
      EBIT: ebit,
      Interest: interest,
      EBT: ebt,
      Taxes: taxes,
      Income: income,
      NegatedDA: da.map((a) => -a),
      NWC_Change: nwcChange,
      Capex: capex,
      FCF: fcf,
      NWC: nwc,
    },
    returns: {
      entryMult,
      exitMult,
      entryEv,
      exitEv,
      entryNd,
      exitNd,
      entryEquity,
      exitEquity,
      mom,
    },
  }
}

export function irrPercent(irr: number): number {
  return Math.round(irr * 1000) / 10
}
