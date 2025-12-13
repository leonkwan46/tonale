import { createRestValueQuestion, createRestValueQuestions } from '@/subjects/theory/exercises/generators/restValue'
import {
    validateCorrectAnswerInChoices,
    validateQuestionCount,
    validateQuestionStructure,
    validateRestTypeForStage,
    validateUniqueChoices,
    validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('restValue generator', () => {
  describe('createRestValueQuestion', () => {
    describe('Stage 0', () => {
      it('should create a valid question with required fields', () => {
        const question = createRestValueQuestion(0)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createRestValueQuestion(0)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createRestValueQuestion(0)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createRestValueQuestion(0)
        expect(question.answerInterface).toBe('multipleChoice')
      })

      it('should have valid visual component', () => {
        const question = createRestValueQuestion(0)
        expect(question.questionInterface).toBeDefined()
        expect(question.questionInterface?.type).toBe('noteValue')
        expect(question.questionInterface?.noteType).toBeDefined()
      })

      it('should have explanation', () => {
        const question = createRestValueQuestion(0)
        expect(question.explanation).toBeDefined()
        expect(typeof question.explanation).toBe('string')
      })

      it('should use stage 0 rest types', () => {
        const question = createRestValueQuestion(0)
        const restType = question.questionInterface?.noteType
        expect(restType).toBeDefined()
        validateRestTypeForStage(restType, 0)
      })
    })

    describe('Stage 1', () => {
      it('should create a valid question with required fields', () => {
        const question = createRestValueQuestion(1)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createRestValueQuestion(1)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createRestValueQuestion(1)
        validateUniqueChoices(question)
      })

      it('should accept custom restType parameter', () => {
        const customRestType = { type: 'minim', dots: 0 }
        const question = createRestValueQuestion(1, customRestType)
        expect(question.questionInterface?.noteType).toEqual(customRestType)
      })

      it('should use stage 1 rest types', () => {
        const question = createRestValueQuestion(1)
        const restType = question.questionInterface?.noteType
        expect(restType).toBeDefined()
        validateRestTypeForStage(restType, 1)
      })
    })

    describe('Stage 2', () => {
      it('should create a valid question with required fields', () => {
        const question = createRestValueQuestion(2)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createRestValueQuestion(2)
        validateCorrectAnswerInChoices(question)
      })

      it('should use stage 2 rest types', () => {
        const question = createRestValueQuestion(2)
        const restType = question.questionInterface?.noteType
        expect(restType).toBeDefined()
        validateRestTypeForStage(restType, 2)
      })
    })
  })

  describe('createRestValueQuestions', () => {
    describe('Stage 0', () => {
      it('should generate requested number of questions', () => {
        const questions = createRestValueQuestions(5, 0)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createRestValueQuestions(10, 0)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createRestValueQuestions(3, 0)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should handle single question generation', () => {
        const questions = createRestValueQuestions(1, 0)
        validateQuestionCount(questions, 1)
        validateQuestionStructure(questions[0])
      })

      it('should only use stage 0 rest types', () => {
        const questions = createRestValueQuestions(10, 0)
        questions.forEach(question => {
          const restType = question.questionInterface?.noteType
          validateRestTypeForStage(restType, 0)
        })
        const restTypes = new Set(
          questions.map(q => {
            const restType = q.questionInterface?.noteType
            return typeof restType === 'string' ? restType : JSON.stringify(restType)
          })
        )
        expect(restTypes.size).toBeGreaterThan(0)
      })
    })

    describe('Stage 1', () => {
      it('should generate requested number of questions', () => {
        const questions = createRestValueQuestions(5, 1)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createRestValueQuestions(10, 1)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 1 rest types', () => {
        const questions = createRestValueQuestions(10, 1)
        questions.forEach(question => {
          const restType = question.questionInterface?.noteType
          validateRestTypeForStage(restType, 1)
        })
        const restTypes = new Set(
          questions.map(q => {
            const restType = q.questionInterface?.noteType
            return typeof restType === 'string' ? restType : JSON.stringify(restType)
          })
        )
        expect(restTypes.size).toBeGreaterThan(0)
      })
    })

    describe('Stage 2', () => {
      it('should generate requested number of questions', () => {
        const questions = createRestValueQuestions(5, 2)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createRestValueQuestions(10, 2)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 2 rest types', () => {
        const questions = createRestValueQuestions(10, 2)
        questions.forEach(question => {
          const restType = question.questionInterface?.noteType
          validateRestTypeForStage(restType, 2)
        })
        const restTypes = new Set(
          questions.map(q => {
            const restType = q.questionInterface?.noteType
            return typeof restType === 'string' ? restType : JSON.stringify(restType)
          })
        )
        expect(restTypes.size).toBeGreaterThan(0)
      })
    })
  })
})
