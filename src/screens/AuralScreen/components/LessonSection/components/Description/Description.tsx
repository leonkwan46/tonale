import { useDevice } from '@/hooks'
import { DescriptionText, DescriptionTextContainer, TitleText } from './Description.styles'

interface DescriptionProps {
  title: string
  description: string
  testID?: string
}

export const Description: React.FC<DescriptionProps> = ({ title, description, testID }) => {

  const { isTablet } = useDevice()
    
  return (
    <DescriptionTextContainer>
        <TitleText testID={testID} isTablet={isTablet}>{title}</TitleText>
        <DescriptionText isTablet={isTablet}>{description}</DescriptionText>
    </DescriptionTextContainer>
  )
}
