import { LAST_LESSON_ACCESS_KEY } from '@/constants/cache'
import { getLessonWithProgress, stagesArray } from '@/theory/curriculum/stages/helpers'
import { Lesson, Stage, StageLesson } from '@/theory/curriculum/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface LastLessonAccess {
  lessonId: string
  timestamp: number
}

export const getLessonById = (id: string): Lesson | undefined => {
  return getLessonWithProgress(id)
}

export const allStageLessons: StageLesson[] = [
  ...stagesArray[0].lessons,
  ...stagesArray[1].lessons,
  ...stagesArray[2].lessons
]

export const getStageById = (id: string): Stage | undefined => {
  return stagesArray.find(stage => stage.id === id)
}

export const getStageRequirements = (stageId: string): { 
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

export const getNextLockedStage = (): Stage | undefined => {
  return stagesArray
    .filter(stage => !stage.isUnlocked)
    .sort((a, b) => a.order - b.order)[0]
}

export const trackLessonAccessLocal = async (lessonId: string): Promise<void> => {
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

export const getLastAccessedLessonLocal = async (): Promise<LastLessonAccess | null> => {
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

