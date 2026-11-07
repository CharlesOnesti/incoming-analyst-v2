import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  getLlmProvider,
  getUser,
  listContentModules,
  loadSettings,
  saveSettings,
  signIn,
  signOut,
  type Settings as PrivacySettings,
} from '../lib/infra'
import {
  exportBackup,
  importBackup,
  loadProfile,
  saveProfile,
  type CandidateProfile,
  type ReadinessDimension,
  type RecruitingStage,
} from '../lib/profile'

const STAGES: RecruitingStage[] = [
  'exploring',
  'networking',
  'applying',
  'interviewing',
  'offer',
]

const TRACKS: CandidateProfile['careerTrack'][] = [
  'pe',
  'ib',
  'growth',
  'credit',
  'hf',
]

const WEAK_OPTIONS: ReadinessDimension[] = [
  'fit',
  'technicals',
  'deals',
  'lbo',
  'judgment',
  'modeling',
  'cases',
]

export function Settings() {
  const [profile, setProfile] = useState<CandidateProfile>(() => loadProfile())
  const [user, setUser] = useState(() => getUser())
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [privacy, setPrivacy] = useState<PrivacySettings>(() => loadSettings())
  const modules = useMemo(() => listContentModules(), [])
  const llmName = useMemo(() => getLlmProvider().name, [])
  const [status, setStatus] = useState('')

  const onSaveProfile = (event: FormEvent) => {
    event.preventDefault()
    saveProfile(profile)
    setStatus('Profile saved.')
  }

  const onSavePrivacy = () => {
    saveSettings(privacy)
    setStatus('Privacy settings saved.')
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
    importBackup(await file.text())
    setProfile(loadProfile())
    setPrivacy(loadSettings())
    setUser(getUser())
    setStatus('Backup imported.')
  }

  const toggleWeak = (dim: ReadinessDimension) => {
    setProfile((prev) => ({
      ...prev,
      weakAreas: prev.weakAreas.includes(dim)
        ? prev.weakAreas.filter((d) => d !== dim)
        : [...prev.weakAreas, dim],
    }))
  }

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Coach</p>
      <h1 className={page.title}>Settings</h1>
      <p className={page.lede}>
        Profile, local auth, privacy, content modules, and backup.
      </p>
      {status && <p className={page.muted}>{status}</p>}

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Profile</h2>
        <form onSubmit={onSaveProfile}>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="pf-name">
              Display name
            </label>
            <input
              id="pf-name"
              className={page.input}
              value={profile.displayName}
              onChange={(e) =>
                setProfile({ ...profile, displayName: e.target.value })
              }
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="pf-edu">
              Education
            </label>
            <input
              id="pf-edu"
              className={page.input}
              value={profile.education}
              onChange={(e) =>
                setProfile({ ...profile, education: e.target.value })
              }
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="pf-exp">
              Experience summary
            </label>
            <textarea
              id="pf-exp"
              className={page.textarea}
              value={profile.experienceSummary}
              onChange={(e) =>
                setProfile({ ...profile, experienceSummary: e.target.value })
              }
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="pf-firms">
              Target firms
            </label>
            <input
              id="pf-firms"
              className={page.input}
              value={profile.targetFirms}
              onChange={(e) =>
                setProfile({ ...profile, targetFirms: e.target.value })
              }
            />
          </div>
          <div className={page.grid2}>
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="pf-stage">
                Recruiting stage
              </label>
              <select
                id="pf-stage"
                className={page.select}
                value={profile.recruitingStage}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    recruitingStage: e.target.value as RecruitingStage,
                  })
                }
              >
                {STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="pf-track">
                Career track
              </label>
              <select
                id="pf-track"
                className={page.select}
                value={profile.careerTrack}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    careerTrack: e.target
                      .value as CandidateProfile['careerTrack'],
                  })
                }
              >
                {TRACKS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className={page.fieldLabel}>Weak areas</p>
          <div className={page.row} style={{ marginBottom: '1rem' }}>
            {WEAK_OPTIONS.map((dim) => (
              <button
                key={dim}
                type="button"
                className={
                  profile.weakAreas.includes(dim) ? page.primary : page.secondary
                }
                onClick={() => toggleWeak(dim)}
              >
                {dim}
              </button>
            ))}
          </div>
          <button type="submit" className={page.primary}>
            Save profile
          </button>
        </form>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Local auth</h2>
        {user ? (
          <div className={page.card}>
            <span className={page.cardLabel}>{user.displayName}</span>
            <span className={page.cardBlurb}>{user.email}</span>
            <button
              type="button"
              className={page.secondary}
              style={{ marginTop: '0.75rem' }}
              onClick={() => {
                signOut()
                setUser(null)
                setStatus('Signed out.')
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const next = signIn(email, name)
              setUser(next)
              setStatus('Signed in locally.')
            }}
          >
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="auth-email">
                Email
              </label>
              <input
                id="auth-email"
                className={page.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={page.field}>
              <label className={page.fieldLabel} htmlFor="auth-name">
                Name
              </label>
              <input
                id="auth-name"
                className={page.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button type="submit" className={page.primary}>
              Sign in
            </button>
          </form>
        )}
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Privacy</h2>
        {(
          [
            ['retainTranscripts', 'Retain transcripts'],
            ['redactDealNames', 'Redact deal names'],
            ['shareAnonymousTelemetry', 'Share anonymous telemetry'],
          ] as [keyof PrivacySettings, string][]
        ).map(([key, label]) => (
          <label key={key} className={page.row} style={{ marginBottom: '0.5rem' }}>
            <input
              type="checkbox"
              checked={privacy[key]}
              onChange={(e) =>
                setPrivacy({ ...privacy, [key]: e.target.checked })
              }
            />
            <span>{label}</span>
          </label>
        ))}
        <button
          type="button"
          className={page.secondary}
          style={{ marginTop: '0.75rem' }}
          onClick={onSavePrivacy}
        >
          Save privacy
        </button>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>Content modules</h2>
        <div className={page.grid}>
          {modules.map((mod) => (
            <Link key={mod.id} to={mod.href === '/learn' ? '/curriculum' : mod.href} className={page.cardLink}>
              <span className={page.cardLabel}>{mod.label}</span>
              <span className={page.cardBlurb}>{mod.count} items</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={page.section}>
        <h2 className={page.sectionTitle}>LLM provider</h2>
        <p className={page.muted}>Active provider: {llmName}</p>
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
