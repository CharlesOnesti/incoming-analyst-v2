import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import page from '../components/Page.module.css'
import type { Difficulty } from '../lib/lbo'
import { addSession } from '../lib/profile'
import {
  pickQuestion,
  type TechnicalQuestion,
} from '../lib/technicals'

function readDifficulty(state: unknown): Difficulty {
  const value =
    state && typeof state === 'object' && 'difficulty' in state
      ? (state as { difficulty?: string }).difficulty
      : undefined
  return value === 'easy' || value === 'hard' || value === 'medium'
    ? value
    : 'medium'
}

function correctAnswerText(q: TechnicalQuestion): string {
  if (q.kind === 'mcq') {
    return (
      q.choices?.find((c) => c.id === q.correctChoiceId)?.text ??
      String(q.correctChoiceId)
    )
  }
  return String(q.correctValue ?? '')
}

export function Flashcards() {
  const location = useLocation()
  const difficulty = readDifficulty(location.state)
  const [seenIds, setSeenIds] = useState<string[]>([])
  const [card, setCard] = useState<TechnicalQuestion>(() =>
    pickQuestion(difficulty),
  )
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)

  const answer = useMemo(() => correctAnswerText(card), [card])

  const recordAndAdvance = (knewIt: boolean) => {
    setCorrectCount((n) => n + (knewIt ? 1 : 0))
    setAnsweredCount((n) => n + 1)
    addSession({
      id: `flash-${Date.now()}`,
      mode: 'flashcards',
      dimension: 'technicals',
      difficulty,
      score: knewIt ? 1 : 0,
      total: 1,
      notes: card.id,
      createdAt: new Date().toISOString(),
    })
    const nextSeen = seenIds.includes(card.id)
      ? seenIds
      : [...seenIds, card.id]
    setSeenIds(nextSeen)
    setCard(pickQuestion(difficulty, nextSeen))
    setRevealed(false)
  }

  return (
    <main className={page.page}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Practice</p>
      <h1 className={page.title}>Flashcards</h1>
      <p className={page.lede}>
        Rapid cards from the technicals bank · {difficulty} · score{' '}
        {correctCount}/{answeredCount || '—'}
      </p>

      <div className={page.card}>
        <span className={page.badge}>{card.topic}</span>
        <p className={page.pre} style={{ marginTop: '0.75rem', color: 'var(--ink)' }}>
          {card.prompt}
        </p>

        {revealed ? (
          <>
            <p className={page.sectionTitle} style={{ marginTop: '1rem' }}>
              Answer
            </p>
            <p className={page.cardLabel}>{answer}</p>
            <p className={page.pre}>{card.explanation}</p>
            <div className={page.row} style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className={page.primary}
                onClick={() => recordAndAdvance(true)}
              >
                Knew it
              </button>
              <button
                type="button"
                className={page.secondary}
                onClick={() => recordAndAdvance(false)}
              >
                Missed it
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className={page.primary}
            style={{ marginTop: '1rem' }}
            onClick={() => setRevealed(true)}
          >
            Reveal
          </button>
        )}
      </div>
    </main>
  )
}
