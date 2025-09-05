import { Question } from '@/data/theoryData/types'
import React from 'react'
import { View } from 'react-native'
import { QuestionContainer, QuestionText } from './AnswerInterface/AnswerInterface.styles'
import { VisualQuestion } from './VisualQuestion'

interface QuestionDisplayProps {
  question: Question
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <View>
      <QuestionContainer>
        <QuestionText>
          {question.question}
        </QuestionText>
      </QuestionContainer>
      
      <VisualQuestion question={question} />
    </View>
  )
}
