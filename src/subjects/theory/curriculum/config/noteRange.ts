import {
    GRADE_ONE_BASS_PITCH_RANGE,
    GRADE_ONE_TREBLE_PITCH_RANGE,
    GRADE_TWO_BASS_PITCH_RANGE,
    GRADE_TWO_TREBLE_PITCH_RANGE,
    PRE_GRADE_BASS_PITCH_RANGE,
    PRE_GRADE_TREBLE_PITCH_RANGE
} from '@/config/gradeSyllabus/pitchRange'
import type { ClefType, Note } from '@leonkwan46/music-notation'
import { ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS } from '@leonkwan46/music-notation'
import type { StageNumber } from '@types'

const getPitchDefinitions = (clef: ClefType) => {
  switch (clef) {
    case 'bass': return BASS_PITCH_DEFINITIONS
    case 'alto': return ALTO_PITCH_DEFINITIONS
    case 'tenor': return TENOR_PITCH_DEFINITIONS
    case 'treble': return TREBLE_PITCH_DEFINITIONS
    default: throw new Error(`Unsupported clef type: ${clef}`)
  }
}

const getNewPitchRangeForStage = (stage: StageNumber, clef: ClefType): string[] => {
  switch (stage) {
    case 0:
      switch (clef) {
        case 'bass':
          return PRE_GRADE_BASS_PITCH_RANGE.map(pitch => pitch as string)
        case 'treble':
          return PRE_GRADE_TREBLE_PITCH_RANGE.map(pitch => pitch as string)
        default:
          throw new Error(`Unsupported clef for stage 0: ${clef}`)
      }
    case 1:
    case 2:
      switch (clef) {
        case 'bass':
          return GRADE_ONE_BASS_PITCH_RANGE.map((pitch: string) => pitch)
        case 'treble':
          return GRADE_ONE_TREBLE_PITCH_RANGE.map((pitch: string) => pitch)
        default:
          throw new Error(`Unsupported clef for stage ${stage}: ${clef}`)
      }
    case 3:
    case 4:
      switch (clef) {
        case 'bass':
          return GRADE_TWO_BASS_PITCH_RANGE.map((pitch: string) => pitch)
        case 'treble':
          return GRADE_TWO_TREBLE_PITCH_RANGE.map((pitch: string) => pitch)
        default:
          throw new Error(`Unsupported clef for stage ${stage}: ${clef}`)
      }
    default:
      throw new Error(`Stage ${stage} note ranges not yet implemented`)
  }
}

const getCumulativePitchRangeForStage = (stage: StageNumber, clef: ClefType): string[] => {
  switch (clef) {
    case 'bass':
      switch (stage) {
        case 0:
          return PRE_GRADE_BASS_PITCH_RANGE.map(pitch => pitch as string)
        case 1:
        case 2:
          return [...PRE_GRADE_BASS_PITCH_RANGE, ...GRADE_ONE_BASS_PITCH_RANGE].map(pitch => pitch as string)
        case 3:
        case 4:
          return [...PRE_GRADE_BASS_PITCH_RANGE, ...GRADE_ONE_BASS_PITCH_RANGE, ...GRADE_TWO_BASS_PITCH_RANGE].map(pitch => pitch as string)
        default:
          throw new Error(`Stage ${stage} cumulative bass pitch range not yet implemented`)
      }
    case 'treble':
      switch (stage) {
        case 0:
          return PRE_GRADE_TREBLE_PITCH_RANGE.map(pitch => pitch as string)
        case 1:
        case 2:
          return [...PRE_GRADE_TREBLE_PITCH_RANGE, ...GRADE_ONE_TREBLE_PITCH_RANGE].map(pitch => pitch as string)
        case 3:
        case 4:
          return [...PRE_GRADE_TREBLE_PITCH_RANGE, ...GRADE_ONE_TREBLE_PITCH_RANGE, ...GRADE_TWO_TREBLE_PITCH_RANGE].map(pitch => pitch as string)
        default:
          throw new Error(`Stage ${stage} cumulative treble pitch range not yet implemented`)
      }
    default:
      throw new Error(`Unsupported clef for cumulative pitch range: ${clef}`)
  }
}

export const getNewNotesForStage = (stage: StageNumber, clef: ClefType): Note[] => {
  const pitchDefinitions = getPitchDefinitions(clef)
  const pitchRange = getNewPitchRangeForStage(stage, clef)
  
  return pitchDefinitions.filter((note: Note) => {
    return pitchRange.includes(note.pitch)
  })
}

export const getCumulativeNoteDefinitions = (stage: StageNumber, clef: ClefType): Note[] => {
  const pitchDefinitions = getPitchDefinitions(clef)
  const pitchRange = getCumulativePitchRangeForStage(stage, clef)
  
  return pitchDefinitions.filter((note: Note) => {
    return pitchRange.includes(note.pitch)
  })
}

export const STAGE_ZERO_NOTE_RANGE = (clef: ClefType) => getCumulativeNoteDefinitions(0, clef)
export const STAGE_ONE_NOTE_RANGE = (clef: ClefType) => getCumulativeNoteDefinitions(1, clef)
export const STAGE_TWO_NOTE_RANGE = (clef: ClefType) => getCumulativeNoteDefinitions(2, clef)
export const STAGE_THREE_NOTE_RANGE = (clef: ClefType) => getCumulativeNoteDefinitions(3, clef)
