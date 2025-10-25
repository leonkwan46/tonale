// Note grouping, ties, and slurs exercise generators
import { NOTES } from '@leonkwan46/music-notation'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

// Types of grouping concepts to test
type GroupingConcept = 'tie' | 'slur' | 'beaming' | 'grouping'

// Create a tie identification question
export const createTieQuestion = (stage: StageNumber): Question => {
  const tieDefinition = 'Hold note for combined duration'
  const wrongAnswers = [
    'Smooth connection between notes',
    'Short and detached',
    'Emphasized note',
    'Hold note longer than written'
  ]
  
  return {
    id: generateQuestionId('tie'),
    question: 'What is this musical symbol?',
    correctAnswer: tieDefinition,
    choices: generateWrongChoices(wrongAnswers, tieDefinition),
    explanation: 'A tie connects two notes of the same pitch, combining their durations.',
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType: 'tie'
    }
  }
}

// Create a slur identification question
export const createSlurQuestion = (stage: StageNumber): Question => {
  const slurDefinition = 'Smooth connection between notes'
  const wrongAnswers = [
    'Hold note for combined duration',
    'Short and detached',
    'Emphasized note',
    'Hold note longer than written'
  ]
  
  return {
    id: generateQuestionId('slur'),
    question: 'What is this musical symbol?',
    correctAnswer: slurDefinition,
    choices: generateWrongChoices(wrongAnswers, slurDefinition),
    explanation: 'A slur indicates that notes should be played smoothly and connected.',
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType: 'slur'
    }
  }
}

// Create a beaming/grouping question
export const createBeamingQuestion = (stage: StageNumber): Question => {
  const beamingDefinition = 'Correct grouping of notes within beats'
  const wrongAnswers = [
    'Incorrect grouping across beats',
    'Notes grouped by pitch',
    'All notes connected',
    'Random note placement'
  ]
  
  return {
    id: generateQuestionId('beaming'),
    question: 'Is this note grouping correct for the time signature?',
    correctAnswer: beamingDefinition,
    choices: generateWrongChoices(wrongAnswers, beamingDefinition),
    explanation: 'Notes should be grouped to show the beat structure of the time signature.',
    type: 'multipleChoice',
    visualComponent: {
      clef: 'treble',
      timeSignature: '4/4',
      elements: [
        { pitch: 'C4', type: NOTES.QUAVER },
        { pitch: 'D4', type: NOTES.QUAVER },
        { pitch: 'E4', type: NOTES.QUAVER },
        { pitch: 'F4', type: NOTES.QUAVER }
      ]
    }
  }
}

// Create a general note grouping question
export const createNoteGroupingQuestion = (stage: StageNumber): Question => {
  const concepts: GroupingConcept[] = ['tie', 'slur', 'beaming']
  const selectedConcept = getRandomItem(concepts)
  
  switch (selectedConcept) {
    case 'tie':
      return createTieQuestion(stage)
    case 'slur':
      return createSlurQuestion(stage)
    case 'beaming':
      return createBeamingQuestion(stage)
    default:
      return createTieQuestion(stage)
  }
}

// Create multiple note grouping questions
export const createNoteGroupingQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  return Array.from({ length: questionsCount }, () => createNoteGroupingQuestion(stage))
}
