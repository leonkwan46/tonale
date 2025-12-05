import { getAllLessonProgressFn, updateLessonProgressFn } from '@/config/firebase/functions/lessonProgress'
import { calculateStageUnlockStatus, stagesArray } from '@/theory/curriculum/stages/helpers'
import { Stage, StageLesson } from '@/theory/curriculum/types'
import { clearUserProgressData, getUserProgressData, loadProgressCache, saveProgressCache, setUserProgressData } from '@/utils/progress'
import { clearUserDataOnSwitch, clearUserDataStorage } from '@/utils/userData'

let currentUserId: string = ''

export const refreshStageUnlockStatus = (): void => {
  stagesArray.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stagesArray)
    
    stage.lessons.forEach(lesson => {
      if (!stage.isUnlocked) {
        lesson.isLocked = true
      } else {
        const userProgressData = getUserProgressData()
        const progressData = userProgressData[lesson.id]
        lesson.isLocked = progressData?.isLocked ?? false
      }
    })
  })
}

export const updateLessonDataInStages = async (lessonId: string, progressData: { stars?: number; isPassed?: boolean }): Promise<void> => {
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

export const resetStageProgressData = async (): Promise<void> => {
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      lesson.stars = undefined
      lesson.isPassed = undefined
    })
    
    stage.totalStars = 0
    stage.isCleared = false
  })
}

export const syncProgressDataToStages = async (): Promise<void> => {
  const userProgressData = getUserProgressData()
  
  stagesArray.forEach((stage: Stage) => {
    stage.lessons.forEach((lesson: StageLesson) => {
      const progressData = userProgressData[lesson.id]
      if (progressData) {
        lesson.isLocked = progressData.isLocked
        lesson.stars = progressData.stars
        lesson.isPassed = progressData.isPassed
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

const applyProgressData = async (): Promise<void> => {
  await syncProgressDataToStages()
  refreshStageUnlockStatus()
}

const buildProgressData = (lessonsData: Record<string, { stars?: number; isPassed?: boolean }>): Record<string, { isLocked: boolean; stars?: number; isPassed?: boolean }> => {
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

const startFresh = async (): Promise<void> => {
  clearUserProgressData()
  await resetStageProgressData()
  await applyProgressData()
}

export const initializeUserProgress = async (userId: string): Promise<void> => {
  try {
    if (currentUserId && currentUserId !== userId) {
      clearUserProgressData()
      currentUserId = ''
      await clearUserDataOnSwitch()
    }
    
    currentUserId = userId
    await resetStageProgressData()
    
    const result = await getAllLessonProgressFn()
    
    if (result.data.success) {
      const lessonsData = result.data.data
      
      if (Object.keys(lessonsData).length === 0) {
        await startFresh()
      } else {
        const progressData = buildProgressData(lessonsData)
        setUserProgressData(progressData)
        await applyProgressData()
        await saveProgressCache(userId, progressData)
      }
    } else {
      const cachedData = await loadProgressCache(userId)
      if (cachedData) {
        setUserProgressData(cachedData.data)
        await applyProgressData()
      } else {
        await startFresh()
      }
    }
  } catch (error) {
    console.error('Failed to initialize user progress:', error)
    await startFresh()
  }
}

export const forceRefreshProgress = async (): Promise<void> => {
  if (!currentUserId) return
  
  try {
    const result = await getAllLessonProgressFn()
    
    if (result.data.success) {
      const lessonsData = result.data.data
      const progressData = buildProgressData(lessonsData)
      setUserProgressData(progressData)
      await applyProgressData()
      await saveProgressCache(currentUserId, progressData)
    }
  } catch (error) {
    console.error('Failed to force refresh progress:', error)
  }
}

const updateProgressAndSync = async (
  lessonId: string,
  progressData: { stars?: number; isPassed?: boolean },
  cloudUpdate: () => Promise<unknown>
): Promise<void> => {
  await updateLessonDataInStages(lessonId, progressData)
  await applyProgressData()
  
  try {
    await cloudUpdate()
  } catch (error) {
    console.error('Failed to sync progress to backend:', error)
  }
  
  if (currentUserId) {
    await saveProgressCache(currentUserId, getUserProgressData())
  }
}

export const updateLessonProgress = async (
  lessonId: string, 
  stars: number, 
  wrongAnswersCount: number = 0
): Promise<void> => {
  const validStars = Math.max(0, Math.min(3, stars))
  const currentData = getUserProgressData()
  const previousStars = currentData[lessonId]?.stars ?? -1
  const shouldUpdate = previousStars === -1 || validStars > previousStars
  
  if (!shouldUpdate) {
    return
  }
  
  const updatedData = { ...currentData, [lessonId]: { isLocked: false, stars: validStars } }
  setUserProgressData(updatedData)
  
  await updateProgressAndSync(
    lessonId,
    { stars: validStars },
    () => updateLessonProgressFn({
      lessonId,
      lessonType: 'regular',
      stars: validStars,
      wrongAnswersCount
    })
  )
  
  if (currentUserId) {
    await saveProgressCache(currentUserId, updatedData)
  }
}

export const updateFinalTestProgress = async (
  lessonId: string, 
  isPassed: boolean,
  wrongAnswersCount: number = 0
): Promise<void> => {
  const currentData = getUserProgressData()
  const previousIsPassed = currentData[lessonId]?.isPassed
  const shouldUpdate = previousIsPassed === undefined || previousIsPassed !== isPassed
  
  if (!shouldUpdate) {
    return
  }
  
  const updatedData = { ...currentData, [lessonId]: { isLocked: false, isPassed } }
  setUserProgressData(updatedData)
  
  await updateProgressAndSync(
    lessonId,
    { isPassed },
    () => updateLessonProgressFn({
      lessonId,
      lessonType: 'finalTest',
      isPassed,
      wrongAnswersCount
    })
  )
  
  if (currentUserId) {
    await saveProgressCache(currentUserId, updatedData)
  }
}

const clearUserProgress = async (): Promise<void> => {
  clearUserProgressData()
  currentUserId = ''
}

export const clearAllUserData = async (): Promise<void> => {
  try {
    await clearUserProgress()
    await resetStageProgressData()
    await clearUserDataStorage()
  } catch (error) {
    console.error('Failed to clear user data:', error)
  }
}

