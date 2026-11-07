import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Difficulty } from '../lib/lbo'
import { APP_MODES, type AppMode } from '../lib/modes'
import page from '../components/Page.module.css'
import styles from './Home.module.css'

const DIFFICULTIES: { id: Difficulty; label: string; blurb: string }[] = [
  { id: 'easy', label: 'Easy', blurb: 'Rounder inputs and more structured prompts' },
  { id: 'medium', label: 'Medium', blurb: 'Standard ranges used in first-round screens' },
  { id: 'hard', label: 'Hard', blurb: 'Wider inputs and denser follow-up questions' },
]

const GROUP_ORDER: AppMode['group'][] = ['practice', 'prepare', 'recruit', 'coach']

const GROUP_LABELS: Record<AppMode['group'], string> = {
  practice: 'Practice',
  prepare: 'Prepare',
  recruit: 'Recruit',
  coach: 'Coach',
}

export function Home() {
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      label: GROUP_LABELS[group],
      modes: APP_MODES.filter((m) => m.group === group),
    }))
  }, [])

  const openMode = (mode: AppMode) => {
    if (mode.needsDifficulty) {
      navigate(mode.href, { state: { difficulty } })
    } else {
      navigate(mode.href)
    }
  }

  return (
    <main className={`${page.page} ${page.wide}`}>
      <p className={styles.kicker}>Private equity recruiting</p>
      <h1 className={styles.title}>Incoming Analyst</h1>
      <p className={styles.lede}>
        Your PE recruiting coach — paper LBOs, technicals, fit, deal stories,
        firm research, and a readiness dashboard that keeps next actions
        honest.
      </p>

      <p className={styles.label}>Difficulty for timed drills</p>
      <div
        className={styles.difficultyRow}
        role="radiogroup"
        aria-label="Difficulty"
      >
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

      {grouped.map(({ group, label, modes }) => (
        <section key={group} className={page.section}>
          <h2 className={styles.groupHeading}>{label}</h2>
          <div className={page.grid2}>
            {modes.map((mode) => (
              <button
                key={mode.id}
                type="button"
                className={page.cardLink}
                onClick={() => openMode(mode)}
              >
                <span className={page.cardLabel}>{mode.label}</span>
                <span className={page.cardBlurb}>{mode.blurb}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
