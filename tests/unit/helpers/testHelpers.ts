import { getCumulativeNoteDefinitions } from '@/theory/curriculum/config/noteRange'
import { Question, StageNumber } from '@/theory/curriculum/types'
import { getAllNoteTypes, getAllRestTypes, getKeys, getTimeSignatures } from '@/theory/utils/exercise'

export const TEST_STAGES: StageNumber[] = [0, 1, 2]

export const validateQuestionStructure = (question: Question): void => {
  expect(question).toHaveProperty('id')
  expect(question).toHaveProperty('question')
  expect(question).toHaveProperty('correctAnswer')
  expect(question).toHaveProperty('choices')
  expect(question).toHaveProperty('type')
  expect(typeof question.id).toBe('string')
  expect(typeof question.question).toBe('string')
  expect(typeof question.correctAnswer).toBe('string')
  expect(Array.isArray(question.choices)).toBe(true)
  expect(question.choices.length).toBeGreaterThan(0)
}

export const validateCorrectAnswerInChoices = (question: Question): void => {
  expect(question.choices).toContain(question.correctAnswer)
}

export const validateUniqueChoices = (question: Question): void => {
  const uniqueChoices = new Set(question.choices)
  expect(uniqueChoices.size).toBe(question.choices.length)
}

export const validateUniqueQuestions = (questions: Question[]): void => {
  const questionIds = new Set(questions.map(q => q.id))
  expect(questionIds.size).toBe(questions.length)
}

export const validateQuestionCount = (questions: Question[], expectedCount: number): void => {
  expect(questions).toHaveLength(expectedCount)
}

export const validateStageConstraints = (
  questions: Question[],
  stage: StageNumber,
  validator: (question: Question, stage: StageNumber) => boolean
): void => {
  questions.forEach(question => {
    expect(validator(question, stage)).toBe(true)
  })
}

const matchesNoteType = (
  noteType: string | { type: string; dots?: number },
  allowedType: string | { type: string; dots?: number }
): boolean => {
  if (typeof noteType === 'string' && typeof allowedType === 'string') {
    return noteType === allowedType
  }
  if (typeof noteType === 'object' && typeof allowedType === 'object') {
    return noteType.type === allowedType.type && 
           (noteType.dots ?? 0) === (allowedType.dots ?? 0)
  }
  return false
}

export const validateNoteTypeForStage = (
  noteType: string | { type: string; dots?: number } | undefined,
  stage: StageNumber
): void => {
  if (!noteType) {
    throw new Error('Note type is undefined')
  }

  const stageNoteTypes = getAllNoteTypes(stage)
  const matches = stageNoteTypes.some(allowedType => matchesNoteType(noteType, allowedType))
  expect(matches).toBe(true)
}

export const validateRestTypeForStage = (
  restType: string | { type: string; dots?: number } | undefined,
  stage: StageNumber
): void => {
  if (!restType) {
    throw new Error('Rest type is undefined')
  }

  const stageRestTypes = getAllRestTypes(stage)
  const matches = stageRestTypes.some(allowedType => matchesNoteType(restType, allowedType))
  expect(matches).toBe(true)
}

const matchesTimeSignature = (timeSignatureValue: string, allowedTs: string | { topNumber: number; bottomNumber: number }): boolean => {
  if (typeof allowedTs === 'string') {
    return timeSignatureValue === allowedTs
  }
  if (typeof allowedTs === 'object' && 'topNumber' in allowedTs && 'bottomNumber' in allowedTs) {
    const notation = `${allowedTs.topNumber}/${allowedTs.bottomNumber}`
    return timeSignatureValue === notation || timeSignatureValue === allowedTs.toString()
  }
  return false
}

export const validateTimeSignatureForStage = (
  timeSignatureValue: string | undefined,
  stage: StageNumber
): void => {
  if (!timeSignatureValue) {
    throw new Error('Time signature value is undefined')
  }

  const stageTimeSignatures = getTimeSignatures(stage)
  const matches = stageTimeSignatures.some(allowedTs => matchesTimeSignature(timeSignatureValue, allowedTs))
  expect(matches).toBe(true)
}

const keyToString = (key: unknown): string => {
  if (typeof key === 'string') {
    return key
  }
  if (key && typeof key === 'object' && 'toString' in key) {
    return (key as { toString(): string }).toString()
  }
  return String(key)
}

export const validateKeyForStage = (
  keyName: unknown,
  stage: StageNumber
): void => {
  if (!keyName) {
    throw new Error('Key name is undefined')
  }

  const stageKeys = getKeys(stage)
  const keyNameStr = keyToString(keyName)
  const matches = stageKeys.some(allowedKey => keyNameStr === keyToString(allowedKey))
  expect(matches).toBe(true)
}

export const validatePitchForStage = (
  pitch: string | undefined,
  stage: StageNumber,
  clef: 'treble' | 'bass'
): void => {
  if (!pitch) {
    throw new Error('Pitch is undefined')
  }

  const stageNoteDefinitions = getCumulativeNoteDefinitions(stage, clef)
  const stagePitches = stageNoteDefinitions.map(note => note.pitch)
  expect(stagePitches).toContain(pitch)
}
