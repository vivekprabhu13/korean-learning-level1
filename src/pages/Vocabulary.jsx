import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import content from '../data'
import { PageHeader, SectionTitle, QuizCta, SpeakButton } from '../components/ui'
import { splitBilingual } from '../lib/text'

const titleOf = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())

export default function Vocabulary() {
  const [q, setQ] = useState('')

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase()
    return Object.entries(content.vocabulary)
      .map(([key, words]) => ({ key, words: words.filter((w) => !s || w.toLowerCase().includes(s)) }))
      .filter((g) => g.words.length)
  }, [q])

  return (
    <>
      <PageHeader kr="어휘" title="Vocabulary" subtitle="Everyday words grouped by topic. Search in English or Korean." action={<QuizCta to="/quiz/vocabulary" />} />

      <label className="relative mb-8 block max-w-md">
        <span className="sr-only">Search vocabulary</span>
        <Search size={18} className="faint absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search words…"
          className="w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500"
          style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
        />
      </label>

      {groups.length === 0 && <p className="muted card p-8 text-center">No words match “{q}”.</p>}

      {groups.map((g) => (
        <section key={g.key} className="mb-10">
          <SectionTitle>{titleOf(g.key)}</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.words.map((w) => {
              const { en, kr } = splitBilingual(w)
              return (
                <div key={w} className="card card-hover flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="kr truncate text-lg font-bold text-brand-700 dark:text-brand-200">{kr || en}</p>
                    {kr && <p className="muted text-sm">{en}</p>}
                  </div>
                  <SpeakButton text={kr || en} />
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
