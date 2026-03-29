import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { scale } from 'react-native-size-matters'
import {
  MessageContainer,
  MessageOverlay,
  MessageText,
  SpacerView
} from '@/screens/TheoryScreen/TheoryScreenBody/TheoryScreenBody.styles'

import {
  CloudLayer,
  CloudsContainer,
  GradientOverlay,
  useTopCloudsCoverCloudShapes
} from './TopCloudsCover.styles'

interface TopCloudsCoverProps {
  coverHeight?: number
  message?: string | null
  reserveLayoutSpace?: boolean
}

export const TopCloudsCover = ({
  coverHeight = scale(180),
  message = null,
  reserveLayoutSpace = false
}: TopCloudsCoverProps) => {
  const cloudShapes = useTopCloudsCoverCloudShapes()
  const cloudAnimations = useRef(
    cloudShapes.map(() => new Animated.Value(Math.random()))
  ).current

  useEffect(() => {
    const animations = cloudAnimations.map((animValue, index) => {
      const baseDuration = 15000 + index * 2000
      const easingTypes = [
        Easing.inOut(Easing.sin),
        Easing.inOut(Easing.quad),
        Easing.inOut(Easing.cubic),
        Easing.linear
      ]
      const easing = easingTypes[index % easingTypes.length]

      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: baseDuration,
            easing,
            useNativeDriver: true
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: baseDuration + index * 1000,
            easing,
            useNativeDriver: true
          })
        ])
      )
    })
    animations.forEach(anim => anim.start())

    return () => animations.forEach(anim => anim.stop())
  }, [cloudAnimations])

  return (
    <>
      <CloudsContainer coverHeight={coverHeight}>
        {cloudShapes.map((cloud, index) => {
          const verticalRange = scale(5 + (index % 3) * 3)
          const horizontalRange = scale(30 + (index % 5) * 15)
          const verticalDirection = index % 3 === 0 ? 1 : -1
          const horizontalDirection = index % 2 === 0 ? 1 : -1

          const animatedStyle = {
            transform: [
              {
                translateY: cloudAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, verticalRange * verticalDirection]
                })
              },
              {
                translateX: cloudAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, horizontalRange * horizontalDirection]
                })
              }
            ]
          }

          return (
            <CloudLayer
              key={index}
              backgroundColor={cloud.color}
              height={scale(40 + (index % 3) * 15)}
              borderRadius={scale(25)}
              style={[
                {
                  width: cloud.width,
                  left: cloud.left,
                  top: scale(cloud.top)
                },
                animatedStyle
              ]}
            />
          )
        })}

        <GradientOverlay
          coverHeight={coverHeight}
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.64)', 'rgba(255, 255, 255, 0)']}
          locations={[0, 0.5, 1]}
        />
        {message != null && message !== '' && (
          <MessageOverlay>
            <MessageContainer>
              <MessageText size="sm" align="center">
                {message}
              </MessageText>
            </MessageContainer>
          </MessageOverlay>
        )}
      </CloudsContainer>
      {reserveLayoutSpace && <SpacerView />}
    </>
  )
}
