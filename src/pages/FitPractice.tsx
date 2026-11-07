import { useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  FIT_QUESTIONS,
  gradeFitAnswer,
  pickFitQuestion,
  type FitAnswerLength,
  type FitGrade,
  type FitQuestion,
} from '../lib/fit'
import { addSession } from '../lib/profile'

export function FitPractice() {
  const [question, setQuestion] = useState<FitQuestion>(() =>
    pickFitQuestion(),
  )
  const [answer, setAnswer] = useState('')
  const [length, setLength] = useState<FitAnswerLength>('60s')
  const [grade, setGrade] = useState<FitGrade | null>(null)

  const onGrade = () => {
    const result = gradeFitAnswer(question, answer, length)
    setGrade(result)
    addSession({
      id: `fit-${Date.now()}`,
      mode: 'fit',
      dimension: 'fit',
      score: result.score,
      total: 100,
      notes: question.id,
      createdAt: new Date().toISOString(),
    })
  }

  const nextQuestion = () => {
    setQuestion(pickFitQuestion([question.id]))
    setAnswer('')
    setGrade(null)
  }

  return (
    <main className={page.page}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Practice</p>
      <h1 className={page.title}>Fit answers</h1>
      <p className={page.lede}>
        Draft a {length} answer, then compare against the model response.
      </p>

      <div className={page.field}>
        <label className={page.fieldLabel} htmlFor="fit-q">
          Question
        </label>
        <select
          id="fit-q"
          className={page.select}
          value={question.id}
          onChange={(e) => {
            const next =
              FIT_QUESTIONS.find((q) => q.id === e.target.value) ??
              FIT_QUESTIONS[0]
            setQuestion(next)
            setAnswer('')
            setGrade(null)
          }}
        >
          {FIT_QUESTIONS.map((q) => (
            <option key={q.id} value={q.id}>
              {q.prompt.slice(0, 80)}
              {q.prompt.length > 80 ? '…' : ''}
            </option>
          ))}
        </select>
      </div>

      <p className={page.pre} style={{ color: 'var(--ink)', marginBottom: '1rem' }}>
        {question.prompt}
      </p>

      <div className={page.row} style={{ marginBottom: '1rem' }}>
        {(['30s', '60s'] as FitAnswerLength[]).map((opt) => (
          <button
            key={opt}
            type="button"
            className={length === opt ? page.primary : page.secondary}
            onClick={() => setLength(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className={page.field}>
        <label className={page.fieldLabel} htmlFor="fit-answer">
          Your answer
        </label>
        <textarea
          id="fit-answer"
          className={page.textarea}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Speak out loud, then type what you said…"
        />
      </div>

      <div className={page.row}>
        <button type="button" className={page.primary} onClick={onGrade}>
          Grade
        </button>
        <button type="button" className={page.secondary} onClick={nextQuestion}>
          Next question
        </button>
      </div>

      {grade && (
        <section className={page.section} style={{ marginTop: '1.75rem' }}>
          <h2 className={page.sectionTitle}>Score: {grade.score}/100</h2>
          <ul className={page.list}>
            {grade.feedback.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <h3 className={page.sectionTitle}>Model · 30s</h3>
          <p className={page.pre}>{question.modelAnswer30s}</p>
          <h3 className={page.sectionTitle}>Model · 60s</h3>
          <p className={page.pre}>{question.modelAnswer60s}</p>

          <h3 className={page.sectionTitle}>Structure hints</h3>
          <ul className={page.list}>
            {question.structureHints.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h3 className={page.sectionTitle}>Pitfalls</h3>
          <ul className={page.list}>
            {question.pitfalls.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
