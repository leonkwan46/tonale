import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const AnswerInterfaceContainer = styled.View(({ theme }) => ({
  paddingHorizontal: theme.device.isTablet ? scale(theme.spacing.xxxl) : scale(theme.spacing.xl),
  gap: theme.device.isTablet ? scale(theme.spacing.lg) : scale(theme.spacing.md)
}))
