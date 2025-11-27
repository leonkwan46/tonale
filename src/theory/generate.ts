import { CLEFS } from '@leonkwan46/music-notation'
import { ExerciseConfig, Question, StageNumber } from './curriculum/types'
import {
  createAccidentalQuestions,
  createDottedValueQuestions,
  createIntervalQuestions,
  createKeySignatureQuestions,
  createMusicalTermQuestions,
  createNoteGroupingQuestions,
  createNoteIdentificationQuestions,
  createNoteRestValueQuestions,
  createNoteValueNameQuestions,
  createNoteValueQuestions,
  createRestValueNameQuestions,
  createRestValueQuestions,
  createScaleDegreeQuestions,
  createSemitoneToneQuestions,
  createSymbolQuestions,
  createTieSlurQuestions,
  createTimeSignatureQuestions,
  createTriadQuestions
} from './exercises/generators'

type QuestionGenerator = (count: number, stage: StageNumber) => Question[]

const distributeQuestions = (
  totalCount: number,
  generators: QuestionGenerator[],
  stage: StageNumber
): Question[] => {
  const questionTypes = generators.length
  const questionsPerType = Math.floor(totalCount / questionTypes)
  const remaining = totalCount - (questionsPerType * questionTypes)
  const extra = (offset: number) => (remaining > offset ? 1 : 0)

  const questions: Question[] = []
  generators.forEach((generator, index) => {
    questions.push(...generator(questionsPerType + extra(index), stage))
  })

  return questions.slice(0, totalCount).sort(() => Math.random() - 0.5)
}

export const generateLessonQuestions = (config: ExerciseConfig): Question[] => {
  const questions: Question[] = []
  
  switch (config.generatorType) {
    case 'noteRestValue':
      questions.push(...createNoteRestValueQuestions(config.questionsCount, config.stage))
      break
    
    case 'noteNameValue':
      questions.push(...createNoteValueNameQuestions(config.questionsCount, config.stage))
      break
    
    case 'restNameValue':
      questions.push(...createRestValueNameQuestions(config.questionsCount, config.stage))
      break

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
    
    case 'tieSlur':
      questions.push(...createTieSlurQuestions(config.questionsCount, config.stage))
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
    
    case 'stage-0-final':
      return distributeQuestions(
        config.questionsCount,
        [
          createNoteValueNameQuestions,
          createRestValueNameQuestions,
          createAccidentalQuestions,
          (count, stage) => createNoteIdentificationQuestions(count, stage, CLEFS.TREBLE),
          (count, stage) => createNoteIdentificationQuestions(count, stage, CLEFS.BASS),
          createTimeSignatureQuestions,
          createMusicalTermQuestions
        ],
        config.stage
      )

    case 'stage-1-final':
      return distributeQuestions(
        config.questionsCount,
        [
          createNoteRestValueQuestions,
          (count, stage) => createNoteIdentificationQuestions(count, stage, CLEFS.TREBLE),
          (count, stage) => createNoteIdentificationQuestions(count, stage, CLEFS.BASS),
          createTieSlurQuestions,
          createSemitoneToneQuestions,
          createMusicalTermQuestions
        ],
        config.stage
      )
    
    case 'stage-2-final':
      return distributeQuestions(
        config.questionsCount,
        [
          createDottedValueQuestions,
          createNoteGroupingQuestions,
          createScaleDegreeQuestions,
          createIntervalQuestions,
          createKeySignatureQuestions,
          createTriadQuestions,
          createMusicalTermQuestions
        ],
        config.stage
      )
    
    default:
      console.warn(`Unknown generator type: ${config.generatorType}`)
  }
  
  return questions
}
