import { useState } from 'react'
import content from '../data'
import { PageHeader, Segmented, SectionTitle, QuizCta, SpeakButton } from '../components/ui'
import { splitBilingual } from '../lib/text'

const tabs = [
  { id: 'directions', label: 'Directions' },
  { id: 'time', label: 'Days & time' },
]

function Tile({ en, kr }) {
  return (
    <div className="card card-hover relative flex min-h-24 flex-col items-center justify-center gap-1 p-3 text-center">
      <SpeakButton text={kr} className="absolute right-1.5 top-1.5 !h-7 !w-7" />
      <span className="kr text-xl font-bold text-brand-700 dark:text-brand-200">{kr}</span>
      <span className="muted text-sm">{en}</span>
    </div>
  )
}

function Group({ title, items, cols }) {
  return (
    <section className="mb-10">
      <SectionTitle>{title}</SectionTitle>
      <div className={`grid gap-3 ${cols}`}>
        {items.map((s) => {
          const { en, kr } = splitBilingual(s)
          return <Tile key={s} en={en} kr={kr} />
        })}
      </div>
    </section>
  )
}

export default function Directions() {
  const [tab, setTab] = useState('directions')
  const d = content.directions

  return (
    <>
      <PageHeader kr="방향과 시간" title="Directions & Time" subtitle="Describe where things are and talk about days, hours and dates." action={<QuizCta to="/quiz/directions" />} />
      <Segmented label="Topic" options={tabs} value={tab} onChange={setTab} />

      {tab === 'directions' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {d.spatial.map((s) => <Tile key={s.kor} en={s.term} kr={s.kor} />)}
        </div>
      ) : (
        <>
          <Group title="Days of the week" items={d.timeDays} cols="grid-cols-2 sm:grid-cols-4 lg:grid-cols-7" />
          <Group title="Times of day" items={d.timePeriods} cols="grid-cols-2 sm:grid-cols-3 md:grid-cols-5" />
          <Group title="Relative time" items={d.timeRelative} cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" />
        </>
      )}
    </>
  )
}
