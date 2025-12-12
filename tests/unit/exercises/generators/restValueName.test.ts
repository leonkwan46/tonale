import { createRestValueNameQuestions } from '@/subjects/theory/exercises/generators/restValueName'
import {
  validateRestTypeForStage,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('restValueName generator', () => {
  describe('createRestValueNameQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createRestValueNameQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createRestValueNameQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createRestValueNameQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
        })
      })

      it('should only use stage 0 rest types', () => {
        const questions = createRestValueNameQuestions(10, stage)
        questions.forEach(question => {
          const restType = question.visualComponent?.noteType
          if (restType) {
            validateRestTypeForStage(restType, stage)
          }
        })
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createRestValueNameQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createRestValueNameQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 1 rest types', () => {
        const questions = createRestValueNameQuestions(10, stage)
        questions.forEach(question => {
          const restType = question.visualComponent?.noteType
          if (restType) {
            validateRestTypeForStage(restType, stage)
          }
        })
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createRestValueNameQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createRestValueNameQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 2 rest types', () => {
        const questions = createRestValueNameQuestions(10, stage)
        questions.forEach(question => {
          const restType = question.visualComponent?.noteType
          if (restType) {
            validateRestTypeForStage(restType, stage)
          }
        })
      })
    })
  })
})

