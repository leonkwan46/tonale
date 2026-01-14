import styled from '@emotion/native'
import { scale } from 'react-native-size-matters'

export const AnswerInterfaceContainer = styled.View<{ isTablet: boolean }>(({ theme, isTablet }) => ({
  paddingHorizontal: isTablet ? scale(theme.spacing.xxxl) : scale(theme.spacing.xl),
  gap: isTablet ? scale(theme.spacing.lg) : scale(theme.spacing.md)
}))
