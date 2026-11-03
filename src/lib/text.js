/** Splits "English (한국어)" into { en, kr }. */
export function splitBilingual(str) {
  const i = str.indexOf(' (')
  if (i === -1) return { en: str, kr: '' }
  return { en: str.slice(0, i), kr: str.slice(i + 2).replace(/\)$/, '') }
}
