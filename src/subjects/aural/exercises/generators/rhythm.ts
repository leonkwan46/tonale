import { generateQuestionId } from '@/subjects/theory/exercises/utils/question'
import {
  BEAT_TOLERANCE,
  DEFAULT_TEMPO,
  getStagePatternConfig,
  MIN_PATTERN_LENGTH,
  NOTE_BEAT_VALUES,
  strictness
} from '../../curriculum/config/rhythm'
import { Question, StageNumber, type QuestionInterface } from '../../curriculum/types'

interface RhythmNote {
  type: string
  dots?: number
}

interface RhythmPattern {
  notes: RhythmNote[]
}

const getBeats = (note: RhythmNote | string): number => {
  const type = typeof note === 'string' ? note : note.type
  const dots = typeof note === 'object' ? (note.dots || 0) : 0
  const baseBeats = NOTE_BEAT_VALUES[type] || 1
  if (dots === 1) return baseBeats * 1.5
  if (dots === 2) return baseBeats * 1.75
  return baseBeats
}

const ensureMinimumLength = (group: RhythmNote[], remainingBeats: number): void => {
  if (group.length < MIN_PATTERN_LENGTH) {
    group.push({ type: 'crotchet' })
    if (remainingBeats >= 1) {
      group.push({ type: 'crotchet' })
    }
  }
}

const generateRhythmGroup = (beatsForBar: number, availableGroupings: { beats: number; notes: RhythmNote[] }[]): RhythmNote[] => {
  const group: RhythmNote[] = []
  let remainingBeats = beatsForBar
  while (remainingBeats > BEAT_TOLERANCE) {
    const validGroupings = availableGroupings.filter(grouping => grouping.beats <= remainingBeats + BEAT_TOLERANCE)
    if (validGroupings.length === 0) break
    const selectedGrouping = validGroupings[Math.floor(Math.random() * validGroupings.length)]
    group.push(...selectedGrouping.notes)
    remainingBeats -= selectedGrouping.beats
  }
  ensureMinimumLength(group, remainingBeats)
  return group
}

const generateRhythmPattern = (stage: StageNumber): RhythmPattern => {
  const stageConfig = getStagePatternConfig(stage)
  const bars = stageConfig.defaultBeatsPerBar
  const allNotes: RhythmNote[] = []
  for (const beatsForBar of bars) {
    allNotes.push(...generateRhythmGroup(beatsForBar, stageConfig.availableGroupings))
    }
  return { notes: allNotes }
}

const patternToString = (pattern: RhythmPattern): string => {
  return pattern.notes
    .map(note => `${note.type}${note.dots ? '.'.repeat(note.dots) : ''}`)
    .join(' - ')
}

const patternToTimestamps = (pattern: RhythmPattern, tempo: number = DEFAULT_TEMPO): number[] => {
  const beatDuration = 60 / tempo
  const timestamps: number[] = [0]
  let currentTime = 0
  for (let i = 0; i < pattern.notes.length - 1; i++) {
    currentTime += getBeats(pattern.notes[i]) * beatDuration
    timestamps.push(currentTime)
  }
  return timestamps
}

const rhythmPatternToDurations = (pattern: RhythmPattern, tempo: number = DEFAULT_TEMPO): number[] => {
  const beatDuration = 60 / tempo
  return pattern.notes.map(note => getBeats(note) * beatDuration)
}

export const compareRhythmPattern = (
  userTimestamps: number[],
  expectedTimestamps: number[],
  tolerance: number = strictness.tolerance
): boolean => {
  if (userTimestamps.length === 0 || expectedTimestamps.length === 0) {
    return false
  }

  const normalizeTimestamps = (timestamps: number[]): number[] => 
    timestamps.map(ts => ts - (timestamps[0] || 0))
  
  const calculateIntervals = (timestamps: number[]): number[] => {
    const intervals: number[] = []
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i - 1])
    }
    return intervals
  }

  const userTimestampsFromStart = normalizeTimestamps(userTimestamps)
  const expectedTimestampsFromStart = normalizeTimestamps(expectedTimestamps)
  
  if (Math.abs(userTimestampsFromStart.length - expectedTimestampsFromStart.length) > 1) {
    return false
  }
  
  const userBeatIntervals = calculateIntervals(userTimestampsFromStart)
  const expectedBeatIntervals = calculateIntervals(expectedTimestampsFromStart)
  
  const userTotalDuration = userTimestampsFromStart[userTimestampsFromStart.length - 1] || 0
  const expectedTotalDuration = expectedTimestampsFromStart[expectedTimestampsFromStart.length - 1] || 0
  const tempoRatio = expectedTotalDuration > 0 ? userTotalDuration / expectedTotalDuration : 1
  
  if (tempoRatio < strictness.tempoMin || tempoRatio > strictness.tempoMax) {
    return false
  }
  
  const numIntervalsToCompare = Math.min(userBeatIntervals.length, expectedBeatIntervals.length)
  let matchingIntervalsCount = 0
  
  const startIndex = 1
  
  for (let i = startIndex; i < numIntervalsToCompare; i++) {
    const userInterval = userBeatIntervals[i] ?? 0
    const expectedInterval = expectedBeatIntervals[i] ?? 0
    const expectedIntervalScaledByTempo = expectedInterval * tempoRatio
    
    const diffToScaled = Math.abs(userInterval - expectedIntervalScaledByTempo)
    const diffToOriginal = Math.abs(userInterval - expectedInterval)
    const intervalDifference = Math.min(diffToScaled, diffToOriginal)
    
    const baseInterval = Math.abs(tempoRatio - 1) < 0.1 ? expectedInterval : expectedIntervalScaledByTempo
    const allowedTolerance = Math.max(baseInterval * strictness.relative, tolerance)
    const isMatch = intervalDifference <= allowedTolerance
    if (isMatch) matchingIntervalsCount++
  }
  
  if (numIntervalsToCompare > 0) {
    matchingIntervalsCount++
  }
  
  const minimumRequiredMatches = Math.ceil(numIntervalsToCompare * strictness.match)
  return matchingIntervalsCount >= minimumRequiredMatches
}

export const createRhythmQuestions = (
  count: number,
  stage: StageNumber
): Question[] => {
  const questions: Question[] = []
  for (let i = 0; i < count; i++) {
    const pattern = generateRhythmPattern(stage)
    const patternString = patternToString(pattern)
    const timestamps = patternToTimestamps(pattern, DEFAULT_TEMPO)
    const durations = rhythmPatternToDurations(pattern, DEFAULT_TEMPO)
    
    questions.push({
      id: generateQuestionId('rhythm-echo'),
      title: 'Clap back the rhythm you hear.',
      correctAnswer: timestamps,
      choices: [],
      explanation: `The rhythm pattern is: ${patternString}`,
      answerInterface: 'rhythmTap',
      questionInterface: {
        type: 'playback',
        rhythm: durations,
        tempo: DEFAULT_TEMPO
      } as QuestionInterface
    })
  }
  return questions
}
