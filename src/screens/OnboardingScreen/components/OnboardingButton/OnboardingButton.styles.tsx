import { getSourGummyFontFamily } from '@/utils/fontHelper'
import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'
export const OnboardingButtonContainer = styled(View)({
  marginBottom: scale(20),
  width: '100%'
})

export const ButtonContent = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: scale(16)
})

export const ButtonText = styled.Text<{ hasLeftMargin?: boolean }>(({ theme, hasLeftMargin }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(14) : scale(24),
  fontFamily: getSourGummyFontFamily('600')
}))

