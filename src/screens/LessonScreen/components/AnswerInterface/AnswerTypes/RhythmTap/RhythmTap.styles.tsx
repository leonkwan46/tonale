import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const Container = styled.View({
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: scale(24),
  width: '100%'
})

export const TapButtonContainer = styled.TouchableOpacity<{ isPressed: boolean, isTablet: boolean }>(({ isPressed }) => ({
  position: 'relative',
  marginVertical: scale(16),
  transform: [{ scale: isPressed ? 0.9 : 1 }],
  activeOpacity: 1
}))

export const TapButtonDepth = styled.View<{ isActive: boolean, isDisabled: boolean, isTablet: boolean }>(({ isActive, isDisabled, isTablet }) => ({
  position: 'absolute',
  top: scale(6),
  left: scale(6),
  height: isTablet ? scale(120) : scale(160),
  width: isTablet ? scale(240) : scale(280),
  backgroundColor: isDisabled ? '#999' : (isActive ? '#003d82' : '#0051D5'),
  borderRadius: scale(20)
}))

export const TapButtonContent = styled.View<{ isActive: boolean, isDisabled: boolean, isTablet: boolean }>(({ isActive, isDisabled, isTablet }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: isDisabled ? '#ccc' : (isActive ? '#0051D5' : '#007AFF'),
  borderRadius: scale(20),
  height: isTablet ? scale(120) : scale(160),
  width: isTablet ? scale(240) : scale(280),
  position: 'relative',
  zIndex: 1
}))

export const TapButtonText = styled.Text<{ isTablet: boolean }>(({ isTablet }) => ({
  color: '#fff',
  fontSize: isTablet ? scale(20) : scale(24),
  fontWeight: 'bold',
  fontFamily: getSourGummyFontFamily('700')
}))
