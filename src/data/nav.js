import { Home, Type, Hash, Compass, Layers, BookOpen, ListChecks, MessageSquare, Trophy } from 'lucide-react'

export const navGroups = [
  { label: 'Start', items: [{ path: '/', label: 'Dashboard', icon: Home }] },
  {
    label: 'Foundations',
    items: [
      { path: '/hangeul', label: 'Hangeul', icon: Type, kr: '한글', blurb: 'Consonants and vowels of the Korean alphabet.', count: 4, unit: 'sets', color: 'indigo' },
      { path: '/numbers', label: 'Numbers', icon: Hash, kr: '숫자', blurb: 'Sino-Korean and native numbers, plus counters.', count: 2, unit: 'systems', color: 'emerald' },
      { path: '/directions', label: 'Directions & Time', icon: Compass, kr: '방향', blurb: 'Places, days of the week and time expressions.', count: 3, unit: 'topics', color: 'amber' },
    ],
  },
  {
    label: 'Language',
    items: [
      { path: '/verbs', label: 'Verbs', icon: Layers, kr: '동사', blurb: '50 essential verbs and adjectives with conjugations.', count: 50, unit: 'verbs', color: 'rose' },
      { path: '/grammar/1a', label: 'Grammar 1A', icon: BookOpen, kr: '문법', blurb: 'Particles and basic sentence structures.', count: 13, unit: 'points', color: 'cyan' },
      { path: '/grammar/1b', label: 'Grammar 1B', icon: BookOpen, kr: '문법', blurb: 'Connectors, future tense, ability and honorifics.', count: 19, unit: 'points', color: 'teal' },
      { path: '/vocabulary', label: 'Vocabulary', icon: ListChecks, kr: '어휘', blurb: 'Everyday words, grouped by topic and searchable.', count: 10, unit: 'topics', color: 'violet' },
    ],
  },
  {
    label: 'Practice',
    items: [
      { path: '/conversations', label: 'Conversations', icon: MessageSquare, kr: '회화', blurb: 'Listen to real-life dialogues and answer questions.', count: 5, unit: 'dialogues', color: 'indigo' },
      { path: '/quiz', label: 'Quizzes', icon: Trophy, kr: '퀴즈', blurb: 'Topic quizzes and two comprehensive final tests.', count: 7, unit: 'quizzes', color: 'rose' },
    ],
  },
]

export const flatNav = navGroups.flatMap((g) => g.items)

export const quizMeta = {
  directions: { title: 'Directions & Time', lesson: '/directions', questions: 10 },
  verbs: { title: 'Verbs', lesson: '/verbs', questions: 10 },
  grammar1a: { title: 'Grammar 1A', lesson: '/grammar/1a', questions: 10 },
  grammar1b: { title: 'Grammar 1B', lesson: '/grammar/1b', questions: 10 },
  vocabulary: { title: 'Vocabulary', lesson: '/vocabulary', questions: 10 },
  finalQuiz1: { title: 'Final Quiz 1', lesson: null, questions: 30, final: true },
  finalQuiz2: { title: 'Final Quiz 2', lesson: null, questions: 30, final: true },
}

export const colorMap = {
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
}
