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

// Stage Two Italian musical terms configuration (lowercase keys for consistency)
export const STAGE_TWO_ITALIAN_MUSICAL_TERMS = {
  'alla marcia': 'In march style',
  'allargando': 'Broadening, getting slower and louder',
  'con moto': 'With movement',
  'con, col': 'With',
  'dal segno': 'From the sign',
  'd.s.': 'From the sign',
  'e, ed': 'And',
  'espressivo': 'Expressively',
  'espress.': 'Expressively',
  'grave': 'Very slow and solemn',
  'grazioso': 'Gracefully',
  'largo': 'Very slow and broad',
  'lento': 'Slow',
  'ma': 'But',
  'meno': 'Less',
  'meno mosso': 'Less movement',
  'molto': 'Very',
  'non troppo': 'Not too much',
  'più': 'More',
  'più mosso': 'More movement',
  'poco': 'Little',
  'poco a poco': 'Little by little',
  'presto': 'Very fast',
  'ritenuto': 'Held back',
  'riten.': 'Held back',
  'rit.': 'Held back',
  'senza': 'Without',
  'vivace': 'Lively and fast',
  'vivo': 'Lively and fast'
} as const

// Stage Three Italian musical terms configuration (lowercase keys for consistency)
export const STAGE_THREE_ITALIAN_MUSICAL_TERMS = {
  'agitato': 'Agitated, restless',
  'andantino': 'Slightly faster than andante',
  'animato': 'Animated, lively',
  'ben': 'Well',
  'con forza': 'With force',
  'energico': 'Energetically',
  'giocoso': 'Playfully, humorously',
  'leggiero': 'Lightly',
  'maestoso': 'Majestically',
  'marcato': 'Marked, emphasized',
  'marc.': 'Marked, emphasized',
  'pesante': 'Heavy, weighty',
  'prestissimo': 'As fast as possible',
  'prima': 'First',
  'primo': 'First',
  'risoluto': 'Resolutely, decisively',
  'scherzando': 'Playfully, joking',
  'semplice': 'Simply',
  'sempre': 'Always',
  'sforzando': 'Sudden strong accent',
  'sforzato': 'Sudden strong accent',
  'simile': 'In the same way',
  'sim.': 'In the same way',
  'sostenuto': 'Sustained',
  'sost': 'Sustained',
  'subito': 'Suddenly',
  'sub.': 'Suddenly',
  'tranquillo': 'Calmly, quietly',
  'triste': 'Sadly',
  'tristamente': 'Sadly'
} as const

// Display names for proper capitalization in UI
export const TERM_DISPLAY_NAMES = {
  'adagio': 'Adagio',
  'allegretto': 'Allegretto', 
  'allegro': 'Allegro',
  'andante': 'Andante',
  'moderato': 'Moderato',
  'd.c.': 'D.C.',
  'd.s.': 'D.S.',
  'allargando': 'Allargando',
  'grave': 'Grave',
  'largo': 'Largo',
  'lento': 'Lento',
  'presto': 'Presto',
  'vivace': 'Vivace',
  'vivo': 'Vivo',
  'agitato': 'Agitato',
  'andantino': 'Andantino',
  'animato': 'Animato',
  'energico': 'Energico',
  'giocoso': 'Giocoso',
  'leggiero': 'Leggiero',
  'maestoso': 'Maestoso',
  'marcato': 'Marcato',
  'pesante': 'Pesante',
  'prestissimo': 'Prestissimo',
  'risoluto': 'Risoluto',
  'scherzando': 'Scherzando',
  'sostenuto': 'Sostenuto',
  'tranquillo': 'Tranquillo',
  'triste': 'Triste',
  'tristamente': 'Tristamente'
} as const

// Stage One SMuFL symbols for dynamics (Unicode characters)
// Check https://www.w3.org/2021/03/smufl14/ for the full list of symbols
export const STAGE_ONE_SMuFL_SYMBOLS = {
  'p': '\u{1D18F}',
  'f': '\u{1D191}',
  'pp': '\u{E52B}',
  'ff': '\u{E52F}',
  'mf': '\u{E52D}',
  'mp': '\u{E52C}',
  'crescendo': '\u{1D192}',
  'cresc.': '\u{1D192}',
  'decrescendo': '\u{1D193}',
  'decresc.': '\u{1D193}',
  'diminuendo': '\u{1D193}',
  'dim.': '\u{1D193}'
} as const
export const STAGE_TWO_SMuFL_SYMBOLS = {
  'fp': '\u{E534}'
} as const
export const STAGE_THREE_SMuFL_SYMBOLS = {
  'sfz': '\u{E539}',
  'sf': '\u{E536}'
} as const

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
  'dim.': 'Gradually getting softer',
  'fp': 'Loud then immediately soft',
  'sfz': 'Sudden strong accent',
  'sf': 'Sudden strong accent'
} as const

// Helper function to get all Stage One terms (combines text terms and SMuFL symbol terms)
export const getAllStageOneTerms = () => {
  return { ...STAGE_ONE_ITALIAN_MUSICAL_TERMS, ...smuflTermsWithDefinitions }
}

// Helper function to get all Stage Two terms
export const getAllStageTwoTerms = () => {
  return { ...STAGE_TWO_ITALIAN_MUSICAL_TERMS, ...smuflTermsWithDefinitions }
}

// Helper function to get all Stage Three terms
export const getAllStageThreeTerms = () => {
  return { ...STAGE_THREE_ITALIAN_MUSICAL_TERMS, ...smuflTermsWithDefinitions }
}

// Helper function to get all terms from all stages
export const getAllMusicalTerms = () => {
  return { ...getAllStageOneTerms(), ...getAllStageTwoTerms(), ...getAllStageThreeTerms() }
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
