import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  CAREER_TRACKS,
  addContribution,
  buildDailyPlan,
  getVoiceCapabilities,
  loadContributions,
} from '../lib/coach'
import { createAgentBrain } from '../lib/infra'

export function Coach() {
  const brain = useMemo(() => createAgentBrain(), [])
  const plan = useMemo(() => buildDailyPlan(), [])
  const caps = useMemo(() => getVoiceCapabilities(), [])
  const [summary] = useState(() => brain.getProfileSummary())
  const [practice] = useState(() => brain.recommendPractice())
  const [contributions, setContributions] = useState(() => loadContributions())
  const [author, setAuthor] = useState('')
  const [topic, setTopic] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')

  const onContribute = (event: FormEvent) => {
    event.preventDefault()
    if (!author.trim() || !topic.trim() || !body.trim()) return
    addContribution({
      author: author.trim(),
      topic: topic.trim(),
      body: body.trim(),
    })
    setContributions(loadContributions())
    setAuthor('')
    setTopic('')
    setBody('')
    setStatus('Contribution saved locally.')
  }

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Coach</p>
      <h1 className={page.title}>Recruiting coach</h1>
      <p className={page.lede}>
        Proactive next actions across prep, outreach, and interview readiness.
      </p>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Today&apos;s plan</h2>
        <div className={page.grid}>
          {plan.length === 0 && (
            <p className={page.muted}>No actions yet — update your profile.</p>
          )}
          {plan.map((action) => (
            <Link key={action.id} to={action.href} className={page.cardLink}>
              <span className={page.badge}>{action.source}</span>
              <span className={page.cardLabel}>{action.title}</span>
              <span className={page.cardBlurb}>{action.reason}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Agent brain</h2>
        <div className={page.card}>
          <p className={page.pre}>{summary}</p>
        </div>
        <h3 className={page.sectionTitle}>Recommended practice</h3>
        <pre className={page.pre}>{practice}</pre>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Career tracks</h2>
        <div className={page.grid2}>
          {CAREER_TRACKS.map((track) => (
            <Link key={track.id} to={track.href} className={page.cardLink}>
              <span className={page.cardLabel}>{track.title}</span>
              <span className={page.cardBlurb}>{track.summary}</span>
              <span className={page.muted}>
                Focus: {track.focusAreas.join(' · ')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Voice</h2>
        <p className={page.muted}>
          Recognition: {caps.recognition ? 'available' : 'unavailable'} ·
          Synthesis: {caps.synthesis ? 'available' : 'unavailable'}
        </p>
        <Link
          to="/mock"
          state={{ voice: true }}
          className={page.primary}
          style={{ display: 'inline-flex', marginTop: '0.75rem' }}
        >
          Launch voice mock interview
        </Link>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Expert contribution</h2>
        {status && <p className={page.muted}>{status}</p>}
        <form onSubmit={onContribute}>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="exp-author">
              Author
            </label>
            <input
              id="exp-author"
              className={page.input}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="exp-topic">
              Topic
            </label>
            <input
              id="exp-topic"
              className={page.input}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="exp-body">
              Guidance
            </label>
            <textarea
              id="exp-body"
              className={page.textarea}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button type="submit" className={page.primary}>
            Submit contribution
          </button>
        </form>
        <div className={page.grid} style={{ marginTop: '1rem' }}>
          {contributions.slice(0, 5).map((c) => (
            <article key={c.id} className={page.card}>
              <span className={page.cardLabel}>
                {c.topic} · {c.author}
              </span>
              <p className={page.pre}>{c.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
