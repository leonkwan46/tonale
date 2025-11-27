import { Question, StageNumber } from '@/theory/curriculum/types'

/**
 * Test stage constants
 */
export const TEST_STAGES: StageNumber[] = [0, 1, 2]

/**
 * Validates that a question has all required fields
 */
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

/**
 * Validates that the correct answer is included in choices
 */
export const validateCorrectAnswerInChoices = (question: Question): void => {
  expect(question.choices).toContain(question.correctAnswer)
}

/**
 * Validates that choices are unique
 */
export const validateUniqueChoices = (question: Question): void => {
  const uniqueChoices = new Set(question.choices)
  expect(uniqueChoices.size).toBe(question.choices.length)
}

/**
 * Validates that questions are unique (no exact duplicates)
 */
export const validateUniqueQuestions = (questions: Question[]): void => {
  const questionIds = new Set(questions.map(q => q.id))
  expect(questionIds.size).toBe(questions.length)
}

/**
 * Validates that the requested number of questions was generated
 */
export const validateQuestionCount = (questions: Question[], expectedCount: number): void => {
  expect(questions).toHaveLength(expectedCount)
}

/**
 * Validates that questions respect stage constraints
 */
export const validateStageConstraints = (
  questions: Question[],
  stage: StageNumber,
  validator: (question: Question, stage: StageNumber) => boolean
): void => {
  questions.forEach(question => {
    expect(validator(question, stage)).toBe(true)
  })
}

