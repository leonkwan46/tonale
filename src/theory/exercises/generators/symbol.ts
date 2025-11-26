import { generateQuestionsFromPool } from '../../utils/exercise'
import { Question, StageNumber } from '../../curriculum/types'
import { createSlurDefinitionQuestion, createTieDefinitionQuestion } from './tieSlur'

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.visualComponent?.symbolType) {
    return String(question.visualComponent.symbolType)
  }
  return question.correctAnswer ?? null
}

export const createSymbolQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const uniquePool = [createTieDefinitionQuestion(stage), createSlurDefinitionQuestion(stage)]
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}


