import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Difficulty } from '../lib/lbo'
import styles from './Home.module.css'

const DIFFICULTIES: { id: Difficulty; label: string; blurb: string }[] = [
  { id: 'easy', label: 'Easy', blurb: 'Rounder inputs and more structured prompts' },
  { id: 'medium', label: 'Medium', blurb: 'Standard ranges used in first-round screens' },
  { id: 'hard', label: 'Hard', blurb: 'Wider inputs and denser follow-up questions' },
]

type PracticeMode = 'lbo' | 'technicals'

const MODES: { id: PracticeMode; label: string; blurb: string }[] = [
  {
    id: 'lbo',
    label: 'Paper LBO',
    blurb: 'Full cases with multi-metric asks and interviewer sensitivity follow-ups',
  },
  {
    id: 'technicals',
    label: 'Technicals',
    blurb: 'Short drills on LBO candidates, return drivers, leverage, valuation, and accounting',
  },
]

export function Home() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<PracticeMode>('lbo')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')

  return (
    <main className={styles.page}>
      <p className={styles.kicker}>Interview prep</p>
      <h1 className={styles.title}>Incoming Analyst</h1>
      <p className={styles.lede}>
        Practice the mechanics of a private equity analyst interview. Choose a
        mode and difficulty, then work through each question without a
        calculator.
      </p>

      <p className={styles.label}>Mode</p>
      <div className={styles.difficultyRow} role="radiogroup" aria-label="Mode">
        {MODES.map(({ id, label, blurb }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={mode === id}
            className={
              mode === id ? styles.difficultySelected : styles.difficulty
            }
            onClick={() => setMode(id)}
          >
            <span className={styles.difficultyLabel}>{label}</span>
            <span className={styles.difficultyBlurb}>{blurb}</span>
          </button>
        ))}
      </div>

      <p className={styles.label}>Difficulty</p>
      <div className={styles.difficultyRow} role="radiogroup" aria-label="Difficulty">
        {DIFFICULTIES.map(({ id, label, blurb }) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={difficulty === id}
            className={
              difficulty === id ? styles.difficultySelected : styles.difficulty
            }
            onClick={() => setDifficulty(id)}
          >
            <span className={styles.difficultyLabel}>{label}</span>
            <span className={styles.difficultyBlurb}>{blurb}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.start}
        onClick={() =>
          navigate(mode === 'lbo' ? '/quiz' : '/technicals', {
            state: { difficulty },
          })
        }
      >
        Start
      </button>
    </main>
  )
}
