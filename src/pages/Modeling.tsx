import { useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  MODEL_TEMPLATES,
  OPERATING_DRILLS,
  PAPER_LBO_PACKS,
  type OperatingDrill,
} from '../lib/modeling'

export function Modeling() {
  const [drill, setDrill] = useState<OperatingDrill | null>(null)
  const [checked, setChecked] = useState<string[]>([])

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Practice</p>
      <h1 className={page.title}>Modeling lab</h1>
      <p className={page.lede}>
        Paper LBO packs, operating drills, and downloadable outlines.
      </p>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Paper LBO packs</h2>
        <div className={page.grid2}>
          {PAPER_LBO_PACKS.map((pack) => (
            <Link
              key={pack.id}
              to="/quiz"
              state={{ difficulty: pack.difficulty }}
              className={page.cardLink}
            >
              <span className={page.cardLabel}>{pack.title}</span>
              <span className={page.cardBlurb}>
                {pack.difficulty} · {pack.durationMin} min — {pack.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Operating drills</h2>
        <div className={page.grid2}>
          {OPERATING_DRILLS.map((d) => (
            <button
              key={d.id}
              type="button"
              className={page.cardLink}
              onClick={() => {
                setDrill(d)
                setChecked([])
              }}
            >
              <span className={page.badge}>{d.industry}</span>
              <span className={page.cardLabel}>{d.prompt.slice(0, 72)}…</span>
            </button>
          ))}
        </div>

        {drill && (
          <article className={page.card} style={{ marginTop: '1rem' }}>
            <span className={page.badge}>{drill.industry}</span>
            <p className={page.pre} style={{ color: 'var(--ink)' }}>
              {drill.prompt}
            </p>
            <h3 className={page.sectionTitle}>Framework</h3>
            <ol className={page.list}>
              {drill.framework.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <h3 className={page.sectionTitle}>Checklist</h3>
            <div className={page.grid}>
              {drill.checklist.map((item) => (
                <label key={item} className={page.row}>
                  <input
                    type="checkbox"
                    checked={checked.includes(item)}
                    onChange={() =>
                      setChecked((prev) =>
                        prev.includes(item)
                          ? prev.filter((x) => x !== item)
                          : [...prev, item],
                      )
                    }
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </article>
        )}
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Templates</h2>
        <div className={page.grid}>
          {MODEL_TEMPLATES.map((t) => (
            <a key={t.id} href={t.path} className={page.cardLink} download>
              <span className={page.cardLabel}>{t.title}</span>
              <span className={page.cardBlurb}>
                {t.description} · {t.filename}
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
