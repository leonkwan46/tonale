import * as React from 'react'
import { HeaderContainer, Subtitle, Title } from './OnboardingHeader.styles'

const OnboardingHeaderComponent = () => {
  return (
    <HeaderContainer>
      <Title>Welcome to Tonalè!</Title>
      <Subtitle>Tell us a bit about yourself to get started</Subtitle>
    </HeaderContainer>
  )
}

export const OnboardingHeader = React.memo(OnboardingHeaderComponent)

