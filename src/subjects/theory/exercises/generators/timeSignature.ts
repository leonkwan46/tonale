import { type TimeSignatureType } from '@leonkwan46/music-notation'
import { generateQuestionsFromPool, getTimeSignatures } from '../utils/exercise'
import { generateQuestionId, generateWrongChoices } from '../utils/question'
import { formatAsNotation, formatAsText, generateWrongAnswers } from '../utils/timeSignature'
import { generateExplanation } from '../utils/explanation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'


export const createTimeSignatureQuestion = (
  stage: StageNumber,
  timeSignature: TimeSignatureType,
  layoutType?: 'grid' | 'row'
): Question => {
  const availableTimeSignatures = getTimeSignatures(stage)
  const isValid = availableTimeSignatures.some(ts => {
    if (typeof ts === 'string' && typeof timeSignature === 'string') {
      return ts === timeSignature
    }
    if (typeof ts === 'object' && typeof timeSignature === 'object') {
      return ts.topNumber === timeSignature.topNumber && ts.bottomNumber === timeSignature.bottomNumber
    }
    return false
  })
  
  if (!isValid) {
    throw new Error(`Time signature ${formatAsNotation(timeSignature)} is not valid for stage ${stage}`)
  }
  
  const notation = formatAsNotation(timeSignature)
  const correctAnswer = formatAsText(timeSignature)
  const wrongAnswers = generateWrongAnswers(timeSignature)
  
  const visualComponent = {
    type: 'timeSignature' as const,
    timeSignatureValue: notation
  }
  
  return {
    id: generateQuestionId('time-sig'),
    question: `What does the ${notation} time signature mean?`,
    correctAnswer,
    choices: generateWrongChoices(wrongAnswers, correctAnswer),
    explanation: generateExplanation('timeSignature', {
      correctAnswer,
      timeSignature,
      notation
    }, visualComponent),
    type: 'multipleChoice',
    visualComponent,
    layoutType
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const timeSignatureValue = question.visualComponent?.timeSignatureValue
  return timeSignatureValue ?? null
}

export const createTimeSignatureQuestions = (questionsCount: number, stage: StageNumber, layoutType?: 'grid' | 'row'): Question[] => {
  const availableTimeSignatures = getTimeSignatures(stage)
  
  if (availableTimeSignatures.length === 1) {
    return Array.from({ length: questionsCount }, () => 
      createTimeSignatureQuestion(stage, availableTimeSignatures[0], layoutType)
    )
  }
  
  const uniquePool = availableTimeSignatures.map(timeSignature => 
    createTimeSignatureQuestion(stage, timeSignature, layoutType)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
