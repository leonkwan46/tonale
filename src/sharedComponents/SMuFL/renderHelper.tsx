import { getDisplayName, getSMuFLSymbol, isTextTerm, STAGE_ONE_ITALIAN_MUSICAL_TERMS, STAGE_THREE_ITALIAN_MUSICAL_TERMS, STAGE_TWO_ITALIAN_MUSICAL_TERMS } from '@/data/stageSyllabusConfigs/musicalTerms'
import { getNoteTypeSMuFLSymbol } from '@/data/stageSyllabusConfigs/noteTypes'
import { getRestTypeSMuFLSymbol } from '@/data/stageSyllabusConfigs/restTypes'
import { TTSButton } from '@/screens/LessonScreen/components/VisualQuestion/VisualQuestion.styles'
import { canPronounceTerm, pronounceTerm } from '@/utils/pronounce'
import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { scale } from 'react-native-size-matters'
import { SMuFLNoteWrapper, SMuFLRestWrapper } from './SMuFLMusicElementContainers'
import { SMuFLSymbolContainer, SMuFLSymbolTerm } from './SMuFLSymbolTerm'

const extractTypeAndDots = (data: string | { type: string; dots?: number }) => {
  if (typeof data === 'object' && 'type' in data) {
    return { type: data.type, dots: data.dots || 0 }
  } else if (typeof data === 'string') {
    return { type: data, dots: 0 }
  }
  return null
}

export const renderNoteWithSMuFL = (noteType: string | { type: string; dots?: number }) => {
  const extracted = extractTypeAndDots(noteType)
  if (!extracted) return null
  
  const { type, dots } = extracted
  const symbol = getNoteTypeSMuFLSymbol(type, 'up')
  
  if (!symbol) {
    return <SMuFLNoteWrapper symbol="?" dots={0} />
  }
  
  return <SMuFLNoteWrapper symbol={symbol} dots={dots} />
}

export const renderRestWithSMuFL = (restType: string | { type: string; dots?: number }) => {
  const extracted = extractTypeAndDots(restType)
  if (!extracted) return null
  
  const { type, dots } = extracted
  const symbol = getRestTypeSMuFLSymbol(type)
  
  if (!symbol) {
    return <SMuFLRestWrapper symbol="?" dots={0} />
  }
  
  return <SMuFLRestWrapper symbol={symbol} dots={dots} />
}

export const renderMusicalElement = (elementType: string | { type: string; dots?: number }) => {
  const extracted = extractTypeAndDots(elementType)
  if (!extracted) return null
  
  const { type } = extracted
  const isRest = type.includes('-rest')
  
  return isRest ? renderRestWithSMuFL(elementType) : renderNoteWithSMuFL(elementType)
}

export const renderTermAndSign = (termType: string, isTablet: boolean, theme: { colors: { text: string } }) => {
  const smuflSymbol = getSMuFLSymbol(termType)
  const isTextTermValue = isTextTerm(termType)
  const displayName = getDisplayName(termType)
  
  const isItalianTerm = STAGE_ONE_ITALIAN_MUSICAL_TERMS[termType as keyof typeof STAGE_ONE_ITALIAN_MUSICAL_TERMS] ||
    STAGE_TWO_ITALIAN_MUSICAL_TERMS[termType as keyof typeof STAGE_TWO_ITALIAN_MUSICAL_TERMS] ||
    STAGE_THREE_ITALIAN_MUSICAL_TERMS[termType as keyof typeof STAGE_THREE_ITALIAN_MUSICAL_TERMS]
  
  const handleTTS = () => {
    if (canPronounceTerm(termType)) {
      pronounceTerm(termType)
    }
  }
  
  return (
    <>
      <SMuFLSymbolContainer isTablet={isTablet} isTextTerm={isTextTermValue}>
        <SMuFLSymbolTerm isTablet={isTablet} isTextTerm={isTextTermValue}>
          {isTextTermValue ? displayName : smuflSymbol}
        </SMuFLSymbolTerm>
      </SMuFLSymbolContainer>
      {isItalianTerm && (
        <TTSButton onPress={handleTTS}>
          <Ionicons 
            name="volume-high" 
            size={scale(20)} 
            color={theme.colors.text} 
          />
        </TTSButton>
      )}
    </>
  )
}
