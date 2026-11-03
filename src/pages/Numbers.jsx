import { useState } from 'react'
import content from '../data'
import { speak } from '../lib/speak'
import { PageHeader, Segmented, SectionTitle } from '../components/ui'

const systems = [
  { id: 'sino', label: 'Sino-Korean' },
  { id: 'native', label: 'Native Korean' },
]

const value = (i) => (i < 15 ? i + 1 : i < 23 ? (i - 13) * 10 : i === 23 ? 100 : 1000)

function usageSplit(s) {
  const m = s.match(/^(.*?)\s*\((.*)\)$/)
  return m ? { a: m[1], b: m[2] } : { a: s, b: '' }
}

export default function Numbers() {
  const [sys, setSys] = useState('sino')
  const { numbers } = content
  const list = numbers[sys]

  return (
    <>
      <PageHeader kr="숫자" title="Numbers" subtitle="Korean has two number systems. Learn which one to use for prices, time, age and counting things." />

      <section className="mb-12">
        <Segmented label="Number system" options={systems} value={sys} onChange={setSys} />
        <p className="muted -mt-2 mb-5 text-sm">
          {sys === 'sino'
            ? 'Used for phone numbers, prices, dates, minutes and addresses.'
            : 'Used for counting things, hours, and age. ' + numbers.nativeNote}
        </p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {list.map((w, i) => (
            <button key={w + i} onClick={() => speak(w)} className="card card-hover px-2 py-4 text-center" aria-label={`${value(i)}, ${w}`}>
              <div className="faint text-sm font-bold">{value(i).toLocaleString()}</div>
              <div className="kr mt-1 text-xl font-bold text-brand-700 dark:text-brand-200">{w}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Which system, when?</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {numbers.usage.map((u) => (
            <div key={u.category} className="card p-5">
              <h3 className="mb-3 font-bold text-brand-700 dark:text-brand-200">{u.category}</h3>
              <ul className="space-y-2">
                {u.examples.map((e) => {
                  const { a, b } = usageSplit(e)
                  return (
                    <li key={e} className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm" style={{ background: 'var(--surface-2)' }}>
                      <span className="font-semibold">{a}</span>
                      <span className="kr muted text-right">{b}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Counters</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.counters.map((c) => {
            const [name, kr] = c.category.split(' - ')
            return (
              <div key={c.category} className="card p-5">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="font-bold">{name}</h3>
                  <span className="kr text-2xl font-black text-brand-600 dark:text-brand-300">{kr}</span>
                </div>
                <ul className="muted space-y-1.5 text-sm">
                  {c.examples.map((e) => <li key={e}>{e}</li>)}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
