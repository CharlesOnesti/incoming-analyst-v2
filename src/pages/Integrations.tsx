import { useState } from 'react'
import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import {
  connectMock,
  disconnect,
  listIntegrations,
  type IntegrationStatus,
} from '../lib/recruiting'

export function Integrations() {
  const [items, setItems] = useState<IntegrationStatus[]>(() =>
    listIntegrations(),
  )

  return (
    <main className={page.page}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Recruit</p>
      <h1 className={page.title}>Integrations</h1>
      <p className={page.lede}>
        Mock connectors for email, docs, calendar, and tracker sync.
      </p>

      <div className={page.grid}>
        {items.map((item) => (
          <article key={item.id} className={page.card}>
            <span className={page.row}>
              <span className={page.cardLabel}>{item.id}</span>
              <span className={page.badge}>{item.mode}</span>
            </span>
            <p className={page.cardBlurb}>
              {item.connected ? 'Connected' : 'Disconnected'}
            </p>
            <div className={page.row} style={{ marginTop: '0.5rem' }}>
              {!item.connected ? (
                <button
                  type="button"
                  className={page.primary}
                  onClick={() => setItems(connectMock(item.id))}
                >
                  Connect (mock)
                </button>
              ) : (
                <button
                  type="button"
                  className={page.secondary}
                  onClick={() => setItems(disconnect(item.id))}
                >
                  Disconnect
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
