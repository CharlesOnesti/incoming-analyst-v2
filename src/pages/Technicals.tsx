import { useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Timer } from '../components/Timer'
import type { Difficulty } from '../lib/lbo'
import {
  gradeQuestion,
  pickQuestion,
  type TechnicalGrade,
  type TechnicalQuestion,
} from '../lib/technicals'
import styles from './Technicals.module.css'

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

const TOPIC_LABELS: Record<TechnicalQuestion['topic'], string> = {
  lboCandidate: 'LBO candidate',
  returnDrivers: 'Return drivers',
  leverage: 'Leverage',
  valuation: 'Valuation',
  accounting: 'Accounting',
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

export function Technicals() {
  const location = useLocation()
  const difficulty = readDifficulty(location.state)
  const [resetKey, setResetKey] = useState(0)
  const [seenIds, setSeenIds] = useState<string[]>([])
  const [question, setQuestion] = useState<TechnicalQuestion>(() =>
    pickQuestion(difficulty),
  )
  const [choiceId, setChoiceId] = useState('')
  const [numericAttempt, setNumericAttempt] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [grade, setGrade] = useState<TechnicalGrade | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  const topicLabel = useMemo(
    () => TOPIC_LABELS[question.topic],
    [question.topic],
  )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const result = gradeQuestion(question, {
      choiceId: question.kind === 'mcq' ? choiceId : undefined,
      value:
        question.kind === 'numeric'
          ? Number.parseFloat(numericAttempt)
          : undefined,
    })
    setGrade(result)
    setSubmitted(true)
    setAnsweredCount((n) => n + 1)
    if (result.passed) setCorrectCount((n) => n + 1)
    setSeenIds((ids) =>
      ids.includes(question.id) ? ids : [...ids, question.id],
    )
  }

  const nextQuestion = () => {
    const next = pickQuestion(difficulty, [...seenIds, question.id])
    setQuestion(next)
    setChoiceId('')
    setNumericAttempt('')
    setSubmitted(false)
    setGrade(null)
    setResetKey((k) => k + 1)
  }

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <Link to="/" className={styles.back}>
          ← Home
        </Link>
        <div className={styles.badges}>
          <span className={styles.badge}>{DIFFICULTY_LABELS[difficulty]}</span>
          <span className={styles.badge}>{topicLabel}</span>
        </div>
      </div>

      <h1 className={styles.title}>Technicals</h1>
      <p className={styles.prompt}>{question.prompt}</p>

      <Timer key={resetKey} running={!submitted} />

      {!submitted ? (
        <form className={styles.form} onSubmit={onSubmit}>
          {question.kind === 'mcq' && question.choices ? (
            <div
              className={styles.choices}
              role="radiogroup"
              aria-label="Answer choices"
            >
              {question.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={choiceId === choice.id}
                  className={
                    choiceId === choice.id
                      ? styles.choiceSelected
                      : styles.choice
                  }
                  onClick={() => setChoiceId(choice.id)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          ) : (
            <>
              <label className={styles.fieldLabel} htmlFor="numeric">
                Answer
              </label>
              <input
                id="numeric"
                className={styles.input}
                type="number"
                step="any"
                inputMode="decimal"
                value={numericAttempt}
                placeholder="Enter a number"
                onChange={(e) => setNumericAttempt(e.target.value)}
                required
              />
            </>
          )}
          <button
            type="submit"
            className={styles.primary}
            disabled={question.kind === 'mcq' && !choiceId}
          >
            Submit
          </button>
        </form>
      ) : (
        <section className={styles.results}>
          <p>
            {grade?.passed ? (
              <>
                Correct: <strong>{grade.displayCorrect}</strong>
              </>
            ) : (
              <>
                You answered <strong>{grade?.displayAttempt}</strong>
                {' — '}
                correct <strong>{grade?.displayCorrect}</strong>
              </>
            )}
          </p>
          {!grade?.passed && <p className={styles.fail}>Incorrect</p>}
          <p className={styles.explanation}>{question.explanation}</p>
          <p className={styles.streak}>
            Score: {correctCount}/{answeredCount}
          </p>
          <button type="button" className={styles.primary} onClick={nextQuestion}>
            Next question
          </button>
        </section>
      )}
    </main>
  )
}
