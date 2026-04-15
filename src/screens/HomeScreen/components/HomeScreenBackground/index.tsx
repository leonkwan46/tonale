import BouncingScrollView from '@/compLib/BouncingScrollView'
import { useWindowDimensions } from '@/hooks'
import { useThemeMode } from '@/hooks/useThemeModeContext'
import { getAvatarFullSource } from '@/utils/avatarAssets'
import { GENDER, type UserGender, type UserInstrument } from '@types'
import { useCallback, useMemo, useRef, useState } from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl
} from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { ClapCelebration } from './ClapCelebration'
import {
  AvatarImage,
  BackgroundGradient,
  ContentContainer,
  HomeScreenContainer,
  ImageContainer,
  ScrollContentContainer,
  StageImage,
  useGradientColors
} from './HomeScreenBackground.styles'
import { PullIndicator } from './PullIndicator'
import { PULL_THRESHOLD } from './PullIndicator/PullIndicator.constants'

interface HomeScreenBackgroundProps {
  children: React.ReactNode;
  refreshing: boolean;
  onRefresh: () => void;
  gender?: UserGender;
  instrument?: UserInstrument | string;
}

export const HomeScreenBackground = ({
  children,
  refreshing,
  onRefresh,
  gender,
  instrument
}: HomeScreenBackgroundProps) => {
  const { isDark } = useThemeMode()
  const { width: screenWidth } = useWindowDimensions()
  const [celebrationTrigger, setCelebrationTrigger] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const hasTriggeredRef = useRef(false)
  const pullDistance = useSharedValue(0)

  const stageImage = useMemo(() => {
    return isDark
      ? require('../../../../../assets/images/dark-homepage.png')
      : require('../../../../../assets/images/light-homepage.png')
  }, [isDark])

  const avatarImage = useMemo(() => {
    return getAvatarFullSource(gender || GENDER.MALE, instrument)
  }, [gender, instrument])

  const gradientColors = useGradientColors(isDark)

  // TODO: Android doesn't support overscroll/bounce like iOS, so pull-up gesture is iOS-only.
  // Need to implement gesture-based solution for Android if cross-platform support is required.
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (Platform.OS !== 'ios') return

      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent
      const maxScrollY = contentSize.height - layoutMeasurement.height
      const scrollY = contentOffset.y

      if (scrollY > maxScrollY) {
        const overscroll = scrollY - maxScrollY
        pullDistance.value = withTiming(
          Math.min(overscroll, PULL_THRESHOLD * 1.5),
          { duration: 100 }
        )
      } else {
        pullDistance.value = withTiming(0, { duration: 150 })
      }
    },
    [pullDistance]
  )

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (Platform.OS !== 'ios' || hasTriggeredRef.current) return
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent
      const maxScrollY = contentSize.height - layoutMeasurement.height
      const scrollY = contentOffset.y
      if (scrollY > maxScrollY + PULL_THRESHOLD) {
        hasTriggeredRef.current = true
        setCelebrationTrigger(true)
        setMessageIndex((prev) => prev + 1)
        setTimeout(() => {
          setCelebrationTrigger(false)
          hasTriggeredRef.current = false
        }, 1600)
      }
    },
    []
  )

  // NOTE: this function is to handle the bounce gesture on Android
  const handleBounce = useCallback(
    (direction: 'top' | 'bottom', overscroll: number) => {
      if (
        hasTriggeredRef.current ||
        Platform.OS !== 'android' ||
        direction !== 'bottom'
      )
        return
      if (overscroll > PULL_THRESHOLD) {
        hasTriggeredRef.current = true
        setCelebrationTrigger(true)
        setMessageIndex((prev) => prev + 1)
        setTimeout(() => {
          setCelebrationTrigger(false)
          hasTriggeredRef.current = false
        }, 1600)
      }
    },
    [setCelebrationTrigger, setMessageIndex]
  )

  return (
    <HomeScreenContainer>
      <BouncingScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        bounces={Platform.OS === 'ios'}
        alwaysBounceVertical={Platform.OS === 'ios'}
        overScrollMode={'auto'}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={handleScrollEndDrag}
        onBounce={handleBounce}
        pullProgress={pullDistance}
      >
        <ScrollContentContainer>
          <BackgroundGradient
            colors={gradientColors}
            locations={[0, 0.3, 0.8, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <ContentContainer>
              {children as React.ReactElement[]}
            </ContentContainer>
          </BackgroundGradient>
          <ImageContainer>
            <StageImage source={stageImage} screenWidth={screenWidth} />
            <AvatarImage source={avatarImage} screenWidth={screenWidth} />
          </ImageContainer>
          <PullIndicator
            pullDistance={pullDistance}
            messageIndex={messageIndex}
          />
        </ScrollContentContainer>
      </BouncingScrollView>
      <ClapCelebration trigger={celebrationTrigger} />
    </HomeScreenContainer>
  )
}
