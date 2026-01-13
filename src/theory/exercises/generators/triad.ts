import { NOTES, type ClefType, type MusicElementData, type Note } from '@leonkwan46/music-notation'
import type { Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { balanceCorrectAnswerPositions, generateQuestionsFromPool } from '../utils/exercise'
import { generateQuestionId, generateWrongChoices, shuffleArray } from '../utils/question'
import { addRegisterToChord, getChordsByStage } from '../utils/triad'
import { generateExplanation } from '../utils/explanation'

export const createTriadQuestion = (stage: StageNumber, clef: ClefType, chordKey?: string): Question => {
  const availableChords = getChordsByStage(stage)
  const chordKeys = Object.keys(availableChords)
  const selectedChordKey = chordKey || chordKeys[0]
  const selectedChordNotes = availableChords[selectedChordKey as keyof typeof availableChords]
  
  const flatNotes = selectedChordNotes.flat()
  const chordNotes = addRegisterToChord(flatNotes, clef, stage)
  const rootStem = chordNotes[0]?.stem || 'up'
  
  const visualComponent = {
    type: 'musicStaff' as const,
    clef,
    size: 'xs' as const,
    elements: chordNotes.map((note: Note) => ({
      pitch: note.pitch,
      type: NOTES.CROTCHET,
      accidental: note.accidental,
      stem: rootStem,
      ledgerLines: note.ledgerLines
    })),
    isChord: true
  }
  
  return {
    id: generateQuestionId('triad'),
    question: 'What is this tonic triad?',
    correctAnswer: selectedChordKey,
    choices: generateWrongChoices(chordKeys, selectedChordKey),
    explanation: generateExplanation('triad', {
      correctAnswer: selectedChordKey,
      notes: flatNotes,
      chordKey: selectedChordKey
    }, visualComponent),
    type: 'multipleChoice',
    visualComponent
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.correctAnswer) return question.correctAnswer
  return question.visualComponent?.elements?.map((element: MusicElementData) => element.pitch).join('|') ?? null
}

export const createTriadQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const chordKeys = Object.keys(getChordsByStage(stage))

  const treblePool = chordKeys.map(chordKey => createTriadQuestion(stage, 'treble', chordKey))
  const bassPool = chordKeys.map(chordKey => createTriadQuestion(stage, 'bass', chordKey))

  const trebleCount = Math.ceil(questionsCount / 2)
  const bassCount = questionsCount - trebleCount

  const trebleQuestions = generateQuestionsFromPool(treblePool, trebleCount, getDuplicateIdentifier)
  const bassQuestions = generateQuestionsFromPool(bassPool, bassCount, getDuplicateIdentifier)

  const combined = shuffleArray([...trebleQuestions, ...bassQuestions])
  return balanceCorrectAnswerPositions(combined)
}
