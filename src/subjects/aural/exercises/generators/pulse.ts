import { generateQuestionId } from '@/subjects/theory/exercises/utils/question'
import { DEFAULT_TEMPO, getPulseStrictnessConfig, pulseStrictness } from '../../curriculum/config/pulse'
import { Question, StageNumber, type QuestionInterface } from '../../curriculum/types'

export interface PulseExercise {
  audioFile: ReturnType<typeof require>
  duration: number
  tempo?: number
}

const PULSE_EXERCISES: PulseExercise[] = [
  {
    audioFile: require('../../../../../assets/sounds/songs/chopin-1.mp3'),
    duration: 30,
    tempo: 85
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/grieg-1.mp3'),
    duration: 30,
    tempo: 137
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/mozart-1.mp3'),
    duration: 30,
    tempo: 73
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/mozart-2.mp3'),
    duration: 30,
    tempo: 95
  },
  {
    audioFile: require('../../../../../assets/sounds/songs/schuman-1.mp3'),
    duration: 30,
    tempo: 100
  }
]

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const comparePulsePattern = (
  userTimestamps: number[],
  expectedTimestamps: number[],
  strictnessLevel?: number
): boolean => {
  if (userTimestamps.length < 3 || expectedTimestamps.length === 0) {
    return false
  }

  const strictness = strictnessLevel 
    ? getPulseStrictnessConfig(strictnessLevel)
    : pulseStrictness

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
  
  const userBeatIntervals = calculateIntervals(userTimestampsFromStart)
  const expectedBeatIntervals = calculateIntervals(expectedTimestampsFromStart)
  
  const expectedBeatInterval = expectedBeatIntervals[0] || 0
  if (expectedBeatInterval === 0) {
    return false
  }
  
  const relativeTolerance = expectedBeatInterval * strictness.relative
  const absoluteTolerance = Math.min(strictness.tolerance, relativeTolerance)
  
  let matchingIntervalsCount = 0
  let outlierCount = 0
  
  const startIndex = 1
  
  for (let i = startIndex; i < userBeatIntervals.length; i++) {
    const userInterval = userBeatIntervals[i]
    const intervalDifference = Math.abs(userInterval - expectedBeatInterval)
    const isMatch = intervalDifference <= absoluteTolerance
    const isOutlier = intervalDifference > expectedBeatInterval * strictness.outlierThreshold
    
    if (isOutlier) outlierCount++
    if (isMatch) matchingIntervalsCount++
  }
  
  if (userBeatIntervals.length > 0) {
    matchingIntervalsCount++
  }
  
  const intervalsToEvaluate = Math.max(1, userBeatIntervals.length - startIndex)
  const outlierRatio = outlierCount / intervalsToEvaluate
  if (outlierRatio > strictness.maxOutlierRatio) {
    return false
  }
  
  const minimumRequiredMatches = Math.ceil(userBeatIntervals.length * strictness.match)
  return matchingIntervalsCount >= minimumRequiredMatches
}

export const createPulseQuestions = (
  count: number,
  stage: StageNumber,
  exercises?: PulseExercise[]
): Question[] => {
  const exercisesToUse = exercises || PULSE_EXERCISES

  if (exercisesToUse.length === 0) {
    return []
  }

  const shuffled = shuffleArray(exercisesToUse)
  const exercisesForQuestions = shuffled.slice(0, count)
  const questions: Question[] = []

  for (const exercise of exercisesForQuestions) {
    const tempo = exercise.tempo || DEFAULT_TEMPO

    const beatDuration = 60 / tempo
    const pulseTimestamps: number[] = []
    for (let currentTime = 0; currentTime < exercise.duration; currentTime += beatDuration) {
      pulseTimestamps.push(currentTime)
    }

    questions.push({
      id: generateQuestionId('pulse-tap'),
      title: 'Tap the pulse of the melody you hear.',
      correctAnswer: pulseTimestamps,
      choices: [],
      explanation: 'The pulse should follow a steady beat.',
      answerInterface: 'rhythmTap',
      questionInterface: {
        type: 'playback',
        audioFile: exercise.audioFile,
        tempo
      } as QuestionInterface
    })
  }

  return questions
}
