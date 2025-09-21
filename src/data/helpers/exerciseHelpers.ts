// Exercise-specific helper functions for music theory stages
import { ACCIDENTALS, type AccidentalType } from '@leonkwan46/music-notation'
import { STAGE_ONE_KEYS } from '../stageConfigs/stageOne/keySignatures'
import { STAGE_ONE_NOTE_RANGE } from '../stageConfigs/stageOne/noteRange'
import { STAGE_ONE_NOTE_TYPES } from '../stageConfigs/stageOne/noteTypes'
import { STAGE_ONE_TIME_SIGNATURES } from '../stageConfigs/stageOne/timeSignatures'
import { StageNumber } from '../theoryData/types'

// ===============================
// Stage-Agnostic Exercise Helpers
// ===============================

export const getNoteTypes = (stage: StageNumber) => {
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
      // TODO: Import and return STAGE_TWO_TIME_SIGNATURES when available
      throw new Error('Stage 2 time signatures not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_TIME_SIGNATURES when available
      throw new Error('Stage 3 time signatures not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getKeys = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_KEYS
    case 2:
      // TODO: Import and return STAGE_TWO_KEYS when available
      throw new Error('Stage 2 keys not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_KEYS when available
      throw new Error('Stage 3 keys not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getNoteRange = (stage: StageNumber, clef?: string) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_NOTE_RANGE(clef as any)
    case 2:
      // TODO: Import and return STAGE_TWO_NOTE_RANGE when available
      throw new Error('Stage 2 note range not yet implemented')
    case 3:
      // TODO: Import and return STAGE_THREE_NOTE_RANGE when available
      throw new Error('Stage 3 note range not yet implemented')
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

// ===============================
// Legacy Stage One Helpers (for backward compatibility)
// ===============================
export const getStageOneNoteTypes = () => getNoteTypes(1)
export const getStageOneAccidentals = (): AccidentalType[] => getAccidentals(1)
export const getStageOneTimeSignatures = () => getTimeSignatures(1)
export const getStageOneKeys = () => getKeys(1)
export const getStageOneNoteRange = () => getNoteRange(1)
