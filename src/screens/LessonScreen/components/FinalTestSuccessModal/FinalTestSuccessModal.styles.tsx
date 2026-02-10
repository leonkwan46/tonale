import styled from '@emotion/native'
import { View } from 'react-native'
import { scale } from 'react-native-size-matters'

import { TitleText } from '@/sharedComponents/Modal/Modal.styles'
import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const SuccessIcon = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(48) : scale(64)
}))

export const SuccessTitleText = styled(TitleText)(({ theme }) => ({
  color: theme.colors.success
}))

export const ButtonContent = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? scale(10) : scale(16),
  width: '100%'
}))

export const ButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.device.isTablet ? scale(14) : scale(18),
  fontFamily: getSourGummyFontFamily('600')
}))
