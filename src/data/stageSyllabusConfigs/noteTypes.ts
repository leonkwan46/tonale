// Stage One note types configuration
import { NOTES } from '@leonkwan46/music-notation'

// Basic note types for Stage One
export const STAGE_ONE_NOTE_TYPES = [
  NOTES.SEMIBREVE,
  NOTES.MINIM,
  NOTES.CROTCHET,
  NOTES.QUAVER,
  NOTES.SEMIQUAVER
]

// Dotted note types for Stage One
export const STAGE_ONE_DOTTED_NOTE_TYPES = [
  { type: NOTES.MINIM, dots: 1 },      // Dotted minim
  { type: NOTES.CROTCHET, dots: 1 },  // Dotted crotchet
  { type: NOTES.QUAVER, dots: 1 }     // Dotted quaver
]

// Combined note types (basic + dotted)
export const STAGE_ONE_ALL_NOTE_TYPES = [
  ...STAGE_ONE_NOTE_TYPES,
  ...STAGE_ONE_DOTTED_NOTE_TYPES
]

// SMuFL symbols for note types (Unicode characters)
// Reference: https://w3c.github.io/smufl/latest/tables/individual-notes.html
export const NOTE_TYPE_SMUFL_SYMBOLS = {
  [NOTES.SEMIBREVE]: {
    default: '\uE1D2'  // U+E1D2 - noteWhole - Whole note (semibreve)
  },
  [NOTES.MINIM]: {
    up: '\uE1D3',      // U+E1D3 - noteHalfUp - Half note (minim) stem up
    down: '\uE1D4'     // U+E1D4 - noteHalfDown - Half note (minim) stem down
  },
  [NOTES.CROTCHET]: {
    up: '\uE1D5',      // U+E1D5 - noteQuarterUp - Quarter note (crotchet) stem up
    down: '\uE1D6'     // U+E1D6 - noteQuarterDown - Quarter note (crotchet) stem down
  },
  [NOTES.QUAVER]: {
    up: '\uE1D7',      // U+E1D7 - note8thUp - Eighth note (quaver) stem up
    down: '\uE1D8'     // U+E1D8 - note8thDown - Eighth note (quaver) stem down
  },
  [NOTES.SEMIQUAVER]: {
    up: '\uE1D9',      // U+E1D9 - note16thUp - 16th note (semiquaver) stem up
    down: '\uE1DA'     // U+E1DA - note16thDown - 16th note (semiquaver) stem down
  }
} as const

// Augmentation dot for dotted notes and rests
export const AUGMENTATION_DOT = '\uE1E7' // U+E1E7 - augmentationDot

// Helper function to get SMuFL symbol for a note type
export const getNoteTypeSMuFLSymbol = (
  noteType: string,
  stem: 'up' | 'down' = 'up'
): string => {
  const symbols = NOTE_TYPE_SMUFL_SYMBOLS[noteType as keyof typeof NOTE_TYPE_SMUFL_SYMBOLS]
  
  if (!symbols) return ''
  
  // Semibreve doesn't have stem direction
  if ('default' in symbols) {
    return symbols.default
  }
  
  // Other notes have stem direction
  return symbols[stem] || symbols.up
}

// Helper function to get note name for display
export const getNoteTypeName = (noteType: string): string => {
  const names: Record<string, string> = {
    [NOTES.SEMIBREVE]: 'Semibreve',
    [NOTES.MINIM]: 'Minim',
    [NOTES.CROTCHET]: 'Crotchet',
    [NOTES.QUAVER]: 'Quaver',
    [NOTES.SEMIQUAVER]: 'Semiquaver'
  }
  return names[noteType] || noteType
}
