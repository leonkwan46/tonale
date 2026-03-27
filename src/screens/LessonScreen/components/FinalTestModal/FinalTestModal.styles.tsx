import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { TitleText } from '@/compLib/Modal/Modal.styles'

export const ModalIcon = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(48) : scale(64)
}))

export const SuccessTitleText = styled(TitleText)(({ theme }) => ({
  color: theme.colors.success
}))

export const ErrorTitleText = styled(TitleText)(({ theme }) => ({
  color: theme.colors.error
}))
