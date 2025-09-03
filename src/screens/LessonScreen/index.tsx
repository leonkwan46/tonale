import { ScreenContainer } from '@/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { getLessonById } from '../TheoryScreen/sampleData'
import {
    BackButton,
    BackButtonText,
    Container,
    Content,
    ContentText,
    ContentTitle,
    Description,
    DescriptionContainer,
    ErrorText,
    Header,
    LessonContent,
    MetaContainer,
    MetaItem,
    MetaLabel,
    MetaValue,
    Title,
    TopicItem,
    TopicsContainer,
    TopicsTitle,
    TopicText
} from './LessonScreen.styles'

export function LessonScreen() {
  const router = useRouter()
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>()
  
  const lesson = lessonId ? getLessonById(lessonId) : null

  const handleBackPress = () => {
    router.back()
  }

  if (!lesson) {
    return (
      <ScreenContainer>
        <Container>
          <ErrorText>Lesson not found</ErrorText>
          <BackButton onPress={handleBackPress}>
            <BackButtonText>Go Back</BackButtonText>
          </BackButton>
        </Container>
      </ScreenContainer>
    )
  }

  return (
    <ScreenContainer>
      <Header>
        <BackButton onPress={handleBackPress}>
          <BackButtonText>← Back</BackButtonText>
        </BackButton>
        <Title>{lesson.title}</Title>
      </Header>
      
      <Content showsVerticalScrollIndicator={false}>
        <DescriptionContainer>
          <Description>{lesson.description}</Description>
        </DescriptionContainer>
        
        {lesson.topics && lesson.topics.length > 0 && (
          <TopicsContainer>
            <TopicsTitle>Topics Covered:</TopicsTitle>
            {lesson.topics.map((topic, index) => (
              <TopicItem key={index}>
                <TopicText>• {topic}</TopicText>
              </TopicItem>
            ))}
          </TopicsContainer>
        )}
        
        <MetaContainer>
          <MetaItem>
            <MetaLabel>Difficulty:</MetaLabel>
            <MetaValue>{lesson.difficulty}</MetaValue>
          </MetaItem>
          {lesson.estimatedTime && (
            <MetaItem>
              <MetaLabel>Estimated Time:</MetaLabel>
              <MetaValue>{lesson.estimatedTime} minutes</MetaValue>
            </MetaItem>
          )}
          <MetaItem>
            <MetaLabel>Stars Earned:</MetaLabel>
            <MetaValue>{lesson.stars}/3</MetaValue>
          </MetaItem>
        </MetaContainer>
        
        <LessonContent>
          <ContentTitle>Lesson Content</ContentTitle>
          <ContentText>
            This is where the actual lesson content would be displayed. 
            It could include interactive elements, videos, exercises, and more.
          </ContentText>
        </LessonContent>
      </Content>
    </ScreenContainer>
  )
}
