import { createNoteGroupingQuestion, createNoteGroupingQuestions } from '@/subjects/theory/exercises/generators/grouping'
import type { Question } from '@/types/lesson'
import { getTimeSignatures } from '@/subjects/theory/exercises/utils/exercise'
import { formatAsNotation } from '@/subjects/theory/exercises/utils/timeSignature'
import {
  validateCorrectAnswerInChoices,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('grouping generator', () => {
  describe('createNoteGroupingQuestion', () => {
    describe('Stage 2', () => {
      const stage = 2

      it('should create a valid question with required fields', () => {
        const question = createNoteGroupingQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createNoteGroupingQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createNoteGroupingQuestion(stage)
        validateUniqueChoices(question)
      })

      it('should have type trueFalse', () => {
        const question = createNoteGroupingQuestion(stage)
        expect(question.type).toBe('trueFalse')
      })

      it('should have valid visual component', () => {
        const question = createNoteGroupingQuestion(stage)
        expect(question.visualComponent).toBeDefined()
        expect(question.visualComponent?.elements).toBeDefined()
        expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
        expect(question.visualComponent?.elements?.length).toBeGreaterThan(0)
        expect(question.visualComponent?.timeSignature).toBeDefined()
      })

      it('should have explanation', () => {
        const question = createNoteGroupingQuestion(stage)
        expect(question.explanation).toBeDefined()
        expect(question.explanation?.text).toBeDefined()
        expect(typeof question.explanation?.text).toBe('string')
      })

      it('should only use stage 2 time signatures', () => {
        const question = createNoteGroupingQuestion(stage)
        const timeSignature = question.visualComponent?.timeSignature
        if (timeSignature) {
          const timeSigs = getTimeSignatures(stage)
          const timeSigValues = timeSigs.map((ts: string | { topNumber: number; bottomNumber: number }) => 
            typeof ts === 'string' ? ts : formatAsNotation(ts)
          )
          const timeSigStr = formatAsNotation(timeSignature)
          expect(timeSigValues).toContain(timeSigStr)
        }
      })
    })
  })

  describe('createNoteGroupingQuestions', () => {
    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createNoteGroupingQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createNoteGroupingQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createNoteGroupingQuestions(3, stage)
        questions.forEach((question: Question) => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should only use stage 2 time signatures', () => {
        const questions = createNoteGroupingQuestions(10, stage)
        const stageTimeSigs = getTimeSignatures(stage)
        const timeSigValues = stageTimeSigs.map((ts: string | { topNumber: number; bottomNumber: number }) => 
          typeof ts === 'string' ? ts : formatAsNotation(ts)
        )
        questions.forEach((question: Question) => {
          const timeSignature = question.visualComponent?.timeSignature
          if (timeSignature) {
            const timeSigStr = formatAsNotation(timeSignature)
            expect(timeSigValues).toContain(timeSigStr)
          }
        })
      })

      it('should have balanced time signature distribution', () => {
        const questions = createNoteGroupingQuestions(20, stage)
        const timeSigCounts = new Map<string, number>()
        questions.forEach((question: Question) => {
          const timeSig = question.visualComponent?.timeSignature
          if (timeSig) {
            const timeSigStr = formatAsNotation(timeSig)
            timeSigCounts.set(timeSigStr, (timeSigCounts.get(timeSigStr) || 0) + 1)
          }
        })
        expect(timeSigCounts.size).toBeGreaterThan(0)
      })
    })
  })
})

