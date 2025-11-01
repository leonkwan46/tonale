// ======================
// GRADE ONE MUSICAL TERMS
// ======================

export const GRADE_ONE_TEMPO_TERMS = {
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
export type GradeOneTempoTermsKeys = keyof typeof GRADE_ONE_TEMPO_TERMS
export type GradeOneTempoTerms = (typeof GRADE_ONE_TEMPO_TERMS)[GradeOneTempoTermsKeys]
  
export const GRADE_ONE_ARTICULATION_TERMS = {
  'legato': 'Smooth and connected',
  'staccato': 'Short and detached',
  'stacc.': 'Short and detached'
} as const
export type GradeOneArticulationTermsKeys = keyof typeof GRADE_ONE_ARTICULATION_TERMS
export type GradeOneArticulationTerms = (typeof GRADE_ONE_ARTICULATION_TERMS)[GradeOneArticulationTermsKeys]

export const GRADE_ONE_EXPRESSION_TERMS = {
  'cantabile': 'In a singing style',
  'dolce': 'Sweetly',
  'sostenuto': 'Sustained'
} as const
export type GradeOneExpressionTermsKeys = keyof typeof GRADE_ONE_EXPRESSION_TERMS
export type GradeOneExpressionTerms = (typeof GRADE_ONE_EXPRESSION_TERMS)[GradeOneExpressionTermsKeys]

export const GRADE_ONE_PERFORMANCE_TERMS = {
  'da capo': 'From the beginning',
  'd.c.': 'From the beginning',
  'fine': 'End',
  'al fine': 'To the end'
} as const
export type GradeOnePerformanceTermsKeys = keyof typeof GRADE_ONE_PERFORMANCE_TERMS
export type GradeOnePerformanceTerms = (typeof GRADE_ONE_PERFORMANCE_TERMS)[GradeOnePerformanceTermsKeys]

export const GRADE_ONE_DYNAMIC_SYMBOLS = {
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
export type GradeOneDynamicSymbolsKeys = keyof typeof GRADE_ONE_DYNAMIC_SYMBOLS
export type GradeOneDynamicSymbols = (typeof GRADE_ONE_DYNAMIC_SYMBOLS)[GradeOneDynamicSymbolsKeys]

export const GRADE_ONE_ARTICULATION_SIGNS = {
  // 'slur': '', // TODO
  // 'tie': '', // TODO
  'staccato': '\u{E1D5}\u{1D17C}',
  'accent': '\u{E1D5}\u{1D17D}',
  'fermata': '\u{E1D5}\u{E4C1}'
} as const
export type GradeOneArticulationSignsKeys = keyof typeof GRADE_ONE_ARTICULATION_SIGNS
export type GradeOneArticulationSigns = (typeof GRADE_ONE_ARTICULATION_SIGNS)[GradeOneArticulationSignsKeys]
  
// ======================
// GRADE TWO MUSICAL TERMS
// ======================

export const GRADE_TWO_TEMPO_TERMS = {
  'grave': 'Very slow and solemn',
  'largo': 'Very slow and broad',
  'lento': 'Slow',
  'presto': 'Very fast',
  'vivace': 'Lively and fast',
  'vivo': 'Lively and fast'
} as const
export type GradeTwoTempoTermsKeys = keyof typeof GRADE_TWO_TEMPO_TERMS
export type GradeTwoTempoTerms = (typeof GRADE_TWO_TEMPO_TERMS)[GradeTwoTempoTermsKeys]

export const GRADE_TWO_EXPRESSION_TERMS = {
  'alla marcia': 'In march style',
  'espressivo': 'Expressively',
  'espress.': 'Expressively',
  'grazioso': 'Gracefully'
} as const
export type GradeTwoExpressionTermsKeys = keyof typeof GRADE_TWO_EXPRESSION_TERMS
export type GradeTwoExpressionTerms = (typeof GRADE_TWO_EXPRESSION_TERMS)[GradeTwoExpressionTermsKeys]

export const GRADE_TWO_MODIFIER_TERMS = {
  'allargando': 'Broadening, getting slower and louder',
  'con moto': 'With movement',
  'meno mosso': 'Less movement',
  'più mosso': 'More movement',
  'poco a poco': 'Little by little',
  'ritenuto': 'Held back',
  'riten.': 'Held back',
  'rit.': 'Held back'
} as const
export type GradeTwoModifierTermsKeys = keyof typeof GRADE_TWO_MODIFIER_TERMS
export type GradeTwoModifierTerms = (typeof GRADE_TWO_MODIFIER_TERMS)[GradeTwoModifierTermsKeys]

export const GRADE_TWO_PERFORMANCE_TERMS = {
  'dal segno': 'From the sign',
  'd.s.': 'From the sign'
} as const
export type GradeTwoPerformanceTermsKeys = keyof typeof GRADE_TWO_PERFORMANCE_TERMS
export type GradeTwoPerformanceTerms = (typeof GRADE_TWO_PERFORMANCE_TERMS)[GradeTwoPerformanceTermsKeys]

export const GRADE_TWO_ITALIAN_WORDS = {
  'con, col': 'With',
  'e, ed': 'And',
  'ma': 'But',
  'meno': 'Less',
  'molto': 'Very',
  'non troppo': 'Not too much',
  'più': 'More',
  'poco': 'Little',
  'senza': 'Without'
} as const
export type GradeTwoItalianWordsKeys = keyof typeof GRADE_TWO_ITALIAN_WORDS
export type GradeTwoItalianWords = (typeof GRADE_TWO_ITALIAN_WORDS)[GradeTwoItalianWordsKeys]

export const GRADE_TWO_DYNAMIC_SYMBOLS = {
  'fp': '\u{E534}'
} as const
export type GradeTwoDynamicSymbolsKeys = keyof typeof GRADE_TWO_DYNAMIC_SYMBOLS
export type GradeTwoDynamicSymbols = (typeof GRADE_TWO_DYNAMIC_SYMBOLS)[GradeTwoDynamicSymbolsKeys]

// ======================
// GRADE THREE MUSICAL TERMS
// ======================

export const GRADE_THREE_TEMPO_TERMS = {
  'andantino': 'Slightly faster than andante',
  'prestissimo': 'As fast as possible'
} as const
export type GradeThreeTempoTermsKeys = keyof typeof GRADE_THREE_TEMPO_TERMS
export type GradeThreeTempoTerms = (typeof GRADE_THREE_TEMPO_TERMS)[GradeThreeTempoTermsKeys]

export const GRADE_THREE_EXPRESSION_TERMS = {
  'agitato': 'Agitated, restless',
  'animato': 'Animated, lively',
  'giocoso': 'Playfully, humorously',
  'maestoso': 'Majestically',
  'scherzando': 'Playfully, joking',
  'tranquillo': 'Calmly, quietly',
  'triste': 'Sadly',
  'tristamente': 'Sadly'
} as const
export type GradeThreeExpressionTermsKeys = keyof typeof GRADE_THREE_EXPRESSION_TERMS
export type GradeThreeExpressionTerms = (typeof GRADE_THREE_EXPRESSION_TERMS)[GradeThreeExpressionTermsKeys]

export const GRADE_THREE_ARTICULATION_TERMS = {
  'marcato': 'Marked, emphasized',
  'marc.': 'Marked, emphasized',
  'sforzando': 'Sudden strong accent',
  'sforzato': 'Sudden strong accent'
} as const
export type GradeThreeArticulationTermsKeys = keyof typeof GRADE_THREE_ARTICULATION_TERMS
export type GradeThreeArticulationTerms = (typeof GRADE_THREE_ARTICULATION_TERMS)[GradeThreeArticulationTermsKeys]

export const GRADE_THREE_MODIFIER_TERMS = {
  'con forza': 'With force',
  'energico': 'Energetically',
  'leggiero': 'Lightly',
  'pesante': 'Heavy, weighty',
  'risoluto': 'Resolutely, decisively',
  'sostenuto': 'Sustained',
  'sost': 'Sustained',
  'subito': 'Suddenly',
  'sub.': 'Suddenly'
} as const
export type GradeThreeModifierTermsKeys = keyof typeof GRADE_THREE_MODIFIER_TERMS
export type GradeThreeModifierTerms = (typeof GRADE_THREE_MODIFIER_TERMS)[GradeThreeModifierTermsKeys]

export const GRADE_THREE_ITALIAN_WORDS = {
  'ben': 'Well',
  'prima': 'First',
  'primo': 'First',
  'semplice': 'Simply',
  'sempre': 'Always',
  'simile': 'In the same way',
  'sim.': 'In the same way'
} as const
export type GradeThreeItalianWordsKeys = keyof typeof GRADE_THREE_ITALIAN_WORDS
export type GradeThreeItalianWords = (typeof GRADE_THREE_ITALIAN_WORDS)[GradeThreeItalianWordsKeys]

export const GRADE_THREE_DYNAMIC_SYMBOLS = {
  'sfz': '\u{E539}',
  'sf': '\u{E536}'
} as const
export type GradeThreeDynamicSymbolsKeys = keyof typeof GRADE_THREE_DYNAMIC_SYMBOLS
export type GradeThreeDynamicSymbols = (typeof GRADE_THREE_DYNAMIC_SYMBOLS)[GradeThreeDynamicSymbolsKeys]

// ======================
// DISPLAY NAMES
// ======================

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
export type TermDisplayNamesKeys = keyof typeof TERM_DISPLAY_NAMES
export type TermDisplayNames = (typeof TERM_DISPLAY_NAMES)[TermDisplayNamesKeys]

export const DYNAMIC_SYMBOLS_DEFINITIONS = {
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
export type DynamicSymbolsDefinitionKeys = keyof typeof DYNAMIC_SYMBOLS_DEFINITIONS
export type DynamicSymbolsDefinitions = (typeof DYNAMIC_SYMBOLS_DEFINITIONS)[DynamicSymbolsDefinitionKeys]

export const ARTICULATION_SIGNS_DEFINITIONS = {
  'slur': 'Smooth connection between notes',
  'tie': 'Hold note for combined duration',
  'staccato': 'Short and detached',
  'accent': 'Emphasized note',
  'pause': 'Hold note longer than written',
  'fermata': 'Hold note longer than written'
} as const
export type ArticulationSignsDefinitionsKeys = keyof typeof ARTICULATION_SIGNS_DEFINITIONS
export type ArticulationSignsDefinitions = (typeof ARTICULATION_SIGNS_DEFINITIONS)[ArticulationSignsDefinitionsKeys]
