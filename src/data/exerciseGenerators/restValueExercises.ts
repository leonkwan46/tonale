// Rest value exercise generators
import { getAllRestTypes } from '../helpers/exerciseHelpers'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a rest value identification question (rests only)
export const createRestValueQuestion = (stage: StageNumber): Question => {
  const stageRestTypes = getAllRestTypes(stage)
  const correctRestType = getRandomItem(stageRestTypes)
  
  // Convert rest type constant or object to readable string for choices
  const restTypeToString = (restType: string | { type: string; dots?: number }) => {
    // Handle dotted rest objects
    if (typeof restType === 'object' && restType.type) {
      const { type, dots = 0 } = restType
      const baseName = getBaseRestName(type)
      return dots > 0 ? `Dotted ${baseName}` : baseName
    }
    
    // Handle string rest types (legacy support)
    return getBaseRestName(restType as string)
  }
  
  const getBaseRestName = (restType: string) => {
    switch (restType) {
      case 'semibreve-rest': return 'Semibreve Rest'
      case 'minim-rest': return 'Minim Rest'
      case 'crotchet-rest': return 'Crotchet Rest'
      case 'quaver-rest': return 'Quaver Rest'
      case 'semiquaver-rest': return 'Semiquaver Rest'
      default: return restType.toLowerCase()
    }
  }
  
  const correctAnswerString = restTypeToString(correctRestType)
  const choiceStrings = stageRestTypes.map(restTypeToString)
  
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
