import { Question, StageNumber } from '../../curriculum/types'
import { generateQuestionsFromPool, getAllRestTypes } from '../utils/exercise'
import {
    generateQuestionId,
    generateWrongChoices
} from '../utils/question'
import { ensureFourChoicesForStage2, restTypeToString } from '../utils/timeValue'

export const createRestValueQuestion = (
  stage: StageNumber,
  restType?: string | { type: string; dots?: number }
): Question => {
  const stageRestTypes = getAllRestTypes(stage)
  const correctRestType = restType || stageRestTypes[0]
  
  const correctAnswerString = restTypeToString(correctRestType)
  let choiceStrings = stageRestTypes.map(restTypeToString)
  choiceStrings = ensureFourChoicesForStage2(stage, choiceStrings, correctAnswerString, true)
  
  return {
    id: generateQuestionId('rest-value'),
    title: 'What is this rest value?',
    correctAnswer: correctAnswerString,
    choices: generateWrongChoices(choiceStrings, correctAnswerString),
    explanation: `The correct answer is ${correctAnswerString}.`,
    answerInterface: 'multipleChoice',
    questionInterface: {
      type: 'noteValue',
      noteType: correctRestType
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const noteType = question.questionInterface?.noteType
  if (noteType !== undefined) {
    return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
  }
  return typeof question.correctAnswer === 'string' ? question.correctAnswer : null
}

export const createRestValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageRestTypes = getAllRestTypes(stage)
  const uniquePool = stageRestTypes.map(restType => 
    createRestValueQuestion(stage, restType)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
