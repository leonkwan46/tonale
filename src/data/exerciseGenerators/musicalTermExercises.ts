// Enhanced musical terms exercise generators with SMuFL support
import { getSMuFLSymbol } from '../../sharedComponents/SMuFLSymbols'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { getStageOneTermsByCategory } from '../stageSyllabusConfigs/musicalTerms'
import { Question, StageNumber } from '../theoryData/types'

// SMuFL symbol mapping for dynamics
const DYNAMICS_SYMBOLS = {
  'Piano': getSMuFLSymbol('PIANO'),
  'Mezzo': getSMuFLSymbol('MEZZO'),
  'Forte': getSMuFLSymbol('FORTE'),
  'Crescendo': getSMuFLSymbol('CRESCENDO'),
  'Diminuendo': getSMuFLSymbol('DECRESCENDO')
}

// Create a dynamics-focused musical term question with SMuFL symbol
export const createMusicalTermQuestion = (stage: StageNumber, includeSymbol = true): Question => {
  // Focus only on dynamics terms with SMuFL symbols
  const dynamicsTerms = getStageOneTermsByCategory('dynamics')
  const dynamicsKeys = Object.keys(dynamicsTerms)
  const correctTerm = getRandomItem(dynamicsKeys)
  const correctDefinition = dynamicsTerms[correctTerm as keyof typeof dynamicsTerms]
  const symbol = DYNAMICS_SYMBOLS[correctTerm as keyof typeof DYNAMICS_SYMBOLS]
  
  // Generic question text - the symbol will be shown in the visual component
  const questionText = 'What is this musical term/sign?'
  
  return {
    id: generateQuestionId('musical-term-smufl'),
    question: questionText,
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(dynamicsTerms), correctDefinition),
    explanation: `The symbol shown represents '${correctTerm}' which means ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'smuflSymbol',
      symbolType: correctTerm
    },
    metadata: {
      hasSymbol: true,
      symbol,
      category: 'dynamics'
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
