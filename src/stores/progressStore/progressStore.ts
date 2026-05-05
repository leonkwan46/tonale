import { userCache } from '@/cache'
import {
    getAllLessonProgressFn,
    updateLessonProgressFn
} from '@/config/firebase/functions/lessonProgress'
import { getRevisionQuestionsFn } from '@/config/firebase/functions/revisionQuestions'
import { create } from 'zustand'

import {
    computeStageRequirements,
    computeStages,
    convertLessonsData
} from './progressStoreHelper'
import type { ProgressState, ProgressStore } from './progressTypes'

const INITIAL_STATE: ProgressState = {
  progressData: {},
  stages: [],
  allStageLessons: [],
  revisionQuestions: [],
  revisionQuestionsLoading: false,
  progressDataLoading: false,
  progressDataInitialized: false,
  currentUserId: ''
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  ...INITIAL_STATE,

  initializeUserProgress: async (userId) => {
    const { currentUserId } = get()

    if (currentUserId && currentUserId !== userId) {
      set({ currentUserId: '' })
      await userCache.clearUserCache()
    }

    set({ currentUserId: userId, progressDataLoading: true })

    try {
      const result = await getAllLessonProgressFn()

      if (result.data.success) {
        const lessonsData = result.data.data
        const progressData =
          Object.keys(lessonsData).length === 0
            ? {}
            : convertLessonsData(lessonsData)
        const stages = computeStages(progressData)
        set({
          progressData,
          stages,
          allStageLessons: stages.flatMap((s) => s.lessons),
          progressDataInitialized: true
        })
        if (Object.keys(lessonsData).length > 0) {
          await userCache.saveProgressCache(userId, progressData)
        }
      } else {
        const cached = await userCache.loadProgressCache(userId)
        if (cached) {
          const stages = computeStages(cached.data)
          set({
            progressData: cached.data,
            stages,
            allStageLessons: stages.flatMap((s) => s.lessons),
            progressDataInitialized: true
          })
          getAllLessonProgressFn()
            .then((result) => {
              if (result.data.success && get().currentUserId === userId) {
                const lessonsData = result.data.data
                if (Object.keys(lessonsData).length > 0) {
                  const progressData = convertLessonsData(lessonsData)
                  const stages = computeStages(progressData)
                  set({
                    progressData,
                    stages,
                    allStageLessons: stages.flatMap((s) => s.lessons)
                  })
                  userCache.saveProgressCache(userId, progressData)
                }
              }
            })
            .catch((err) =>
              console.error('Background progress refresh failed:', err)
            )
        } else {
          const stages = computeStages({})
          set({
            progressData: {},
            stages,
            allStageLessons: stages.flatMap((s) => s.lessons),
            progressDataInitialized: true
          })
        }
      }
    } catch (error) {
      console.error('Failed to initialize user progress:', error)
      const stages = computeStages({})
      set({
        progressData: {},
        stages,
        allStageLessons: stages.flatMap((s) => s.lessons),
        progressDataInitialized: true
      })
    } finally {
      set({ progressDataLoading: false })
    }
  },

  resetProgress: () => set(INITIAL_STATE),

  refreshProgress: async () => {
    const { currentUserId } = get()
    if (!currentUserId) return
    set({ progressDataLoading: true })
    try {
      await get().initializeUserProgress(currentUserId)
    } finally {
      set({ progressDataLoading: false })
    }
  },

  refreshRevisionQuestions: async () => {
    const { currentUserId } = get()
    if (!currentUserId) return
    set({ revisionQuestionsLoading: true })
    try {
      const result = await getRevisionQuestionsFn({})
      set({
        revisionQuestions: result.data.success ? result.data.data || [] : []
      })
    } catch (error) {
      console.error('Failed to load revision questions:', error)
      set({ revisionQuestions: [] })
    } finally {
      set({ revisionQuestionsLoading: false })
    }
  },

  updateLessonProgress: async (lessonId, stars) => {
    const { progressData, currentUserId } = get()
    if (!currentUserId) return

    const validStars = Math.max(0, Math.min(3, stars))
    const previousStars = progressData[lessonId]?.stars ?? -1
    if (previousStars !== -1 && validStars <= previousStars) return

    const updatedData = {
      ...progressData,
      [lessonId]: { isLocked: false, stars: validStars }
    }
    const stages = computeStages(updatedData)
    set({
      progressData: updatedData,
      stages,
      allStageLessons: stages.flatMap((s) => s.lessons)
    })

    try {
      await updateLessonProgressFn({
        lessonId,
        lessonType: 'regular',
        stars: validStars
      })
    } catch (error) {
      console.error('Failed to sync progress to backend:', error)
    }
    await userCache.saveProgressCache(currentUserId, updatedData)
  },

  updateFinalTestProgress: async (lessonId, isPassed) => {
    const { progressData, currentUserId } = get()
    if (!currentUserId) return

    const previousIsPassed = progressData[lessonId]?.isPassed
    if (previousIsPassed !== undefined && previousIsPassed === isPassed) return

    const updatedData = {
      ...progressData,
      [lessonId]: { isLocked: false, isPassed }
    }
    const stages = computeStages(updatedData)
    set({
      progressData: updatedData,
      stages,
      allStageLessons: stages.flatMap((s) => s.lessons)
    })

    try {
      await updateLessonProgressFn({
        lessonId,
        lessonType: 'finalTest',
        isPassed
      })
    } catch (error) {
      console.error('Failed to sync progress to backend:', error)
    }
    await userCache.saveProgressCache(currentUserId, updatedData)
  },

  getStageById: (id) => get().stages.find((s) => s.id === id),

  getStageRequirements: (stageId) =>
    computeStageRequirements(get().stages, stageId),

  getNextLockedStage: () =>
    get()
      .stages.filter((s) => !s.isUnlocked)
      .sort((a, b) => a.order - b.order)[0]
}))
