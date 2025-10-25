import { NOTES } from '@leonkwan46/music-notation'
import { calculateInterval, transposeByInterval, type Interval } from '../helpers/intervalHelpers'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const INTERVAL_NUMBERS = [2, 3, 4, 5, 6, 7, 8]

export const createIntervalQuestion = (stage: StageNumber): Question => {
  const intervalNumber = getRandomItem(INTERVAL_NUMBERS) as 2 | 3 | 4 | 5 | 6 | 7 | 8
  
  const tonic = 'C4'
  const intervalObj: Interval = {
    number: intervalNumber,
    type: 'perfect',
    semitones: 0,
    compound: false,
    simpleName: ''
  }
  
  const targetPitch = transposeByInterval(tonic, intervalObj)
  const calculatedInterval = calculateInterval(tonic, targetPitch)
  
  // Generate wrong choices using actual interval names
  const wrongChoices = generateWrongChoices([
    'Perfect 2nd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th', 
    'Major 6th', 'Major 7th', 'Perfect Octave'
  ], calculatedInterval.simpleName)
  
  return {
    id: generateQuestionId('interval'),
    question: 'What interval is this above the tonic?',
    correctAnswer: calculatedInterval.simpleName,
    choices: wrongChoices,
    explanation: `The interval above the tonic is a ${calculatedInterval.simpleName} (${calculatedInterval.semitones} semitones).`,
    type: 'multipleChoice',
    visualComponent: {
      clef: 'treble',
      elements: [
        { pitch: tonic, type: NOTES.CROTCHET },
        { pitch: targetPitch, type: NOTES.CROTCHET }
      ]
    }
  }
}

export const createIntervalQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createIntervalQuestion(stage))
}
