// Exercise-specific helper functions for music theory stages
import { ACCIDENTALS, ClefType, type AccidentalType } from '@leonkwan46/music-notation'
import { STAGE_ONE_KEYS, STAGE_THREE_KEYS, STAGE_TWO_KEYS } from '../stageSyllabusConfigs/keySignatures'
import { STAGE_ONE_NOTE_RANGE, STAGE_THREE_NOTE_RANGE, STAGE_TWO_NOTE_RANGE } from '../stageSyllabusConfigs/noteRange'
import { STAGE_ONE_ALL_NOTE_TYPES, STAGE_ONE_DOTTED_NOTE_TYPES, STAGE_ONE_NOTE_TYPES } from '../stageSyllabusConfigs/noteTypes'
import { STAGE_ONE_ALL_REST_TYPES, STAGE_ONE_DOTTED_REST_TYPES, STAGE_ONE_REST_TYPES } from '../stageSyllabusConfigs/restTypes'
import { STAGE_ONE_TIME_SIGNATURES, STAGE_THREE_TIME_SIGNATURES, STAGE_TWO_TIME_SIGNATURES } from '../stageSyllabusConfigs/timeSignatures'
import { StageNumber } from '../theoryData/types'

// ===============================
// Stage-Agnostic Exercise Helpers
// ===============================

export const getBasicNoteTypes = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_NOTE_TYPES
    case 2:
      // TODO: Import and return STAGE_TWO_NOTE_TYPES when available
      throw new Error('Stage 2 note types not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_NOTE_TYPES when available
      throw new Error('Stage 3 note types not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getDottedNoteTypes = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_DOTTED_NOTE_TYPES
    case 2:
      // TODO: Import and return STAGE_TWO_DOTTED_NOTE_TYPES when available
      throw new Error('Stage 2 dotted note types not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_DOTTED_NOTE_TYPES when available
      throw new Error('Stage 3 dotted note types not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getAllNoteTypes = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_ALL_NOTE_TYPES
    case 2:
      // TODO: Import and return STAGE_TWO_ALL_NOTE_TYPES when available
      throw new Error('Stage 2 all note types not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_ALL_NOTE_TYPES when available
      throw new Error('Stage 3 all note types not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getBasicRestTypes = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_REST_TYPES
    case 2:
      // TODO: Import and return STAGE_TWO_REST_TYPES when available
      throw new Error('Stage 2 rest types not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_REST_TYPES when available
      throw new Error('Stage 3 rest types not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getDottedRestTypes = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_DOTTED_REST_TYPES
    case 2:
      // TODO: Import and return STAGE_TWO_DOTTED_REST_TYPES when available
      throw new Error('Stage 2 dotted rest types not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_DOTTED_REST_TYPES when available
      throw new Error('Stage 3 dotted rest types not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getAllRestTypes = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_ALL_REST_TYPES
    case 2:
      // TODO: Import and return STAGE_TWO_ALL_REST_TYPES when available
      throw new Error('Stage 2 all rest types not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_ALL_REST_TYPES when available
      throw new Error('Stage 3 all rest types not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getAccidentals = (stage: StageNumber): AccidentalType[] => {
  switch (stage) {
    case 1:
      return [ACCIDENTALS.SHARP, ACCIDENTALS.FLAT, ACCIDENTALS.NATURAL]
    case 2:
      // TODO: Define Stage 2 accidentals when available
      throw new Error('Stage 2 accidentals not yet implemented')
    case 3:
      // TODO: Define Stage 3 accidentals when available
      throw new Error('Stage 3 accidentals not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getTimeSignatures = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_TIME_SIGNATURES
    case 2:
      return STAGE_TWO_TIME_SIGNATURES
    case 3:
      return STAGE_THREE_TIME_SIGNATURES
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getKeys = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_KEYS
    case 2:
      return STAGE_TWO_KEYS
    case 3:
      return STAGE_THREE_KEYS
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getNoteRange = (stage: StageNumber, clef: string) => {
  if (!clef) {
    throw new Error('Clef must be specified for note range')
  }
  
  switch (stage) {
    case 1:
      return STAGE_ONE_NOTE_RANGE(clef as ClefType)
    case 2:
      return STAGE_TWO_NOTE_RANGE(clef as ClefType)
    case 3:
      return STAGE_THREE_NOTE_RANGE(clef as ClefType)
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

// ===============================
// Utility Functions
// ===============================

// Check if a note/rest type is dotted
export const isDotted = (noteType: string | { type: string; dots?: number }): boolean => {
  if (typeof noteType === 'object' && noteType.type) {
    return (noteType.dots || 0) > 0
  }
  return false
}

// Get the base type (without dots) from a note/rest type
export const getBaseType = (noteType: string | { type: string; dots?: number }): string => {
  if (typeof noteType === 'object' && noteType.type) {
    return noteType.type
  }
  return noteType as string
}

// Check if a type is a rest
export const isRest = (noteType: string | { type: string; dots?: number }): boolean => {
  const baseType = getBaseType(noteType)
  return baseType.includes('-rest')
}

// Check if a type is a note
export const isNote = (noteType: string | { type: string; dots?: number }): boolean => {
  return !isRest(noteType)
}
