import { useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  JUDGMENT_PROMPTS,
  pickJudgmentPrompt,
  type JudgmentPrompt,
} from '../lib/judgment'
import { addSession } from '../lib/profile'

export function Judgment() {
  const [prompt, setPrompt] = useState<JudgmentPrompt>(() =>
    pickJudgmentPrompt(),
  )
  const [checked, setChecked] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const toggle = (item: string) => {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    )
  }

  const onSelfGrade = () => {
    const score = checked.length
    const total = prompt.checklist.length || 1
    setSubmitted(true)
    addSession({
      id: `judg-${Date.now()}`,
      mode: 'judgment',
      dimension: 'judgment',
      score,
      total,
      notes: prompt.id,
      createdAt: new Date().toISOString(),
    })
  }

  const next = () => {
    setPrompt(pickJudgmentPrompt([prompt.id]))
    setChecked([])
    setSubmitted(false)
  }

  return (
    <main className={page.page}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Practice</p>
      <h1 className={page.title}>Business judgment</h1>
      <p className={page.lede}>
        Work the framework, self-grade the checklist, then read the worked
        example.
      </p>

      <div className={page.field}>
        <label className={page.fieldLabel} htmlFor="judg-pick">
          Prompt
        </label>
        <select
          id="judg-pick"
          className={page.select}
          value={prompt.id}
          onChange={(e) => {
            const nextPrompt =
              JUDGMENT_PROMPTS.find((p) => p.id === e.target.value) ??
              JUDGMENT_PROMPTS[0]
            setPrompt(nextPrompt)
            setChecked([])
            setSubmitted(false)
          }}
        >
          {JUDGMENT_PROMPTS.map((p) => (
            <option key={p.id} value={p.id}>
              [{p.kind}] {p.prompt.slice(0, 70)}
              {p.prompt.length > 70 ? '…' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className={page.card}>
        <span className={page.badge}>{prompt.kind}</span>
        <p
          className={page.pre}
          style={{ marginTop: '0.75rem', color: 'var(--ink)' }}
        >
          {prompt.prompt}
        </p>
      </div>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Framework</h2>
        <ol className={page.list}>
          {prompt.framework.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Self-grade checklist</h2>
        <div className={page.grid}>
          {prompt.checklist.map((item) => (
            <label key={item} className={page.card} style={{ cursor: 'pointer' }}>
              <span className={page.row}>
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => toggle(item)}
                />
                <span>{item}</span>
              </span>
            </label>
          ))}
        </div>
        <div className={page.row} style={{ marginTop: '1rem' }}>
          <button type="button" className={page.primary} onClick={onSelfGrade}>
            Record self-grade
          </button>
          <button type="button" className={page.secondary} onClick={next}>
            Next prompt
          </button>
        </div>
        {submitted && (
          <p className={page.muted} style={{ marginTop: '0.75rem' }}>
            Recorded {checked.length}/{prompt.checklist.length} checklist items.
          </p>
        )}
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Worked example</h2>
        <p className={page.pre}>{prompt.workedExample}</p>
      </section>
    </main>
  )
}
