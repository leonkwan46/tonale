import type { RhythmPatternConfig, StrictnessConfig } from '../types'

// Note beat values in relation to a crotchet (quarter note = 1 beat)
export const NOTE_BEAT_VALUES: Record<string, number> = {
  semibreve: 4, // Whole note
  minim: 2, // Half note
  crotchet: 1, // Quarter note
  quaver: 0.5, // Eighth note
  quaverTriplet: 0.333, // Eighth note triplet
  semiquaver: 0.25 // Sixteenth note
}

// Default constants
export const DEFAULT_TEMPO = 90
export const MIN_PATTERN_LENGTH = 2
export const BEAT_TOLERANCE = 0.01
export const TIMING_STRICTNESS_LEVEL = 2

// Strictness configuration levels (1 = most lenient, 5 = strictest)
export const STRICTNESS_CONFIG: StrictnessConfig[] = [
  // Level 1 - Very lenient (for beginners)
  {
    tolerance: 0.08,
    relative: 0.15,
    match: 0.7,
    tempoMin: 0.65,
    tempoMax: 1.6
  },
  // Level 2 - Lenient (default for early stages)
  {
    tolerance: 0.06,
    relative: 0.12,
    match: 0.7,
    tempoMin: 0.75,
    tempoMax: 1.4
  },
  // Level 3 - Moderate
  {
    tolerance: 0.04,
    relative: 0.08,
    match: 0.8,
    tempoMin: 0.8,
    tempoMax: 1.3
  },
  // Level 4 - Strict
  {
    tolerance: 0.025,
    relative: 0.05,
    match: 0.8,
    tempoMin: 0.85,
    tempoMax: 1.2
  },
  // Level 5 - Very strict (for advanced stages)
  {
    tolerance: 0.015,
    relative: 0.03,
    match: 0.9,
    tempoMin: 0.9,
    tempoMax: 1.15
  }
]

/**
 * Get strictness configuration for a given level (1-5)
 */
export const getStrictnessConfig = (level: number): StrictnessConfig => {
  const index = Math.max(0, Math.min(level - 1, STRICTNESS_CONFIG.length - 1))
  return STRICTNESS_CONFIG[index]
}

// Current strictness setting
export const strictness = getStrictnessConfig(TIMING_STRICTNESS_LEVEL)

// Stage-specific rhythm pattern configurations

/**
 * Stage 0 (Initial Grade) - Simple patterns
 * - Crotchets and quavers only
 * - Simple combinations
 * - 4/4 time signature
 */
export const STAGE_ZERO_PATTERN_CONFIG: RhythmPatternConfig = {
  noteGroupings: [
    [1, 1], // Two crotchets
    [0.5, 0.5, 0.5, 0.5], // Four quavers
    [2], // One minim
    [1, 0.5, 0.5], // Crotchet + two quavers
    [0.5, 0.5, 1], // Two quavers + crotchet
    [1, 1, 1, 1], // Four crotchets
    [2, 1, 1], // Minim + two crotchets
    [1, 1, 2] // Two crotchets + minim
  ],
  timeSignature: '4/4',
  minPatternLength: 2
}

/**
 * Stage 1 (Grade 1) - Adds dotted notes
 * - All Stage 0 patterns
 * - Dotted crotchets
 * - More complex combinations
 */
export const STAGE_ONE_PATTERN_CONFIG: RhythmPatternConfig = {
  noteGroupings: [
    ...STAGE_ZERO_PATTERN_CONFIG.noteGroupings,
    [1.5, 0.5], // Dotted crotchet + quaver
    [0.5, 1.5], // Quaver + dotted crotchet
    [1.5, 0.5, 1], // Dotted crotchet + quaver + crotchet
    [1, 1.5, 0.5], // Crotchet + dotted crotchet + quaver
    [0.5, 0.5, 0.5, 1.5], // Three quavers + dotted crotchet
    [1.5, 0.5, 0.5, 0.5] // Dotted crotchet + three quavers
  ],
  timeSignature: '4/4',
  minPatternLength: 2
}

/**
 * Stage 2 (Grade 2) - Adds triplets and 3/4 time
 * - All Stage 1 patterns
 * - Quaver triplets
 * - 3/4 time signature patterns
 */
export const STAGE_TWO_PATTERN_CONFIG: RhythmPatternConfig = {
  noteGroupings: [
    ...STAGE_ONE_PATTERN_CONFIG.noteGroupings,
    [0.333, 0.333, 0.333], // Quaver triplet
    [1, 0.333, 0.333, 0.333], // Crotchet + triplet
    [0.333, 0.333, 0.333, 1], // Triplet + crotchet
    [0.5, 0.5, 0.333, 0.333, 0.333], // Two quavers + triplet
    [0.333, 0.333, 0.333, 0.5, 0.5], // Triplet + two quavers
    // 3/4 time patterns (3 beats total)
    [1, 1, 1], // Three crotchets (3/4)
    [2, 1], // Minim + crotchet (3/4)
    [1, 2] // Crotchet + minim (3/4)
  ],
  timeSignature: '4/4', // Can also support 3/4
  minPatternLength: 2
}

/**
 * Get pattern configuration for a given stage
 */
export const getStagePatternConfig = (stage: number): RhythmPatternConfig => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_PATTERN_CONFIG
    case 1:
      return STAGE_ONE_PATTERN_CONFIG
    case 2:
      return STAGE_TWO_PATTERN_CONFIG
    default:
      return STAGE_ZERO_PATTERN_CONFIG
  }
}
