import { ScreenContainer } from '@/sharedComponents/containers/ScreenContainer'
import { Content, Description, Subtitle, Title } from './AuralScreen.styles'

export const AuralScreen = () => {
  return (
    <ScreenContainer>
      <Content>
        <Title>Aural Training</Title>
        <Subtitle>Develop your musical ear</Subtitle>
        <Description>
          Practice interval recognition, chord identification, and melodic dictation.
          Train your ear to recognize musical patterns and structures.
        </Description>
      </Content>
    </ScreenContainer>
  )
}

