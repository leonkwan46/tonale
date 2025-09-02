import { useDevice } from '@/hooks';
import { DescriptionText, DescriptionTextContainer, TitleText } from './Description.styles';

interface DescriptionProps {
  title: string
  description: string
}

export const Description: React.FC<DescriptionProps> = ({ title, description }) => {

  const { isTablet } = useDevice()
    
  return (
    <DescriptionTextContainer>
        <TitleText isTablet={isTablet}>{title}</TitleText>
        <DescriptionText isTablet={isTablet}>{description}</DescriptionText>
    </DescriptionTextContainer>
  )
}