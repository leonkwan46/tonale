import { getStarDescription, getStarMessage } from '@/utils/starCalculation'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { useDevice } from '../../hooks'
import {
    AnimatedStarContainer,
    ButtonContainer,
    DescriptionText,
    ModalButton,
    ModalButtonText,
    ModalContainer,
    ModalOverlay,
    StarContainer,
    StarIcon,
    TitleText
} from './StarRatingModal.styles'
import { StarRatingModalProps } from './types'

export const StarRatingModal: React.FC<StarRatingModalProps> = ({
  stars,
  totalQuestions,
  wrongAnswers,
  onContinue,
  onRetry
}) => {
  const { isTablet } = useDevice()
  const [animatedStars, setAnimatedStars] = useState(0)
  const [starAnimations] = useState(() => [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ])

  // Animate stars filling up one by one
  useEffect(() => {
    if (stars === 0) {
      setAnimatedStars(0)
      // For 0 stars, show empty containers with minimal opacity
      starAnimations.forEach(anim => anim.setValue(0.1))
      return
    }

    // Reset to 0 first
    setAnimatedStars(0)
    starAnimations.forEach(anim => anim.setValue(0))
    
    // Then animate each star with delay
    const timeouts: ReturnType<typeof setTimeout>[] = []
    
    for (let i = 1; i <= stars; i++) {
      const timeout = setTimeout(() => {
        setAnimatedStars(i)
        // Animate the star with scale and fade
        Animated.sequence([
          Animated.timing(starAnimations[i - 1], {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          })
        ]).start()
      }, i * 500) // 500ms delay for each star
      timeouts.push(timeout)
    }

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [stars, starAnimations])

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
  )
}
