import { Depth3D } from '@/compLib/Depth3D'
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
        <Depth3D
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
                <FinalTestTitle size="lg" weight="bold">
                  {title}
                </FinalTestTitle>
                {description && (
                  <FinalTestDescription size="sm" weight="semibold">
                    {description}
                  </FinalTestDescription>
                )}
              </FinalTestTextWrapper>
            </FinalTestContentContainer>
          )}
        </Depth3D>
      </FinalTestButtonContainer>
    </FinalTestWrapper>
  )
}
