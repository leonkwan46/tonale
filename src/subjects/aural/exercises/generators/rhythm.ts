import { generateQuestionId } from '@/subjects/theory/exercises/utils/question'
import {
    DEFAULT_TEMPO,
    getStagePatternConfig,
    getStrictnessConfig,
    MIN_PATTERN_LENGTH,
    TIMING_STRICTNESS_LEVEL
} from '../../curriculum/config/rhythm'
import type { Question, QuestionInterface, StageNumber } from '../../curriculum/types'

/**
 * Convert note durations to timestamps
 * @param durations - Array of note durations in beats
 * @returns Array of timestamps in seconds when each note should be played
 */
export const convertDurationsToTimestamps = (durations: number[]): number[] => {
  if (durations.length === 0) return []

  const timestamps: number[] = [0]
  let currentTime = 0

  for (let i = 0; i < durations.length - 1; i++) {
    currentTime += durations[i]
    timestamps.push(currentTime)
  }

  return timestamps
}

/**
 * Generate a random rhythm pattern based on stage difficulty
 */
const generateRhythmPattern = (stage: StageNumber): number[] => {
  const config = getStagePatternConfig(stage)
  const groupings = config.noteGroupings

  // Select random grouping
  const selectedGrouping = groupings[Math.floor(Math.random() * groupings.length)]

  // Ensure minimum pattern length
  if (selectedGrouping.length < MIN_PATTERN_LENGTH) {
    // Combine with another random grouping
    const additionalGrouping = groupings[Math.floor(Math.random() * groupings.length)]
    return [...selectedGrouping, ...additionalGrouping]
  }

  return selectedGrouping
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
 * Normalize timestamps to start at 0
 */
const normalizeTimestamps = (timestamps: number[]): number[] => {
  if (timestamps.length === 0) return []
  const firstTimestamp = timestamps[0]
  return timestamps.map(ts => ts - firstTimestamp)
}

/**
 * Compare user rhythm pattern with expected pattern.
 * Allows for tempo variations and uses tolerance-based matching.
 *
 * @param userTimestamps - Timestamps of user taps
 * @param expectedTimestamps - Expected timestamps
 * @param tolerance - Optional custom tolerance (uses default if not provided)
 * @returns True if rhythm matches within tolerance
 */
export const compareRhythmPattern = (
  userTimestamps: number[],
  expectedTimestamps: number[],
  tolerance?: number
): boolean => {
  // Length check (allow ±1 tap difference)
  if (Math.abs(userTimestamps.length - expectedTimestamps.length) > 1) {
    return false
  }

  if (userTimestamps.length === 0 || expectedTimestamps.length === 0) {
    return false
  }

  // Normalize both arrays to start at 0
  const userNormalized = normalizeTimestamps(userTimestamps)
  const expectedNormalized = normalizeTimestamps(expectedTimestamps)

  // Calculate tempo scaling (user might tap faster/slower)
  const userDuration = userNormalized[userNormalized.length - 1] || 1
  const expectedDuration = expectedNormalized[expectedNormalized.length - 1] || 1
  const tempoRatio = userDuration / expectedDuration

  const strictness = getStrictnessConfig(TIMING_STRICTNESS_LEVEL)

  // Check if tempo ratio is within acceptable range
  if (tempoRatio < strictness.tempoMin || tempoRatio > strictness.tempoMax) {
    return false
  }

  // Compare intervals between consecutive taps
  const userIntervals = calculateIntervals(userNormalized)
  const expectedIntervals = calculateIntervals(expectedNormalized)

  let matchingCount = 0
  const numIntervals = Math.min(userIntervals.length, expectedIntervals.length)

  for (let i = 0; i < numIntervals; i++) {
    const userInterval = userIntervals[i]
    const expectedInterval = expectedIntervals[i]

    // Calculate tolerance for this interval
    const baseTolerance = tolerance ?? strictness.tolerance
    const relativeTolerance = expectedInterval * strictness.relative
    const finalTolerance = Math.max(relativeTolerance, baseTolerance)

    // Try both scaled and unscaled comparison (user may have matched rhythm but at different tempo)
    const scaledExpected = expectedInterval * tempoRatio
    const diffScaled = Math.abs(userInterval - scaledExpected)
    const diffUnscaled = Math.abs(userInterval - expectedInterval)
    const diff = Math.min(diffScaled, diffUnscaled)

    if (diff <= finalTolerance) {
      matchingCount++
    }
  }

  const minimumRequired = Math.ceil(numIntervals * strictness.match)
  return matchingCount >= minimumRequired
}

/**
 * Create rhythm echo questions for a given stage
 *
 * @param count - Number of questions to generate
 * @param stage - Stage number (difficulty level)
 * @returns Array of rhythm echo questions
 */
export const createRhythmQuestions = (
  count: number,
  stage: StageNumber
): Question[] => {
  const questions: Question[] = []

  for (let i = 0; i < count; i++) {
    const pattern = generateRhythmPattern(stage)
    const timestamps = convertDurationsToTimestamps(pattern)
    const tempo = DEFAULT_TEMPO

    questions.push({
      id: generateQuestionId('rhythm-echo'),
      question: 'Clap back the rhythm you hear.',
      correctAnswer: timestamps,
      choices: [],
      explanation: {
        text: 'Listen carefully to the rhythm and clap it back as accurately as possible.'
      },
      type: 'rhythmTap',
      answerInterface: 'rhythmTap',
      questionInterface: {
        type: 'playback',
        rhythm: pattern,
        tempo
      } as QuestionInterface,
      stage
    })
  }

  return questions
}
