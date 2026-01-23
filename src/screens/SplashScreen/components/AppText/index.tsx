import { useEffect } from 'react'
import {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated'
import {
    AppNameContainer,
    AppNameText,
    TaglineContainer,
    TaglineText
} from './AppText.styles'

interface AppTextProps {
  appName: string
  tagline: string
  isTransitioning: boolean
}

export const AppText = ({ appName, tagline, isTransitioning }: AppTextProps) => {
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
      <AppNameContainer style={appNameStyle}>
        <AppNameText>
          {appName}
        </AppNameText>
      </AppNameContainer>

      <TaglineContainer style={taglineStyle}>
        <TaglineText>
          {tagline}
        </TaglineText>
      </TaglineContainer>
    </>
  )
}

