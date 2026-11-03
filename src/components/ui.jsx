import { Link } from 'react-router-dom'
import { Volume2 } from 'lucide-react'
import { speak, canSpeak } from '../lib/speak'

export function PageHeader({ title, kr, subtitle, action }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {kr && <p className="kr mb-1 text-sm font-bold tracking-wide text-brand-600 dark:text-brand-400">{kr}</p>}
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
        {subtitle && <p className="muted mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}

export function Segmented({ options, value, onChange, label }) {
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar mb-6 inline-flex max-w-full gap-1 overflow-x-auto rounded-xl p-1" style={{ background: 'var(--surface-2)' }}>
      {options.map((o) => (
        <button
          key={o.id}
          role="tab"
          aria-selected={value === o.id}
          onClick={() => onChange(o.id)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
            value === o.id ? 'bg-brand-600 text-white shadow' : 'muted hover:text-[color:var(--ink)]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function SpeakButton({ text, className = '' }) {
  if (!canSpeak) return null
  return (
    <button
      type="button"
      aria-label={`Pronounce ${text}`}
      title="Listen"
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-200 ${className}`}
    >
      <Volume2 size={16} />
    </button>
  )
}

export function QuizCta({ to, children = 'Take the quiz' }) {
  return (
    <Link to={to} className="btn btn-primary">
      {children}
    </Link>
  )
}

export function SectionTitle({ children }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-xl font-bold">
      <span className="h-6 w-1.5 rounded-full bg-brand-500" />
      {children}
    </h2>
  )
}
