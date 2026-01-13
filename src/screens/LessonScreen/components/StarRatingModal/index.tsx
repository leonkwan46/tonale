import { useDevice } from '@/hooks'
import { Modal } from '@/sharedComponents/Modal'
import {
  ButtonContainer,
  DescriptionText,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalOverlay,
  TitleText
} from '@/sharedComponents/Modal/Modal.styles'
import { getStarDescription, getStarMessage } from '@/utils/starCalculation'
import { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import {
  AnimatedStarContainer,
  StarContainer,
  StarIcon
} from './StarRatingModal.styles'

interface StarRatingModalProps {
  visible: boolean
  stars: number
  totalQuestions: number
  wrongAnswers: number
  onContinue: () => void
  onRetry: () => void
}

export const StarRatingModal = ({
  visible,
  stars,
  totalQuestions,
  wrongAnswers,
  onContinue,
  onRetry
}: StarRatingModalProps) => {
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
          <StarIcon filled={isFilled} isTablet={isTablet}>
            {isFilled ? '⭐' : '☆'}
          </StarIcon>
        </AnimatedStarContainer>
      )
    })
  }

  return (
    <Modal visible={visible} onRequestClose={onRetry}>
      <ModalOverlay>
        <ModalContainer isTablet={isTablet}>
          <TitleText isTablet={isTablet}>
            {getStarMessage(stars)}
          </TitleText>
          
          <StarContainer isTablet={isTablet}>
            {renderStars()}
          </StarContainer>
          
          <DescriptionText isTablet={isTablet}>
            {getStarDescription(stars, totalQuestions, wrongAnswers)}
          </DescriptionText>
          
          <ButtonContainer isTablet={isTablet}>
            <ModalButton
              testID="retry-button"
              variant="outlined"
              isTablet={isTablet}
              onPress={onRetry}
            >
              <ModalButtonText variant="outlined" isTablet={isTablet}>
                Retry
              </ModalButtonText>
            </ModalButton>
            
            <ModalButton
              testID="continue-button"
              variant="filled"
              isTablet={isTablet}
              onPress={onContinue}
            >
              <ModalButtonText variant="filled" isTablet={isTablet}>
                Continue
              </ModalButtonText>
            </ModalButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  )
}
