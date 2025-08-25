import { ScreenContainer } from '@/components'
import React from 'react'
// import { useAuth } from '@/hooks/useAuth' // TODO: Use when implementing personalization
import { Content, Description, Subtitle, Title } from './HomeScreen.styles'

export function HomeScreen() {
  // const { user } = useAuth() // TODO: Use user data when implementing personalization

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