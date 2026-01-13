import { NOTES, type ClefType, type MusicElementData } from '@leonkwan46/music-notation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { generateQuestionsFromPool } from '../utils/exercise'
import { getIntervalPairs, getNotesForPitches } from '../utils/interval'
import { generateQuestionId, generateWrongChoices, shuffleArray } from '../utils/question'
import { generateExplanation } from '../utils/explanation'

const INTERVAL_ORDER = ['Semitone', 'Tone'] as const

export const createSemitoneToneQuestion = (
  stage: StageNumber,
  clef: ClefType,
  intervalPair?: { pitch1: string; pitch2: string; intervalType: 'semitone' | 'tone' }
): Question => {
  const intervalPairs = getIntervalPairs(stage, clef)
  
  if (intervalPairs.length === 0) {
    throw new Error(`No valid interval pairs found for stage ${stage} in ${clef} clef`)
  }
  
  const selectedPair = intervalPair || intervalPairs[0]
  const { pitch1, pitch2, intervalType } = selectedPair
  const { tonicNote, targetNote } = getNotesForPitches(pitch1, pitch2, clef)
  const correctAnswer = intervalType === 'semitone' ? 'Semitone' : 'Tone'
  
  const visualComponent = {
    clef,
    size: 'xs' as const,
    elements: [
      {
        pitch: tonicNote.pitch,
        type: NOTES.CROTCHET,
        accidental: tonicNote.accidental,
        stem: tonicNote.stem,
        ledgerLines: tonicNote.ledgerLines,
        spacing: 80 // TODO: This need to be updated, when we fixed library
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
  
  return {
    id: generateQuestionId('semitone-tone'),
    question: 'What is the interval between these two notes?',
    correctAnswer,
    choices: generateWrongChoices([...INTERVAL_ORDER], correctAnswer, 3, true),
    explanation: generateExplanation('semitonesTones', {
      correctAnswer,
      answer: correctAnswer.toLowerCase(),
      count: intervalType === 'semitone' ? '1' : '2',
      type: intervalType === 'semitone' ? 'semitone' : 'semitones'
    }, visualComponent),
    type: 'multipleChoice',
    visualComponent
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const pitches = question.visualComponent?.elements?.map((element: MusicElementData) => element.pitch).filter(Boolean)
  if (pitches && pitches.length > 0) {
    return pitches.join('|')
  }
  return question.correctAnswer ?? null
}

export const createSemitoneToneQuestions = (
  questionsCount: number,
  stage: StageNumber
): Question[] => {
  const bassCount = Math.max(5, Math.floor(questionsCount / 2))
  const trebleCount = questionsCount - bassCount

  const buildQuestionsForClef = (count: number, clef: ClefType): Question[] => {
    if (count <= 0) return []
    const intervalPairs = getIntervalPairs(stage, clef)
    const uniquePool = intervalPairs.map(pair => 
      createSemitoneToneQuestion(stage, clef, pair)
    )
    return generateQuestionsFromPool(uniquePool, count, getDuplicateIdentifier)
  }

  const trebleQuestions = buildQuestionsForClef(trebleCount, 'treble')
  const bassQuestions = buildQuestionsForClef(bassCount, 'bass')
  return shuffleArray([...trebleQuestions, ...bassQuestions])
}

