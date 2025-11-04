import { ACCIDENTALS, type AccidentalType } from '@leonkwan46/music-notation'
import { getAccidentals } from '../helpers/exerciseHelpers'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const ACCIDENTAL_TO_SYMBOL: Partial<Record<AccidentalType, string>> = {
  [ACCIDENTALS.SHARP]: 'sharp',
  [ACCIDENTALS.FLAT]: 'flat',
  [ACCIDENTALS.NATURAL]: 'natural'
}

const ACCIDENTAL_NAMES: Partial<Record<AccidentalType, string>> = {
  [ACCIDENTALS.SHARP]: 'Sharp',
  [ACCIDENTALS.FLAT]: 'Flat',
  [ACCIDENTALS.NATURAL]: 'Natural'
}

const ACCIDENTAL_ORDER = ['Sharp', 'Flat', 'Natural'] as const

export const createAccidentalQuestion = (
  stage: StageNumber
): Question => {
  const stageAccidentals = getAccidentals(stage)
  const correctAccidental = getRandomItem(stageAccidentals)
  const symbolType = ACCIDENTAL_TO_SYMBOL[correctAccidental]
  const correctAnswer = ACCIDENTAL_NAMES[correctAccidental]
  
  if (!symbolType || !correctAnswer) {
    throw new Error(`Unsupported accidental type: ${correctAccidental}`)
  }
  
  const availableChoices = ACCIDENTAL_ORDER.filter(choice => 
    stageAccidentals.some(acc => ACCIDENTAL_NAMES[acc] === choice)
  )
  
  return {
    id: generateQuestionId('accidental'),
    question: 'What accidental is this?',
    correctAnswer,
    choices: generateWrongChoices(availableChoices, correctAnswer, 3, true),
    explanation: `This is a ${correctAnswer.toLowerCase()} accidental.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType
    }
  }
}

export const createAccidentalQuestions = (
  questionsCount: number,
  stage: StageNumber
): Question[] => {
  return Array.from({ length: questionsCount }, () => createAccidentalQuestion(stage))
}
