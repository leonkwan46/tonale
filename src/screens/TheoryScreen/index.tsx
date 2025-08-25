import { ScreenContainer } from '@/components'
import React from 'react'
import {
  BottomText,
  ContentWrapper,
  TopText
} from './TheoryScreen.styles'

export function TheoryScreen() {
  return (
    <ScreenContainer>
      <ContentWrapper>
        <TopText>This is top text.</TopText>
        <BottomText>This is bottom text.</BottomText>
      </ContentWrapper>
    </ScreenContainer>
  )
}
