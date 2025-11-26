import { NOTES, type MusicElementData } from '@leonkwan46/music-notation'
import {
    TERM_DISPLAY_NAMES,
    TermDisplayNamesKeys
} from '../../../config/gradeSyllabus'
import {
    STAGE_ONE_MUSICAL_TERMS,
    STAGE_ONE_MUSICAL_TERMS_DEFINITIONS,
    STAGE_THREE_MUSICAL_TERMS,
    STAGE_THREE_MUSICAL_TERMS_DEFINITIONS,
    STAGE_TWO_MUSICAL_TERMS,
    STAGE_TWO_MUSICAL_TERMS_DEFINITIONS,
    STAGE_ZERO_MUSICAL_TERMS,
    STAGE_ZERO_MUSICAL_TERMS_DEFINITIONS
} from '../../curriculum/config/musicalTerms'
import { Question, StageNumber } from '../../curriculum/types'
import { generateQuestionsFromPool } from '../../utils/exercise'
import {
    generateQuestionId,
    generateWrongChoices
} from '../../utils/question'

export const createMusicalTermQuestion = (stage: StageNumber, termKey?: string): Question => {
  let stageMusicalTerms: Record<string, string>
  let stageDefinitions: Record<string, string>
  
  switch (stage) {
    case 0:
      stageMusicalTerms = STAGE_ZERO_MUSICAL_TERMS
      stageDefinitions = STAGE_ZERO_MUSICAL_TERMS_DEFINITIONS
      break
    case 1:
      stageMusicalTerms = STAGE_ONE_MUSICAL_TERMS
      stageDefinitions = STAGE_ONE_MUSICAL_TERMS_DEFINITIONS
      break
    case 2:
      stageMusicalTerms = STAGE_TWO_MUSICAL_TERMS
      stageDefinitions = STAGE_TWO_MUSICAL_TERMS_DEFINITIONS
      break
    case 3:
      stageMusicalTerms = STAGE_THREE_MUSICAL_TERMS
      stageDefinitions = STAGE_THREE_MUSICAL_TERMS_DEFINITIONS
      break
    default:
      throw new Error(`Invalid stage: ${stage}. Only stages 0, 1, 2, and 3 are currently supported.`)
  }
  
  const termKeys = Object.keys(stageMusicalTerms)
  const correctTerm = termKey || termKeys[0]
  const correctDefinition = stageDefinitions[correctTerm]
  
  if (!correctDefinition) {
    throw new Error(`No definition found for term: ${correctTerm}`)
  }
  
  const distinctDefinitions = Object.fromEntries(
    Object.entries(stageDefinitions).filter(([key, value], index, arr) => 
      arr.findIndex(([k, v]) => v === value) === index
    )
  )
  
  const needsStaffRendering = correctTerm === 'staccato' || correctTerm === 'accent' || correctTerm === 'fermata'
  const shouldRenderAsSymbol = !(stage === 0 && (correctTerm === 'staccato' || correctTerm === 'legato'))

  let visualComponent
  if (needsStaffRendering) {
    const noteElement: MusicElementData = {
      pitch: 'F4',
      type: NOTES.CROTCHET,
      stem: 'up',
      ...(correctTerm === 'staccato' && { isStaccato: true }),
      ...(correctTerm === 'accent' && { isAccent: true }),
      ...(correctTerm === 'fermata' && { hasFermata: true })
    }
    
    visualComponent = {
      type: 'musicStaff' as const,
      clef: 'treble' as const,
      elements: [noteElement],
      size: 'sml' as const
    }
  } else {
    visualComponent = {
      type: 'termAndSign' as const,
      symbolType: correctTerm,
      renderAsSymbol: shouldRenderAsSymbol
    }
  }

  return {
    id: generateQuestionId('musical-term-smufl'),
    question: 'What is this musical term/sign?',
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(distinctDefinitions), correctDefinition),
    explanation: `The term '${TERM_DISPLAY_NAMES[correctTerm as TermDisplayNamesKeys] || correctTerm}' means ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  if (question.visualComponent?.symbolType) {
    return question.visualComponent.symbolType
  }
  return question.correctAnswer ?? null
}

export const createMusicalTermQuestions = (
  questionsCount: number, 
  stage: StageNumber
): Question[] => {
  let stageMusicalTerms: Record<string, string>
  
  switch (stage) {
    case 0:
      stageMusicalTerms = STAGE_ZERO_MUSICAL_TERMS
      break
    case 1:
      stageMusicalTerms = STAGE_ONE_MUSICAL_TERMS
      break
    case 2:
      stageMusicalTerms = STAGE_TWO_MUSICAL_TERMS
      break
    case 3:
      stageMusicalTerms = STAGE_THREE_MUSICAL_TERMS
      break
    default:
      throw new Error(`Invalid stage: ${stage}. Only stages 0, 1, 2, and 3 are currently supported.`)
  }
  
  const termKeys = Object.keys(stageMusicalTerms)
  const uniquePool = termKeys.map(termKey => 
    createMusicalTermQuestion(stage, termKey)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
