// Types for lesson and stage data
export interface VisualComponent {
  type: 'note' | 'rest' | 'staff' | 'accidental' | 'timeSignature' | 'keySignature'
  // Note-specific props
  noteType?: string
  pitch?: string
  // Staff-specific props
  clef?: 'treble' | 'bass'
  notes?: Array<{ pitch: string, noteType: string, accidental: string | null }>
  timeSignature?: string
  keyName?: string
  // Accidental-specific props
  accidental?: 'sharp' | 'flat' | 'natural'
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
  generators: {
    generatorId: string
    count: number
    difficulty?: string
  }[]
  totalQuestions: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  isLocked?: boolean  // Optional - provided by progress system
  stars?: number      // Optional - provided by progress system
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
