import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

export const PrimaryButton = styled(TouchableOpacity)<{ opacity: number; disabled: boolean }>(({ theme, opacity, disabled }) => ({
  backgroundColor: theme.colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(10) : scale(16),
  borderRadius: scale(theme.borderRadius.md),
  ...theme.shadows.lg,
  shadowColor: theme.colors.primary, // Override shadow colour for primary button glow effect
  opacity: disabled ? 0.5 : opacity,
  width: '100%'
}))

export const PrimaryButtonText = styled.Text<{ hasLeftMargin?: boolean }>(({ theme, hasLeftMargin }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(14) : scale(16),
  marginRight: scale(8),
  marginLeft: hasLeftMargin ? scale(8) : 0,
  fontFamily: getSourGummyFontFamily('600')
}))

