import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'
import { LayoutType } from '../../index'

type ButtonState = 'default' | 'selected' | 'correct' | 'incorrect' | 'neutral'

const BUTTON_SIZE = (isTablet: boolean) => 
  isTablet ? scale(80) : scale(110)

const ROW_BUTTON_HEIGHT = (isTablet: boolean) => 
  isTablet ? scale(50) : scale(60)

const ROW_TEXT_SIZE = (isTablet: boolean) => 
  isTablet ? scale(12) : scale(16)

// Container that holds both the depth and the button
export const NodeContainer = styled.TouchableOpacity<{ isPressed: boolean, isLastInRow: boolean, layoutType: LayoutType }>(({ theme, isPressed, isLastInRow, layoutType }) => ({
  position: 'relative',
  alignSelf: 'center',
  marginRight: isLastInRow ? 0 : scale(20),
  marginBottom: scale(20),
  transform: [{ scale: isPressed ? 0.95 : 1 }],
  width: layoutType === 'row' ? '100%' : 'auto'
}))

// The 3D depth/shadow element
export const NodeDepth = styled.View<{ buttonState: ButtonState, isTablet: boolean, layoutType: LayoutType }>(({ theme, buttonState, isTablet, layoutType }) => {
  const getDepthColor = () => {
    switch (buttonState) {
      case 'selected':
        return theme.colors.choiceButtonDepth.selected
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
    height: layoutType === 'row' ? ROW_BUTTON_HEIGHT(isTablet) : BUTTON_SIZE(isTablet),
    width: layoutType === 'row' ? '100%' : BUTTON_SIZE(isTablet),
    backgroundColor: getDepthColor(),
    borderRadius: scale(15)
  }
})

// The main button element
export const NodeContentContainer = styled.View<{ buttonState: ButtonState, isTablet: boolean, layoutType: LayoutType }>(({ theme, buttonState, isTablet, layoutType }) => {
  const getBackgroundColor = () => {
    switch (buttonState) {
      case 'selected':
        return theme.colors.accent
      case 'correct':
        return theme.colors.success
      case 'incorrect':
        return theme.colors.error
      case 'neutral':
        return theme.colors.lockedNode
      default:
        return theme.colors.primary
    }
  }

  return {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: scale(8),
    backgroundColor: getBackgroundColor(),
    borderRadius: scale(15),
    height: layoutType === 'row' ? ROW_BUTTON_HEIGHT(isTablet) : BUTTON_SIZE(isTablet),
    width: layoutType === 'row' ? '100%' : BUTTON_SIZE(isTablet),
    position: 'relative',
    zIndex: 1
  }
})

export const ChoiceText = styled.Text<{ buttonState: ButtonState, isTablet: boolean, layoutType: LayoutType }>(({ theme, buttonState, isTablet, layoutType }) => {
  const getFontSize = () => {
    if (layoutType === 'row') {
      return ROW_TEXT_SIZE(isTablet)
    }
    return isTablet ? scale(14) : scale(16)
  }

  return {
    fontSize: getFontSize(),
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center'
  }
})

