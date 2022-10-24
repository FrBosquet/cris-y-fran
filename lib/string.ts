import removeAccents from 'remove-accents'

export const toNames = (raw: string): string[] =>
  raw.split(',').map((s) => s.trim())
export const toSlug = (raw: string): string =>
  toCleanString(toNames(raw).join('y').toLowerCase())
export const toAmount = (raw: string): number => raw.split(',').length
export const toCleanString = (raw: string): string =>
  removeAccents.remove(raw).replace(/\s|\d/gi, '')
