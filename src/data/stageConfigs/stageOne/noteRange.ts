// Stage note range configuration
import type { ClefType, Note } from '@leonkwan46/music-notation'
import { ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS } from '@leonkwan46/music-notation'
import { StageNumber } from '../../theoryData/types'

export const STAGE_ONE_NOTE_RANGE = (clef: ClefType, stage: StageNumber) => {
  // Choose the appropriate pitch definitions based on clef
  let pitchDefinitions
  switch (clef) {
    case 'bass': 
      pitchDefinitions = BASS_PITCH_DEFINITIONS
      break
    case 'alto': 
      pitchDefinitions = ALTO_PITCH_DEFINITIONS
      break
    case 'tenor': 
      pitchDefinitions = TENOR_PITCH_DEFINITIONS
      break
    case 'treble': 
      pitchDefinitions = TREBLE_PITCH_DEFINITIONS
      break
    default: 
      throw new Error(`Unsupported clef type: ${clef}`)
  }
  
  return pitchDefinitions.filter((note: Note) => {
    const pitch = note.pitch
    
    // Get the appropriate range based on stage and clef
    const getStageRange = (stage: StageNumber, clef?: ClefType) => {
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
              throw new Error(`Unsupported clef for stage ${stage}: ${clef}`)
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
              throw new Error(`Unsupported clef for stage ${stage}: ${clef}`)
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
              throw new Error(`Unsupported clef for stage ${stage}: ${clef}`)
          }
        default:
          throw new Error(`Stage ${stage} note ranges not yet implemented`)
      }
    }
    
    const stageRange = getStageRange(stage, clef)
    return stageRange.includes(pitch)
  })
}
