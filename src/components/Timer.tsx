import { useEffect, useState } from 'react'
import styles from './Timer.module.css'

type TimerProps = {
  running: boolean
}

export function Timer({ running }: TimerProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)
    return () => window.clearInterval(id)
  }, [running])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60

  return (
    <div className={styles.timer} aria-live="polite">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  )
}
