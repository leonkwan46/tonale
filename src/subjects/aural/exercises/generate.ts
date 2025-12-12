import { ExerciseConfig, Question } from '../curriculum/types'
import {
  createDynamicsQuestions,
  createPulseQuestions,
  createRhythmQuestions,
  createSingingQuestions
} from './generators'

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
    default:
      console.warn(`Unknown aural generator type: ${generatorType}`)
      return []
  }
}

