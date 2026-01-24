import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { TitleText } from '@/sharedComponents/Modal/Modal.styles'

export const FailureIcon = styled.Text(({ theme }) => ({
  fontSize: theme.device.isTablet ? scale(48) : scale(64)
}))

export const ErrorTitleText = styled(TitleText)(({ theme }) => ({
  color: theme.colors.error
}))
