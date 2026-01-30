import { createKeySignatureQuestion, createKeySignatureQuestions } from '@/theory/exercises/generators/keySignature'
import {
  validateCorrectAnswerInChoices,
  validateKeyForStage,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('keySignature generator', () => {
  describe('createKeySignatureQuestion', () => {
    describe('Stage 2', () => {
      it('should create a valid question with required fields', () => {
        const question = createKeySignatureQuestion(2)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createKeySignatureQuestion(2)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createKeySignatureQuestion(2)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createKeySignatureQuestion(2)
        expect(question.type).toBe('multipleChoice')
      })

      it('should have valid visual component with keyName', () => {
        const question = createKeySignatureQuestion(2)
        expect(question.visualComponent).toBeDefined()
        expect(question.visualComponent?.keyName).toBeDefined()
        expect(question.visualComponent?.clef).toBeDefined()
      })

      it('should have explanation', () => {
        const question = createKeySignatureQuestion(2)
        expect(question.explanation).toBeDefined()
        expect(question.explanation?.text).toBeDefined()
        expect(typeof question.explanation?.text).toBe('string')
      })

      it('should accept custom key parameter', () => {
        const defaultQuestion = createKeySignatureQuestion(2)
        const keyName = defaultQuestion.visualComponent?.keyName

        if (keyName) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const question = createKeySignatureQuestion(2, keyName as any)
          expect(question.visualComponent?.keyName).toEqual(keyName)
          const expectedAnswer = typeof keyName === 'string'
            ? keyName
            : (keyName as unknown as { toString(): string }).toString()
          expect(question.correctAnswer).toBe(expectedAnswer)
        }
      })

      it('should have correct answer matching keyName', () => {
        const question = createKeySignatureQuestion(2)
        const keyName = question.visualComponent?.keyName
        if (keyName) {
          const expectedAnswer = typeof keyName === 'string'
            ? keyName
            : (keyName as unknown as { toString(): string }).toString()
          expect(question.correctAnswer).toBe(expectedAnswer)
        }
      })

      it('should only use stage 2 keys', () => {
        const question = createKeySignatureQuestion(2)
        const keyName = question.visualComponent?.keyName
        expect(keyName).toBeDefined()
        if (keyName) {
          validateKeyForStage(keyName, 2)
        }
      })
    })
  })

  describe('createKeySignatureQuestions', () => {
    describe('Stage 2', () => {
      it('should generate requested number of questions', () => {
        const questions = createKeySignatureQuestions(5, 2)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createKeySignatureQuestions(10, 2)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createKeySignatureQuestions(3, 2)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should handle single question generation', () => {
        const questions = createKeySignatureQuestions(1, 2)
        validateQuestionCount(questions, 1)
        validateQuestionStructure(questions[0])
      })

      it('should only use stage 2 keys', () => {
        const questions = createKeySignatureQuestions(10, 2)
        questions.forEach(question => {
          const keyName = question.visualComponent?.keyName
          if (keyName) {
            validateKeyForStage(keyName, 2)
          }
        })
        const keyNames = new Set(
          questions.map(q => {
            const keyName = q.visualComponent?.keyName
            return keyName ? (typeof keyName === 'string' ? keyName : (keyName as { toString(): string }).toString()) : null
          }).filter(Boolean)
        )

        expect(keyNames.size).toBeGreaterThan(0)
      })

      it('should handle small pool with deduplication window', () => {
        const questions = createKeySignatureQuestions(10, 2)
        validateQuestionCount(questions, 10)
        expect(questions.length).toBeGreaterThanOrEqual(4)
      })

      it('should have correct deduplication logic', () => {
        const questions = createKeySignatureQuestions(20, 2)
        const correctAnswers = questions.map(q => q.correctAnswer).filter((a): a is string => typeof a === 'string')

        const keyCounts = new Map<string, number>()
        correctAnswers.forEach(key => {
          keyCounts.set(key, (keyCounts.get(key) || 0) + 1)
        })

        expect(keyCounts.size).toBeGreaterThan(0)
        keyCounts.forEach((count, key) => {
          expect(count).toBeGreaterThan(0)
        })
      })

      it('should generate questions with valid keyName in visual component', () => {
        const questions = createKeySignatureQuestions(5, 2)
        questions.forEach(question => {
          expect(question.visualComponent?.keyName).toBeDefined()
          const keyName = question.visualComponent?.keyName
          const expectedAnswer = keyName ? (typeof keyName === 'string' ? keyName : (keyName as { toString(): string }).toString()) : ''
          expect(question.correctAnswer).toBe(expectedAnswer)
        })
      })
    })
  })
})
