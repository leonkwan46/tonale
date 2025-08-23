import styled from '@emotion/native'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Container colorScheme={colorScheme}>
      <Title colorScheme={colorScheme}>Welcome to tonale</Title>
      <Subtitle colorScheme={colorScheme}>Your musical journey starts here</Subtitle>
      <Description colorScheme={colorScheme}>
        This is the home screen. We&apos;ll add content here as we build out the app.
      </Description>
    </Container>
  )
}

const Container = styled.View<{ colorScheme: 'light' | 'dark' }>`
  flex: 1
  justify-content: center
  align-items: center
  background-color: ${props => Colors[props.colorScheme].background}
  padding: 20px
`

const Title = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 32px
  font-weight: bold
  color: ${props => Colors[props.colorScheme].text}
  margin-bottom: 16px
  text-align: center
`

const Subtitle = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 18px
  color: ${props => Colors[props.colorScheme].text}
  margin-bottom: 24px
  text-align: center
  opacity: 0.8
`

const Description = styled.Text<{ colorScheme: 'light' | 'dark' }>`
  font-size: 16px
  color: ${props => Colors[props.colorScheme].text}
  text-align: center
  opacity: 0.6
  line-height: 24px
`