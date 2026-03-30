import { DescriptionText, DescriptionTextContainer, TitleText } from './Description.styles'

interface DescriptionProps {
  title: string
  description: string
  testID?: string
}

export const Description = ({ title, description, testID }: DescriptionProps) => {
  return (
    <DescriptionTextContainer>
      <TitleText
        testID={testID}
        size="lg"
        weight="bold"
      >
        {title}
      </TitleText>
      <DescriptionText size="md">
        {description}
      </DescriptionText>
    </DescriptionTextContainer>
  )
}
