import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const GuestLoginContainer = styled.View(() => ({
  flexDirection: 'column',
  gap: scale(16),
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
  paddingHorizontal: scale(16),
  fontSize: scale(14),
  opacity: 0.6,
  color: theme.colors.text,
  fontFamily: getSourGummyFontFamily('400')
}))

export const SecondaryButton = styled(TouchableOpacity)<{ disabled?: boolean }>(({ theme, disabled }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: scale(16),
  borderRadius: scale(12),
  borderWidth: 2,
  borderColor: theme.colors.primary,
  opacity: disabled ? 0.7 : 1
}))

export const SecondaryButtonText = styled.Text(({ theme }) => ({
  fontSize: scale(16),
  color: theme.colors.primary,
  fontFamily: getSourGummyFontFamily('500')
}))

export const ButtonIcon = styled.View({
  marginLeft: scale(4)
})

