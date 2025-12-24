import {
    STAGE_ONE_MUSICAL_TERMS_DEFINITIONS,
    STAGE_TWO_MUSICAL_TERMS_DEFINITIONS,
    STAGE_ZERO_MUSICAL_TERMS_DEFINITIONS
} from '@/theory/curriculum/config/musicalTerms'
import { createMusicalTermQuestion, createMusicalTermQuestions } from '@/theory/exercises/generators/musicalTerm'
import {
    validateCorrectAnswerInChoices,
    validateQuestionCount,
    validateQuestionStructure,
    validateUniqueChoices,
    validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('musicalTerm generator', () => {
  describe('createMusicalTermQuestion', () => {
    describe('Stage 0', () => {
      const stage = 0
      const termKeys = Object.keys(STAGE_ZERO_MUSICAL_TERMS_DEFINITIONS)

      it('should create a valid question with required fields', () => {
        const question = createMusicalTermQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createMusicalTermQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createMusicalTermQuestion(stage)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createMusicalTermQuestion(stage)
        expect(question.type).toBe('multipleChoice')
      })

      it('should have valid visual component', () => {
        const question = createMusicalTermQuestion(stage)
        expect(question.visualComponent).toBeDefined()
        expect(['termAndSign', 'musicStaff']).toContain(question.visualComponent?.type)
      })

      it('should have explanation', () => {
        const question = createMusicalTermQuestion(stage)
        expect(question.explanation).toBeDefined()
        expect(question.explanation?.text).toBeDefined()
        expect(typeof question.explanation?.text).toBe('string')
      })

      it('should only use stage 0 musical terms', () => {
        const question = createMusicalTermQuestion(stage)
        const correctAnswer = question.correctAnswer
        const stageDefinitions = Object.values(STAGE_ZERO_MUSICAL_TERMS_DEFINITIONS)
        expect(stageDefinitions).toContain(correctAnswer)
      })

      it('should accept custom termKey parameter', () => {
        if (termKeys.length > 0) {
          const question = createMusicalTermQuestion(stage, termKeys[0])
          expect(question.correctAnswer).toBeDefined()
        }
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should create a valid question with required fields', () => {
        const question = createMusicalTermQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createMusicalTermQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })

      it('should only use stage 1 musical terms', () => {
        const question = createMusicalTermQuestion(stage)
        const correctAnswer = question.correctAnswer
        const stageDefinitions = Object.values(STAGE_ONE_MUSICAL_TERMS_DEFINITIONS)
        expect(stageDefinitions).toContain(correctAnswer)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should create a valid question with required fields', () => {
        const question = createMusicalTermQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createMusicalTermQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })

      it('should only use stage 2 musical terms', () => {
        const question = createMusicalTermQuestion(stage)
        const correctAnswer = question.correctAnswer
        const stageDefinitions = Object.values(STAGE_TWO_MUSICAL_TERMS_DEFINITIONS)
        expect(stageDefinitions).toContain(correctAnswer)
      })
    })
  })

  describe('createMusicalTermQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createMusicalTermQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createMusicalTermQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createMusicalTermQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should only use stage 0 musical terms', () => {
        const questions = createMusicalTermQuestions(10, stage)
        const stageDefinitions = Object.values(STAGE_ZERO_MUSICAL_TERMS_DEFINITIONS)
        questions.forEach(question => {
          expect(stageDefinitions).toContain(question.correctAnswer)
        })
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createMusicalTermQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createMusicalTermQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 1 musical terms', () => {
        const questions = createMusicalTermQuestions(10, stage)
        const stageDefinitions = Object.values(STAGE_ONE_MUSICAL_TERMS_DEFINITIONS)
        questions.forEach(question => {
          expect(stageDefinitions).toContain(question.correctAnswer)
        })
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createMusicalTermQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createMusicalTermQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should only use stage 2 musical terms', () => {
        const questions = createMusicalTermQuestions(10, stage)
        const stageDefinitions = Object.values(STAGE_TWO_MUSICAL_TERMS_DEFINITIONS)
        questions.forEach(question => {
          expect(stageDefinitions).toContain(question.correctAnswer)
        })
      })
    })
  })
})

