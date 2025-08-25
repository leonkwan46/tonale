import { LessonSection } from '../LessonSection/LessonSection'
import { ContentContainer, ContentWrapper } from './TheoryScreenBody.styles'

export const TheoryScreenBody = () => {
  return (
    <ContentWrapper>
      <ContentContainer>
        <LessonSection />
        <LessonSection />
        <LessonSection />
        <LessonSection />
        <LessonSection />
        <LessonSection />
      </ContentContainer>
    </ContentWrapper>
  )
}