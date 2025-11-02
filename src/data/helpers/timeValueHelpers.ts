// Time value helpers for note and rest value exercises
import { NOTES } from '@leonkwan46/music-notation'
import { StageNumber } from '../theoryData/types'
import { getBasicNoteTypes, getBasicRestTypes } from './exerciseHelpers'
import { getRandomItem } from './questionHelpers'

export type TimeValueType = string | { type: string; dots?: number }

// ======================
// BASE NAME CONVERTERS
// ======================

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

// ======================
// TYPE TO STRING CONVERTERS
// ======================

export const noteTypeToString = (noteType: TimeValueType): string => {
  // Handle dotted note objects
  if (typeof noteType === 'object' && noteType.type) {
    const { type, dots = 0 } = noteType
    const baseName = getBaseNoteName(type)
    return dots > 0 ? `Dotted ${baseName}` : baseName
  }
  
  // Handle string note types
  return getBaseNoteName(noteType as string)
}

export const restTypeToString = (restType: TimeValueType): string => {
  // Handle dotted rest objects
  if (typeof restType === 'object' && restType.type) {
    const { type, dots = 0 } = restType
    const baseName = getBaseRestName(type)
    return dots > 0 ? `Dotted ${baseName}` : baseName
  }
  
  // Handle string rest types
  return getBaseRestName(restType as string)
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
