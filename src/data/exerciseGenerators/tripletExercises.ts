// Triplet exercise generators
import { NOTES } from '@leonkwan46/music-notation'
import { GRADE_THREE_TRIPLET_TIME_VALUES, GRADE_TWO_TRIPLET_TIME_VALUES } from '../../config/gradeSyllabus/TimeValues'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Create a triplet identification question
export const createTripletIdentificationQuestion = (stage: StageNumber): Question => {
  // Get appropriate tuplet configurations based on stage
  const tupletDefinition = 'Three notes played in the time of two'
  
  let selectedConfig
  if (stage === 3) {
    selectedConfig = getRandomItem([...GRADE_THREE_TRIPLET_TIME_VALUES])
  } else {
    selectedConfig = getRandomItem([...GRADE_TWO_TRIPLET_TIME_VALUES])
  }
  
  const wrongAnswers = [
    'Two notes played in the time of three',
    'Four notes played in the time of three',
    'Three notes played in the time of four',
    'Notes played at triple speed'
  ]
  
  return {
    id: generateQuestionId('triplet-identification'),
    question: 'What is a triplet?',
    correctAnswer: tupletDefinition,
    choices: generateWrongChoices(wrongAnswers, tupletDefinition),
    explanation: 'A triplet is a group of three notes played in the time normally occupied by two notes of the same value.',
    type: 'multipleChoice',
    visualComponent: {
      type: 'triplet',
      tupletConfig: {
        noteType: selectedConfig.type,
        numberOfNotes: selectedConfig.numberOfNotes
      }
    }
  }
}

// Create a triplet value question
export const createTripletValueQuestion = (stage: StageNumber): Question => {
  // Get appropriate tuplet configurations based on stage
  let selectedConfig
  if (stage === 3) {
    selectedConfig = getRandomItem([...GRADE_THREE_TRIPLET_TIME_VALUES])
  } else {
    selectedConfig = getRandomItem([...GRADE_TWO_TRIPLET_TIME_VALUES])
  }
  
  const noteTypeNames: Record<string, string> = {
    [NOTES.MINIM]: 'minim',
    [NOTES.CROTCHET]: 'crotchet', 
    [NOTES.QUAVER]: 'quaver',
    [NOTES.SEMIQUAVER]: 'semiquaver',
    [NOTES.DEMISEMIQUAVER]: 'demisemiquaver'
  }
  
  const noteName = noteTypeNames[selectedConfig.type] || 'crotchet'
  const tripletValue = `Three ${noteName}s in the time of two ${noteName}s`
  
  const wrongAnswers = [
    `Two ${noteName}s in the time of three ${noteName}s`,
    `Four ${noteName}s in the time of three ${noteName}s`,
    `Three ${noteName}s in the time of four ${noteName}s`,
    `Three ${noteName}s in the time of one ${noteName}`
  ]
  
  return {
    id: generateQuestionId('triplet-value'),
    question: `What is the value of three ${noteName}s in a triplet?`,
    correctAnswer: tripletValue,
    choices: generateWrongChoices(wrongAnswers, tripletValue),
    explanation: `A triplet of ${noteName}s means three ${noteName}s are played in the time normally occupied by two ${noteName}s.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'triplet',
      tupletConfig: {
        noteType: selectedConfig.type,
        numberOfNotes: selectedConfig.numberOfNotes
      }
    }
  }
}

// Create a triplet vs regular notes question
export const createTripletComparisonQuestion = (stage: StageNumber): Question => {
  const isTuplet = Math.random() > 0.5
  
  // Get appropriate tuplet configurations based on stage
  let selectedConfig
  if (stage === 3) {
    selectedConfig = getRandomItem([...GRADE_THREE_TRIPLET_TIME_VALUES])
  } else {
    selectedConfig = getRandomItem([...GRADE_TWO_TRIPLET_TIME_VALUES])
  }
  
  const noteTypeNames: Record<string, string> = {
    [NOTES.MINIM]: 'minim',
    [NOTES.CROTCHET]: 'crotchet',
    [NOTES.QUAVER]: 'quaver',
    [NOTES.SEMIQUAVER]: 'semiquaver',
    [NOTES.DEMISEMIQUAVER]: 'demisemiquaver'
  }
  
  const noteName = noteTypeNames[selectedConfig.type] || 'crotchet'
  
  const correctAnswer = isTuplet 
    ? `Three ${noteName}s in a triplet (time of two)`
    : `Three regular ${noteName}s (normal time)`
  
  const wrongAnswers = isTuplet
    ? [
        `Three regular ${noteName}s (normal time)`,
        `Two ${noteName}s in a triplet`,
        `Four ${noteName}s in a triplet`,
        `Three ${noteName}s in a duplet`
      ]
    : [
        `Three ${noteName}s in a triplet (time of two)`,
        `Two ${noteName}s in a triplet`,
        `Four ${noteName}s in a triplet`,
        `Three ${noteName}s in a duplet`
      ]
  
  return {
    id: generateQuestionId('triplet-comparison'),
    question: `Are these three ${noteName}s in a triplet or regular notes?`,
    correctAnswer,
    choices: generateWrongChoices(wrongAnswers, correctAnswer),
    explanation: isTuplet 
      ? `These three ${noteName}s are grouped as a triplet, meaning they are played in the time of two ${noteName}s.`
      : `These are three regular ${noteName}s played in their normal time values.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'triplet',
      tupletConfig: {
        noteType: selectedConfig.type,
        numberOfNotes: selectedConfig.numberOfNotes
      }
    }
  }
}

// Create a general triplet question
export const createTripletQuestion = (stage: StageNumber): Question => {
  const questionTypes = ['identification', 'value', 'comparison']
  const selectedType = getRandomItem(questionTypes)
  
  switch (selectedType) {
    case 'identification':
      return createTripletIdentificationQuestion(stage)
    case 'value':
      return createTripletValueQuestion(stage)
    case 'comparison':
      return createTripletComparisonQuestion(stage)
    default:
      return createTripletIdentificationQuestion(stage)
  }
}

// Create multiple triplet questions
export const createTripletQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createTripletQuestion(stage))
}
