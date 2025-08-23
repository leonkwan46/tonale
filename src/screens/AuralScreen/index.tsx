import React from 'react'
import { useColorScheme } from 'react-native'
import { Container, Description, Subtitle, Title } from './AuralScreen.styles'

export function AuralScreen() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Container colorScheme={colorScheme}>
      <Title colorScheme={colorScheme}>Aural Training</Title>
      <Subtitle colorScheme={colorScheme}>Develop your musical ear</Subtitle>
      <Description colorScheme={colorScheme}>
        Practice interval recognition, chord identification, and melodic dictation.
        Train your ear to recognize musical patterns and structures.
      </Description>
    </Container>
  )
}

