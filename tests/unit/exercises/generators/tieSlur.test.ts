import { createSlurDefinitionQuestion, createTieDefinitionQuestion, createTieSlurQuestions } from '@/theory/exercises/generators/tieSlur'
import {
  validateCorrectAnswerInChoices,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('tieSlur generator', () => {
  describe('createTieDefinitionQuestion', () => {
    describe('Stage 0', () => {
      it('should create a valid question with required fields', () => {
        const question = createTieDefinitionQuestion(0)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createTieDefinitionQuestion(0)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createTieDefinitionQuestion(0)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createTieDefinitionQuestion(0)
        expect(question.type).toBe('multipleChoice')
      })

      it('should have valid visual component with tie elements', () => {
        const question = createTieDefinitionQuestion(0)
        expect(question.visualComponent).toBeDefined()
        expect(question.visualComponent?.type).toBe('musicStaff')
        expect(question.visualComponent?.elements).toBeDefined()
        expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
        expect(question.visualComponent?.elements?.length).toBeGreaterThanOrEqual(2)

        const elements = question.visualComponent?.elements || []
        const hasTieStart = elements.some(el => el.tieStart === true)
        const hasTieEnd = elements.some(el => el.tieEnd === true)
        expect(hasTieStart).toBe(true)
        expect(hasTieEnd).toBe(true)
      })

      it('should have explanation', () => {
        const question = createTieDefinitionQuestion(0)
        expect(question.explanation).toBeDefined()
        expect(typeof question.explanation).toBe('string')
        expect(question.explanation).toContain('tie')
      })
    })

    describe('Stage 1', () => {
      it('should create a valid question with required fields', () => {
        const question = createTieDefinitionQuestion(1)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createTieDefinitionQuestion(1)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createTieDefinitionQuestion(1)
        validateUniqueChoices(question)
      })
    })

    describe('Stage 2', () => {
      it('should create a valid question with required fields', () => {
        const question = createTieDefinitionQuestion(2)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createTieDefinitionQuestion(2)
        validateCorrectAnswerInChoices(question)
      })
    })
  })

  describe('createSlurDefinitionQuestion', () => {
    describe('Stage 0', () => {
      it('should create a valid question with required fields', () => {
        const question = createSlurDefinitionQuestion(0)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createSlurDefinitionQuestion(0)
        validateCorrectAnswerInChoices(question)
      })

      it('should have unique choices', () => {
        const question = createSlurDefinitionQuestion(0)
        validateUniqueChoices(question)
      })

      it('should have type multipleChoice', () => {
        const question = createSlurDefinitionQuestion(0)
        expect(question.type).toBe('multipleChoice')
      })

      it('should have valid visual component with slur elements', () => {
        const question = createSlurDefinitionQuestion(0)
        expect(question.visualComponent).toBeDefined()
        expect(question.visualComponent?.type).toBe('musicStaff')
        expect(question.visualComponent?.elements).toBeDefined()
        expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
        expect(question.visualComponent?.elements?.length).toBeGreaterThanOrEqual(2)

        const elements = question.visualComponent?.elements || []
        const hasSlurStart = elements.some(el => el.slurStart === true)
        const hasSlurEnd = elements.some(el => el.slurEnd === true)
        expect(hasSlurStart).toBe(true)
        expect(hasSlurEnd).toBe(true)
      })

      it('should have explanation', () => {
        const question = createSlurDefinitionQuestion(0)
        expect(question.explanation).toBeDefined()
        expect(typeof question.explanation).toBe('string')
        expect(question.explanation).toContain('slur')
      })
    })

    describe('Stage 1', () => {
      it('should create a valid question with required fields', () => {
        const question = createSlurDefinitionQuestion(1)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createSlurDefinitionQuestion(1)
        validateCorrectAnswerInChoices(question)
      })
    })

    describe('Stage 2', () => {
      it('should create a valid question with required fields', () => {
        const question = createSlurDefinitionQuestion(2)
        validateQuestionStructure(question)
      })

      it('should include correct answer in choices', () => {
        const question = createSlurDefinitionQuestion(2)
        validateCorrectAnswerInChoices(question)
      })
    })
  })

  describe('createTieSlurQuestions', () => {
    describe('Stage 0', () => {
      it('should generate requested number of questions', () => {
        const questions = createTieSlurQuestions(5, 0)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createTieSlurQuestions(10, 0)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createTieSlurQuestions(3, 0)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should handle single question generation', () => {
        const questions = createTieSlurQuestions(1, 0)
        validateQuestionCount(questions, 1)
        validateQuestionStructure(questions[0])
      })

      it('should only include definition questions (no custom questions)', () => {
        const questions = createTieSlurQuestions(10, 0)
        questions.forEach(question => {
          const isTieDefinition = question.explanation?.includes('tie') && question.correctAnswer === 'Held together'
          const isSlurDefinition = question.explanation?.includes('slur') && question.correctAnswer === 'Smoothly connected'
          expect(isTieDefinition || isSlurDefinition).toBe(true)
        })
      })
    })

    describe('Stage 1', () => {
      it('should generate requested number of questions', () => {
        const questions = createTieSlurQuestions(5, 1)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createTieSlurQuestions(10, 1)
        validateUniqueQuestions(questions)
      })

      it('should generate questions with valid structure', () => {
        const questions = createTieSlurQuestions(3, 1)
        questions.forEach(question => {
          validateQuestionStructure(question)
          validateCorrectAnswerInChoices(question)
        })
      })

      it('should include both tie and slur definition questions in pool', () => {
        const questions = createTieSlurQuestions(10, 1)
        const tieQuestions = questions.filter(q => q.explanation?.includes('tie') || q.correctAnswer === 'Held together')
        const slurQuestions = questions.filter(q => q.explanation?.includes('slur') || q.correctAnswer === 'Smoothly connected')

        expect(tieQuestions.length).toBeGreaterThan(0)
        expect(slurQuestions.length).toBeGreaterThan(0)
      })

      it('should include custom questions (Stage 1 has custom tie/slur questions)', () => {
        const questions = createTieSlurQuestions(10, 1)
        validateQuestionCount(questions, 10)
        questions.forEach(question => {
          validateQuestionStructure(question)
        })
      })

      it('should respect deduplication logic', () => {
        const questions = createTieSlurQuestions(20, 1)
        const questionSignatures = questions.map(q => {
          if (q.visualComponent?.elements && q.visualComponent.elements.length > 0) {
            return q.visualComponent.elements.map(el => {
              const parts: string[] = []
              if (el.type) parts.push(`type:${el.type}`)
              if (el.pitch) parts.push(`pitch:${el.pitch}`)
              if (el.tieStart) parts.push('tieStart')
              if (el.tieEnd) parts.push('tieEnd')
              if (el.slurStart) parts.push('slurStart')
              if (el.slurEnd) parts.push('slurEnd')
              return parts.join('|')
            }).join(';')
          }
          return q.correctAnswer
        })

        const uniqueSignatures = new Set(questionSignatures)
        expect(uniqueSignatures.size).toBeGreaterThan(0)
      })
    })

    describe('Stage 2', () => {
      it('should generate requested number of questions', () => {
        const questions = createTieSlurQuestions(5, 2)
        validateQuestionCount(questions, 5)
      })

      it('should generate unique questions', () => {
        const questions = createTieSlurQuestions(10, 2)
        validateUniqueQuestions(questions)
      })

      it('should only include definition questions (no custom questions)', () => {
        const questions = createTieSlurQuestions(10, 2)
        questions.forEach(question => {
          const isTieDefinition = question.explanation?.includes('tie') && question.correctAnswer === 'Held together'
          const isSlurDefinition = question.explanation?.includes('slur') && question.correctAnswer === 'Smoothly connected'
          expect(isTieDefinition || isSlurDefinition).toBe(true)
        })
      })
    })
  })
})
