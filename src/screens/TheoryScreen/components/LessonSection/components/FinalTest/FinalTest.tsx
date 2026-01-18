import {
  FinalTestContainer,
  FinalTestContent,
  FinalTestDepth,
  FinalTestDescription,
  FinalTestGradient,
  FinalTestIconContainer,
  FinalTestTextContainer,
  FinalTestTitle
} from './FinalTest.styles'
import { ScrollIcon } from './ScrollIcon'

interface FinalTestProps {
  title: string
  description: string
  isPressed?: boolean
  testID?: string
}

export const FinalTest = ({ 
  isPressed = false, 
  title,
  description,
  testID
}: FinalTestProps) => {
  return (
<FinalTestContainer testID={testID} isPressed={isPressed} isLocked={false}>
  <FinalTestDepth />
  <FinalTestContent isLocked={false}>
    <FinalTestGradient />
    <FinalTestIconContainer>
      <ScrollIcon size={24} />
    </FinalTestIconContainer>
    <FinalTestTextContainer>
      <FinalTestTitle>{title}</FinalTestTitle>
      {description && <FinalTestDescription>{description}</FinalTestDescription>}
    </FinalTestTextContainer>
  </FinalTestContent>
</FinalTestContainer>
  )
}
