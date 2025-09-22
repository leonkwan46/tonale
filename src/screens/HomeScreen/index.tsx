import { ScreenContainer } from '@/sharedComponents'
import React from 'react'
import { Content, Description, Subtitle, Title } from './HomeScreen.styles'

export function HomeScreen() {
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