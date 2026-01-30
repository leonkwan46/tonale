import * as React from 'react'
import { HeaderContainer, Subtitle, Title } from './OnboardingHeader.styles'

const OnboardingHeaderComponent = () => {
  return (
    <HeaderContainer>
      <Title>Welcome to Tonalè!</Title>
      <Subtitle>Let&apos;s set things up for you!</Subtitle>
    </HeaderContainer>
  )
}

export const OnboardingHeader = React.memo(OnboardingHeaderComponent)

