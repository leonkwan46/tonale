import { getAllLessonProgressFn, updateLessonProgressFn } from '@/config/firebase/functions/lessonProgress'
import { getRevisionQuestionsFn } from '@/config/firebase/functions/revisionQuestions'
import { LAST_LESSON_ACCESS_KEY } from '@/constants/cache'
import { useUser } from '@/hooks/useUserContext'
import { stagesArray as auralStagesArray, calculateStageUnlockStatus as calculateAuralStageUnlockStatus, getLessonWithProgress as getAuralLessonWithProgress } from '@/subjects/aural/curriculum/stages/helpers'
import { Lesson as AuralLesson, Stage as AuralStage, StageLesson as AuralStageLesson } from '@/subjects/aural/curriculum/types'
import { calculateStageUnlockStatus as calculateTheoryStageUnlockStatus, getLessonWithProgress as getTheoryLessonWithProgress, stagesArray as theoryStagesArray } from '@/subjects/theory/curriculum/stages/helpers'
import { Lesson as TheoryLesson, Stage as TheoryStage, StageLesson as TheoryStageLesson } from '@/subjects/theory/curriculum/types'
import { clearProgressCache, loadProgressCache, saveProgressCache } from '@/utils/progressCache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RevisionQuestion } from '@types'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// Combined types - both theory and aural use the same structure
type Lesson = TheoryLesson | AuralLesson
type Stage = TheoryStage | AuralStage
type StageLesson = TheoryStageLesson | AuralStageLesson

// Combined stages array
const allStagesArray: Stage[] = [...theoryStagesArray, ...auralStagesArray]

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

const clearUserDataOnSwitch = async (): Promise<void> => {
  await clearProgressCache()
  await AsyncStorage.removeItem(LAST_LESSON_ACCESS_KEY)
}

const clearUserDataStorage = async (): Promise<void> => {
  try {
    await clearProgressCache()
    await AsyncStorage.removeItem(LAST_LESSON_ACCESS_KEY)
  } catch (error) {
    console.error('Failed to clear user data storage:', error)
  }
}

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
  // Refresh theory stages
  theoryStagesArray.forEach(stage => {
    stage.isUnlocked = calculateTheoryStageUnlockStatus(stage.id, theoryStagesArray)
    
    stage.lessons.forEach(lesson => {
      if (!stage.isUnlocked) {
        lesson.isLocked = true
      } else {
        const lessonProgress = progressData[lesson.id]
        lesson.isLocked = lessonProgress?.isLocked ?? lesson.isLocked ?? false
      }
    })
  })
  
  // Refresh aural stages
  auralStagesArray.forEach(stage => {
    stage.isUnlocked = calculateAuralStageUnlockStatus(stage.id, auralStagesArray)
    
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
  // Update in theory stages
  theoryStagesArray.forEach((stage: TheoryStage) => {
    stage.lessons.forEach((lesson: TheoryStageLesson) => {
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
  
  // Update in aural stages
  auralStagesArray.forEach((stage: AuralStage) => {
    stage.lessons.forEach((lesson: AuralStageLesson) => {
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
  // Reset theory stages
  theoryStagesArray.forEach((stage: TheoryStage) => {
    stage.lessons.forEach((lesson: TheoryStageLesson) => {
      lesson.stars = undefined
      lesson.isPassed = undefined
    })
    
    stage.totalStars = 0
    stage.isCleared = false
  })
  
  // Reset aural stages
  auralStagesArray.forEach((stage: AuralStage) => {
    stage.lessons.forEach((lesson: AuralStageLesson) => {
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
  // Update theory stages
  theoryStagesArray.forEach((stage: TheoryStage) => {
    stage.lessons.forEach((lesson: TheoryStageLesson) => {
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
  
  // Update aural stages
  auralStagesArray.forEach((stage: AuralStage) => {
    stage.lessons.forEach((lesson: AuralStageLesson) => {
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
  // Check theory first
  const theoryLesson = getTheoryLessonWithProgress(id, progressData)
  if (theoryLesson) return theoryLesson
  
  // Check aural
  const auralLesson = getAuralLessonWithProgress(id, progressData)
  if (auralLesson) return auralLesson
  
  return undefined
}

const allStageLessons: StageLesson[] = [
  ...theoryStagesArray[0].lessons,
  ...theoryStagesArray[1].lessons,
  ...theoryStagesArray[2].lessons,
  ...auralStagesArray[0].lessons // aural only has stage 0
]

const getStageById = (id: string): Stage | undefined => {
  // Check theory stages first
  const theoryStage = theoryStagesArray.find(stage => stage.id === id)
  if (theoryStage) return theoryStage
  
  // Check aural stages
  const auralStage = auralStagesArray.find(stage => stage.id === id)
  if (auralStage) return auralStage
  
  return undefined
}

const getStageRequirements = (stageId: string): { 
  isUnlocked: boolean
  missingPrerequisites: Stage[]
  progressNeeded: string[]
} => {
  // Determine which stage array to use based on ID prefix
  const isAural = stageId.startsWith('aural-')
  const stagesArray = isAural ? auralStagesArray : theoryStagesArray
  const calculateUnlockStatus = isAural ? calculateAuralStageUnlockStatus : calculateTheoryStageUnlockStatus
  
  const stage = stagesArray.find(s => s.id === stageId)
  if (!stage) {
    return { isUnlocked: false, missingPrerequisites: [], progressNeeded: [] }
  }
  
  const missingPrerequisites: Stage[] = []
  const progressNeeded: string[] = []
  
  if (stage.prerequisiteStages) {
    stage.prerequisiteStages.forEach(prereqId => {
      // Check both arrays for prerequisites (could be cross-subject)
      const prereqStage = allStagesArray.find(s => s.id === prereqId)
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
  return allStagesArray
    .filter(stage => !stage.isUnlocked)
    .sort((a, b) => a.order - b.order)[0]
}

// ============================================================================
// PROGRESS PROVIDER COMPONENT
// ============================================================================

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
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
        await clearUserDataOnSwitch()
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

  // Initialize progress when user is available
  useEffect(() => {
    if (!user) {
      setProgressDataState({})
      setRevisionQuestions([])
      setInitialized(false)
      setLoading(false)
      currentUserIdRef.current = ''
      return
    }

    const initialize = async () => {
      setLoading(true)
      try {
        await initializeUserProgress(user.uid)
        setInitialized(true)
      } catch (error) {
        console.error('Failed to initialize progress:', error)
        setInitialized(false)
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [user, initializeUserProgress])

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
    if (user && initialized) {
      loadRevisionQuestions()
    }
  }, [user, initialized, loadRevisionQuestions])

  // ============================================================================
  // PROGRESS ACTIONS
  // ============================================================================

  const refreshProgress = useCallback(async () => {
    if (!user) return
    
    setLoading(true)
    try {
      await initializeUserProgress(user.uid)
      setInitialized(true)
    } catch (error) {
      console.error('Failed to refresh progress:', error)
    } finally {
      setLoading(false)
    }
  }, [user, initializeUserProgress])

  const refreshRevisionQuestions = useCallback(async () => {
    if (!user) return
    await loadRevisionQuestions()
  }, [loadRevisionQuestions, user])

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
      await clearUserDataStorage()
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

export function useProgress() {
  return useContext(ProgressContext)!
}
