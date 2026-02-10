import type { PulseStrictnessConfig } from '../types'

// Default constants
export const DEFAULT_TEMPO = 85
export const DEFAULT_TIME_SIGNATURE = '4/4'
export const TIMING_STRICTNESS_LEVEL = 3

// Pulse strictness configuration levels (1 = most lenient, 5 = strictest)
export const PULSE_STRICTNESS_CONFIG: PulseStrictnessConfig[] = [
  // Level 1 - Very lenient
  {
    tolerance: 0.15,
    relative: 0.25,
    match: 0.6,
    outlierThreshold: 0.5,
    maxOutlierRatio: 0.2
  },
  // Level 2 - Lenient
  {
    tolerance: 0.12,
    relative: 0.2,
    match: 0.7,
    outlierThreshold: 0.4,
    maxOutlierRatio: 0.15
  },
  // Level 3 - Moderate (default)
  {
    tolerance: 0.1,
    relative: 0.15,
    match: 0.7,
    outlierThreshold: 0.35,
    maxOutlierRatio: 0.12
  },
  // Level 4 - Strict
  {
    tolerance: 0.08,
    relative: 0.12,
    match: 0.8,
    outlierThreshold: 0.3,
    maxOutlierRatio: 0.1
  },
  // Level 5 - Very strict
  {
    tolerance: 0.06,
    relative: 0.1,
    match: 0.8,
    outlierThreshold: 0.25,
    maxOutlierRatio: 0.08
  }
]

/**
 * Get pulse strictness configuration for a given level (1-5)
 */
export const getPulseStrictnessConfig = (level: number): PulseStrictnessConfig => {
  const index = Math.max(0, Math.min(level - 1, PULSE_STRICTNESS_CONFIG.length - 1))
  return PULSE_STRICTNESS_CONFIG[index]
}

// Current strictness setting
export const pulseStrictness = getPulseStrictnessConfig(TIMING_STRICTNESS_LEVEL)

/**
 * Calculate pulse timestamps for a melody
 * @param melodyDurations - Array of note durations in beats
 * @param tempo - BPM (beats per minute)
 * @param timeSignature - Time signature (default '4/4')
 * @returns Array of timestamps in seconds when pulse beats should occur
 */
export const calculatePulseTimestamps = (
  melodyDurations: number[],
  tempo: number,
  timeSignature: string = DEFAULT_TIME_SIGNATURE
): number[] => {
  const beatDuration = 60 / tempo // Duration of one beat in seconds
  const timestamps: number[] = []
  let currentTime = 0

  // Calculate total duration
  const totalDuration = melodyDurations.reduce((sum, duration) => sum + duration, 0) * beatDuration

  // Generate pulse beats at regular intervals
  while (currentTime < totalDuration) {
    timestamps.push(currentTime)
    currentTime += beatDuration
  }

  return timestamps
}
