import { Link, Stack } from 'expo-router'
import styled from '@emotion/native'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

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
  font-weight: bold
  color: ${props => Colors[props.colorScheme].text}
  text-align: center
  margin-bottom: 16px
`

const StyledLink = styled(Link)<{ colorScheme: 'light' | 'dark' }>`
  margin-top: 15px
  padding-vertical: 15px
`

const LinkText = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  color: ${props => Colors[props.colorScheme].primary}
  font-size: 16px
  text-decoration: underline
`