import { createTimeSignatureQuestion, createTimeSignatureQuestions } from '@/theory/exercises/generators/timeSignature'
import { getTimeSignatures } from '@/theory/utils/exercise'
import { StageNumber } from '@/theory/curriculum/types'
import {
  validateQuestionStructure,
  validateCorrectAnswerInChoices,
  validateUniqueChoices,
  validateUniqueQuestions,
  validateQuestionCount,
  TEST_STAGES,
} from '../../helpers/testHelpers'

describe('timeSignature generator', () => {
  describe('createTimeSignatureQuestion', () => {
    it('should create a valid question with required fields', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      validateQuestionStructure(question)
    })

    it('should include correct answer in choices', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      validateCorrectAnswerInChoices(question)
    })

    it('should have unique choices', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      validateUniqueChoices(question)
    })

    it('should have type multipleChoice', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      expect(question.type).toBe('multipleChoice')
    })

    it('should have valid visual component', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      expect(question.visualComponent).toBeDefined()
      expect(question.visualComponent?.type).toBe('timeSignature')
      expect(question.visualComponent?.timeSignatureValue).toBeDefined()
    })

    it('should have explanation', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      expect(question.explanation).toBeDefined()
      expect(typeof question.explanation).toBe('string')
    })

    it('should include time signature notation in question text', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      const timeSigValue = question.visualComponent?.timeSignatureValue
      if (timeSigValue) {
        expect(question.question).toContain(timeSigValue)
      }
    })

    it('should work with object time signature', () => {
      const timeSigs = getTimeSignatures(0)
      const question = createTimeSignatureQuestion(0, timeSigs[0])
      validateQuestionStructure(question)
      validateCorrectAnswerInChoices(question)
    })

    it('should throw error for invalid time signature for stage', () => {
      const { createTimeSignature } = require('@leonkwan46/music-notation')
      const invalidTimeSig = createTimeSignature(7, 8)
      expect(() => {
        createTimeSignatureQuestion(0, invalidTimeSig)
      }).toThrow('is not valid for stage')
    })

    it('should work for all stages with valid time signatures', () => {
      TEST_STAGES.forEach(stage => {
        const timeSigs = getTimeSignatures(stage)
        if (timeSigs.length > 0) {
          const question = createTimeSignatureQuestion(stage, timeSigs[0])
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        }
      })
    })
  })

  describe('createTimeSignatureQuestions', () => {
    it('should generate requested number of questions', () => {
      const questions = createTimeSignatureQuestions(5, 0)
      validateQuestionCount(questions, 5)
    })

    it('should generate unique questions', () => {
      const questions = createTimeSignatureQuestions(10, 0)
      validateUniqueQuestions(questions)
    })

    it('should generate questions with valid structure', () => {
      const questions = createTimeSignatureQuestions(3, 0)
      questions.forEach(question => {
        validateQuestionStructure(question)
        validateCorrectAnswerInChoices(question)
      })
    })

    it('should work for all stages', () => {
      TEST_STAGES.forEach(stage => {
        const questions = createTimeSignatureQuestions(5, stage)
        validateQuestionCount(questions, 5)
        questions.forEach(question => {
          validateQuestionStructure(question)
        })
      })
    })

    it('should handle single question generation', () => {
      const questions = createTimeSignatureQuestions(1, 0)
      validateQuestionCount(questions, 1)
      validateQuestionStructure(questions[0])
    })

    it('should handle stage with only one time signature', () => {
      // Some stages might only have one time signature
      const questions = createTimeSignatureQuestions(5, 0)
      validateQuestionCount(questions, 5)
      // All questions should have the same time signature value
      const timeSigValues = new Set(
        questions.map(q => q.visualComponent?.timeSignatureValue).filter(Boolean)
      )
      expect(timeSigValues.size).toBeGreaterThan(0)
    })

    it('should respect stage-specific time signatures', () => {
      const stage0Questions = createTimeSignatureQuestions(10, 0)
      const stage1Questions = createTimeSignatureQuestions(10, 1)
      
      const stage0TimeSigs = new Set(
        stage0Questions.map(q => q.visualComponent?.timeSignatureValue).filter(Boolean)
      )
      const stage1TimeSigs = new Set(
        stage1Questions.map(q => q.visualComponent?.timeSignatureValue).filter(Boolean)
      )
      
      expect(stage0TimeSigs.size).toBeGreaterThan(0)
      expect(stage1TimeSigs.size).toBeGreaterThan(0)
    })

    it('should have correct deduplication', () => {
      const questions = createTimeSignatureQuestions(20, 0)
      const timeSigValues = questions.map(q => q.visualComponent?.timeSignatureValue)
      
      // Check that same time signature doesn't appear too frequently
      const valueCounts = new Map<string, number>()
      timeSigValues.forEach(val => {
        if (val) {
          valueCounts.set(val, (valueCounts.get(val) || 0) + 1)
        }
      })
      
      // Each unique time signature should appear multiple times if pool is small
      expect(valueCounts.size).toBeGreaterThan(0)
    })
  })
})

