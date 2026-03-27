import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonContainer,
  DescriptionText,
  TitleText
} from '@/compLib/Modal/Modal.styles'
import { getStarDescription, getStarMessage } from '@/utils/starCalculation'
import { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import {
  AnimatedStarContainer,
  StarContainer,
  StarIcon
} from './LessonCompleteModal.styles'

interface LessonCompleteModalProps {
  visible: boolean
  stars: number
  totalQuestions: number
  wrongAnswers: number
  onContinue: () => void
  onRetry: () => void
}

export const LessonCompleteModal = ({
  visible,
  stars,
  totalQuestions,
  wrongAnswers,
  onContinue,
  onRetry
}: LessonCompleteModalProps) => {
  const [animatedStars, setAnimatedStars] = useState(0)
  const starAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!visible) {
      setAnimatedStars(0)
      starAnimations.forEach(anim => anim.setValue(0))
      timeoutRef.current.forEach(clearTimeout)
      timeoutRef.current = []
      return
    }

    if (stars === 0) {
      setAnimatedStars(0)
      starAnimations.forEach(anim => anim.setValue(0.1))
      return
    }

    setAnimatedStars(0)
    starAnimations.forEach(anim => anim.setValue(0))
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []

    for (let i = 1; i <= stars; i++) {
      const timeout = setTimeout(() => {
        setAnimatedStars(i)
        Animated.timing(starAnimations[i - 1], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }).start()
      }, i * 500)
      timeoutRef.current.push(timeout)
    }

    return () => {
      timeoutRef.current.forEach(clearTimeout)
      timeoutRef.current = []
    }
  }, [visible, stars, starAnimations])

  const renderStars = () => {
    return Array.from({ length: 3 }, (_, index) => {
      const isFilled = index < animatedStars
      const animation = starAnimations[index]

      return (
        <AnimatedStarContainer
          key={index}
          style={{
            opacity: animation,
            transform: [{
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1]
              })
            }]
          }}
        >
          <StarIcon filled={isFilled}>
            {isFilled ? '⭐' : '☆'}
          </StarIcon>
        </AnimatedStarContainer>
      )
    })
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onRetry}
      testID="lesson-complete-modal"
    >
      <TitleText>{getStarMessage(stars)}</TitleText>

      <StarContainer>{renderStars()}</StarContainer>

      <DescriptionText>
        {getStarDescription(stars, totalQuestions, wrongAnswers)}
      </DescriptionText>

      <ButtonContainer>
        <Button
          testID="lesson-complete-modal-retry-button"
          variant="outlined"
          size="sm"
          rowLayout="pair"
          onPress={onRetry}
          label="Retry"
        />

        <Button
          testID="lesson-complete-modal-continue-button"
          variant="filled"
          size="sm"
          rowLayout="pair"
          onPress={onContinue}
          label="Continue"
        />
      </ButtonContainer>
    </Modal>
  )
}
