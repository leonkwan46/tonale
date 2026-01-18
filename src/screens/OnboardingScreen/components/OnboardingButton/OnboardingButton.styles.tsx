import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

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

export const PrimaryButtonText = styled.Text<{ isTablet?: boolean; hasLeftMargin?: boolean }>(({ theme, isTablet, hasLeftMargin }) => ({
  color: theme.colors.text,
  fontSize: isTablet ? scale(14) : scale(16),
  marginRight: scale(8),
  marginLeft: hasLeftMargin ? scale(8) : 0,
  fontFamily: getSourGummyFontFamily('600')
}))

