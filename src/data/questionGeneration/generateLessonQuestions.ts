// Generate questions for a lesson based on exercise configuration
import { CLEFS } from '@leonkwan46/music-notation'
import {
    createArticulationQuestions,
    createIntervalQuestions,
    createKeySignatureQuestions,
    createMusicalTermQuestions,
    createNoteGroupingQuestions,
    createNoteIdentificationQuestions,
    createNoteValueQuestions,
    createRestValueQuestions,
    createTimeSignatureQuestions,
    createTriadQuestions,
    createTripletQuestions
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
    
    case 'trebleClef':
      questions.push(...createNoteIdentificationQuestions(config.questionsCount, config.stage, CLEFS.TREBLE))
      break
    
    case 'bassClef':
      questions.push(...createNoteIdentificationQuestions(config.questionsCount, config.stage, CLEFS.BASS))
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
    
    case 'dottedValues':
      // Split questions between dotted notes and dotted rests
      const dottedNotesCount = Math.ceil(config.questionsCount / 2)
      const dottedRestsCount = config.questionsCount - dottedNotesCount
      questions.push(...createNoteValueQuestions(dottedNotesCount, config.stage))
      questions.push(...createRestValueQuestions(dottedRestsCount, config.stage))
      break
    
    case 'noteGrouping':
      questions.push(...createNoteGroupingQuestions(config.questionsCount, config.stage))
      break
    
    
    case 'articulation':
      questions.push(...createArticulationQuestions(config.questionsCount, config.stage))
      break
    
    case 'interval':
      questions.push(...createIntervalQuestions(config.questionsCount, config.stage))
      break
    
    case 'triad':
      questions.push(...createTriadQuestions(config.questionsCount, config.stage, 'treble'))
      break
    
    case 'triplet':
      questions.push(...createTripletQuestions(config.questionsCount, config.stage))
      break
    
    case 'stage-1-final':
      // Stage 1 final test: Note values, rest values, time signatures, treble/bass clef notes, dynamics
      const stage1QuestionsPerType = Math.floor(config.questionsCount / 6)
      const stage1Remaining = config.questionsCount - (stage1QuestionsPerType * 6)
      
      questions.push(...createNoteValueQuestions(stage1QuestionsPerType + (stage1Remaining > 0 ? 1 : 0), config.stage))
      questions.push(...createRestValueQuestions(stage1QuestionsPerType + (stage1Remaining > 1 ? 1 : 0), config.stage))
      questions.push(...createTimeSignatureQuestions(stage1QuestionsPerType + (stage1Remaining > 2 ? 1 : 0), config.stage))
      questions.push(...createNoteIdentificationQuestions(stage1QuestionsPerType + (stage1Remaining > 3 ? 1 : 0), config.stage, CLEFS.TREBLE))
      questions.push(...createNoteIdentificationQuestions(stage1QuestionsPerType + (stage1Remaining > 4 ? 1 : 0), config.stage, CLEFS.BASS))
      questions.push(...createMusicalTermQuestions(stage1QuestionsPerType + (stage1Remaining > 5 ? 1 : 0), config.stage)) // Dynamics
      
      return questions.sort(() => Math.random() - 0.5)
    
    case 'stage-2-final':
      // Stage 2 final test: All Stage 1 concepts + dotted notes, grouping, tempo, articulation, scales, intervals, triads
      const stage2QuestionsPerType = Math.floor(config.questionsCount / 10)
      const stage2Remaining = config.questionsCount - (stage2QuestionsPerType * 10)
      
      // Stage 1 concepts
      questions.push(...createNoteValueQuestions(stage2QuestionsPerType + (stage2Remaining > 0 ? 1 : 0), config.stage))
      questions.push(...createRestValueQuestions(stage2QuestionsPerType + (stage2Remaining > 1 ? 1 : 0), config.stage))
      questions.push(...createTimeSignatureQuestions(stage2QuestionsPerType + (stage2Remaining > 2 ? 1 : 0), config.stage))
      questions.push(...createNoteIdentificationQuestions(stage2QuestionsPerType + (stage2Remaining > 3 ? 1 : 0), config.stage, CLEFS.TREBLE))
      questions.push(...createNoteIdentificationQuestions(stage2QuestionsPerType + (stage2Remaining > 4 ? 1 : 0), config.stage, CLEFS.BASS))
      questions.push(...createMusicalTermQuestions(stage2QuestionsPerType + (stage2Remaining > 5 ? 1 : 0), config.stage)) // Dynamics
      
      // Stage 2 concepts
      questions.push(...createNoteGroupingQuestions(stage2QuestionsPerType + (stage2Remaining > 6 ? 1 : 0), config.stage))
      questions.push(...createMusicalTermQuestions(stage2QuestionsPerType + (stage2Remaining > 7 ? 1 : 0), config.stage)) // Tempo terms
      questions.push(...createArticulationQuestions(stage2QuestionsPerType + (stage2Remaining > 8 ? 1 : 0), config.stage))
      questions.push(...createKeySignatureQuestions(stage2QuestionsPerType + (stage2Remaining > 9 ? 1 : 0), config.stage))
      questions.push(...createIntervalQuestions(stage2QuestionsPerType, config.stage))
      questions.push(...createTriadQuestions(stage2QuestionsPerType, config.stage, 'treble'))
      
      return questions.sort(() => Math.random() - 0.5)
    
    default:
      console.warn(`Unknown generator type: ${config.generatorType}`)
  }
  
  return questions
}

