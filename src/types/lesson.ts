import type { StageNumber } from './stage'
import type { VisualComponent } from './visual'

export type QuestionAnswerType = 'multipleChoice' | 'trueFalse' | 'keyPress' | 'rhythmTap'

export type LessonContentType = 
  | 'noteValue' | 'restValue' | 'noteValueName' | 'restValueName'
  | 'accidentals' | 'musicalTerm'
  | 'interval' | 'scaleDegrees' | 'semitonesTones'
  | 'keySignature' | 'timeSignature'
  | 'noteIdentification'
  | 'tieSlur' | 'triad' | 'grouping'
  | 'timeValueQuestion'

export interface Explanation {
  text: string
  visualComponent?: VisualComponent
}

export interface QuestionInterface {
  type: 'playback'
  audioFile?: ReturnType<typeof require>
  rhythm?: number[]
  tempo?: number
}

export interface Question {
  id: string
  question: string
  correctAnswer: string | number[]
  choices: string[]
  explanation?: Explanation
  type: QuestionAnswerType
  visualComponent?: VisualComponent
  layoutType?: 'grid' | 'row'
  stage?: StageNumber
  answerInterface?: QuestionAnswerType
  questionInterface?: QuestionInterface
}

export interface ExerciseConfig {
  generatorType: string
  questionsCount: number
  stage: StageNumber
  answerLayoutType: 'grid' | 'row'
}

export interface Lesson {
  id: string
  title: string
  description: string
  isFinalTest?: boolean
  isLocked?: boolean
  stars?: number
  isPassed?: boolean
  questions?: Question[]
  exerciseConfig?: ExerciseConfig
}

export interface StageLesson extends Lesson {
  stageId: string
}
