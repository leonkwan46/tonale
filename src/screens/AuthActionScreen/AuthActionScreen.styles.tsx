import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Card = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: scale(20),
  justifyContent: 'center',
  gap: scale(20)
}))

export const RefreshButton = styled(TouchableOpacity)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(8) : scale(12),
  borderRadius: scale(12),
  borderWidth: 1,
  borderColor: theme.colors.primary,
  backgroundColor: 'transparent',
  marginTop: theme.device.isTablet ? scale(8) : scale(12)
}))

export const RefreshButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: theme.device.isTablet ? scale(12) : scale(14),
  fontFamily: getSourGummyFontFamily('600')
}))

export const DebugText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(10) : scale(11),
  color: theme.colors.secondary,
  fontFamily: getSourGummyFontFamily('400'),
  textAlign: 'center',
  marginBottom: scale(10),
  padding: scale(8),
  backgroundColor: theme.colors.surface,
  borderRadius: scale(4)
}))

