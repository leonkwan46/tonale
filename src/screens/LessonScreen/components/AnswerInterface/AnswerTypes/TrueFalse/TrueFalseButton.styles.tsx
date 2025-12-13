import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

type ButtonState = 'default' | 'selected' | 'correct' | 'incorrect' | 'neutral'
type TrueFalseChoice = 'True' | 'False'

const ROW_BUTTON_HEIGHT = (isTablet: boolean) => {
  return isTablet ? scale(60) : scale(70)
}

const ROW_TEXT_SIZE = (isTablet: boolean) => {
  return isTablet ? scale(16) : scale(20)
}

// Container that holds both the depth and the button
export const NodeContainer = styled.TouchableOpacity<{ isPressed: boolean, isLastInRow: boolean, isTablet: boolean, choice: TrueFalseChoice }>(({ theme, isPressed, isLastInRow, isTablet, choice }) => ({
  position: 'relative',
  alignSelf: 'center',
  marginRight: isLastInRow ? 0 : scale(20),
  marginBottom: scale(20),
  transform: [{ scale: isPressed ? 0.9 : 1 }],
  width: '48%',
  activeOpacity: 1
}))

// The 3D depth/shadow element
export const NodeDepth = styled.View<{ buttonState: ButtonState, isTablet: boolean, choice: TrueFalseChoice }>(({ theme, buttonState, isTablet, choice }) => {
  const getDepthColor = () => {
    if (buttonState === 'default') {
      // Different depth colors for True/False in default state
      return choice === 'True' 
        ? '#1a7a3a' // Darker green
        : '#b52a2a' // Darker red
    }
    switch (buttonState) {
      case 'selected':
        return choice === 'True' 
          ? '#0a5a2a' // Darker green when selected
          : '#8a1a1a' // Darker red when selected
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
    height: ROW_BUTTON_HEIGHT(isTablet),
    width: '100%',
    backgroundColor: getDepthColor(),
    borderRadius: scale(15)
  }
})

// The main button element
export const NodeContentContainer = styled.View<{ buttonState: ButtonState, isTablet: boolean, choice: TrueFalseChoice }>(({ theme, buttonState, isTablet, choice }) => {
  const getBackgroundColor = () => {
    if (buttonState === 'default') {
      // Distinct colors for True/False in default state
      return choice === 'True' 
        ? theme.colors.success // Green for True
        : theme.colors.error   // Red for False
    }
    switch (buttonState) {
      case 'selected':
        return choice === 'True'
          ? '#3dbb5d' // Lighter green when selected
          : '#ff8787' // Lighter red when selected
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
    height: ROW_BUTTON_HEIGHT(isTablet),
    width: '100%',
    position: 'relative',
    zIndex: 1
  }
})

export const ChoiceText = styled.Text<{ buttonState: ButtonState, isTablet: boolean }>(({ theme, buttonState, isTablet }) => {
  return {
    fontSize: ROW_TEXT_SIZE(isTablet),
    color: theme.colors.text,
    textAlign: 'center',
    fontFamily: getSourGummyFontFamily('600')
  }
})

