import { ScreenContainer } from '@/sharedComponents'
import React, { useEffect } from 'react'
import { loadSMuFLFonts } from '../../utils/fontLoader'
import { Content, Description, Subtitle, Title } from './HomeScreen.styles'

export function HomeScreen() {
  useEffect(() => {
    const loadFonts = async () => {
      await loadSMuFLFonts()
    }
    loadFonts()
  }, [])

  return (
    <ScreenContainer>
      <Content>
        <Title>Welcome to Tonale</Title>
        <Subtitle>Your musical journey starts here</Subtitle>
        <Description>
          Practice music theory, develop your ear, and master the fundamentals.
          Start with any section and track your progress along the way.
        </Description>
      </Content>
    </ScreenContainer>
  )
}