import { useEffect, useRef, useState } from 'react'
import { Play, Pause, CheckCircle2, XCircle } from 'lucide-react'
import content from '../data'
import { PageHeader } from '../components/ui'

const speakerStyle = {
  'Speaker 1': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200',
  'Speaker 2': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
  'Speaker 3': 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200',
}

export default function Conversations() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showEnglish, setShowEnglish] = useState(true)
  const [picked, setPicked] = useState(null)
  const audioRef = useRef(null)
  const convo = content.conversations[index]

  const select = (i) => {
    audioRef.current?.pause()
    setIndex(i)
    setPlaying(false)
    setShowText(false)
    setPicked(null)
  }

  useEffect(() => () => audioRef.current?.pause(), [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }

  const answered = picked !== null
  const correct = picked === convo.quiz.answer

  return (
    <>
      <PageHeader kr="회화" title="Conversations" subtitle="Listen first, then reveal the script to check what you understood." />

      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Dialogues">
        {content.conversations.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === index}
            onClick={() => select(i)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
              i === index ? 'border-brand-600 bg-brand-600 text-white' : 'muted hover:border-brand-400'
            }`}
            style={i === index ? undefined : { background: 'var(--surface)', borderColor: 'var(--line)' }}
          >
            {i + 1}. {c.title}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex flex-col items-center gap-5 bg-gradient-to-br from-brand-600 to-violet-600 px-6 py-10 text-center text-white">
          <h2 className="text-2xl font-extrabold md:text-3xl">{convo.title}</h2>
          <button onClick={toggle} className="btn bg-white !px-7 !py-3.5 !text-base !text-brand-700 shadow-xl hover:scale-105" aria-label={playing ? 'Pause audio' : 'Play audio'}>
            {playing ? <Pause size={20} /> : <Play size={20} />}
            {playing ? 'Pause' : 'Listen'}
          </button>
          <audio
            key={convo.id}
            ref={audioRef}
            src={convo.audio}
            preload="none"
            controls
            className="w-full max-w-md opacity-95"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
        </div>

        <div className="space-y-8 p-6 md:p-8">
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <button onClick={() => setShowText((v) => !v)} className="btn btn-ghost" aria-expanded={showText}>
                {showText ? 'Hide script' : 'Show script'}
              </button>
              {showText && (
                <label className="muted flex cursor-pointer items-center gap-2 text-sm font-medium">
                  <input type="checkbox" checked={showEnglish} onChange={(e) => setShowEnglish(e.target.checked)} className="h-4 w-4 accent-[#4f46e5]" />
                  Show English
                </label>
              )}
            </div>

            {showText && (
              <ol className="space-y-4">
                {convo.dialogue.map((line, i) => {
                  const right = line.speaker === 'Speaker 2'
                  return (
                    <li key={i} className={`flex gap-3 ${right ? 'flex-row-reverse' : ''}`}>
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${speakerStyle[line.speaker]}`} title={line.speaker}>
                        {line.speaker.replace('Speaker ', 'S')}
                      </span>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${right ? 'rounded-tr-sm' : 'rounded-tl-sm'}`} style={{ background: 'var(--surface-2)' }}>
                        <p className="kr font-semibold leading-relaxed">{line.kor}</p>
                        {showEnglish && <p className="muted mt-1 text-sm">{line.eng}</p>}
                      </div>
                    </li>
                  )
                })}
              </ol>
            )}
          </div>

          <div className="border-t pt-8" style={{ borderColor: 'var(--line)' }}>
            <p className="faint mb-1 text-xs font-bold uppercase tracking-widest">Listening check · 리스닝 퀴즈</p>
            <h3 className="kr mb-5 text-xl font-bold">{convo.quiz.question}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {convo.quiz.options.map((o) => {
                const isAnswer = o === convo.quiz.answer
                const isPicked = o === picked
                let cls = 'hover:border-brand-400'
                if (answered && isAnswer) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/15'
                else if (answered && isPicked) cls = 'border-rose-500 bg-rose-50 dark:bg-rose-500/15'
                else if (answered) cls = 'opacity-50'
                return (
                  <button key={o} disabled={answered && correct} onClick={() => setPicked(o)} className={`kr rounded-xl border-2 px-4 py-3.5 text-left font-semibold transition ${cls}`} style={{ borderColor: answered && (isAnswer || isPicked) ? undefined : 'var(--line)', background: answered && (isAnswer || isPicked) ? undefined : 'var(--surface)' }}>
                    {o}
                  </button>
                )
              })}
            </div>
            {answered && (
              <p role="status" className={`mt-5 flex items-center gap-2 font-semibold ${correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                {correct ? '정답입니다! Correct.' : '틀렸어요. Listen again and try another answer.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
