import { createRestValueQuestion, createRestValueQuestions } from '@/theory/exercises/generators/restValue'
import { StageNumber } from '@/theory/curriculum/types'
import {
  validateQuestionStructure,
  validateCorrectAnswerInChoices,
  validateUniqueChoices,
  validateUniqueQuestions,
  validateQuestionCount,
  TEST_STAGES,
} from '../../helpers/testHelpers'

describe('restValue generator', () => {
  describe('createRestValueQuestion', () => {
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
      expect(question.type).toBe('multipleChoice')
    })

    it('should have valid visual component', () => {
      const question = createRestValueQuestion(0)
      expect(question.visualComponent).toBeDefined()
      expect(question.visualComponent?.type).toBe('noteValue')
      expect(question.visualComponent?.noteType).toBeDefined()
    })

    it('should have explanation', () => {
      const question = createRestValueQuestion(0)
      expect(question.explanation).toBeDefined()
      expect(typeof question.explanation).toBe('string')
    })

    it('should accept custom restType parameter', () => {
      const customRestType = { type: 'minim', dots: 0 }
      const question = createRestValueQuestion(1, customRestType)
      expect(question.visualComponent?.noteType).toEqual(customRestType)
    })

    it('should work for all stages', () => {
      TEST_STAGES.forEach(stage => {
        const question = createRestValueQuestion(stage)
        validateQuestionStructure(question)
        validateCorrectAnswerInChoices(question)
      })
    })
  })

  describe('createRestValueQuestions', () => {
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

    it('should work for all stages', () => {
      TEST_STAGES.forEach(stage => {
        const questions = createRestValueQuestions(5, stage)
        validateQuestionCount(questions, 5)
        questions.forEach(question => {
          validateQuestionStructure(question)
        })
      })
    })

    it('should handle single question generation', () => {
      const questions = createRestValueQuestions(1, 0)
      validateQuestionCount(questions, 1)
      validateQuestionStructure(questions[0])
    })

    it('should respect stage-specific rest types', () => {
      const stage0Questions = createRestValueQuestions(10, 0)
      const stage1Questions = createRestValueQuestions(10, 1)
      
      const stage0RestTypes = new Set(
        stage0Questions.map(q => {
          const restType = q.visualComponent?.noteType
          return typeof restType === 'string' ? restType : JSON.stringify(restType)
        })
      )
      const stage1RestTypes = new Set(
        stage1Questions.map(q => {
          const restType = q.visualComponent?.noteType
          return typeof restType === 'string' ? restType : JSON.stringify(restType)
        })
      )
      
      expect(stage0RestTypes.size).toBeGreaterThan(0)
      expect(stage1RestTypes.size).toBeGreaterThan(0)
    })
  })
})

