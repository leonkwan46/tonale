import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const GuestLoginContainer = styled.View(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.device.isTablet ? scale(6) : scale(16),
  width: '100%'
}))

export const DividerContainer = styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%'
}))

export const Divider = styled.View(({ theme }) => ({
  flex: 1,
  height: 1,
  backgroundColor: theme.colors.border
}))

export const DividerText = styled.Text(({ theme }) => ({
  paddingHorizontal: theme.device.isTablet ? scale(12) : scale(16),
  fontSize: theme.device.isTablet ? scale(10) : scale(14),
  opacity: 0.6,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const SecondaryButton = styled(TouchableOpacity)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(8) : scale(16),
  borderRadius: scale(12),
  borderWidth: 2,
  borderColor: theme.colors.primary,
  opacity: disabled ? 0.7 : 1
}))

export const SecondaryButtonText = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(12) : scale(16),
  color: theme.colors.primary,
  fontFamily: getSourGummyFontFamily('500')
}))

export const ButtonIcon = styled.View(({ theme }) => ({
  marginLeft: theme.device.isTablet ? scale(3) : scale(4)
}))

export const PersonIconStyled = styled(Ionicons)(({ theme }) => ({
  color: theme.colors.primary
}))

export const GuestLoginWrapper = styled.View<{ isVisible: boolean }>(({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  height: isVisible ? 'auto' : 0,
  overflow: 'hidden',
  width: '100%'
}))
