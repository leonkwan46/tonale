import { NOTES, type AccidentalType, type ClefType, type StemDirection } from '@leonkwan46/music-notation'
import { getNoteRange } from '../helpers/exerciseHelpers'
import {
  generateMultipleChoiceOptions,
  generateQuestionId,
  selectRandomItems
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

interface Note {
  pitch: string
  name: string
  letterName?: string
  stem: StemDirection
  ledgerLines: number
  accidental?: AccidentalType
}

const getNoteLetterNames = (notes: Note[]): string[] => {
  const letterNames = notes.map(note => note.letterName).filter((name): name is string => Boolean(name))
  return [...new Set(letterNames)]
}

const isSameNote = (note1: Note, note2: Note): boolean => {
  return note1.pitch === note2.pitch && note1.accidental === note2.accidental
}

const buildQuestion = (noteToTest: Note, clef: ClefType, availableNotes: Note[]): Question => {
  if (!noteToTest.letterName) {
    throw new Error('Note data missing letterName')
  }
  
  return {
    id: generateQuestionId('note-id'),
    question: `What note is this in the ${clef} clef?`,
    correctAnswer: noteToTest.letterName,
    choices: generateMultipleChoiceOptions(
      getNoteLetterNames(availableNotes),
      noteToTest.letterName,
      3
    ),
    explanation: `This note is ${noteToTest.letterName} on the ${clef} clef.`,
    type: 'multipleChoice',
    visualComponent: {
      clef,
      elements: [{
        pitch: noteToTest.pitch,
        type: NOTES.CROTCHET,
        accidental: noteToTest.accidental,
        stem: noteToTest.stem,
        ledgerLines: noteToTest.ledgerLines
      }]
    }
  }
}

export const createNoteIdentificationQuestions = (
  questionsCount: number,
  stage: StageNumber,
  clef: ClefType
): Question[] => {
  const availableNotes = getNoteRange(stage, clef) as Note[]
  const notesToTest = selectRandomItems(availableNotes, questionsCount, isSameNote)
  return notesToTest.map(noteToTest => buildQuestion(noteToTest, clef, availableNotes))
}
