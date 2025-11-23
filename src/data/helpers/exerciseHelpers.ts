import { ACCIDENTALS, ALTO_PITCH_DEFINITIONS, BASS_PITCH_DEFINITIONS, TENOR_PITCH_DEFINITIONS, TREBLE_PITCH_DEFINITIONS, type AccidentalType, type ClefType, type Note } from '@leonkwan46/music-notation'
import { STAGE_ONE_KEYS, STAGE_THREE_KEYS, STAGE_TWO_KEYS } from '../stageSyllabus/keySignatures'
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
} from '../stageSyllabus/noteValues'
import { STAGE_ONE_TIME_SIGNATURES, STAGE_THREE_TIME_SIGNATURES, STAGE_TWO_TIME_SIGNATURES, STAGE_ZERO_TIME_SIGNATURES } from '../stageSyllabus/timeSignatures'
import { Question, StageNumber } from '../theoryData/types'
import { getRandomItem, shuffleArray } from './questionHelpers'


export const getBasicNoteTypes = (stage: StageNumber) => {
  switch (stage) {
    case 0:
      return STAGE_ZERO_NOTE_TYPES
    case 1:
      return STAGE_ONE_NOTE_TYPES
    case 2:
      return []
    case 3:
      throw new Error('Stage 3 note types not yet implemented')
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
    case 3:
      throw new Error('Stage 3 all note types not yet implemented')
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
    case 3:
      throw new Error('Stage 3 rest types not yet implemented')
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
    case 3:
      throw new Error('Stage 3 all rest types not yet implemented')
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

export const isSameQuestion = (
  q1: Question,
  q2: Question,
  getDuplicateIdentifier: (question: Question) => string | null
): boolean => {
  const key1 = getDuplicateIdentifier(q1)
  const key2 = getDuplicateIdentifier(q2)
  return key1 !== null && key2 !== null && key1 === key2
}

export const generateQuestionsFromPool = (
  uniquePool: Question[],
  questionsCount: number,
  getDuplicateIdentifier: (question: Question) => string | null,
  options: { deduplicationWindow?: number } = {}
): Question[] => {
  const windowSize = options.deduplicationWindow ?? 3
  const recentKeys: string[] = []
  const questions: Question[] = []
  
  const questionsByKey = new Map<string, Question[]>()
  uniquePool.forEach(q => {
    const key = getDuplicateIdentifier(q)
    if (key) {
      if (!questionsByKey.has(key)) {
        questionsByKey.set(key, [])
      }
      questionsByKey.get(key)!.push(q)
    }
  })
  
  const availableKeys = Array.from(questionsByKey.keys())
  if (availableKeys.length === 0) {
    console.warn('No valid question keys found in pool')
    return []
  }
  
  let shuffledKeys = shuffleArray([...availableKeys])
  let keyIndex = 0
  let attempts = 0
  const maxAttempts = availableKeys.length * 2
  
  while (questions.length < questionsCount && attempts < maxAttempts) {
    attempts++
    
    if (keyIndex >= shuffledKeys.length) {
      recentKeys.length = 0
      shuffledKeys = shuffleArray([...availableKeys])
      keyIndex = 0
    }
    
    const candidateKey = shuffledKeys[keyIndex]
    
    if (recentKeys.includes(candidateKey)) {
      keyIndex++
      continue
    }
    
    const questionsWithKey = questionsByKey.get(candidateKey)!
    const candidate = getRandomItem(questionsWithKey)
    
    const clonedCandidate: Question = {
      ...candidate,
      id: `${candidate.id}-${questions.length}`
    }
    
    questions.push(clonedCandidate)
    recentKeys.push(candidateKey)
    
    if (recentKeys.length > windowSize) {
      recentKeys.shift()
    }
    
    keyIndex++
  }
  
  if (questions.length < questionsCount) {
    console.warn(
      `Only generated ${questions.length} questions out of ${questionsCount} requested. ` +
      'Pool may be too small or deduplication window too large.'
    )
  }
  
  return balanceCorrectAnswerPositions(questions)
}

export const balanceCorrectAnswerPositions = (questions: Question[]): Question[] => {
  const positionCounts = new Map<number, number[]>()
  
  return questions.map(question => {
    // Skip balancing for True/False questions - they should always have fixed order (True, False)
    if (question.type === 'trueFalse') {
      return question
    }
    
    const choices = question.choices
    if (!choices || choices.length <= 1) {
      return question
    }

    const correctIndex = choices.findIndex(choice => choice === question.correctAnswer)
    if (correctIndex === -1) {
      return question
    }

    let counts = positionCounts.get(choices.length)
    if (!counts) {
      counts = new Array(choices.length).fill(0)
      positionCounts.set(choices.length, counts)
    }

    const minCount = Math.min(...counts)
    const candidateIndexes = counts
      .map((count, index) => (count === minCount ? index : -1))
      .filter(index => index !== -1)

    let targetIndex = correctIndex
    if (!candidateIndexes.includes(correctIndex)) {
      targetIndex = candidateIndexes[Math.floor(Math.random() * candidateIndexes.length)]
    }

    counts[targetIndex] += 1

    if (targetIndex === correctIndex) {
      return question
    }

    const newChoices = [...choices]
    ;[newChoices[correctIndex], newChoices[targetIndex]] = [
      newChoices[targetIndex],
      newChoices[correctIndex]
    ]

    return {
      ...question,
      choices: newChoices
    }
  })
}
