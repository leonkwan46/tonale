// Note identification exercise generators
import {
    generateQuestionId,
    generateWrongChoices,
    getGrade1NoteNames,
    getRandomItem
} from '../helpers/questionHelpers'
import { Question } from '../theoryData/types'

// Create a note identification question
export const createNoteIdentificationQuestion = (clef: 'treble' | 'bass' = 'treble'): Question => {
  const noteNames = getGrade1NoteNames()
  const correctNote = getRandomItem(noteNames)
  
  return {
    id: generateQuestionId('note-id'),
    question: `What note is this in the ${clef} clef?`,
    correctAnswer: correctNote,
    choices: generateWrongChoices(noteNames, correctNote),
    explanation: `This note is ${correctNote} on the ${clef} clef.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'staff',
      clef: clef,
      notes: [{ pitch: `${correctNote}4`, noteType: 'crochet', accidental: null }],
      timeSignature: '4/4'
    }
  }
}

// Create multiple note identification questions
export const createNoteIdentificationQuestions = (count: number, clef?: 'treble' | 'bass'): Question[] => {
  return Array.from({ length: count }, () => createNoteIdentificationQuestion(clef))
}
