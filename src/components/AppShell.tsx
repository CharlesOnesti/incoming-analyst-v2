import { Link, NavLink, Outlet } from 'react-router-dom'
import styles from './AppShell.module.css'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/curriculum', label: 'Learn' },
  { to: '/mock', label: 'Mock' },
  { to: '/coach', label: 'Coach' },
  { to: '/settings', label: 'Settings' },
]

export function AppShell() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          Incoming Analyst
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? styles.navActive : styles.navLink
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
