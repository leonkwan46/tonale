import { type TimeSignatureType } from '@leonkwan46/music-notation'
import { generateQuestionsFromPool, getTimeSignatures } from '../helpers/exerciseHelpers'
import { generateQuestionId, generateWrongChoices } from '../helpers/questionHelpers'
import { formatAsNotation, formatAsText, generateWrongAnswers } from '../helpers/timeSignatureHelpers'
import { Question, StageNumber } from '../theoryData/types'


export const createTimeSignatureQuestion = (
  stage: StageNumber,
  timeSignature: TimeSignatureType
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
  
  return {
    id: generateQuestionId('time-sig'),
    question: `What does the ${notation} time signature mean?`,
    correctAnswer,
    choices: generateWrongChoices(wrongAnswers, correctAnswer),
    explanation: `The ${notation} time signature means ${correctAnswer}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'timeSignature',
      timeSignatureValue: notation
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const timeSignatureValue = question.visualComponent?.timeSignatureValue
  return timeSignatureValue ?? null
}

export const createTimeSignatureQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const availableTimeSignatures = getTimeSignatures(stage)
  
  if (availableTimeSignatures.length === 1) {
    return Array.from({ length: questionsCount }, () => 
      createTimeSignatureQuestion(stage, availableTimeSignatures[0])
    )
  }
  
  const uniquePool = availableTimeSignatures.map(timeSignature => 
    createTimeSignatureQuestion(stage, timeSignature)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
