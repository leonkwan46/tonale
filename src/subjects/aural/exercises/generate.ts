import type { ExerciseConfig, Question } from '../curriculum/types'
import { createDynamicsQuestions } from './generators/dynamics'
import { createPulseQuestions } from './generators/pulse'
import { createRhythmQuestions } from './generators/rhythm'
import { createSingingQuestions } from './generators/singing'

/**
 * Main dispatcher for generating aural exercise questions.
 * Routes to appropriate generator based on exercise config.
 *
 * @param config - Exercise configuration specifying generator type, count, and stage
 * @returns Array of generated questions
 */
export const generateAuralQuestions = (config: ExerciseConfig): Question[] => {
  const { generatorType, questionsCount, stage } = config

  switch (generatorType) {
    case 'pulse':
      return createPulseQuestions(questionsCount, stage)
    case 'rhythm':
      return createRhythmQuestions(questionsCount, stage)
    case 'singing':
      return createSingingQuestions(questionsCount, stage)
    case 'dynamics':
      return createDynamicsQuestions(questionsCount, stage)
    case 'aural-stage-0-final':
      const questions: Question[] = []
      questions.push(...createRhythmQuestions(2, stage))
      // TODO: Add pulse questions when available
      // questions.push(...createPulseQuestions(2, stage))
      return questions
    default:
      console.warn(`Unknown aural generator type: ${generatorType}`)
      return []
  }
}
