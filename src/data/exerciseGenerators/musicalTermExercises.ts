import {
  ARTICULATION_SIGNS_DEFINITIONS,
  ArticulationSignsDefinitionsKeys,
  DYNAMIC_SYMBOLS_DEFINITIONS,
  DynamicSymbolsDefinitionKeys,
  GRADE_ONE_ARTICULATION_TERMS,
  GRADE_ONE_EXPRESSION_TERMS,
  GRADE_ONE_PERFORMANCE_TERMS,
  GRADE_ONE_TEMPO_TERMS,
  GradeOneArticulationTermsKeys,
  GradeOneExpressionTermsKeys,
  GradeOnePerformanceTermsKeys,
  GradeOneTempoTermsKeys,
  TERM_DISPLAY_NAMES,
  TermDisplayNamesKeys
} from '../../config/gradeSyllabus'
import {
  generateQuestionId,
  generateWrongChoices,
  getRandomItem
} from '../helpers/questionHelpers'
import {
  STAGE_ONE_MUSICAL_TERMS,
  STAGE_THREE_MUSICAL_TERMS,
  STAGE_TWO_MUSICAL_TERMS
} from '../stageSyllabus/musicalTerms'
import { Question, StageNumber } from '../theoryData/types'

export const createMusicalTermQuestion = (stage: StageNumber): Question => {
  let stageMusicalTerms: Record<string, string>
  
  switch (stage) {
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
      throw new Error(`Invalid stage: ${stage}. Only stages 1, 2, and 3 are currently supported.`)
  }
  
  const correctTerm = getRandomItem(Object.keys(stageMusicalTerms))
  
  const correctDefinition = DYNAMIC_SYMBOLS_DEFINITIONS[correctTerm as DynamicSymbolsDefinitionKeys ] ||
                          GRADE_ONE_TEMPO_TERMS[correctTerm as GradeOneTempoTermsKeys] ||
                          GRADE_ONE_EXPRESSION_TERMS[correctTerm as GradeOneExpressionTermsKeys] ||
                          GRADE_ONE_ARTICULATION_TERMS[correctTerm as GradeOneArticulationTermsKeys] ||
                          GRADE_ONE_PERFORMANCE_TERMS[correctTerm as GradeOnePerformanceTermsKeys] ||
                          ARTICULATION_SIGNS_DEFINITIONS[correctTerm as ArticulationSignsDefinitionsKeys]
  
  if (!correctDefinition) {
    throw new Error(`No definition found for term: ${correctTerm}`)
  }
  
  const allDefinitions = {
    ...DYNAMIC_SYMBOLS_DEFINITIONS,
    ...GRADE_ONE_TEMPO_TERMS,
    ...GRADE_ONE_EXPRESSION_TERMS,
    ...GRADE_ONE_ARTICULATION_TERMS,
    ...GRADE_ONE_PERFORMANCE_TERMS,
    ...ARTICULATION_SIGNS_DEFINITIONS
  }
  
  const distinctDefinitions = Object.fromEntries(
    Object.entries(allDefinitions).filter(([key, value], index, arr) => 
      arr.findIndex(([k, v]) => v === value) === index
    )
  )
  
  return {
    id: generateQuestionId('musical-term-smufl'),
    question: 'What is this musical term/sign?',
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(distinctDefinitions), correctDefinition),
    explanation: `The term '${TERM_DISPLAY_NAMES[correctTerm as TermDisplayNamesKeys] || correctTerm}' means ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent: {
      type: 'termAndSign',
      symbolType: correctTerm
    },
    metadata: {
      hasSymbol: true,
      symbol: correctTerm,
      category: 'musical-term'
    }
  }
}

export const createMusicalTermQuestions = (
  questionsCount: number, 
  stage: StageNumber
): Question[] => {
  return Array.from({ length: questionsCount }, () => 
    createMusicalTermQuestion(stage)
  )
}
