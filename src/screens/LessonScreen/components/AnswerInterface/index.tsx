import { Question } from '@/data/theoryData/types'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { VisualQuestion } from '../VisualQuestion'
import { AnswerInterfaceContainer, ExplanationContainer, ExplanationText, QuestionContainer, QuestionText } from './AnswerInterface.styles'
import { KeyPress } from './QuestionTypes/KeyPress'
import { MultipleChoice } from './QuestionTypes/MultipleChoice'
import { TrueFalse } from './QuestionTypes/TrueFalse'
import { QUESTION_TYPE, QuestionType } from './QuestionTypes/types'

interface AnswerInterfaceProps {
  questionType: QuestionType
  questionData: Question
  onAnswerSubmit: (isCorrect: boolean) => void
  onNextQuestion: () => void
}

export const AnswerInterface: React.FC<AnswerInterfaceProps> = ({ 
  questionType,
  questionData,
  onAnswerSubmit,
  onNextQuestion
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [currentQuestionId, setCurrentQuestionId] = useState(questionData.id)

  // Reset state when questionData changes (new question)
  useEffect(() => {
    console.log('🔄 Question changed, resetting state')
    console.log('🔄 Previous question ID:', currentQuestionId)
    console.log('🔄 New question ID:', questionData.id)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsCorrect(null)
    setShowCorrectAnswer(false)
    setCurrentQuestionId(questionData.id)
  }, [questionData.id])

  // ==========================
  // Handle Wrong Answer
  // ==========================
  useEffect(() => {
    if (showResult && !isCorrect && selectedAnswer !== null && !showCorrectAnswer) {
      console.log('❌ Wrong answer useEffect triggered, setting 3s timer')
      setShowCorrectAnswer(true)
      const timer = setTimeout(() => {
        console.log('❌ Wrong answer timer fired, calling onNextQuestion')
        onNextQuestion()
      }, 3000) // 3 seconds delay

      return () => {
        console.log('❌ Wrong answer timer cleaned up')
        clearTimeout(timer)
      }
    }
  }, [showResult, isCorrect, selectedAnswer])

  // ==========================
  // Handle Correct Answer
  // ==========================
  useEffect(() => {
    if (showResult && isCorrect && selectedAnswer !== null) {
      console.log('✅ Correct answer useEffect triggered, setting 1.5s timer')
      const timer = setTimeout(() => {
        console.log('✅ Correct answer timer fired, calling onNextQuestion')
        onNextQuestion()
      }, 1500) // 1.5 seconds for correct answer

      return () => {
        console.log('✅ Correct answer timer cleaned up')
        clearTimeout(timer)
      }
    }
  }, [showResult, isCorrect, selectedAnswer])

  const handleChoiceSelect = (choice: string) => {
    if (selectedAnswer !== null) return // Already answered
    
    console.log('🎯 Choice selected:', choice)
    setSelectedAnswer(choice)
    const correct = choice === questionData.correctAnswer
    console.log('🎯 Answer is correct:', correct)
    console.log('🎯 Correct answer should be:', questionData.correctAnswer)
    setIsCorrect(correct)
    setShowResult(true)
    
    // Call parent callback
    onAnswerSubmit(correct)
    console.log('🎯 State set - showResult:', true, 'isCorrect:', correct, 'selectedAnswer:', choice)
  }

  const renderAnswerComponent = () => {
    switch (questionType) {
      case QUESTION_TYPE.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            key={questionData.id}
            choices={questionData.choices}
            correctAnswer={questionData.correctAnswer}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            showCorrectAnswer={showCorrectAnswer}
            onChoiceSelect={handleChoiceSelect}
          />
        )
      case QUESTION_TYPE.TRUE_FALSE:
        return <TrueFalse />
      case QUESTION_TYPE.KEY_PRESS:
        return <KeyPress />
      default:
        return <Text>Unknown question type</Text>
    }
  }

  return (
    <AnswerInterfaceContainer>
      <QuestionContainer>
        <QuestionText>
          {questionData.question}
        </QuestionText>
      </QuestionContainer>
      
      <VisualQuestion question={questionData} />
      
      {renderAnswerComponent()}
      
      {showResult && questionData.explanation && (
        <ExplanationContainer>
          <ExplanationText isCorrect={isCorrect || false}>
            {questionData.explanation}
          </ExplanationText>
        </ExplanationContainer>
      )}
    </AnswerInterfaceContainer>
  )
}

