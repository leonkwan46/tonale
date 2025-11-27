import { createAccidentalQuestion, createAccidentalQuestions } from '@/theory/exercises/generators/accidentals'
import { getAccidentals } from '@/theory/utils/exercise'
import {
  validateCorrectAnswerInChoices,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('accidentals generator', () => {
  describe('createAccidentalQuestion', () => {
    describe('Stage 0', () => {
      const stage = 0
      const stageAccidentals = getAccidentals(stage)

      it('should create a valid question with required fields', () => {
        const question = createAccidentalQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createAccidentalQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createAccidentalQuestion(stage)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createAccidentalQuestion(stage)
        expect(question.type).toBe('multipleChoice')
      })

      it('should have valid visual component', () => {
        const question = createAccidentalQuestion(stage)
        expect(question.visualComponent).toBeDefined()
        expect(question.visualComponent?.type).toBe('termAndSign')
        expect(question.visualComponent?.symbolType).toBeDefined()
        expect(['sharp', 'flat', 'natural']).toContain(question.visualComponent?.symbolType)
      })

      it('should have explanation', () => {
        const question = createAccidentalQuestion(stage)
        expect(question.explanation).toBeDefined()
        expect(typeof question.explanation).toBe('string')
      })

      it('should only use stage accidentals', () => {
        const question = createAccidentalQuestion(stage)
        const correctAnswer = question.correctAnswer
        expect(['Sharp', 'Flat', 'Natural']).toContain(correctAnswer)
      })

      it('should accept custom accidental parameter', () => {
        if (stageAccidentals.length > 0) {
          const question = createAccidentalQuestion(stage, stageAccidentals[0])
          expect(question.visualComponent?.symbolType).toBeDefined()
        }
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should create a valid question with required fields', () => {
        const question = createAccidentalQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createAccidentalQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should create a valid question with required fields', () => {
        const question = createAccidentalQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createAccidentalQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })
    })
  })

  describe('createAccidentalQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createAccidentalQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createAccidentalQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createAccidentalQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should only use stage accidentals', () => {
        const questions = createAccidentalQuestions(10, stage)
        questions.forEach(question => {
          const correctAnswer = question.correctAnswer
          expect(['Sharp', 'Flat', 'Natural']).toContain(correctAnswer)
        })
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createAccidentalQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createAccidentalQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createAccidentalQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createAccidentalQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })
  })
})

