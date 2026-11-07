export type VoiceCapabilities = {
  recognition: boolean
  synthesis: boolean
}

export type RecognizerHandlers = {
  onResult?: (transcript: string, isFinal: boolean) => void
  onError?: (message: string) => void
  onEnd?: () => void
}

export type VoiceRecognizer = {
  start: () => void
  stop: () => void
  available: boolean
}

type SpeechRecognitionLike = {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: { error?: string }) => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionEventLike = {
  resultIndex: number
  results: ArrayLike<{
    isFinal: boolean
    0: { transcript: string }
  }>
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === 'undefined') return null
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor
    webkitSpeechRecognition?: SpeechRecognitionCtor
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function getVoiceCapabilities(): VoiceCapabilities {
  const recognition = getRecognitionCtor() != null
  const synthesis =
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined'
  return { recognition, synthesis }
}

export function speak(text: string): boolean {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return false
  }
  const utter = new SpeechSynthesisUtterance(text)
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
  return true
}

export function createRecognizer(
  handlers: RecognizerHandlers = {},
): VoiceRecognizer {
  const Ctor = getRecognitionCtor()
  if (!Ctor) {
    return {
      available: false,
      start: () => {
        handlers.onError?.('Speech recognition is unavailable in this browser.')
      },
      stop: () => undefined,
    }
  }

  const recognition = new Ctor()
  recognition.continuous = false
  recognition.interimResults = true
  recognition.lang = 'en-US'

  recognition.onresult = (event) => {
    let transcript = ''
    let isFinal = false
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i]
      transcript += result[0].transcript
      isFinal = result.isFinal
    }
    handlers.onResult?.(transcript.trim(), isFinal)
  }

  recognition.onerror = (event) => {
    handlers.onError?.(event.error ?? 'recognition-error')
  }

  recognition.onend = () => {
    handlers.onEnd?.()
  }

  return {
    available: true,
    start: () => {
      try {
        recognition.start()
      } catch (err) {
        handlers.onError?.(
          err instanceof Error ? err.message : 'Failed to start recognition',
        )
      }
    },
    stop: () => {
      try {
        recognition.stop()
      } catch {
        // already stopped
      }
    },
  }
}
