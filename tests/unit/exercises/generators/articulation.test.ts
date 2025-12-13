import { getStageOneArticulationTerms } from '@/subjects/theory/curriculum/config/musicalTerms'
import { createArticulationQuestion, createArticulationQuestions } from '@/subjects/theory/exercises/generators/articulation'
import {
    validateCorrectAnswerInChoices,
    validateQuestionCount,
    validateQuestionStructure,
    validateUniqueChoices,
    validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('articulation generator', () => {
  describe('createArticulationQuestion', () => {
    describe('Stage 0', () => {
      const stage = 0
      const articulationTerms = getStageOneArticulationTerms()
      const termKeys = Object.keys(articulationTerms)

      it('should create a valid question with required fields', () => {
        const question = createArticulationQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createArticulationQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createArticulationQuestion(stage)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createArticulationQuestion(stage)
        expect(question.answerInterface).toBe('multipleChoice')
      })

      it('should have valid visual component', () => {
        const question = createArticulationQuestion(stage)
        expect(question.questionInterface).toBeDefined()
        expect(['termAndSign', 'musicStaff']).toContain(question.questionInterface?.type)
      })

      it('should have explanation', () => {
        const question = createArticulationQuestion(stage)
        expect(question.explanation).toBeDefined()
        expect(typeof question.explanation).toBe('string')
      })

      it('should only use articulation terms', () => {
        const question = createArticulationQuestion(stage)
        const correctAnswer = question.correctAnswer
        const termDefinitions = Object.values(articulationTerms)
        expect(termDefinitions).toContain(correctAnswer)
      })

      it('should accept custom termKey parameter', () => {
        if (termKeys.length > 0) {
          const question = createArticulationQuestion(stage, termKeys[0])
          expect(question.correctAnswer).toBeDefined()
        }
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should create a valid question with required fields', () => {
        const question = createArticulationQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createArticulationQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should create a valid question with required fields', () => {
        const question = createArticulationQuestion(stage)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createArticulationQuestion(stage)
        validateCorrectAnswerInChoices(question)
      })
    })
  })

  describe('createArticulationQuestions', () => {
    describe('Stage 0', () => {
      const stage = 0

      it('should generate requested number of questions', () => {
        const questions = createArticulationQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createArticulationQuestions(10, stage)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createArticulationQuestions(3, stage)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should only use articulation terms', () => {
        const questions = createArticulationQuestions(10, stage)
        const termDefinitions = Object.values(getStageOneArticulationTerms())
        questions.forEach(question => {
          expect(termDefinitions).toContain(question.correctAnswer)
        })
      })
    })

    describe('Stage 1', () => {
      const stage = 1

      it('should generate requested number of questions', () => {
        const questions = createArticulationQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createArticulationQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })

    describe('Stage 2', () => {
      const stage = 2

      it('should generate requested number of questions', () => {
        const questions = createArticulationQuestions(5, stage)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createArticulationQuestions(10, stage)
        validateUniqueQuestions(questions)
      })
    })
  })
})

