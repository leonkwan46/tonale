// Generate questions for a lesson based on exercise configuration
import { CLEFS } from '@leonkwan46/music-notation'
import {
    createAccidentalQuestions,
    createArticulationQuestions,
  createDottedValueQuestions,
    createIntervalQuestions,
    createKeySignatureQuestions,
    createMusicalTermQuestions,
    createNoteGroupingQuestions,
    createNoteIdentificationQuestions,
    createNoteValueNameQuestions,
  createNoteValueQuestions,
    createRestValueNameQuestions,
    createRestValueQuestions,
    createScaleDegreeQuestions,
    createSemitoneToneQuestions,
  createSymbolQuestions,
    createTimeSignatureQuestions,
    createTriadQuestions
} from '../exerciseGenerators'
import { ExerciseConfig, Question } from '../theoryData/types'

export const generateLessonQuestions = (config: ExerciseConfig): Question[] => {
  const questions: Question[] = []
  
  switch (config.generatorType) {
    case 'noteRestValue': {
      const halfCount = Math.floor(config.questionsCount / 2)
      const remaining = config.questionsCount - (halfCount * 2)
      questions.push(...createNoteValueNameQuestions(halfCount + (remaining > 0 ? 1 : 0), config.stage))
      questions.push(...createRestValueNameQuestions(halfCount + (remaining > 1 ? 1 : 0), config.stage))
      break
    }
    
    case 'noteNameValue':
      questions.push(...createNoteValueNameQuestions(config.questionsCount, config.stage))
      break
    
    case 'restNameValue':
      questions.push(...createRestValueNameQuestions(config.questionsCount, config.stage))
      break
    case 'stage-0-final':
      const stage0QuestionTypes = 7
      const stage0QuestionsPerType = Math.floor(config.questionsCount / stage0QuestionTypes)
      const stage0Remaining = config.questionsCount - (stage0QuestionsPerType * stage0QuestionTypes)

      const extra = (offset: number) => (stage0Remaining > offset ? 1 : 0)

      questions.push(...createNoteValueNameQuestions(stage0QuestionsPerType + extra(0), config.stage))
      questions.push(...createRestValueNameQuestions(stage0QuestionsPerType + extra(1), config.stage))
      questions.push(...createAccidentalQuestions(stage0QuestionsPerType + extra(2), config.stage))
      questions.push(...createNoteIdentificationQuestions(stage0QuestionsPerType + extra(3), config.stage, CLEFS.TREBLE))
      questions.push(...createNoteIdentificationQuestions(stage0QuestionsPerType + extra(4), config.stage, CLEFS.BASS))
      questions.push(...createTimeSignatureQuestions(stage0QuestionsPerType + extra(5), config.stage))
      questions.push(...createMusicalTermQuestions(stage0QuestionsPerType + extra(6), config.stage))

      return questions.sort(() => Math.random() - 0.5)

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
    
    case 'accidentals':
      questions.push(...createAccidentalQuestions(config.questionsCount, config.stage))
      break
    
    case 'semitonesTones':
      questions.push(...createSemitoneToneQuestions(config.questionsCount, config.stage))
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
      questions.push(...createDottedValueQuestions(config.questionsCount, config.stage))
      break
    
    case 'noteGrouping':
      questions.push(...createNoteGroupingQuestions(config.questionsCount, config.stage))
      break
    
    case 'symbols':
      questions.push(...createSymbolQuestions(config.questionsCount, config.stage))
      break
    
    case 'scaleDegrees':
      questions.push(...createScaleDegreeQuestions(config.questionsCount, config.stage))
      break
    
    case 'interval':
      questions.push(...createIntervalQuestions(config.questionsCount, config.stage))
      break
    
    case 'triad':
      questions.push(...createTriadQuestions(config.questionsCount, config.stage))
      break
    
    case 'stage-1-final':
      // Stage 1 final test: Note values, rest values, time signatures, treble/bass clef notes, accidentals, semitones/tones, dynamics
      const stage1QuestionsPerType = Math.floor(config.questionsCount / 8)
      const stage1Remaining = config.questionsCount - (stage1QuestionsPerType * 8)
      
      questions.push(...createNoteValueQuestions(stage1QuestionsPerType + (stage1Remaining > 0 ? 1 : 0), config.stage))
      questions.push(...createRestValueQuestions(stage1QuestionsPerType + (stage1Remaining > 1 ? 1 : 0), config.stage))
      questions.push(...createTimeSignatureQuestions(stage1QuestionsPerType + (stage1Remaining > 2 ? 1 : 0), config.stage))
      questions.push(...createNoteIdentificationQuestions(stage1QuestionsPerType + (stage1Remaining > 3 ? 1 : 0), config.stage, CLEFS.TREBLE))
      questions.push(...createNoteIdentificationQuestions(stage1QuestionsPerType + (stage1Remaining > 4 ? 1 : 0), config.stage, CLEFS.BASS))
      questions.push(...createAccidentalQuestions(stage1QuestionsPerType + (stage1Remaining > 5 ? 1 : 0), config.stage))
      questions.push(...createSemitoneToneQuestions(stage1QuestionsPerType + (stage1Remaining > 6 ? 1 : 0), config.stage))
      questions.push(...createMusicalTermQuestions(stage1QuestionsPerType + (stage1Remaining > 7 ? 1 : 0), config.stage)) // Dynamics
      
      return questions.sort(() => Math.random() - 0.5)
    
    case 'stage-2-final':
      // Grade 1 final test: All Stage 1 concepts + dotted notes, grouping, tempo, expression, articulation, scales, scale degrees, intervals, triads
      const stage2QuestionsPerType = Math.floor(config.questionsCount / 12)
      const stage2Remaining = config.questionsCount - (stage2QuestionsPerType * 12)
      
      // Stage 1 concepts
      questions.push(...createNoteValueQuestions(stage2QuestionsPerType + (stage2Remaining > 0 ? 1 : 0), config.stage))
      questions.push(...createRestValueQuestions(stage2QuestionsPerType + (stage2Remaining > 1 ? 1 : 0), config.stage))
      questions.push(...createTimeSignatureQuestions(stage2QuestionsPerType + (stage2Remaining > 2 ? 1 : 0), config.stage))
      questions.push(...createNoteIdentificationQuestions(stage2QuestionsPerType + (stage2Remaining > 3 ? 1 : 0), config.stage, CLEFS.TREBLE))
      questions.push(...createNoteIdentificationQuestions(stage2QuestionsPerType + (stage2Remaining > 4 ? 1 : 0), config.stage, CLEFS.BASS))
      questions.push(...createAccidentalQuestions(stage2QuestionsPerType + (stage2Remaining > 5 ? 1 : 0), config.stage))
      questions.push(...createSemitoneToneQuestions(stage2QuestionsPerType + (stage2Remaining > 6 ? 1 : 0), config.stage))
      questions.push(...createMusicalTermQuestions(stage2QuestionsPerType + (stage2Remaining > 7 ? 1 : 0), config.stage)) // Dynamics
      
      // Stage 2 concepts
      questions.push(...createNoteGroupingQuestions(stage2QuestionsPerType + (stage2Remaining > 8 ? 1 : 0), config.stage))
      questions.push(...createMusicalTermQuestions(stage2QuestionsPerType + (stage2Remaining > 9 ? 1 : 0), config.stage)) // Tempo terms
      questions.push(...createArticulationQuestions(stage2QuestionsPerType + (stage2Remaining > 10 ? 1 : 0), config.stage))
      questions.push(...createKeySignatureQuestions(stage2QuestionsPerType + (stage2Remaining > 11 ? 1 : 0), config.stage))
      questions.push(...createScaleDegreeQuestions(stage2QuestionsPerType, config.stage))
      questions.push(...createIntervalQuestions(stage2QuestionsPerType, config.stage))
      questions.push(...createTriadQuestions(stage2QuestionsPerType, config.stage))
      
      return questions.sort(() => Math.random() - 0.5)
    
    default:
      console.warn(`Unknown generator type: ${config.generatorType}`)
  }
  
  return questions
}

