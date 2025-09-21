// Stage One note range configuration
import type { ClefType } from '@leonkwan46/music-notation'
import { TREBLE_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, ALTO_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS } from '@leonkwan46/music-notation'

export const STAGE_ONE_NOTE_RANGE = (clef?: ClefType) => {
  // Choose the appropriate pitch definitions based on clef
  const pitchDefinitions = (() => {
    switch (clef) {
      case 'bass': return BASS_PITCH_DEFINITIONS
      case 'alto': return ALTO_PITCH_DEFINITIONS
      case 'tenor': return TENOR_PITCH_DEFINITIONS
      default: return TREBLE_PITCH_DEFINITIONS
    }
  })()
  
  return pitchDefinitions.filter((note: any) => {
    const pitch = note.pitch
    // Include natural notes and accidentals in Stage One range
    if (clef === 'bass') {
      // Bass clef range (C2 to G4)
      return [
        'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4',
        'C♯2', 'D♯2', 'E♯2', 'F♯2', 'G♯2', 'A♯2', 'B♯2', 'C♯3', 'D♯3', 'E♯3', 'F♯3', 'G♯3', 'A♯3', 'B♯3', 'C♯4', 'D♯4', 'E♯4', 'F♯4', 'G♯4',
        'C♭2', 'D♭2', 'E♭2', 'F♭2', 'G♭2', 'A♭2', 'B♭2', 'C♭3', 'D♭3', 'E♭3', 'F♭3', 'G♭3', 'A♭3', 'B♭3', 'C♭4', 'D♭4', 'E♭4', 'F♭4', 'G♭4'
      ].includes(pitch)
    } else {
      // Treble clef range (C4 to G5)
      return [
        'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5',
        'C♯4', 'D♯4', 'E♯4', 'F♯4', 'G♯4', 'A♯4', 'B♯4', 'C♯5', 'D♯5', 'E♯5', 'F♯5', 'G♯5',
        'C♭4', 'D♭4', 'E♭4', 'F♭4', 'G♭4', 'A♭4', 'B♭4', 'C♭5', 'D♭5', 'E♭5', 'F♭5', 'G♭5'
      ].includes(pitch)
    }
  })
}
