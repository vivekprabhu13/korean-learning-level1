import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { navGroups } from '../data/nav'
import { markVisited, useProgress } from '../lib/progress'

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('lk-theme', next ? 'dark' : 'light')
    } catch {
      /* ignore */
    }
  }
  return [dark, toggle]
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="kr flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-xl font-black text-white shadow-lg shadow-brand-600/30">가</span>
      <span>
        <span className="block text-lg font-extrabold leading-tight tracking-tight">Learn Korean</span>
        <span className="faint block text-[11px] font-semibold uppercase tracking-widest">Level 1 study guide</span>
      </span>
    </Link>
  )
}

function NavList({ onNavigate }) {
  const { visited } = useProgress()
  return (
    <nav aria-label="Main" className="space-y-6">
      {navGroups.map((g) => (
        <div key={g.label}>
          <p className="faint mb-2 px-3 text-[11px] font-bold uppercase tracking-widest">{g.label}</p>
          <ul className="space-y-0.5">
            {g.items.map((it) => (
              <li key={it.path}>
                <NavLink
                  to={it.path}
                  end={it.path === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-200'
                        : 'muted hover:bg-[color:var(--surface-2)] hover:text-[color:var(--ink)]'
                    }`
                  }
                >
                  <it.icon size={18} />
                  <span className="flex-1">{it.label}</span>
                  {visited[it.path] && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Visited" />}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [dark, toggleTheme] = useTheme()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    markVisited(pathname.startsWith('/quiz') ? '/quiz' : pathname)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const themeBtn = (
    <button onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} className="btn btn-ghost !p-2.5">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )

  return (
    <div className="min-h-screen lg:flex">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r lg:flex" style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}>
        <div className="p-6 pb-4"><Brand /></div>
        <div className="flex-1 overflow-y-auto px-3 pb-6"><NavList /></div>
        <div className="flex items-center justify-between border-t p-4" style={{ borderColor: 'var(--line)' }}>
          <span className="faint text-xs">Progress saves on this device</span>
          {themeBtn}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 backdrop-blur lg:hidden" style={{ background: 'color-mix(in srgb, var(--surface) 90%, transparent)', borderColor: 'var(--line)' }}>
          <Brand />
          <div className="flex gap-2">
            {themeBtn}
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="btn btn-ghost !p-2.5"><Menu size={18} /></button>
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto p-4 shadow-2xl" style={{ background: 'var(--surface)' }}>
              <div className="mb-4 flex justify-end">
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="btn btn-ghost !p-2.5"><X size={18} /></button>
              </div>
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main id="main" className="mx-auto w-full max-w-5xl animate-rise px-4 py-8 md:px-8 md:py-12">
          <Outlet />
        </main>
        <footer className="faint px-4 pb-10 text-center text-xs">화이팅! Keep going, a little every day.</footer>
      </div>
    </div>
  )
}
