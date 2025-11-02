// Rest value exercise generators
import { getAllRestTypes } from '../helpers/exerciseHelpers'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { ensureFourChoicesForStage2, restTypeToString } from '../helpers/timeValueHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a rest value identification question (rests only)
export const createRestValueQuestion = (stage: StageNumber): Question => {
  const stageRestTypes = getAllRestTypes(stage)
  const correctRestType = getRandomItem(stageRestTypes as (string | { type: string; dots?: number })[])
  
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

// Create multiple rest value questions
export const createRestValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createRestValueQuestion(stage))
}
