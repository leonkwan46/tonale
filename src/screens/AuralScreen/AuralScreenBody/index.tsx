import { useProgress, useSafeNavigation } from '@/hooks'
import { getAllAuralStages } from '@/subjects/aural/curriculum/stages/helpers'
import { ScrollView } from 'react-native'
import {
  ContentContainer,
  LessonCard,
  LessonDescription,
  LessonTitle,
  ScreenTitle,
  StageContainer,
  StageTitle
} from './AuralScreenBody.styles'

export const AuralScreenBody = () => {
  const { progressData } = useProgress()
  const { navigate } = useSafeNavigation()
  const stages = getAllAuralStages()

  const handleLessonPress = (lessonId: string) => {
    navigate(`/lesson?lessonId=${lessonId}&from=aural`)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ContentContainer>
        <ScreenTitle>Aural Training</ScreenTitle>

        {stages.map(stage => {
          const lessonsWithProgress = stage.lessons.map(lesson => ({
            ...lesson,
            stars: progressData[lesson.id]?.stars ?? lesson.stars ?? 0,
            isLocked: progressData[lesson.id]?.isLocked ?? lesson.isLocked ?? false
          }))

          return (
            <StageContainer key={stage.id}>
              <StageTitle>{stage.title}</StageTitle>

              {lessonsWithProgress.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  onPress={() => handleLessonPress(lesson.id)}
                  disabled={lesson.isLocked}
                  isLocked={lesson.isLocked}
                >
                  <LessonTitle isLocked={lesson.isLocked}>
                    {lesson.title}
                    {lesson.stars && lesson.stars > 0 ? ` ⭐️ ${lesson.stars}` : ''}
                    {lesson.isLocked ? ' 🔒' : ''}
                  </LessonTitle>
                  <LessonDescription isLocked={lesson.isLocked}>
                    {lesson.description}
                  </LessonDescription>
                </LessonCard>
              ))}
            </StageContainer>
          )
        })}
      </ContentContainer>
    </ScrollView>
  )
}
