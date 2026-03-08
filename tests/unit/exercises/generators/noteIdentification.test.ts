import { createNoteIdentificationQuestion, createNoteIdentificationQuestions } from '@/subjects/theory/exercises/generators/noteIdentification'
import type { Question } from '@/types/lesson'
import {
  validateCorrectAnswerInChoices,
  validatePitchForStage,
  validateQuestionCount,
  validateQuestionStructure,
  validateUniqueChoices,
  validateUniqueQuestions
} from '../../helpers/testHelpers'

describe('noteIdentification generator', () => {
  describe('createNoteIdentificationQuestion', () => {
    describe('Stage 0', () => {
      describe('Treble clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          validateCorrectAnswerInChoices(question)
        })

        it('should have unique choices', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          validateUniqueChoices(question)
        })

        it('should have type multipleChoice', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          expect(question.type).toBe('multipleChoice')
        })

        it('should have valid visual component with treble clef', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          expect(question.visualComponent).toBeDefined()
          expect(question.visualComponent?.clef).toBe('treble')
          expect(question.visualComponent?.elements).toBeDefined()
          expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
          expect(question.visualComponent?.elements?.length).toBeGreaterThan(0)
        })

        it('should have explanation', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          expect(question.explanation).toBeDefined()
          expect(question.explanation?.text).toBeDefined()
          expect(typeof question.explanation?.text).toBe('string')
        })

        it('should include treble clef in question text', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          expect(question.question).toContain('treble')
        })

        it('should use stage 0 note range for treble clef', () => {
          const question = createNoteIdentificationQuestion(0, 'treble')
          const pitch = question.visualComponent?.elements?.[0]?.pitch
          expect(pitch).toBeDefined()
          if (pitch) {
            validatePitchForStage(pitch, 0, 'treble')
          }
        })

        it('should accept custom noteData parameter', () => {
          const customNoteData = {
            pitch: 'C4',
            name: 'C',
            letterName: 'C',
            stem: 'up' as const,
            ledgerLines: 0
          }
          const question = createNoteIdentificationQuestion(0, 'treble', customNoteData)
          expect(question.correctAnswer).toBe('C')
          expect(question.visualComponent?.elements?.[0]?.pitch).toBe('C4')
        })

        it('should throw error if noteData missing letterName', () => {
          const invalidNoteData = {
            pitch: 'C4',
            name: 'C',
            stem: 'up' as const,
            ledgerLines: 0
          }
          expect(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            createNoteIdentificationQuestion(0, 'treble', invalidNoteData as any)
          }).toThrow('Note data missing letterName')
        })
      })

      describe('Bass clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createNoteIdentificationQuestion(0, 'bass')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createNoteIdentificationQuestion(0, 'bass')
          validateCorrectAnswerInChoices(question)
        })

        it('should have unique choices', () => {
          const question = createNoteIdentificationQuestion(0, 'bass')
          validateUniqueChoices(question)
        })

        it('should have valid visual component with bass clef', () => {
          const question = createNoteIdentificationQuestion(0, 'bass')
          expect(question.visualComponent).toBeDefined()
          expect(question.visualComponent?.clef).toBe('bass')
          expect(question.visualComponent?.elements).toBeDefined()
          expect(Array.isArray(question.visualComponent?.elements)).toBe(true)
          expect(question.visualComponent?.elements?.length).toBeGreaterThan(0)
        })

        it('should include bass clef in question text', () => {
          const question = createNoteIdentificationQuestion(0, 'bass')
          expect(question.question).toContain('bass')
        })

        it('should use stage 0 note range for bass clef', () => {
          const question = createNoteIdentificationQuestion(0, 'bass')
          const pitch = question.visualComponent?.elements?.[0]?.pitch
          expect(pitch).toBeDefined()
          if (pitch) {
            validatePitchForStage(pitch, 0, 'bass')
          }
        })
      })
    })

    describe('Stage 1', () => {
      describe('Treble clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createNoteIdentificationQuestion(1, 'treble')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createNoteIdentificationQuestion(1, 'treble')
          validateCorrectAnswerInChoices(question)
        })

        it('should use stage 1 note range for treble clef', () => {
          const question = createNoteIdentificationQuestion(1, 'treble')
          const pitch = question.visualComponent?.elements?.[0]?.pitch
          expect(pitch).toBeDefined()
          if (pitch) {
            validatePitchForStage(pitch, 1, 'treble')
          }
        })
      })

      describe('Bass clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createNoteIdentificationQuestion(1, 'bass')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createNoteIdentificationQuestion(1, 'bass')
          validateCorrectAnswerInChoices(question)
        })

        it('should use stage 1 note range for bass clef', () => {
          const question = createNoteIdentificationQuestion(1, 'bass')
          const pitch = question.visualComponent?.elements?.[0]?.pitch
          expect(pitch).toBeDefined()
          if (pitch) {
            validatePitchForStage(pitch, 1, 'bass')
          }
        })
      })
    })

    describe('Stage 2', () => {
      describe('Treble clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createNoteIdentificationQuestion(2, 'treble')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createNoteIdentificationQuestion(2, 'treble')
          validateCorrectAnswerInChoices(question)
        })

        it('should use stage 2 note range for treble clef', () => {
          const question = createNoteIdentificationQuestion(2, 'treble')
          const pitch = question.visualComponent?.elements?.[0]?.pitch
          expect(pitch).toBeDefined()
          if (pitch) {
            validatePitchForStage(pitch, 2, 'treble')
          }
        })
      })

      describe('Bass clef', () => {
        it('should create a valid question with required fields', () => {
          const question = createNoteIdentificationQuestion(2, 'bass')
          validateQuestionStructure(question)
        })

        it('should include correct answer in choices', () => {
          const question = createNoteIdentificationQuestion(2, 'bass')
          validateCorrectAnswerInChoices(question)
        })

        it('should use stage 2 note range for bass clef', () => {
          const question = createNoteIdentificationQuestion(2, 'bass')
          const pitch = question.visualComponent?.elements?.[0]?.pitch
          expect(pitch).toBeDefined()
          if (pitch) {
            validatePitchForStage(pitch, 2, 'bass')
          }
        })
      })
    })
  })

  describe('createNoteIdentificationQuestions', () => {
    describe('Stage 0', () => {
      describe('Treble clef', () => {
        it('should generate requested number of questions', () => {
          const questions = createNoteIdentificationQuestions(5, 0, 'treble')
          validateQuestionCount(questions, 5)
        })

        it('should generate unique questions', () => {
          const questions = createNoteIdentificationQuestions(10, 0, 'treble')
          validateUniqueQuestions(questions)
        })

        it('should generate questions with valid structure', () => {
          const questions = createNoteIdentificationQuestions(3, 0, 'treble')
          questions.forEach((question: Question) => {
            validateQuestionStructure(question)
            validateCorrectAnswerInChoices(question)
          })
        })

        it('should handle single question generation', () => {
          const questions = createNoteIdentificationQuestions(1, 0, 'treble')
          validateQuestionCount(questions, 1)
          validateQuestionStructure(questions[0])
        })

        it('should only use stage 0 note range', () => {
          const questions = createNoteIdentificationQuestions(10, 0, 'treble')
          questions.forEach((question: Question) => {
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, 0, 'treble')
            }
          })
          const pitches = new Set(
            questions.map((q: Question) => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
          )
          expect(pitches.size).toBeGreaterThan(0)
        })

        it('should have treble clef in all questions', () => {
          const questions = createNoteIdentificationQuestions(5, 0, 'treble')
          questions.forEach((question: Question) => {
            expect(question.visualComponent?.clef).toBe('treble')
          })
        })
      })

      describe('Bass clef', () => {
        it('should generate requested number of questions', () => {
          const questions = createNoteIdentificationQuestions(5, 0, 'bass')
          validateQuestionCount(questions, 5)
        })

        it('should generate unique questions', () => {
          const questions = createNoteIdentificationQuestions(10, 0, 'bass')
          validateUniqueQuestions(questions)
        })

        it('should only use stage 0 note range', () => {
          const questions = createNoteIdentificationQuestions(10, 0, 'bass')
          questions.forEach((question: Question) => {
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, 0, 'bass')
            }
          })
          const pitches = new Set(
            questions.map((q: Question) => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
          )
          expect(pitches.size).toBeGreaterThan(0)
        })

        it('should have bass clef in all questions', () => {
          const questions = createNoteIdentificationQuestions(5, 0, 'bass')
          questions.forEach((question: Question) => {
            expect(question.visualComponent?.clef).toBe('bass')
          })
        })
      })
    })

    describe('Stage 1', () => {
      describe('Treble clef', () => {
        it('should generate requested number of questions', () => {
          const questions = createNoteIdentificationQuestions(5, 1, 'treble')
          validateQuestionCount(questions, 5)
        })

        it('should generate unique questions', () => {
          const questions = createNoteIdentificationQuestions(10, 1, 'treble')
          validateUniqueQuestions(questions)
        })

        it('should only use stage 1 note range', () => {
          const questions = createNoteIdentificationQuestions(10, 1, 'treble')
          questions.forEach((question: Question) => {
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, 1, 'treble')
            }
          })
          const pitches = new Set(
            questions.map((q: Question) => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
          )
          expect(pitches.size).toBeGreaterThan(0)
        })
      })

      describe('Bass clef', () => {
        it('should generate requested number of questions', () => {
          const questions = createNoteIdentificationQuestions(5, 1, 'bass')
          validateQuestionCount(questions, 5)
        })

        it('should generate unique questions', () => {
          const questions = createNoteIdentificationQuestions(10, 1, 'bass')
          validateUniqueQuestions(questions)
        })

        it('should only use stage 1 note range', () => {
          const questions = createNoteIdentificationQuestions(10, 1, 'bass')
          questions.forEach((question: Question) => {
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, 1, 'bass')
            }
          })
          const pitches = new Set(
            questions.map((q: Question) => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
          )
          expect(pitches.size).toBeGreaterThan(0)
        })
      })
    })

    describe('Stage 2', () => {
      describe('Treble clef', () => {
        it('should generate requested number of questions', () => {
          const questions = createNoteIdentificationQuestions(5, 2, 'treble')
          validateQuestionCount(questions, 5)
        })

        it('should generate unique questions', () => {
          const questions = createNoteIdentificationQuestions(10, 2, 'treble')
          validateUniqueQuestions(questions)
        })

        it('should only use stage 2 note range', () => {
          const questions = createNoteIdentificationQuestions(10, 2, 'treble')
          questions.forEach((question: Question) => {
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, 2, 'treble')
            }
          })
          const pitches = new Set(
            questions.map((q: Question) => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
          )
          expect(pitches.size).toBeGreaterThan(0)
        })
      })

      describe('Bass clef', () => {
        it('should generate requested number of questions', () => {
          const questions = createNoteIdentificationQuestions(5, 2, 'bass')
          validateQuestionCount(questions, 5)
        })

        it('should generate unique questions', () => {
          const questions = createNoteIdentificationQuestions(10, 2, 'bass')
          validateUniqueQuestions(questions)
        })

        it('should only use stage 2 note range', () => {
          const questions = createNoteIdentificationQuestions(10, 2, 'bass')
          questions.forEach((question: Question) => {
            const pitch = question.visualComponent?.elements?.[0]?.pitch
            if (pitch) {
              validatePitchForStage(pitch, 2, 'bass')
            }
          })
          const pitches = new Set(
            questions.map((q: Question) => q.visualComponent?.elements?.[0]?.pitch).filter(Boolean)
          )
          expect(pitches.size).toBeGreaterThan(0)
        })
      })
    })
  })
})
