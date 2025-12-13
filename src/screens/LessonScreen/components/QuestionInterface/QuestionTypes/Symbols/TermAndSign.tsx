import { GRADE_ONE_ACCIDENTAL_SIGNS, GRADE_ONE_ARTICULATION_SIGNS, GRADE_ONE_DYNAMIC_SYMBOLS, TERM_DISPLAY_NAMES } from '@/config/gradeSyllabus'
import { useDevice } from '@/hooks'
import { canPronounceTerm, pronounceTerm } from '@/utils/pronounce'
import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import type { QuestionInterface } from '@types'
import { type FC } from 'react'
import { scale } from 'react-native-size-matters'
import { QUESTION_TYPE } from '../types'
import { SMuFLCardContainer, SMuFLSymbolContainer, SMuFLSymbolText, TTSButton } from './TermAndSign.styles'

interface TermAndSignProps {
  questionInterface: QuestionInterface
}

export const TermAndSign: FC<TermAndSignProps> = ({ questionInterface }) => {
  const { isTablet } = useDevice()
  const theme = useTheme()

  if (questionInterface.type !== QUESTION_TYPE.TERM_AND_SIGN || !questionInterface.symbolType) return null

  const renderAsSymbol = questionInterface.renderAsSymbol !== false

  const symbolText = renderAsSymbol && questionInterface.symbolType ? 
    GRADE_ONE_DYNAMIC_SYMBOLS[questionInterface.symbolType as keyof typeof GRADE_ONE_DYNAMIC_SYMBOLS] ||
    GRADE_ONE_ARTICULATION_SIGNS[questionInterface.symbolType as keyof typeof GRADE_ONE_ARTICULATION_SIGNS] ||
    GRADE_ONE_ACCIDENTAL_SIGNS[questionInterface.symbolType as keyof typeof GRADE_ONE_ACCIDENTAL_SIGNS] || 
    '' : ''
  const isTextTerm = questionInterface.symbolType ? 
    !renderAsSymbol ||
    (!(questionInterface.symbolType in GRADE_ONE_DYNAMIC_SYMBOLS) && 
    !(questionInterface.symbolType in GRADE_ONE_ARTICULATION_SIGNS) &&
    !(questionInterface.symbolType in GRADE_ONE_ACCIDENTAL_SIGNS)) : false
  const displayText = questionInterface.symbolType ? TERM_DISPLAY_NAMES[questionInterface.symbolType as keyof typeof TERM_DISPLAY_NAMES] || questionInterface.symbolType : ''
  
  const isWideDynamic = questionInterface.symbolType === 'crescendo' || 
                        questionInterface.symbolType === 'decrescendo' || 
                        questionInterface.symbolType === 'diminuendo' ||
                        questionInterface.symbolType === 'cresc.' || 
                        questionInterface.symbolType === 'decresc.' || 
                        questionInterface.symbolType === 'dim.'

  const shouldShowTTSButton =
    questionInterface.symbolType &&
    questionInterface.enableTTS !== false &&
    canPronounceTerm(questionInterface.symbolType)

  const handleTTS = () => {
    if (questionInterface.symbolType && questionInterface.enableTTS !== false && canPronounceTerm(questionInterface.symbolType)) {
      pronounceTerm(questionInterface.symbolType)
    }
  }

  return (
    <SMuFLCardContainer isTablet={isTablet} isTextTerm={isTextTerm}>
      <SMuFLSymbolContainer isTablet={isTablet} isTextTerm={isTextTerm}>
        <SMuFLSymbolText isTablet={isTablet} isTextTerm={isTextTerm} isWideDynamic={isWideDynamic}>
          {isTextTerm ? displayText : symbolText}
        </SMuFLSymbolText>
      </SMuFLSymbolContainer>
      {shouldShowTTSButton && (
        <TTSButton onPress={handleTTS}>
          <Ionicons 
            name="volume-high" 
            size={scale(20)} 
            color={theme.colors.text} 
          />
        </TTSButton>
      )}
    </SMuFLCardContainer>
  )
}
