/**
 * SMuFL Music Notation Wrapper Components
 * 
 * Standard Music Font Layout (SMuFL) specification:
 * @see https://w3c.github.io/smufl/latest/index.html
 */

import { NOTE_TYPE_SMUFL_SYMBOLS } from '@/data/stageSyllabusConfigs/noteTypes'
import { REST_TYPE_SMUFL_SYMBOLS, RESTS } from '@/data/stageSyllabusConfigs/restTypes'
import { useDevice } from '@/hooks'
import styled from '@emotion/native'
import { NOTES } from '@leonkwan46/music-notation'
import * as React from 'react'
import { Platform } from 'react-native'
import { scale } from 'react-native-size-matters'


interface ContainerProps {
  isTablet: boolean
  needsSeparateDotRendering?: boolean
}
interface TextProps {
  fontSize: number
  translateY: number
}
interface SMuFLWrapperProps {
  symbol: string
  dots?: number
}

const NoteContainer = styled.View<ContainerProps>(({ isTablet }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: isTablet ? scale(-70) : scale(-100)
}))
const RestContainer = styled.View<ContainerProps>(({ isTablet, needsSeparateDotRendering }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: isTablet ? scale(-110) : scale(-100),
  flexDirection: needsSeparateDotRendering ? 'row' : 'column'
}))
const NoteText = styled.Text<TextProps>(({ fontSize, translateY }) => ({
  fontFamily: 'Bravura',
  fontSize: fontSize,
  textAlign: 'center',
  userSelect: 'none',
  includeFontPadding: false,
  transform: [{ translateY }]
}))
const RestText = styled.Text<TextProps>(({ fontSize, translateY }) => ({
  fontFamily: 'Bravura',
  fontSize: fontSize,
  textAlign: 'center',
  userSelect: 'none',
  includeFontPadding: false,
  transform: [{ translateY }]
}))

export const SMuFLNoteWrapper: React.FC<SMuFLWrapperProps> = ({ symbol, dots = 0 }) => {
  const { isTablet } = useDevice()
  const semibreveSymbol = NOTE_TYPE_SMUFL_SYMBOLS[NOTES.SEMIBREVE as keyof typeof NOTE_TYPE_SMUFL_SYMBOLS]
  const isSemibreveNote = symbol === (semibreveSymbol as { default: string }).default
  
  const noteTranslateY = isSemibreveNote 
  ? (isTablet ? scale(-30) : scale(-40))
  : (isTablet ? scale(-20) : scale(-30))
  const noteFontSize = isTablet ? scale(40) : scale(70)
  
  const content = `${symbol} ${'\uE1E7'.repeat(dots)}`
  
  return (
    <NoteContainer isTablet={isTablet}>
      <NoteText 
        fontSize={noteFontSize}
        translateY={noteTranslateY}
      >
        {` ${content} `}
      </NoteText>
    </NoteContainer>
  )
}

export const SMuFLRestWrapper: React.FC<SMuFLWrapperProps> = ({ symbol, dots = 0 }) => {
  const { isTablet } = useDevice()
  
  const isLongRest = symbol === REST_TYPE_SMUFL_SYMBOLS[RESTS.SEMIBREVE] || symbol === REST_TYPE_SMUFL_SYMBOLS[RESTS.MINIM]
  const isAndroid = Platform.OS === 'android'
  const needsSeparateDotRendering = isLongRest && dots > 0

  const restTranslateY = isLongRest ? scale(-50) : scale(-55)
  const restFontSize = isTablet ? scale(50) : scale(70)

  const restContent = isLongRest && isAndroid ? `  ${symbol}  ` : isLongRest && !isAndroid ? ` ${symbol}  ` : `${symbol}`
  const dotContent = isLongRest && isAndroid ? `${'\uE1E7'.repeat(dots)}` : isLongRest && !isAndroid ? ` ${'\uE1E7'.repeat(dots)}` : `${'\uE1E7'.repeat(dots)}`
  
  return (
    <RestContainer 
      isTablet={isTablet}
      needsSeparateDotRendering={needsSeparateDotRendering}
    >
      <RestText 
        fontSize={restFontSize}
        translateY={restTranslateY}
      >
        {restContent}
      </RestText>
      {needsSeparateDotRendering && (
        <RestText 
          fontSize={restFontSize}
          translateY={scale(-60)}
        >
          {dotContent}
        </RestText>
      )}
    </RestContainer>
  )
}


