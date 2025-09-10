import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

// Full width container for final test
export const FinalTestContainer = styled.View<{ isPressed: boolean, isLocked: boolean }>(({ theme, isPressed, isLocked }) => ({
  width: '100%',
  position: 'relative',
  transform: [{ scale: isPressed ? 0.98 : 1 }],
  marginVertical: scale(10),
  opacity: isLocked ? 0.5 : 1
}))

// Full width depth/shadow element
export const FinalTestDepth = styled.View(({ theme }) => ({
  position: 'absolute',
  top: scale(4),
  left: scale(4),
  right: scale(-4),
  height: scale(80),
  backgroundColor: '#0a1a2e',
  borderRadius: scale(20)
}))

// Main content container spanning full width
export const FinalTestContent = styled.View<{ isLocked: boolean }>(({ theme, isLocked }) => ({
  width: '100%',
  height: scale(80),
  backgroundColor: '#16213e',
  borderRadius: scale(20),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: scale(20),
  position: 'relative',
  zIndex: 1
}))

// Title styling for final test
export const FinalTestTitle = styled.Text(({ theme }) => ({
  fontSize: scale(18),
  fontWeight: 'bold',
  color: '#f5f5f5',
  textAlign: 'center',
  letterSpacing: 0.5 // Slightly spaced for emphasis
}))

// Description styling for final test
export const FinalTestDescription = styled.Text(({ theme }) => ({
  fontSize: scale(12),
  fontWeight: '400',
  color: '#b0b0b0',
  textAlign: 'center',
  marginTop: scale(2)
}))

// Content wrapper for text
export const FinalTestTextContainer = styled.View({
  alignItems: 'center',
  justifyContent: 'center'
})

export const LockContainer = styled.View({
  position: 'absolute',
  zIndex: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
})