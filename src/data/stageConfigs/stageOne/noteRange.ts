// Stage One note range configuration
import { PITCH_DEFINITIONS } from '@leonkwan46/music-notation'

export const STAGE_ONE_NOTE_RANGE = () => {
  return PITCH_DEFINITIONS.filter(note => {
    const pitch = note.pitch
    // Include natural notes and accidentals in Stage One range (C4 to G5)
    return [
      'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5',
      'C♯4', 'D♯4', 'E♯4', 'F♯4', 'G♯4', 'A♯4', 'B♯4', 'C♯5', 'D♯5', 'E♯5', 'F♯5', 'G♯5',
      'C♭4', 'D♭4', 'E♭4', 'F♭4', 'G♭4', 'A♭4', 'B♭4', 'C♭5', 'D♭5', 'E♭5', 'F♭5', 'G♭5'
    ].includes(pitch)
  })
}
