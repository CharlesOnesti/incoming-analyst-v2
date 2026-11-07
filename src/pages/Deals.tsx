import { useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  emptyDeal,
  followupsFor,
  type DealCard,
  type DealSection,
  type DealSeniority,
} from '../lib/deals'
import { loadDeals, saveDeals } from '../lib/profile'

const SECTIONS: { id: DealSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'businessModel', label: 'Business model' },
  { id: 'industry', label: 'Industry' },
  { id: 'thesis', label: 'Thesis' },
  { id: 'valuation', label: 'Valuation' },
  { id: 'structure', label: 'Structure' },
  { id: 'diligence', label: 'Diligence' },
  { id: 'risks', label: 'Risks' },
  { id: 'contribution', label: 'Contribution' },
]

const SENIORITIES: DealSeniority[] = ['associate', 'vp', 'partner']

export function Deals() {
  const [deals, setDeals] = useState<DealCard[]>(() => loadDeals())
  const [selectedId, setSelectedId] = useState<string | null>(
    () => loadDeals()[0]?.id ?? null,
  )
  const [seniority, setSeniority] = useState<DealSeniority>('associate')
  const [section, setSection] = useState<DealSection>('overview')
  const [status, setStatus] = useState('')

  const selected = deals.find((d) => d.id === selectedId) ?? null

  const persist = (next: DealCard[]) => {
    setDeals(next)
    saveDeals(next)
    setStatus('Deal library saved.')
  }

  const createDeal = () => {
    const deal = emptyDeal({ companyName: 'New deal' })
    persist([deal, ...deals])
    setSelectedId(deal.id)
  }

  const updateSelected = (patch: Partial<DealCard>) => {
    if (!selected) return
    const next = deals.map((d) =>
      d.id === selected.id
        ? { ...d, ...patch, updatedAt: new Date().toISOString() }
        : d,
    )
    persist(next)
  }

  const followups = followupsFor(seniority, section)

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Prepare</p>
      <h1 className={page.title}>Deal library</h1>
      <p className={page.lede}>
        Structure each transaction and rehearse seniority-specific follow-ups.
      </p>

      <div className={page.row} style={{ marginBottom: '1rem' }}>
        <button type="button" className={page.primary} onClick={createDeal}>
          New deal
        </button>
        {status && <span className={page.muted}>{status}</span>}
      </div>

      <div className={page.grid2}>
        <div className={page.grid}>
          {deals.length === 0 && (
            <p className={page.muted}>No deals yet — create one to begin.</p>
          )}
          {deals.map((deal) => (
            <button
              key={deal.id}
              type="button"
              className={page.cardLink}
              onClick={() => setSelectedId(deal.id)}
            >
              <span className={page.cardLabel}>
                {deal.companyName || 'Untitled deal'}
              </span>
              <span className={page.cardBlurb}>
                {deal.role || 'Role TBD'} ·{' '}
                {deal.industry || 'Industry TBD'}
              </span>
            </button>
          ))}
        </div>

        {selected && (
          <div>
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="deal-name">
                Company
              </label>
              <input
                id="deal-name"
                className={page.input}
                value={selected.companyName}
                onChange={(e) => updateSelected({ companyName: e.target.value })}
              />
            </div>
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="deal-role">
                Your role
              </label>
              <input
                id="deal-role"
                className={page.input}
                value={selected.role}
                onChange={(e) => updateSelected({ role: e.target.value })}
              />
            </div>
            {SECTIONS.map(({ id, label }) => (
              <div key={id} className={page.field}>
                <label className={page.fieldLabel} htmlFor={`deal-${id}`}>
                  {label}
                </label>
                <textarea
                  id={`deal-${id}`}
                  className={page.textarea}
                  value={selected[id]}
                  onChange={(e) => updateSelected({ [id]: e.target.value })}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Follow-up drills</h2>
        <div className={page.row} style={{ marginBottom: '0.75rem' }}>
          {SENIORITIES.map((s) => (
            <button
              key={s}
              type="button"
              className={seniority === s ? page.primary : page.secondary}
              onClick={() => setSeniority(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <div className={page.field}>
          <label className={page.fieldLabel} htmlFor="fu-section">
            Section
          </label>
          <select
            id="fu-section"
            className={page.select}
            value={section}
            onChange={(e) => setSection(e.target.value as DealSection)}
          >
            {SECTIONS.map(({ id, label }) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <ul className={page.list}>
          {followups.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
