// ============================================================================
// FRONTEND/DOMAIN TYPES
// Business logic types used by React components and data layer
// Backend/API types are in shared/types/
// ============================================================================

import type { ClefType, KeyName, MusicElementData } from '@leonkwan46/music-notation'

// Stage number type for exercise generation
export type StageNumber = 1 | 2 | 3

export interface VisualComponent {
  type?: 'musicStaff' | 'timeSignature' | 'noteValue' | 'keySignature' | 'termAndSign'
  // MusicStaff specific properties
  clef?: ClefType
  elements?: MusicElementData[]
  timeSignature?: string
  keyName?: KeyName
  // TimeSignature specific properties (when type is 'timeSignature')
  timeSignatureValue?: string
  // NoteValue specific properties (when type is 'noteValue')
  noteType?: string | { type: string; dots?: number }
  // KeySignature specific properties (when type is 'keySignature')
  keySignatureValue?: string
  // SMuFL Symbol specific properties (when type is 'termAndSign')
  symbolType?: string
}

export interface Question {
  id: string
  question: string
  correctAnswer: string
  choices: string[]
  explanation?: string
  type: 'multipleChoice' | 'trueFalse' | 'keyPress'
  visualComponent?: VisualComponent
  metadata?: {
    hasSymbol?: boolean
    symbol?: string
    category?: string
  }
}

export interface ExerciseConfig {
  generatorType: string
  questionsCount: number
  stage: StageNumber
}

// ============================================================================
// LESSON TYPES (Domain Model)
// ============================================================================

/**
 * Lesson - Core lesson definition with runtime progress overlay
 * Used throughout the app for lesson data + progress state
 */
export interface Lesson {
  id: string
  title: string
  description: string
  estimatedTime?: number // in minutes
  
  // Lesson type
  isFinalTest?: boolean // true for final tests, undefined/false for regular lessons
  
  // Runtime progress (overlay from progress system)
  isLocked?: boolean    // Provided by progress system
  stars?: number        // 0-3 for regular lessons
  isPassed?: boolean    // true/false for final tests
  
  // Content definition
  questions?: Question[]          // Hardcoded questions (rarely used)
  exerciseConfig?: ExerciseConfig // Auto-generated questions config
}

/**
 * StageLesson - Lesson with stage context
 */
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
  totalStars: number
  order: number // Stage sequence order
  prerequisiteStages?: string[] // Required stages to unlock this one
  coverImageUrl?: string
  themeColor?: string
}
