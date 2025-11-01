// Articulation and expression exercise generators
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { getStageOneArticulationTerms } from '../stageSyllabus/musicalTerms'
import { Question, StageNumber } from '../theoryData/types'

// Create an articulation term question
export const createArticulationQuestion = (stage: StageNumber): Question => {
  const articulationTerms = getStageOneArticulationTerms()
  const termKeys = Object.keys(articulationTerms)
  const correctTerm = getRandomItem(termKeys)
  const correctDefinition = articulationTerms[correctTerm as keyof typeof articulationTerms]
  
  return {
    id: generateQuestionId('articulation'),
    question: 'What does this articulation marking mean?',
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(articulationTerms), correctDefinition),
    explanation: `The articulation marking '${correctTerm}' means ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType: correctTerm
    }
  }
}

// Create multiple articulation questions
export const createArticulationQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createArticulationQuestion(stage))
}
