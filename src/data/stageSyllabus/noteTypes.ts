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
