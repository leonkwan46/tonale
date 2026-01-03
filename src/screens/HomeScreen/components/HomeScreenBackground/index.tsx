import { useWindowDimensions } from '@/hooks'
import { INSTRUMENT, type UserGender, type UserInstrument } from '@types'
import { useCallback, useMemo, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Platform, RefreshControl, ScrollView, View, useColorScheme } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { ContentContainer } from '../../../TheoryScreen/TheoryScreenBody/TheoryScreenBody.styles'
import { ClapCelebration } from './ClapCelebration'
import { AvatarImage, BackgroundGradient, ImageContainer, StageImage } from './HomeScreenBackground.styles'
import { PullIndicator } from './PullIndicator'
import { PULL_THRESHOLD } from './PullIndicator/PullIndicator.constants'

interface HomeScreenBackgroundProps {
  children: React.ReactNode
  refreshing: boolean
  onRefresh: () => void
  gender?: UserGender
  instrument?: UserInstrument | string
}

export const HomeScreenBackground: React.FC<HomeScreenBackgroundProps> = ({ children, refreshing, onRefresh, gender, instrument }) => {
  const colorScheme = useColorScheme() ?? 'light'
  const { width: screenWidth } = useWindowDimensions()
  const [celebrationTrigger, setCelebrationTrigger] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  const hasTriggeredRef = useRef(false)
  const pullDistance = useSharedValue(0)

  const stageImage =
    colorScheme === 'dark'
      ? require('../../../../../assets/images/dark-homepage.png')
      : require('../../../../../assets/images/light-homepage.png')

  const avatarImage = useMemo(() => {
    const isFemale = gender === 'female'

    if (instrument === INSTRUMENT.PIANO) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_piano.png')
        : require('../../../../../assets/images/boy/boy_piano.png')
    }

    if (instrument === INSTRUMENT.GUITAR) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_guitar.png')
        : require('../../../../../assets/images/boy/boy_guitar.png')
    }

    if (instrument === INSTRUMENT.VIOLIN) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_violin.png')
        : require('../../../../../assets/images/boy/boy_violin.png')
    }

    if (instrument === INSTRUMENT.VOCAL) {
      return isFemale
        ? require('../../../../../assets/images/girl/girl_vocal.png')
        : require('../../../../../assets/images/boy/boy_vocal.png')
    }

    return isFemale
      ? require('../../../../../assets/images/girl/girl_full.png')
      : require('../../../../../assets/images/boy/boy_full.png')
  }, [gender, instrument])

  const gradientColors =
    colorScheme === 'dark'
        ? ['#2E3237', '#1E252B', '#1A1E22', '#331009'] as const
        : ['#EEEEEE', '#A3C3CA', '#68A9B7', '#BF3713'] as const

  // TODO: Android doesn't support overscroll/bounce like iOS, so pull-up gesture is iOS-only.
  // Need to implement gesture-based solution for Android if cross-platform support is required.
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (Platform.OS !== 'ios') return
    
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const maxScrollY = contentSize.height - layoutMeasurement.height
    const scrollY = contentOffset.y
    
    if (scrollY > maxScrollY) {
      const overscroll = scrollY - maxScrollY
      pullDistance.value = withTiming(Math.min(overscroll, PULL_THRESHOLD * 1.5), { duration: 100 })
    } else {
      pullDistance.value = withTiming(0, { duration: 150 })
    }
  }, [pullDistance])

  const handleScrollEndDrag = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (Platform.OS !== 'ios' || hasTriggeredRef.current) return
    
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent
    const maxScrollY = contentSize.height - layoutMeasurement.height
    const scrollY = contentOffset.y
    
    if (scrollY > maxScrollY + PULL_THRESHOLD) {
      hasTriggeredRef.current = true
      setCelebrationTrigger(true)
      setMessageIndex(prev => prev + 1)
      setTimeout(() => {
        setCelebrationTrigger(false)
        hasTriggeredRef.current = false
      }, 1600)
    }
  }, [])

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        bounces={Platform.OS === 'ios'}
        alwaysBounceVertical={Platform.OS === 'ios'}
        overScrollMode={Platform.OS === 'android' ? 'never' : undefined}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onScrollEndDrag={handleScrollEndDrag}
      >
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
          {/* TODO: Avatar will be animation in the future, using Lottie. This is currently a placeholder */}
          <AvatarImage source={avatarImage} screenWidth={screenWidth} />
        </ImageContainer>
        <PullIndicator pullDistance={pullDistance} messageIndex={messageIndex} />
      </ScrollView>
      <ClapCelebration trigger={celebrationTrigger} />
    </View>
  )
}
