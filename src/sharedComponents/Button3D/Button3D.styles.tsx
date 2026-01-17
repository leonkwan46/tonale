import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export type ButtonState = 'default' | 'selected' | 'selection-true' | 'selection-false' | 'correct' | 'incorrect' | 'neutral'
export type LayoutType = 'grid' | 'row'

export const Button3DContainer = styled.TouchableOpacity<{ isPressed: boolean; layoutType?: LayoutType; fullWidth?: boolean }>(({ isPressed, layoutType, fullWidth }) => {
  const getWidth = () => {
    if (fullWidth) return '100%'
    if (layoutType === 'row') return '100%'
    if (layoutType === 'grid') return '45%'
    return 'auto'
  }

  return {
  position: 'relative',
    alignSelf: (layoutType === 'row' || fullWidth) ? 'stretch' : 'center',
    width: getWidth(),
  transform: [{ scale: isPressed ? 0.9 : 1 }],
  activeOpacity: 1
  }
})

export const Button3DDepth = styled.View<{ buttonState: ButtonState }>(({ theme, buttonState }) => {
  const getDepthColor = () => {
    switch (buttonState) {
      case 'selected':
        return theme.colors.choiceButtonDepth.selected
      case 'selection-true':
        return theme.colors.choiceButtonDepth['selection-true']
      case 'selection-false':
        return theme.colors.choiceButtonDepth['selection-false']
      case 'correct':
        return theme.colors.choiceButtonDepth.correct
      case 'incorrect':
        return theme.colors.choiceButtonDepth.incorrect
      case 'neutral':
        return theme.colors.choiceButtonDepth.neutral
      default:
        return theme.colors.choiceButtonDepth.default
    }
  }

  return {
    position: 'absolute',
    top: scale(6),
    left: scale(6),
    right: scale(-6),
    bottom: scale(-6),
    backgroundColor: getDepthColor(),
    borderRadius: scale(15)
  }
})

export const Button3DContent = styled.View<{ buttonState: ButtonState; layoutType?: LayoutType; fullWidth?: boolean }>(({ theme, buttonState, layoutType, fullWidth }) => {
  const getBackgroundColor = () => {
    switch (buttonState) {
      case 'selected':
        return theme.colors.choiceButton.selected
      case 'selection-true':
        return theme.colors.choiceButton['selection-true']
      case 'selection-false':
        return theme.colors.choiceButton['selection-false']
      case 'correct':
        return theme.colors.choiceButton.correct
      case 'incorrect':
        return theme.colors.choiceButton.incorrect
      case 'neutral':
        return theme.colors.choiceButton.neutral
      default:
        return theme.colors.choiceButton.default
    }
  }

  return {
    backgroundColor: getBackgroundColor(),
    borderRadius: scale(15),
    position: 'relative',
    zIndex: 1,
    width: (layoutType === 'row' || layoutType === 'grid' || fullWidth) ? '100%' : 'auto'
  }
})
