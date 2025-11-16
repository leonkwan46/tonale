import { NOTES } from '@leonkwan46/music-notation'
import { generateQuestionsFromPool } from '../helpers/exerciseHelpers'
import { generateQuestionId, getRandomItem } from '../helpers/questionHelpers'
import { Question, StageNumber } from '../theoryData/types'

type GroupingConcept = 'beaming' | 'grouping'

export const createBeamingQuestion = (stage: StageNumber): Question => {
  return {
    id: generateQuestionId('beaming'),
    question: 'Is this note grouping correct for the time signature?',
    correctAnswer: 'False',
    choices: ['True', 'False'],
    explanation: 'Notes should be grouped to show the beat structure of the time signature.',
    type: 'trueFalse',
    visualComponent: {
      clef: 'treble',
      size: 'lg',
      timeSignature: '4/4',
      elements: [
        // { barlineType: 'none', type: 'barline', spacing: -10 }, // TODO: We need to introduce empty space as element in library
        { pitch: 'C4', type: NOTES.QUAVER, spacing: 40 },
        { pitch: 'D4', type: NOTES.QUAVER, spacing: 40 },
        { pitch: 'E4', type: NOTES.QUAVER, spacing: 40 },
        { pitch: 'F4', type: NOTES.QUAVER, spacing: 40 },
        { barlineType: 'single', type: 'barline', spacing: 60 },
        { pitch: 'F4', type: NOTES.QUAVER, spacing: 40 },
        { pitch: 'G4', type: NOTES.QUAVER, spacing: 40 },
        { pitch: 'A4', type: NOTES.QUAVER, spacing: 40 },
        { pitch: 'B4', type: NOTES.QUAVER, spacing: 40 },
        { barlineType: 'final', type: 'barline', spacing: 60 }
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
