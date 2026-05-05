import type { RevisionQuestion, Stage, StageLesson } from '@types'

export interface ProgressData {
  isLocked: boolean
  stars?: number
  isPassed?: boolean
}

export interface StageRequirements {
  isUnlocked: boolean
  missingPrerequisites: Stage[]
  progressNeeded: string[]
}

export interface ProgressState {
  progressData: Record<string, ProgressData>
  stages: Stage[]
  allStageLessons: StageLesson[]
  revisionQuestions: RevisionQuestion[]
  revisionQuestionsLoading: boolean
  progressDataLoading: boolean
  progressDataInitialized: boolean
  currentUserId: string
}

export interface ProgressActions {
  initializeUserProgress: (userId: string) => Promise<void>
  resetProgress: () => void
  refreshProgress: () => Promise<void>
  refreshRevisionQuestions: () => Promise<void>
  updateLessonProgress: (lessonId: string, stars: number) => Promise<void>
  updateFinalTestProgress: (lessonId: string, isPassed: boolean) => Promise<void>
  getStageById: (id: string) => Stage | undefined
  getStageRequirements: (stageId: string) => StageRequirements
  getNextLockedStage: () => Stage | undefined
}

export type ProgressStore = ProgressState & ProgressActions
