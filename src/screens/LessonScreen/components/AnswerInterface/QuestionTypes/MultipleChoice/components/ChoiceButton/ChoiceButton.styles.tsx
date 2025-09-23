import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'
import { LayoutType } from '../../index'

type ButtonState = 'default' | 'selected' | 'correct' | 'incorrect' | 'neutral'

const BUTTON_SIZE = (isTablet: boolean, isNoteIdentification: boolean = false) => {
  if (isNoteIdentification) {
    return isTablet ? scale(65) : scale(90)
  }
  return isTablet ? scale(80) : scale(110)
}

const ROW_BUTTON_HEIGHT = (isTablet: boolean, isNoteIdentification: boolean = false) => {
  if (isNoteIdentification) {
    return isTablet ? scale(40) : scale(50)
  }
  return isTablet ? scale(50) : scale(60)
}

const ROW_TEXT_SIZE = (isTablet: boolean, isNoteIdentification: boolean = false) => {
  if (isNoteIdentification) {
    return isTablet ? scale(10) : scale(14)
  }
  return isTablet ? scale(12) : scale(16)
}

// Container that holds both the depth and the button
export const NodeContainer = styled.TouchableOpacity<{ isPressed: boolean, isLastInRow: boolean, layoutType: LayoutType, isNoteIdentification?: boolean, isTablet: boolean }>(({ theme, isPressed, isLastInRow, layoutType, isNoteIdentification, isTablet }) => ({
  position: 'relative',
  alignSelf: 'center',
  marginRight: isLastInRow ? 0 : scale(20),
  marginBottom: isNoteIdentification && isTablet ? scale(15) : scale(20),
  transform: [{ scale: isPressed ? 0.9 : 1 }],
  width: layoutType === 'row' ? '100%' : 'auto',
  activeOpacity: 1
}))

// The 3D depth/shadow element
export const NodeDepth = styled.View<{ buttonState: ButtonState, isTablet: boolean, layoutType: LayoutType, isNoteIdentification?: boolean }>(({ theme, buttonState, isTablet, layoutType, isNoteIdentification }) => {
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
    height: layoutType === 'row' ? ROW_BUTTON_HEIGHT(isTablet, isNoteIdentification) : BUTTON_SIZE(isTablet, isNoteIdentification),
    width: layoutType === 'row' ? '100%' : BUTTON_SIZE(isTablet, isNoteIdentification),
    backgroundColor: getDepthColor(),
    borderRadius: scale(15)
  }
})

// The main button element
export const NodeContentContainer = styled.View<{ buttonState: ButtonState, isTablet: boolean, layoutType: LayoutType, isNoteIdentification?: boolean }>(({ theme, buttonState, isTablet, layoutType, isNoteIdentification }) => {
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
    height: layoutType === 'row' ? ROW_BUTTON_HEIGHT(isTablet, isNoteIdentification) : BUTTON_SIZE(isTablet, isNoteIdentification),
    width: layoutType === 'row' ? '100%' : BUTTON_SIZE(isTablet, isNoteIdentification),
    position: 'relative',
    zIndex: 1
  }
})

export const ChoiceText = styled.Text<{ buttonState: ButtonState, isTablet: boolean, layoutType: LayoutType, isNoteIdentification?: boolean }>(({ theme, buttonState, isTablet, layoutType, isNoteIdentification }) => {
  const getFontSize = () => {
    if (layoutType === 'row') {
      return ROW_TEXT_SIZE(isTablet, isNoteIdentification)
    }
    if (isNoteIdentification) {
      return isTablet ? scale(12) : scale(14)
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

