// Musical terms exercise generators
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { getAllStageOneTerms } from '../stageSyllabusConfigs/musicalTerms'
import { Question, StageNumber } from '../theoryData/types'

// Create a musical term question
export const createMusicalTermQuestion = (stage: StageNumber): Question => {
  const stageOneTerms = getAllStageOneTerms()
  const terms = Object.keys(stageOneTerms)
  const correctTerm = getRandomItem(terms)
  const correctDefinition = stageOneTerms[correctTerm as keyof typeof stageOneTerms]
  
  return {
    id: generateQuestionId('musical-term'),
    question: `What does '${correctTerm}' mean?`,
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(stageOneTerms), correctDefinition),
    explanation: `'${correctTerm}' means ${correctDefinition}.`,
    type: 'multipleChoice'
  }
}

// Create multiple musical term questions
export const createMusicalTermQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createMusicalTermQuestion(stage))
}
