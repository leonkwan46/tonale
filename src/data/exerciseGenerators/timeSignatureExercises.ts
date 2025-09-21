// Time signature exercise generators
import { type TimeSignatureType } from '@leonkwan46/music-notation'
import { getTimeSignatures } from '../helpers/exerciseHelpers'
import {
    generateQuestionId,
    generateWrongChoices,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Helper function to convert TimeSignatureType to string
const timeSignatureToString = (timeSignature: TimeSignatureType): string => {
  if (typeof timeSignature === 'string') {
    return timeSignature // Keep 'common' as 'common', 'cut' as 'cut'
  }
  return `${timeSignature.topNumber}/${timeSignature.bottomNumber}`
}

// Helper function to get note value name from bottom number
const getNoteValueFromBottomNumber = (bottomNumber: number): string => {
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

// Helper function to create time signature meaning string
const createTimeSignatureMeaning = (timeSignature: TimeSignatureType): string => {
  if (typeof timeSignature === 'string') {
    if (timeSignature === 'common') return '4 Crotchet Beats'
    if (timeSignature === 'cut') return '2 Minim Beats'
  }
  const beatCount = timeSignature.topNumber
  const noteValue = getNoteValueFromBottomNumber(timeSignature.bottomNumber)
  return `${beatCount} ${noteValue.charAt(0).toUpperCase() + noteValue.slice(1)} Beats`
}

// Helper function to generate smart wrong choices based on the correct time signature
const generateSmartWrongChoices = (correctTimeSignature: TimeSignatureType): string[] => {
  const correctBeatCount = typeof correctTimeSignature === 'string' 
    ? (correctTimeSignature === 'common' ? 4 : 2)
    : correctTimeSignature.topNumber
  
  const correctNoteValue = typeof correctTimeSignature === 'string'
    ? (correctTimeSignature === 'common' ? 'crotchet' : 'minim')
    : getNoteValueFromBottomNumber(correctTimeSignature.bottomNumber)
  
  const wrongChoices: string[] = []
  
  // Wrong choice 1: Same beat count but wrong note value (tests bottom number understanding)
  if (correctNoteValue === 'crotchet') {
    wrongChoices.push(`${correctBeatCount} Minim Beats`)
    wrongChoices.push(`${correctBeatCount} Quaver Beats`)
  } else if (correctNoteValue === 'minim') {
    wrongChoices.push(`${correctBeatCount} Crotchet Beats`)
    wrongChoices.push(`${correctBeatCount} Quaver Beats`)
  } else if (correctNoteValue === 'quaver') {
    wrongChoices.push(`${correctBeatCount} Crotchet Beats`)
    wrongChoices.push(`${correctBeatCount} Minim Beats`)
  }
  
  // Wrong choice 2: Different beat count but same note value (tests top number understanding)
  const otherBeatCounts = [2, 3, 4].filter(count => count !== correctBeatCount)
  if (otherBeatCounts.length > 0) {
    const capitalizedNoteValue = correctNoteValue.charAt(0).toUpperCase() + correctNoteValue.slice(1)
    wrongChoices.push(`${otherBeatCounts[0]} ${capitalizedNoteValue} Beats`)
  }
  
  // Wrong choice 3: Different beat count and different note value
  if (otherBeatCounts.length > 1) {
    const differentNoteValue = correctNoteValue === 'crotchet' ? 'minim' : 'crotchet'
    const capitalizedDifferentNoteValue = differentNoteValue.charAt(0).toUpperCase() + differentNoteValue.slice(1)
    wrongChoices.push(`${otherBeatCounts[1]} ${capitalizedDifferentNoteValue} Beats`)
  }
  
  return wrongChoices
}

// Create a time signature identification question
export const createTimeSignatureQuestion = (stage: StageNumber = 1): Question => {
  const timeSignatures = getTimeSignatures(stage)
  const correctTimeSig = getRandomItem(timeSignatures)
  const correctTimeSigString = timeSignatureToString(correctTimeSig)
  const correctAnswerString = createTimeSignatureMeaning(correctTimeSig)
  
  // Generate smart wrong choices that test understanding of both top and bottom numbers
  const smartWrongChoices = generateSmartWrongChoices(correctTimeSig)
  
  return {
    id: generateQuestionId('time-sig'),
    question: `What does the ${correctTimeSigString} time signature mean?`,
    correctAnswer: correctAnswerString,
    choices: generateWrongChoices(smartWrongChoices, correctAnswerString),
    explanation: `The ${correctTimeSigString} time signature means ${correctAnswerString}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'timeSignature',
      timeSignatureValue: correctTimeSigString
    }
  }
}

// Create multiple time signature questions
export const createTimeSignatureQuestions = (questionsCount: number, stage: StageNumber = 1): Question[] => {
  return Array.from({ length: questionsCount }, () => createTimeSignatureQuestion(stage))
}
