import { Stage } from '../types'
import { stage1 } from './stageOne'
import { stage3 } from './stageThree'
import { stage2 } from './stageTwo'

// ============================================================================
// STAGE DATA INITIALIZATION
// ============================================================================

// Helper function to check if a stage should be unlocked
export const calculateStageUnlockStatus = (stageId: string, allStagesData: Stage[]): boolean => {
  const stage = allStagesData.find(s => s.id === stageId)
  if (!stage) return false
  
  // First stage is always unlocked
  if (stage.order === 1) return true
  
  // Check if all prerequisite stages are cleared
  if (stage.prerequisiteStages) {
    return stage.prerequisiteStages.every(prereqId => {
      const prereqStage = allStagesData.find(s => s.id === prereqId)
      return prereqStage?.isCleared || false
    })
  }
  
  // If no specific prerequisites, check if previous stage is cleared
  const previousStage = allStagesData.find(s => s.order === stage.order - 1)
  return previousStage?.isCleared || false
}

// Create stages array with proper unlock status
const createStageData = (): Stage[] => {
  const stageData: Stage[] = [stage1, stage2, stage3]
  
  // Calculate unlock status for each stage
  stageData.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stageData)
  })
  
  return stageData
}

// Export stages as array and record for different use cases
export const stagesArray = createStageData()
export const stages: Record<string, Stage> = stagesArray.reduce((acc, stage) => {
  acc[stage.id.replace('stage-', 'stage')] = stage // Convert 'stage-1' to 'stageOne' for backward compatibility
  acc[stage.id] = stage // Also keep original format
  return acc
}, {} as Record<string, Stage>)

// ============================================================================
// STAGE MANAGEMENT FUNCTIONS
// ============================================================================

export const getCurrentUserStage = (): Stage | undefined => {
  // Find the highest unlocked stage that has some progress
  return stagesArray
    .filter(stage => stage.isUnlocked)
    .sort((a, b) => b.order - a.order)[0]
}

export const getNextLockedStage = (): Stage | undefined => {
  // Find the first locked stage
  return stagesArray
    .filter(stage => !stage.isUnlocked)
    .sort((a, b) => a.order - b.order)[0]
}

export const isStageUnlocked = (stageId: string): boolean => {
  const stage = stagesArray.find(s => s.id === stageId)
  return stage?.isUnlocked || false
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

export const refreshStageUnlockStatus = (): void => {
  // Recalculate all stage unlock statuses
  stagesArray.forEach(stage => {
    stage.isUnlocked = calculateStageUnlockStatus(stage.id, stagesArray)
    // Update lessons lock status based on stage unlock status
    if (!stage.isUnlocked) {
      stage.lessons.forEach(lesson => {
        lesson.isLocked = true
      })
    }
  })
}

// ============================================================================
// STAGE DATA ACCESS FUNCTIONS
// ============================================================================

export const getStageById = (id: string): Stage | undefined => {
  return stagesArray.find(stage => stage.id === id)
}

export const getStageProgress = (stageId: string): { completed: number; total: number; percentage: number } => {
  const stage = getStageById(stageId)
  if (!stage) return { completed: 0, total: 0, percentage: 0 }
  
  const completed = stage.lessons.filter(lesson => (lesson.stars || 0) > 0).length
  const total = stage.lessons.length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return { completed, total, percentage }
}
