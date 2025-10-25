// Stage One musical terms organized by category

// Tempo terms for Stage 1 (basic tempo concepts)
export const STAGE_ONE_TEMPO_TERMS = {
  'allegro': 'Fast tempo',
  'andante': 'Walking pace',
  'moderato': 'Moderate tempo',
  'adagio': 'Slow tempo',
  'allegretto': 'Moderately fast',
  'accelerando': 'Gradually getting faster',
  'accel.': 'Gradually getting faster',
  'rallentando': 'Gradually getting slower',
  'rall.': 'Gradually getting slower',
  'ritardando': 'Gradually getting slower',
  'ritard.': 'Gradually getting slower',
  'rit.': 'Gradually getting slower',
  'a tempo': 'Return to original tempo'
} as const

// Articulation and expression terms for Stage 1
export const STAGE_ONE_ARTICULATION_TERMS = {
  'legato': 'Smooth and connected',
  'staccato': 'Short and detached',
  'stacc.': 'Short and detached',
  'cantabile': 'In a singing style',
  'dolce': 'Sweetly',
  'crescendo': 'Gradually getting louder',
  'cresc.': 'Gradually getting louder',
  'decrescendo': 'Gradually getting softer',
  'decresc.': 'Gradually getting softer',
  'diminuendo': 'Gradually getting softer',
  'dim.': 'Gradually getting softer'
} as const

// Performance direction terms for Stage 1
export const STAGE_ONE_PERFORMANCE_TERMS = {
  'da capo': 'From the beginning',
  'd.c.': 'From the beginning',
  'fine': 'End',
  'al fine': 'To the end'
} as const

// Combined Stage One terms (for backward compatibility)
export const STAGE_ONE_ITALIAN_MUSICAL_TERMS = {
  ...STAGE_ONE_TEMPO_TERMS,
  ...STAGE_ONE_ARTICULATION_TERMS,
  ...STAGE_ONE_PERFORMANCE_TERMS
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

// Stage One articulation and expression signs
export const STAGE_ONE_ARTICULATION_SIGNS = {
  'slur': '\u{1D17A}', // Musical symbol slur
  'tie': '\u{1D17B}', // Musical symbol tie
  'staccato': '\u{1D17C}', // Musical symbol staccato
  'accent': '\u{1D17D}', // Musical symbol accent
  'pause': '\u{1D17E}', // Musical symbol fermata
  'fermata': '\u{1D17E}' // Musical symbol fermata
} as const

// Stage One repeat and performance signs
export const STAGE_ONE_REPEAT_SIGNS = {
  'repeat': '\u{1D106}', // Musical symbol repeat
  'metronome': '\u{1D107}', // Musical symbol metronome mark
  'common_time': '\u{1D134}', // Musical symbol common time (C)
  'cut_time': '\u{1D135}' // Musical symbol cut time
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

// Add definitions for articulation signs
const articulationSignsWithDefinitions = {
  'slur': 'Smooth connection between notes',
  'tie': 'Hold note for combined duration',
  'staccato': 'Short and detached',
  'accent': 'Emphasized note',
  'pause': 'Hold note longer than written',
  'fermata': 'Hold note longer than written'
} as const

// Add definitions for repeat and performance signs
const repeatSignsWithDefinitions = {
  'repeat': 'Play section again',
  'metronome': 'Tempo indication',
  'common_time': '4/4 time signature',
  'cut_time': '2/2 time signature'
} as const

// Helper function to get all Stage One terms (combines text terms and SMuFL symbol terms)
export const getAllStageOneTerms = () => {
  return { 
    ...STAGE_ONE_ITALIAN_MUSICAL_TERMS, 
    ...smuflTermsWithDefinitions,
    ...articulationSignsWithDefinitions,
    ...repeatSignsWithDefinitions
  }
}

// Helper function to get Stage One terms by category
export const getStageOneTempoTerms = () => {
  return { ...STAGE_ONE_TEMPO_TERMS }
}

export const getStageOneArticulationTerms = () => {
  return { ...STAGE_ONE_ARTICULATION_TERMS, ...articulationSignsWithDefinitions }
}

export const getStageOnePerformanceTerms = () => {
  return { ...STAGE_ONE_PERFORMANCE_TERMS, ...repeatSignsWithDefinitions }
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
  return STAGE_ONE_SMuFL_SYMBOLS[term as keyof typeof STAGE_ONE_SMuFL_SYMBOLS] || 
         STAGE_ONE_ARTICULATION_SIGNS[term as keyof typeof STAGE_ONE_ARTICULATION_SIGNS] ||
         STAGE_ONE_REPEAT_SIGNS[term as keyof typeof STAGE_ONE_REPEAT_SIGNS] ||
         term
}

// Helper function to check if a term should be displayed as text (no SMuFL symbol available)
export const isTextTerm = (term: string): boolean => {
  return !(term in STAGE_ONE_SMuFL_SYMBOLS) && 
         !(term in STAGE_ONE_ARTICULATION_SIGNS) && 
         !(term in STAGE_ONE_REPEAT_SIGNS)
}

// Helper function to get the proper display name for a term
export const getDisplayName = (term: string): string => {
  return TERM_DISPLAY_NAMES[term as keyof typeof TERM_DISPLAY_NAMES] || term
}
