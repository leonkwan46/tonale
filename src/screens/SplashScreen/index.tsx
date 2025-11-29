import { Colors, ColorScheme } from '@/constants/Colors'
import { useUser } from '@/hooks'
import styled from '@emotion/native'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { AppText, LogoAnimation, MusicBar } from './components'

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const colorScheme = useColorScheme() ?? 'light'
  const { loading: authLoading } = useUser()
  
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Animation values
  const containerOpacity = useSharedValue(1)

  const startExitAnimation = useCallback(() => {
    setIsTransitioning(true)
    
    // Call onComplete immediately to ensure navigation happens
    onComplete()
    
    // Start fade animation for visual effect
    containerOpacity.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.ease)
    })
  }, [containerOpacity, onComplete])

  useEffect(() => {
    // Minimum splash time for better UX
    const MIN_SPLASH_TIME = 2000
    const startTime = Date.now()

    const checkCompletion = () => {
      const elapsedTime = Date.now() - startTime
      const minTimeReached = elapsedTime >= MIN_SPLASH_TIME
      
      if (!authLoading && minTimeReached) {
        startExitAnimation()
      } else {
        // Check again in 100ms
        setTimeout(checkCompletion, 100)
      }
    }

    checkCompletion()
  }, [authLoading, startExitAnimation])

  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value
  }))

  return (
    <Container colorScheme={colorScheme} style={containerStyle}>
      {/* Main content */}
      <Content>
        {/* Logo with animation */}
        <LogoAnimation colorScheme={colorScheme} isTransitioning={isTransitioning} />
        
        {/* App name and tagline */}
        <AppText
          appName="tonale"
          tagline="Master music through focused practice"
          colorScheme={colorScheme}
          isTransitioning={isTransitioning}
        />
      </Content>

      {/* Animated music bars */}
      <MusicBarsContainer>
        {Array.from({ length: 5 }, (_, index) => (
          <MusicBar
            key={index}
            delay={index * 0.2 + 1.5}
            colorScheme={colorScheme}
            isTransitioning={isTransitioning}
          />
        ))}
      </MusicBarsContainer>
    </Container>
  )
}

// Styled Components
const Container = styled(Animated.View)<{ colorScheme: ColorScheme }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => Colors[props.colorScheme].background};
`

const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
`

const MusicBarsContainer = styled.View`
  position: absolute;
  bottom: 30%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
`
