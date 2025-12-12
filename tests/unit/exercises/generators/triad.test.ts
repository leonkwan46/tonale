import { createTriadQuestion, createTriadQuestions } from '@/subjects/theory/exercises/generators/triad'
import { getChordsByStage } from '@/subjects/theory/exercises/utils/triad'
import {
    validateCorrectAnswerInChoices,
    validateKeyForStage,
    validateQuestionCount,
    validateQuestionStructure,
    validateUniqueChoices,
    validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('triad generator', () => {
  describe('createTriadQuestion', () => {
    describe('Stage 2', () => {
      const stage = 2
      const chords = getChordsByStage(stage)
      const chordKeys = Object.keys(chords)

      describe('Treble clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createTriadQuestion(stage, 'treble')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createTriadQuestion(stage, 'treble')
          validateCorrectAnswerInChoices(question)
        })

        it('should have unique choices', () => {
          const question = createTriadQuestion(stage, 'treble')
          validateUniqueChoices(question)
        })

        it('should have type multipleChoice', () => {
          const question = createTriadQuestion(stage, 'treble')
          expect(question.type).toBe('multipleChoice')
        })

        it('should have valid visual component with chord structure', () => {
          const question = createTriadQuestion(stage, 'treble')
          expect(question.visualComponent).toBeDefined()
          expect(question.visualComponent?.type).toBe('musicStaff')
          expect(question.visualComponent?.clef).toBe('treble')
          expect(question.visualComponent?.isChord).toBe(true)
          expect(question.visualComponent?.elements).toBeDefined()
          expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
          expect(question.visualComponent?.elements?.length).toBe(3)
        })

        it('should have explanation', () => {
          const question = createTriadQuestion(stage, 'treble')
          expect(question.explanation).toBeDefined()
          expect(typeof question.explanation).toBe('string')
          expect(question.explanation).toContain('tonic triad')
        })

        it('should only use stage 2 chord keys', () => {
          const question = createTriadQuestion(stage, 'treble')
          const keyName = question.correctAnswer
          expect(keyName).toBeDefined()
          if (keyName) {
            validateKeyForStage(keyName, stage)
          }
        })

        it('should accept custom chordKey parameter', () => {
          if (chordKeys.length > 0) {
            const question = createTriadQuestion(stage, 'treble', chordKeys[0])
            expect(question.correctAnswer).toBe(chordKeys[0])
          }
        })
      })

      describe('Bass clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createTriadQuestion(stage, 'bass')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createTriadQuestion(stage, 'bass')
          validateCorrectAnswerInChoices(question)
        })

        it('should have valid visual component with bass clef', () => {
          const question = createTriadQuestion(stage, 'bass')
          expect(question.visualComponent?.clef).toBe('bass')
          expect(question.visualComponent?.elements?.length).toBe(3)
        })
      })
    })
  })

  describe('createTriadQuestions', () => {
    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createTriadQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createTriadQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createTriadQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should only use stage 2 chord keys', () => {
        const questions = createTriadQuestions(10, stage)
        questions.forEach(question => {
          const keyName = question.correctAnswer
          if (keyName) {
            validateKeyForStage(keyName, stage)
          }
        })
      })

      it('should include both treble and bass clef questions', () => {
        const questions = createTriadQuestions(10, stage)
        const trebleQuestions = questions.filter(q => q.visualComponent?.clef === 'treble')
        const bassQuestions = questions.filter(q => q.visualComponent?.clef === 'bass')
        expect(trebleQuestions.length).toBeGreaterThan(0)
        expect(bassQuestions.length).toBeGreaterThan(0)
      })

      it('should have correct deduplication logic', () => {
        const questions = createTriadQuestions(20, stage)
        const correctAnswers = questions.map(q => q.correctAnswer)
        const uniqueAnswers = new Set(correctAnswers)
        expect(uniqueAnswers.size).toBeGreaterThan(0)
      })
    })
  })
})

