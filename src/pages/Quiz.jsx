import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, X, RotateCcw, Trophy, BookOpen } from 'lucide-react'
import content from '../data'
import { quizMeta } from '../data/nav'
import { saveScore, useProgress } from '../lib/progress'
import { PageHeader } from './../components/ui'

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function QuizHub() {
  const { scores } = useProgress()
  const entries = Object.entries(quizMeta)

  const card = ([key, m]) => {
    const s = scores[key]
    return (
      <Link key={key} to={`/quiz/${key}`} className="card card-hover flex items-center justify-between gap-4 p-5">
        <div>
          <h3 className="font-bold">{m.title}</h3>
          <p className="muted text-sm">{m.questions} questions</p>
        </div>
        {s ? (
          <span className="chip !bg-emerald-100 !text-emerald-700 dark:!bg-emerald-500/15 dark:!text-emerald-300">Best {s.best}/{s.total}</span>
        ) : (
          <span className="chip">Not taken</span>
        )}
      </Link>
    )
  }

  return (
    <>
      <PageHeader kr="퀴즈" title="Quizzes" subtitle="Check what you have learned. Questions and answer order are shuffled every time." />
      <h2 className="faint mb-3 text-sm font-bold uppercase tracking-widest">Topic quizzes</h2>
      <div className="mb-10 grid gap-4 sm:grid-cols-2">{entries.filter(([, m]) => !m.final).map(card)}</div>
      <h2 className="faint mb-3 text-sm font-bold uppercase tracking-widest">Final tests</h2>
      <div className="grid gap-4 sm:grid-cols-2">{entries.filter(([, m]) => m.final).map(card)}</div>
    </>
  )
}

function Run({ id, onRestart }) {
  const meta = quizMeta[id]
  const questions = useMemo(
    () => shuffle(content.quizzes[id]).map((q) => ({ ...q, options: shuffle(q.options) })),
    [id],
  )
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)

  const q = questions[i]
  const score = answers.filter((a) => a.correct).length

  const choose = (opt) => {
    if (picked !== null) return
    setPicked(opt)
    setAnswers((a) => [...a, { q, picked: opt, correct: opt === q.answer }])
  }

  const next = () => {
    if (i < questions.length - 1) {
      setI(i + 1)
      setPicked(null)
    } else {
      saveScore(id, score, questions.length)
      setDone(true)
    }
  }

  useEffect(() => {
    if (done) return
    const onKey = (e) => {
      const n = Number(e.key)
      if (n >= 1 && n <= q.options.length) choose(q.options[n - 1])
      else if ((e.key === 'Enter' || e.key === 'ArrowRight') && picked !== null) next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (done) {
    const pct = Math.round((score / questions.length) * 100)
    const wrong = answers.filter((a) => !a.correct)
    const msg = pct >= 90 ? '대단해요! Outstanding.' : pct >= 70 ? '잘했어요! Well done.' : pct >= 50 ? 'Good effort. Review and retry.' : 'Keep practising, you will get there.'
    return (
      <div className="mx-auto max-w-2xl">
        <div className="card p-8 text-center md:p-10">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-200"><Trophy size={30} /></span>
          <h2 className="text-2xl font-extrabold">{meta.title} complete</h2>
          <p className="my-4 text-6xl font-black text-brand-600 dark:text-brand-300">{score}<span className="faint text-2xl font-bold"> / {questions.length}</span></p>
          <p className="muted">{pct}% · {msg}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button onClick={onRestart} className="btn btn-primary"><RotateCcw size={16} /> Try again</button>
            {meta.lesson && <Link to={meta.lesson} className="btn btn-ghost"><BookOpen size={16} /> Review lesson</Link>}
            <Link to="/quiz" className="btn btn-ghost">All quizzes</Link>
          </div>
        </div>

        {wrong.length > 0 && (
          <section className="mt-8">
            <h3 className="mb-3 text-lg font-bold">Review your mistakes ({wrong.length})</h3>
            <ul className="space-y-3">
              {wrong.map((a) => (
                <li key={a.q.id} className="card p-4">
                  <p className="kr font-semibold">{a.q.question}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400"><X size={15} /> <span className="kr">{a.picked}</span></p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"><Check size={15} /> <span className="kr font-semibold">{a.q.answer}</span></p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex items-end justify-between text-sm">
          <span className="faint font-bold uppercase tracking-widest">{meta.title}</span>
          <span className="font-bold text-brand-600 dark:text-brand-300">{i + 1}<span className="faint font-medium"> / {questions.length}</span></span>
        </div>
        <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }} role="progressbar" aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={questions.length}>
          <div className="h-full rounded-full bg-brand-500 transition-all duration-500" style={{ width: `${((i + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="card p-6 md:p-9">
        <h2 className="kr mb-7 text-xl font-bold leading-snug md:text-2xl">{q.question}</h2>
        <div className="space-y-3" role="group" aria-label="Answer options">
          {q.options.map((o, n) => {
            const isAnswer = o === q.answer
            const isPicked = o === picked
            let state = 'idle'
            if (picked !== null) state = isAnswer ? 'right' : isPicked ? 'wrong' : 'dim'
            const cls = {
              idle: 'hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10',
              right: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15',
              wrong: 'border-rose-500 bg-rose-50 dark:bg-rose-500/15',
              dim: 'opacity-50',
            }[state]
            return (
              <button
                key={o}
                onClick={() => choose(o)}
                disabled={picked !== null}
                className={`kr flex w-full items-center gap-4 rounded-xl border-2 px-4 py-3.5 text-left font-semibold transition ${cls}`}
                style={state === 'idle' || state === 'dim' ? { borderColor: 'var(--line)' } : undefined}
              >
                <span className="faint flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-bold" style={{ borderColor: 'var(--line)' }}>{n + 1}</span>
                <span className="flex-1">{o}</span>
                {state === 'right' && <Check size={20} className="text-emerald-600" />}
                {state === 'wrong' && <X size={20} className="text-rose-600" />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="faint hidden text-xs sm:inline">Tip: press 1–{q.options.length} to answer, Enter for next</span>
        <button onClick={next} disabled={picked === null} className="btn btn-primary ml-auto disabled:cursor-not-allowed disabled:opacity-40">
          {i === questions.length - 1 ? 'See results' : 'Next'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default function Quiz() {
  const { section } = useParams()
  const [run, setRun] = useState(0)

  if (!content.quizzes[section]) {
    return (
      <div className="card mx-auto max-w-md p-8 text-center">
        <h2 className="mb-2 text-xl font-bold">Quiz not found</h2>
        <p className="muted mb-5">There is no quiz called “{section}”.</p>
        <Link to="/quiz" className="btn btn-primary">Browse quizzes</Link>
      </div>
    )
  }

  return (
    <>
      <Link to="/quiz" className="muted mb-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-brand-600"><ArrowLeft size={16} /> All quizzes</Link>
      <Run key={`${section}-${run}`} id={section} onRestart={() => setRun((r) => r + 1)} />
    </>
  )
}
