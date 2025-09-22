// Generate questions for a lesson based on exercise configuration
import { CLEFS } from '@leonkwan46/music-notation'
import {
  createKeySignatureQuestions,
  createMusicalTermQuestions,
  createNoteIdentificationQuestions,
  createNoteValueQuestions,
  createRestValueQuestions,
  createTimeSignatureQuestions
} from '../exerciseGenerators'
import { ExerciseConfig, Question } from '../theoryData/types'

export const generateLessonQuestions = (config: ExerciseConfig): Question[] => {
  const questions: Question[] = []
  
  switch (config.generatorType) {
    case 'noteValue':
      questions.push(...createNoteValueQuestions(config.questionsCount, config.stage))
      break
    
    case 'restValue':
      questions.push(...createRestValueQuestions(config.questionsCount, config.stage))
      break
    
    case 'noteIdentification':
      // For note identification, alternate between treble and bass clef
      const trebleQuestionsCount = Math.ceil(config.questionsCount / 2)
      const bassQuestionsCount = config.questionsCount - trebleQuestionsCount
      questions.push(...createNoteIdentificationQuestions(trebleQuestionsCount, config.stage, CLEFS.TREBLE))
      questions.push(...createNoteIdentificationQuestions(bassQuestionsCount, config.stage, CLEFS.BASS))
      break
    
    case 'timeSignature':
      questions.push(...createTimeSignatureQuestions(config.questionsCount, config.stage))
      break
    
    case 'keySignature':
      questions.push(...createKeySignatureQuestions(config.questionsCount, config.stage))
      break
    
    case 'musicalTerm':
      questions.push(...createMusicalTermQuestions(config.questionsCount, config.stage))
      break
    
    case 'mixed':
      const questionsPerType = Math.floor(config.questionsCount / 6)
      const remaining = config.questionsCount - (questionsPerType * 6)
      
      questions.push(...createNoteValueQuestions(questionsPerType + (remaining > 0 ? 1 : 0), config.stage))
      questions.push(...createRestValueQuestions(questionsPerType + (remaining > 1 ? 1 : 0), config.stage))
      questions.push(...createTimeSignatureQuestions(questionsPerType + (remaining > 2 ? 1 : 0), config.stage))
      questions.push(...createNoteIdentificationQuestions(questionsPerType + (remaining > 3 ? 1 : 0), config.stage, CLEFS.TREBLE))
      questions.push(...createKeySignatureQuestions(questionsPerType + (remaining > 4 ? 1 : 0), config.stage))
      questions.push(...createMusicalTermQuestions(questionsPerType, config.stage))
      break
    
    default:
      console.warn(`Unknown generator type: ${config.generatorType}`)
  }
  
  // Shuffle questions to mix different types
  return questions.sort(() => Math.random() - 0.5)
}

