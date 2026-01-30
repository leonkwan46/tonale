import type { AppTheme } from '@/config/theme/theme'
import type { Card3DCustomStyles } from '@/sharedComponents/Card3DView'
import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { LinearGradient } from 'expo-linear-gradient'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

// FinalTest-specific constants
const FINAL_TEST_HEIGHT = scale(110)
const FINAL_TEST_BORDER_WIDTH = scale(2)

// Helper function to get custom styles for FinalTest
export const getFinalTestCustomStyles = (theme: AppTheme): Card3DCustomStyles => ({
  height: FINAL_TEST_HEIGHT,
  backgroundColor: 'transparent',
  depthColor: theme.colors.finalTest.shadow,
  borderWidth: FINAL_TEST_BORDER_WIDTH,
  borderColor: theme.colors.warning
})

// Wrapper for the button to add margin and shadow
export const FinalTestWrapper = styled.View<{ isLocked: boolean }>(({ theme, isLocked }) => ({
  width: '100%',
  marginVertical: scale(theme.spacing.md),
  opacity: isLocked ? 0.5 : 1,
  shadowColor: theme.colors.warning,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.4,
  shadowRadius: 12,
  elevation: 12
}))

// Gradient styled component with position styles
const FinalTestGradientStyled = styled(LinearGradient)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: scale(theme.borderRadius['2xl'])
}))

// Wrapper component that uses theme internally
export const FinalTestGradient = () => {
  const theme = useTheme()

  return (
    <FinalTestGradientStyled
      // @ts-ignore
      theme={theme}
      colors={theme.colors.finalTest.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  )
}

// Crown/Trophy icon container
export const FinalTestIconContainer = styled.View(({ theme }) => ({
  width: scale(50),
  height: scale(50),
  borderRadius: scale(theme.borderRadius['2xl']),
  backgroundColor: theme.colors.warning,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: theme.colors.warning,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 4
}))

// Title styling for final test - more dramatic
export const FinalTestTitle = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.lg),
  color: theme.colors.text,
  textAlign: 'center',
  letterSpacing: 1,
  textShadowColor: 'rgba(0,0,0,0.3)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
  fontFamily: getSourGummyFontFamily('900')
}))

// Description styling for final test - more prominent
export const FinalTestDescription = styled.Text(({ theme }) => ({
  fontSize: scale(theme.typography.sm),
  color: theme.colors.text,
  textAlign: 'center',
  marginTop: scale(3),
  textShadowColor: 'rgba(0,0,0,0.3)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 1,
  fontFamily: getSourGummyFontFamily('600')
}))

// Content wrapper for text with better positioning
export const FinalTestTextContainer = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1
})
