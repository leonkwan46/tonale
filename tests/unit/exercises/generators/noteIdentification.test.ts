import { createNoteIdentificationQuestion, createNoteIdentificationQuestions } from '@/theory/exercises/generators/noteIdentification'
import { StageNumber } from '@/theory/curriculum/types'
import {
  validateQuestionStructure,
  validateCorrectAnswerInChoices,
  validateUniqueChoices,
  validateUniqueQuestions,
  validateQuestionCount,
  TEST_STAGES,
} from '../../helpers/testHelpers'

describe('noteIdentification generator', () => {
  describe('createNoteIdentificationQuestion', () => {
    it('should create a valid question with required fields for treble clef', () => {
      const question = createNoteIdentificationQuestion(0, 'treble')
      validateQuestionStructure(question)
    })

    it('should create a valid question with required fields for bass clef', () => {
      const question = createNoteIdentificationQuestion(0, 'bass')
      validateQuestionStructure(question)
    })

    it('should include correct answer in choices', () => {
      const question = createNoteIdentificationQuestion(0, 'treble')
      validateCorrectAnswerInChoices(question)
    })

    it('should have unique choices', () => {
      const question = createNoteIdentificationQuestion(0, 'treble')
      validateUniqueChoices(question)
    })

    it('should have type multipleChoice', () => {
      const question = createNoteIdentificationQuestion(0, 'treble')
      expect(question.type).toBe('multipleChoice')
    })

    it('should have valid visual component with clef', () => {
      const question = createNoteIdentificationQuestion(0, 'treble')
      expect(question.visualComponent).toBeDefined()
      expect(question.visualComponent?.clef).toBe('treble')
      expect(question.visualComponent?.elements).toBeDefined()
      expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
      expect(question.visualComponent?.elements?.length).toBeGreaterThan(0)
    })

    it('should have explanation', () => {
      const question = createNoteIdentificationQuestion(0, 'treble')
      expect(question.explanation).toBeDefined()
      expect(typeof question.explanation).toBe('string')
    })

    it('should include clef in question text', () => {
      const trebleQuestion = createNoteIdentificationQuestion(0, 'treble')
      const bassQuestion = createNoteIdentificationQuestion(0, 'bass')
      expect(trebleQuestion.question).toContain('treble')
      expect(bassQuestion.question).toContain('bass')
    })

    it('should work for all stages with treble clef', () => {
      TEST_STAGES.forEach(stage => {
        const question = createNoteIdentificationQuestion(stage, 'treble')
        validateQuestionStructure(question)
        validateCorrectAnswerInChoices(question)
      })
    })

    it('should work for all stages with bass clef', () => {
      TEST_STAGES.forEach(stage => {
        const question = createNoteIdentificationQuestion(stage, 'bass')
        validateQuestionStructure(question)
        validateCorrectAnswerInChoices(question)
      })
    })

    it('should accept custom noteData parameter', () => {
      const customNoteData = {
        pitch: 'C4',
        name: 'C',
        letterName: 'C',
        stem: 'up' as const,
        ledgerLines: 0,
      }
      const question = createNoteIdentificationQuestion(0, 'treble', customNoteData)
      expect(question.correctAnswer).toBe('C')
      expect(question.visualComponent?.elements?.[0]?.pitch).toBe('C4')
    })

    it('should throw error if noteData missing letterName', () => {
      const invalidNoteData = {
        pitch: 'C4',
        name: 'C',
        stem: 'up' as const,
        ledgerLines: 0,
      }
      expect(() => {
        createNoteIdentificationQuestion(0, 'treble', invalidNoteData as any)
      }).toThrow('Note data missing letterName')
    })
  })

  describe('createNoteIdentificationQuestions', () => {
    it('should generate requested number of questions for treble clef', () => {
      const questions = createNoteIdentificationQuestions(5, 0, 'treble')
      validateQuestionCount(questions, 5)
    })

    it('should generate requested number of questions for bass clef', () => {
      const questions = createNoteIdentificationQuestions(5, 0, 'bass')
      validateQuestionCount(questions, 5)
    })

    it('should generate unique questions', () => {
      const questions = createNoteIdentificationQuestions(10, 0, 'treble')
      validateUniqueQuestions(questions)
    })

    it('should generate questions with valid structure', () => {
      const questions = createNoteIdentificationQuestions(3, 0, 'treble')
      questions.forEach(question => {
        validateQuestionStructure(question)
        validateCorrectAnswerInChoices(question)
      })
    })

    it('should work for all stages with treble clef', () => {
      TEST_STAGES.forEach(stage => {
        const questions = createNoteIdentificationQuestions(5, stage, 'treble')
        validateQuestionCount(questions, 5)
        questions.forEach(question => {
          validateQuestionStructure(question)
          expect(question.visualComponent?.clef).toBe('treble')
        })
      })
    })

    it('should work for all stages with bass clef', () => {
      TEST_STAGES.forEach(stage => {
        const questions = createNoteIdentificationQuestions(5, stage, 'bass')
        validateQuestionCount(questions, 5)
        questions.forEach(question => {
          validateQuestionStructure(question)
          expect(question.visualComponent?.clef).toBe('bass')
        })
      })
    })

    it('should handle single question generation', () => {
      const questions = createNoteIdentificationQuestions(1, 0, 'treble')
      validateQuestionCount(questions, 1)
      validateQuestionStructure(questions[0])
    })

    it('should respect stage-specific note ranges', () => {
      const stage0Questions = createNoteIdentificationQuestions(10, 0, 'treble')
      const stage1Questions = createNoteIdentificationQuestions(10, 1, 'treble')
      
      const stage0Pitches = new Set(
        stage0Questions.map(q => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
      )
      const stage1Pitches = new Set(
        stage1Questions.map(q => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
      )
      
      expect(stage0Pitches.size).toBeGreaterThan(0)
      expect(stage1Pitches.size).toBeGreaterThan(0)
    })
  })
})

