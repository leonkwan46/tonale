import { NOTE_BEAT_VALUES } from './rhythm'

export { DEFAULT_TEMPO } from './rhythm'

export const DEFAULT_TIME_SIGNATURE = '4/4'
export const TIMING_STRICTNESS_LEVEL = 3

export interface PulseStrictnessConfig {
  tolerance: number
  relative: number
  match: number
  outlierThreshold: number
  maxOutlierRatio: number
}

export const PULSE_STRICTNESS_CONFIG: PulseStrictnessConfig[] = [
  { tolerance: 0.15, relative: 0.25, match: 0.6, outlierThreshold: 0.5, maxOutlierRatio: 0.2 },
  { tolerance: 0.12, relative: 0.2, match: 0.7, outlierThreshold: 0.4, maxOutlierRatio: 0.15 },
  { tolerance: 0.1, relative: 0.15, match: 0.7, outlierThreshold: 0.35, maxOutlierRatio: 0.12 },
  { tolerance: 0.08, relative: 0.12, match: 0.8, outlierThreshold: 0.3, maxOutlierRatio: 0.1 },
  { tolerance: 0.06, relative: 0.1, match: 0.8, outlierThreshold: 0.25, maxOutlierRatio: 0.08 }
]

export const getPulseStrictnessConfig = (level: number): PulseStrictnessConfig => {
  const index = Math.max(0, Math.min(level - 1, PULSE_STRICTNESS_CONFIG.length - 1))
  return PULSE_STRICTNESS_CONFIG[index]
}

export const pulseStrictness = getPulseStrictnessConfig(TIMING_STRICTNESS_LEVEL)

/**
 * Parse time signature string (e.g., '4/4', '3/4') and return beats per bar
 */
export const getBeatsPerBar = (timeSignature: string): number => {
  const match = timeSignature.match(/^(\d+)\/(\d+)$/)
  if (!match) {
    throw new Error(`Invalid time signature format: ${timeSignature}. Expected format: 'X/Y'`)
  }
  return parseInt(match[1], 10)
}

/**
 * Convert note type to beat value
 * Handles dotted notes (1 dot = 1.5x, 2 dots = 1.75x)
 */
export const noteTypeToBeats = (noteType: string, dots: number = 0): number => {
  const baseBeats = NOTE_BEAT_VALUES[noteType] || 1
  if (dots === 1) return baseBeats * 1.5
  if (dots === 2) return baseBeats * 1.75
  return baseBeats
}

/**
 * Convert note type to duration in seconds
 */
export const noteTypeToDuration = (noteType: string, tempo: number, dots: number = 0): number => {
  const beats = noteTypeToBeats(noteType, dots)
  const beatDuration = 60 / tempo
  return beats * beatDuration
}

/**
 * Calculate pulse timestamps from melody
 * Generates steady beat timestamps based on time signature and tempo
 */
export const calculatePulseTimestamps = (
  melodyDurations: number[],
  tempo: number,
  timeSignature: string = DEFAULT_TIME_SIGNATURE
): number[] => {
  const beatDuration = 60 / tempo // Duration of one beat in seconds
  
  // Calculate total melody duration
  const totalDuration = melodyDurations.reduce((sum, dur) => sum + dur, 0)
  
  // Generate pulse timestamps at regular beat intervals
  const pulseTimestamps: number[] = [0]
  let currentTime = beatDuration
  
  while (currentTime <= totalDuration) {
    pulseTimestamps.push(currentTime)
    currentTime += beatDuration
  }
  
  return pulseTimestamps
}

