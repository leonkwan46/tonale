import { Colors, ColorScheme } from '@/constants/Colors'
import styled from '@emotion/native'
import React, { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated'

interface AppTextProps {
  appName: string
  tagline: string
  colorScheme: ColorScheme
  isTransitioning: boolean
}

export function AppText({ appName, tagline, colorScheme, isTransitioning }: AppTextProps) {
  
  // Animation values
  const appNameOpacity = useSharedValue(0)
  const appNameTranslateY = useSharedValue(20)
  const taglineOpacity = useSharedValue(0)
  const taglineTranslateY = useSharedValue(20)

  useEffect(() => {
    // App name animation
    appNameOpacity.value = withDelay(
      600,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease)
      })
    )
    
    appNameTranslateY.value = withDelay(
      600,
      withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease)
      })
    )

    // Tagline animation (after app name)
    taglineOpacity.value = withDelay(
      1200,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.ease)
      })
    )
    
    taglineTranslateY.value = withDelay(
      1200,
      withTiming(0, {
        duration: 800,
        easing: Easing.out(Easing.ease)
      })
    )
  }, [appNameOpacity, appNameTranslateY, taglineOpacity, taglineTranslateY])

  const appNameStyle = useAnimatedStyle(() => ({
    opacity: isTransitioning ? withTiming(0, { duration: 500 }) : appNameOpacity.value,
    transform: [{ translateY: appNameTranslateY.value }]
  }))

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: isTransitioning ? withTiming(0, { duration: 500 }) : taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }]
  }))

  return (
    <>
      {/* App Name */}
      <AppNameContainer style={appNameStyle}>
        <AppNameText colorScheme={colorScheme}>
          {appName}
        </AppNameText>
      </AppNameContainer>

      {/* Tagline */}
      <TaglineContainer style={taglineStyle}>
        <TaglineText colorScheme={colorScheme}>
          {tagline}
        </TaglineText>
      </TaglineContainer>
    </>
  )
}

// Styled Components
const AppNameContainer = styled(Animated.View)``

const AppNameText = styled.Text<{ colorScheme: ColorScheme }>`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
  color: ${props => Colors[props.colorScheme].text};
`

const TaglineContainer = styled(Animated.View)``

const TaglineText = styled.Text<{ colorScheme: ColorScheme }>`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 40px;
  line-height: 22px;
  opacity: 0.8;
  color: ${props => Colors[props.colorScheme].icon};
`
