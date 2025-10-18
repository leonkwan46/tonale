import {
  generateMultipleChoiceOptions,
  generateQuestionId,
  selectRandomItems
} from '../helpers/questionHelpers'
import { getAllStageOneTerms, getAllStageThreeTerms, getAllStageTwoTerms, getDisplayName, getSMuFLSymbol } from '../stageSyllabusConfigs/musicalTerms'
import { Question, StageNumber } from '../theoryData/types'

const isSameTerm = (term1: string, term2: string): boolean => {
  return term1 === term2
}

const getStageTerms = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return getAllStageOneTerms()
    case 2:
      return getAllStageTwoTerms()
    case 3:
      return getAllStageThreeTerms()
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

const buildQuestion = (termToTest: string, stage: StageNumber): Question => {
  const stageTerms = getStageTerms(stage)
  const correctDefinition = stageTerms[termToTest as keyof typeof stageTerms]
  const symbol = getSMuFLSymbol(termToTest)
  
  return {
    id: generateQuestionId('musical-term-smufl'),
    question: 'What is this musical term/sign?',
    correctAnswer: correctDefinition,
    choices: generateMultipleChoiceOptions(Object.values(stageTerms), correctDefinition),
    explanation: `The symbol shown represents '${getDisplayName(termToTest)}' which means ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType: termToTest
    },
    metadata: {
      hasSymbol: true,
      symbol,
      category: 'musical-term'
    }
  }
}

export const createMusicalTermQuestions = (
  questionsCount: number, 
  stage: StageNumber
): Question[] => {
  const stageTerms = getStageTerms(stage)
  const availableTerms = Object.keys(stageTerms)
  const termsToTest = selectRandomItems(availableTerms, questionsCount, isSameTerm)
  return termsToTest.map(termToTest => buildQuestion(termToTest, stage))
}

export const createDynamicsQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return createMusicalTermQuestions(questionsCount, stage)
}
