import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Easing } from 'react-native'
import { scale } from 'react-native-size-matters'

const { width: screenWidth } = Dimensions.get('window')

interface TopCloudsCoverProps {
  isCleared: boolean
  coverHeight?: number
}

const CloudsContainer = styled.View<{ isVisible: boolean; coverHeight: number }>(({ isVisible, coverHeight }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: coverHeight,
  opacity: isVisible ? 1 : 0,
  pointerEvents: isVisible ? 'auto' : 'none',
  zIndex: 10,
  overflow: 'hidden'
}))

const CloudLayer = styled(Animated.View)<{ 
  backgroundColor: string
  height: number
  borderRadius: number
}>(({ backgroundColor, height, borderRadius }) => ({
  position: 'absolute',
  backgroundColor,
  height,
  borderRadius,
  opacity: 0.8
}))

const GradientOverlay = styled(LinearGradient)<{ coverHeight: number }>(({ coverHeight }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: coverHeight,
  zIndex: 1
}))

const cloudShapes = [
  // Top layer - distributed across full width
  { width: screenWidth * 0.4, left: -25, top: 5, color: '#f0f8ff' },
  { width: screenWidth * 0.65, left: screenWidth * 0.25, top: 10, color: '#e6f3ff' },
  { width: screenWidth * 0.5, left: screenWidth * 0.7, top: 15, color: '#eaf4ff' },
  
  // Upper-middle layer - left, center, right coverage
  { width: screenWidth * 0.7, left: -30, top: 35, color: '#ddeeff' },
  { width: screenWidth * 0.6, left: screenWidth * 0.1, top: 30, color: '#f5faff' },
  { width: screenWidth * 0.45, left: screenWidth * 0.6, top: 40, color: '#e6f3ff' },
  
  // Lower-middle layer - balanced spacing
  { width: screenWidth * 0.5, left: -20, top: 60, color: '#d5e9ff' },
  { width: screenWidth * 0.55, left: screenWidth * 0.3, top: 55, color: '#eaf4ff' },
  { width: screenWidth * 0.3, left: screenWidth * 0.75, top: 65, color: '#ddeeff' },
  
  // Bottom layer - moderate coverage
  { width: screenWidth * 0.6, left: -30, top: 85, color: '#cce6ff' },
  { width: screenWidth * 0.7, left: screenWidth * 0.15, top: 80, color: '#d5e9ff' },
  
  // Extended lower clouds - create gradual fade
  { width: screenWidth * 0.4, left: screenWidth * 0.05, top: 100, color: '#e6f3ff' },
  // { width: screenWidth * 0.35, left: screenWidth * 0.5, top: 110, color: '#f0f8ff' },
  { width: screenWidth * 0.3, left: screenWidth * 0.7, top: 105, color: '#eaf4ff' },
  
  // Wispy bottom clouds - very light
  { width: screenWidth * 0.4, left: 10, top: 120, color: '#f5faff' },
  { width: screenWidth * 0.6, left: screenWidth * 0.3, top: 110, color: '#f8fcff' },
  { width: screenWidth * 0.4, left: screenWidth * 0.8, top: 130, color: '#f5faff' }
]

export const TopCloudsCover: React.FC<TopCloudsCoverProps> = ({
  isCleared,
  coverHeight = scale(180) 
}) => {
  // Create all Animated.Values at once
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

    // Start them *all* together
    animations.forEach(anim => anim.start())

    return () => animations.forEach(anim => anim.stop())
  }, [cloudAnimations])

  return (
    <CloudsContainer isVisible={!isCleared} coverHeight={coverHeight}>
      {/* Cloud shapes */}
      {cloudShapes.map((cloud, index) => {
        const verticalRange = scale(5 + (index % 3) * 3) // Reduced vertical: 5-11 units
        const horizontalRange = scale(30 + (index % 5) * 15) // Increased horizontal: 30-90 units
        
        // Some clouds move in opposite directions for variety
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
            height={scale(40 + (index % 3) * 15)} // Varying heights
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
    </CloudsContainer>
  )
}
