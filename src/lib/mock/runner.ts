import { analyzeAnswer } from './feedback'
import {
  getScriptNode,
  personaPreface,
  scriptsForMode,
} from './scripts'
import type { InterviewMode, InterviewPersona, MockSession, MockTurn } from './types'

function newId(): string {
  return `mock-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function createSession(
  mode: InterviewMode,
  persona: InterviewPersona,
): MockSession {
  const first = getScriptNode(mode, 0)
  const turns: MockTurn[] = []
  if (first) {
    turns.push({
      role: 'interviewer',
      text: `${personaPreface(first, persona)}\n\n${first.question}`,
    })
  }
  return {
    id: newId(),
    mode,
    persona,
    turns,
    createdAt: new Date().toISOString(),
  }
}

/** Returns the interviewer prompt for the question at answerIndex (0-based). */
export function nextQuestion(
  session: MockSession,
  answerIndex: number,
): string | null {
  const node = getScriptNode(session.mode, answerIndex)
  if (!node) return null
  return `${personaPreface(node, session.persona)}\n\n${node.question}`
}

export function appendAnswer(
  session: MockSession,
  answer: string,
  questionIndex: number,
): MockSession {
  const node = getScriptNode(session.mode, questionIndex)
  const turns: MockTurn[] = [
    ...session.turns,
    { role: 'candidate', text: answer },
  ]

  if (node) {
    const analysis = analyzeAnswer(answer, node.rubric)
    turns.push({
      role: 'feedback',
      text: `Score ${analysis.score}/100\n${analysis.notes.map((n) => `• ${n}`).join('\n')}`,
    })

    const followUp = node.followUps[0]
    const next = getScriptNode(session.mode, questionIndex + 1)
    if (followUp && !next) {
      turns.push({
        role: 'interviewer',
        text: followUp,
      })
    } else if (next) {
      turns.push({
        role: 'interviewer',
        text: `${personaPreface(next, session.persona)}\n\n${next.question}`,
      })
    }
  }

  return { ...session, turns }
}

export function finalize(session: MockSession): MockSession {
  const feedbackTurns = session.turns.filter((t) => t.role === 'feedback')
  const scores = feedbackTurns.map((t) => {
    const match = t.text.match(/Score\s+(\d+)/i)
    return match ? Number(match[1]) : 0
  })
  const score =
    scores.length === 0
      ? 0
      : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

  const summary: MockTurn = {
    role: 'feedback',
    text: `Session complete (${scriptsForMode(session.mode).length} prompts). Overall score: ${score}/100.`,
  }

  return {
    ...session,
    score,
    turns: [...session.turns, summary],
  }
}
