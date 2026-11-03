import { Link } from 'react-router-dom'
import { ArrowRight, Play, RotateCcw, Trophy } from 'lucide-react'
import { navGroups, flatNav, colorMap, quizMeta } from '../data/nav'
import { useProgress, resetProgress } from '../lib/progress'

const lessons = navGroups.flatMap((g) => g.items).filter((i) => i.blurb)

export default function Dashboard() {
  const { visited, scores, last } = useProgress()
  const done = lessons.filter((l) => visited[l.path]).length
  const pct = Math.round((done / lessons.length) * 100)
  const quizKeys = Object.keys(quizMeta)
  const quizzesTaken = quizKeys.filter((k) => scores[k]).length
  const lastItem = flatNav.find((i) => i.path === last && i.path !== '/')
  const next = lastItem || lessons.find((l) => !visited[l.path]) || lessons[0]
  const started = done > 0

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-violet-600 p-8 text-white shadow-xl shadow-brand-600/20 md:p-12">
        <span aria-hidden className="kr pointer-events-none absolute -right-4 -top-10 select-none text-[14rem] font-black leading-none text-white/10">한</span>
        <div className="relative max-w-xl">
          <p className="kr mb-3 text-sm font-bold tracking-widest text-brand-100">안녕하세요!</p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">Learn Korean, one step at a time.</h1>
          <p className="mt-4 text-lg text-brand-100">
            A complete Level 1 course: alphabet, numbers, verbs, grammar, vocabulary and real conversations, with quizzes to check your progress.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={next.path} className="btn bg-white !text-brand-700 shadow-lg hover:-translate-y-0.5">
              <Play size={18} />
              {started ? `Continue: ${next.label}` : 'Start learning'}
            </Link>
            <Link to="/quiz" className="btn border border-white/30 text-white hover:bg-white/10">
              <Trophy size={18} /> Test yourself
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Your progress" className="grid gap-4 sm:grid-cols-3">
        <div className="card p-5 sm:col-span-1">
          <p className="faint text-xs font-bold uppercase tracking-widest">Lessons explored</p>
          <p className="mt-2 text-3xl font-extrabold">{done}<span className="faint text-lg font-semibold"> / {lessons.length}</span></p>
          <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: 'var(--surface-2)' }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Lessons explored">
            <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="card p-5">
          <p className="faint text-xs font-bold uppercase tracking-widest">Quizzes taken</p>
          <p className="mt-2 text-3xl font-extrabold">{quizzesTaken}<span className="faint text-lg font-semibold"> / {quizKeys.length}</span></p>
          <p className="muted mt-3 text-sm">Retake any quiz to beat your best.</p>
        </div>
        <div className="card flex flex-col justify-between p-5">
          <div>
            <p className="faint text-xs font-bold uppercase tracking-widest">Best final score</p>
            <p className="mt-2 text-3xl font-extrabold">
              {['finalQuiz1', 'finalQuiz2'].some((k) => scores[k])
                ? Math.max(...['finalQuiz1', 'finalQuiz2'].map((k) => scores[k]?.best ?? 0))
                : '—'}
              <span className="faint text-lg font-semibold"> / 30</span>
            </p>
          </div>
          {started && (
            <button onClick={() => window.confirm('Reset all saved progress?') && resetProgress()} className="faint mt-3 inline-flex items-center gap-1.5 self-start text-xs font-semibold hover:text-[color:var(--ink)]">
              <RotateCcw size={13} /> Reset progress
            </button>
          )}
        </div>
      </section>

      {navGroups.slice(1).map((g) => (
        <section key={g.label}>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest faint">{g.label}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((it) => (
              <Link key={it.path} to={it.path} className="card card-hover group flex flex-col p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[it.color]}`}>
                    <it.icon size={22} />
                  </span>
                  <span className="kr text-lg font-bold faint">{it.kr}</span>
                </div>
                <h3 className="text-lg font-bold">{it.label}</h3>
                <p className="muted mt-1 flex-1 text-sm">{it.blurb}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="faint font-medium">{it.count} {it.unit}</span>
                  <span className="flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-300">
                    {visited[it.path] ? 'Review' : 'Start'} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
