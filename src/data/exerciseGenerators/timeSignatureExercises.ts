import { type TimeSignatureType } from '@leonkwan46/music-notation'
import { getTimeSignatures } from '../helpers/exerciseHelpers'
import {
    capitalize,
    generateQuestionId,
    generateWrongChoices,
    shuffleArray
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


const buildQuestion = (timeSignature: TimeSignatureType): Question => {
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

const isSameTimeSignature = (ts1: TimeSignatureType, ts2: TimeSignatureType): boolean => {
  const isString = typeof ts1 === 'string' && typeof ts2 === 'string'
  const isObject = typeof ts1 === 'object' && typeof ts2 === 'object'
  
  if (isString) return ts1 === ts2
  if (isObject) return ts1.topNumber === ts2.topNumber && ts1.bottomNumber === ts2.bottomNumber
  return false
}

const isValidNextTimeSignature = (
  candidate: TimeSignatureType,
  last: TimeSignatureType | undefined,
  secondLast: TimeSignatureType | undefined
): boolean => {
  if (!last) return true
  if (isSameTimeSignature(candidate, last)) return false
  if (secondLast && isSameTimeSignature(candidate, secondLast)) return false
  return true
}

const createShuffledPool = (
  available: TimeSignatureType[],
  lastSelected?: TimeSignatureType,
  secondLastSelected?: TimeSignatureType
): TimeSignatureType[] => {
  const maxAttempts = 10
  
  for (let i = 0; i < maxAttempts; i++) {
    const pool = shuffleArray([...available])
    
    if (isValidNextTimeSignature(pool[0], lastSelected, secondLastSelected)) {
      return pool
    }
  }
  
  return shuffleArray([...available])
}

export const createTimeSignatureQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const availableTimeSignatures = getTimeSignatures(stage)
  
  if (availableTimeSignatures.length === 1) {
    return Array.from({ length: questionsCount }, () => 
      buildQuestion(availableTimeSignatures[0])
    )
  }
  
  const timeSignatures: TimeSignatureType[] = []
  let pool = shuffleArray([...availableTimeSignatures])
  let poolIndex = 0
  
  while (timeSignatures.length < questionsCount) {
    if (poolIndex >= pool.length) {
      const last = timeSignatures[timeSignatures.length - 1]
      const secondLast = timeSignatures[timeSignatures.length - 2]
      pool = createShuffledPool(availableTimeSignatures, last, secondLast)
      poolIndex = 0
    }
    
    const candidate = pool[poolIndex]
    const last = timeSignatures[timeSignatures.length - 1]
    const secondLast = timeSignatures[timeSignatures.length - 2]
    
    if (isValidNextTimeSignature(candidate, last, secondLast)) {
      timeSignatures.push(candidate)
    }
    
    poolIndex++
  }
  
  return timeSignatures.map(buildQuestion)
}
