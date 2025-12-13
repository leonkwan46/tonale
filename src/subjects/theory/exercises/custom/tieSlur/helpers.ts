import type { QuestionInterface } from '../../../curriculum/types'

export type TieSlurQuestion = {
  title: string
  correctAnswer: string
  choices: string[]
  explanation?: string
  questionType: 'meaning' | 'recognition'
  questionInterface: QuestionInterface
}

export const createTieRecognitionQuestions = (
  questionInterfaces: QuestionInterface[]
): TieSlurQuestion[] => {
  return questionInterfaces.map(questionInterface => ({
    title: 'What is this musical symbol?',
    correctAnswer: 'Tie',
    choices: ['Tie', 'Slur'],
    questionInterface,
    questionType: 'recognition',
    explanation: 'This is a tie. A tie connects two notes of the same pitch, combining their durations.'
  }))
}

export const createSlurRecognitionQuestions = (
  questionInterfaces: QuestionInterface[]
): TieSlurQuestion[] => {
  return questionInterfaces.map(questionInterface => ({
    title: 'What is this musical symbol?',
    correctAnswer: 'Slur',
    choices: ['Tie', 'Slur'],
    questionInterface,
    questionType: 'recognition',
    explanation: 'This is a slur. A slur indicates that notes should be played smoothly and connected.'
  }))
}

