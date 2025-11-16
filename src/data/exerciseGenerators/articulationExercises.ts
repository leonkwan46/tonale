import { generateQuestionsFromPool } from '../helpers/exerciseHelpers'
import { generateQuestionId, generateWrongChoices } from '../helpers/questionHelpers'
import { getStageOneArticulationTerms } from '../stageSyllabus/musicalTerms'
import { Question, StageNumber } from '../theoryData/types'

export const createArticulationQuestion = (stage: StageNumber, termKey?: string): Question => {
  const articulationTerms = getStageOneArticulationTerms()
  const termKeys = Object.keys(articulationTerms)
  const correctTerm = termKey || termKeys[0]
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

const getQuestionKey = (question: Question): string | null => {
  const symbolType = question.visualComponent?.symbolType
  if (symbolType && typeof symbolType === 'string') {
    return symbolType
  }
  return question.correctAnswer ?? null
}

export const createArticulationQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const articulationTerms = getStageOneArticulationTerms()
  const termKeys = Object.keys(articulationTerms)
  const uniquePool = termKeys.map(termKey => 
    createArticulationQuestion(stage, termKey)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getQuestionKey)
}
