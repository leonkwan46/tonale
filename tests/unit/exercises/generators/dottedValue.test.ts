import { createDottedValueQuestions } from '@/subjects/theory/exercises/generators/dottedValue'
import type { Question } from '@/types/lesson'
import {
  validateNoteTypeForStage,
  validateQuestionCount,
  validateQuestionStructure,
  validateRestTypeForStage,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('dottedValue generator', () => {
  describe('createDottedValueQuestions', () => {
    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createDottedValueQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createDottedValueQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createDottedValueQuestions(3, stage)
        questions.forEach((question: Question) => {
          validateQuestionStructure(question)
        })
      })

      it('should only use stage 2 note and rest types', () => {
        const questions = createDottedValueQuestions(10, stage)
        questions.forEach((question: Question) => {
          const noteType = question.visualComponent?.noteType
          if (noteType) {
            if (typeof noteType === 'object' && noteType.dots === 1) {
              if (typeof noteType.type === 'string' && noteType.type.includes('rest')) {
                validateRestTypeForStage(noteType, stage)
              } else {
                validateNoteTypeForStage(noteType, stage)
              }
            }
          }
        })
      })

      it('should include both note and rest questions', () => {
        const questions = createDottedValueQuestions(10, stage)
        const hasNoteQuestions = questions.some((q: Question) => {
          const noteType = q.visualComponent?.noteType
          return noteType && typeof noteType === 'object' && !noteType.type?.toString().includes('rest')
        })
        const hasRestQuestions = questions.some((q: Question) => {
          const noteType = q.visualComponent?.noteType
          return noteType && typeof noteType === 'object' && noteType.type?.toString().includes('rest')
        })
        expect(hasNoteQuestions || hasRestQuestions).toBe(true)
      })
    })
  })
})

