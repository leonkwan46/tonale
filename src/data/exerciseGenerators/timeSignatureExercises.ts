// Time signature exercise generators
import { CLEFS, type TimeSignatureType } from '@leonkwan46/music-notation'
import { getTimeSignatures } from '../helpers/exerciseHelpers'
import {
    generateQuestionId,
    generateWrongChoices,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Helper function to convert TimeSignatureType to string
const timeSignatureToString = (ts: TimeSignatureType): string => {
  if (typeof ts === 'string') {
    return ts // Keep 'common' as 'common', 'cut' as 'cut'
  }
  return `${ts.topNumber}/${ts.bottomNumber}`
}

// Create a time signature identification question
export const createTimeSignatureQuestion = (stage: StageNumber = 1): Question => {
  const timeSignatures = getTimeSignatures(stage)
  const correctTimeSig = getRandomItem(timeSignatures)
  const correctTimeSigString = timeSignatureToString(correctTimeSig)
  
  // Convert all time signatures to strings for choices
  const timeSignatureStrings = timeSignatures.map(timeSignatureToString)
  
  return {
    id: generateQuestionId('time-sig'),
    question: 'What time signature is this?',
    correctAnswer: correctTimeSigString,
    choices: generateWrongChoices(timeSignatureStrings, correctTimeSigString),
    explanation: correctTimeSigString === 'common' 
      ? 'Common time means 4 beats per measure.' 
      : correctTimeSigString === 'cut'
      ? 'Cut time means 2 beats per measure.'
      : `${correctTimeSigString} means ${correctTimeSigString.split('/')[0]} beats per measure.`,
    type: 'multipleChoice',
    visualComponent: {
      clef: CLEFS.TREBLE,
      elements: [],
      timeSignature: correctTimeSigString
    }
  }
}

// Create multiple time signature questions
export const createTimeSignatureQuestions = (questionsCount: number, stage: StageNumber = 1): Question[] => {
  return Array.from({ length: questionsCount }, () => createTimeSignatureQuestion(stage))
}
