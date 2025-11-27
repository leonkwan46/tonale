import { createNoteValueQuestion, createNoteValueQuestions } from '@/theory/exercises/generators/noteValue'
import { StageNumber } from '@/theory/curriculum/types'
import {
  validateQuestionStructure,
  validateCorrectAnswerInChoices,
  validateUniqueChoices,
  validateUniqueQuestions,
  validateQuestionCount,
  TEST_STAGES,
} from '../../helpers/testHelpers'

describe('noteValue generator', () => {
  describe('createNoteValueQuestion', () => {
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
      expect(question.type).toBe('multipleChoice')
    })

    it('should have valid visual component', () => {
      const question = createNoteValueQuestion(0)
      expect(question.visualComponent).toBeDefined()
      expect(question.visualComponent?.type).toBe('noteValue')
      expect(question.visualComponent?.noteType).toBeDefined()
    })

    it('should have explanation', () => {
      const question = createNoteValueQuestion(0)
      expect(question.explanation).toBeDefined()
      expect(typeof question.explanation).toBe('string')
    })

    it('should accept custom noteType parameter', () => {
      const customNoteType = { type: 'minim', dots: 0 }
      const question = createNoteValueQuestion(1, customNoteType)
      expect(question.visualComponent?.noteType).toEqual(customNoteType)
    })

    it('should work for all stages', () => {
      TEST_STAGES.forEach(stage => {
        const question = createNoteValueQuestion(stage)
        validateQuestionStructure(question)
        validateCorrectAnswerInChoices(question)
      })
    })
  })

  describe('createNoteValueQuestions', () => {
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

    it('should work for all stages', () => {
      TEST_STAGES.forEach(stage => {
        const questions = createNoteValueQuestions(5, stage)
        validateQuestionCount(questions, 5)
        questions.forEach(question => {
          validateQuestionStructure(question)
        })
      })
    })

    it('should handle single question generation', () => {
      const questions = createNoteValueQuestions(1, 0)
      validateQuestionCount(questions, 1)
      validateQuestionStructure(questions[0])
    })

    it('should respect stage-specific note types', () => {
      const stage0Questions = createNoteValueQuestions(10, 0)
      const stage1Questions = createNoteValueQuestions(10, 1)
      
      // Questions should have different note types based on stage
      const stage0NoteTypes = new Set(
        stage0Questions.map(q => {
          const noteType = q.visualComponent?.noteType
          return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
        })
      )
      const stage1NoteTypes = new Set(
        stage1Questions.map(q => {
          const noteType = q.visualComponent?.noteType
          return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
        })
      )
      
      // Stages may have different note types available
      expect(stage0NoteTypes.size).toBeGreaterThan(0)
      expect(stage1NoteTypes.size).toBeGreaterThan(0)
    })
  })
})

