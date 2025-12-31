import * as React from 'react'
import { Subtitle, Title } from './OnboardingHeader.styles'

const OnboardingHeaderComponent: React.FC = () => {
  return (
    <>
      <Title>Welcome to Tonalè!</Title>
      <Subtitle>Tell us a bit about yourself to get started</Subtitle>
    </>
  )
}

export const OnboardingHeader = React.memo(OnboardingHeaderComponent)

