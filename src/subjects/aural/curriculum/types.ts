import type { Question, ExerciseConfig, Lesson, StageLesson, QuestionInterface } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'

// Re-export types for convenience
export type { Question, ExerciseConfig, Lesson, StageLesson, QuestionInterface, StageNumber }

// Pulse exercise configuration
export interface PulseExercise {
  audioFile: ReturnType<typeof require>
  duration: number // Duration in seconds
  tempo?: number // BPM
}

// Pulse strictness configuration
export interface PulseStrictnessConfig {
  tolerance: number // Absolute tolerance in seconds
  relative: number // Relative tolerance multiplier
  match: number // Minimum match ratio (0-1)
  outlierThreshold: number // Outlier detection threshold
  maxOutlierRatio: number // Maximum allowed outlier ratio
}

// Rhythm strictness configuration
export interface StrictnessConfig {
  tolerance: number // Base tolerance in seconds
  relative: number // Relative tolerance multiplier
  match: number // Minimum match ratio (0-1)
  tempoMin: number // Minimum tempo ratio (e.g., 0.8 = 20% slower)
  tempoMax: number // Maximum tempo ratio (e.g., 1.2 = 20% faster)
}

// Stage with curriculum data
export interface Stage {
  id: string
  title: string
  description: string
  lessons: StageLesson[]
  isCleared: boolean
  isUnlocked: boolean
  totalStars: number
  order: number
  prerequisiteStages?: string[]
  coverImageUrl?: string
  themeColor?: string
}

// Rhythm pattern configuration
export interface RhythmPatternConfig {
  noteGroupings: number[][] // Arrays of note beat values
  timeSignature: string
  minPatternLength: number
}
