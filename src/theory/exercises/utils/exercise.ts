import { ACCIDENTALS, ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS, type AccidentalType, type ClefType, type Note } from '@leonkwan46/music-notation'
import { STAGE_ONE_KEYS, STAGE_THREE_KEYS, STAGE_TWO_KEYS } from '../../curriculum/config/keySignatures'
import {
  STAGE_ONE_ALL_NOTE_TYPES,
  STAGE_ONE_ALL_REST_TYPES,
  STAGE_ONE_NOTE_TYPES,
  STAGE_ONE_REST_TYPES,
  STAGE_TWO_ALL_NOTE_TYPES,
  STAGE_TWO_ALL_REST_TYPES,
  STAGE_ZERO_ALL_NOTE_TYPES,
  STAGE_ZERO_ALL_REST_TYPES,
  STAGE_ZERO_NOTE_TYPES,
  STAGE_ZERO_REST_TYPES
} from '../../curriculum/config/noteValues'
import { STAGE_ONE_TIME_SIGNATURES, STAGE_THREE_TIME_SIGNATURES, STAGE_TWO_TIME_SIGNATURES, STAGE_ZERO_TIME_SIGNATURES } from '../../curriculum/config/timeSignatures'
import { Question, StageNumber } from '../../curriculum/types'
import { getRandomItem, shuffleArray } from './question'


export const getBasicNoteTypes = (stage: StageNumber) => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_NOTE_TYPES
    case 1:
      return STAGE_ONE_NOTE_TYPES
    case 2:
      return []
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getAllNoteTypes = (stage: StageNumber) => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_ALL_NOTE_TYPES
    case 1:
      return STAGE_ONE_ALL_NOTE_TYPES
    case 2:
      return STAGE_TWO_ALL_NOTE_TYPES
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getBasicRestTypes = (stage: StageNumber) => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_REST_TYPES
    case 1:
      return STAGE_ONE_REST_TYPES
    case 2:
      return []
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getAllRestTypes = (stage: StageNumber) => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_ALL_REST_TYPES
    case 1:
      return STAGE_ONE_ALL_REST_TYPES
    case 2:
      return STAGE_TWO_ALL_REST_TYPES
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getAccidentals = (stage: StageNumber): AccidentalType[] => {
  switch (stage) {
    case 0:
    case 1:
      return [ACCIDENTALS.SHARP, ACCIDENTALS.FLAT, ACCIDENTALS.NATURAL]
    case 2:
      return [ACCIDENTALS.SHARP, ACCIDENTALS.FLAT, ACCIDENTALS.NATURAL]
    case 3:
      return [ACCIDENTALS.SHARP, ACCIDENTALS.FLAT, ACCIDENTALS.NATURAL]
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getTimeSignatures = (stage: StageNumber) => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_TIME_SIGNATURES
    case 1:
      return STAGE_ONE_TIME_SIGNATURES
    case 2:
      return STAGE_TWO_TIME_SIGNATURES
    case 3:
      return STAGE_THREE_TIME_SIGNATURES
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

export const getKeys = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_KEYS
    case 2:
      return STAGE_TWO_KEYS
    case 3:
      return STAGE_THREE_KEYS
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

/**
 * Shared: get pitch definitions for a clef (used across helpers)
 */
export const getPitchDefinitionsForClef = (clef: ClefType): Note[] => {
  switch (clef) {
    case 'treble':
      return TREBLE_PITCH_DEFINITIONS
    case 'bass':
      return BASS_PITCH_DEFINITIONS
    case 'alto':
      return ALTO_PITCH_DEFINITIONS
    case 'tenor':
      return TENOR_PITCH_DEFINITIONS
    default:
      return TREBLE_PITCH_DEFINITIONS
  }
}

export const getTimeValueKeyFromComponent = (question: Question): string | null => {
  const noteType = question.visualComponent?.noteType
  if (noteType === undefined) return null
  return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
}

export const getQuestionTypeFromId = (questionId: string): 'name' | 'beats' => {
  return questionId.includes('-beats') ? 'beats' : 'name'
}

export const getValueKindFromId = (questionId: string): 'note' | 'rest' => {
  if (questionId.includes('rest-')) return 'rest'
  if (questionId.includes('note-')) return 'note'
  return 'note'
}

/**
 * Group questions by their duplicate identifier
 */
const groupQuestionsByKey = (
  pool: Question[],
  getDuplicateIdentifier: (question: Question) => string | null
): Map<string, Question[]> => {
  const questionsByKey = new Map<string, Question[]>()
  
  for (const question of pool) {
    const key = getDuplicateIdentifier(question)
    if (key) {
      if (!questionsByKey.has(key)) {
        questionsByKey.set(key, [])
      }
      questionsByKey.get(key)!.push(question)
    }
  }
  
  return questionsByKey
}

/**
 * Create a unique clone of a question with a modified ID
 */
const cloneQuestionWithUniqueId = (question: Question, index: number): Question => {
  return {
    ...question,
    id: `${question.id}-${index}`
  }
}

/**
 * Check if a key is in the recent window (to avoid duplicates)
 */
const isKeyInRecentWindow = (key: string, recentKeys: string[]): boolean => {
  return recentKeys.includes(key)
}

/**
 * Update the recent keys window, removing oldest if needed
 */
const updateRecentKeys = (key: string, recentKeys: string[], windowSize: number): void => {
  recentKeys.push(key)
  if (recentKeys.length > windowSize) {
    recentKeys.shift()
  }
}

/**
 * Select a random question from the pool for a given key
 */
const selectQuestionFromKey = (
  key: string,
  questionsByKey: Map<string, Question[]>
): Question | null => {
  const questionsWithKey = questionsByKey.get(key)
  if (!questionsWithKey || questionsWithKey.length === 0) {
    return null
  }
  return getRandomItem(questionsWithKey)
}

export const generateQuestionsFromPool = (
  uniquePool: Question[],
  questionsCount: number,
  getDuplicateIdentifier: (question: Question) => string | null,
  options: { deduplicationWindow?: number } = {}
): Question[] => {
  const windowSize = options.deduplicationWindow ?? 3
  const questions: Question[] = []
  
  // Group questions by duplicate identifier
  const questionsByKey = groupQuestionsByKey(uniquePool, getDuplicateIdentifier)
  const availableKeys = Array.from(questionsByKey.keys())
  
  if (availableKeys.length === 0) {
    console.warn('No valid question keys found in pool')
    return []
  }
  
  // Initialize selection state
  let shuffledKeys = shuffleArray([...availableKeys])
  let keyIndex = 0
  let attempts = 0
  const recentKeys: string[] = []
  const maxAttempts = Math.max(availableKeys.length * 2, questionsCount * 2)
  
  // Generate questions until we have enough or hit max attempts
  while (questions.length < questionsCount && attempts < maxAttempts) {
    attempts++
    
    // Reset and reshuffle if we've exhausted all keys
    if (keyIndex >= shuffledKeys.length) {
      recentKeys.length = 0
      shuffledKeys = shuffleArray([...availableKeys])
      keyIndex = 0
    }
    
    const candidateKey = shuffledKeys[keyIndex]
    keyIndex++
    
    // Skip if this key was recently used (deduplication)
    if (isKeyInRecentWindow(candidateKey, recentKeys)) {
      continue
    }
    
    // Select a random question for this key
    const candidate = selectQuestionFromKey(candidateKey, questionsByKey)
    if (!candidate) {
      continue
    }
    
    // Clone with unique ID and add to results
    const clonedQuestion = cloneQuestionWithUniqueId(candidate, questions.length)
    questions.push(clonedQuestion)
    
    // Track this key in recent window
    updateRecentKeys(candidateKey, recentKeys, windowSize)
  }
  
  // Warn if we couldn't generate enough questions
  if (questions.length < questionsCount) {
    console.warn(
      `Only generated ${questions.length} questions out of ${questionsCount} requested. ` +
      'Pool may be too small or deduplication window too large.'
    )
  }
  
  return balanceCorrectAnswerPositions(questions)
}

/**
 * Check if a question should be skipped from balancing
 */
const shouldSkipBalancing = (question: Question): boolean => {
  // True/False questions should always have fixed order (True, False)
  if (question.type === 'trueFalse') {
    return true
  }
  
  const choices = question.choices
  // Skip questions with 2 or fewer choices - preserve order
  if (!choices || choices.length <= 2) {
    return true
  }
  
  return false
}

/**
 * Find the index of the correct answer in choices
 */
const findCorrectAnswerIndex = (question: Question): number => {
  return question.choices.findIndex(choice => choice === question.correctAnswer)
}

/**
 * Get or initialize position counts for a given choice count
 */
const getPositionCounts = (
  choiceCount: number,
  positionCounts: Map<number, number[]>
): number[] => {
  let counts = positionCounts.get(choiceCount)
  if (!counts) {
    counts = new Array(choiceCount).fill(0)
    positionCounts.set(choiceCount, counts)
  }
  return counts
}

/**
 * Find candidate positions with the minimum count
 */
const findCandidatePositions = (counts: number[]): number[] => {
  const minCount = Math.min(...counts)
  return counts
    .map((count, index) => (count === minCount ? index : -1))
    .filter(index => index !== -1)
}

/**
 * Select target position for balancing (prefer current if balanced, otherwise random from candidates)
 */
const selectTargetPosition = (currentIndex: number, candidateIndexes: number[]): number => {
  if (candidateIndexes.includes(currentIndex)) {
    return currentIndex
  }
  return candidateIndexes[Math.floor(Math.random() * candidateIndexes.length)]
}

/**
 * Swap choices to move correct answer to target position
 */
const swapChoicesToPosition = (
  choices: string[],
  fromIndex: number,
  toIndex: number
): string[] => {
  const newChoices = [...choices]
  ;[newChoices[fromIndex], newChoices[toIndex]] = [
    newChoices[toIndex],
    newChoices[fromIndex]
  ]
  return newChoices
}

/**
 * Balance correct answer positions across questions to avoid patterns
 * Ensures correct answers are distributed evenly across all positions
 */
export const balanceCorrectAnswerPositions = (questions: Question[]): Question[] => {
  const positionCounts = new Map<number, number[]>()
  
  return questions.map(question => {
    // Skip balancing for certain question types
    if (shouldSkipBalancing(question)) {
      return question
    }
    
    const correctIndex = findCorrectAnswerIndex(question)
    if (correctIndex === -1) {
      return question
    }

    const choiceCount = question.choices.length
    const counts = getPositionCounts(choiceCount, positionCounts)
    const candidateIndexes = findCandidatePositions(counts)
    const targetIndex = selectTargetPosition(correctIndex, candidateIndexes)
    
    // Update count for the target position
    counts[targetIndex] += 1

    // If already in correct position, no swap needed
    if (targetIndex === correctIndex) {
      return question
    }

    // Swap choices to balance position
    const newChoices = swapChoicesToPosition(question.choices, correctIndex, targetIndex)

    return {
      ...question,
      choices: newChoices
    }
  })
}
