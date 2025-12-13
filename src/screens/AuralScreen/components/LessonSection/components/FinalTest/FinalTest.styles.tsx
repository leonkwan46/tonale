import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

// Full width container for final test with dramatic styling
export const FinalTestContainer = styled.View<{ isPressed: boolean, isLocked: boolean }>(({ theme, isPressed, isLocked }) => ({
  width: '100%',
  position: 'relative',
  transform: [{ scale: isPressed ? 0.97 : 1 }],
  marginVertical: scale(15),
  opacity: isLocked ? 0.5 : 1,
  shadowColor: theme.colors.warning,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.4,
  shadowRadius: 12,
  elevation: 12
}))

// Dramatic depth/shadow element with gradient
export const FinalTestDepth = styled.View(({ theme }) => ({
  position: 'absolute',
  top: scale(6),
  left: scale(6),
  right: scale(-2),
  height: scale(110),
  backgroundColor: '#8B0000', // Dark red for dramatic shadow
  borderRadius: scale(25),
  opacity: 0.8
}))

// Main content container with gradient background
export const FinalTestContent = styled.View<{ isLocked: boolean }>(({ theme, isLocked }) => ({
  width: '100%',
  height: scale(110),
  borderRadius: scale(25),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: scale(25),
  position: 'relative',
  zIndex: 1,
  borderWidth: scale(2),
  borderColor: theme.colors.warning,
  overflow: 'hidden'
}))

// Gradient background for the content
export const FinalTestGradient = styled(LinearGradient)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: scale(23)
})

// Crown/Trophy icon container
export const FinalTestIconContainer = styled.View(({ theme }) => ({
  width: scale(50),
  height: scale(50),
  borderRadius: scale(25),
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
  fontSize: scale(20),
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
  fontSize: scale(13),
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


export const LockContainer = styled.View({
  position: 'absolute',
  zIndex: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
})
