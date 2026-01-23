import { Button3D } from '@/sharedComponents/Button3D'
import { useTheme } from '@emotion/react'
import {
  FinalTestDescription,
  FinalTestGradient,
  FinalTestIconContainer,
  FinalTestTextContainer,
  FinalTestTitle,
  FinalTestWrapper,
  getFinalTestCustomStyles
} from './FinalTest.styles'
import { ScrollIcon } from './ScrollIcon'

interface FinalTestProps {
  title: string
  description: string
  onPress: () => void
  disabled?: boolean
  isLocked?: boolean
  testID?: string
}

export const FinalTest = ({
  title,
  description,
  onPress,
  disabled = false,
  isLocked = false,
  testID
}: FinalTestProps) => {
  const theme = useTheme()
  const customStyles = getFinalTestCustomStyles(theme)

  return (
    <FinalTestWrapper isLocked={isLocked}>
      <Button3D
        onPress={onPress}
        disabled={disabled}
        testID={testID}
        fullWidth={true}
        customStyles={customStyles}
      >
        {() => (
          <>
            <FinalTestGradient />
            <FinalTestIconContainer>
              <ScrollIcon size={24} />
            </FinalTestIconContainer>
            <FinalTestTextContainer>
              <FinalTestTitle>{title}</FinalTestTitle>
              {description && <FinalTestDescription>{description}</FinalTestDescription>}
            </FinalTestTextContainer>
          </>
        )}
      </Button3D>
    </FinalTestWrapper>
  )
}
