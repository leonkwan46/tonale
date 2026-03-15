import { getAllRestTypes } from '../../utils/exercise'
import {
  generateQuestionId,
  THEORY_QUESTION_ID_PREFIX,
  generateWrongChoices
} from '../../utils/question'
import { ensureFourChoicesForStage2, restTypeToString } from '../../utils/timeValue'
import { generateExplanation } from '../../utils/explanation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'

export const createRestValueQuestion = (
  stage: StageNumber,
  restType?: { type: string; dots?: number },
  layoutType?: 'grid' | 'row'
): Question => {
  const stageRestTypes = getAllRestTypes(stage)
  const correctRestType = restType || stageRestTypes[0]
  
  const correctAnswerString = restTypeToString(correctRestType)
  let choiceStrings = stageRestTypes.map(restTypeToString)
  choiceStrings = ensureFourChoicesForStage2(stage, choiceStrings, correctAnswerString, true)
  
  const visualComponent = {
    type: 'noteValue' as const,
    noteType: correctRestType
  }
  
  return {
    id: generateQuestionId(THEORY_QUESTION_ID_PREFIX.REST_VALUE_NAME),
    question: 'What is this rest value?',
    correctAnswer: correctAnswerString,
    choices: generateWrongChoices(choiceStrings, correctAnswerString),
    explanation: generateExplanation('restValue', { correctAnswer: correctAnswerString }, visualComponent),
    type: 'multipleChoice',
    visualComponent,
    questionInterface: { type: 'notation' },
    layoutType
  }
}

