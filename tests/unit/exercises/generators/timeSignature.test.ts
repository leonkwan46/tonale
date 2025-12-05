import { createTimeSignatureQuestion, createTimeSignatureQuestions } from '@/theory/exercises/generators/timeSignature'
import { getTimeSignatures } from '@/theory/exercises/utils/exercise'
import {
  validateCorrectAnswerInChoices,
  validateQuestionCount,
  validateQuestionStructure,
  validateTimeSignatureForStage,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('timeSignature generator', () => {
  describe('createTimeSignatureQuestion', () => {
    describe('Stage 0', () => {
      const stage = 0
      const timeSigs = getTimeSignatures(stage)

      it('should create a valid question with required fields', () => {
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        expect(question.type).toBe('multipleChoice')
      })

      it('should have valid visual component', () => {
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        expect(question.visualComponent).toBeDefined()
        expect(question.visualComponent?.type).toBe('timeSignature')
        expect(question.visualComponent?.timeSignatureValue).toBeDefined()
      })

      it('should have explanation', () => {
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        expect(question.explanation).toBeDefined()
        expect(typeof question.explanation).toBe('string')
      })

      it('should include time signature notation in question text', () => {
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        const timeSigValue = question.visualComponent?.timeSignatureValue
        if (timeSigValue) {
          expect(question.question).toContain(timeSigValue)
        }
      })

      it('should only use stage 0 time signatures', () => {
        expect(timeSigs.length).toBeGreaterThan(0)
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        const timeSignatureValue = question.visualComponent?.timeSignatureValue
        expect(timeSignatureValue).toBeDefined()
        if (timeSignatureValue) {
          validateTimeSignatureForStage(timeSignatureValue, stage)
        }
      })

      it('should throw error for invalid time signature for stage', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { createTimeSignature } = require('@leonkwan46/music-notation')
        const invalidTimeSig = createTimeSignature(7, 8)
        expect(() => {
          createTimeSignatureQuestion(stage, invalidTimeSig)
        }).toThrow('is not valid for stage')
      })
    })

    describe('Stage 1', () => {
      const stage = 1
      const timeSigs = getTimeSignatures(stage)

      it('should create a valid question with required fields', () => {
        if (timeSigs.length > 0) {
          const question = createTimeSignatureQuestion(stage, timeSigs[0])
          validateQuestionStructure(question)
        }
      })

      it('should include correct answer in choices', () => {
        if (timeSigs.length > 0) {
          const question = createTimeSignatureQuestion(stage, timeSigs[0])
          validateCorrectAnswerInChoices(question)
        }
      })

      it('should only use stage 1 time signatures', () => {
        expect(timeSigs.length).toBeGreaterThan(0)
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        const timeSignatureValue = question.visualComponent?.timeSignatureValue
        expect(timeSignatureValue).toBeDefined()
        if (timeSignatureValue) {
          validateTimeSignatureForStage(timeSignatureValue, stage)
        }
      })
    })

    describe('Stage 2', () => {
      const stage = 2
      const timeSigs = getTimeSignatures(stage)

      it('should create a valid question with required fields', () => {
        if (timeSigs.length > 0) {
          const question = createTimeSignatureQuestion(stage, timeSigs[0])
          validateQuestionStructure(question)
        }
      })

      it('should include correct answer in choices', () => {
        if (timeSigs.length > 0) {
          const question = createTimeSignatureQuestion(stage, timeSigs[0])
          validateCorrectAnswerInChoices(question)
        }
      })

      it('should only use stage 2 time signatures', () => {
        expect(timeSigs.length).toBeGreaterThan(0)
        const question = createTimeSignatureQuestion(stage, timeSigs[0])
        const timeSignatureValue = question.visualComponent?.timeSignatureValue
        expect(timeSignatureValue).toBeDefined()
        if (timeSignatureValue) {
          validateTimeSignatureForStage(timeSignatureValue, stage)
        }
      })
    })
  })

  describe('createTimeSignatureQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createTimeSignatureQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createTimeSignatureQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createTimeSignatureQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should handle single question generation', () => {
        const questions = createTimeSignatureQuestions(1, stage)
        validateQuestionCount(questions, 1)
        validateQuestionStructure(questions[0])
      })

      it('should only use stage 0 time signatures', () => {
        const questions = createTimeSignatureQuestions(10, stage)
        questions.forEach(question => {
          const timeSignatureValue = question.visualComponent?.timeSignatureValue
          if (timeSignatureValue) {
            validateTimeSignatureForStage(timeSignatureValue, stage)
          }
        })
        const timeSigValues = new Set(
          questions.map(q => q.visualComponent?.timeSignatureValue).filter(Boolean)
        )
        expect(timeSigValues.size).toBeGreaterThan(0)
      })

      it('should handle stage with limited time signatures', () => {
        const questions = createTimeSignatureQuestions(5, stage)
        validateQuestionCount(questions, 5)
        const timeSigValues = new Set(
          questions.map(q => q.visualComponent?.timeSignatureValue).filter(Boolean)
        )
        expect(timeSigValues.size).toBeGreaterThan(0)
      })

      it('should have correct deduplication', () => {
        const questions = createTimeSignatureQuestions(20, stage)
        const timeSigValues = questions.map(q => q.visualComponent?.timeSignatureValue)
        const valueCounts = new Map<string, number>()
        timeSigValues.forEach(val => {
          if (val) {
            valueCounts.set(val, (valueCounts.get(val) || 0) + 1)
          }
        })
        expect(valueCounts.size).toBeGreaterThan(0)
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createTimeSignatureQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createTimeSignatureQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 1 time signatures', () => {
        const questions = createTimeSignatureQuestions(10, stage)
        questions.forEach(question => {
          const timeSignatureValue = question.visualComponent?.timeSignatureValue
          if (timeSignatureValue) {
            validateTimeSignatureForStage(timeSignatureValue, stage)
          }
        })
        const timeSigValues = new Set(
          questions.map(q => q.visualComponent?.timeSignatureValue).filter(Boolean)
        )
        expect(timeSigValues.size).toBeGreaterThan(0)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createTimeSignatureQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createTimeSignatureQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 2 time signatures', () => {
        const questions = createTimeSignatureQuestions(10, stage)
        questions.forEach(question => {
          const timeSignatureValue = question.visualComponent?.timeSignatureValue
          if (timeSignatureValue) {
            validateTimeSignatureForStage(timeSignatureValue, stage)
          }
        })
        const timeSigValues = new Set(
          questions.map(q => q.visualComponent?.timeSignatureValue).filter(Boolean)
        )
        expect(timeSigValues.size).toBeGreaterThan(0)
      })
    })
  })
})
