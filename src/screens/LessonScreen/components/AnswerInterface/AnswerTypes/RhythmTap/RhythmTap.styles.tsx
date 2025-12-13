import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
})

export const TapButtonContainer = styled.TouchableOpacity<{ isPressed: boolean, isTablet: boolean }>(({ isPressed }) => ({
  position: 'relative',
  transform: [{ scale: isPressed ? 0.9 : 1 }],
  activeOpacity: 1
}))

type ButtonState = 'default' | 'correct' | 'incorrect'

export const TapButtonDepth = styled.View<{ buttonState: ButtonState, isActive: boolean, isDisabled: boolean, isTablet: boolean }>(({ theme, buttonState, isTablet }) => {
  const getDepthColor = () => {
    switch (buttonState) {
      case 'correct':
        return '#2a8a3a'
      case 'incorrect':
        return '#b52a2a'
      default:
        return '#156382'
    }
  }

  return {
    position: 'absolute',
    top: scale(6),
    left: scale(6),
    height: isTablet ? scale(120) : scale(160),
    width: isTablet ? scale(240) : scale(280),
    backgroundColor: getDepthColor(),
    borderRadius: scale(20)
  }
})

export const TapButtonContent = styled.View<{ buttonState: ButtonState, isActive: boolean, isDisabled: boolean, isTablet: boolean }>(({ theme, buttonState, isTablet }) => {
  const getBackgroundColor = () => {
    switch (buttonState) {
      case 'correct':
        return theme.colors.success
      case 'incorrect':
        return theme.colors.error
      default:
        return theme.colors.primary
    }
  }

  return {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getBackgroundColor(),
    borderRadius: scale(20),
    height: isTablet ? scale(120) : scale(160),
    width: isTablet ? scale(240) : scale(280),
    position: 'relative',
    zIndex: 1
  }
})

export const TapButtonText = styled.Text<{ isTablet: boolean }>(({ isTablet }) => ({
  color: '#fff',
  fontSize: isTablet ? scale(20) : scale(24),
  fontWeight: 'bold',
  fontFamily: getSourGummyFontFamily('700')
}))
