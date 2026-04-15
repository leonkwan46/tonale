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
  EnvironmentContainer,
  EnvironmentText,
  TaglineContainer,
  TaglineText
} from './AppText.styles'

interface AppTextProps {
  appName: string;
  tagline: string;
  isTransitioning: boolean;
  /** Shown under the app name; omit on production (pass `null`). */
  environmentLabel?: string | null;
}

export const AppText = ({
  appName,
  tagline,
  isTransitioning,
  environmentLabel = null
}: AppTextProps) => {
  // Animation values
  const appNameOpacity = useSharedValue(0)
  const appNameTranslateY = useSharedValue(20)
  const taglineOpacity = useSharedValue(0)
  const taglineTranslateY = useSharedValue(20)
  const envLabelOpacity = useSharedValue(0)
  const envLabelTranslateY = useSharedValue(12)

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

  useEffect(() => {
    if (!environmentLabel) return
    envLabelOpacity.value = withDelay(
      900,
      withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.ease)
      })
    )
    envLabelTranslateY.value = withDelay(
      900,
      withTiming(0, {
        duration: 700,
        easing: Easing.out(Easing.ease)
      })
    )
  }, [environmentLabel, envLabelOpacity, envLabelTranslateY])

  const appNameStyle = useAnimatedStyle(() => ({
    opacity: isTransitioning
      ? withTiming(0, { duration: 500 })
      : appNameOpacity.value,
    transform: [{ translateY: appNameTranslateY.value }]
  }))

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: isTransitioning
      ? withTiming(0, { duration: 500 })
      : taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }]
  }))

  const envLabelStyle = useAnimatedStyle(() => ({
    opacity: isTransitioning
      ? withTiming(0, { duration: 500 })
      : envLabelOpacity.value,
    transform: [{ translateY: envLabelTranslateY.value }]
  }))

  return (
    <>
      <AppNameContainer style={appNameStyle}>
        <AppNameText size="xxl" weight="bold" align="center">
          {appName}
        </AppNameText>
      </AppNameContainer>

      {environmentLabel ? (
        <EnvironmentContainer style={envLabelStyle}>
          <EnvironmentText
            size="sm"
            weight="semibold"
            align="center"
            muted
            colorVariant="icon"
          >
            {environmentLabel}
          </EnvironmentText>
        </EnvironmentContainer>
      ) : null}

      <TaglineContainer style={taglineStyle}>
        <TaglineText size="md" align="center" muted colorVariant="icon">
          {tagline}
        </TaglineText>
      </TaglineContainer>
    </>
  )
}
