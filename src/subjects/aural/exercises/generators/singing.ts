import type { Question, StageNumber } from '../../curriculum/types'

/**
 * Create singing/melodic echo questions.
 * NOT YET IMPLEMENTED - Future feature requiring pitch detection.
 *
 * @param count - Number of questions to generate
 * @param stage - Stage number (difficulty level)
 * @returns Empty array (not yet implemented)
 */
export const createSingingQuestions = (
  count: number,
  stage: StageNumber
): Question[] => {
  console.warn('Singing exercises not yet implemented - requires pitch detection')
  return []
}
