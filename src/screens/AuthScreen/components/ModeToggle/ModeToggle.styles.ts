import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { createPressableWithOpacity } from '@/utils/PressableFeedback'

const PressableOpacity07 = createPressableWithOpacity(0.7)

export const ToggleContainer = styled.View(() => ({
  width: '100%'
}))

export const ToggleBackground = styled.View(({ theme }) => ({
  flexDirection: 'row',
  borderRadius: scale(theme.borderRadius.md),
  padding: scale(theme.spacing.xs),
  backgroundColor: theme.colors.surface
}))

export const ToggleButton = styled(PressableOpacity07)<{ isActive: boolean }>(({ theme, isActive }) => ({
  flex: 1,
  paddingVertical: theme.device.isTablet ? scale(5) : scale(theme.spacing.sm),
  borderRadius: scale(theme.borderRadius.sm),
  alignItems: 'center',
  backgroundColor: isActive ? theme.colors.primary : 'transparent'
}))

export const ToggleText = styled.Text<{ isActive: boolean }>(({ theme, isActive }) => ({
  fontSize: theme.device.isTablet ? scale(theme.typography.sm) : scale(theme.typography.base),
  color: isActive ? theme.colors.primaryContrast : theme.colors.text,
  opacity: isActive ? 1 : 0.7,
  fontFamily: getSourGummyFontFamily(theme.fontWeight.semibold)
}))

