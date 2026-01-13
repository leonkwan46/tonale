import { NOTES } from '@leonkwan46/music-notation'
import type { Explanation } from '@/types/lesson'
import type { VisualComponent } from '@/types/visual'
import { ARTICULATION_SIGNS_DEFINITIONS } from '../../../../config/gradeSyllabus/musicalTerms'
import { generateExplanation } from '../../utils/explanation'
import { generateWrongChoices } from '../../utils/question'

const allSignDefinitions = [...new Set(Object.values(ARTICULATION_SIGNS_DEFINITIONS))]

// Visual components for meaning questions
export const TIE_MEANING_VISUAL: VisualComponent = {
  type: 'musicStaff',
  clef: 'treble',
  elements: [
    { pitch: 'F4', type: NOTES.MINIM, stem: 'up', tieStart: true },
    { pitch: 'F4', type: NOTES.MINIM, stem: 'up', tieEnd: true }
  ],
  size: 'xs'
}

export const SLUR_MEANING_VISUAL: VisualComponent = {
  type: 'musicStaff',
  clef: 'treble',
  elements: [
    { pitch: 'C4', type: NOTES.CROTCHET, ledgerLines: 1, stem: 'up', spacing: 80, slurStart: true },
    { pitch: 'E4', type: NOTES.CROTCHET, stem: 'up', spacing: 80 },
    { pitch: 'G4', type: NOTES.CROTCHET, stem: 'up', slurEnd: true }
  ],
  size: 'sml'
}

export type TieSlurQuestion = {
  question: string
  correctAnswer: string
  choices: string[]
  explanation?: Explanation
  questionType: 'meaning' | 'recognition'
  visualComponent: VisualComponent
}

export const createTieRecognitionQuestions = (
  visualComponents: VisualComponent[]
): TieSlurQuestion[] => {
  return visualComponents.map(visualComponent => ({
    question: 'What is this musical symbol?',
    correctAnswer: 'Tie',
    choices: ['Tie', 'Slur'],
    visualComponent,
    questionType: 'recognition',
    explanation: generateExplanation('tieSlur', {
      correctAnswer: 'Tie'
    }, visualComponent)
  }))
}

export const createSlurRecognitionQuestions = (
  visualComponents: VisualComponent[]
): TieSlurQuestion[] => {
  return visualComponents.map(visualComponent => ({
    question: 'What is this musical symbol?',
    correctAnswer: 'Slur',
    choices: ['Tie', 'Slur'],
    visualComponent,
    questionType: 'recognition',
    explanation: generateExplanation('tieSlur', {
      correctAnswer: 'Slur'
    }, visualComponent)
  }))
}

export const createTieMeaningQuestions = (
  visualComponents: VisualComponent[]
): TieSlurQuestion[] => {
  return visualComponents.map(visualComponent => ({
    question: 'What is this musical symbol?',
    correctAnswer: ARTICULATION_SIGNS_DEFINITIONS.tie,
    choices: generateWrongChoices(allSignDefinitions, ARTICULATION_SIGNS_DEFINITIONS.tie),
    visualComponent,
    questionType: 'meaning',
    explanation: generateExplanation('tieSlur', {
      correctAnswer: ARTICULATION_SIGNS_DEFINITIONS.tie
    }, visualComponent)
  }))
}

export const createSlurMeaningQuestions = (
  visualComponents: VisualComponent[]
): TieSlurQuestion[] => {
  return visualComponents.map(visualComponent => ({
    question: 'What is this musical symbol?',
    correctAnswer: ARTICULATION_SIGNS_DEFINITIONS.slur,
    choices: generateWrongChoices(allSignDefinitions, ARTICULATION_SIGNS_DEFINITIONS.slur),
    visualComponent,
    questionType: 'meaning',
    explanation: generateExplanation('tieSlur', {
      correctAnswer: ARTICULATION_SIGNS_DEFINITIONS.slur
    }, visualComponent)
  }))
}

