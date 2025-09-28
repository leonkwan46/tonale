// Enhanced musical terms exercise generators with SMuFL support
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { getAllStageOneTerms, getDisplayName, getSMuFLSymbol } from '../stageSyllabusConfigs/musicalTerms'
import { Question, StageNumber } from '../theoryData/types'

// Create a musical term question with SMuFL symbol
export const createMusicalTermQuestion = (stage: StageNumber, includeSymbol = true): Question => {
  // Get all terms
  const allTerms = getAllStageOneTerms()
  const allKeys = Object.keys(allTerms)
  const correctTerm = getRandomItem(allKeys)
  const correctDefinition = allTerms[correctTerm as keyof typeof allTerms]
  const symbol = getSMuFLSymbol(correctTerm)
  
  // Generic question text - the symbol will be shown in the visual component
  const questionText = 'What is this musical term/sign?'
  
  return {
    id: generateQuestionId('musical-term-smufl'),
    question: questionText,
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(allTerms), correctDefinition),
    explanation: `The symbol shown represents '${getDisplayName(correctTerm)}' which means ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'smuflSymbol',
      symbolType: correctTerm
    },
    metadata: {
      hasSymbol: true,
      symbol,
      category: 'musical-term'
    }
  }
}

// Create dynamics-specific questions with SMuFL symbols (alias for createMusicalTermQuestions)
export const createDynamicsQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return createMusicalTermQuestions(questionsCount, stage, true)
}


// Create multiple dynamics-focused musical term questions with SMuFL symbols
export const createMusicalTermQuestions = (
  questionsCount: number, 
  stage: StageNumber, 
  includeSymbol = true
): Question[] => {
  return Array.from({ length: questionsCount }, () => 
    createMusicalTermQuestion(stage, includeSymbol)
  )
}
