import styled from '@emotion/native'
import { useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function LearnScreen() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Container colorScheme={colorScheme}>
      <Title colorScheme={colorScheme}>Learn Music</Title>
      <Subtitle colorScheme={colorScheme}>Practice exercises and improve your skills</Subtitle>
      <Description colorScheme={colorScheme}>
        This will be the main learning screen where users can access music exercises.
        We&apos;ll migrate the LearnScreen components here.
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