// Note identification exercise generators
import { NOTES, type ClefType } from '@leonkwan46/music-notation'
import { getNoteRange } from '../helpers/exerciseHelpers'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a note identification question
export const createNoteIdentificationQuestion = (
  stage: StageNumber = 1, 
  clef: ClefType
): Question => {
  // Get pitches for the specified stage (with accidentals if available)
  const stagePitches = getNoteRange(stage)
  
  // Get a random note from the stage range
  const correctNoteData = getRandomItem(stagePitches)
  
  // Ensure we have a valid letter name
  if (!correctNoteData.letterName) {
    throw new Error('Note data missing letterName')
  }
  
  // Create choices from stage note letter names (unique note letters)
  const allLetterNames = stagePitches.map(note => note.letterName)
  const validLetterNames = allLetterNames.filter((name): name is string => Boolean(name))
  const noteLetterNames = [...new Set(validLetterNames)]
  
  return {
    id: generateQuestionId('note-id'),
    question: `What note is this in the ${clef} clef?`,
    correctAnswer: correctNoteData.letterName,
    choices: generateWrongChoices(noteLetterNames, correctNoteData.letterName),
    explanation: `This note is ${correctNoteData.letterName} on the ${clef} clef.`,
    type: 'multipleChoice',
    visualComponent: {
      clef: clef,
      elements: [{ 
        pitch: correctNoteData.pitch, 
        type: NOTES.CROTCHET,
        accidental: correctNoteData.accidental,
        stem: correctNoteData.stem, 
        ledgerLines: correctNoteData.ledgerLines 
      }],
      timeSignature: '4/4'
    }
  }
}

// Create multiple note identification questions
export const createNoteIdentificationQuestions = (
  questionsCount: number, 
  stage: StageNumber = 1,
  clef: ClefType
): Question[] => {
  return Array.from({ length: questionsCount }, () => createNoteIdentificationQuestion(stage, clef))
}
