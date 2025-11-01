import { NOTES, type ClefType, type Note } from '@leonkwan46/music-notation'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { addRegisterToChord, getChordsByStage } from '../helpers/triadHelpers'
import { Question, StageNumber } from '../theoryData/types'

// ======================
// MAIN EXPORT FUNCTIONS
// ======================

export const createTriadQuestion = (stage: StageNumber, clef: ClefType): Question => {
  const availableChords = getChordsByStage(stage)
  const chordKeys = Object.keys(availableChords)
  const selectedChordKey = getRandomItem(chordKeys)
  const selectedChordNotes = availableChords[selectedChordKey as keyof typeof availableChords]
  
  const flatNotes = selectedChordNotes.flat()
  const chordNotes = addRegisterToChord(flatNotes, clef, stage)
  const rootStem = chordNotes[0]?.stem || 'up'
  
  return {
    id: generateQuestionId('triad'),
    question: 'What is this tonic triad?',
    correctAnswer: selectedChordKey,
    choices: generateWrongChoices(chordKeys, selectedChordKey),
    explanation: `The notes ${flatNotes.join('-')} form the ${selectedChordKey} tonic triad.`,
    type: 'multipleChoice',
    visualComponent: {
      clef,
      elements: chordNotes.map((note: Note) => ({
        pitch: note.pitch,
        type: NOTES.CROTCHET,
        accidental: note.accidental,
        stem: rootStem,
        ledgerLines: note.ledgerLines
      })),
      isChord: true
    }
  }
}

export const createTriadQuestions = (questionsCount: number, stage: StageNumber, clef: ClefType): Question[] => {
  return Array.from({ length: questionsCount }, () => createTriadQuestion(stage, clef))
}
