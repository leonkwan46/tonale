import { createSymbolQuestions } from '@/subjects/theory/exercises/generators/symbol'
import {
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('symbol generator', () => {
  describe('createSymbolQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createSymbolQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createSymbolQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createSymbolQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
        })
      })

      it('should use tie and slur definition questions', () => {
        const questions = createSymbolQuestions(10, stage)
        questions.forEach(question => {
          expect(question.correctAnswer).toBeDefined()
          expect(['Held together', 'Smoothly connected']).toContain(question.correctAnswer)
        })
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createSymbolQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createSymbolQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createSymbolQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createSymbolQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })
  })
})

