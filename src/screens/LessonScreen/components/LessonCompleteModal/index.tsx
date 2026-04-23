import { useDevice } from '@/hooks'
import { Button } from '@/compLib/Button'
import { Modal } from '@/compLib/Modal'
import {
  ButtonItem,
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
  const { isTablet } = useDevice()
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
<<<<<<< HEAD
      setAnimatedStars(0)
=======
      starAnimations.forEach(anim => anim.setValue(0))
>>>>>>> 3c8e88d (fix: LessonCompleteModal UX — 6 issues from review)
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

  const starSize = isTablet ? 'xl' : 'xxl'

  const renderStars = () => {
    return Array.from({ length: 3 }, (_, index) => {
      const willBeFilled = index < stars
      const isFilled = index < animatedStars
      const animation = starAnimations[index]

      const animatedStyle = willBeFilled
        ? {
            opacity: animation,
            transform: [{
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 1]
              })
            }]
          }
        : undefined

      return (
        <AnimatedStarContainer key={index} style={animatedStyle}>
          <StarIcon filled={isFilled} size={starSize} align="center">
            {isFilled ? '⭐' : '☆'}
          </StarIcon>
        </AnimatedStarContainer>
      )
    })
  }

  const isPerfect = stars === 3

  return (
    <Modal
      visible={visible}
      onRequestClose={onContinue}
      testID="lesson-complete-modal"
    >
      <TitleText size="lg">{getStarMessage(stars)}</TitleText>

      <StarContainer>{renderStars()}</StarContainer>

      <DescriptionText muted={false}>
        {getStarDescription(stars, totalQuestions, wrongAnswers)}
      </DescriptionText>

<<<<<<< HEAD
      <ButtonContainer singleButton={stars === 3}>
        {stars < 3 && (
=======
      <ButtonContainer singleButton={isPerfect}>
        {!isPerfect && (
>>>>>>> 3c8e88d (fix: LessonCompleteModal UX — 6 issues from review)
          <ButtonItem grow>
            <Button
              testID="lesson-complete-modal-retry-button"
              variant="outlined"
<<<<<<< HEAD
              size="sm"
=======
              size="md"
>>>>>>> 3c8e88d (fix: LessonCompleteModal UX — 6 issues from review)
              onPress={onRetry}
              label="Try Again"
            />
          </ButtonItem>
        )}

        <ButtonItem grow={!isPerfect}>
          <Button
            testID="lesson-complete-modal-continue-button"
            variant="filled"
            size="md"
            onPress={onContinue}
            label="Continue"
          />
        </ButtonItem>
      </ButtonContainer>
    </Modal>
  )
}
