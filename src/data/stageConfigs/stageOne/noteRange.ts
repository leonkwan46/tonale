// Stage note range configuration
import type { ClefType, Note } from '@leonkwan46/music-notation'
import { ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS } from '@leonkwan46/music-notation'
import { StageNumber } from '../../theoryData/types'

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

// Helper function to get note range based on stage and clef
const getNoteRange = (stage: StageNumber, clef: ClefType): string[] => {
  switch (stage) {
    case 1:
      switch (clef) {
        case 'bass':
          // Stage 1 Bass clef range (F2 to D4)
          return [
            'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4',
            'F♯2', 'G♯2', 'A♯2', 'B♯2', 'C♯3', 'D♯3', 'E♯3', 'F♯3', 'G♯3', 'A♯3', 'B♯3', 'C♯4', 'D♯4',
            'F♭2', 'G♭2', 'A♭2', 'B♭2', 'C♭3', 'D♭3', 'E♭3', 'F♭3', 'G♭3', 'A♭3', 'B♭3', 'C♭4', 'D♭4'
          ]
        case 'treble':
          // Stage 1 Treble clef range (C4 to G5)
          return [
            'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5',
            'C♯4', 'D♯4', 'E♯4', 'F♯4', 'G♯4', 'A♯4', 'B♯4', 'C♯5', 'D♯5', 'E♯5', 'F♯5', 'G♯5',
            'C♭4', 'D♭4', 'E♭4', 'F♭4', 'G♭4', 'A♭4', 'B♭4', 'C♭5', 'D♭5', 'E♭5', 'F♭5', 'G♭5'
          ]
        default:
          throw new Error(`Unsupported clef for stage 1: ${clef}`)
      }
    case 2:
      switch (clef) {
        case 'bass':
          // Stage 2 Bass clef range (B1 to F4)
          return [
            'B1', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4',
            'B♯1', 'C♯2', 'D♯2', 'E♯2', 'F♯2', 'G♯2', 'A♯2', 'B♯2', 'C♯3', 'D♯3', 'E♯3', 'F♯3', 'G♯3', 'A♯3', 'B♯3', 'C♯4', 'D♯4', 'E♯4', 'F♯4',
            'B♭1', 'C♭2', 'D♭2', 'E♭2', 'F♭2', 'G♭2', 'A♭2', 'B♭2', 'C♭3', 'D♭3', 'E♭3', 'F♭3', 'G♭3', 'A♭3', 'B♭3', 'C♭4', 'D♭4', 'E♭4', 'F♭4'
          ]
        case 'treble':
          // Stage 2 Treble clef range (G3 to D6)
          return [
            'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6',
            'G♯3', 'A♯3', 'B♯3', 'C♯4', 'D♯4', 'E♯4', 'F♯4', 'G♯4', 'A♯4', 'B♯4', 'C♯5', 'D♯5', 'E♯5', 'F♯5', 'G♯5', 'A♯5', 'B♯5', 'C♯6', 'D♯6',
            'G♭3', 'A♭3', 'B♭3', 'C♭4', 'D♭4', 'E♭4', 'F♭4', 'G♭4', 'A♭4', 'B♭4', 'C♭5', 'D♭5', 'E♭5', 'F♭5', 'G♭5', 'A♭5', 'B♭5', 'C♭6', 'D♭6'
          ]
        default:
          throw new Error(`Unsupported clef for stage 2: ${clef}`)
      }
    case 3:
      switch (clef) {
        case 'bass':
          // Stage 3 Bass clef range (G1 to A4)
          return [
            'G1', 'A1', 'B1', 'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4',
            'G♯1', 'A♯1', 'B♯1', 'C♯2', 'D♯2', 'E♯2', 'F♯2', 'G♯2', 'A♯2', 'B♯2', 'C♯3', 'D♯3', 'E♯3', 'F♯3', 'G♯3', 'A♯3', 'B♯3', 'C♯4', 'D♯4', 'E♯4', 'F♯4', 'G♯4', 'A♯4',
            'G♭1', 'A♭1', 'B♭1', 'C♭2', 'D♭2', 'E♭2', 'F♭2', 'G♭2', 'A♭2', 'B♭2', 'C♭3', 'D♭3', 'E♭3', 'F♭3', 'G♭3', 'A♭3', 'B♭3', 'C♭4', 'D♭4', 'E♭4', 'F♭4', 'G♭4', 'A♭4'
          ]
        case 'treble':
          // Stage 3 Treble clef range (E3 to F6)
          return [
            'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6', 'F6',
            'E♯3', 'F♯3', 'G♯3', 'A♯3', 'B♯3', 'C♯4', 'D♯4', 'E♯4', 'F♯4', 'G♯4', 'A♯4', 'B♯4', 'C♯5', 'D♯5', 'E♯5', 'F♯5', 'G♯5', 'A♯5', 'B♯5', 'C♯6', 'D♯6', 'E♯6', 'F♯6',
            'E♭3', 'F♭3', 'G♭3', 'A♭3', 'B♭3', 'C♭4', 'D♭4', 'E♭4', 'F♭4', 'G♭4', 'A♭4', 'B♭4', 'C♭5', 'D♭5', 'E♭5', 'F♭5', 'G♭5', 'A♭5', 'B♭5', 'C♭6', 'D♭6', 'E♭6', 'F♭6'
          ]
        default:
          throw new Error(`Unsupported clef for stage 3: ${clef}`)
      }
    default:
      throw new Error(`Stage ${stage} note ranges not yet implemented`)
  }
}

// Generic function to filter notes by stage and clef
const filterNotesByRange = (stage: StageNumber, clef: ClefType) => {
  const pitchDefinitions = getPitchDefinitions(clef)
  const stageRange = getNoteRange(stage, clef)
  
  return pitchDefinitions.filter((note: Note) => {
    return stageRange.includes(note.pitch)
  })
}

// Stage-specific functions
export const STAGE_ONE_NOTE_RANGE = (clef: ClefType) => filterNotesByRange(1, clef)
export const STAGE_TWO_NOTE_RANGE = (clef: ClefType) => filterNotesByRange(2, clef)
export const STAGE_THREE_NOTE_RANGE = (clef: ClefType) => filterNotesByRange(3, clef)
