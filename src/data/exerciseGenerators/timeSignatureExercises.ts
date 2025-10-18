import { type TimeSignatureType } from '@leonkwan46/music-notation'
import { getTimeSignatures } from '../helpers/exerciseHelpers'
import {
  capitalize,
  generateMultipleChoiceOptions,
  generateQuestionId,
  selectRandomItems
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const formatAsNotation = (timeSignature: TimeSignatureType): string => {
  if (typeof timeSignature === 'string') {
    return timeSignature
  }
  return `${timeSignature.topNumber}/${timeSignature.bottomNumber}`
}

const getNoteValueName = (bottomNumber: number): string => {
  switch (bottomNumber) {
    case 1: return 'semibreve'
    case 2: return 'minim'
    case 4: return 'crotchet'
    case 8: return 'quaver'
    case 16: return 'semiquaver'
    default: 
      throw new Error(`Unsupported time signature bottom number: ${bottomNumber}`)
  }
}

const formatAsText = (timeSignature: TimeSignatureType): string => {
  if (typeof timeSignature === 'string') {
    if (timeSignature === 'common') return '4 Crotchet Beats'
    if (timeSignature === 'cut') return '2 Minim Beats'
  }
  const beatCount = timeSignature.topNumber
  const noteValueName = getNoteValueName(timeSignature.bottomNumber)
  return `${beatCount} ${capitalize(noteValueName)} Beats`
}

const generateWrongAnswers = (timeSignature: TimeSignatureType): string[] => {
  const beatCount = typeof timeSignature === 'string' 
    ? (timeSignature === 'common' ? 4 : 2)
    : timeSignature.topNumber
  
  const noteValueName = typeof timeSignature === 'string'
    ? (timeSignature === 'common' ? 'crotchet' : 'minim')
    : getNoteValueName(timeSignature.bottomNumber)
  
  const allNoteValues = ['minim', 'crotchet', 'quaver']
  const alternativeNoteValues = allNoteValues.filter(value => value !== noteValueName)
  const alternativeBeatCounts = [2, 3, 4].filter(count => count !== beatCount)
  
  const wrongAnswers: string[] = []
  
  alternativeNoteValues.slice(0, 1).forEach(noteValue => {
    wrongAnswers.push(`${beatCount} ${capitalize(noteValue)} Beats`)
  })
  
  alternativeBeatCounts.slice(0, 1).forEach(count => {
    wrongAnswers.push(`${count} ${capitalize(noteValueName)} Beats`)
  })
  
  if (alternativeBeatCounts.length > 1 && alternativeNoteValues.length > 0) {
    wrongAnswers.push(`${alternativeBeatCounts[1]} ${capitalize(alternativeNoteValues[0])} Beats`)
  }
  
  return wrongAnswers
}

const isSameTimeSignature = (ts1: TimeSignatureType, ts2: TimeSignatureType): boolean => {
  const isString = typeof ts1 === 'string' && typeof ts2 === 'string'
  const isObject = typeof ts1 === 'object' && typeof ts2 === 'object'
  
  if (isString) return ts1 === ts2
  if (isObject) return ts1.topNumber === ts2.topNumber && ts1.bottomNumber === ts2.bottomNumber
  return false
}

const buildQuestion = (correctTimeSignature: TimeSignatureType): Question => {
  const notation = formatAsNotation(correctTimeSignature)
  const correctAnswer = formatAsText(correctTimeSignature)
  const wrongAnswers = generateWrongAnswers(correctTimeSignature)
  
  return {
    id: generateQuestionId('time-sig'),
    question: `What does the ${notation} time signature mean?`,
    correctAnswer,
    choices: generateMultipleChoiceOptions(wrongAnswers, correctAnswer),
    explanation: `The ${notation} time signature means ${correctAnswer}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'timeSignature',
      timeSignatureValue: notation
    }
  }
}

export const createTimeSignatureQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const availableTimeSignatures = getTimeSignatures(stage)
  const timeSignaturesToTest = selectRandomItems(availableTimeSignatures, questionsCount, isSameTimeSignature)
  return timeSignaturesToTest.map(buildQuestion)
}
