// ============================================================================
// FRONTEND/DOMAIN TYPES
// Business logic types used by React components and data layer
// Backend/API types are in shared/types/
// ============================================================================

import type { ClefType, KeyName, MusicElementData } from '@leonkwan46/music-notation'

// Stage number type for exercise generation
export type StageNumber = 1 | 2 | 3

export interface VisualComponent {
  type?: 'musicStaff' | 'timeSignature' | 'noteValue' | 'termAndSign' | 'triplet'
  clef?: ClefType
  elements?: MusicElementData[]
  timeSignature?: string
  keyName?: KeyName
  timeSignatureValue?: string
  noteType?: string | { type: string; dots?: number; isTuplet?: boolean }
  symbolType?: string
  isChord?: boolean
  tupletConfig?: {
    noteType: string  // Base note type for the tuplet
    numberOfNotes: number  // Number of notes in the tuplet (3 for triplets, 2 for duplets, etc.)
  }
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
