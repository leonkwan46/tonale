import { Colors } from '@/constants/Colors'
import styled from '@emotion/native'
import { Link, Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export default function NotFoundScreen() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container colorScheme={colorScheme}>
        <Title colorScheme={colorScheme}>This screen does not exist.</Title>
        <StyledLink href="/" colorScheme={colorScheme}>
          <LinkText colorScheme={colorScheme}>Go to home screen!</LinkText>
        </StyledLink>
      </Container>
    </>
  )
}

const Container = styled.View<{ colorScheme: 'light' | 'dark' }>`
  flex: 1
  align-items: center
  justify-content: center
  padding: 20px
  background-color: ${props => Colors[props.colorScheme].background}
`

const Title = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 24px
  color: ${props => Colors[props.colorScheme].text}
  text-align: center
  margin-bottom: 16px
  font-family: "${getSourGummyFontFamily('bold')}"
`

const StyledLink = styled(Link)<{ colorScheme: 'light' | 'dark' }>`
  margin-top: 15px
  padding-vertical: 15px
`

const LinkText = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  color: ${props => Colors[props.colorScheme].primary}
  font-size: 16px
  text-decoration: underline
  font-family: "${getSourGummyFontFamily('400')}"
`
