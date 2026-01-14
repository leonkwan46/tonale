import { ACCIDENTALS, type AccidentalType } from '@leonkwan46/music-notation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { generateQuestionsFromPool, getAccidentals } from '../utils/exercise'
import { generateExplanation } from '../utils/explanation'
import { generateQuestionId, generateWrongChoices } from '../utils/question'

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
  stage: StageNumber,
  correctAccidental?: AccidentalType,
  layoutType?: 'grid' | 'row'
): Question => {
  const stageAccidentals = getAccidentals(stage)
  const selectedAccidental = correctAccidental || stageAccidentals[0]
  const symbolType = ACCIDENTAL_TO_SYMBOL[selectedAccidental]
  const correctAnswer = ACCIDENTAL_NAMES[selectedAccidental]
  
  if (!symbolType || !correctAnswer) {
    throw new Error(`Unsupported accidental type: ${selectedAccidental}`)
  }
  
  const availableChoices = ACCIDENTAL_ORDER.filter(choice => 
    stageAccidentals.some(acc => ACCIDENTAL_NAMES[acc] === choice)
  )
  
  const visualComponent = {
    type: 'termAndSign' as const,
    symbolType,
    enableTTS: false
  }
  
  return {
    id: generateQuestionId('accidental'),
    question: 'What accidental is this?',
    correctAnswer,
    choices: generateWrongChoices(availableChoices, correctAnswer, 3, true),
    explanation: generateExplanation('accidentals', { correctAnswer }, visualComponent),
    type: 'multipleChoice',
    visualComponent,
    layoutType
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const symbolType = question.visualComponent?.symbolType
  if (symbolType) return symbolType
  return question.correctAnswer ?? null
}

export const createAccidentalQuestions = (
  questionsCount: number,
  stage: StageNumber,
  layoutType?: 'grid' | 'row'
): Question[] => {
  const stageAccidentals = getAccidentals(stage)
  const uniquePool = stageAccidentals.map(accidental => 
    createAccidentalQuestion(stage, accidental, layoutType)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
