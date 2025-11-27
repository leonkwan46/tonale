import { createSemitoneToneQuestion, createSemitoneToneQuestions } from '@/theory/exercises/generators/semitonesTones'
import { getIntervalPairs } from '@/theory/utils/interval'
import {
  validateCorrectAnswerInChoices,
  validatePitchForStage,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('semitonesTones generator', () => {
  describe('createSemitoneToneQuestion', () => {
    describe('Stage 1', () => {
      const stage = 1
      const treblePairs = getIntervalPairs(stage, 'treble')
      const bassPairs = getIntervalPairs(stage, 'bass')

      describe('Treble clef', () => {
        it('should create a valid question with required fields', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            validateQuestionStructure(question)
          }
        })

        it('should include correct answer in choices', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            validateCorrectAnswerInChoices(question)
          }
        })

        it('should have unique choices', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            validateUniqueChoices(question)
          }
        })

        it('should have type multipleChoice', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            expect(question.type).toBe('multipleChoice')
          }
        })

        it('should have valid visual component', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            expect(question.visualComponent).toBeDefined()
            expect(question.visualComponent?.clef).toBe('treble')
            expect(question.visualComponent?.elements).toBeDefined()
            expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
            expect(question.visualComponent?.elements?.length).toBe(2)
          }
        })

        it('should have explanation', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            expect(question.explanation).toBeDefined()
            expect(typeof question.explanation).toBe('string')
          }
        })

        it('should have correct answer as Semitone or Tone', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            expect(['Semitone', 'Tone']).toContain(question.correctAnswer)
          }
        })

        it('should use stage 1 pitch range for treble clef', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble')
            const pitch1 = question.visualComponent?.elements?.[0]?.pitch
            const pitch2 = question.visualComponent?.elements?.[1]?.pitch
            if (pitch1) validatePitchForStage(pitch1, stage, 'treble')
            if (pitch2) validatePitchForStage(pitch2, stage, 'treble')
          }
        })

        it('should accept custom intervalPair parameter', () => {
          if (treblePairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'treble', treblePairs[0])
            expect(question.correctAnswer).toBeDefined()
          }
        })
      })

      describe('Bass clef', () => {
        it('should create a valid question with required fields', () => {
          if (bassPairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'bass')
            validateQuestionStructure(question)
          }
        })

        it('should include correct answer in choices', () => {
          if (bassPairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'bass')
            validateCorrectAnswerInChoices(question)
          }
        })

        it('should use stage 1 pitch range for bass clef', () => {
          if (bassPairs.length > 0) {
            const question = createSemitoneToneQuestion(stage, 'bass')
            const pitch1 = question.visualComponent?.elements?.[0]?.pitch
            const pitch2 = question.visualComponent?.elements?.[1]?.pitch
            if (pitch1) validatePitchForStage(pitch1, stage, 'bass')
            if (pitch2) validatePitchForStage(pitch2, stage, 'bass')
          }
        })
      })
    })
  })

  describe('createSemitoneToneQuestions', () => {
    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createSemitoneToneQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createSemitoneToneQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createSemitoneToneQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should only have Semitone or Tone as correct answers', () => {
        const questions = createSemitoneToneQuestions(10, stage)
        questions.forEach(question => {
          expect(['Semitone', 'Tone']).toContain(question.correctAnswer)
        })
      })

      it('should include both treble and bass clef questions', () => {
        const questions = createSemitoneToneQuestions(10, stage)
        const trebleQuestions = questions.filter(q => q.visualComponent?.clef === 'treble')
        const bassQuestions = questions.filter(q => q.visualComponent?.clef === 'bass')
        expect(trebleQuestions.length).toBeGreaterThan(0)
        expect(bassQuestions.length).toBeGreaterThan(0)
      })
    })
  })
})

