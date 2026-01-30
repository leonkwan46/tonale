import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ToggleContainer = styled.View(() => ({
  width: '100%'
}))

export const ToggleBackground = styled.View(({ theme }) => ({
  flexDirection: 'row',
  borderRadius: scale(theme.borderRadius.md),
  padding: scale(theme.spacing.xs),
  backgroundColor: theme.colors.surface
}))

export const ToggleButton = styled(TouchableOpacity)<{ isActive: boolean }>(({ theme, isActive }) => ({
  flex: 1,
  paddingVertical: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  alignItems: 'center',
  backgroundColor: isActive ? theme.colors.primary : 'transparent'
}))

export const ToggleText = styled.Text<{ isActive: boolean }>(({ theme, isActive }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  color: theme.colors.text,
  opacity: isActive ? 1 : 0.7,
  fontFamily: getSourGummyFontFamily('600')
}))

