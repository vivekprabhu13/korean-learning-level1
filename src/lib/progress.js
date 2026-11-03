import { useSyncExternalStore } from 'react'

const KEY = 'lk-progress-v1'
const empty = { visited: {}, scores: {}, last: null }
const listeners = new Set()

function load() {
  try {
    return { ...empty, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return empty
  }
}

let state = load()

function commit(next) {
  state = next
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable: keep in memory */
  }
  listeners.forEach((l) => l())
}

export function markVisited(path) {
  if (state.visited[path] && state.last === path) return
  commit({ ...state, visited: { ...state.visited, [path]: true }, last: path })
}

export function saveScore(key, score, total) {
  const prev = state.scores[key]
  const best = prev ? Math.max(prev.best, score) : score
  commit({ ...state, scores: { ...state.scores, [key]: { best, total, last: score } } })
}

export function resetProgress() {
  commit({ ...empty })
}

export function useProgress() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => state,
  )
}
