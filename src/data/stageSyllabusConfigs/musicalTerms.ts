// Stage One Italian musical terms configuration (lowercase keys for consistency)
export const STAGE_ONE_ITALIAN_MUSICAL_TERMS = {
  'a tempo': 'Return to original tempo',
  'accelerando': 'Gradually getting faster',
  'accel.': 'Gradually getting faster',
  'adagio': 'Slow tempo',
  'allegretto': 'Moderately fast',
  'allegro': 'Fast tempo',
  'andante': 'Walking pace',
  'moderato': 'Moderate tempo',
  'rallentando': 'Gradually getting slower',
  'rall.': 'Gradually getting slower',
  'ritardando': 'Gradually getting slower',
  'ritard.': 'Gradually getting slower',
  'rit.': 'Gradually getting slower',
  'legato': 'Smooth and connected',
  'staccato': 'Short and detached',
  'stacc.': 'Short and detached',
  'cantabile': 'In a singing style',
  'dolce': 'Sweetly',
  'da capo': 'From the beginning',
  'd.c.': 'From the beginning',
  'fine': 'End',
  'al fine': 'To the end'
} as const

// Display names for proper capitalization in UI
export const TERM_DISPLAY_NAMES = {
  'adagio': 'Adagio',
  'allegretto': 'Allegretto', 
  'allegro': 'Allegro',
  'andante': 'Andante',
  'moderato': 'Moderato',
  'd.c.': 'D.C.'
} as const

// Stage One SMuFL symbols for dynamics (Unicode characters)
// Check https://www.w3.org/2021/03/smufl14/ for the full list of symbols
export const STAGE_ONE_SMuFL_SYMBOLS = {
  'p': '\u{1D18F}', // piano (U+1D18F)
  'f': '\u{1D191}', // forte (U+1D191)
  'pp': '\u{E52B}', // pianissimo (U+E52B)
  'ff': '\u{E52F}', // fortissimo (U+E52F)
  'mf': '\u{E52D}', // mezzo forte (mezzo + forte)
  'mp': '\u{E52C}', // mezzo piano (mezzo + piano)
  'crescendo': '\u{1D192}', // crescendo (U+1D192)
  'cresc.': '\u{1D192}', // crescendo abbreviation
  'decrescendo': '\u{1D193}', // decrescendo (U+1D193)
  'decresc.': '\u{1D193}', // decrescendo abbreviation
  'diminuendo': '\u{1D193}', // diminuendo (same as decrescendo)
  'dim.': '\u{1D193}' // diminuendo abbreviation
} as const

// Helper function to get all terms (combines text terms and SMuFL symbol terms)
export const getAllStageOneTerms = () => {
  // Add definitions for SMuFL symbol terms
  const smuflTermsWithDefinitions = {
    'p': 'Soft',
    'f': 'Loud',
    'pp': 'Very soft',
    'ff': 'Very loud',
    'mf': 'Moderately loud',
    'mp': 'Moderately soft',
    'crescendo': 'Gradually getting louder',
    'cresc.': 'Gradually getting louder',
    'decrescendo': 'Gradually getting softer',
    'decresc.': 'Gradually getting softer',
    'diminuendo': 'Gradually getting softer',
    'dim.': 'Gradually getting softer'
  }
  
  return { ...STAGE_ONE_ITALIAN_MUSICAL_TERMS, ...smuflTermsWithDefinitions }
}

// Helper function to get SMuFL symbol for a term
export const getSMuFLSymbol = (term: string): string => {
  return STAGE_ONE_SMuFL_SYMBOLS[term as keyof typeof STAGE_ONE_SMuFL_SYMBOLS] || term
}

// Helper function to check if a term should be displayed as text (no SMuFL symbol available)
export const isTextTerm = (term: string): boolean => {
  return !(term in STAGE_ONE_SMuFL_SYMBOLS)
}

// Helper function to get the proper display name for a term
export const getDisplayName = (term: string): string => {
  return TERM_DISPLAY_NAMES[term as keyof typeof TERM_DISPLAY_NAMES] || term
}
