import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const Container = styled.View(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.device.isTablet ? scale(24) : scale(32),
  paddingBottom: theme.device.isTablet ? scale(16) : scale(24),
  paddingHorizontal: scale(20),
  gap: theme.device.isTablet ? scale(12) : scale(16)
}))

export const IconContainer = styled.View(({ theme }) => ({
  marginBottom: theme.device.isTablet ? scale(4) : scale(8)
}))

export const DescriptionText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(14) : scale(16),
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400'),
  lineHeight: theme.device.isTablet ? scale(20) : scale(24),
  textAlign: 'center',
  paddingHorizontal: scale(8)
}))

export const HeaderIcon = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))
