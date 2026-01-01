import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const PrimaryButton = styled(TouchableOpacity)<{ opacity: number; disabled: boolean; isTablet?: boolean }>(({ theme, opacity, disabled, isTablet }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: isTablet ? scale(10) : scale(16),
  borderRadius: scale(12),
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  opacity: disabled ? 0.5 : opacity,
  width: '100%'
}))

export const PrimaryButtonText = styled.Text<{ isTablet?: boolean }>(({ theme, isTablet }) => ({
  color: '#fff',
  fontSize: isTablet ? scale(14) : scale(16),
  marginRight: scale(8),
  fontFamily: getSourGummyFontFamily('600')
}))

