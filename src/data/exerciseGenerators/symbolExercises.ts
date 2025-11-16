import { ARTICULATION_SIGNS_DEFINITIONS } from '../../config/gradeSyllabus/musicalTerms'
import { generateQuestionsFromPool } from '../helpers/exerciseHelpers'
import { generateQuestionId, generateWrongChoices } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const allSignDefinitions = Object.values(ARTICULATION_SIGNS_DEFINITIONS)

export const createTieQuestion = (_stage: StageNumber): Question => {
  const correct = ARTICULATION_SIGNS_DEFINITIONS.tie
  return {
    id: generateQuestionId('tie'),
    question: 'What is this musical symbol?',
    correctAnswer: correct,
    choices: generateWrongChoices(allSignDefinitions, correct),
    explanation: 'A tie connects two notes of the same pitch, combining their durations.',
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType: 'tie'
    }
  }
}

export const createSlurQuestion = (_stage: StageNumber): Question => {
  const correct = ARTICULATION_SIGNS_DEFINITIONS.slur
  return {
    id: generateQuestionId('slur'),
    question: 'What is this musical symbol?',
    correctAnswer: correct,
    choices: generateWrongChoices(allSignDefinitions, correct),
    explanation: 'A slur indicates that notes should be played smoothly and connected.',
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType: 'slur'
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.visualComponent?.symbolType) {
    return String(question.visualComponent.symbolType)
  }
  return question.correctAnswer ?? null
}

export const createSymbolQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const uniquePool = [createTieQuestion(stage), createSlurQuestion(stage)]
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}


