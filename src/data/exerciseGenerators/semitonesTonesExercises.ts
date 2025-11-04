import { NOTES, type ClefType } from '@leonkwan46/music-notation'
import { getNotesForPitches } from '../helpers/intervalHelpers'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { getIntervalPairs } from '../helpers/semitonesTonesHelpers'
import { Question, StageNumber } from '../theoryData/types'

const INTERVAL_ORDER = ['Semitone', 'Tone'] as const

export const createSemitoneToneQuestion = (
  stage: StageNumber,
  clef: ClefType
): Question => {
  const intervalPairs = getIntervalPairs(stage, clef)
  
  if (intervalPairs.length === 0) {
    throw new Error(`No valid interval pairs found for stage ${stage} in ${clef} clef`)
  }
  
  const selectedPair = getRandomItem(intervalPairs)
  const { pitch1, pitch2, intervalType } = selectedPair
  const { tonicNote, targetNote } = getNotesForPitches(pitch1, pitch2, clef)
  const correctAnswer = intervalType === 'semitone' ? 'Semitone' : 'Tone'
  
  return {
    id: generateQuestionId('semitone-tone'),
    question: 'What is the interval between these two notes?',
    correctAnswer,
    choices: generateWrongChoices([...INTERVAL_ORDER], correctAnswer, 3, true),
    explanation: `The interval between these notes is a ${correctAnswer.toLowerCase()} (${intervalType === 'semitone' ? '1 semitone' : '2 semitones'}).`,
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

export const createSemitoneToneQuestions = (
  questionsCount: number,
  stage: StageNumber
): Question[] => {
  const bassCount = Math.max(5, Math.floor(questionsCount / 2))
  const trebleCount = questionsCount - bassCount
  
  const trebleQuestions = Array.from({ length: trebleCount }, () => 
    createSemitoneToneQuestion(stage, 'treble')
  )
  const bassQuestions = Array.from({ length: bassCount }, () => 
    createSemitoneToneQuestion(stage, 'bass')
  )
  
  return [...trebleQuestions, ...bassQuestions].sort(() => Math.random() - 0.5)
}

