import { refreshStageUnlockStatus } from './stages/stageDataHelpers'

// ============================================================================
// THEORY DATA MANAGEMENT & PROGRESS SYSTEM
// ============================================================================

// Progress data cache
let userProgressData: Record<string, { isLocked: boolean; stars: number }> = {}
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
export const getLessonProgress = (lessonId: string): { isLocked: boolean; stars: number } => {
  // Check if we have progress data
  if (userProgressData[lessonId]) {
    return userProgressData[lessonId]
  }
  
  // Fallback to conservative defaults
  return { 
    isLocked: true,  // 🔒 Locked by default (conservative)
    stars: 0         // ⭐ No progress by default
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
