// Generate questions for a lesson based on exercise configuration
import {
    createKeySignatureQuestions,
    createMusicalTermQuestions,
    createNoteIdentificationQuestions,
    createNoteValueQuestions,
    createTimeSignatureQuestions
} from '../exerciseGenerators'
import { ExerciseConfig, Question } from '../theoryData/types'

export const generateLessonQuestions = (config: ExerciseConfig): Question[] => {
  const questions: Question[] = []
  
  config.generators.forEach(({ generatorId, count, difficulty = 'beginner' }) => {
    switch (generatorId) {
      case 'noteValue':
        questions.push(...createNoteValueQuestions(count))
        break
      
      case 'noteIdentification':
        // For note identification, alternate between treble and bass clef
        const trebleCount = Math.ceil(count / 2)
        const bassCount = count - trebleCount
        questions.push(...createNoteIdentificationQuestions(trebleCount, 'treble'))
        questions.push(...createNoteIdentificationQuestions(bassCount, 'bass'))
        break
      
      case 'timeSignature':
        questions.push(...createTimeSignatureQuestions(count))
        break
      
      case 'keySignature':
        questions.push(...createKeySignatureQuestions(count))
        break
      
      case 'musicalTerm':
        questions.push(...createMusicalTermQuestions(count))
        break
      
      default:
        console.warn(`Unknown generator ID: ${generatorId}`)
    }
  })
  
  // Shuffle questions to mix different types
  return questions.sort(() => Math.random() - 0.5)
}

// Generate questions for a specific lesson ID
export const generateQuestionsForLesson = (lessonId: string): Question[] => {
  // Import lesson configs
  const { 
    lesson1Config, 
    lesson2Config, 
    lesson3Config, 
    lesson4Config, 
    lesson5Config,
    stage1FinalConfig 
  } = require('../lessonConfigs/stageOneConfigs')
  
  const configMap: Record<string, ExerciseConfig> = {
    'lesson-1': lesson1Config,
    'lesson-2': lesson2Config,
    'lesson-3': lesson3Config,
    'lesson-4': lesson4Config,
    'lesson-5': lesson5Config,
    'stage-1-final': stage1FinalConfig
  }
  
  const config = configMap[lessonId]
  if (!config) {
    console.warn(`No exercise config found for lesson: ${lessonId}`)
    return []
  }
  
  return generateLessonQuestions(config)
}
