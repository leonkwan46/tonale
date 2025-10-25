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
  
export const GRADE_ONE_ARTICULATION_TERMS = {
  'legato': 'Smooth and connected',
  'staccato': 'Short and detached',
  'stacc.': 'Short and detached'
} as const

export const GRADE_ONE_EXPRESSION_TERMS = {
  'cantabile': 'In a singing style',
  'dolce': 'Sweetly'
} as const
  
export const GRADE_ONE_PERFORMANCE_TERMS = {
  'da capo': 'From the beginning',
  'd.c.': 'From the beginning',
  'fine': 'End',
  'al fine': 'To the end'
} as const

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
  
export const GRADE_ONE_ARTICULATION_SIGNS = {
  'slur': '\u{1D17A}',
  'tie': '\u{1D17B}',
  'staccato': '\u{1D17C}',
  'accent': '\u{1D17D}',
  'pause': '\u{1D17E}',
  'fermata': '\u{1D17E}'
} as const

  
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

export const GRADE_TWO_EXPRESSION_TERMS = {
  'alla marcia': 'In march style',
  'espressivo': 'Expressively',
  'espress.': 'Expressively',
  'grazioso': 'Gracefully'
} as const

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

export const GRADE_TWO_PERFORMANCE_TERMS = {
  'dal segno': 'From the sign',
  'd.s.': 'From the sign'
} as const

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

export const GRADE_TWO_DYNAMIC_SYMBOLS = {
  'fp': '\u{E534}'
} as const
  
// ======================
// GRADE THREE MUSICAL TERMS
// ======================

export const GRADE_THREE_TEMPO_TERMS = {
  'andantino': 'Slightly faster than andante',
  'prestissimo': 'As fast as possible'
} as const

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

export const GRADE_THREE_ARTICULATION_TERMS = {
  'marcato': 'Marked, emphasized',
  'marc.': 'Marked, emphasized',
  'sforzando': 'Sudden strong accent',
  'sforzato': 'Sudden strong accent'
} as const

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

export const GRADE_THREE_ITALIAN_WORDS = {
  'ben': 'Well',
  'prima': 'First',
  'primo': 'First',
  'semplice': 'Simply',
  'sempre': 'Always',
  'simile': 'In the same way',
  'sim.': 'In the same way'
} as const

export const GRADE_THREE_DYNAMIC_SYMBOLS = {
  'sfz': '\u{E539}',
  'sf': '\u{E536}'
} as const
  
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

export const ARTICULATION_SIGNS_DEFINITIONS = {
  'slur': 'Smooth connection between notes',
  'tie': 'Hold note for combined duration',
  'staccato': 'Short and detached',
  'accent': 'Emphasized note',
  'pause': 'Hold note longer than written',
  'fermata': 'Hold note longer than written'
} as const
