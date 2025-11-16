import { NOTES } from '@leonkwan46/music-notation'
import { generateQuestionsFromPool } from '../helpers/exerciseHelpers'
import { generateQuestionId, generateWrongChoices, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

type GroupingConcept = 'beaming' | 'grouping'

const BEAMING_DEFINITION = 'Correct grouping of notes within beats'

const BEAMING_WRONG_ANSWERS = [
  'Incorrect grouping across beats',
  'Notes grouped by pitch',
  'All notes connected',
  'Random note placement'
]

export const createBeamingQuestion = (stage: StageNumber): Question => {
  return {
    id: generateQuestionId('beaming'),
    question: 'Is this note grouping correct for the time signature?',
    correctAnswer: BEAMING_DEFINITION,
    choices: generateWrongChoices(BEAMING_WRONG_ANSWERS, BEAMING_DEFINITION),
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

export const createNoteGroupingQuestion = (stage: StageNumber): Question => {
  const conceptsForStage = ((): GroupingConcept[] => {
    return ['beaming']
  })()
  const concepts: GroupingConcept[] = conceptsForStage.length > 0 ? conceptsForStage : ['beaming']
  const selectedConcept = getRandomItem(concepts)
  
  switch (selectedConcept) {
    case 'beaming':
      return createBeamingQuestion(stage)
    default:
      return createBeamingQuestion(stage)
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.visualComponent?.elements && question.visualComponent.elements.length > 0) {
    const pitches = question.visualComponent.elements
      .map(element => element.pitch)
      .filter(Boolean)
      .join('|')
    if (pitches) {
      return `beaming|${pitches}`
    }
  }
  return question.correctAnswer ?? null
}

export const createNoteGroupingQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const uniquePool = [createBeamingQuestion(stage)]
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
