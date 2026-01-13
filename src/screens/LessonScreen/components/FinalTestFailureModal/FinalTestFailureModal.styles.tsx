import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

import { TitleText } from '@/sharedComponents/Modal/Modal.styles'

export const FailureIcon = styled.Text<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  fontSize: isTablet ? scale(48) : scale(64)
}))

export const ErrorTitleText = styled(TitleText)<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  color: theme.colors.error
}))
