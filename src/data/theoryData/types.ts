// Types for lesson and stage data
import type { ClefType, KeyName, MusicElementData } from '@leonkwan46/music-notation'

// Stage number type for exercise generation
export type StageNumber = 1 | 2 | 3

export interface VisualComponent {
  type?: 'musicStaff' | 'timeSignature' | 'noteValue' | 'keySignature'
  // MusicStaff specific properties
  clef?: ClefType
  elements?: MusicElementData[]
  timeSignature?: string
  keyName?: KeyName
  // TimeSignature specific properties (when type is 'timeSignature')
  timeSignatureValue?: string
  // NoteValue specific properties (when type is 'noteValue')
  noteType?: string
  // KeySignature specific properties (when type is 'keySignature')
  keySignatureValue?: string
}

export interface Question {
  id: string
  question: string
  correctAnswer: string
  choices: string[]
  explanation?: string
  type: 'multipleChoice' | 'trueFalse' | 'keyPress'
  visualComponent?: VisualComponent
}

export interface ExerciseConfig {
  generatorType: string
  questionsCount: number
  stage: StageNumber
}

export interface Lesson {
  id: string
  title: string
  description: string
  isLocked?: boolean  // Optional - provided by progress system
  stars: number      // Optional - provided by progress system
  isFinalTest?: boolean
  estimatedTime?: number // in minutes
  questions?: Question[] // Optional - hardcoded questions for the lesson
  exerciseConfig?: ExerciseConfig // Optional - auto-generated questions config
}

// Lesson within a stage context (includes stageId)
export interface StageLesson extends Lesson {
  stageId: string
}

export interface Stage {
  id: string
  title: string
  description: string
  lessons: StageLesson[]
  isCleared: boolean
  isUnlocked: boolean
  requiredStars: number
  totalStars: number
  order: number // Stage sequence order
  prerequisiteStages?: string[] // Required stages to unlock this one
  coverImageUrl?: string
  themeColor?: string
}
