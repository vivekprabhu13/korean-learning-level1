import { Navigate, useParams } from 'react-router-dom'
import content from '../data'
import { PageHeader, SectionTitle, QuizCta } from '../components/ui'

const meta = {
  '1a': {
    title: 'Grammar 1A',
    subtitle: 'Particles and the basic sentence patterns you need from day one.',
    first: 'Essential particles',
    second: 'Common verb endings',
  },
  '1b': {
    title: 'Grammar 1B',
    subtitle: 'Connectors, future tense, ability, obligation and honorifics.',
    first: 'Connectors & particles',
    second: 'Verb patterns',
  },
}

/** Splits "한국어 sentence. (English translation)" into its two parts. */
function splitExample(str) {
  const i = str.lastIndexOf(' (')
  if (i === -1 || !str.endsWith(')')) return { kr: str, en: '' }
  return { kr: str.slice(0, i), en: str.slice(i + 2, -1) }
}

function Example({ text }) {
  const { kr, en } = splitExample(text)
  return (
    <li className="rounded-lg px-3 py-2.5" style={{ background: 'var(--surface-2)' }}>
      <p className="kr font-semibold">{kr}</p>
      {en && <p className="muted mt-0.5 text-sm">{en}</p>}
    </li>
  )
}

export default function Grammar() {
  const { level } = useParams()
  if (level !== '1a' && level !== '1b') return <Navigate to="/" replace />
  const m = meta[level]
  const points = content[`grammar${level}`]
  const patterns = content[`verbForms${level}`]

  return (
    <>
      <PageHeader kr="문법" title={m.title} subtitle={m.subtitle} action={<QuizCta to={`/quiz/grammar${level}`} />} />

      <section className="mb-12">
        <SectionTitle>{m.first}</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-2">
          {points.map((p) => (
            <article key={p.title} className="card p-5">
              <h3 className="kr text-lg font-extrabold text-brand-700 dark:text-brand-200">{p.title}</h3>
              <p className="muted mt-1 mb-4 text-sm">{p.explanation}</p>
              <ul className="space-y-2">{p.examples.map((e) => <Example key={e} text={e} />)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>{m.second}</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {patterns.map((p) => (
            <article key={p.form} className="card p-5">
              <h3 className="kr text-lg font-extrabold text-emerald-700 dark:text-emerald-300">{p.form}</h3>
              <p className="muted mt-1 mb-4 text-sm">{p.explanation}</p>
              <ul className="space-y-2">{p.examples.map((e) => <Example key={e} text={e} />)}</ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
