// Interval exercise generators
import { NOTES, type ClefType } from '@leonkwan46/music-notation'
import { calculateInterval, getIntervalNameForStage, getNotesForPitches, getStageIntervals, transposeByInterval, type Interval } from '../helpers/intervalHelpers'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

const INTERVAL_NUMBERS = [2, 3, 4, 5, 6, 7, 8] as const
const TONIC_PITCH = 'C4'

// ======================
// MAIN EXPORT FUNCTIONS
// ======================

export const createIntervalQuestion = (stage: StageNumber, clef: ClefType = 'treble'): Question => {
  const intervalNumber = getRandomItem(INTERVAL_NUMBERS) as 2 | 3 | 4 | 5 | 6 | 7 | 8
  const intervalObj: Interval = {
    number: intervalNumber,
    type: 'perfect',
    semitones: 0,
    compound: false,
    simpleName: ''
  }
  
  const targetPitch = transposeByInterval(TONIC_PITCH, intervalObj)
  const calculatedInterval = calculateInterval(TONIC_PITCH, targetPitch)
  
  const { tonicNote, targetNote } = getNotesForPitches(TONIC_PITCH, targetPitch, clef)
  const stageIntervals = getStageIntervals(stage)
  const correctAnswer = getIntervalNameForStage(calculatedInterval, stage, stageIntervals)
  
  return {
    id: generateQuestionId('interval'),
    question: 'What interval is this above the tonic?',
    correctAnswer,
    choices: generateWrongChoices([...stageIntervals], correctAnswer),
    explanation: `The interval above the tonic is a ${calculatedInterval.simpleName} (${calculatedInterval.semitones} semitones).`,
    type: 'multipleChoice',
    visualComponent: {
      clef,
      elements: [
        {
          pitch: tonicNote.pitch,
          type: NOTES.CROTCHET,
          accidental: tonicNote.accidental,
          stem: tonicNote.stem,
          ledgerLines: tonicNote.ledgerLines
        },
        {
          pitch: targetNote.pitch,
          type: NOTES.CROTCHET,
          accidental: targetNote.accidental,
          stem: targetNote.stem,
          ledgerLines: targetNote.ledgerLines
        }
      ]
    }
  }
}

export const createIntervalQuestions = (questionsCount: number, stage: StageNumber, clef: ClefType = 'treble'): Question[] => {
  return Array.from({ length: questionsCount }, () => createIntervalQuestion(stage, clef))
}
