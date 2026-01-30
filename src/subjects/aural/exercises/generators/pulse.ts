// import { generateQuestionId } from '@/theory/exercises/utils/question'
import {
  getPulseStrictnessConfig,
  pulseStrictness
} from '../../curriculum/config/pulse'
import type { PulseExercise, Question, StageNumber } from '../../curriculum/types'

/**
 * TODO: Add pulse exercises when song files are available
 * Example structure:
 * const PULSE_EXERCISES: PulseExercise[] = [
 *   {
 *     audioFile: require('../../../../../assets/sounds/songs/chopin-1.mp3'),
 *     duration: 30,
 *     tempo: 85
 *   },
 *   // ... more songs
 * ]
 */
const PULSE_EXERCISES: PulseExercise[] = []

/**
 * Normalize timestamps to start at 0
 */
const normalizeTimestamps = (timestamps: number[]): number[] => {
  if (timestamps.length === 0) return []
  const firstTimestamp = timestamps[0]
  return timestamps.map(ts => ts - firstTimestamp)
}

/**
 * Calculate intervals between consecutive timestamps
 */
const calculateIntervals = (timestamps: number[]): number[] => {
  const intervals: number[] = []
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1])
  }
  return intervals
}

/**
 * Compare user pulse taps with expected steady pulse.
 * Uses tolerance-based matching with outlier detection.
 *
 * @param userTimestamps - Timestamps of user taps
 * @param expectedTimestamps - Expected pulse timestamps
 * @param strictnessLevel - Optional strictness level (1-5)
 * @returns True if pulse matches within tolerance
 */
export const comparePulsePattern = (
  userTimestamps: number[],
  expectedTimestamps: number[],
  strictnessLevel?: number
): boolean => {
  // Minimum taps required
  if (userTimestamps.length < 3 || expectedTimestamps.length === 0) {
    return false
  }

  const strictness = strictnessLevel
    ? getPulseStrictnessConfig(strictnessLevel)
    : pulseStrictness

  // Normalize both arrays to start at 0
  const userTimestampsFromStart = normalizeTimestamps(userTimestamps)
  const expectedTimestampsFromStart = normalizeTimestamps(expectedTimestamps)

  // Calculate intervals
  const userBeatIntervals = calculateIntervals(userTimestampsFromStart)
  const expectedBeatIntervals = calculateIntervals(expectedTimestampsFromStart)

  // Get expected beat duration (should be consistent)
  const expectedBeatInterval = expectedBeatIntervals[0] || 0
  if (expectedBeatInterval === 0) {
    return false
  }

  // Calculate tolerance
  const relativeTolerance = expectedBeatInterval * strictness.relative
  const absoluteTolerance = Math.min(strictness.tolerance, relativeTolerance)

  let matchingIntervalsCount = 0
  let outlierCount = 0

  const startIndex = 1 // Skip first interval as it might be reaction time

  // Check each interval
  for (let i = startIndex; i < userBeatIntervals.length; i++) {
    const userInterval = userBeatIntervals[i]
    const intervalDifference = Math.abs(userInterval - expectedBeatInterval)
    const isMatch = intervalDifference <= absoluteTolerance
    const isOutlier = intervalDifference > expectedBeatInterval * strictness.outlierThreshold

    if (isOutlier) outlierCount++
    if (isMatch) matchingIntervalsCount++
  }

  // Count first interval if it's not being skipped
  if (userBeatIntervals.length > 0) {
    matchingIntervalsCount++
  }

  // Check outlier ratio
  const intervalsToEvaluate = Math.max(1, userBeatIntervals.length - startIndex)
  const outlierRatio = outlierCount / intervalsToEvaluate
  if (outlierRatio > strictness.maxOutlierRatio) {
    return false
  }

  // Check match ratio
  const minimumRequiredMatches = Math.ceil(userBeatIntervals.length * strictness.match)
  return matchingIntervalsCount >= minimumRequiredMatches
}

/**
 * Create pulse tapping questions.
 * Currently returns empty array until song files are available.
 *
 * @param count - Number of questions to generate
 * @param stage - Stage number (difficulty level)
 * @param exercises - Optional custom exercises array (for testing)
 * @returns Array of pulse questions
 */
export const createPulseQuestions = (
  count: number,
  stage: StageNumber,
  exercises?: PulseExercise[]
): Question[] => {
  const exercisesToUse = exercises || PULSE_EXERCISES

  if (exercisesToUse.length === 0) {
    console.warn('Pulse exercises not yet implemented - awaiting song files')
    return []
  }

  // TODO: Implement when song files are available
  // Shuffle exercises and select count
  // Calculate pulse timestamps based on tempo
  // Return Question objects with audioFile in questionInterface

  return []
}
