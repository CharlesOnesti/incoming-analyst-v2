import { useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Timer } from '../components/Timer'
import {
  FINANCIAL_LABELS,
  FINANCIAL_ORDER,
  MAX_FOLLOW_UPS,
  applyFollowUp,
  askFieldLabel,
  askLabel,
  askPlaceholder,
  gradeAttempt,
  irrPercent,
  makeScenario,
  type Ask,
  type Difficulty,
  type GradeResult,
  type LboSolution,
  type ShockId,
} from '../lib/lbo'
import styles from './Quiz.module.css'

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

type Phase = 'answering' | 'revealed' | 'complete'

type RoundRecord = {
  id: string
  label: string
  ask: Ask
  promptNote: string | null
  solution: LboSolution
  grade: GradeResult
}

function readDifficulty(state: unknown): Difficulty {
  const value =
    state && typeof state === 'object' && 'difficulty' in state
      ? (state as { difficulty?: string }).difficulty
      : undefined
  return value === 'easy' || value === 'hard' || value === 'medium'
    ? value
    : 'medium'
}

function ReturnsBridge({ solution }: { solution: LboSolution }) {
  const entryEbitda = solution.financials.EBITDA[0]
  const exitEbitda = solution.financials.EBITDA[5]
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col">Entry</th>
            <th scope="col">Exit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">LTM / Exit EBITDA</th>
            <td>{Math.round(entryEbitda)}</td>
            <td>{Math.round(exitEbitda)}</td>
          </tr>
          <tr>
            <th scope="row">(x) EBITDA Multiple</th>
            <td>{solution.returns.entryMult}x</td>
            <td>{solution.returns.exitMult}x</td>
          </tr>
          <tr>
            <th scope="row">Enterprise Value</th>
            <td>{Math.round(solution.returns.entryEv)}</td>
            <td>{Math.round(solution.returns.exitEv)}</td>
          </tr>
          <tr>
            <th scope="row">(-) Net Debt</th>
            <td>{-Math.round(solution.returns.entryNd)}</td>
            <td>{-Math.round(solution.returns.exitNd)}</td>
          </tr>
          <tr>
            <th scope="row">Equity Value</th>
            <td>{Math.round(solution.returns.entryEquity)}</td>
            <td>{Math.round(solution.returns.exitEquity)}</td>
          </tr>
          <tr>
            <th scope="row">MoM / IRR</th>
            <td colSpan={2}>
              {(Math.round(solution.returns.mom * 100) / 100).toFixed(2)}x ·{' '}
              {irrPercent(solution.irr)}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function FinancialsTable({ solution }: { solution: LboSolution }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" />
            {[0, 1, 2, 3, 4, 5].map((year) => (
              <th key={year} scope="col">
                Y{year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FINANCIAL_ORDER.map((key) => (
            <tr key={key}>
              <th scope="row">{FINANCIAL_LABELS[key]}</th>
              {solution.financials[key].map((value, i) => {
                const blank = i === 0 && key !== 'Revenue' && key !== 'EBITDA'
                return (
                  <td key={`${key}-${i}`}>{blank ? '' : Math.round(value)}</td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Quiz() {
  const location = useLocation()
  const difficulty = readDifficulty(location.state)
  const [resetKey, setResetKey] = useState(0)
  const [baseScenario, setBaseScenario] = useState(() =>
    makeScenario(difficulty),
  )
  const [solution, setSolution] = useState<LboSolution>(baseScenario.solution)
  const [ask, setAsk] = useState<Ask>(baseScenario.ask)
  const [promptText, setPromptText] = useState(baseScenario.promptText)
  const [roundLabel, setRoundLabel] = useState('Base case')
  const [isBaseRound, setIsBaseRound] = useState(true)
  const [phase, setPhase] = useState<Phase>('answering')
  const [followUpsDone, setFollowUpsDone] = useState(0)
  const [usedShockIds, setUsedShockIds] = useState<ShockId[]>([])
  const [roundHistory, setRoundHistory] = useState<RoundRecord[]>([])
  const [attempt, setAttempt] = useState('')
  const [entryEvAttempt, setEntryEvAttempt] = useState('')
  const [debtAttempt, setDebtAttempt] = useState('')
  const [equityAttempt, setEquityAttempt] = useState('')

  const isSourcesUses = ask.kind === 'sourcesUses'
  const totalRounds = 1 + MAX_FOLLOW_UPS
  const followUpsRemaining = MAX_FOLLOW_UPS - followUpsDone
  const correctCount = roundHistory.filter((r) => r.grade.passed).length
  const answeredCount = roundHistory.length

  const latestGrade = useMemo(() => {
    if (phase === 'answering' || roundHistory.length === 0) return null
    return roundHistory[roundHistory.length - 1].grade
  }, [phase, roundHistory])

  const resetFields = () => {
    setAttempt('')
    setEntryEvAttempt('')
    setDebtAttempt('')
    setEquityAttempt('')
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const result = isSourcesUses
      ? gradeAttempt(
          {
            entryEv: Number.parseFloat(entryEvAttempt),
            debt: Number.parseFloat(debtAttempt),
            equity: Number.parseFloat(equityAttempt),
          },
          solution,
          ask,
        )
      : gradeAttempt(
          { value: Number.parseFloat(attempt) },
          solution,
          ask,
        )

    const record: RoundRecord = {
      id: `${isBaseRound ? 'base' : `fu-${followUpsDone}`}-${Date.now()}`,
      label: roundLabel,
      ask,
      promptNote: isBaseRound ? null : promptText,
      solution,
      grade: result,
    }
    setRoundHistory((prev) => [...prev, record])

    if (!isBaseRound && followUpsDone >= MAX_FOLLOW_UPS) {
      setPhase('complete')
      return
    }
    setPhase('revealed')
  }

  const startFollowUp = () => {
    const followUp = applyFollowUp(baseScenario.inputs, usedShockIds)
    const nextCount = followUpsDone + 1
    setUsedShockIds((ids) => [...ids, followUp.shock.id])
    setFollowUpsDone(nextCount)
    setSolution(followUp.solution)
    setAsk(followUp.ask)
    setPromptText(followUp.promptText)
    setRoundLabel(`Follow-up ${nextCount}: ${followUp.shock.label}`)
    setIsBaseRound(false)
    resetFields()
    setPhase('answering')
    setResetKey((key) => key + 1)
  }

  const finishWithoutMore = () => {
    setPhase('complete')
  }

  const anotherOne = () => {
    const next = makeScenario(difficulty)
    setBaseScenario(next)
    setSolution(next.solution)
    setAsk(next.ask)
    setPromptText(next.promptText)
    setRoundLabel('Base case')
    setIsBaseRound(true)
    setFollowUpsDone(0)
    setUsedShockIds([])
    setRoundHistory([])
    resetFields()
    setPhase('answering')
    setResetKey((key) => key + 1)
  }

  const canFollowUp = phase === 'revealed' && followUpsRemaining > 0

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <Link to="/" className={styles.back}>
          ← Home
        </Link>
        <div className={styles.badges}>
          <span className={styles.badge}>{DIFFICULTY_LABELS[difficulty]}</span>
          <span className={styles.badge}>{askLabel(ask)}</span>
          {!isBaseRound && <span className={styles.badge}>Follow-up</span>}
        </div>
      </div>

      <p className={styles.roundMeta}>{roundLabel}</p>
      <h1 className={styles.title}>Paper LBO</h1>
      <p className={styles.prompt}>
        {isBaseRound ? promptText : baseScenario.promptText}
      </p>
      {!isBaseRound && (
        <p className={styles.followUpAddendum} aria-label="Interviewer follow-up">
          {promptText}
        </p>
      )}

      <Timer key={resetKey} running={phase === 'answering'} />

      {phase === 'answering' && (
        <form className={styles.form} onSubmit={onSubmit}>
          {isSourcesUses ? (
            <>
              <p className={styles.fieldLabel}>{askFieldLabel(ask)}</p>
              <label className={styles.subLabel} htmlFor="entryEv">
                Entry EV
              </label>
              <input
                id="entryEv"
                className={styles.input}
                type="number"
                step="1"
                inputMode="decimal"
                value={entryEvAttempt}
                placeholder="e.g. 600"
                onChange={(e) => setEntryEvAttempt(e.target.value)}
                required
              />
              <label className={styles.subLabel} htmlFor="debt">
                Debt
              </label>
              <input
                id="debt"
                className={styles.input}
                type="number"
                step="1"
                inputMode="decimal"
                value={debtAttempt}
                placeholder="e.g. 300"
                onChange={(e) => setDebtAttempt(e.target.value)}
                required
              />
              <label className={styles.subLabel} htmlFor="equity">
                Sponsor equity
              </label>
              <input
                id="equity"
                className={styles.input}
                type="number"
                step="1"
                inputMode="decimal"
                value={equityAttempt}
                placeholder="e.g. 300"
                onChange={(e) => setEquityAttempt(e.target.value)}
                required
              />
              <button type="submit" className={styles.primary}>
                Submit
              </button>
            </>
          ) : (
            <>
              <label className={styles.fieldLabel} htmlFor="answer">
                {askFieldLabel(ask)}
              </label>
              <div className={styles.row}>
                <input
                  id="answer"
                  className={styles.input}
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  value={attempt}
                  placeholder={askPlaceholder(ask)}
                  onChange={(e) => setAttempt(e.target.value)}
                  required
                />
                <button type="submit" className={styles.primary}>
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      )}

      {phase === 'revealed' && (
        <section className={styles.results}>
          <p>
            You guessed <strong>{latestGrade?.displayAttempt}</strong> — correct
            answer <strong>{latestGrade?.displayCorrect}</strong>
          </p>
          <p className={latestGrade?.passed ? styles.pass : styles.fail}>
            {latestGrade?.passed ? 'Correct' : 'Incorrect'}
          </p>
          <p className={styles.streak}>
            Score so far: {correctCount}/{answeredCount}
            {answeredCount < totalRounds ? ` · up to ${totalRounds} rounds` : ''}
          </p>

          {canFollowUp && (
            <div className={styles.row}>
              <button
                type="button"
                className={styles.primary}
                onClick={startFollowUp}
              >
                Interviewer follow-up
              </button>
              <button
                type="button"
                className={styles.secondary}
                onClick={finishWithoutMore}
              >
                Skip to solution
              </button>
            </div>
          )}
        </section>
      )}

      {phase === 'complete' && (
        <section className={styles.results}>
          <p className={styles.streak}>
            Session complete: {correctCount}/{answeredCount} correct
          </p>
          <button type="button" className={styles.primary} onClick={anotherOne}>
            Another one
          </button>

          <h2 className={styles.solutionsHeading}>Solutions by round</h2>
          {roundHistory.map((round, index) => (
            <article key={round.id} className={styles.roundSolution}>
              <h3 className={styles.roundSolutionTitle}>{round.label}</h3>
              <p className={styles.roundSolutionAsk}>
                Asked: {askFieldLabel(round.ask)}
              </p>
              {round.promptNote && (
                <p className={styles.roundSolutionNote}>{round.promptNote}</p>
              )}
              <p>
                You guessed <strong>{round.grade.displayAttempt}</strong> —
                correct <strong>{round.grade.displayCorrect}</strong>
              </p>
              <p className={round.grade.passed ? styles.pass : styles.fail}>
                {round.grade.passed ? 'Correct' : 'Incorrect'}
              </p>
              <ReturnsBridge solution={round.solution} />
              {index === 0 && <FinancialsTable solution={round.solution} />}
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
