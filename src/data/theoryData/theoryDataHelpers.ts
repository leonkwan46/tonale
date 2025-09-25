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
    console.log('Fetching user progress for:', userId)
    
    // Simulate API call - replace with actual endpoint
    const response = await fetch(`/api/user/progress?userId=${userId}`)
    const progressData = await response.json()
    
    // Store progress data
    userProgressData = progressData.lessons || {}
    lastProgressFetch = Date.now()
    
    // Refresh stage unlock status based on new progress
    refreshStageUnlockStatus()
    
    console.log('User progress initialized:', userProgressData)
  } catch (error) {
    console.error('Failed to fetch user progress:', error)
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
export const updateLessonProgress = async (lessonId: string, stars: number): Promise<void> => {
  // Update locally first (optimistic update)
  userProgressData[lessonId] = { 
    isLocked: false, 
    stars: Math.max(0, Math.min(3, stars)) 
  }
  
  // Refresh stage unlock status
  refreshStageUnlockStatus()
  
  // Sync to backend
  try {
    await fetch(`/api/user/progress/lesson/${lessonId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stars })
    })
    console.log('Progress synced to backend for lesson:', lessonId)
  } catch (error) {
    console.error('Failed to sync progress to backend:', error)
    // Could implement retry logic here
  }
}

// Update final test progress (pass/fail)
export const updateFinalTestProgress = async (lessonId: string, isPassed: boolean): Promise<void> => {
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
  
  // Sync to backend
  try {
    await fetch(`/api/user/progress/lesson/${lessonId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPassed })
    })
    console.log('Final test progress synced to backend for lesson:', lessonId, 'Passed:', isPassed)
  } catch (error) {
    console.error('Failed to sync final test progress to backend:', error)
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
