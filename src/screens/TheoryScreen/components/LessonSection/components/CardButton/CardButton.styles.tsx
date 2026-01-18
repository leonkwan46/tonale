import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

// Container that holds both the depth and the button
export const NodeContainer = styled.View<{ isPressed: boolean }>(({ theme, isPressed }) => ({
  position: 'relative',
  transform: [{ scale: isPressed ? 0.95 : 1 }]
}))

// The 3D depth/shadow element
export const NodeDepth = styled.View<{ isLocked: boolean, isTablet: boolean, isCompleted?: boolean }>(({ theme, isLocked, isTablet, isCompleted }) => ({
  position: 'absolute',
  top: scale(3),
  left: scale(3),
  height: isTablet ? scale(theme.components.cardButton.size * 0.8) : scale(theme.components.cardButton.size),
  width: isTablet ? scale(theme.components.cardButton.size * 0.8) : scale(theme.components.cardButton.size),
  backgroundColor: isCompleted ? theme.colors.cardButton.depth.completed : (isLocked ? theme.colors.cardButton.depth.locked : theme.colors.cardButton.depth.default),
  borderRadius: scale(15)
}))

// The main button element (with proper border radius)
export const NodeContentContainer = styled.View<{ isLocked: boolean, isTablet: boolean, isCompleted?: boolean }>(({ theme, isLocked, isTablet, isCompleted }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  gap: scale(10),
  padding: scale(10),
  backgroundColor: isCompleted ? theme.colors.success : (isLocked ? theme.colors.lockedNode : theme.colors.primary),
  borderRadius: scale(15), // Full border radius restored
  height: isTablet ? scale(theme.components.cardButton.size * 0.8) : scale(theme.components.cardButton.size),
  width: isTablet ? scale(theme.components.cardButton.size * 0.8) : scale(theme.components.cardButton.size),
  position: 'relative',
  zIndex: 1
}))

export const StarContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: isTablet ? scale(4) : scale(2)
}))
