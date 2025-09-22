// Stage One rest types configuration

// Rest constants (since the library doesn't provide them)
export const RESTS = {
  SEMIBREVE: 'semibreve-rest',
  MINIM: 'minim-rest',
  CROTCHET: 'crotchet-rest',
  QUAVER: 'quaver-rest',
  SEMIQUAVER: 'semiquaver-rest'
} as const

// Basic rest types for Stage One
export const STAGE_ONE_REST_TYPES = [
  RESTS.SEMIBREVE,
  RESTS.MINIM,
  RESTS.CROTCHET,
  RESTS.QUAVER,
  RESTS.SEMIQUAVER
]

// Dotted rest types for Stage One
export const STAGE_ONE_DOTTED_REST_TYPES = [
  { type: RESTS.MINIM, dots: 1 },      // Dotted minim rest
  { type: RESTS.CROTCHET, dots: 1 },  // Dotted crotchet rest
  { type: RESTS.QUAVER, dots: 1 }     // Dotted quaver rest
]

// Combined rest types (basic + dotted)
export const STAGE_ONE_ALL_REST_TYPES = [
  ...STAGE_ONE_REST_TYPES,
  ...STAGE_ONE_DOTTED_REST_TYPES
]
