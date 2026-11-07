import { useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  loadResumes,
  loadStories,
  saveResumes,
  saveStories,
} from '../lib/profile'
import {
  RESUME_BULLET_PROMPTS,
  STORY_SECTION_GUIDES,
  emptyResumeDraft,
  emptyStoryDraft,
  exportMarkdown,
  type ResumeDraft,
  type StoryDraft,
} from '../lib/story'

type Tab = 'story' | 'resume'

const STORY_FIELDS = [
  'background',
  'motivations',
  'experiences',
  'interests',
  'differentiators',
] as const

export function Story() {
  const [tab, setTab] = useState<Tab>('story')
  const [stories, setStories] = useState<StoryDraft[]>(() => {
    const existing = loadStories()
    return existing.length > 0 ? existing : [emptyStoryDraft()]
  })
  const [resumes, setResumes] = useState<ResumeDraft[]>(() => {
    const existing = loadResumes()
    return existing.length > 0 ? existing : [emptyResumeDraft()]
  })
  const [storyIdx, setStoryIdx] = useState(0)
  const [resumeIdx, setResumeIdx] = useState(0)
  const [status, setStatus] = useState('')

  const story = stories[storyIdx] ?? stories[0]
  const resume = resumes[resumeIdx] ?? resumes[0]

  const updateStory = (patch: Partial<StoryDraft>) => {
    setStories((prev) =>
      prev.map((s, i) =>
        i === storyIdx
          ? { ...s, ...patch, updatedAt: new Date().toISOString() }
          : s,
      ),
    )
  }

  const updateResume = (patch: Partial<ResumeDraft>) => {
    setResumes((prev) =>
      prev.map((r, i) =>
        i === resumeIdx
          ? { ...r, ...patch, updatedAt: new Date().toISOString() }
          : r,
      ),
    )
  }

  const onSave = () => {
    saveStories(stories)
    saveResumes(resumes)
    setStatus('Saved versions to local storage.')
  }

  const onExport = () => {
    const md = exportMarkdown(story, resume)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `story-resume-${story.versionLabel}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Prepare</p>
      <h1 className={page.title}>Story & resume</h1>
      <p className={page.lede}>
        Draft narrative versions and resume outlines, then export markdown.
      </p>

      <div className={page.row} style={{ marginBottom: '1.25rem' }}>
        <button
          type="button"
          className={tab === 'story' ? page.primary : page.secondary}
          onClick={() => setTab('story')}
        >
          Story
        </button>
        <button
          type="button"
          className={tab === 'resume' ? page.primary : page.secondary}
          onClick={() => setTab('resume')}
        >
          Resume
        </button>
        <button type="button" className={page.secondary} onClick={onSave}>
          Save versions
        </button>
        <button type="button" className={page.secondary} onClick={onExport}>
          Export markdown
        </button>
      </div>
      {status && <p className={page.muted}>{status}</p>}

      {tab === 'story' ? (
        <section className={page.section}>
          <div className={page.row} style={{ marginBottom: '1rem' }}>
            <select
              className={page.select}
              style={{ maxWidth: '14rem' }}
              value={storyIdx}
              onChange={(e) => setStoryIdx(Number(e.target.value))}
            >
              {stories.map((s, i) => (
                <option key={s.id} value={i}>
                  {s.versionLabel}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={page.secondary}
              onClick={() => {
                const next = emptyStoryDraft(`v${stories.length + 1}`)
                setStories((prev) => [...prev, next])
                setStoryIdx(stories.length)
              }}
            >
              New story version
            </button>
          </div>

          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="story-label">
              Version label
            </label>
            <input
              id="story-label"
              className={page.input}
              value={story.versionLabel}
              onChange={(e) => updateStory({ versionLabel: e.target.value })}
            />
          </div>

          {STORY_FIELDS.map((field) => {
            const guide = STORY_SECTION_GUIDES[field]
            return (
              <div key={field} className={page.field}>
                <label className={page.fieldLabel} htmlFor={`story-${field}`}>
                  {guide.title}
                </label>
                <p className={page.muted}>{guide.prompt}</p>
                <textarea
                  id={`story-${field}`}
                  className={page.textarea}
                  value={story[field]}
                  onChange={(e) => updateStory({ [field]: e.target.value })}
                />
              </div>
            )
          })}
        </section>
      ) : (
        <section className={page.section}>
          <div className={page.row} style={{ marginBottom: '1rem' }}>
            <select
              className={page.select}
              style={{ maxWidth: '14rem' }}
              value={resumeIdx}
              onChange={(e) => setResumeIdx(Number(e.target.value))}
            >
              {resumes.map((r, i) => (
                <option key={r.id} value={i}>
                  {r.versionLabel}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={page.secondary}
              onClick={() => {
                const next = emptyResumeDraft(`v${resumes.length + 1}`)
                setResumes((prev) => [...prev, next])
                setResumeIdx(resumes.length)
              }}
            >
              New resume version
            </button>
          </div>

          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="resume-label">
              Version label
            </label>
            <input
              id="resume-label"
              className={page.input}
              value={resume.versionLabel}
              onChange={(e) => updateResume({ versionLabel: e.target.value })}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="resume-role">
              Target role
            </label>
            <input
              id="resume-role"
              className={page.input}
              value={resume.targetRole}
              onChange={(e) => updateResume({ targetRole: e.target.value })}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="resume-edu">
              Education
            </label>
            <textarea
              id="resume-edu"
              className={page.textarea}
              value={resume.education}
              onChange={(e) => updateResume({ education: e.target.value })}
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="resume-bullets">
              Experience bullets (one per line)
            </label>
            <p className={page.muted}>{RESUME_BULLET_PROMPTS[0]}</p>
            <textarea
              id="resume-bullets"
              className={page.textarea}
              value={resume.experienceBullets.join('\n')}
              onChange={(e) =>
                updateResume({
                  experienceBullets: e.target.value
                    .split('\n')
                    .map((l) => l.trimEnd()),
                })
              }
            />
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="resume-skills">
              Skills (comma-separated)
            </label>
            <input
              id="resume-skills"
              className={page.input}
              value={resume.skills.join(', ')}
              onChange={(e) =>
                updateResume({
                  skills: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        </section>
      )}
    </main>
  )
}
