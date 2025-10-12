import { getAllLessonProgressFn, updateLessonProgressFn } from '@/config/firebase/functions/lessonProgress'
import { refreshStageUnlockStatus, stagesArray } from './stages/stageDataHelpers'
import { Stage, StageLesson } from './types'

// ============================================================================
// THEORY DATA MANAGEMENT & PROGRESS SYSTEM
// ============================================================================

// Progress data cache
let userProgressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> = {}
let lastProgressFetch: number = 0
const PROGRESS_CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Initialize user progress after authentication
export const initializeUserProgress = async (userId: string): Promise<void> => {
  try {
    console.log('🔄 Fetching user progress for:', userId)
    
    // Real Firebase call instead of mock fetch
    const result = await getAllLessonProgressFn()
    
    if (result.data.success) {
      // Transform Firebase data to cache format
      const lessonsData = result.data.data
      userProgressData = Object.keys(lessonsData).reduce((acc, lessonId) => {
        const lessonProgress = lessonsData[lessonId]
        acc[lessonId] = {
          isLocked: false, // If it exists in progress, it's been attempted
          stars: lessonProgress.stars,      // undefined for final tests
          isPassed: lessonProgress.isPassed // undefined for regular lessons
        }
        return acc
      }, {} as Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>)
      
      lastProgressFetch = Date.now()
      
      // Refresh stage unlock status based on new progress
      refreshStageUnlockStatus()
      
      console.log('✅ User progress initialized:', Object.keys(userProgressData).length, 'lessons')
    }
  } catch (error) {
    console.error('❌ Failed to fetch user progress:', error)
    // Fallback to default locked state
    userProgressData = {}
    lastProgressFetch = Date.now()
  }
}

// Smart refresh - only fetch if cache is stale
export const refreshUserProgress = async (userId: string): Promise<void> => {
  const now = Date.now()
  const shouldRefresh = (now - lastProgressFetch) > PROGRESS_CACHE_DURATION
  
  if (shouldRefresh || Object.keys(userProgressData).length === 0) {
    console.log('Refreshing user progress (cache stale or empty)')
    await initializeUserProgress(userId)
  } else {
    console.log('Using cached user progress')
  }
}

// Get progress data for a specific lesson
export const getLessonProgress = (lessonId: string): { isLocked: boolean; stars?: number; isPassed?: boolean } => {
  // Check if we have progress data
  if (userProgressData[lessonId]) {
    return userProgressData[lessonId]
  }
  
  // Fallback to conservative defaults
  return { 
    isLocked: true,  // 🔒 Locked by default (conservative)
    stars: 0,        // ⭐ No progress by default
    isPassed: false  // ❌ Failed by default for final tests
  }
}

// Update lesson progress (after completion)
export const updateLessonProgress = async (
  lessonId: string, 
  stars: number, 
  wrongAnswersCount: number = 0
): Promise<void> => {
  // Clamp stars to valid range
  const validStars = Math.max(0, Math.min(3, stars))
  
  // Update locally first (optimistic update)
  userProgressData[lessonId] = { 
    isLocked: false, 
    stars: validStars
  }
  
  // Refresh stage unlock status
  refreshStageUnlockStatus()
  
  // Sync to backend - REAL Firebase implementation
  try {
    await updateLessonProgressFn({
      lessonId,
      lessonType: 'regular',
      stars: validStars,
      wrongAnswersCount
    })
    console.log('✅ Progress synced to backend for lesson:', lessonId, 'Stars:', validStars)
  } catch (error) {
    console.error('❌ Failed to sync progress to backend:', error)
    // Could implement retry logic here
  }
}

// Update final test progress (pass/fail)
export const updateFinalTestProgress = async (
  lessonId: string, 
  isPassed: boolean,
  wrongAnswersCount: number = 0
): Promise<void> => {
  // Update locally first (optimistic update)
  userProgressData[lessonId] = { 
    isLocked: false, 
    isPassed: isPassed 
  }
  
  // Update the lesson data in the stage arrays to reflect the pass status
  // This is important for stage clearing calculations
  updateLessonDataInStages(lessonId, { isPassed })
  
  // Refresh stage unlock status (this will unlock next stage if current stage is cleared)
  refreshStageUnlockStatus()
  
  // Sync to backend - REAL Firebase implementation
  try {
    await updateLessonProgressFn({
      lessonId,
      lessonType: 'finalTest',
      isPassed,
      wrongAnswersCount
    })
    console.log('✅ Final test progress synced to backend for lesson:', lessonId, 'Passed:', isPassed)
  } catch (error) {
    console.error('❌ Failed to sync final test progress to backend:', error)
    // Could implement retry logic here
  }
}

// Helper function to update lesson data in stage arrays
const updateLessonDataInStages = (lessonId: string, progressData: { stars?: number; isPassed?: boolean }): void => {
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      if (lesson.id === lessonId) {
        if (progressData.stars !== undefined) {
          lesson.stars = progressData.stars
        }
        if (progressData.isPassed !== undefined) {
          lesson.isPassed = progressData.isPassed
        }
      }
    })
  })
}

// Clear progress data (on logout)
export const clearUserProgress = (): void => {
  userProgressData = {}
  lastProgressFetch = 0
}

// Check if progress data is loaded
export const isProgressLoaded = (): boolean => {
  return Object.keys(userProgressData).length > 0
}

// Get cache status
export const getCacheStatus = (): { isStale: boolean; lastFetch: number } => {
  const now = Date.now()
  const isStale = (now - lastProgressFetch) > PROGRESS_CACHE_DURATION
  return { isStale, lastFetch: lastProgressFetch }
}
