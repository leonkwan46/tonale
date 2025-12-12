import { NOTES, type MusicElementData } from '@leonkwan46/music-notation'
import { getStageOneArticulationTerms } from '../../curriculum/config/musicalTerms'
import { Question, StageNumber } from '../../curriculum/types'
import { generateQuestionsFromPool } from '../utils/exercise'
import { generateQuestionId, generateWrongChoices } from '../utils/question'

export const createArticulationQuestion = (stage: StageNumber, termKey?: string): Question => {
  const articulationTerms = getStageOneArticulationTerms()
  const termKeys = Object.keys(articulationTerms)
  const correctTerm = termKey || termKeys[0]
  const correctDefinition = articulationTerms[correctTerm as keyof typeof articulationTerms]
  
  const needsStaffRendering = correctTerm === 'staccato' || correctTerm === 'accent' || correctTerm === 'fermata'
  
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
      symbolType: correctTerm
    }
  }
  
  return {
    id: generateQuestionId('articulation'),
    question: 'What does this articulation marking mean?',
    correctAnswer: correctDefinition,
    choices: generateWrongChoices(Object.values(articulationTerms), correctDefinition),
    explanation: `The articulation marking '${correctTerm}' means ${correctDefinition}.`,
    type: 'multipleChoice',
    visualComponent
  }
}

const getDuplicateIdentifier = (question: Question): string | null => {
  const symbolType = question.visualComponent?.symbolType
  if (symbolType && typeof symbolType === 'string') {
    return symbolType
  }
  return question.correctAnswer ?? null
}

export const createArticulationQuestions = (questionsCount: number, stage: StageNumber): Question[] => {
  const articulationTerms = getStageOneArticulationTerms()
  const termKeys = Object.keys(articulationTerms)
  const uniquePool = termKeys.map(termKey => 
    createArticulationQuestion(stage, termKey)
  )
  return generateQuestionsFromPool(uniquePool, questionsCount, getDuplicateIdentifier)
}
