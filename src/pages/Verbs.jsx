import { useMemo, useState } from 'react'
import { Search, LayoutGrid, Table2, RotateCw } from 'lucide-react'
import content from '../data'
import { PageHeader, QuizCta, SpeakButton } from '../components/ui'

const forms = [
  ['Present', 'present'],
  ['Past', 'past'],
  ['Future', 'future'],
]

function VerbCard({ verb }) {
  const [flipped, setFlipped] = useState(false)
  const sizeClass = verb.korean.length > 4 ? 'text-3xl' : 'text-4xl'

  return (
    <div className="flip-scene h-64">
      <div className={`flip-inner ${flipped ? 'flipped' : ''}`}>
        <button
          onClick={() => setFlipped(true)}
          aria-label={`${verb.korean}. Show meaning and conjugations`}
          aria-hidden={flipped}
          tabIndex={flipped ? -1 : 0}
          className="flip-face card card-hover flex flex-col items-center justify-center p-4"
        >
          <span className="faint absolute left-4 top-3 text-xs font-bold">#{verb.id}</span>
          <span className={`kr font-black ${sizeClass}`}>{verb.korean}</span>
          <span className="faint mt-6 inline-flex items-center gap-1.5 text-xs font-semibold">
            <RotateCw size={13} /> Tap to flip
          </span>
        </button>
        <div
          onClick={() => setFlipped(false)}
          role="button"
          tabIndex={flipped ? 0 : -1}
          aria-hidden={!flipped}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFlipped(false)}
          className="flip-face flip-back card flex cursor-pointer flex-col justify-center gap-3 p-5"
          style={{ background: 'color-mix(in srgb, var(--color-brand-500) 8%, var(--surface))' }}
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="faint text-[11px] font-bold uppercase tracking-widest">Meaning</p>
              <p className="text-lg font-extrabold leading-tight">{verb.definition}</p>
            </div>
            <SpeakButton text={verb.korean} />
          </div>
          <dl className="space-y-1.5 text-sm">
            {forms.map(([label, key]) => (
              <div key={key} className="flex justify-between gap-2 rounded-lg px-3 py-1.5" style={{ background: 'var(--surface)' }}>
                <dt className="muted">{label}</dt>
                <dd className="kr font-bold text-brand-700 dark:text-brand-200">{verb.conjugations[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default function Verbs() {
  const [view, setView] = useState('cards')
  const [q, setQ] = useState('')

  const verbs = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? content.verbs.filter((v) => v.korean.includes(s) || v.definition.toLowerCase().includes(s)) : content.verbs
  }, [q])

  return (
    <>
      <PageHeader kr="동사" title="Verbs" subtitle="50 essential verbs and adjectives. Flip the cards to practise, or switch to the table for a quick reference." action={<QuizCta to="/quiz/verbs" />} />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search verbs</span>
          <Search size={18} className="faint absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by Korean or English…"
            className="w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500"
            style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
          />
        </label>
        <div className="inline-flex gap-1 rounded-xl p-1" style={{ background: 'var(--surface-2)' }}>
          {[{ id: 'cards', label: 'Cards', icon: LayoutGrid }, { id: 'table', label: 'Table', icon: Table2 }].map((v) => (
            <button key={v.id} onClick={() => setView(v.id)} aria-pressed={view === v.id} className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${view === v.id ? 'bg-brand-600 text-white shadow' : 'muted'}`}>
              <v.icon size={16} /> {v.label}
            </button>
          ))}
        </div>
      </div>

      {verbs.length === 0 ? (
        <p className="muted card p-8 text-center">No verbs match “{q}”.</p>
      ) : view === 'cards' ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {verbs.map((v) => <VerbCard key={v.id} verb={v} />)}
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="faint text-xs uppercase tracking-wider" style={{ background: 'var(--surface-2)' }}>
                {['Verb', 'Meaning', 'Present', 'Past', 'Future'].map((h) => <th key={h} scope="col" className="px-4 py-3 font-bold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {verbs.map((v) => (
                <tr key={v.id} className="border-t" style={{ borderColor: 'var(--line)' }}>
                  <td className="kr px-4 py-3 text-base font-bold">{v.korean}</td>
                  <td className="muted px-4 py-3">{v.definition}</td>
                  <td className="kr px-4 py-3 font-semibold text-brand-700 dark:text-brand-200">{v.conjugations.present}</td>
                  <td className="kr px-4 py-3 font-semibold text-brand-700 dark:text-brand-200">{v.conjugations.past}</td>
                  <td className="kr px-4 py-3 font-semibold text-brand-700 dark:text-brand-200">{v.conjugations.future}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
