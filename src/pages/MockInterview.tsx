import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  createRecognizer,
  getVoiceCapabilities,
  speak,
} from '../lib/coach'
import {
  appendAnswer,
  createSession,
  finalize,
  type InterviewMode,
  type InterviewPersona,
  type MockSession,
} from '../lib/mock'
import { addSession } from '../lib/profile'

const MODES: InterviewMode[] = ['fit', 'technical', 'deal', 'mixed', 'judgment']
const PERSONAS: InterviewPersona[] = [
  'associate',
  'vp',
  'partner',
  'headhunter',
]

const MODE_DIMENSION: Record<
  InterviewMode,
  'fit' | 'technicals' | 'deals' | 'judgment'
> = {
  fit: 'fit',
  technical: 'technicals',
  deal: 'deals',
  mixed: 'fit',
  judgment: 'judgment',
}

export function MockInterview() {
  const location = useLocation()
  const autoVoice =
    location.state &&
    typeof location.state === 'object' &&
    'voice' in location.state &&
    Boolean((location.state as { voice?: boolean }).voice)

  const [mode, setMode] = useState<InterviewMode>('fit')
  const [persona, setPersona] = useState<InterviewPersona>('associate')
  const [session, setSession] = useState<MockSession | null>(null)
  const [answer, setAnswer] = useState('')
  const [answerIndex, setAnswerIndex] = useState(0)
  const [listening, setListening] = useState(false)
  const [voiceNote, setVoiceNote] = useState('')
  const caps = useMemo(() => getVoiceCapabilities(), [])
  const recognizerRef = useRef<ReturnType<typeof createRecognizer> | null>(
    null,
  )

  useEffect(() => {
    recognizerRef.current = createRecognizer({
      onResult: (transcript, isFinal) => {
        if (isFinal) setAnswer((prev) => (prev ? `${prev} ${transcript}` : transcript))
        else setVoiceNote(transcript)
      },
      onError: (message) => setVoiceNote(message),
      onEnd: () => setListening(false),
    })
  }, [])

  const start = () => {
    const next = createSession(mode, persona)
    setSession(next)
    setAnswer('')
    setAnswerIndex(0)
    setVoiceNote('')
    const first = next.turns.find((t) => t.role === 'interviewer')
    if (autoVoice && first) speak(first.text)
  }

  const submitAnswer = () => {
    if (!session || !answer.trim()) return
    const next = appendAnswer(session, answer.trim(), answerIndex)
    setSession(next)
    setAnswer('')
    setAnswerIndex((i) => i + 1)
    const lastInterviewer = [...next.turns]
      .reverse()
      .find((t) => t.role === 'interviewer')
    if (autoVoice && lastInterviewer) speak(lastInterviewer.text)
  }

  const finish = () => {
    if (!session) return
    const done = finalize(session)
    setSession(done)
    addSession({
      id: `mock-${Date.now()}`,
      mode: 'mock',
      dimension: MODE_DIMENSION[session.mode],
      score: done.score ?? 0,
      total: 100,
      notes: `${session.mode}/${session.persona}`,
      createdAt: new Date().toISOString(),
    })
  }

  const lastInterviewer = session
    ? [...session.turns].reverse().find((t) => t.role === 'interviewer')
    : null

  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Practice</p>
      <h1 className={page.title}>Mock interview</h1>
      <p className={page.lede}>
        Scripted sessions with feedback turns
        {caps.synthesis || caps.recognition
          ? ' · voice optional'
          : ' · voice unavailable in this browser'}
        .
      </p>

      {!session ? (
        <section className={page.section}>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="mock-mode">
              Mode
            </label>
            <select
              id="mock-mode"
              className={page.select}
              value={mode}
              onChange={(e) => setMode(e.target.value as InterviewMode)}
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className={page.field}>
            <label className={page.fieldLabel} htmlFor="mock-persona">
              Persona
            </label>
            <select
              id="mock-persona"
              className={page.select}
              value={persona}
              onChange={(e) => setPersona(e.target.value as InterviewPersona)}
            >
              {PERSONAS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className={page.primary} onClick={start}>
            Start session
          </button>
        </section>
      ) : (
        <section className={page.section}>
          <div className={page.row} style={{ marginBottom: '1rem' }}>
            <span className={page.badge}>{session.mode}</span>
            <span className={page.badge}>{session.persona}</span>
            {session.score != null && (
              <span className={page.badge}>Score {session.score}</span>
            )}
          </div>

          <div className={page.grid}>
            {session.turns.map((turn, i) => (
              <div key={`${turn.role}-${i}`} className={page.card}>
                <span className={page.badge}>{turn.role}</span>
                <p className={page.pre}>{turn.text}</p>
              </div>
            ))}
          </div>

          {session.score == null && (
            <>
              <div className={page.field} style={{ marginTop: '1rem' }}>
                <label className={page.fieldLabel} htmlFor="mock-answer">
                  Your answer
                </label>
                <textarea
                  id="mock-answer"
                  className={page.textarea}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
              {voiceNote && <p className={page.muted}>{voiceNote}</p>}
              <div className={page.row}>
                <button
                  type="button"
                  className={page.primary}
                  onClick={submitAnswer}
                >
                  Submit answer
                </button>
                {caps.recognition && (
                  <button
                    type="button"
                    className={page.secondary}
                    onClick={() => {
                      if (listening) {
                        recognizerRef.current?.stop()
                        setListening(false)
                      } else {
                        setListening(true)
                        recognizerRef.current?.start()
                      }
                    }}
                  >
                    {listening ? 'Stop listening' : 'Dictate'}
                  </button>
                )}
                {caps.synthesis && lastInterviewer && (
                  <button
                    type="button"
                    className={page.secondary}
                    onClick={() => speak(lastInterviewer.text)}
                  >
                    Speak last prompt
                  </button>
                )}
                <button type="button" className={page.secondary} onClick={finish}>
                  Finalize
                </button>
              </div>
            </>
          )}

          {session.score != null && (
            <div className={page.row} style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className={page.primary}
                onClick={() => setSession(null)}
              >
                New session
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
