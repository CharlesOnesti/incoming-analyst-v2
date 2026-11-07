import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  addDebrief,
  buildStudyPlan,
  exportBackup,
  importBackup,
  loadCalendar,
  loadProfile,
  loadReadiness,
  saveCalendar,
  type CalendarItem,
  type ReadinessDimension,
} from '../lib/profile'

const DIMENSIONS: ReadinessDimension[] = [
  'fit',
  'technicals',
  'deals',
  'lbo',
  'judgment',
  'modeling',
  'cases',
]

function newCalId() {
  return `cal-${Date.now()}`
}

export function Dashboard() {
  const [profile] = useState(() => loadProfile())
  const [readiness, setReadiness] = useState(() => loadReadiness())
  const [calendar, setCalendar] = useState<CalendarItem[]>(() => loadCalendar())
  const studyPlan = buildStudyPlan()
  const [status, setStatus] = useState('')

  const [calTitle, setCalTitle] = useState('')
  const [calDate, setCalDate] = useState('')
  const [calKind, setCalKind] =
    useState<CalendarItem['kind']>('prep')
  const [calFirm, setCalFirm] = useState('')

  const [debriefFirm, setDebriefFirm] = useState('')
  const [debriefDate, setDebriefDate] = useState('')
  const [debriefStage, setDebriefStage] = useState('')
  const [debriefQs, setDebriefQs] = useState('')
  const [debriefNotes, setDebriefNotes] = useState('')
  const [debriefNext, setDebriefNext] = useState('')

  const addCalendarItem = (event: FormEvent) => {
    event.preventDefault()
    if (!calTitle.trim() || !calDate) return
    const item: CalendarItem = {
      id: newCalId(),
      title: calTitle.trim(),
      kind: calKind,
      date: calDate,
      firm: calFirm.trim() || undefined,
    }
    const next = [...calendar, item].sort((a, b) =>
      a.date.localeCompare(b.date),
    )
    setCalendar(next)
    saveCalendar(next)
    setCalTitle('')
    setCalFirm('')
    setStatus('Calendar updated.')
  }

  const removeCalendarItem = (id: string) => {
    const next = calendar.filter((c) => c.id !== id)
    setCalendar(next)
    saveCalendar(next)
  }

  const submitDebrief = (event: FormEvent) => {
    event.preventDefault()
    addDebrief({
      id: `deb-${Date.now()}`,
      firm: debriefFirm.trim() || 'Unknown firm',
      date: debriefDate || new Date().toISOString().slice(0, 10),
      stage: debriefStage.trim() || 'screen',
      questionsAsked: debriefQs,
      selfNotes: debriefNotes,
      practiceNext: debriefNext,
      createdAt: new Date().toISOString(),
    })
    setDebriefFirm('')
    setDebriefQs('')
    setDebriefNotes('')
    setDebriefNext('')
    setStatus('Debrief saved.')
  }

  const onExport = () => {
    const raw = exportBackup()
    const blob = new Blob([raw], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'incoming-analyst-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const onImport = async (file: File | null) => {
    if (!file) return
    const text = await file.text()
    importBackup(text)
    setReadiness(loadReadiness())
    setCalendar(loadCalendar())
    setStatus('Backup imported.')
  }

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Coach</p>
      <h1 className={page.title}>Dashboard</h1>
      <p className={page.lede}>
        Readiness, study plan, calendar, and interview debriefs in one place.
      </p>
      {status && <p className={page.muted}>{status}</p>}

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Profile snapshot</h2>
        <div className={page.card}>
          <span className={page.cardLabel}>
            {profile.displayName || 'Set your name in Settings'}
          </span>
          <span className={page.cardBlurb}>
            {profile.careerTrack.toUpperCase()} · {profile.recruitingStage}
            {profile.targetFirms ? ` · targeting ${profile.targetFirms}` : ''}
          </span>
          {profile.experienceSummary && (
            <p className={page.muted}>{profile.experienceSummary}</p>
          )}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Readiness</h2>
        <div className={page.grid}>
          {DIMENSIONS.map((dim) => (
            <div key={dim}>
              <div className={page.row} style={{ justifyContent: 'space-between' }}>
                <span className={page.fieldLabel}>{dim}</span>
                <span className={page.muted}>{readiness[dim]}%</span>
              </div>
              <div className={page.meter} aria-hidden>
                <div
                  className={page.meterFill}
                  style={{ width: `${Math.min(100, readiness[dim])}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Study plan</h2>
        <div className={page.grid}>
          {studyPlan.map((action) => (
            <Link key={action.id} to={action.href} className={page.cardLink}>
              <span className={page.cardLabel}>{action.title}</span>
              <span className={page.cardBlurb}>{action.reason}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Calendar</h2>
        <form onSubmit={addCalendarItem} className={page.grid2}>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="cal-title">
              Title
            </label>
            <input
              id="cal-title"
              className={page.input}
              value={calTitle}
              onChange={(e) => setCalTitle(e.target.value)}
              required
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="cal-date">
              Date
            </label>
            <input
              id="cal-date"
              className={page.input}
              type="date"
              value={calDate}
              onChange={(e) => setCalDate(e.target.value)}
              required
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="cal-kind">
              Kind
            </label>
            <select
              id="cal-kind"
              className={page.select}
              value={calKind}
              onChange={(e) =>
                setCalKind(e.target.value as CalendarItem['kind'])
              }
            >
              <option value="interview">Interview</option>
              <option value="deadline">Deadline</option>
              <option value="prep">Prep</option>
              <option value="outreach">Outreach</option>
            </select>
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="cal-firm">
              Firm (optional)
            </label>
            <input
              id="cal-firm"
              className={page.input}
              value={calFirm}
              onChange={(e) => setCalFirm(e.target.value)}
            />
          </div>
          <button type="submit" className={page.primary}>
            Add calendar item
          </button>
        </form>
        <div className={page.grid} style={{ marginTop: '1rem' }}>
          {calendar.length === 0 && (
            <p className={page.muted}>No upcoming items.</p>
          )}
          {calendar.map((item) => (
            <div key={item.id} className={page.card}>
              <span className={page.cardLabel}>{item.title}</span>
              <span className={page.cardBlurb}>
                {item.kind} · {item.date}
                {item.firm ? ` · ${item.firm}` : ''}
              </span>
              <button
                type="button"
                className={page.secondary}
                style={{ marginTop: '0.5rem' }}
                onClick={() => removeCalendarItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Interview debrief</h2>
        <form onSubmit={submitDebrief}>
          <div className={page.grid2}>
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="deb-firm">
                Firm
              </label>
              <input
                id="deb-firm"
                className={page.input}
                value={debriefFirm}
                onChange={(e) => setDebriefFirm(e.target.value)}
              />
            </div>
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="deb-date">
                Date
              </label>
              <input
                id="deb-date"
                className={page.input}
                type="date"
                value={debriefDate}
                onChange={(e) => setDebriefDate(e.target.value)}
              />
            </div>
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="deb-stage">
              Stage
            </label>
            <input
              id="deb-stage"
              className={page.input}
              value={debriefStage}
              onChange={(e) => setDebriefStage(e.target.value)}
              placeholder="e.g. first round"
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="deb-qs">
              Questions asked
            </label>
            <textarea
              id="deb-qs"
              className={page.textarea}
              value={debriefQs}
              onChange={(e) => setDebriefQs(e.target.value)}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="deb-notes">
              Self notes
            </label>
            <textarea
              id="deb-notes"
              className={page.textarea}
              value={debriefNotes}
              onChange={(e) => setDebriefNotes(e.target.value)}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="deb-next">
              Practice next
            </label>
            <textarea
              id="deb-next"
              className={page.textarea}
              value={debriefNext}
              onChange={(e) => setDebriefNext(e.target.value)}
            />
          </div>
          <button type="submit" className={page.primary}>
            Save debrief
          </button>
        </form>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Backup</h2>
        <div className={page.row}>
          <button type="button" className={page.secondary} onClick={onExport}>
            Export backup
          </button>
          <label className={page.secondary} style={{ cursor: 'pointer' }}>
            Import backup
            <input
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => onImport(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      </section>
    </main>
  )
}
