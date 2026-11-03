export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

export function speak(text) {
  if (!canSpeak) return
  const clean = text.replace(/\(.*?\)/g, '').replace(/[~/]/g, ' ').trim()
  if (!clean) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(clean)
  u.lang = 'ko-KR'
  u.rate = 0.85
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.replace('_', '-') === 'ko-KR')
  if (voice) u.voice = voice
  window.speechSynthesis.speak(u)
}
