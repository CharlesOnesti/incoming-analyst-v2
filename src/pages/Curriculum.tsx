import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  LESSONS,
  getLesson,
  type CurriculumSection,
} from '../lib/curriculum'

const SECTION_LABELS: Record<CurriculumSection, string> = {
  pe101: 'PE 101',
  roles: 'Roles',
  lifecycle: 'Fund lifecycle',
  workstreams: 'Workstreams',
  glossary: 'Glossary',
}

const SECTIONS = Object.keys(SECTION_LABELS) as CurriculumSection[]

export function Curriculum() {
  const [section, setSection] = useState<CurriculumSection>('pe101')
  const [lessonId, setLessonId] = useState(LESSONS[0]?.id ?? '')

  const sectionLessons = useMemo(
    () =>
      LESSONS.filter((l) => l.section === section).sort(
        (a, b) => a.order - b.order,
      ),
    [section],
  )

  const lesson = getLesson(lessonId) ?? sectionLessons[0]

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Prepare</p>
      <h1 className={page.title}>PE education</h1>
      <p className={page.lede}>
        Foundational lessons on funds, roles, lifecycle, and workstreams.
      </p>

      <div className={page.row} style={{ marginBottom: '1.25rem' }}>
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            className={section === s ? page.primary : page.secondary}
            onClick={() => {
              setSection(s)
              const first = LESSONS.find((l) => l.section === s)
              if (first) setLessonId(first.id)
            }}
          >
            {SECTION_LABELS[s]}
          </button>
        ))}
      </div>

      <div className={page.grid2}>
        <div className={page.grid}>
          {sectionLessons.map((l) => (
            <button
              key={l.id}
              type="button"
              className={page.cardLink}
              onClick={() => setLessonId(l.id)}
              aria-pressed={lesson?.id === l.id}
            >
              <span className={page.cardLabel}>{l.title}</span>
              <span className={page.cardBlurb}>{l.summary}</span>
            </button>
          ))}
        </div>

        {lesson && (
          <article className={page.card}>
            <h2 className={page.sectionTitle}>{lesson.title}</h2>
            <p className={page.muted}>{lesson.summary}</p>
            <p className={page.pre}>{lesson.body}</p>
          </article>
        )}
      </div>
    </main>
  )
}
