import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import { loadProfile } from '../lib/profile'
import {
  FIRMS,
  buildFirmBrief,
  recommendFirms,
  type FirmRecord,
} from '../lib/recruiting'

export function Firms() {
  const profile = useMemo(() => loadProfile(), [])
  const recommendations = useMemo(
    () =>
      recommendFirms(profile.targetFirms, profile.experienceSummary),
    [profile],
  )
  const [selected, setSelected] = useState<FirmRecord | null>(null)

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Recruit</p>
      <h1 className={page.title}>Firm discovery</h1>
      <p className={page.lede}>
        Browse target firms, recommendations from your profile, and research
        briefs.
      </p>

      {recommendations.length > 0 && (
        <section className={page.section}>
          <h2 className={page.sectionTitle}>Recommended for you</h2>
          <div className={page.grid2}>
            {recommendations.slice(0, 6).map((rec) => (
              <button
                key={rec.firm.id}
                type="button"
                className={page.cardLink}
                onClick={() => setSelected(rec.firm)}
              >
                <span className={page.cardLabel}>{rec.firm.name}</span>
                <span className={page.cardBlurb}>
                  Match score {rec.score}
                  {rec.matched.length
                    ? ` · ${rec.matched.slice(0, 4).join(', ')}`
                    : ''}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className={page.section}>
        <h2 className={page.sectionTitle}>All firms</h2>
        <div className={page.grid2}>
          {FIRMS.map((firm) => (
            <button
              key={firm.id}
              type="button"
              className={page.cardLink}
              onClick={() => setSelected(firm)}
            >
              <span className={page.row}>
                <span className={page.cardLabel}>{firm.name}</span>
                <span className={page.badge}>{firm.sourceTag}</span>
              </span>
              <span className={page.cardBlurb}>
                {firm.strategy} · {firm.geography}
              </span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <section className={page.section}>
          <h2 className={page.sectionTitle}>{selected.name}</h2>
          <div className={page.row} style={{ marginBottom: '0.75rem' }}>
            <span className={page.badge}>{selected.sourceTag}</span>
            <span className={page.muted}>{selected.fundSize}</span>
          </div>
          <p className={page.pre}>{buildFirmBrief(selected)}</p>
          <p className={page.muted}>
            Sectors: {selected.sectors.join(', ')}
          </p>
          <p className={page.muted}>{selected.recruitingNotes}</p>
        </section>
      )}
    </main>
  )
}
