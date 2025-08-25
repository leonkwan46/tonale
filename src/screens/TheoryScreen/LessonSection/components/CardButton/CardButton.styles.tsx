import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

// Container that holds both the depth and the button
export const NodeContainer = styled.View({
  position: 'relative'
})

// The 3D depth/shadow element
export const NodeDepth = styled.View<{ isLocked: boolean }>(({ theme, isLocked }) => ({
  position: 'absolute',
  top: scale(3),
  left: scale(3),
  height: scale(theme.components.cardButton.size),
  width: scale(theme.components.cardButton.size),
  backgroundColor: isLocked ? '#0a3a4a' : '#156382',
  borderRadius: scale(15)
}))

// The main button element (with proper border radius)
export const NodeContentContainer = styled.View<{ isLocked: boolean }>(({ theme, isLocked }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  gap: scale(10),
  padding: scale(10),
  backgroundColor: isLocked ? theme.colors.lockedNode : theme.colors.primary,
  borderRadius: scale(15), // Full border radius restored
  height: scale(theme.components.cardButton.size),
  width: scale(theme.components.cardButton.size),
  position: 'relative',
  zIndex: 1
}))

export const StarContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: scale(4)
}))