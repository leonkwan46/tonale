import { Question, StageNumber } from '../../curriculum/types'
import { generateQuestionsFromPool } from '../utils/exercise'
import { createSlurDefinitionQuestion, createTieDefinitionQuestion } from './tieSlur'

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.questionInterface?.symbolType) {
    return String(question.questionInterface.symbolType)
  }
  return typeof question.correctAnswer === 'string' ? question.correctAnswer : null
}

export const createSymbolQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const uniquePool = [createTieDefinitionQuestion(stage), createSlurDefinitionQuestion(stage)]
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}


