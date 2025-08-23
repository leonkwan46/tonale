import React from 'react'
import { useColorScheme } from 'react-native'
import { Container, Description, Subtitle, Title } from './TheoryScreen.styles'

export function TheoryScreen() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Container colorScheme={colorScheme}>
      <Title colorScheme={colorScheme}>Music Theory</Title>
      <Subtitle colorScheme={colorScheme}>Learn the fundamentals of music</Subtitle>
      <Description colorScheme={colorScheme}>
        Explore scales, chords, harmony, and essential music theory concepts.
        Build your understanding of how music works from the ground up.
      </Description>
    </Container>
  )
}
