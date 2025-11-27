import type { VisualComponent } from '../../../curriculum/types'

export type TieSlurQuestion = {
  question: string
  correctAnswer: string
  choices: string[]
  explanation?: string
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
    explanation: 'This is a tie. A tie connects two notes of the same pitch, combining their durations.'
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
    explanation: 'This is a slur. A slur indicates that notes should be played smoothly and connected.'
  }))
}

