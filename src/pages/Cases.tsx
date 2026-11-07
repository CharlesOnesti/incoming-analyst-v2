import { useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  CASE_LIBRARY,
  gradeMemo,
  type CaseStudy,
  type MemoGrade,
} from '../lib/cases'
import { addSession } from '../lib/profile'

export function Cases() {
  const [selected, setSelected] = useState<CaseStudy | null>(null)
  const [checked, setChecked] = useState<string[]>([])
  const [grade, setGrade] = useState<MemoGrade | null>(null)

  const openCase = (c: CaseStudy) => {
    setSelected(c)
    setChecked([])
    setGrade(null)
  }

  const onGrade = () => {
    if (!selected) return
    const result = gradeMemo(selected, checked)
    setGrade(result)
    addSession({
      id: `case-${Date.now()}`,
      mode: 'cases',
      dimension: 'cases',
      score: result.score,
      total: 100,
      notes: selected.id,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Practice</p>
      <h1 className={page.title}>Case studies</h1>
      <p className={page.lede}>
        CIM-style materials, memo outlines, thesis checklists, and IC drills.
      </p>

      {!selected ? (
        <div className={page.grid2}>
          {CASE_LIBRARY.map((c) => (
            <button
              key={c.id}
              type="button"
              className={page.cardLink}
              onClick={() => openCase(c)}
            >
              <span className={page.cardLabel}>{c.title}</span>
              <span className={page.cardBlurb}>
                {c.industry} · {c.companySize} · {c.durationMin} min
              </span>
            </button>
          ))}
        </div>
      ) : (
        <section className={page.section}>
          <button
            type="button"
            className={page.secondary}
            onClick={() => setSelected(null)}
          >
            ← All cases
          </button>
          <h2 className={page.title} style={{ fontSize: '1.75rem' }}>
            {selected.title}
          </h2>
          <p className={page.muted}>
            {selected.industry} · {selected.companySize}
          </p>

          <h3 className={page.sectionTitle}>Materials</h3>
          <pre className={page.pre}>{selected.materials}</pre>

          <h3 className={page.sectionTitle}>Memo outline</h3>
          <ol className={page.list}>
            {selected.memoOutline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <h3 className={page.sectionTitle}>Thesis checklist</h3>
          <div className={page.grid}>
            {selected.thesisChecklist.map((id) => (
              <label key={id} className={page.card} style={{ cursor: 'pointer' }}>
                <span className={page.row}>
                  <input
                    type="checkbox"
                    checked={checked.includes(id)}
                    onChange={() =>
                      setChecked((prev) =>
                        prev.includes(id)
                          ? prev.filter((x) => x !== id)
                          : [...prev, id],
                      )
                    }
                  />
                  <span>{id}</span>
                </span>
              </label>
            ))}
          </div>
          <button
            type="button"
            className={page.primary}
            style={{ marginTop: '0.75rem' }}
            onClick={onGrade}
          >
            Grade memo checklist
          </button>
          {grade && (
            <div className={page.card} style={{ marginTop: '0.75rem' }}>
              <span className={page.cardLabel}>Score {grade.score}/100</span>
              <ul className={page.list}>
                {grade.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              {grade.missing.length > 0 && (
                <p className={page.muted}>
                  Missing: {grade.missing.join(', ')}
                </p>
              )}
            </div>
          )}

          <h3 className={page.sectionTitle}>IC questions</h3>
          <ul className={page.list}>
            {selected.icQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
