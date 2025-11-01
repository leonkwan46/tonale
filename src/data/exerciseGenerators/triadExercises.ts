import { NOTES, type ClefType } from '@leonkwan46/music-notation'
import {
  GRADE_ONE_BASS_PITCH_RANGE,
  GRADE_ONE_TREBLE_PITCH_RANGE,
  GRADE_THREE_BASS_PITCH_RANGE,
  GRADE_THREE_TREBLE_PITCH_RANGE,
  GRADE_TWO_BASS_PITCH_RANGE,
  GRADE_TWO_TREBLE_PITCH_RANGE
} from '../../config/gradeSyllabus/PitchRange'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { STAGE_ONE_TRIADS, STAGE_THREE_TRIADS, STAGE_TWO_TRIADS } from '../stageSyllabus/triads'
import { Question, StageNumber } from '../theoryData/types'

export const createTriadQuestion = (stage: StageNumber, clef: ClefType): Question => {
  const availableChords = getChordsByStage(stage)
  const chordKeys = Object.keys(availableChords)
  const selectedChordKey = getRandomItem(chordKeys)
  const selectedChordNotes = availableChords[selectedChordKey as keyof typeof availableChords]
  
  const correctAnswer = selectedChordNotes.join('-')
  const allChordAnswers = Object.values(availableChords).map(notes => notes.join('-'))
  const choices = generateWrongChoices(allChordAnswers, correctAnswer)
  
  const chordPitches = addRegister(selectedChordNotes, clef, stage)
  
  return {
    id: generateQuestionId('triad'),
    question: 'What are the notes in this tonic triad?',
    correctAnswer,
    choices,
    explanation: `The ${selectedChordKey} tonic triad consists of ${correctAnswer}.`,
    type: 'multipleChoice',
    visualComponent: {
      clef,
      elements: [
        { pitch: chordPitches[0], type: NOTES.CROTCHET },
        { pitch: chordPitches[1], type: NOTES.CROTCHET },
        { pitch: chordPitches[2], type: NOTES.CROTCHET }
      ]
    }
  }
}

const getChordsByStage = (stage: StageNumber) => {
  switch (stage) {
    case 1:
      return STAGE_ONE_TRIADS
    case 2:
      return STAGE_TWO_TRIADS
    case 3:
      return STAGE_THREE_TRIADS
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

const getPitchRange = (stage: StageNumber, clef: ClefType) => {
  // Note: Currently supports stages 1-3. For stages 4-5, additional clefs (alto, tenor) 
  // will be supported and require extending StageNumber type and adding more pitch ranges.
  switch (stage) {
    case 1:
      return clef === 'treble' ? GRADE_ONE_TREBLE_PITCH_RANGE : GRADE_ONE_BASS_PITCH_RANGE
    case 2:
      return clef === 'treble' ? GRADE_TWO_TREBLE_PITCH_RANGE : GRADE_TWO_BASS_PITCH_RANGE
    case 3:
      return clef === 'treble' ? GRADE_THREE_TREBLE_PITCH_RANGE : GRADE_THREE_BASS_PITCH_RANGE
    default:
      throw new Error(`Invalid stage: ${stage}`)
  }
}

const addRegister = (notes: readonly string[], clef: ClefType, stage: StageNumber): string[] => {
  const allowedPitches = getPitchRange(stage, clef)
  
  const getBaseRegister = (clef: ClefType): number => {
    switch (clef) {
      case 'treble':
        return 4
      case 'bass':
        return 3
      case 'alto':
        return 3
      case 'tenor':
        return 3
      default:
        return 4
    }
  }
  
  const baseRegister = getBaseRegister(clef)
  
  return notes.map((note, index) => {
    let register = baseRegister
    if (index > 0 && note < notes[0]) {
      register = baseRegister + 1
    }
    
    const pitch = `${note}${register}`
    
    if (!allowedPitches.includes(pitch as never)) {
      const nextPitch = `${note}${register + 1}`
      if (allowedPitches.includes(nextPitch as never)) {
        return nextPitch
      }
    }
    
    return pitch
  })
}

export const createTriadQuestions = (questionsCount: number, stage: StageNumber, clef: ClefType): Question[] => {
  return Array.from({ length: questionsCount }, () => createTriadQuestion(stage, clef))
}
