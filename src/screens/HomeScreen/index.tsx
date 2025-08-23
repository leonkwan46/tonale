import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Container, Description, Subtitle, Title } from './HomeScreen.styles'

export function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light'
  const { user } = useAuth()

  return (
    <Container colorScheme={colorScheme}>
      <Title colorScheme={colorScheme}>Welcome to Tonale</Title>
      <Subtitle colorScheme={colorScheme}>Your musical journey starts here</Subtitle>
      <Description colorScheme={colorScheme}>
        Practice music theory, develop your ear, and master the fundamentals.
        Start with any section and track your progress along the way.
      </Description>
    </Container>
  )
}