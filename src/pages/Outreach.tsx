import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import { loadProfile } from '../lib/profile'
import {
  fillTemplate,
  listOutreachTypes,
  loadTracker,
  upsertTrackerEntry,
  type OutreachTemplateType,
  type OutreachVars,
  type TrackerEntry,
} from '../lib/recruiting'

export function Outreach() {
  const profile = useMemo(() => loadProfile(), [])
  const types = listOutreachTypes()
  const [type, setType] = useState<OutreachTemplateType>('intro')
  const [vars, setVars] = useState<OutreachVars>({
    sender: profile.displayName || '',
    school: profile.education || '',
    role: 'recruiting for PE associate roles',
  })
  const [tracker, setTracker] = useState<TrackerEntry[]>(() => loadTracker())
  const [form, setForm] = useState({
    firm: '',
    contact: '',
    stage: 'outreach',
    channel: 'email',
    nextAction: '',
    dueDate: '',
  })
  const [status, setStatus] = useState('')

  const draft = fillTemplate(type, vars)

  const saveEntry = (event: FormEvent) => {
    event.preventDefault()
    const entry: TrackerEntry = {
      id: `trk-${Date.now()}`,
      firm: form.firm.trim() || 'Firm',
      contact: form.contact.trim() || 'Contact',
      stage: form.stage.trim() || 'outreach',
      channel: form.channel.trim() || 'email',
      nextAction: form.nextAction.trim() || 'Follow up',
      dueDate: form.dueDate || undefined,
      updatedAt: new Date().toISOString(),
    }
    const next = upsertTrackerEntry(entry)
    setTracker(next)
    setForm({
      firm: '',
      contact: '',
      stage: 'outreach',
      channel: 'email',
      nextAction: '',
      dueDate: '',
    })
    setStatus('Tracker entry saved.')
  }

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Recruit</p>
      <h1 className={page.title}>Outreach</h1>
      <p className={page.lede}>
        Fill intro templates and keep next actions in the tracker.
      </p>
      {status && <p className={page.muted}>{status}</p>}

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Template filler</h2>
        <div className={page.field}>
          <label className={page.fieldLabel} htmlFor="out-type">
            Template
          </label>
          <select
            id="out-type"
            className={page.select}
            value={type}
            onChange={(e) => setType(e.target.value as OutreachTemplateType)}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className={page.grid2}>
          {(
            [
              'name',
              'firm',
              'role',
              'school',
              'mutual',
              'topic',
              'sender',
            ] as (keyof OutreachVars)[]
          ).map((key) => (
            <div key={key} className={page.field}>
              <label className={page.fieldLabel} htmlFor={`var-${key}`}>
                {key}
              </label>
              <input
                id={`var-${key}`}
                className={page.input}
                value={vars[key] ?? ''}
                onChange={(e) =>
                  setVars((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </div>
          ))}
        </div>
        <pre className={page.pre}>{draft}</pre>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Tracker</h2>
        <form onSubmit={saveEntry} className={page.grid2}>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="trk-firm">
              Firm
            </label>
            <input
              id="trk-firm"
              className={page.input}
              value={form.firm}
              onChange={(e) => setForm({ ...form, firm: e.target.value })}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="trk-contact">
              Contact
            </label>
            <input
              id="trk-contact"
              className={page.input}
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="trk-stage">
              Stage
            </label>
            <input
              id="trk-stage"
              className={page.input}
              value={form.stage}
              onChange={(e) => setForm({ ...form, stage: e.target.value })}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="trk-channel">
              Channel
            </label>
            <input
              id="trk-channel"
              className={page.input}
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value })}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="trk-next">
              Next action
            </label>
            <input
              id="trk-next"
              className={page.input}
              value={form.nextAction}
              onChange={(e) =>
                setForm({ ...form, nextAction: e.target.value })
              }
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="trk-due">
              Due date
            </label>
            <input
              id="trk-due"
              className={page.input}
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
          <button type="submit" className={page.primary}>
            Add tracker entry
          </button>
        </form>

        <div className={page.grid} style={{ marginTop: '1rem' }}>
          {tracker.length === 0 && (
            <p className={page.muted}>No tracker entries yet.</p>
          )}
          {tracker.map((entry) => (
            <article key={entry.id} className={page.card}>
              <span className={page.cardLabel}>
                {entry.firm} · {entry.contact}
              </span>
              <span className={page.cardBlurb}>
                {entry.stage} via {entry.channel}
              </span>
              <p className={page.muted}>
                Next: {entry.nextAction}
                {entry.dueDate ? ` · due ${entry.dueDate}` : ''}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
