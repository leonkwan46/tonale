import { createNoteValueNameQuestions } from '@/subjects/theory/exercises/generators/noteValueName'
import {
    validateNoteTypeForStage,
    validateQuestionCount,
    validateQuestionStructure,
    validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('noteValueName generator', () => {
  describe('createNoteValueNameQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createNoteValueNameQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteValueNameQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createNoteValueNameQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
        })
      })

      it('should only use stage 0 note types', () => {
        const questions = createNoteValueNameQuestions(10, stage)
        questions.forEach(question => {
          const noteType = question.questionInterface?.noteType
          if (noteType) {
            validateNoteTypeForStage(noteType, stage)
          }
        })
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createNoteValueNameQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteValueNameQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 1 note types', () => {
        const questions = createNoteValueNameQuestions(10, stage)
        questions.forEach(question => {
          const noteType = question.questionInterface?.noteType
          if (noteType) {
            validateNoteTypeForStage(noteType, stage)
          }
        })
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createNoteValueNameQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteValueNameQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 2 note types', () => {
        const questions = createNoteValueNameQuestions(10, stage)
        questions.forEach(question => {
          const noteType = question.questionInterface?.noteType
          if (noteType) {
            validateNoteTypeForStage(noteType, stage)
          }
        })
      })
    })
  })
})

