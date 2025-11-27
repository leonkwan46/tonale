// ============================================================================
// LESSON PROGRESS TYPES (Backend/API)
// Simple, flexible types for database and API
// Frontend domain types are in src/data/theoryData/types.ts
// ============================================================================

import type { Timestamp } from 'firebase/firestore'

// Lesson type discriminator (for API validation)
export type LessonType = 'regular' | 'finalTest'

// ============================================================================
// LESSON PROGRESS (Database Schema)
// Simple schema - let optional fields indicate lesson type
// ============================================================================

export interface LessonProgress {
  lessonId: string
  attempts: number
  wrongAnswersCount: number
  completedAt: Timestamp // Firestore Timestamp (FirebaseFirestore.Timestamp on client, admin.firestore.Timestamp on server)
  lastAttemptAt: Timestamp // Firestore Timestamp
  
  // Optional fields based on lesson type
  stars?: number        // Present for regular lessons (0-3)
  isPassed?: boolean    // Present for final tests (true/false)
}

// ============================================================================
// API PAYLOAD/RESPONSE TYPES
// ============================================================================

export interface UpdateLessonProgressPayload {
  lessonId: string
  lessonType: LessonType  // For validation
  wrongAnswersCount: number
  stars?: number          // Required if lessonType === 'regular'
  isPassed?: boolean      // Required if lessonType === 'finalTest'
}

export interface GetLessonProgressPayload {
  lessonId: string
}

export interface LessonProgressResponse {
  success: boolean
  data: LessonProgress
}

export interface AllLessonProgressResponse {
  success: boolean
  data: Record<string, LessonProgress>
}

