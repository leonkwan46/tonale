import { Button3D } from '@/sharedComponents/Button3D'
import {
  FinalTestButtonContainer,
  FinalTestContentContainer,
  FinalTestDescription,
  FinalTestGradient,
  FinalTestIconContainer,
  FinalTestTextWrapper,
  FinalTestTitle,
  FinalTestWrapper
} from './FinalTestButton.styles'
import { ScrollIcon } from './ScrollIcon'

interface FinalTestButtonProps {
  title: string
  description: string
  onPress: () => void
  disabled?: boolean
  testID?: string
}

export const FinalTestButton = ({
  title,
  description,
  onPress,
  disabled = false,
  testID
}: FinalTestButtonProps) => {
  return (
    <FinalTestWrapper>
      <FinalTestButtonContainer>
        <Button3D
          onPress={onPress}
          disabled={disabled}
          testID={testID}
          fullWidth={true}
          color="finalTest"
        >
          {() => (
            <FinalTestContentContainer>
              <FinalTestGradient />
              <FinalTestIconContainer>
                <ScrollIcon size={24} />
              </FinalTestIconContainer>
              <FinalTestTextWrapper>
                <FinalTestTitle>{title}</FinalTestTitle>
                {description && <FinalTestDescription>{description}</FinalTestDescription>}
              </FinalTestTextWrapper>
            </FinalTestContentContainer>
          )}
        </Button3D>
      </FinalTestButtonContainer>
    </FinalTestWrapper>
  )
}
