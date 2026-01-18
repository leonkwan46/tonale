import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const ToggleContainer = styled.View(() => ({
  width: '100%'
}))

export const ToggleBackground = styled.View(({ theme }) => ({
  flexDirection: 'row',
  borderRadius: scale(12),
  padding: scale(4),
  backgroundColor: theme.colors.surface
}))

export const ToggleButton = styled(TouchableOpacity)<{ isActive: boolean, isTablet?: boolean }>(({ theme, isActive, isTablet }) => ({
  flex: 1,
  paddingVertical: isTablet ? scale(5) : scale(12),
  borderRadius: scale(8),
  alignItems: 'center',
  backgroundColor: isActive ? theme.colors.primary : 'transparent'
}))

export const ToggleText = styled.Text<{ isActive: boolean, isTablet?: boolean }>(({ theme, isActive, isTablet }) => ({
  fontSize: isTablet ? scale(12) : scale(16),
  color: theme.colors.text,
  opacity: isActive ? 1 : 0.7,
  fontFamily: getSourGummyFontFamily('600')
}))

