// Helper functions for note identification exercises
import type { ClefType, Note } from '@leonkwan46/music-notation'
import { ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS } from '@leonkwan46/music-notation'
import {
    GRADE_ONE_BASS_PITCH_RANGE,
    GRADE_ONE_TREBLE_PITCH_RANGE,
    GRADE_TWO_BASS_PITCH_RANGE,
    GRADE_TWO_TREBLE_PITCH_RANGE,
    PRE_GRADE_BASS_PITCH_RANGE,
    PRE_GRADE_TREBLE_PITCH_RANGE
} from '../../config/gradeSyllabus/PitchRange'
import { StageNumber } from '../theoryData/types'

// Helper function to get pitch definitions based on clef
const getPitchDefinitions = (clef: ClefType) => {
  switch (clef) {
    case 'bass': return BASS_PITCH_DEFINITIONS
    case 'alto': return ALTO_PITCH_DEFINITIONS
    case 'tenor': return TENOR_PITCH_DEFINITIONS
    case 'treble': return TREBLE_PITCH_DEFINITIONS
    default: throw new Error(`Unsupported clef type: ${clef}`)
  }
}

/**
 * Get pitch range for note identification exercises
 * Returns only the new pitches introduced in each stage (not cumulative)
 */
export const getNoteIdentificationPitchRange = (stage: StageNumber, clef: ClefType): string[] => {
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
          throw new Error(`Unsupported clef for stage 2: ${clef}`)
      }
    case 3:
    case 4:
      switch (clef) {
        case 'bass':
          return GRADE_TWO_BASS_PITCH_RANGE.map((pitch: string) => pitch)
        case 'treble':
          return GRADE_TWO_TREBLE_PITCH_RANGE.map((pitch: string) => pitch)
        default:
          throw new Error(`Unsupported clef for stage 3: ${clef}`)
      }
    default:
      throw new Error(`Stage ${stage} note ranges not yet implemented`)
  }
}

/**
 * Get Note objects for note identification exercises
 * Uses getNoteIdentificationPitchRange to get pitch strings, then converts them to Note objects
 */
export const getNoteIdentificationNoteDefinitions = (stage: StageNumber, clef: ClefType): Note[] => {
  const pitchDefinitions = getPitchDefinitions(clef)
  const pitchRange = getNoteIdentificationPitchRange(stage, clef)
  
  return pitchDefinitions.filter((note: Note) => {
    return pitchRange.includes(note.pitch)
  })
}

// Stage-specific functions for note identification exercises
export const STAGE_ZERO_NOTE_RANGE = (clef: ClefType) => getNoteIdentificationNoteDefinitions(0, clef)
export const STAGE_ONE_NOTE_RANGE = (clef: ClefType) => getNoteIdentificationNoteDefinitions(1, clef)
export const STAGE_TWO_NOTE_RANGE = (clef: ClefType) => getNoteIdentificationNoteDefinitions(2, clef)
export const STAGE_THREE_NOTE_RANGE = (clef: ClefType) => getNoteIdentificationNoteDefinitions(3, clef)

