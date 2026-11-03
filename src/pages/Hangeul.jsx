import { useState } from 'react'
import content from '../data'
import { PageHeader, Segmented, SpeakButton } from '../components/ui'

const tabs = [
  { id: 'consonants', label: 'Consonants' },
  { id: 'doubleConsonants', label: 'Double consonants' },
  { id: 'vowels', label: 'Vowels' },
  { id: 'compoundVowels', label: 'Compound vowels' },
]

export default function Hangeul() {
  const [tab, setTab] = useState('consonants')
  const letters = content.hangeul[tab]

  return (
    <>
      <PageHeader kr="한글" title="Hangeul" subtitle="The Korean alphabet is built from a small set of letters. Tap a letter to hear it." />
      <Segmented label="Letter sets" options={tabs} value={tab} onChange={setTab} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {letters.map((l) => (
          <div key={l.char} className="card card-hover relative flex flex-col items-center px-4 py-7">
            <SpeakButton text={l.char} className="absolute right-2 top-2" />
            <span className="kr text-6xl font-bold">{l.char}</span>
            <span className="mt-3 rounded-full bg-brand-50 px-3 py-0.5 text-sm font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-200">{l.rom}</span>
          </div>
        ))}
      </div>
    </>
  )
}
