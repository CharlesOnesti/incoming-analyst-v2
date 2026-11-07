import { Link } from 'react-router-dom'
import page from '../components/Page.module.css'
import { HEADHUNTERS } from '../lib/recruiting'

export function Headhunters() {
  return (
    <main className={`${page.page} ${page.wide}`}>
      <Link to="/" className={page.back}>
        ← Home
      </Link>
      <p className={page.kicker}>Recruit</p>
      <h1 className={page.title}>Headhunters</h1>
      <p className={page.lede}>
        Recruiters mapped to PE mandates, coverage lists, and prep tips.
      </p>

      <div className={page.grid2}>
        {HEADHUNTERS.map((hh) => (
          <article key={hh.id} className={page.card}>
            <span className={page.cardLabel}>
              {hh.name} · {hh.firm}
            </span>
            <p className={page.cardBlurb}>{hh.mandates}</p>
            <p className={page.muted}>
              Covers: {hh.covers.join(', ')}
            </p>
            <h3 className={page.sectionTitle}>Prep tips</h3>
            <ul className={page.list}>
              {hh.prepTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  )
}
