import { NOTES } from '@leonkwan46/music-notation'
import type { StageNumber } from '@/types/stage'
import { getBasicNoteTypes, getBasicRestTypes } from './exercise'
import { getRandomItem } from './question'

export type TimeValueType = string | { type: string; dots?: number }

export const formatFractions = (text: string): string => {
  if (!text) return text
  const fractionToGlyph: Record<string, string> = {
    '1/8': '⅛',
    '1/4': '¼',
    '3/8': '⅜',
    '1/2': '½',
    '5/8': '⅝',
    '3/4': '¾',
    '7/8': '⅞'
  }
  const keys = Object.keys(fractionToGlyph).sort((a, b) => b.length - a.length)
  let output = text
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escaped, 'g')
    output = output.replace(regex, fractionToGlyph[key])
  }
  return output
}

export const getBaseNoteName = (noteType: string): string => {
  switch (noteType) {
    case NOTES.SEMIBREVE: return 'Semibreve'
    case NOTES.MINIM: return 'Minim'
    case NOTES.CROTCHET: return 'Crotchet'
    case NOTES.QUAVER: return 'Quaver'
    case NOTES.SEMIQUAVER: return 'Semiquaver'
    default: return noteType.toLowerCase()
  }
}

export const getBaseRestName = (restType: string): string => {
  switch (restType) {
    case 'semibreve-rest': return 'Semibreve Rest'
    case 'minim-rest': return 'Minim Rest'
    case 'crotchet-rest': return 'Crotchet Rest'
    case 'quaver-rest': return 'Quaver Rest'
    case 'semiquaver-rest': return 'Semiquaver Rest'
    default: return restType.toLowerCase()
  }
}

export const noteTypeToString = (noteType: TimeValueType): string => {
  if (typeof noteType === 'object' && noteType.type) {
    const { type, dots = 0 } = noteType
    const baseName = getBaseNoteName(type)
    return dots > 0 ? `Dotted ${baseName}` : baseName
  }
  
  return getBaseNoteName(noteType as string)
}

export const restTypeToString = (restType: TimeValueType): string => {
  if (typeof restType === 'object' && restType.type) {
    const { type, dots = 0 } = restType
    const baseName = getBaseRestName(type)
    return dots > 0 ? `Dotted ${baseName}` : baseName
  }
  
  return getBaseRestName(restType as string)
}

const NOTE_BASE_BEATS: Record<string, number> = {
  [NOTES.SEMIBREVE]: 4,
  [NOTES.MINIM]: 2,
  [NOTES.CROTCHET]: 1,
  [NOTES.QUAVER]: 0.5,
  [NOTES.SEMIQUAVER]: 0.25
}

const REST_BASE_BEATS: Record<string, number> = {
  'semibreve-rest': 4,
  'minim-rest': 2,
  'crotchet-rest': 1,
  'quaver-rest': 0.5,
  'semiquaver-rest': 0.25
}

const calculateDottedBeats = (base: number, dots: number): number => {
  let total = base
  let current = base / 2
  for (let i = 0; i < dots; i++) {
    total += current
    current /= 2
  }
  return total
}

export const noteTypeToBeats = (noteType: TimeValueType): number => {
  if (typeof noteType === 'object' && noteType.type) {
    const base = NOTE_BASE_BEATS[noteType.type]
    if (!base) return 0
    return calculateDottedBeats(base, noteType.dots ?? 0)
  }

  const base = NOTE_BASE_BEATS[noteType as string]
  return base ?? 0
}

export const restTypeToBeats = (restType: TimeValueType): number => {
  if (typeof restType === 'object' && restType.type) {
    const base = REST_BASE_BEATS[restType.type]
    if (!base) return 0
    return calculateDottedBeats(base, restType.dots ?? 0)
  }

  const base = REST_BASE_BEATS[restType as string]
  return base ?? 0
}

export const formatDottedBeatsDecomposed = (
  timeValue: TimeValueType,
  isRest: boolean
): string | null => {
  const beats = isRest ? restTypeToBeats(timeValue) : noteTypeToBeats(timeValue)
  return formatBeats(beats)
}

export const formatBeats = (beats: number): string => {
  const denominator = 8
  const numerator = Math.round(beats * denominator)
  const wholeBeats = Math.floor(numerator / denominator)
  let remainder = numerator % denominator

  const parts: string[] = []
  if (wholeBeats > 0) {
    parts.push(`${wholeBeats} beat${wholeBeats === 1 ? '' : 's'}`)
  }
  // Decompose remainder into 1/2, 1/4, 1/8
  if (remainder >= 4) {
    parts.push('1/2 beat')
    remainder -= 4
  }
  if (remainder >= 2) {
    parts.push('1/4 beat')
    remainder -= 2
  }
  if (remainder >= 1) {
    parts.push('1/8 beat')
    remainder -= 1
  }

  return formatFractions(parts.join(' + '))
}

// ======================
// CHOICE GENERATION HELPERS
// ======================

export const ensureFourChoicesForStage2 = (
  stage: StageNumber,
  choiceStrings: string[],
  correctAnswerString: string,
  isRest: boolean
): string[] => {
  // For stage 2, if we don't have enough choices (need 4 total = 3 wrong + 1 correct),
  // add 1 non-dotted value as a wrong choice
  if (stage === 2 && choiceStrings.length < 4) {
    const basicTypes = isRest ? getBasicRestTypes(1) : getBasicNoteTypes(1)
    const toStringFn = isRest ? restTypeToString : noteTypeToString
    const basicStrings = basicTypes.map(type => toStringFn(type as string))
    const availableBasic = basicStrings.filter(choice => 
      !choiceStrings.includes(choice) && choice !== correctAnswerString
    )
    if (availableBasic.length > 0) {
      const oneBasicChoice = getRandomItem(availableBasic as string[])
      return [...choiceStrings, oneBasicChoice]
    }
  }
  
  return choiceStrings
}
