import { useDevice } from '@/hooks'
import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import { getStarDescription, getStarMessage } from '@/utils/starCalculation'
import { useEffect, useRef } from 'react'
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
  const { isTablet } = useDevice()
  const starAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!visible) {
      starAnimations.forEach(anim => anim.setValue(0))
      timeoutRef.current.forEach(clearTimeout)
      timeoutRef.current = []
      return
    }

    starAnimations.forEach(anim => anim.setValue(0))
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []

    for (let i = 0; i < 3; i++) {
      const timeout = setTimeout(() => {
        Animated.timing(starAnimations[i], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }).start()
      }, (i + 1) * 500)
      timeoutRef.current.push(timeout)
    }

    return () => {
      timeoutRef.current.forEach(clearTimeout)
      timeoutRef.current = []
    }
  }, [visible, starAnimations])

  const starSize = isTablet ? 'xl' : 'xxl'

  const renderStars = () =>
    Array.from({ length: 3 }, (_, index) => {
      const isFilled = index < stars
      const animation = starAnimations[index]

      const animatedStyle = {
        opacity: animation,
        transform: [{
          scale: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1]
          })
        }]
      }

      return (
        <AnimatedStarContainer key={index} style={animatedStyle}>
          <StarIcon filled={isFilled} size={starSize} align="center">
            {isFilled ? '⭐' : '☆'}
          </StarIcon>
        </AnimatedStarContainer>
      )
    })

  const isPerfect = stars === 3

  return (
    <Modal
      visible={visible}
      onRequestClose={onContinue}
      animationType="none"
      testID="lesson-complete-modal"
    >
      <Modal.Title size="lg">{getStarMessage(stars)}</Modal.Title>

      <StarContainer>{renderStars()}</StarContainer>

      <Modal.Description muted={false}>
        {getStarDescription(stars, totalQuestions, wrongAnswers)}
      </Modal.Description>

      <Modal.Actions>
        {!isPerfect && (
          <Button
            testID="lesson-complete-modal-retry-button"
            variant="outlined"
            size="md"
            onPress={onRetry}
            label="Try Again"
          />
        )}
        <Button
          testID="lesson-complete-modal-continue-button"
          variant="filled"
          size="md"
          onPress={onContinue}
          label="Continue"
        />
      </Modal.Actions>
    </Modal>
  )
}
