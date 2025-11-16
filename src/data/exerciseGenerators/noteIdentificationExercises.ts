import { NOTES, type AccidentalType, type ClefType, type StemDirection } from '@leonkwan46/music-notation'
import { generateQuestionsFromPool } from '../helpers/exerciseHelpers'
import {
  generateQuestionId,
  generateWrongChoices
} from '../helpers/questionHelpers'
import { getNewNotesForStage } from '../stageSyllabus/noteRange'
import { Question, StageNumber } from '../theoryData/types'

interface Note {
  pitch: string
  name: string
  letterName?: string
  stem: StemDirection
  ledgerLines: number
  accidental?: AccidentalType
}

export const createNoteIdentificationQuestion = (
  stage: StageNumber, 
  clef: ClefType,
  noteData?: Note
): Question => {
  const stagePitches = getNewNotesForStage(stage, clef)
  const correctNoteData = noteData || stagePitches[0]
  
  if (!correctNoteData.letterName) {
    throw new Error('Note data missing letterName')
  }
  
  const allLetterNames = stagePitches.map((note: Note) => note.letterName)
  const validLetterNames = allLetterNames.filter((name: string | undefined): name is string => Boolean(name))
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
      }]
    }
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const pitch = question.visualComponent?.elements?.[0]?.pitch
  if (pitch) return pitch
  return question.correctAnswer ?? null
}

export const createNoteIdentificationQuestions = (
  questionsCount: number, 
  stage: StageNumber,
  clef: ClefType
): Question[] => {
  const stagePitches = getNewNotesForStage(stage, clef)
  const uniquePool = stagePitches.map(note => 
    createNoteIdentificationQuestion(stage, clef, note)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
