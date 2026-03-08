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
 * Get pattern configuration for a given stage
 * Currently only supports Stage 0
 */
export const getStagePatternConfig = (stage: number): RhythmPatternConfig => {
  // Only stage 0 is supported for now
  return STAGE_ZERO_PATTERN_CONFIG
}
