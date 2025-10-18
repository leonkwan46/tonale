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

// SMuFL symbols for rest types (Unicode characters)
// Reference: https://w3c.github.io/smufl/latest/tables/rests.html
export const REST_TYPE_SMUFL_SYMBOLS = {
  [RESTS.SEMIBREVE]: '\uE4F4',  // U+E4E3 - restWhole - Whole (semibreve) rest
  [RESTS.MINIM]: '\uE4F5',      // U+E4E4 - restHalf - Half (minim) rest
  [RESTS.CROTCHET]: '\uE4E5',   // U+E4E5 - restQuarter - Quarter (crotchet) rest
  [RESTS.QUAVER]: '\uE4E6',     // U+E4E6 - rest8th - Eighth (quaver) rest
  [RESTS.SEMIQUAVER]: '\uE4E7'  // U+E4E7 - rest16th - 16th (semiquaver) rest
} as const

// Helper function to get SMuFL symbol for a rest type
export const getRestTypeSMuFLSymbol = (restType: string): string => {
  return REST_TYPE_SMUFL_SYMBOLS[restType as keyof typeof REST_TYPE_SMUFL_SYMBOLS] || ''
}

// Helper function to get rest name for display
export const getRestTypeName = (restType: string): string => {
  const names: Record<string, string> = {
    [RESTS.SEMIBREVE]: 'Semibreve Rest',
    [RESTS.MINIM]: 'Minim Rest',
    [RESTS.CROTCHET]: 'Crotchet Rest',
    [RESTS.QUAVER]: 'Quaver Rest',
    [RESTS.SEMIQUAVER]: 'Semiquaver Rest'
  }
  return names[restType] || restType
}
