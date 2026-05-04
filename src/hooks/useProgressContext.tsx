import React, { useCallback } from 'react'
import { useProgressBootstrap } from '@/hooks/useProgressBootstrap'
import { useProgressStore, type ProgressData } from '@/stores/progressStore'
import { userCache } from '@/storage'
import type { LastLessonAccess } from '@/storage'
import type { Stage } from '@types'
import { useUser } from '@/hooks/useUserContext'

// Re-export types that consumers depend on
export type { ProgressData, LastLessonAccess }

// ============================================================================
// PROVIDER — mounts the bootstrap hook, no longer a context
// ============================================================================

export const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  useProgressBootstrap()
  return <>{children}</>
}

// ============================================================================
// HOOK — same API as before, backed by the store
// ============================================================================

export const useProgress = () => {
  const { authUser } = useUser()
  const store = useProgressStore()

  const { refreshProgress: storeRefreshProgress, refreshRevisionQuestions: storeRefreshRevisionQuestions, stages } = store

  const refreshProgress = useCallback(async () => {
    if (!authUser) return
    await storeRefreshProgress(authUser.uid)
  }, [authUser, storeRefreshProgress])

  const refreshRevisionQuestions = useCallback(async () => {
    if (!authUser) return
    await storeRefreshRevisionQuestions(authUser.uid)
  }, [authUser, storeRefreshRevisionQuestions])

  const getStageById = useCallback(
    (id: string): Stage | undefined => stages.find(s => s.id === id),
    [stages]
  )

  const getStageRequirements = useCallback(
    (stageId: string): { isUnlocked: boolean; missingPrerequisites: Stage[]; progressNeeded: string[] } => {
      const stage = stages.find(s => s.id === stageId)
      if (!stage) return { isUnlocked: false, missingPrerequisites: [], progressNeeded: [] }

      const missingPrerequisites: Stage[] = []
      const progressNeeded: string[] = []

      stage.prerequisiteStages?.forEach(prereqId => {
        const prereqStage = stages.find(s => s.id === prereqId)
        if (prereqStage && !prereqStage.isCleared) {
          missingPrerequisites.push(prereqStage)
          const lessonsWithoutStars = prereqStage.lessons.filter(l => l.stars === 0)
          if (lessonsWithoutStars.length > 0) {
            progressNeeded.push(`Complete ${lessonsWithoutStars.length} lesson(s) in ${prereqStage.title}`)
          }
        }
      })

      return { isUnlocked: stage.isUnlocked, missingPrerequisites, progressNeeded }
    },
    [stages]
  )

  const getNextLockedStage = useCallback(
    (): Stage | undefined =>
      stages.filter(s => !s.isUnlocked).sort((a, b) => a.order - b.order)[0],
    [stages]
  )

  return {
    progressData: store.progressData,
    stages: store.stages,
    allStageLessons: store.allStageLessons,
    revisionQuestions: store.revisionQuestions,
    revisionQuestionsLoading: store.revisionQuestionsLoading,
    progressDataLoading: store.progressDataLoading,
    progressDataInitialized: store.progressDataInitialized,
    refreshProgress,
    refreshRevisionQuestions,
    updateLessonProgress: store.updateLessonProgress,
    updateFinalTestProgress: store.updateFinalTestProgress,
    getStageById,
    getStageRequirements,
    getNextLockedStage,
    trackLessonAccess: userCache.trackLessonAccess,
    getLastLessonAccess: userCache.getLastLessonAccess
  }
}
