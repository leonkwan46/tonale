import { getAllLessonProgressFn, updateLessonProgressFn } from '@/config/firebase/functions/lessonProgress'
import { getRevisionQuestionsFn } from '@/config/firebase/functions/revisionQuestions'
import { useUser } from '@/hooks/useUserContext'
import type { LastLessonAccess } from '@/storage'
import { userCache } from '@/storage'
import { calculateStageUnlockStatus } from '@/subjects/curriculumHelper'
import { stagesArray } from '@/subjects/theory/curriculum/stages/helpers'
import type { Stage, StageLesson } from '@types'
import { RevisionQuestion } from '@types'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type { LastLessonAccess }

export interface ProgressData {
  isLocked: boolean
  stars?: number
  isPassed?: boolean
}

export interface ProgressContextType {
  // State
  progressData: Record<string, ProgressData>
  stages: Stage[]
  revisionQuestions: RevisionQuestion[]
  revisionQuestionsLoading: boolean
  progressDataLoading: boolean
  progressDataInitialized: boolean

  // Progress actions
  refreshProgress: () => Promise<void>
  refreshRevisionQuestions: () => Promise<void>
  updateLessonProgress: (lessonId: string, stars: number) => Promise<void>
  updateFinalTestProgress: (lessonId: string, isPassed: boolean) => Promise<void>

  // Lesson utilities (pure functions, exposed for convenience)
  getStageById: (id: string) => Stage | undefined
  getStageRequirements: (stageId: string) => { isUnlocked: boolean; missingPrerequisites: Stage[]; progressNeeded: string[] }
  getNextLockedStage: () => Stage | undefined
  trackLessonAccess: (lessonId: string) => Promise<void>
  getLastLessonAccess: () => Promise<LastLessonAccess | null>
  allStageLessons: StageLesson[]
}

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

// ============================================================================
// STAGE SELECTOR (pure — no mutation of stagesArray)
// ============================================================================

const getStagesWithProgress = (
  progressData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
): Stage[] => {
  // First pass: apply lesson progress data and compute per-stage stats
  const stagesWithLessons = stagesArray.map(stage => {
    const lessons = stage.lessons.map(lesson => {
      const lessonProgress = progressData[lesson.id]
      return {
        ...lesson,
        isLocked: lessonProgress ? lessonProgress.isLocked : (lesson.isLocked ?? false),
        stars: lessonProgress?.stars,
        isPassed: lessonProgress?.isPassed
      }
    })

    const regularLessons = lessons.filter(l => !l.isFinalTest)
    const finalTest = lessons.find(l => l.isFinalTest)
    const totalStars = regularLessons.reduce((sum, l) => sum + (l.stars || 0), 0)
    const isCleared = finalTest ? (finalTest.isPassed === true) : false

    return { ...stage, lessons, totalStars, isCleared }
  })

  // Second pass: compute unlock status (requires isPassed from first pass),
  // then lock lessons that belong to locked stages
  return stagesWithLessons.map(stage => {
    const isUnlocked = calculateStageUnlockStatus(stage.id, stagesWithLessons)
    const lessons = isUnlocked
      ? stage.lessons
      : stage.lessons.map(l => ({ ...l, isLocked: true }))
    return { ...stage, isUnlocked, lessons }
  })
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
// PROGRESS PROVIDER COMPONENT
// ============================================================================

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser, userData, loading: userLoading } = useUser()
  const [progressData, setProgressDataState] = useState<Record<string, ProgressData>>({})
  const [revisionQuestions, setRevisionQuestions] = useState<RevisionQuestion[]>([])
  const [revisionQuestionsLoading, setRevisionQuestionsLoading] = useState<boolean>(true)
  const [progressDataLoading, setProgressDataLoading] = useState(true)
  const [progressDataInitialized, setProgressDataInitialized] = useState(false)
  const currentUserIdRef = useRef<string>('')

  // ============================================================================
  // PROGRESS INITIALIZATION
  // ============================================================================

  const setProgressData = useCallback((data: Record<string, ProgressData>) => {
    setProgressDataState(data)
    setProgressDataInitialized(true)
  }, [])

  const initializeEmptyProgress = useCallback(() => {
    setProgressData({})
  }, [setProgressData])

  const initializeUserProgress = useCallback(async (userId: string) => {
    try {
      if (currentUserIdRef.current && currentUserIdRef.current !== userId) {
        currentUserIdRef.current = ''
        await userCache.clearUserCache()
      }
      
      currentUserIdRef.current = userId

      const result = await getAllLessonProgressFn()
      
      if (result.data.success) {
        const lessonsData = result.data.data
        
        if (Object.keys(lessonsData).length === 0) {
          initializeEmptyProgress()
        } else {
          const progressData = convertLessonsDataToProgressFormat(lessonsData)
          setProgressData(progressData)
          await userCache.saveProgressCache(userId, progressData)
        }
      } else {
        // Try to load from cache as fallback
        const cachedData = await userCache.loadProgressCache(userId)
        if (cachedData) {
          // Cache is valid and fresh, use it
          setProgressData(cachedData.data)
          // Note: We still try to refresh from server in background
          // but don't wait for it
          getAllLessonProgressFn().then(result => {
            if (result.data.success && currentUserIdRef.current === userId) {
              const lessonsData = result.data.data
              if (Object.keys(lessonsData).length > 0) {
                const progressData = convertLessonsDataToProgressFormat(lessonsData)
                setProgressData(progressData)
                userCache.saveProgressCache(userId, progressData)
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
      setRevisionQuestionsLoading(false)
      setProgressDataInitialized(false)
      setProgressDataLoading(false)
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
      setProgressDataLoading(true)
      try {
        await initializeUserProgress(authUser.uid)
        setProgressDataInitialized(true)
      } catch (error) {
        console.error('Failed to initialize progress:', error)
        setProgressDataInitialized(false)
      } finally {
        setProgressDataLoading(false)
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
        setRevisionQuestions(result.data.data || [])
      } else {
        setRevisionQuestions([])
      }
    } catch (error) {
      console.error('Failed to load revision questions:', error)
      setRevisionQuestions([])
    } finally {
      setRevisionQuestionsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authUser && progressDataInitialized) {
      setRevisionQuestionsLoading(true)
      loadRevisionQuestions()
    }
  }, [authUser, progressDataInitialized, loadRevisionQuestions])

  // ============================================================================
  // PROGRESS ACTIONS
  // ============================================================================

  const refreshProgress = useCallback(async () => {
    if (!authUser) return
    
    setProgressDataLoading(true)
    try {
      await initializeUserProgress(authUser.uid)
      setProgressDataInitialized(true)
    } catch (error) {
      console.error('Failed to refresh progress:', error)
    } finally {
      setProgressDataLoading(false)
    }
  }, [authUser, initializeUserProgress])

  const refreshRevisionQuestions = useCallback(async () => {
    if (!authUser) return
    setRevisionQuestionsLoading(true)
    await loadRevisionQuestions()
  }, [loadRevisionQuestions, authUser])

  const saveProgressAndSyncToBackend = useCallback(async (
    lessonId: string,
    progressUpdate: { stars?: number; isPassed?: boolean },
    updatedData: Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }>
  ): Promise<void> => {
    if (!currentUserIdRef.current) {
      console.error('Cannot sync progress: no current user')
      return
    }
    
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
    
    await userCache.saveProgressCache(currentUserIdRef.current, updatedData)
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

  // ============================================================================
  // DERIVED STAGE STATE
  // ============================================================================

  const stages = useMemo(
    () => getStagesWithProgress(progressData),
    [progressData]
  )

  const allStageLessons = useMemo(
    () => stages.flatMap(s => s.lessons),
    [stages]
  )

  const getStageById = useCallback(
    (id: string): Stage | undefined => stages.find(s => s.id === id),
    [stages]
  )

  const getStageRequirements = useCallback(
    (stageId: string): { isUnlocked: boolean; missingPrerequisites: Stage[]; progressNeeded: string[] } => {
      const stage = stages.find(s => s.id === stageId)
      if (!stage) {
        return { isUnlocked: false, missingPrerequisites: [], progressNeeded: [] }
      }

      const missingPrerequisites: Stage[] = []
      const progressNeeded: string[] = []

      if (stage.prerequisiteStages) {
        stage.prerequisiteStages.forEach(prereqId => {
          const prereqStage = stages.find(s => s.id === prereqId)
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

      return { isUnlocked: stage.isUnlocked, missingPrerequisites, progressNeeded }
    },
    [stages]
  )

  const getNextLockedStage = useCallback(
    (): Stage | undefined =>
      stages.filter(s => !s.isUnlocked).sort((a, b) => a.order - b.order)[0],
    [stages]
  )

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue = useMemo(() => ({
    progressData,
    stages,
    revisionQuestions,
    revisionQuestionsLoading,
    progressDataLoading,
    progressDataInitialized,
    refreshProgress,
    refreshRevisionQuestions,
    updateLessonProgress,
    updateFinalTestProgress,
    getStageById,
    getStageRequirements,
    getNextLockedStage,
    trackLessonAccess: userCache.trackLessonAccess,
    getLastLessonAccess: userCache.getLastLessonAccess,
    allStageLessons
  }), [
    progressData,
    stages,
    revisionQuestions,
    revisionQuestionsLoading,
    progressDataLoading,
    progressDataInitialized,
    refreshProgress,
    refreshRevisionQuestions,
    updateLessonProgress,
    updateFinalTestProgress,
    getStageById,
    getStageRequirements,
    getNextLockedStage,
    allStageLessons
  ])

  return (
    <ProgressContext.Provider value={contextValue}>
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
