import { createScaleDegreeQuestion, createScaleDegreeQuestions } from '@/subjects/theory/exercises/generators/scaleDegrees'
import type { Question } from '@/types/lesson'
import { getKeys } from '@/subjects/theory/exercises/utils/exercise'
import {
  validateCorrectAnswerInChoices,
  validateKeyForStage,
  validatePitchForStage,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('scaleDegrees generator', () => {
  describe('createScaleDegreeQuestion', () => {
    describe('Stage 2', () => {
      const stage = 2
      const availableKeys = getKeys(stage)

      describe('Treble clef', () => {
        it('should create a valid question with required fields', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            validateQuestionStructure(question)
          }
        })

        it('should include correct answer in choices', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            validateCorrectAnswerInChoices(question)
          }
        })

        it('should have unique choices', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            validateUniqueChoices(question)
          }
        })

        it('should have type multipleChoice', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            expect(question.type).toBe('multipleChoice')
          }
        })

        it('should have valid visual component', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            expect(question.visualComponent).toBeDefined()
            expect(question.visualComponent?.clef).toBe('treble')
            expect(question.visualComponent?.keyName).toBeDefined()
            expect(question.visualComponent?.elements).toBeDefined()
            expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
            expect(question.visualComponent?.elements?.length).toBe(1)
          }
        })

        it('should have explanation', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            expect(question.explanation).toBeDefined()
            expect(question.explanation?.text).toBeDefined()
            expect(typeof question.explanation?.text).toBe('string')
          }
        })

        it('should only use stage 2 keys', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            const keyName = question.visualComponent?.keyName
            if (keyName) {
              validateKeyForStage(keyName, stage)
            }
          }
        })

        it('should use stage 2 pitch range for treble clef', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble')
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, stage, 'treble')
            }
          }
        })

        it('should accept custom key and degree parameters', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'treble', availableKeys[0], 1)
            expect(question.correctAnswer).toBeDefined()
          }
        })
      })

      describe('Bass clef', () => {
        it('should create a valid question with required fields', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'bass')
            validateQuestionStructure(question)
          }
        })

        it('should include correct answer in choices', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'bass')
            validateCorrectAnswerInChoices(question)
          }
        })

        it('should use stage 2 pitch range for bass clef', () => {
          if (availableKeys.length > 0) {
            const question = createScaleDegreeQuestion(stage, 'bass')
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, stage, 'bass')
            }
          }
        })
      })
    })
  })

  describe('createScaleDegreeQuestions', () => {
    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createScaleDegreeQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createScaleDegreeQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createScaleDegreeQuestions(3, stage)
        questions.forEach((question: Question) => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should only use stage 2 keys', () => {
        const questions = createScaleDegreeQuestions(10, stage)
        questions.forEach((question: Question) => {
          const keyName = question.visualComponent?.keyName
          if (keyName) {
            validateKeyForStage(keyName, stage)
          }
        })
      })

      it('should include both treble and bass clef questions', () => {
        const questions = createScaleDegreeQuestions(10, stage)
        const trebleQuestions = questions.filter((q: Question) => q.visualComponent?.clef === 'treble')
        const bassQuestions = questions.filter((q: Question) => q.visualComponent?.clef === 'bass')
        expect(trebleQuestions.length).toBeGreaterThan(0)
        expect(bassQuestions.length).toBeGreaterThan(0)
      })
    })
  })
})

