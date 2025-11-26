import { generateQuestionsFromPool, getAllRestTypes } from '../../utils/exercise'
import {
  generateQuestionId,
  generateWrongChoices
} from '../../utils/question'
import { ensureFourChoicesForStage2, restTypeToString } from '../../utils/timeValue'
import { Question, StageNumber } from '../../curriculum/types'

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
    question: 'What is this rest value?',
    correctAnswer: correctAnswerString,
    choices: generateWrongChoices(choiceStrings, correctAnswerString),
    explanation: `The correct answer is ${correctAnswerString}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'noteValue',
      noteType: correctRestType
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const noteType = question.visualComponent?.noteType
  if (noteType !== undefined) {
    return typeof noteType === 'string' ? noteType : JSON.stringify(noteType)
  }
  return question.correctAnswer ?? null
}

export const createRestValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const stageRestTypes = getAllRestTypes(stage)
  const uniquePool = stageRestTypes.map(restType => 
    createRestValueQuestion(stage, restType)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
