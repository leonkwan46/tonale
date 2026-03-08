import { createNoteRestValueQuestions } from '@/subjects/theory/exercises/generators/noteRestValue'
import type { Question } from '@/types/lesson'
import {
  validateNoteTypeForStage,
  validateQuestionCount,
  validateQuestionStructure,
  validateRestTypeForStage,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('noteRestValue generator', () => {
  describe('createNoteRestValueQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createNoteRestValueQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteRestValueQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createNoteRestValueQuestions(3, stage)
        questions.forEach((question: Question) => {
          validateQuestionStructure(question)
        })
      })

      it('should include both note and rest questions', () => {
        const questions = createNoteRestValueQuestions(10, stage)
        const noteQuestions = questions.filter((q: Question) => {
          const noteType = q.visualComponent?.noteType
          return noteType && typeof noteType === 'object' && 'type' in noteType && !noteType.type.includes('rest')
        })
        const restQuestions = questions.filter((q: Question) => {
          const noteType = q.visualComponent?.noteType
          return noteType && typeof noteType === 'object' && 'type' in noteType && noteType.type.includes('rest')
        })
        expect(noteQuestions.length).toBeGreaterThan(0)
        expect(restQuestions.length).toBeGreaterThan(0)
      })

      it('should only use stage 0 note and rest types', () => {
        const questions = createNoteRestValueQuestions(10, stage)
        questions.forEach((question: Question) => {
          const noteType = question.visualComponent?.noteType
          if (noteType && typeof noteType === 'object' && 'type' in noteType) {
            if (noteType.type.includes('rest')) {
              validateRestTypeForStage(noteType, stage)
            } else {
              validateNoteTypeForStage(noteType, stage)
            }
        }
        })
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createNoteRestValueQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteRestValueQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createNoteRestValueQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteRestValueQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })
  })
})

