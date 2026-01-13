import { getAllLessonProgressFn, updateLessonProgressFn } from '@/config/firebase/functions/lessonProgress'
import { getRevisionQuestionsFn } from '@/config/firebase/functions/revisionQuestions'
import { LAST_LESSON_ACCESS_KEY } from '@/constants/cache'
import { useUser } from '@/hooks/useUserContext'
import { calculateStageUnlockStatus, getLessonWithProgress, stagesArray } from '@/theory/curriculum/stages/helpers'
import { clearAllUserCache, loadProgressCache, saveProgressCache } from '@/utils/cache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Lesson, Stage, StageLesson } from '@types'
import { RevisionQuestion } from '@types'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface LastLessonAccess {
  lessonId: string
  timestamp: number
}

export interface ProgressData {
  isLocked: boolean
  stars?: number
  isPassed?: boolean
}

export interface ProgressContextType {
  // State
  progressData: Record<string, ProgressData>
  revisionQuestions: RevisionQuestion[]
  loading: boolean
  initialized: boolean
  
  // Progress actions
  refreshProgress: () => Promise<void>
  refreshRevisionQuestions: () => Promise<void>
  updateProgress: (lessonId: string, data: Partial<ProgressData>) => void
  updateLessonProgress: (lessonId: string, stars: number) => Promise<void>
  updateFinalTestProgress: (lessonId: string, isPassed: boolean) => Promise<void>
  clearAllUserData: () => Promise<void>
  
  // Lesson utilities (pure functions, exposed for convenience)
  getLessonById: (id: string, progressData?: Record<string, ProgressData>) => Lesson | undefined
  getStageById: (id: string) => Stage | undefined
  getStageRequirements: (stageId: string) => { isUnlocked: boolean; missingPrerequisites: Stage[]; progressNeeded: string[] }
  getNextLockedStage: () => Stage | undefined
  trackLessonAccessLocal: (lessonId: string) => Promise<void>
  getLastAccessedLessonLocal: () => Promise<LastLessonAccess | null>
  allStageLessons: StageLesson[]
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

// ============================================================================
// STORAGE HELPERS
// ============================================================================

const trackLessonAccessLocal = async (lessonId: string): Promise<void> => {
  try {
    const accessData: LastLessonAccess = {
      lessonId,
      timestamp: Date.now()
    }
    await AsyncStorage.setItem(LAST_LESSON_ACCESS_KEY, JSON.stringify(accessData))
  } catch (error) {
    console.error('Failed to track lesson access:', error)
  }
}

const getLastAccessedLessonLocal = async (): Promise<LastLessonAccess | null> => {
  try {
    const stored = await AsyncStorage.getItem(LAST_LESSON_ACCESS_KEY)
    if (!stored) return null
    
    const accessData: LastLessonAccess = JSON.parse(stored)
    return accessData
  } catch (error) {
    console.error('Failed to get last accessed lesson:', error)
    return null
  }
}

// ============================================================================
// STAGE MANAGEMENT HELPERS
// ============================================================================

const refreshStageUnlockStatus = (
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): void => {
  stagesArray.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stagesArray)
    
    stage.lessons.forEach(lesson => {
      if (!stage.isUnlocked) {
        lesson.isLocked = true
      } else {
        const lessonProgress = progressData[lesson.id]
        lesson.isLocked = lessonProgress?.isLocked ?? lesson.isLocked ?? false
      }
    })
  })
}

const updateLessonInStages = (lessonId: string, progressUpdate: { stars?: number; isPassed?: boolean }): void => {
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      if (lesson.id === lessonId) {
        if (progressUpdate.stars !== undefined) {
          lesson.stars = progressUpdate.stars
        }
        if (progressUpdate.isPassed !== undefined) {
          lesson.isPassed = progressUpdate.isPassed
        }
      }
    })
  })
}

const resetStageProgressData = (): void => {
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      lesson.stars = undefined
      lesson.isPassed = undefined
    })
    
    stage.totalStars = 0
    stage.isCleared = false
  })
}

const updateStageLessonsWithProgress = (
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): void => {
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      const lessonProgress = progressData[lesson.id]
      if (lessonProgress) {
        lesson.isLocked = lessonProgress.isLocked
        lesson.stars = lessonProgress.stars
        lesson.isPassed = lessonProgress.isPassed
      } else {
        lesson.stars = undefined
        lesson.isPassed = undefined
      }
    })
    
    const regularLessons = stage.lessons.filter(lesson => !lesson.isFinalTest)
    const finalTest = stage.lessons.find(lesson => lesson.isFinalTest)
    
    stage.totalStars = regularLessons.reduce((total, lesson) => total + (lesson.stars || 0), 0)
    stage.isCleared = finalTest ? (finalTest.isPassed === true) : false
  })
}

const syncProgressToStages = (
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): void => {
  updateStageLessonsWithProgress(progressData)
  refreshStageUnlockStatus(progressData)
}

// ============================================================================
// PROGRESS DATA HELPERS
// ============================================================================

const convertLessonsDataToProgressFormat = (lessonsData: Record<string, { stars?: number; isPassed?: boolean }>): Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> => {
  return Object.keys(lessonsData).reduce((acc, lessonId) => {
    const lessonProgress = lessonsData[lessonId]
    acc[lessonId] = {
      isLocked: false,
      stars: lessonProgress.stars,
      isPassed: lessonProgress.isPassed
    }
    return acc
  }, {} as Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>)
}

// ============================================================================
// LESSON UTILITIES (Pure functions - could be moved to helpers.ts if preferred)
// ============================================================================

const getLessonById = (
  id: string,
  progressData?: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Lesson | undefined => {
  return getLessonWithProgress(id, progressData)
}

const allStageLessons: StageLesson[] = [
  ...stagesArray[0].lessons,
  ...stagesArray[1].lessons,
  ...stagesArray[2].lessons
]

const getStageById = (id: string): Stage | undefined => {
  return stagesArray.find(stage => stage.id === id)
}

const getStageRequirements = (stageId: string): { 
  isUnlocked: boolean
  missingPrerequisites: Stage[]
  progressNeeded: string[]
} => {
  const stage = stagesArray.find(s => s.id === stageId)
  if (!stage) {
    return { isUnlocked: false, missingPrerequisites: [], progressNeeded: [] }
  }
  
  const missingPrerequisites: Stage[] = []
  const progressNeeded: string[] = []
  
  if (stage.prerequisiteStages) {
    stage.prerequisiteStages.forEach(prereqId => {
      const prereqStage = stagesArray.find(s => s.id === prereqId)
      if (prereqStage && !prereqStage.isCleared) {
        missingPrerequisites.push(prereqStage)
        const lessonsWithoutStars = prereqStage.lessons.filter(l => l.stars === 0)
        if (lessonsWithoutStars.length > 0) {
          progressNeeded.push(
            `Complete ${lessonsWithoutStars.length} lesson(s) in ${prereqStage.title}`
          )
        }
      }
    })
  }
  
  return {
    isUnlocked: stage.isUnlocked,
    missingPrerequisites,
    progressNeeded
  }
}

const getNextLockedStage = (): Stage | undefined => {
  return stagesArray
    .filter(stage => !stage.isUnlocked)
    .sort((a, b) => a.order - b.order)[0]
}

// ============================================================================
// PROGRESS PROVIDER COMPONENT
// ============================================================================

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser, userData, loading: userLoading } = useUser()
  const [progressData, setProgressDataState] = useState<Record<string, ProgressData>>({})
  const [revisionQuestions, setRevisionQuestions] = useState<RevisionQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const currentUserIdRef = useRef<string>('')

  // ============================================================================
  // PROGRESS INITIALIZATION
  // ============================================================================

  const setProgressData = useCallback((data: Record<string, ProgressData>) => {
    setProgressDataState(data)
    setInitialized(true)
  }, [])

  const initializeEmptyProgress = useCallback(() => {
    const emptyProgress: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> = {}
    setProgressData(emptyProgress)
    resetStageProgressData()
    syncProgressToStages(emptyProgress)
  }, [setProgressData])

  const initializeUserProgress = useCallback(async (userId: string) => {
    try {
      if (currentUserIdRef.current && currentUserIdRef.current !== userId) {
        currentUserIdRef.current = ''
        await clearAllUserCache()
      }
      
      currentUserIdRef.current = userId
      resetStageProgressData()
      
      const result = await getAllLessonProgressFn()
      
      if (result.data.success) {
        const lessonsData = result.data.data
        
        if (Object.keys(lessonsData).length === 0) {
          initializeEmptyProgress()
        } else {
          const progressData = convertLessonsDataToProgressFormat(lessonsData)
          setProgressData(progressData)
          syncProgressToStages(progressData)
          await saveProgressCache(userId, progressData)
        }
      } else {
        // Try to load from cache as fallback
        const cachedData = await loadProgressCache(userId)
        if (cachedData) {
          // Cache is valid and fresh, use it
          setProgressData(cachedData.data)
          syncProgressToStages(cachedData.data)
          // Note: We still try to refresh from server in background
          // but don't wait for it
          getAllLessonProgressFn().then(result => {
            if (result.data.success && currentUserIdRef.current === userId) {
              const lessonsData = result.data.data
              if (Object.keys(lessonsData).length > 0) {
                const progressData = convertLessonsDataToProgressFormat(lessonsData)
                setProgressData(progressData)
                syncProgressToStages(progressData)
                saveProgressCache(userId, progressData)
              }
            }
          }).catch(err => {
            console.error('Background progress refresh failed:', err)
          })
        } else {
          initializeEmptyProgress()
        }
      }
    } catch (error) {
      console.error('Failed to initialize user progress:', error)
      initializeEmptyProgress()
    }
  }, [setProgressData, initializeEmptyProgress])

  // Initialize progress when authUser is available AND userData exists
  // During registration, userData is null until createUserData completes
  // This prevents wasted API calls before the user document exists
  useEffect(() => {
    if (!authUser) {
      setProgressDataState({})
      setRevisionQuestions([])
      setInitialized(false)
      setLoading(false)
      currentUserIdRef.current = ''
      return
    }

    // Wait for user loading to complete and userData to exist
    // If userData is null after loading, it means user document doesn't exist yet (new registration)
    // In that case, wait for createUserData to complete before initializing
    if (userLoading || userData === null) {
      return
    }

    const initialize = async () => {
      setLoading(true)
      try {
        await initializeUserProgress(authUser.uid)
        setInitialized(true)
      } catch (error) {
        console.error('Failed to initialize progress:', error)
        setInitialized(false)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [authUser, userData, userLoading, initializeUserProgress])

  // ============================================================================
  // REVISION QUESTIONS MANAGEMENT
  // ============================================================================

  const loadRevisionQuestions = useCallback(async () => {
    try {
      const result = await getRevisionQuestionsFn({})
      if (result.data.success) {
        setRevisionQuestions(result.data.data)
      }
    } catch (error) {
      console.error('Failed to load revision questions:', error)
    }
  }, [])

  useEffect(() => {
    if (authUser && initialized) {
      loadRevisionQuestions()
    }
  }, [authUser, initialized, loadRevisionQuestions])

  // ============================================================================
  // PROGRESS ACTIONS
  // ============================================================================

  const refreshProgress = useCallback(async () => {
    if (!authUser) return
    
    setLoading(true)
    try {
      await initializeUserProgress(authUser.uid)
      setInitialized(true)
    } catch (error) {
      console.error('Failed to refresh progress:', error)
    } finally {
      setLoading(false)
    }
  }, [authUser, initializeUserProgress])

  const refreshRevisionQuestions = useCallback(async () => {
    if (!authUser) return
    await loadRevisionQuestions()
  }, [loadRevisionQuestions, authUser])

  const updateProgress = useCallback((lessonId: string, data: Partial<ProgressData>) => {
    const updatedData = {
      ...progressData,
      [lessonId]: {
        ...progressData[lessonId],
        ...data
      }
    }
    setProgressDataState(updatedData)
  }, [progressData])

  const saveProgressAndSyncToBackend = useCallback(async (
    lessonId: string,
    progressUpdate: { stars?: number; isPassed?: boolean },
    updatedData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
  ): Promise<void> => {
    if (!currentUserIdRef.current) {
      console.error('Cannot sync progress: no current user')
      return
    }
    
    updateLessonInStages(lessonId, progressUpdate)
    syncProgressToStages(updatedData)
    
    try {
      if (progressUpdate.isPassed !== undefined) {
        await updateLessonProgressFn({
          lessonId,
          lessonType: 'finalTest',
          isPassed: progressUpdate.isPassed
        })
      } else if (progressUpdate.stars !== undefined) {
        await updateLessonProgressFn({
          lessonId,
          lessonType: 'regular',
          stars: progressUpdate.stars
        })
      }
    } catch (error) {
      console.error('Failed to sync progress to backend:', error)
    }
    
    await saveProgressCache(currentUserIdRef.current, updatedData)
  }, [])

  const updateLessonProgress = useCallback(async (lessonId: string, stars: number) => {
    if (!currentUserIdRef.current) {
      console.error('Cannot update lesson progress: no current user')
      return
    }
    
    const validStars = Math.max(0, Math.min(3, stars))
    const previousStars = progressData[lessonId]?.stars ?? -1
    const shouldUpdate = previousStars === -1 || validStars > previousStars
    
    if (!shouldUpdate) {
      return
    }
    
    const updatedData = { ...progressData, [lessonId]: { isLocked: false, stars: validStars } }
    setProgressDataState(updatedData)
    
    await saveProgressAndSyncToBackend(lessonId, { stars: validStars }, updatedData)
  }, [progressData, saveProgressAndSyncToBackend])

  const updateFinalTestProgress = useCallback(async (lessonId: string, isPassed: boolean) => {
    if (!currentUserIdRef.current) {
      console.error('Cannot update final test progress: no current user')
      return
    }
    
    const previousIsPassed = progressData[lessonId]?.isPassed
    const shouldUpdate = previousIsPassed === undefined || previousIsPassed !== isPassed
    
    if (!shouldUpdate) {
      return
    }
    
    const updatedData = { ...progressData, [lessonId]: { isLocked: false, isPassed } }
    setProgressDataState(updatedData)
    
    await saveProgressAndSyncToBackend(lessonId, { isPassed }, updatedData)
  }, [progressData, saveProgressAndSyncToBackend])

  const clearAllUserData = useCallback(async () => {
    try {
      currentUserIdRef.current = ''
      setProgressDataState({})
      resetStageProgressData()
      await clearAllUserCache()
    } catch (error) {
      console.error('Failed to clear user data:', error)
    }
  }, [])

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  return (
    <ProgressContext.Provider
      value={{
        // State
        progressData,
        revisionQuestions,
        loading,
        initialized,
        
        // Progress actions
        refreshProgress,
        refreshRevisionQuestions,
        updateProgress,
        updateLessonProgress,
        updateFinalTestProgress,
        clearAllUserData,
        
        // Lesson utilities
        getLessonById,
        getStageById,
        getStageRequirements,
        getNextLockedStage,
        trackLessonAccessLocal,
        getLastAccessedLessonLocal,
        allStageLessons
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

// ============================================================================
// HOOK
// ============================================================================

export const useProgress = () => {
  return useContext(ProgressContext)!
}
