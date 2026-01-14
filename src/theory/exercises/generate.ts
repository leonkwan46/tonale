import type { ExerciseConfig, Question } from '@/types/lesson'
import type { StageNumber } from '@/types/stage'
import { CLEFS } from '@leonkwan46/music-notation'
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
  createRestValueNameQuestions,
  createScaleDegreeQuestions,
  createSemitoneToneQuestions,
  createTieSlurQuestions,
  createTimeSignatureQuestions,
  createTriadQuestions
} from './generators'

type QuestionGenerator = (count: number, stage: StageNumber, layoutType?: 'grid' | 'row') => Question[]

type GeneratorWithLayout = {
  generator: QuestionGenerator
  layoutType: 'grid' | 'row'
}

const distributeQuestionsWithLayouts = (
  totalCount: number,
  generatorsWithLayouts: GeneratorWithLayout[],
  stage: StageNumber
): Question[] => {
  const questionTypes = generatorsWithLayouts.length
  const questionsPerType = Math.floor(totalCount / questionTypes)
  const remaining = totalCount - (questionsPerType * questionTypes)
  const extra = (offset: number) => (remaining > offset ? 1 : 0)

  const questions: Question[] = []
  generatorsWithLayouts.forEach(({ generator, layoutType }, index) => {
    questions.push(...generator(questionsPerType + extra(index), stage, layoutType))
  })

  return questions.slice(0, totalCount).sort(() => Math.random() - 0.5)
}

export const generateLessonQuestions = (config: ExerciseConfig): Question[] => {
  const questions: Question[] = []
  const layoutType = config.answerLayoutType
  
  switch (config.generatorType) {
    case 'noteRestValue':
      questions.push(...createNoteRestValueQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'noteNameValue':
      questions.push(...createNoteValueNameQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'restNameValue':
      questions.push(...createRestValueNameQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'trebleClef':
      questions.push(...createNoteIdentificationQuestions(config.questionsCount, config.stage, CLEFS.TREBLE, undefined, layoutType))
      break
    
    case 'bassClef':
      questions.push(...createNoteIdentificationQuestions(config.questionsCount, config.stage, CLEFS.BASS, undefined, layoutType))
      break
    
    case 'accidentals':
      questions.push(...createAccidentalQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'semitonesTones':
      questions.push(...createSemitoneToneQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'timeSignature':
      questions.push(...createTimeSignatureQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'keySignature':
      questions.push(...createKeySignatureQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'musicalTerm':
      questions.push(...createMusicalTermQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'dottedValues':
      questions.push(...createDottedValueQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'noteGrouping':
      questions.push(...createNoteGroupingQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'tieSlur':
      questions.push(...createTieSlurQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'scaleDegrees':
      questions.push(...createScaleDegreeQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'interval':
      questions.push(...createIntervalQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'triad':
      questions.push(...createTriadQuestions(config.questionsCount, config.stage, layoutType))
      break
    
    case 'stage-0-final':
      return distributeQuestionsWithLayouts(
        config.questionsCount,
        [
          { generator: createNoteValueNameQuestions, layoutType: 'grid' },
          { generator: createRestValueNameQuestions, layoutType: 'row' },
          { generator: createAccidentalQuestions, layoutType: 'grid' },
          { generator: (count, stage, layoutType) => createNoteIdentificationQuestions(count, stage, CLEFS.TREBLE, undefined, layoutType), layoutType: 'grid' },
          { generator: (count, stage, layoutType) => createNoteIdentificationQuestions(count, stage, CLEFS.BASS, undefined, layoutType), layoutType: 'grid' },
          { generator: createTimeSignatureQuestions, layoutType: 'row' },
          { generator: createMusicalTermQuestions, layoutType: 'row' }
        ],
        config.stage
      )

    case 'stage-1-final':
      return distributeQuestionsWithLayouts(
        config.questionsCount,
        [
          { generator: createNoteRestValueQuestions, layoutType: 'row' },
          { generator: (count, stage, layoutType) => createNoteIdentificationQuestions(count, stage, CLEFS.TREBLE, undefined, layoutType), layoutType: 'grid' },
          { generator: (count, stage, layoutType) => createNoteIdentificationQuestions(count, stage, CLEFS.BASS, undefined, layoutType), layoutType: 'grid' },
          { generator: createTieSlurQuestions, layoutType: 'row' },
          { generator: createSemitoneToneQuestions, layoutType: 'row' },
          { generator: createMusicalTermQuestions, layoutType: 'row' }
        ],
        config.stage
      )
    
    case 'stage-2-final':
      return distributeQuestionsWithLayouts(
        config.questionsCount,
        [
          { generator: createDottedValueQuestions, layoutType: 'row' },
          { generator: createNoteGroupingQuestions, layoutType: 'row' },
          { generator: createScaleDegreeQuestions, layoutType: 'grid' },
          { generator: createIntervalQuestions, layoutType: 'grid' },
          { generator: createKeySignatureQuestions, layoutType: 'grid' },
          { generator: createTriadQuestions, layoutType: 'grid' },
          { generator: createMusicalTermQuestions, layoutType: 'row' }
        ],
        config.stage
      )
    
    default:
      console.warn(`Unknown generator type: ${config.generatorType}`)
  }
  
  return questions
}
