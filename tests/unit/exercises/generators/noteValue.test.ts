import { createNoteValueQuestion, createNoteValueQuestions } from '@/subjects/theory/exercises/generators/noteValue'
import {
    validateCorrectAnswerInChoices,
    validateNoteTypeForStage,
    validateQuestionCount,
    validateQuestionStructure,
    validateUniqueChoices,
    validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('noteValue generator', () => {
  describe('createNoteValueQuestion', () => {
    describe('Stage 0', () => {
      it('should create a valid question with required fields', () => {
        const question = createNoteValueQuestion(0)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createNoteValueQuestion(0)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createNoteValueQuestion(0)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createNoteValueQuestion(0)
        expect(question.answerInterface).toBe('multipleChoice')
      })

      it('should have valid visual component', () => {
        const question = createNoteValueQuestion(0)
        expect(question.questionInterface).toBeDefined()
        expect(question.questionInterface?.type).toBe('noteValue')
        expect(question.questionInterface?.noteType).toBeDefined()
      })

      it('should have explanation', () => {
        const question = createNoteValueQuestion(0)
        expect(question.explanation).toBeDefined()
        expect(typeof question.explanation).toBe('string')
      })

      it('should use stage 0 note types', () => {
        const question = createNoteValueQuestion(0)
        const noteType = question.questionInterface?.noteType
        expect(noteType).toBeDefined()
        validateNoteTypeForStage(noteType, 0)
      })
    })

    describe('Stage 1', () => {
      it('should create a valid question with required fields', () => {
        const question = createNoteValueQuestion(1)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createNoteValueQuestion(1)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createNoteValueQuestion(1)
        validateUniqueChoices(question)
      })

      it('should accept custom noteType parameter', () => {
        const customNoteType = { type: 'minim', dots: 0 }
        const question = createNoteValueQuestion(1, customNoteType)
        expect(question.questionInterface?.noteType).toEqual(customNoteType)
      })

      it('should use stage 1 note types', () => {
        const question = createNoteValueQuestion(1)
        const noteType = question.questionInterface?.noteType
        expect(noteType).toBeDefined()
        validateNoteTypeForStage(noteType, 1)
      })
    })

    describe('Stage 2', () => {
      it('should create a valid question with required fields', () => {
        const question = createNoteValueQuestion(2)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createNoteValueQuestion(2)
        validateCorrectAnswerInChoices(question)
      })

      it('should use stage 2 note types', () => {
        const question = createNoteValueQuestion(2)
        const noteType = question.questionInterface?.noteType
        expect(noteType).toBeDefined()
        validateNoteTypeForStage(noteType, 2)
      })
    })
  })

  describe('createNoteValueQuestions', () => {
    describe('Stage 0', () => {
      it('should generate requested number of questions', () => {
        const questions = createNoteValueQuestions(5, 0)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteValueQuestions(10, 0)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createNoteValueQuestions(3, 0)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should handle single question generation', () => {
        const questions = createNoteValueQuestions(1, 0)
        validateQuestionCount(questions, 1)
        validateQuestionStructure(questions[0])
      })

      it('should only use stage 0 note types', () => {
        const questions = createNoteValueQuestions(10, 0)
        questions.forEach(question => {
          const noteType = question.questionInterface?.noteType
          validateNoteTypeForStage(noteType, 0)
        })
        const noteTypes = new Set(
          questions.map(q => {
            const noteType = q.questionInterface?.noteType
            return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
          })
        )
        expect(noteTypes.size).toBeGreaterThan(0)
      })
    })

    describe('Stage 1', () => {
      it('should generate requested number of questions', () => {
        const questions = createNoteValueQuestions(5, 1)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteValueQuestions(10, 1)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 1 note types', () => {
        const questions = createNoteValueQuestions(10, 1)
        questions.forEach(question => {
          const noteType = question.questionInterface?.noteType
          validateNoteTypeForStage(noteType, 1)
        })
        const noteTypes = new Set(
          questions.map(q => {
            const noteType = q.questionInterface?.noteType
            return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
          })
        )
        expect(noteTypes.size).toBeGreaterThan(0)
      })
    })

    describe('Stage 2', () => {
      it('should generate requested number of questions', () => {
        const questions = createNoteValueQuestions(5, 2)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteValueQuestions(10, 2)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 2 note types', () => {
        const questions = createNoteValueQuestions(10, 2)
        questions.forEach(question => {
          const noteType = question.questionInterface?.noteType
          validateNoteTypeForStage(noteType, 2)
        })
        const noteTypes = new Set(
          questions.map(q => {
            const noteType = q.questionInterface?.noteType
            return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
          })
        )
        expect(noteTypes.size).toBeGreaterThan(0)
      })
    })
  })
})
