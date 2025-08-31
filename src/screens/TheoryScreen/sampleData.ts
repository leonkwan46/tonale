// Types for lesson and stage data
export interface Lesson {
  id: string
  title: string
  description: string
  isLocked: boolean
  stars: number
  isFinalTest?: boolean
  topics?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: number // in minutes
  stageId: string // Which stage this lesson belongs to
}

export interface Stage {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  isCleared: boolean
  isUnlocked: boolean
  requiredStars: number
  totalStars: number
  order: number // Stage sequence order
  prerequisiteStages?: string[] // Required stages to unlock this one
  coverImageUrl?: string
  themeColor?: string
}

// Sample lesson data with improved structure
export const stageOneLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introduction to Music Theory',
    description: 'Learn the fundamentals of music notation and basic concepts',
    isLocked: false,
    stars: 3,
    topics: ['Music notation', 'Staff', 'Clefs'],
    difficulty: 'beginner',
    estimatedTime: 15,
    stageId: 'stage-1'
  },
  {
    id: 'lesson-2',
    title: 'Notes and Pitches',
    description: 'Understanding musical notes and their relationships',
    isLocked: false,
    stars: 3,
    topics: ['Note names', 'Pitch', 'Octaves'],
    difficulty: 'beginner',
    estimatedTime: 20,
    stageId: 'stage-1'
  },
  {
    id: 'lesson-3',
    title: 'Time Signatures',
    description: 'Master the concept of time signatures and rhythm',
    isLocked: false,
    stars: 3,
    topics: ['Time signatures', 'Beat', 'Measure'],
    difficulty: 'beginner',
    estimatedTime: 18,
    stageId: 'stage-1'
  },
  {
    id: 'lesson-4',
    title: 'Basic Note Values',
    description: 'Learn about different note durations and their relationships',
    isLocked: false,
    stars: 3,
    topics: ['Whole notes', 'Half notes', 'Quarter notes', 'Eighth notes'],
    difficulty: 'beginner',
    estimatedTime: 22,
    stageId: 'stage-1'
  },
  {
    id: 'lesson-5',
    title: 'Accidentals and Key Signatures',
    description: 'Understanding sharps, flats, and key signatures',
    isLocked: false,
    stars: 1,
    topics: ['Sharps', 'Flats', 'Natural signs', 'Key signatures'],
    difficulty: 'intermediate',
    estimatedTime: 25,
    stageId: 'stage-1'
  },
  {
    id: 'lesson-6',
    title: 'Basic Scales',
    description: 'Introduction to major and minor scales',
    isLocked: false,
    stars: 3,
    topics: ['Major scale', 'Minor scale', 'Scale degrees'],
    difficulty: 'intermediate',
    estimatedTime: 30,
    stageId: 'stage-1'
  },
  {
    id: 'stage-1-final',
    title: 'Stage 1 Final Test',
    description: 'Test your knowledge of basic music theory concepts',
    isLocked: false,
    isFinalTest: true,
    stars: 3,
    topics: ['All Stage 1 concepts'],
    difficulty: 'intermediate',
    estimatedTime: 45,
    stageId: 'stage-1'
  }
]

export const stageTwoLessons: Lesson[] = [
  {
    id: 'lesson-7',
    title: 'Intervals',
    description: 'Understanding the distance between musical notes',
    isLocked: false,
    stars: 3,
    topics: ['Major intervals', 'Minor intervals', 'Perfect intervals'],
    difficulty: 'intermediate',
    estimatedTime: 25,
    stageId: 'stage-2'
  },
  {
    id: 'lesson-8',
    title: 'Triads and Basic Chords',
    description: 'Building and identifying basic three-note chords',
    isLocked: false,
    stars: 2,
    topics: ['Major triads', 'Minor triads', 'Chord construction'],
    difficulty: 'intermediate',
    estimatedTime: 30,
    stageId: 'stage-2'
  },
  {
    id: 'lesson-9',
    title: 'Circle of Fifths',
    description: 'Master the relationship between different keys',
    isLocked: false,
    stars: 3,
    topics: ['Circle of fifths', 'Key relationships', 'Enharmonic equivalents'],
    difficulty: 'intermediate',
    estimatedTime: 28,
    stageId: 'stage-2'
  },
  {
    id: 'lesson-10',
    title: 'Seventh Chords',
    description: 'Exploring four-note chords and their functions',
    isLocked: false,
    stars: 2,
    topics: ['Dominant 7th', 'Major 7th', 'Minor 7th', 'Diminished 7th'],
    difficulty: 'advanced',
    estimatedTime: 35,
    stageId: 'stage-2'
  },
  {
    id: 'lesson-11',
    title: 'Roman Numeral Analysis',
    description: 'Analyzing chord progressions using Roman numerals',
    isLocked: false,
    stars: 0,
    topics: ['Roman numerals', 'Chord functions', 'Harmonic analysis'],
    difficulty: 'advanced',
    estimatedTime: 40,
    stageId: 'stage-2'
  },
  {
    id: 'stage-2-final',
    title: 'Stage 2 Final Test',
    description: 'Test your knowledge of harmony and chord theory',
    isLocked: false,
    isFinalTest: true,
    stars: 3,
    topics: ['All Stage 2 concepts'],
    difficulty: 'advanced',
    estimatedTime: 50,
    stageId: 'stage-2'
  }
]

export const stageThreeLessons: Lesson[] = [
  {
    id: 'lesson-12',
    title: 'Advanced Harmony',
    description: 'Explore complex harmonic concepts and progressions',
    isLocked: false,
    stars: 1,
    topics: ['Secondary dominants', 'Modulation', 'Non-chord tones'],
    difficulty: 'advanced',
    estimatedTime: 45,
    stageId: 'stage-3'
  },
  {
    id: 'lesson-13',
    title: 'Modal Harmony',
    description: 'Understanding modes and their harmonic applications',
    isLocked: false,
    stars: 0,
    topics: ['Church modes', 'Modal interchange', 'Modal chord progressions'],
    difficulty: 'advanced',
    estimatedTime: 40,
    stageId: 'stage-3'
  },
  {
    id: 'lesson-14',
    title: 'Jazz Harmony Basics',
    description: 'Introduction to jazz chord progressions and extensions',
    isLocked: false,
    stars: 0,
    topics: ['Extended chords', 'Chord substitutions', 'ii-V-I progressions'],
    difficulty: 'advanced',
    estimatedTime: 50,
    stageId: 'stage-3'
  },
  {
    id: 'stage-3-final',
    title: 'Stage 3 Final Test',
    description: 'Test your advanced harmonic knowledge',
    isLocked: false,
    isFinalTest: true,
    stars: 0,
    topics: ['All Stage 3 concepts'],
    difficulty: 'advanced',
    estimatedTime: 60,
    stageId: 'stage-3'
  }
]

// Legacy exports for backward compatibility
export const lockedNextLessons: Lesson[] = stageThreeLessons

// Helper function to calculate stage statistics
const calculateStageStats = (lessons: Lesson[]) => {
  const totalStars = lessons.reduce((total, lesson) => total + lesson.stars, 0)
  const requiredStars = lessons.length // At least 1 star per lesson
  const isCleared = lessons.every(lesson => lesson.stars >= 1) && totalStars >= requiredStars
  
  return { totalStars, requiredStars, isCleared }
}

// Helper function to check if a stage should be unlocked
const calculateStageUnlockStatus = (stageId: string, allStagesData: Stage[]): boolean => {
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

// Stage configurations with progression logic
const createStageData = (): Stage[] => {
  const stageData: Stage[] = [
    {
      id: 'stage-1',
      title: 'Music Theory Fundamentals',
      description: 'Master the basic building blocks of music theory',
      lessons: stageOneLessons,
      order: 1,
      isUnlocked: true, // First stage is always unlocked
      themeColor: '#4A90E2',
      ...calculateStageStats(stageOneLessons)
    },
    {
      id: 'stage-2',
      title: 'Harmony and Chord Theory',
      description: 'Dive deeper into harmonic relationships and chord progressions',
      lessons: stageTwoLessons,
      order: 2,
      prerequisiteStages: ['stage-1'],
      isUnlocked: false, // Will be calculated
      themeColor: '#7B68EE',
      ...calculateStageStats(stageTwoLessons)
    },
    {
      id: 'stage-3',
      title: 'Advanced Composition',
      description: 'Master complex harmonic concepts and composition techniques',
      lessons: stageThreeLessons,
      order: 3,
      prerequisiteStages: ['stage-2'],
      isUnlocked: false, // Will be calculated
      themeColor: '#FF6B6B',
      ...calculateStageStats(stageThreeLessons)
    }
  ]
  
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

// Export all lessons for easy access
export const allLessons = [...stageOneLessons, ...stageTwoLessons, ...stageThreeLessons]

// Advanced stage management functions
export class StageManager {
  static getCurrentUserStage(): Stage | undefined {
    // Find the highest unlocked stage that has some progress
    return stagesArray
      .filter(stage => stage.isUnlocked)
      .sort((a, b) => b.order - a.order)[0]
  }
  
  static getNextLockedStage(): Stage | undefined {
    // Find the first locked stage
    return stagesArray
      .filter(stage => !stage.isUnlocked)
      .sort((a, b) => a.order - b.order)[0]
  }
  
  static isStageUnlocked(stageId: string): boolean {
    const stage = stagesArray.find(s => s.id === stageId)
    return stage?.isUnlocked || false
  }
  
  static getStageRequirements(stageId: string): { 
    isUnlocked: boolean
    missingPrerequisites: Stage[]
    progressNeeded: string[]
  } {
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
  
  static refreshStageUnlockStatus(): void {
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
  
  static getOverallProgress(): {
    totalLessons: number
    completedLessons: number
    totalStages: number
    unlockedStages: number
    clearedStages: number
    overallPercentage: number
  } {
    const totalLessons = allLessons.length
    const completedLessons = allLessons.filter(lesson => lesson.stars > 0).length
    const totalStages = stagesArray.length
    const unlockedStages = stagesArray.filter(stage => stage.isUnlocked).length
    const clearedStages = stagesArray.filter(stage => stage.isCleared).length
    const overallPercentage = Math.round((completedLessons / totalLessons) * 100)
    
    return {
      totalLessons,
      completedLessons,
      totalStages,
      unlockedStages,
      clearedStages,
      overallPercentage
    }
  }
}

// Helper functions for lesson management
export const getLessonById = (id: string): Lesson | undefined => {
  return allLessons.find(lesson => lesson.id === id)
}

export const getStageById = (id: string): Stage | undefined => {
  return stagesArray.find(stage => stage.id === id)
}

export const getStageProgress = (stageId: string): { completed: number; total: number; percentage: number } => {
  const stage = getStageById(stageId)
  if (!stage) return { completed: 0, total: 0, percentage: 0 }
  
  const completed = stage.lessons.filter(lesson => lesson.stars > 0).length
  const total = stage.lessons.length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return { completed, total, percentage }
}

export const updateLessonStars = (lessonId: string, stars: number): void => {
  const lesson = getLessonById(lessonId)
  if (lesson) {
    lesson.stars = Math.max(0, Math.min(3, stars)) // Ensure stars are between 0-3
    
    // Refresh stage unlock status after updating lesson progress
    StageManager.refreshStageUnlockStatus()
  }
}

// Utility functions for UI components
export const getVisibleLessonsForStage = (stageId: string): Lesson[] => {
  const stage = getStageById(stageId)
  if (!stage) return []
  
  // If stage is unlocked, show all lessons
  if (stage.isUnlocked) {
    return stage.lessons.map(lesson => ({ ...lesson, isLocked: false }))
  }
  
  // If stage is locked, show lessons as locked
  return stage.lessons.map(lesson => ({ ...lesson, isLocked: true }))
}

export const getStageDisplayData = (stageId: string): {
  stage: Stage | undefined
  isAccessible: boolean
  blockingMessage: string
  lessons: Lesson[]
} => {
  const stage = getStageById(stageId)
  if (!stage) {
    return {
      stage: undefined,
      isAccessible: false,
      blockingMessage: 'Stage not found',
      lessons: []
    }
  }
  
  const requirements = StageManager.getStageRequirements(stageId)
  const lessons = getVisibleLessonsForStage(stageId)
  
  let blockingMessage = ''
  if (!requirements.isUnlocked && requirements.progressNeeded.length > 0) {
    blockingMessage = requirements.progressNeeded.join(', ')
  }
  
  return {
    stage,
    isAccessible: requirements.isUnlocked,
    blockingMessage,
    lessons
  }
}
