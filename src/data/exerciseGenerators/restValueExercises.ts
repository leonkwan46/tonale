import { getAllRestTypes } from '../helpers/exerciseHelpers'
import {
  generateMultipleChoiceOptions,
  generateQuestionId,
  selectRandomItems
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

type RestType = 'semibreve-rest' | 'minim-rest' | 'crotchet-rest' | 'quaver-rest' | 'semiquaver-rest';

const restTypeToString = (restType: RestType | { type: RestType; dots?: number }) => {
  if (typeof restType === 'object' && restType.type) {
    const { type, dots = 0 } = restType
    const baseName = getBaseRestName(type)
    return dots > 0 ? `Dotted ${baseName}` : baseName
  }
  
  return getBaseRestName(restType as RestType)
}

const getBaseRestName = (restType: RestType) => {
  switch (restType) {
    case 'semibreve-rest': return 'Semibreve Rest'
    case 'minim-rest': return 'Minim Rest'
    case 'crotchet-rest': return 'Crotchet Rest'
    case 'quaver-rest': return 'Quaver Rest'
    case 'semiquaver-rest': return 'Semiquaver Rest'
    default: return restType
  }
}

const isSameRestType = (restType1: RestType | { type: RestType; dots?: number }, restType2: RestType | { type: RestType; dots?: number }): boolean => {
  if (typeof restType1 === 'string' && typeof restType2 === 'string') {
    return restType1 === restType2
  }
  if (typeof restType1 === 'object' && typeof restType2 === 'object') {
    return restType1.type === restType2.type && restType1.dots === restType2.dots
  }
  return false
}

const buildQuestion = (restTypeToTest: RestType | { type: RestType; dots?: number }, stage: StageNumber): Question => {
  const stageRestTypes = getAllRestTypes(stage)
  const correctAnswerString = restTypeToString(restTypeToTest)
  const choiceStrings = stageRestTypes.map(restTypeToString)
  
  return {
    id: generateQuestionId('rest-value'),
    question: 'What is this rest value?',
    correctAnswer: correctAnswerString,
    choices: generateMultipleChoiceOptions(choiceStrings, correctAnswerString),
    explanation: `The correct answer is ${correctAnswerString}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'noteValue',
      noteType: restTypeToTest
    }
  }
}

export const createRestValueQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const availableRestTypes = getAllRestTypes(stage)
  const restTypesToTest = selectRandomItems(availableRestTypes, questionsCount, isSameRestType)
  return restTypesToTest.map(restTypeToTest => buildQuestion(restTypeToTest, stage))
}
