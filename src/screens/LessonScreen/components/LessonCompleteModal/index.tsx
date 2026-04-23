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
import { Animated, Text } from 'react-native'
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

  const renderStarDisplay = () => {
    if (stars === 0) {
      return (
        <StarContainer>
          <Text style={{ fontSize: isTablet ? 48 : 64, marginBottom: 12 }}>
            📚
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', opacity: 0.7 }}>
            Keep practising to unlock stars!
          </Text>
        </StarContainer>
      )
    }

    return (
      <StarContainer>
        {Array.from({ length: 3 }, (_, index) => {
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
              <StarIcon
                filled={isFilled}
                size={isTablet ? 'xl' : 'xxl'}
                align="center"
              >
                {isFilled ? '⭐' : '☆'}
              </StarIcon>
            </AnimatedStarContainer>
          )
        })}
      </StarContainer>
    )
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={onRetry}
      testID="lesson-complete-modal"
    >
      <TitleText>{getStarMessage(stars)}</TitleText>

      {renderStarDisplay()}

      <DescriptionText>
        {getStarDescription(stars, totalQuestions, wrongAnswers)}
      </DescriptionText>

      <ButtonContainer>
        <ButtonItem grow>
          <Button
            testID="lesson-complete-modal-retry-button"
            variant="outlined"
            size="sm"
            onPress={onRetry}
            label="Try Again"
          />
        </ButtonItem>

        <ButtonItem grow>
          <Button
            testID="lesson-complete-modal-continue-button"
            variant="filled"
            size="sm"
            onPress={onContinue}
            label="Continue"
          />
        </ButtonItem>
      </ButtonContainer>
    </Modal>
  )
}
