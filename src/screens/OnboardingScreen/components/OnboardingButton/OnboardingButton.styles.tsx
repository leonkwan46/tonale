import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

export const OnboardingButtonContainer = styled(View)({
  marginBottom: scale(20),
  width: '100%'
})

export const ButtonContent = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(10) : scale(16),
  borderRadius: scale(12),
  shadowColor: theme.colors.primary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  width: '100%'
}))

export const ButtonText = styled.Text<{ hasLeftMargin?: boolean }>(({ theme, hasLeftMargin }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(14) : scale(24),
  fontFamily: getSourGummyFontFamily('600'),
  marginLeft: hasLeftMargin ? scale(8) : 0
}))

