import { NOTES } from '@leonkwan46/music-notation'

export const RESTS = {
  SEMIBREVE: 'semibreve-rest',
  MINIM: 'minim-rest',
  CROTCHET: 'crotchet-rest',
  QUAVER: 'quaver-rest',
  SEMIQUAVER: 'semiquaver-rest'
} as const

export const STAGE_ZERO_NOTE_TYPES = [
  { type: NOTES.SEMIBREVE },
  { type: NOTES.MINIM },
  { type: NOTES.CROTCHET }
]
export const STAGE_ZERO_ALL_NOTE_TYPES = STAGE_ZERO_NOTE_TYPES

export const STAGE_ONE_NOTE_TYPES = [
  { type: NOTES.QUAVER },
  { type: NOTES.SEMIQUAVER }
]
export const STAGE_ONE_ALL_NOTE_TYPES = STAGE_ONE_NOTE_TYPES

export const STAGE_ZERO_REST_TYPES = [
  { type: RESTS.SEMIBREVE },
  { type: RESTS.MINIM },
  { type: RESTS.CROTCHET }
]
export const STAGE_ZERO_ALL_REST_TYPES = STAGE_ZERO_REST_TYPES

export const STAGE_ONE_REST_TYPES = [
  { type: RESTS.QUAVER },
  { type: RESTS.SEMIQUAVER }
]
export const STAGE_ONE_ALL_REST_TYPES = STAGE_ONE_REST_TYPES  

export const STAGE_TWO_DOTTED_NOTE_TYPES = [
  { type: NOTES.MINIM, dots: 1 },
  { type: NOTES.CROTCHET, dots: 1 },
  { type: NOTES.QUAVER, dots: 1 }
]
export const STAGE_TWO_ALL_NOTE_TYPES = STAGE_TWO_DOTTED_NOTE_TYPES


export const STAGE_TWO_DOTTED_REST_TYPES = [
  { type: RESTS.MINIM, dots: 1 },
  { type: RESTS.CROTCHET, dots: 1 },
  { type: RESTS.QUAVER, dots: 1 }
]
export const STAGE_TWO_ALL_REST_TYPES = STAGE_TWO_DOTTED_REST_TYPES

