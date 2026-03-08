import { useUser } from '@/hooks'
import { useFonts } from 'expo-font'
import { useCallback, useEffect, useState } from 'react'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { AppText } from './components/AppText'
import { LogoAnimation } from './components/LogoAnimation'
import { Wave } from './components/Wave'
import {
  Container,
  MusicLogoContainer,
  WavesContainer
} from './SplashScreen.styles'

// Constants
const MIN_SPLASH_TIME_MS = 3000
const POLL_INTERVAL_MS = 100
const FADE_OUT_DURATION_MS = 500
const WAVE_COUNT = 5
const WAVE_DELAY_BASE = 1.5
const WAVE_DELAY_INCREMENT = 0.2

// Font definitions
const FONTS = {
  SpaceMono: require('../../../assets/fonts/SpaceMono-Regular.ttf'),
  Bravura: require('../../../assets/fonts/Bravura.otf'),
  BravuraText: require('../../../assets/fonts/BravuraText.otf'),
  'SourGummy-Thin': require('../../../assets/fonts/sourGummy/SourGummy-Thin.ttf'),
  'SourGummy-ThinItalic': require('../../../assets/fonts/sourGummy/SourGummy-ThinItalic.ttf'),
  'SourGummy-ExtraLight': require('../../../assets/fonts/sourGummy/SourGummy-ExtraLight.ttf'),
  'SourGummy-ExtraLightItalic': require('../../../assets/fonts/sourGummy/SourGummy-ExtraLightItalic.ttf'),
  'SourGummy-Light': require('../../../assets/fonts/sourGummy/SourGummy-Light.ttf'),
  'SourGummy-LightItalic': require('../../../assets/fonts/sourGummy/SourGummy-LightItalic.ttf'),
  'SourGummy-Regular': require('../../../assets/fonts/sourGummy/SourGummy-Regular.ttf'),
  'SourGummy-Italic': require('../../../assets/fonts/sourGummy/SourGummy-Italic.ttf'),
  'SourGummy-Medium': require('../../../assets/fonts/sourGummy/SourGummy-Medium.ttf'),
  'SourGummy-MediumItalic': require('../../../assets/fonts/sourGummy/SourGummy-MediumItalic.ttf'),
  'SourGummy-SemiBold': require('../../../assets/fonts/sourGummy/SourGummy-SemiBold.ttf'),
  'SourGummy-SemiBoldItalic': require('../../../assets/fonts/sourGummy/SourGummy-SemiBoldItalic.ttf'),
  'SourGummy-Bold': require('../../../assets/fonts/sourGummy/SourGummy-Bold.ttf'),
  'SourGummy-BoldItalic': require('../../../assets/fonts/sourGummy/SourGummy-BoldItalic.ttf'),
  'SourGummy-ExtraBold': require('../../../assets/fonts/sourGummy/SourGummy-ExtraBold.ttf'),
  'SourGummy-ExtraBoldItalic': require('../../../assets/fonts/sourGummy/SourGummy-ExtraBoldItalic.ttf'),
  'SourGummy-Black': require('../../../assets/fonts/sourGummy/SourGummy-Black.ttf'),
  'SourGummy-BlackItalic': require('../../../assets/fonts/sourGummy/SourGummy-BlackItalic.ttf')
} as const

interface SplashScreenProps {
  onComplete: () => void
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [fontsLoaded] = useFonts(FONTS)
  const { loading: authLoading } = useUser()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerOpacity = useSharedValue(1)

  const startExitAnimation = useCallback(() => {
    setIsTransitioning(true)
    onComplete()
    containerOpacity.value = withTiming(0, {
      duration: FADE_OUT_DURATION_MS,
      easing: Easing.out(Easing.ease)
    })
  }, [containerOpacity, onComplete])

  useEffect(() => {
    if (authLoading || !fontsLoaded) return

    const startTime = Date.now()
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const checkCompletion = () => {
      const elapsedTime = Date.now() - startTime
      if (elapsedTime >= MIN_SPLASH_TIME_MS) {
        startExitAnimation()
      } else {
        timeoutId = setTimeout(checkCompletion, POLL_INTERVAL_MS)
      }
    }

    checkCompletion()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [authLoading, fontsLoaded, startExitAnimation])

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value
  }))

  return (
    <Container style={containerStyle}>
      {!fontsLoaded ? (
        <MusicLogoContainer>
          <LogoAnimation isTransitioning={isTransitioning} />
        </MusicLogoContainer>
      ) : (
        <>
      <MusicLogoContainer>
        <LogoAnimation isTransitioning={isTransitioning} />
        <AppText
          appName="Tonalè"
          tagline="Your personal music learning companion"
          isTransitioning={isTransitioning}
        />
      </MusicLogoContainer>
      <WavesContainer>
            {Array.from({ length: WAVE_COUNT }, (_, index) => (
          <Wave
            key={index}
                delay={index * WAVE_DELAY_INCREMENT + WAVE_DELAY_BASE}
            isTransitioning={isTransitioning}
          />
        ))}
      </WavesContainer>
        </>
      )}
    </Container>
  )
}
